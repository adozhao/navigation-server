### 说明
- 本项目最初的想法是想构建一套私人导航页，供家中NAS使用，因为NAS上跑的服务太多，端口号记不住。而目前市面上的导航页太过花哨，且大部分没有登录功能，不满足私人使用条件，毕竟NAS上部署的服务甚至是真实的地址都是不能够对外暴露的，所以业余时间写了这么一套，
- 计划是日后有时间封装成docker应用在NAS中使用。本项目包括[服务端](https://github.com/github-ado/navigation-server)和[客户端](https://github.com/github-ado/navigation-client),由于事件关系，日后还有很多需要完善的地方...

### 功能
- 支持登录、注册
- 支持分类的新增/编辑
- 支持链接的新增/删除
- 支持分类的拖拽排序
- 支持上传/替换背景图片
- 支持链接的打开方式
- 支持移动端显示和操作
...

### 相关技术
后端：NodeJs/Express/Mongodb/PM2/jwt/log4js...<br/>
前端：vue2/vue-router/axios/element-ui/sass...

### 项目启动
- 运行环境<br/>
1.本地需安装NodeJs,为确保项目运行，可以用nvm安装并切换为node v14.16.1 版本<br/>
2.本地需安装mongodb，并注意代码中相关mongodb的配置信息<br/>
3.全局安装pm2<br/>
- 项目运行<br/>
```
npm i
npm start
```
>服务端以3000端口运行，可以浏览器打开localhost:3000，如页面出现`service start success!`字样，代表启动成功
### 项目预览
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/1.png)
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/2.png)
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/3.png)
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/4.png)<br/>
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/5.png)<br/>
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/6.png)<br/>
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/7.png)<br/>
![](https://github.com/github-ado/navigation-client/blob/main/screenshots/8.png)
