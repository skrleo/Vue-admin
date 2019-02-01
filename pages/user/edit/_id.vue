<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改用户</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px" size="small" >
    <el-form-item label="账户名称">
      <el-input v-model="form.account" style="width:280px" ></el-input>
    </el-form-item>
    <el-form-item label="上传头像" prop="cover">
      <!-- <el-upload
        class="avatar-uploader"
        action="http://api.example.com/v1.0/api/upload/img"
        :headers="application/x-www-form-urlencoded"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
    </el-form-item>
    <el-form-item label="是否启用">
      <el-radio-group v-model="form.status">
        <el-radio label="0">启用</el-radio>
        <el-radio label="1">禁用</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
        <el-radio label="2">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="账号密码">
      <el-input v-model="form.password" style="width:280px" ></el-input>
    </el-form-item>
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
      <el-button type="primary" @click="onUpdate(form.uid)">立即修改</el-button>
      <el-button>取消</el-button>
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
    layout: 'main',
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
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
        },
        imageUrl: ''
      }
    },
    methods: {
      uploadImg(item){
        console.log(item);
        // axios.post('/upload/img',qs.stringify({
        //     filePath: file.raw.name
        //   })).then(res => {
        //     //判断是否请求成功
        //     if(res.data.errorId === 'OK'){
        //       this.$message({
        //           message: '成功上传',
        //           type: 'success'
        //         });  
        //       this.dialogVisible = false;   
        //     }
        //   }).catch(res => {
        //     this.$message.error('请求错误，请重试');
        //   });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onUpdate(val) {
        axios.put(`/user/${val}`,qs.stringify({
            uid: val,
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
                  message: '成功编辑用户',
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