<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>站点设置</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="siteConfig" label-width="120px">
    <el-form-item label="网站名称" style="width:400px" >
      <el-input v-model="siteConfig.title"></el-input>
    </el-form-item>
    <el-form-item label="ICP备案号" style="width:400px" >
       <el-input v-model="siteConfig.icpBeian"></el-input>
    </el-form-item>
    <el-form-item label="网站状态" style="width:400px" >
       <el-switch
        v-model="status"
        active-text="启用"
        inactive-text="关闭">
        </el-switch>
    </el-form-item>
    <el-form-item label="网站Logo" size="mini">
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
    <el-form-item label="SEO关键字" style="width:400px" >
       <el-input v-model="siteConfig.keywords"></el-input>
    </el-form-item>
    <el-form-item label="网站描述" style="width:600px" >
        <el-input type="textarea" v-model="siteConfig.description" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即修改</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  export default {
    layout: 'main',
    name:'site',
    async asyncData () {
      let { data } = await axios.get('site/1')
      console.log(data.lists);
      return {
        siteConfig: data.data
      }
    },
    data() {
      return {
        status:true
      }
    },
    methods: {
      onSubmit() {
        axios.put('site/1',qs.stringify({
            logo: 123,
            cover: 123,
            status: 1,
            title: this.siteConfig.title,
            icpBeian: this.siteConfig.icpBeian,
            keywords: this.siteConfig.keywords,
            description: this.siteConfig.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功修改站点配置',
                  type: 'success'
                });  
              this.dialogVisible = false;   
            }
          }).catch(res => {
            this.$message.error('请求错误，请重试');
          });
      }
    }
  }
</script>