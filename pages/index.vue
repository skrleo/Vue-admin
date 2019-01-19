<template>
    <div class="demo-input-suffix" style="margin-top:200px;">
      <h2>后台登录系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="account">
          <el-input
              v-model="ruleForm.account"
              placeholder="请输入账号/邮箱/手机号码">
              <i slot="prefix" class="el-input__icon el-icon-third-zhanghao"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-third-mima"></i>
          </el-input>
        </el-form-item>
        <div style="margin-top: 15px;">
          <el-checkbox>记住密码</el-checkbox><a href="#" style="float:right;color:rgb(103, 102, 102);">忘记密码?联系管理员</a>
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
        this.$router.push('/main'); 
      }
    },
    data() {
      return {
        ruleForm: {
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
        }
      };
    },
    methods: {
      submit (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            axios.post('/login',qs.stringify({
                account: this.ruleForm.account,
                password: this.ruleForm.password
              })).then(res => {
                //将服务端的token存入cookie当中
                Cookie.set('token', res.data.token)
                //判断是否请求成功
                if(res.data.statusCode === '200'){
                  this.$router.push({
                    path: '/main',
                  });               
                }
              }).catch(res => {
                this.$message.error('账号或者密码错误');
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
		mounted () {
       let rediretUrl = this.$route.query.ref;
      if (rediretUrl){
        this.redirectURL = rediretUrl
      }
      var a_index = 0;
      $("body").click(function(e){
          var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
          var $i = $("<span/>").text(a[a_index]);
          a_index = (a_index + 1) % a.length;
          var x = e.pageX,y = e.pageY;
          $i.css({
              "z-index": 99999,
              "top": y - 20,
              "left": x,
              "position": "absolute",
              "font-weight": "bold",
              "color": "#ff6651"
          });
          $("body").append($i);
          $i.animate({"top": y-180,"opacity": 0},1500,function() {
              $i.remove();
          });
      });
		}
}
</script>