# bilibili-service
提供B站的弹幕和视频流服务，只需输入B站视频的bvid即可获取对应视频的视频流和弹幕池信息

## 使用方式
1. 首先将项目clone到本地，运行```pnpm i```命令初始化。
2. 找到index.js文件，运行```node index.js```
3. 到B站上找到你喜欢视频的bvid，接着在浏览器访问本地服务```https://127.0.0.1?getVideoData=(bvid)```


## 视频bvid获取步骤
所谓的bvid很好获取，首先找到你喜欢的视频播放页面，右击选择__复制视频地址__：
![image](https://user-images.githubusercontent.com/69229785/218742193-8524c3fd-66ab-44e4-9542-269046d926af.png)
接着我们会获得如下的地址：
```txt
https://www.bilibili.com/video/BV1Ud4y1V79P?t=0.7
```
其中的__BV1Ud4y1V79P__就是该视频的bvid，其余视频也是同理。

## 数据
1. B站获取到的弹幕池数据是xml类型的文本：
![image](https://user-images.githubusercontent.com/69229785/218742618-791d200b-8642-4ff6-91d6-9f939cb56242.png)
2. 视频流数据不是单纯的mp4文件，引文B站使用的是MPEG-DASH流媒体协议，因此获取的视频数据是json文本格式，其中的组织形式类似于manifest文件，描述的类似于每一个视频和音频分片的数据，例如分辨率，地址，大小，码率等；后缀名为m4s；如下图：
![image](https://user-images.githubusercontent.com/69229785/218743610-0c92ec8d-b9b2-4dc0-9ce6-bec8f037bc25.png)
