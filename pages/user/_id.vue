<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="banner">
      <el-row :gutter="20">
        <el-col :span="4">
          <img :src="user.headimg" :alt="user.headimg" style="width:100%;height:130px;">
        </el-col>
        <el-col :span="4">用户名称：{{user.name}}</el-col>
        <el-col :span="4">昵称：{{user.nickname}}</el-col>
        <el-col :span="3">性别：
          <span v-if="user.sex === 0">保密</span>
          <span v-else-if="user.sex === 1">男</span>
          <span v-else>女</span>
        </el-col>
        <el-col :span="3">状态：
          <span v-if="user.status === 0">启用</span>
          <span v-else>禁用</span>
        </el-col>
        <el-col :span="6">邮箱地址：{{user.email}} </el-col>
        <el-col :span="4">联系方式：{{user.phone}}</el-col>
        <el-col :span="3">登录次数：{{user.loginNum}} </el-col>
        <el-col :span="6">最后登录时间：{{user.lastLoginTime | d('yyyy-MM-dd hh:mm:ss')}}</el-col>
        <el-col :span="3"><el-button type="text">修改密码</el-button></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="操作历史">操作历史</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="用户消息">用户消息</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout: 'main',
    validate ({ params }) {
      // Must be a number
      if(/^\d+$/.test(params.id)){
        this.id = params.id;
      }
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      let {data} = await axios.get(`/admin/user/${params.id}`);
      return {
        user: data.data
      }
    },
    data() {
      return {}
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-row {
    line-height: 32px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    color: #000;
    margin-bottom: 12px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>