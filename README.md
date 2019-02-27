# vue-admin

> 基于vue的nuxt.js 服务渲染框架的后台框架，使用了docker部署方式。

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
docker 运行方式:

先构建镜像
<p><code> docker build -t nuxt-admin . </code></p>
然后启动容器
<p><code> docker run -dt -p 8080:3000 nuxt-admin </code></p>
打开浏览器访问
<p><code> <服务器 IP>:8080 </code></p>



For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
