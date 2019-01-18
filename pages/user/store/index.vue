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
      <el-input v-model="form.name" style="width:400px" ></el-input>
    </el-form-item>
    <el-form-item label="用户头像">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>    
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
    <el-form-item label="账号密码">
      <el-input v-model="form.password" style="width:350px" ></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="form.name" style="width:350px" ></el-input>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input v-model="form.nickname" style="width:350px" ></el-input>
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-input v-model="form.email" style="width:350px" ></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input v-model="form.phone" style="width:350px" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  export default {
    layout: 'main',
    data() {
      return {
        form: {
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
        console.log('submit!');
      }
    }
  }
</script>