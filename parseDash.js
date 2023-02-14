const { spawn } = require('child_process');
module.exports = function parseDash(obj) {
   
    return new Promise((res,rej) => {
        let video = obj.video;
        let url = video[0].base_url;
        console.log(url)
        let py = spawn("python",['./spider.py', url])

        py.stdout.on("data",(value) => {
            console.log(value);
            res();
        })
    })

}