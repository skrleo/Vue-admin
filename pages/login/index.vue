<template>
    <div class="demo-input-suffix" style="margin-top:200px;">
      <h2>后台登录系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="account">
          <el-input
              v-model="ruleForm.account"
              placeholder="请输入账号/邮箱/手机号码" clearable>
              <i slot="prefix" class="el-input__icon el-icon-third-zhanghao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" @blur="showImgVerify" show-password>
            <i slot="prefix" class="el-input__icon el-icon-third-mima"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-if="isShow" prop="imgVerify">
          <el-input type="text" v-model="ruleForm.imgVerify" auto-complete="off" placeholder="验证码">
            <template slot="append">
              <img :src="imgVerifySrc" alt="" class="imgVerifySrc" @click="getImgVerify">
            </template>
          </el-input>
        </el-form-item>
        <div style="margin-top: 15px;">
          <el-checkbox checked>记住密码</el-checkbox><a href="#" style="float:right;color:rgb(103, 102, 102);">忘记密码?联系管理员</a>
        </div>
        <div style="margin-top: 15px;">
          <el-button type="primary" style="width:320px;" @click="submit('ruleForm')">立即登录</el-button>
        </div>
      </el-form>
    </div>
    
</template>

<style>
  a{
    text-decoration:none;
  }
  .demo-input-suffix{
    width: 320px;
    margin: 88px auto;
  }
  .demo-input-suffix h2{
    text-align: center;
  }
  el-input{
    margin-top: 15px;
  }
  .imgVerifySrc{
    margin-top: 2px;
    width: 80px;
    height: 32px;
  }
</style>

<script>
import qs from 'qs';
import axios from '~/plugins/axios.js'
import Cookie from 'js-cookie'
import utils from '~/utils/utils'

export default {
    name:'login',
    created:function(){
      var token = utils.getcookiesInClient('token')
      if (token) {
        this.$router.push('/'); 
      }
    },
    data() {
      return {
        isShow:0,
        ruleForm: {
          imgVerifySrc:'',
          imgVerify:'',
          verifyGuid: this.createGuid(),
          account:  '',
          password: ''
        },
        rules: {
          account: [
            { required: true, message: '账号/邮箱/手机号码 不能为空'}
          ],
          password: [
            { required: true, message: '密码 不能为空'}
          ]
        },
        visible: true
      };
    },
    methods: {
      getImgVerify () {
        axios.get('/verify/img', {
              params: {
                verifyGuid: this.ruleForm.verifyGuid,
                '_rand': parseInt(Math.random() * 9900000)
              }
            }).then(res => {
                console.log(res);
                //判断是否请求成功
                if(res.data.statusCode == '200'){
                  this.imgVerifySrc = res.data.data.base64
                }
              })
              .catch(res => {
                if(res.response.data.message === ''){
                  this.$message.error('请求异常，请稍后重试！');
                }else{
                  this.$message.error(res.response.data.message);
                }
              });
      },
      showImgVerify () {
        if (this.ruleForm.account === '') return
            axios.get(`code/count?account=${this.ruleForm.account}`)
              .then(res => {
                  console.log(res);
                  //判断是否请求成功
                  if(res.data.statusCode == '200'){
                    this.isShow = res.data.data.isShow;
                  }
                })
                .catch(res => {
                  if(res.response.data.message === ''){
                    this.$message.error('请求异常，请稍后重试！');
                  }else{
                    this.$message.error(res.response.data.message);
                  }
                });
      },
      submit (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            axios.post('/login',qs.stringify({
                type: 1,
                verifyGuid: this.ruleForm.verifyGuid,
                imgVerify:this.ruleForm.imgVerify,
                account: this.ruleForm.account,
                password: this.ruleForm.password
              })).then(res => {
                console.log(res);
                //判断是否请求成功
                if(res.data.statusCode == '200'){
                  this.uid = res.data.data.uid;
                  //存储用户Uid
                  Cookie.set('Uid', this.uid);
                  //将服务端的token存入cookie当中
                  Cookie.set('token', res.data.token);
                  this.$router.push({
                    path: '/',
                  });               
                }
              })
              .catch(res => {
                if(res.response.data.message === ''){
                  this.$message.error('请求异常，请稍后重试！');
                }else{
                  this.$message.error(res.response.data.message);
                }
              });
          } else {
            return false;
          }
        });
      },
      createGuid() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
              return v.toString(16);
          });
      }
    },
		mounted () {
      this.getImgVerify();
      let rediretUrl = this.$route.query.ref;
      if (rediretUrl){
        this.redirectURL = rediretUrl
      }
		}
}
</script>