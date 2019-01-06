<template>
    <div class="demo-input-suffix" style="margin-top:200px;">
      <h2>后台登录系统</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <div style="margin-top: 15px;">
          <el-input
              v-model="form.account"
              placeholder="请输入账号/邮箱">
              <i slot="prefix" class="el-input__icon el-icon-third-zhanghao"></i>
          </el-input>
        </div>
        <div style="margin-top: 15px;">
          <el-input
              v-model="form.password"
              placeholder="请输入密码">
              <i slot="prefix" class="el-input__icon el-icon-third-mima"></i>
          </el-input>
        </div>
        <div style="margin-top: 15px;">
          <el-checkbox>记住密码</el-checkbox><a href="#" style="float:right;color:rgb(103, 102, 102);">忘记密码?联系管理员</a>
        </div>
        <div style="margin-top: 15px;">
          <el-button type="primary" style="width:320px;" @click="login">立即登录</el-button>
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
import axios from '~/plugins/axios'
export default {
    data() {
      return {
        form:{
          account:'',
          password: ''
        }
      }
    },
    // async asyncData () {
    //   let { data } = await axios.get('/hello')
    //   console.log(data)
    //   return { users: data }
    // },
    methods: {
      async login () {
        // 为给定 ID 的 user 创建请求
        axios.get('/hello')
          .then(function (response) {
            this.$message({
              showClose: true,
              message: '登录成功, 即将跳转...',
              type: 'success'
              });
            console.log(response);
          })
          .catch(function (error) {
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            });
            console.log(error);
          });
      }
    },
		mounted () {
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