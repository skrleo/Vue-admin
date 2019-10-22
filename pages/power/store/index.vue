<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加权限</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="form" :model="form" label-width="80px" size="medium">
          <el-form-item v-model="form.user" label="用户名称" style="width:400px">
              <span style="color:#000;">{{user.name}}</span>
            <el-button type="primary" size="small" @click="chooseUsers">选择用户</el-button>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-checkbox-group v-model="form.role" @change="checkinlist">
              <el-checkbox v-for="item in role" :key="item.roleId" :label="item.roleId" :value="item.name">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" style="width:600px">
            <el-input type="textarea" v-model="form.description" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
      </el-form>
    </el-row>
  </el-row>
    <!-- 添加管理员组件 -->
    <el-user-list :dialogVisible.sync="dialogVisible" :user.sync="user"></el-user-list>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import userlist from '~/components/common/user-lists-radio'
  
  export default {
    layout: 'frame',
    components: {
       'el-user-list':userlist
    },
    async asyncData () {
      let {data} = await axios.get('/admin/rbac/role/lists');
      return {
        role: data.lists,
      }
    },
    data() {
      return {
        form: {
          role:[]
        },
        user: '',
        dialogVisible: false
      }
    },
    methods: {
      checkinlist(val){
        this.roleIds = val;
        console.log(val);
      },
      onSubmit() {
        console.log(this.user.uid);
        // let uids = this.users.map(item => item.uid)
        axios.put('/admin/rbac/purview/user/role',qs.stringify({
            uid: this.user.uid,
            roleIds: this.roleIds
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加权限',
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
      },
      chooseUsers(){
        this.dialogVisible = true;
      }
    }
  }
</script>