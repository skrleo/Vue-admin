<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="article" ref="article" label-width="80px" size="medium">
      <el-form-item label="名称" prop="title">
        <el-input  v-model="article.title" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="跳转类型" prop="categoryId">
        <el-select v-model="article.categoryId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转地址" prop="price">
        <el-input  v-model="article.price" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="article.status">
          <el-radio label="0">待发布</el-radio>
          <el-radio label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告封面">
        <el-upload
          class="avatar-uploader"
          action="http://api.example.com/v1.0/api/upload/img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="onBeforeUploadImage">
          <img v-if="article.cover" :src="article.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie'
export default {
  layout: 'main',
  data() {
    return {
      dialogVisible: false,
      tags: [],
      tagVisible: false,
      article:{
        cover:'',
        title:'',
        reason: '', 
        name:'',
        price:'',
        address:'',
        openTime:'',
        status: 0,     
        recommend:'',      
        categoryId:''
      },
      options: [{
        value: '0',
        label: '推荐'
      }, {
        value: '1',
        label: '景点'
      }, {
        value: '2',
        label: '活动'
      }, {
        value: '3',
        label: '产品'
      }],
    }
  },
  methods: {
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    },
    uploadSuccess(response, file, fileList){
      this.article.cover = response.data.filePath;
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
            url: 'server url',
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
            $vm.$img2Url(pos, url);
        })
    },
    handleInputConfirm() {
      axios.post('/admin/article/tag',qs.stringify({
          name: this.article.name
        })).then(res => {
          //判断是否请求成功
          if(res.data.errorId === 'OK'){
            /**
             * 获取tagId
             */
            const tagId = res.data.data.tagId;
            const tagName = this.article.name;
            this.tags.push({
                  tagId : tagId,
                  name : tagName
              });
            this.tagVisible = false;
            this.article.tagName = '';
          }
        })
    },
    onSubmit() {
      const Uid = Cookie.get('Uid');
      axios.post('/admin/article',qs.stringify({
          uid: Uid,
          title: this.article.title,
          tagIds: this.tags||[],
          reason: this.article.reason || '',
          price: this.article.price || '',
          address: this.article.address || '',
          openTime: this.article.openTime || '',
          status: this.article.status,
          cover: this.article.cover || '',
          description: this.article.description || '',
          categoryId: this.article.categoryId || 0,
        })).then(res => {
          //判断是否请求成功
          if(res.data.errorId === 'OK'){
            this.$message({
                message: '成功添加轮播图',
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

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 118px;
    height: 118px;
    line-height: 118px;
    text-align: center;
  }
  .avatar {
    width: 118px;
    height: 118px;
    display: block;
  }
  a{
    color: #000;
    text-decoration-line: none;
  }
  ul li{
    list-style-type: none;
  }
 .el-footer {
    background-color: #39393b;
    color: #fafafa;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    width: 80%;
    margin: 0 auto;
  }
</style>