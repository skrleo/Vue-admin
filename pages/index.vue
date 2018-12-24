<template>
    <div class="demo-input-suffix" style="margin-top:200px;">
      <h2>后台登录系统</h2>
      <div style="margin-top: 15px;">
        <el-input
            placeholder="请输入账号/邮箱">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input
            placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-checkbox>记住密码</el-checkbox><a href="#" style="float:right;color:rgb(103, 102, 102);">忘记密码?联系管理员</a>
      </div>
      <div style="margin-top: 15px;">
          <nuxt-link :to="{name:'main'}">
            <el-button type="primary" style="width:320px;">立即登录</el-button>
          </nuxt-link>
      </div>
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
export default {
    data() {
    }
}
</script>