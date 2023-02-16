//TODO 专门为部署到vercel服务器上写的接口

var { parseBilibiliXML } = require("../parseDanmaku");

var {str} = require("../danmakuStr")
module.exports = (req, res) => {
  let time = req.query.time;

  let danamku = parseBilibiliXML(str)

  function cmp(obj1,obj2) {
      return obj1.time - obj2.time
  }

  res.sort(cmp);

  let data = [];
  for (let index in danmaku) {
    if (Math.abs(danmaku[index].timestamp - time) < 0.5) {
      data.push(danmaku[index]);
    }
  }
  res.send(JSON.stringify(data));
};
