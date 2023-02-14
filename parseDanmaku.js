// 用于解析B站的XML弹幕文件
const fs = require("fs");
const parser = require("xml2json");
function parseBilibiliXML(data) {
  let res = [];
  let json = parser.toJson(data);

  let obj = JSON.parse(json);

  for (let text of obj.i.d) {
    let ps = text.p.split(",").map((item) => parseFloat(item));
    let obj = {};
    let time = ps[0];
    let model; // 弹幕的模式
    if (ps[1] >= 1 && ps[1] <= 3) {
      model = "scroll";
    } else if (ps[1] === 4) {
      model = "bottom";
    } else if (ps[1] === 5) {
      model = "top";
    } else {
      model = "default";
    }
    let size = ps[2];
    let color = "#" + ps[3].toString(16);
    obj = {
      timestamp: time,
      fontSize: size,
      fontColor: color,
      message: text.$t
    };

    res.push(obj);
  }

  return res
}

function XML2DanmakuData(path) {
    let data = fs.readFileSync(path, "utf-8");
    let res = parseBilibiliXML(data)


    function cmp(obj1,obj2) {
        return obj1.time - obj2.time
    }

    res.sort(cmp);
    return res;
}

exports.parseBilibiliXML = parseBilibiliXML;
exports.XML2DanmakuData = XML2DanmakuData;

