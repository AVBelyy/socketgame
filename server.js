function send404(res) {
  res.writeHead(404);
  res.write("Oops, 404 :-(");
  res.end();
};

var http = require("http"), 
    url = require("url"),
    fs = require("fs"),
    io = require("./lib/socket.io"),
    sys = require("sys"),

MAP = "test2",

svars = [],
messages = [],
coords = [],
nicks = [],
avatars = [],
bots = [],
validExtensions = [
  ["swf", "application/x-shockwave-flash", "binary"],
  ["js", "text/javascript", "utf8"],
  ["html", "text/html", "utf8"],
  ["css", "text/css", "utf8"],
  ["png", "image/png", "binary"],
  ["gif", "image/gif", "binary"],
  ["jpg", "image/jpeg", "binary"],
  ["jpeg", "image/jpeg", "binary"],
  ["htc", "text/x-component", "utf8"]
],

httpServer = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  switch(path) {
    case "/":
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(fs.readFileSync(__dirname + "/index.html"));
      res.end();
      break;
    default:
      try {
        for(i in validExtensions) {
          var ext = validExtensions[i];
          if(path.substr(-1 - ext[0].length) == "." + ext[0]) {
            res.writeHead(200, {"Content-Type": ext[1]});
            res.write(fs.readFileSync(__dirname + path, ext[2]), ext[2]);
            res.end();
            return;
          };
        };
        send404(res);
      } catch(e) {
        send404(res);
      };
  };
}),

server = {
  svars: function(svars) {
    for(svar in svars) sys.puts(svar);
    return server;
  },
  done: function() {}
},
parseMap = function(map_name) {
  var json_data = JSON.parse(fs.readFileSync(__dirname + "/maps/" + map_name + "/server.json", "utf8"));
  if(typeof json_data != "object") return;
  if(typeof (svars_data = json_data.svars) == "object")
    for(svar in svars_data) svars[svar] = svars_data[svar];
};

parseMap(MAP);

httpServer.listen(8124);

json = JSON.stringify;

var socket = io.listen(httpServer);
socket.on("connection", function(client) {
  var result = {act: "welcome", motd: "Welcome to first test web-server for this game!<br>Server based on nodejs and running on VDS by TimeWeb.Ru<br>Have a nice play! SYSAdmin.", map: MAP, svars: [], players: []};
  for(pid in coords) result.players.push({playerId: pid, x: coords[pid].x, y: coords[pid].y, nick: nicks[pid], avatar: avatars[pid]});
  for(svar in svars) result.svars.push({svar: svar, value: svars[svar]});
  client.send(json(result));

  /* ... other handlers... */

  client.on("message", function(message) {
    if(message.act == "move") {
      var pid = client.sessionId;
      switch(message.dir) {
        case "left":  coords[pid].x -= message.step; break;
        case "right": coords[pid].x += message.step; break;
        case "up":    coords[pid].y -= message.step; break;
        case "down":  coords[pid].y += message.step;
      };
      client.broadcast(json({act: "move", playerId: pid, dir: message.dir, step: message.step, x: coords[pid].x, y: coords[pid].y}));
    };
    if(message.act == "move_a") {
      var pid = client.sessionId;
      coords[pid].x = message.x;
      coords[pid].y = message.y;
      client.broadcast(json({act: "move_a", playerId: pid, x: message.x, y: message.y}));
    };
    if(message.act == "getonline") {
      var result = {act: "online", players: []};
      for(pid in coords) result.players.push({playerId: (pid == client.sessionId) ? 0 : pid, nick: nicks[pid], avatar: avatars[pid]});
      client.send(json(result));
    };
    if(message.act == "setnick") {
      nicks[client.sessionId] = message.nick;
      client.broadcast(json({act: "newnick", playerId: client.sessionId, nick: message.nick}));
      client.send(json({act: "newnick", playerId: 0, nick: message.nick}));
    };
    if(message.act == "setsvar" && typeof message.svar == "string") {
      svars[message.svar] = message.value;
      sys.puts("[" + nicks[client.sessionId] + "] " + message.svar + " = " + message.value);
      client.broadcast(json({act: "setsvar", svar: message.svar, value: message.value, playerId: client.sessionId}));
    };
    if(message.act == "getsvar" && typeof message.svar == "string") {
      client.send(json({act: "getsvar", svar: message.svar, value: svars[message.svar]}));
    };
    if(message.act == "join") {
      nicks[client.sessionId] = message.nick;
      avatars[client.sessionId] = message.avatar;
      coords[client.sessionId] = {x: 0, y: 0};
      client.broadcast(json({act: "newplayer", playerId: client.sessionId, avatar: message.avatar, nick: message.nick}));
    };
    if(message.act == "sendmsg") {
      messages.push({sender: nicks[client.sessionId], text: message.text});
      client.broadcast({sender: nicks[client.sessionId], text: message.text});
    };
  });
  client.on("disconnect", function() {
    if(coords[client.sessionId]) {
      client.broadcast(json({act: "displayer", playerId: client.sessionId, nick: nicks[client.sessionId]}));
      delete coords[client.sessionId];
    };
  });
});

Bot = function(nick, avatar) {
  this.playerId = "bot_" + bots.push(this);
  /* Immediatly join game */
  nicks[this.playerId] = nick || "bot";
  avatars[this.playerId] = avatar || {color: "green"};
  coords[this.playerId] = {x: 0, y: 0};
  listener.broadcast(json({act: "newplayer", playerId: this.playerId, avatar: avatars[this.playerId], nick: nicks[this.playerId]}));
  sys.log("Bot " + nicks[this.playerId] + " (" + this.playerId + ") joined game");
};
