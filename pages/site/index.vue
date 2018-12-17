<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>站点设置</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="网站名称" style="width:400px" >
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="ICP备案号" style="width:400px" >
       <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="网站状态" style="width:400px" >
       <el-switch
        v-model="value3"
        active-text="启用"
        inactive-text="关闭">
        </el-switch>
    </el-form-item>
    <el-form-item label="网站Logo" size="mini">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-form-item>
    <el-form-item label="SEO关键字" style="width:400px" >
       <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="网站描述" style="width:600px" >
        <el-input type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" size="mini">立即修改</el-button>
      <el-button size="mini">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  export default {
    layout: 'main',
    data() {
      return {
        value3: true,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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