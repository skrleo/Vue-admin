<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名称" style="width:400px" >
      <el-button type="primary" size="medium" @click="dialogVisible = true">选择用户</el-button>
    </el-form-item>
    <el-form-item label="所属部门">
      <el-select v-model="form.region" placeholder="请选择所属部门">
        <el-option v-for="item in nodeParent" :key="item.nodeId" :label="item.label" :value="item.nodeId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否可用">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="用户角色">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="超级管理员" name="type"></el-checkbox>
        <el-checkbox label="普通管理员" name="type"></el-checkbox>
        <el-checkbox label="普通用户" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注" style="width:600px">
      <el-input type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="35%">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
          <el-switch v-model="form.state"></el-switch>
      </el-form-item>
      <el-form-item label="角色描述">
          <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="sumbit">立即创建</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout: 'main',
    async asyncData () {
      let { data } = await axios.get('/rbac/node/lists')
      console.log(data.lists);
      return {
        nodeParent: data.lists
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>