//TODO 专门为部署到vercel服务器上写的接口

var { XML2DanmakuData } = require("../parseDanmaku");

module.exports = (req, res) => {
  let time = req.query.time;

  let danmaku = XML2DanmakuData("./assets/bilibili-danmaku.xml");

  let data = [];
  for (let index in danmaku) {
    if (Math.abs(danmaku[index].timestamp - time) < 0.5) {
      data.push(danmaku[index]);
    }
  }
  res.send(JSON.stringify(data));
};
