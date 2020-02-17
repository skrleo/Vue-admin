<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>站点设置</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-tabs type="border-card">
      <el-tab-pane label="站点设置">
        <el-form ref="siteConfig" :model="siteConfig" label-width="120px" size="medium">
          <el-form-item label="网站名称" style="width:400px" >
            <el-input v-model="siteConfig.title"></el-input>
          </el-form-item>
          <el-form-item label="网站状态" style="width:400px" >
            <el-radio-group v-model="siteConfig.status">
              <el-radio :label="0">启用</el-radio>
              <el-radio :label="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="网站Logo" prop="logo">
            <el-upload
              class="avatar-uploader"
              action="http://api.homestead.com/v1.0/api/upload/img"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :before-upload="onBeforeUploadImage">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="ICP备案号" style="width:400px" >
            <el-input v-model="siteConfig.icpBeian"></el-input>
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
      </el-tab-pane>
      <el-tab-pane label="微信支付配置">
        <el-form ref="siteConfig" :model="siteConfig" label-width="120px" size="medium">
          <el-form-item label="公众账号ID" style="width:550px" >
            <el-input v-model="siteConfig.title"></el-input>
          </el-form-item>
          <el-form-item label="商户号" style="width:550px" >
            <el-input v-model="siteConfig.title"></el-input>
          </el-form-item>
          <el-form-item label="API密钥" style="width:550px" >
            <el-input v-model="siteConfig.title"></el-input>
          </el-form-item>
          <el-form-item label="商户证书" prop="logo">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->证书下载 apiclient_cert.pem</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="商户证书秘钥" ><el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->证书下载 apiclient_key.pem</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="支付宝支付配置">
        <el-form ref="siteConfig" :model="siteConfig" label-width="120px" size="medium">
          <el-form-item label="合作者PID" style="width:550px" >
            <el-input v-model="siteConfig.title"></el-input>
          </el-form-item>
          <el-form-item label="支付宝公钥" style="width:650px" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              v-model="siteConfig.description">
            </el-input>
          </el-form-item>
          <el-form-item label="应用私钥" style="width:650px" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              placeholder="请输入内容"
              v-model="siteConfig.description">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import Cookie from 'js-cookie'
  
  export default {
    layout: 'frame',
    name:'site',
    async asyncData () {
      const Uid = Cookie.get('Uid');
      await axios.post('/admin/base/shortcut',qs.stringify({
            nodeId: '9',
            uid: Uid,
          }));
      let { data } = await axios.get('/admin/site/1')
      return {
        siteConfig: data.data,
        imageUrl:data.data.logo
      }
    },
    data() {
      return{
        imageUrl:''
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
        this.imageUrl = response.data.filePath;
      },
      onSubmit() {
        axios.put('/admin/site/1',qs.stringify({
            logo: this.imageUrl,
            cover: this.imageUrl,
            status: this.siteConfig.status,
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
</style>