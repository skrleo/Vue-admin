<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加角色</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="角色名称">
      <el-input v-model="form.account" style="width:400px" ></el-input>
    </el-form-item>
    <el-form-item v-model="form.users" label="用户名称" style="width:400px" >
      <el-tag @close="removeTag(tag)" v-for="tag in users" :key="tag.uid" closable>
          {{tag.name}}
        </el-tag>
      <el-button type="primary" size="small" @click="chooseUsers">选择用户</el-button>
    </el-form-item>
    <el-form-item label="状态">
      <el-radio-group v-model="form.sex">
        <el-radio label="关闭"></el-radio>
        <el-radio label="启用"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户角色">
        <el-checkbox-group v-model="form.type">
        <el-checkbox v-for="item in role" :key="item.roleId" :label="item.name" :value="item.roleId"></el-checkbox>
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
  <!-- 添加管理员组件 -->
  <el-user-list :dialogVisible.sync="dialogVisible" :users.sync="users"></el-user-list>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  import userlist from '~/components/common/user-lists-radio.vue'
  export default {
    layout: 'main',
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
          account: '',
          name: '',
          status: '',
          sex: '',
          password: '',
          nickname: '',
          email: '',
          phone: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        axios.post('/user',qs.stringify({
            account: this.form.account,
            name: this.form.name,
            status: 1,
            sex: 1,
            password: this.form.password,
            nickname: this.form.nickname,
            headimg: 1,
            email: this.form.email,
            phone: this.form.phone
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加用户',
                  type: 'success'
                });  
              this.dialogVisible = false;   
            }
          }).catch(res => {
            this.$message.error('请求错误，请重试');
          });
        console.log('submit!');
      },
      chooseUsers(){
        this.dialogVisible = true;
        console.log('chooseUsers!');
      },
    }
  }
</script>