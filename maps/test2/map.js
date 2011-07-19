map
  .createTexture("empty", {image: "none"})
  .createTexture("stub",  {image: "textures/stub.png"})
//  .createTexture("stub",  {color: "black"})
  .createTexture("water", {image: "textures/water.png"})
  .createTexture("riverside", {image: "textures/water.png", corners: {
    left_up: [80, 80, {image: "textures/water-lu.png", newTexture: true}],
    right_up: [80, 80, {image: "textures/water-ru.png", newTexture: true}],
    left_down: [80, 80, {image: "textures/water-ld.png", newTexture: true}],
    right_down: [80, 80, {image: "textures/water-rd.png", newTexture: true}]
  },
  sides: {
    left: [67, {image: "textures/water-l.png", newTexture: true}],
    right: [67, {image: "textures/water-r.png", newTexture: true}],
    top: [67, {image: "textures/water-u.png", newTexture: true}],
    bottom: [67, {image: "textures/water-d.png", newTexture: true}]
  }})
  .createTexture("grass", {image: "textures/grass.png"})
  .createTexture("OrcTownhall", {image: "textures/OrcTownhall.gif"})
  .createTexture("bobruisk",  {image: "textures/bobruisk.png"})
  .createTexture("abe",  {image: "textures/abe.png"})
  .getItem("body")
//    .fill("grass")
    .done()
  .getItem(map_area)
    .css({width: "6400px", height: "6400px"})
    .fill("grass")
    .done()
  .createItem("river01", {properties: ["wall"]})
    .css({left: "610px", top: "100px", width: "140px", height: "395px"})
    .fill("water").appendTo(map_area).done()
  .createItem("river02", {properties: ["wall"]})
    .css({left: "0px", top: "495px", width: "750px", height: "140px"})
    .fill("water").appendTo(map_area).done()
  .createItem("river03", {properties: ["wall"]})
    .css({left: "410px", top: "635px", width: "140px", height: "250px"})
    .fill("water").appendTo(map_area).done()
  .createItem("flood-tr", {properties: ["background", "trigger"], onPlayerOver: function(dir) {
    if(dir == "top") {
      map_vars["inFloodRoom"] = true;
      $("#flood_msg").html("<b>Добро пожаловать во флудилку!</b><br>");
      map
        .getItem("flood-panel")
          .css({display: "block"})
          .done()
    }},
    onPlayerOut: function(dir) {
      map_vars["inFloodRoom"] = false;
      map
        .getItem("flood-panel")
          .css({display: "none"})
          .done()
    }})
    .css({left: "35px"})
    .css({top: "120px"})
    .css({width: "535px"})
    .css({height: "120px"})
    .appendTo(map_area)
    .done()    
  .createItem("flood01", {properties: ["wall"]})
    .css({left: "15px"})
    .css({top: "120px"})
    .css({width: "20px"})
    .css({height: "330px"})
    .fill("stub")
    .appendTo(map_area)
    .done()    
  .createItem("flood02", {properties: ["wall"]})
    .css({left: "570px"})
    .css({top: "120px"})
    .css({width: "20px"})
    .css({height: "330px"})
    .fill("stub")
    .appendTo(map_area)
    .done()    
  .createItem("flood03", {properties: ["wall"]})
    .css({left: "15px"})
    .css({top: "450px"})
    .css({width: "575px"})
    .css({height: "20px"})
    .fill("stub")
    .appendTo(map_area)
    .done()
  .js(function() {
    flood_scroll = function() {
      $("#flood_msg").parent().scrollTop(100000);
    }
    flood_onsend = function(e) {
      e = e || window.event;
      if(e.keyCode == 13) {
        var msg = $("#flood_input").val();
        $("#flood_msg").append("<b>" + NICK + ":</b> " + msg.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "<br>");
        flood_scroll();
        map.svarSet("flood_msg", msg);
        $("#flood_input").val("");
      }
    }
  })
  .createItem("flood-panel", {properties: ["wall"]})
    .css({left: "35px", top: "330px", width: "535px", height: "120px", display: "none"})
    .html("<div style='width: 100%; height: 90px; overflow: auto'><span id='flood_msg' style='font-size: 12px'><b>Добро пожаловать во флудилку!</b><br></span></div><input id='flood_input' style='width: 100%; border: none 0px; background: #3caa3c; height: 30px;' onkeypress='flood_onsend(event)'>")
    .appendTo(map_area).done()
  .svarCallback("flood_msg", function(pid, value) {
    if(map_vars["inFloodRoom"]) {
      if(parseInt(pid)) {
        $("#flood_msg").append("<b>" + nicks[pid] + ":</b> " + value.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "<br>");
        flood_scroll();
      }
    }
  })
  .js(function() {
    $("#flood_input").opacity(0.3);
  })
  .createItem("fight01", {properties: ["wall"]})
    .css({left: "820px", top: "100px", width: "20px", height: "580px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight02", {properties: ["wall"]})
    .css({left: "940px", top: "100px", width: "20px", height: "840px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight03", {properties: ["wall"]})
    .css({left: "1060px", top: "0px", width: "20px", height: "820px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight04", {properties: ["wall"]})
    .css({left: "1180px", top: "0px", width: "20px", height: "700px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight05", {properties: ["wall"]})
    .css({left: "600px", top: "680px", width: "240px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight06", {properties: ["wall"]})
    .css({left: "1180px", top: "700px", width: "220px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight07", {properties: ["wall"]})
    .css({left: "1060px", top: "820px", width: "880px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight08", {properties: ["wall"]})
    .css({left: "940px", top: "940px", width: "720px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight09", {properties: ["wall"]})
    .css({left: "600px", top: "700px", width: "20px", height: "360px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight10", {properties: ["wall"]})
    .css({left: "600px", top: "1060px", width: "940px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight11", {properties: ["wall"]})
    .css({left: "720px", top: "800px", width: "220px", height: "160px"})
    .fill("bobruisk").appendTo(map_area).done()
  .createItem("fight12", {properties: ["wall"]})
    .css({left: "1380px", top: "200px", width: "20px", height: "500px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight13", {properties: ["wall"]})
    .css({left: "1500px", top: "300px", width: "20px", height: "520px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight14", {properties: ["wall"]})
    .css({left: "1640px", top: "960px", width: "20px", height: "220px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("abe", {properties: ["wall"]})
    .css({left: "1660px", top: "940px", width: "160px", height: "220px"})
    .fill("abe").appendTo(map_area).done()
  .createItem("fight15", {properties: ["wall"]})
    .css({left: "1920px", top: "840px", width: "20px", height: "420px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight16", {properties: ["wall"]})
    .css({left: "1760px", top: "1260px", width: "180px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight17", {properties: ["wall"]})
    .css({left: "1340px", top: "1180px", width: "320px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight18", {properties: ["wall"]})
    .css({left: "1220px", top: "1080px", width: "20px", height: "460px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight19", {properties: ["wall"]})
    .css({left: "1340px", top: "1200px", width: "20px", height: "220px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight20", {properties: ["wall"]})
    .css({left: "1760px", top: "1280px", width: "20px", height: "80px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight21", {properties: ["wall"]})
    .css({left: "1400px", top: "1360px", width: "380px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight22", {properties: ["wall"]})
    .css({left: "1640px", top: "1200px", width: "20px", height: "40px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight23", {properties: ["wall"]})
    .css({left: "1400px", top: "1240px", width: "260px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight24", {properties: ["wall"]})
    .css({left: "1400px", top: "1260px", width: "20px", height: "100px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight25", {properties: ["wall"]})
    .css({left: "1340px", top: "1420px", width: "280px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight26", {properties: ["wall"]})
    .css({left: "1220px", top: "1540px", width: "400px", height: "20px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight27", {properties: ["wall"]})
    .css({left: "1600px", top: "1440px", width: "20px", height: "100px"})
    .fill("stub").appendTo(map_area).done()
  .createItem("fight28", {properties: ["background", "trigger"], onPlayerOver: function() {
    map
      .movePlayer(1240, 1440);
  }})
    .css({left: "1480px", top: "1440px", width: "120px", height: "100px"})
    .appendTo(map_area).done()
  .createItem("fight29", {properties: ["background", "trigger"]})
    .css({left: "1420px", top: "1260px", width: "120px", height: "100px"})
    .appendTo(map_area).done()
// 1240 1440
  .avatars([
    {image: "avatars/tux.png"},
    {image: "avatars/beastie.png"},
    {image: "avatars/emule.png"},
    {image: "avatars/robot.png"},
    {image: "avatars/alien1.png"}
  ])
.done();