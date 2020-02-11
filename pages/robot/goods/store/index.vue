<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>发布商品</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="role" :model="goods" label-width="80px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="goods.name" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="商品ID" prop="itemid">
            <el-input v-model="goods.itemid" style="width:210px;"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" style="width:600px" prop="description">
            <el-input type="textarea" v-model="goods.description"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
             <el-radio-group v-model="goods.type">
                <el-radio label="1">拼多多</el-radio>
                <el-radio label="2">京东</el-radio>
                <el-radio label="3">淘宝</el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="现价" prop="currentPrice">
            <el-input v-model="goods.currentPrice" style="width:210px;"></el-input>
          </el-form-item>
           <el-form-item label="券后价" prop="couponPrice">
            <el-input v-model="goods.couponPrice" style="width:210px;"></el-input>
          </el-form-item>
          <el-form-item label="封面图" prop="logo">
            <el-upload
              class="avatar-uploader"
              action="http://api.homestead.com/v1.0/api/upload/img"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="onBeforeUploadImage">
              <img v-if="picUrl" :src="picUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
    data() {
      return {
        goods:[],
        select: ''
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
            this.picUrl = response.data.filePath;
        },
        onSubmit() {
            axios.post('/admin/robot/goods',qs.stringify({
                name: this.goods.name,
                type: this.goods.type,
                robotId: 2,
                itemid: this.goods.itemid,
                description: this.goods.description,
                picUrl: this.goods.picUrl,
                currentPrice: this.goods.currentPrice,
                couponPrice: this.goods.couponPrice
            })).then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                this.$message({
                    message: '成功添加商品',
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
  .el-select .el-input {
    width: 68px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
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
</style>
