<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px" size="small" >
      <el-form-item label="真实姓名">
      <el-input placeholder="请输入用户姓名" v-model="form.name" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
        <el-radio label="2">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="用户头像">
      <el-upload
        class="avatar-uploader"
        action="http://api.example.com/v1.0/api/upload/img"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :before-upload="onBeforeUploadImage">
        <img v-if="form.headimg" :src="form.headimg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- <el-form-item label="用户分组">
      <el-cascader
        :options="groupLists"
        expand-trigger="hover"
        v-model="form.group"
        @change="handleChange">
      </el-cascader>
    </el-form-item> -->
    <el-form-item label="用户标签">
      <el-tag
        v-for="label in labels"
        closable
        :key="label.labelId"
        :label="label.labelName"
        :disable-transitions="false"
        @close="handleClose(label)">
        {{label.labelName}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="tagVisible"
        v-model="labelName"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item label="用户昵称">
      <el-input placeholder="请输入用户昵称" v-model="form.nickname" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="账号密码">
      <el-input placeholder="请输入密码" v-model="form.password" style="width:280px" show-password></el-input>
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-input placeholder="请输入邮箱地址" v-model="form.email" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="联系方式">
      <el-input placeholder="请输入联系方式" v-model="form.phone" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="备注" style="width:600px">
      <el-input placeholder="请输入备注" type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" size="medium">立即创建</el-button>
      <el-button size="medium">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
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
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout: 'frame',
    data() {
      return {
        labels: [],
        tagVisible: false,
        labelName:'',
        form: {
          name: '',
          sex: '',
          headimg:'',
          password: '',
          nickname: '',
          email: '',
          phone: ''
        }
      }
    },
    async asyncData ({ params }) {
      const groupLists = await axios.get('/admin/user/group/lists');
      return {
        groupLists: JSON.parse(JSON.stringify(groupLists.data.lists)),
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
        this.form.headimg = response.data.filePath;
      },
      handleClose(label) {
        this.labels.splice(this.labels.indexOf(label), 1);
      },
      showInput() {
        this.tagVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        axios.post('/admin/user/label/store',qs.stringify({
            name: this.labelName
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              /**
               * 获取labelId
               */
              const labelId = res.data.data.labelId;
              const labelName = this.labelName;
              this.labels.push({
                    labelId : labelId,
                    labelName : labelName
                });
              this.tagVisible = false;
              this.labelName = '';
            }
          })
      },
      onSubmit() {
        axios.post('/admin/user',qs.stringify({
            name: this.form.name,
            sex:  this.form.sex,
            labels: this.labels||[],
            password: this.form.password,
            nickname: this.form.nickname,
            headimg: this.form.headimg,
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