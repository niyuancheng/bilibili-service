import requests
import sys
import time
headers = {
    'Referer': 'https://www.bilibili.com',  
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
}

def saveFile(data, name):
    with open("./public/" + name, mode="wb") as f:
        f.write(data)


# 获取视频和音频的二进制流数据
def getMediaData(url,bvid):
    videoResponse = requests.get(url.get("video"), headers=headers).content
    audioResponse = requests.get(url.get("audio"), headers=headers).content
    saveFile(videoResponse,bvid + ".mp4")
    saveFile(audioResponse,bvid + ".mp3")
 
def main():
    videoUrl = sys.argv[1]
    audioUrl = sys.argv[2]
    bvid = sys.argv[3]
    getMediaData({
        "video": videoUrl,
        "audio": audioUrl
    },bvid)

    print("success")
# sys模块情况输出缓冲区
    sys.stdout.flush()

if __name__ == '__main__':
    main()