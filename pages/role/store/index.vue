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
            <el-input v-model="role.name" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" prop="state">
             <el-radio-group v-model="role.state">
              <el-radio label="0">启用</el-radio>
              <el-radio label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" style="width:600px" prop="description">
            <el-input type="textarea" v-model="role.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
    layout: 'frame',
    data() {
      return {
        role:{
          name:'',
          state:'',
          description:''
        },
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        axios.post('/admin/rbac/role',qs.stringify({
            name: this.role.name,
            state: this.role.state,
            description: this.role.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加角色',
                  type: 'success'
                });
            }
          }).catch(res => {
            if(res.response.data.message === ''){
              this.$message.error('请求异常，请稍后重试！');
            }else{
              this.$message.error(res.response.data.message);
            }
          });
      }
    }
  }
</script>