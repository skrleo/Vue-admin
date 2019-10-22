<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="banner" ref="banner" label-width="80px" size="medium">
      <el-form-item label="名称" prop="name">
        <el-input  v-model="banner.name" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="跳转类型" prop="jump_type">
        <el-select v-model="banner.jumpType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="跳转地址" prop="jumpUrl">
        <el-input  v-model="banner.jumpUrl" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="banner.status">
          <el-radio label="0">待发布</el-radio>
          <el-radio label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告封面">
        <el-upload
          class="avatar-uploader"
          action="http://api.homestead.com/v1.0/api/upload/img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="onBeforeUploadImage">
          <img v-if="banner.thumb" :src="banner.thumb" class="avatar">
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
  layout: 'frame',
  data() {
    return {
      dialogVisible: false,
      tags: [],
      tagVisible: false,
      banner:{
        name:'',
        thumb:'',
        jumpType:'',
        jumpUrl:'',
        status: 0
      },
      options: [{
        value: '0',
        label: '商品详情'
      }, {
        value: '1',
        label: '活动消息'
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
      this.banner.thumb = response.data.filePath;
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
    onSubmit() {
      axios.post('/admin/banner',qs.stringify({
          name: this.banner.name,
          thumb: this.banner.thumb,
          jumpType: this.banner.jumpType,
          jumpUrl: this.banner.jumpUrl,
          status: this.banner.status,
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