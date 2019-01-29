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
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item v-model="form.users" label="用户名称" style="width:400px" >
            <el-tag @close="removeTag(tag)" v-for="tag in users" :key="tag.uid" closable>
                {{tag.name}}
              </el-tag>
            <el-button type="primary" size="small" @click="chooseUsers">选择用户</el-button>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-checkbox-group v-model="form.role" @change="checkinlist">
              <el-checkbox v-for="item in role" :key="item.roleId" :label="item.roleId" :value="item.name">{{item.name}}</el-checkbox>
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
    </el-row>
  </el-row>
    <!-- 添加管理员组件 -->
    <el-user-list :dialogVisible.sync="dialogVisible" :users.sync="users"></el-user-list>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import userlist from '~/components/common/user-lists-radio.vue'
  
  export default {
    layout: 'main',
    components: {
       'el-user-list':userlist
    },
    async asyncData () {
      let {data} = await axios.get('/rbac/role/lists');
      console.log(data.lists);
      return {
        role: data.lists,
      }
    },
    data() {
      return {
        form: {
          role:[]
        },
        users:[],
        dialogVisible: false
      }
    },
    methods: {
      checkinlist(val){
        this.roleIds = val;
        console.log(val);
      },
      removeTag (tag) {
        this.users.forEach((item, index) => {
          if (item.uid === tag.uid) {
            this.users.splice(index, 1)
          }
        })
      },
      onSubmit() {
        let uids = this.users.map(item => item.uid)
        axios.put('rbac/purview/user/role',qs.stringify({
            uids: uids,
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
            this.$message.error('请求错误，请重试');
          });
      },
      chooseUsers(){
        this.dialogVisible = true;
        console.log('chooseUsers!');
      },
      largeText(val){
        console.log(val);
      }
    }
  }
</script>