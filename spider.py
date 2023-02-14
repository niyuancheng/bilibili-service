import requests
import sys
headers = {
    'Referer': 'https://www.bilibili.com',  
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
}

def getMediaData(url):
    response = requests.get(url, headers=headers).content
    print(response)
    with open("./test.mp4",mode="wb") as f:
        f.write(response)

 
def main():
    url = sys.argv[1]
    print(url)
    getMediaData(url)

# sys模块向输出缓冲区输出数据，通知nodejs线程数据处理完成
    sys.stdout.flush()
 
if __name__ == '__main__':
    main()