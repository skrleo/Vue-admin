<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px" size="small" >
    <el-form-item label="账户名称">
      <el-input v-model="form.account" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="用户头像">
  
    </el-form-item>
    <el-form-item label="是否可用">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
        <el-radio label="保密"></el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="账号密码">
      <el-input v-model="form.password" style="width:280px" ></el-input>
    </el-form-item> -->
    <el-form-item label="真实姓名">
      <el-input v-model="form.name" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="form.nickname" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-input v-model="form.email" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.phone" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="备注" style="width:600px">
      <el-input type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
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
    // created: function () {
    //     console.log(params);
    //   axios.get(`user/${this.id}`)
    //     .then(res => {
    //       console.log(res.data);
    //       this.lists = res.data.lists || [];
    //     });
    // },
    async asyncData ({ params }) {
      let {data} = await axios.get(`user/${params.id}`);
      console.log(data.data);
      return {
        form: data.data,
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
        }
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
      }
    }
  }
</script>