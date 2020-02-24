<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加微信群</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="role" :model="group" label-width="80px">
      <el-form-item label="群名称" prop="name">
        <el-input v-model="group.name" style="width:280px;"></el-input>
      </el-form-item>
      <el-form-item v-model="group.user" label="群归属" style="width:400px">
          <span style="color:#000;">{{user.name}}</span>
        <el-button type="primary" size="small" @click="chooseUsers">选择用户</el-button>
      </el-form-item>
      <el-form-item label="群描述" style="width:600px" prop="description">
        <el-input type="textarea" v-model="group.description"></el-input>
      </el-form-item>
      <el-form-item label="群二维码" prop="groupUrl">
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
      <el-form-item size="mini">
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加管理员组件 -->
    <el-user-list :dialogVisible.sync="dialogVisible" :user.sync="user"></el-user-list>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import userlist from '~/components/common/user-lists-radio'
  export default {
    layout: 'frame',
    components: {
       'el-user-list':userlist
    },
    validate({params}){
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      let {data} = await axios.get('/admin/rbac/role/lists');
      return {
        robotId:params.id,
        role: data.lists,
        group: [],
        imageUrl: ''
      }
    },
    data() {
      return {
        group:[],
        select: '',
        user: '',
        dialogVisible: false
      }
    },
    methods: {
        chooseUsers(){
            this.dialogVisible = true;
        },
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
            axios.post('/admin/robot/group',qs.stringify({
                uid: this.user.uid,
                robotId: this.robotId,
                name: this.group.name,
                groupUrl: this.imageUrl,
            })).then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                this.$message({
                    message: '成功添加群',
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
    /* display: block; */
  }
</style>
