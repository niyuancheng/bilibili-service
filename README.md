# bilibili-service
提供B站的弹幕和视频流服务，只需输入B站视频的bvid即可获取对应视频的视频流和弹幕池信息

## 使用方式
1. 首先将项目clone到本地，运行```pnpm i```命令初始化。
2. 找到index.js文件，运行```node index.js```
3. 到B站上找到你喜欢视频的bvid，接着在浏览器访问本地服务```https://127.0.0.1?getVideoData=(bvid)```
4. 接着你就会看到对应bvid的视频就已经完成下载并且在浏览器端播放了：
__PS，确保你本地已经安装好了python和ffmpeg，具体安装方式可自行google__
### 这是原视频：
![image](https://user-images.githubusercontent.com/69229785/218935232-dc6201a2-97cd-437e-b2f2-c4e4af9db63c.png)
### 本地启用服务后，输入该视频bvid
![image](https://user-images.githubusercontent.com/69229785/218935373-6f210436-eba7-468f-b027-adcb149da588.png)
### 接着等待片刻后，我们就可以看到视频已经加载成功了：
![image](https://user-images.githubusercontent.com/69229785/218936313-484377b6-b01a-4400-8b3b-ed1f13476902.png)
### 对应后台的文件已经下载到本地：
![image](https://user-images.githubusercontent.com/69229785/218936185-38c5215f-f4fa-4580-8eb3-36420a90a090.png)



## 视频bvid获取步骤
所谓的bvid很好获取，首先找到你喜欢的视频播放页面，右击选择_复制视频地址_：<br />
![image](https://user-images.githubusercontent.com/69229785/218742193-8524c3fd-66ab-44e4-9542-269046d926af.png)<br/>
接着我们会获得如下的地址：
```txt
https://www.bilibili.com/video/BV1Ud4y1V79P?t=0.7
```
其中的BV1Ud4y1V79P就是该视频的bvid，其余视频也是同理。

## 数据
1. B站获取到的弹幕池数据是xml类型的文本：
![image](https://user-images.githubusercontent.com/69229785/218742618-791d200b-8642-4ff6-91d6-9f939cb56242.png)
2. 视频流数据不是单纯的mp4文件，因为B站使用的是MPEG-DASH流媒体协议，因此获取的视频数据是json文本格式，其中的组织形式类似于manifest文件，描述的类似于每一个视频和音频分片的数据，例如分辨率，地址，大小，码率等；后缀名为m4s；如下图：
![image](https://user-images.githubusercontent.com/69229785/218743610-0c92ec8d-b9b2-4dc0-9ce6-bec8f037bc25.png)

## 弹幕数据解析
本项目提供了对B站弹幕文件的解析，我们可以看到B站的弹幕文件每一个弹幕都是包裹着<d>。。。。</d>,其中的p就是描述了弹幕的属性。<br />
![image](https://user-images.githubusercontent.com/69229785/218744551-4cc0dea4-e1dd-4576-8e51-a001ee52df29.png)
- 参数1（227.02100）：弹幕出现的时间，以秒数为单位
- 参数2（1）：弹幕的模式，1-3 滚动弹幕，4 底端弹幕，5顶端弹幕，6 逆向弹幕，7 精准定位，8 高级弹幕
- 参数3（25）：字号 （12非常小，16特小，18小，25中，36大，45很大，64特别大）
- 参数4（9033215）：字体的颜色；这串数字是十进制表示；通常软件中使用的是十六进制颜色码；
           e.g:
           白色   
           RGB值：(255,255,255)     
           十进制值：16777215      
           十六进制值：#FFFFFF
- 参数5（1673862377）：unix时间戳，从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数
- 参数6（0）：弹幕池，0普通池，1字幕池，2特殊池 【目前特殊池为高级弹幕专用】
- 参数7（91b2bf5a）：发送者的ID，用于“屏蔽此弹幕的发送者”功能
- 参数8（1231205872512908544）：弹幕在弹幕数据库中rowID 用于“历史弹幕”功能。

## B站API接口
1. 获取视频aid: https://api.bilibili.com/x/player/pagelist?bvid=(bvid)
2. 获取视频cid: https://api.bilibili.com/x/web-interface/view?cid=${cvid}&bvid=${bvid}
3. 获取对应视频的弹幕池文件： https://api.bilibili.com/x/v1/dm/list.so?oid=(cvid)
4. 获取视频流文件（多种清晰度）：https://api.bilibili.com/x/player/playurl?fnval=80&avid=${avid}&cid=${cvid}
