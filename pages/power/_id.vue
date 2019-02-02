<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/power' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加权限</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="manage" :model="manage" label-width="80px" size="medium">
          <el-form-item v-model="manage" label="用户名称" style="width:400px">
              <span style="color:#000;">{{manage.hasOneUserBaseModel.name}}</span>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-checkbox-group v-model="manage.hasManyUserToRoleModel" @change="checkinlist">
              <el-checkbox v-for="item in role" :key="item.roleId" :label="item.roleId" :value="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" style="width:600px">
            <el-input type="textarea" v-model="form.desc" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdate(form.manageId)">立即修改</el-button>
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
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      let [role, manage] = await Promise.all([
        axios.get('/rbac/role/lists'),
        axios.get(`/rbac/manage/${params.id}`)
      ])
      return {
        role: role.data.lists,
        manage: manage.data.data
      }
    },
    data() {
      return {
        form: {
          role:[]
        },
        user: '',
      }
    },
    methods: {
      onUpdate(val) {
        // let uids = this.users.map(item => item.uid)
        axios.put('rbac/purview/user/role',qs.stringify({
            uid: this.user.uid,
            roleIds: this.roleIds
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加节点',
                  type: 'success'
                });  
              this.dialogVisible = false;   
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