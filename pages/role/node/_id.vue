<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/power' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加角色</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="role" :model="role" label-width="80px" size="medium">
          <el-form-item label="角色名称" prop="name">
            <span style="color:#000;">超级管理员</span>
          </el-form-item>
          <el-form-item label="关联节点">
            <el-tree
                :data="node"
                :props="name"
                show-checkbox
                node-key="nodeId"
                default-expand-all
                :expand-on-click-node="false"
                :render-content="renderContent">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即关联</el-button>
            <el-button>取消</el-button>
          </el-form-item>
      </el-form>
    </el-row>
  </el-row>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  
  export default {
    layout: 'main',
    async asyncData () {
      let { data } = await axios.get('/rbac/node/lists')
      return {
        node: JSON.parse(JSON.stringify(data.lists))
      }
    },
    data() {}
  };
</script>