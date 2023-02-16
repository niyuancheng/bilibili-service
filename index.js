var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors = require("cors");
var { parseBilibiliXML, XML2DanmakuData } = require("./parseDanmaku");
const parseDash = require("./parseDash");
const axios = require("axios").default;

let sockets = null;
let bvids = [];
app.use(cors());
app.use("/static", express.static("public"));

const instance = axios.create({
  timeout: 1000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    referer: "https://www.bilibili.com/",
  },
});

app.get("/getVideoData", async (req, res) => {
  console.log("请求媒体数据");
  let bvid = req.query.bvid;
  if (bvids.includes(bvid)) {
    return res.redirect(`./static/${bvid}_new.mp4`);
  }
  let avid = null;
  let cvid = null;
  let danmaku = null;
  let video = null;
  // 1.根据bvid获取avid
  let value = await instance.get(
    `https://api.bilibili.com/x/player/pagelist?bvid=${bvid}`
  );
  cvid = value.data.data[0].cid;
  // 2. 根据bvid,cvid请求avid
  let value2 = await instance.get(
    `https://api.bilibili.com/x/web-interface/view?cid=${cvid}&bvid=${bvid}`
  );
  avid = value2.data.data.aid;
  // 3. 根据cvid请求弹幕池文件
  let value3 = await instance.get(
    `https://api.bilibili.com/x/v1/dm/list.so?oid=${cvid}`
  );
  danmaku = parseBilibiliXML(value3.data);

  // 4.请求视频流文件
  let value4 = await instance.get(
    `https://api.bilibili.com/x/player/playurl?fnval=80&avid=${avid}&cid=${cvid}`
  );
  dash = value4.data.data.dash;
  // 解析弹幕xml文件

  parseDash(dash, bvid).then((paths) => {
    console.log(paths);
    // 重定向
    res.redirect(`/static/${bvid}_new.mp4`);
  });
});

app.get("/danmaku", (req, res) => {
  let time = req.query.time;

  console.log(time)
  let danmaku = XML2DanmakuData("./assets/bilibili-danmaku.xml");

  let data = [];
  for (let index in danmaku) {
    if (Math.abs(danmaku[index].timestamp - time) < 0.5) {
      data.push(danmaku[index]);
    }
  }
  res.json(data);
});

io.on("connection", (socket) => {
  console.log("成功建立websocket连接");
  sockets = socket;
  let danmaku = XML2DanmakuData("./assets/bilibili-danmaku.xml");
  socket.on("RequestDanmakuData", (data) => {
    console.log(data);
    let time = data.time;
    let res = [];
    for (let index in danmaku) {
      if (Math.abs(danmaku[index].timestamp - time) < 0.5) {
        res.push(danmaku[index]);
      }
    }
    socket.emit("SendDanmakuData", res);
  });
});

http.listen(80, () => {
  console.log("listening on *:80");
});
