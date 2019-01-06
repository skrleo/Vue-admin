const pkg = require('./package')

module.exports = {
  mode: 'universal',
  dev: {
    proxyTable: {
        '/api':
          {
              target: 'http://api.example.com/', 
              pathRewrite: { '^/v1.0/api': '/' }
          }
      }
    },

  /*
  ** Headers of the page
  */

  head: {
    title: '后台管理',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */

  // loading bar style 
  loading: { color: '#3B8070' },
  // 环境变量
  env: {
    baseUrl: process.env.BASE_URL || 'http://api.example.com/v1.0/api'
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'mavon-editor/dist/css/index.css',
    './assets/icon/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/element-ui', ssr: true }, 
    { src: '~plugins/mavon-editor', ssr: true }, 
    { src: '~plugins/v-charts', ssr: false }   //ssr设置为false的时候，只在客户端引入
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // 请求代理配置，解决跨域
    '@nuxtjs/proxy'
  ],

  proxy:[
      ['/json.html',{target:'http://api.example.com/', pathRewrite: { '^/v1.0/api': '/' }}]    //注意这也是一个数组
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
  }
}
