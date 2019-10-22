<template>
    <div id="main">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="auth-logo">
                        <img style="width:100%;" src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" class="image">
                    </div>
                    <div class="auth-txt">
                        <span>授权平台：京东 <br/>授权时间：2019-04-16 10:26:51  <br/>状态：[<small style="color:red;"> 已过期 </small>] 重新授权</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="auth-logo">
                        <img style="width:100%;" src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" class="image">
                    </div>
                    <div class="auth-txt">
                        <span>授权平台：京东 <br/>授权时间：2019-04-16 10:26:51  <br/>状态：[已过期]</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="auth-logo">
                        <img style="width:100%;" src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" class="image">
                    </div>
                    <div class="auth-txt">
                        <span>授权平台：京东 <br/>授权时间：2019-04-16 10:26:51  <br/>状态：[已过期]</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="auth-logo">
                        <img style="width:100%;" src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" class="image">
                    </div>
                    <div class="auth-txt">
                        <span>授权平台：京东 <br/>授权时间：2019-04-16 10:26:51  <br/>状态：[已过期]</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
 <script>

  import qs from 'qs';
  import axios from '~/plugins/axios.js';

  export default {
    layout:'frame',
    name:'authorize',
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style>
  .auth-logo {
    width:30%;
    float:left;
    overflow: hidden;
  }
  .auth-txt{
      width:64%;
      float:left;
      padding: 6px 12px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>