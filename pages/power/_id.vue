<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑权限</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="manage" :model="manage" label-width="80px" size="medium">
          <el-form-item v-model="manage.uid" label="用户名称" style="width:400px">
              <span style="color:#000;">{{manage.hasOneUserBaseModel.name}}</span>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-checkbox-group v-model="manage.roleIds" @change="checkinlist">
              <el-checkbox v-for="item in role" :key="item.roleId" :label="item.roleId" :value="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" style="width:600px">
            <el-input type="textarea" v-model="manage.description" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdate(manage.manageId)">立即修改</el-button>
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
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      const [role, manage] = await Promise.all([
        axios.get('/admin/rbac/role/lists'),
        axios.get(`/admin/rbac/manage/${params.id}`)
      ])
      return {
        role: role.data.lists,
        manage: manage.data.data
      }
    },
    data() {
      return {
        manage: {
          uid:'',
          role:[],
          description:''
        }
      }
    },
    methods: {
      onUpdate(val) {
        axios.put( `/admin/rbac/manage/${val}`,qs.stringify({
            uid: this.manage.uid,
            roleIds: this.manage.roleIds,
            description: this.manage.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功编辑权限',
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