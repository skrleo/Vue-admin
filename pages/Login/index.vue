<template>

    <div class="demo-input-suffix">
      <h2>后台登录系统</h2>
      <div style="margin-top: 15px;">
        <el-input
            placeholder="请输入账号/邮箱"
            v-model="input23">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-input
            placeholder="请输入密码"
            v-model="input23">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div style="margin-top: 15px;">
        <el-checkbox v-model="checked">记住密码</el-checkbox><a href="#" style="float:right;color:rgb(120, 98, 98);">还没有账号?立即注册</a>
      </div>
      <div style="margin-top: 15px;">
        <el-button type="primary" round style="width:280px;margin-left:40px;">立即登录</el-button>
      </div>
    </div>
    
</template>

<style>
  a{
    text-decoration:none;
  }
  .demo-input-suffix{
    width: 360px;
    margin: 68px auto;
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
    return {
      checked: true,
      input2: '',
      input21: '',
      input22: '',
      input23: ''
    }
  }
}
</script>