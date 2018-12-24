import axios from 'axios';
import Vue from 'vue';
import * as utils from '../lib/utils';
// import {Spin,Notice}  from 'iview';
// import router from ''

let options = {}
// The server-side needs a full url to works
if (process.server) {
  // options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}/api`
}
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;


//请求之前
axios.interceptors.request.use((config)=>{
  // console.log(config)
  // Spin.show();
  return config;
});

//登陆失效跳转登录页面
axios.interceptors.response.use(
  response => {
    console.log('-------axiosResponse---------')
    // console.log(response);
    // Spin.hide();
    return response;
  },
  error => {
    console.log('-------axiosError---------');
    console.log(error.response.status);
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          // if (process.server){
            utils.clearLocalStorage();
            console.log(window.location)
            window.location.href= '/login?url'+window.location.pathname
          // }
      }
    }
    // Spin.hide();
    // Notice.error({
    //   title: '温馨提示：',
    //   desc: '网络请求失败，请稍后再试'
    // });
    // console.log(error.response.status);
    
    return Promise.reject(error.response.data)
  }
);
export default axios;