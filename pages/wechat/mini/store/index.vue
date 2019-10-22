<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/power' }">小程序管理</el-breadcrumb-item>
          <el-breadcrumb-item>小程序配置</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>
        <el-form ref="node" :model="node" label-width="80px" size="medium">
            <el-form-item label="appID">
                <el-input v-model="node.label" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="AppSecret">
                <el-input v-model="node.label" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="Logo" prop="logo">
                <el-upload
                    class="avatar-uploader"
                    action="http://api.example.com/v1.0/api/upload/img"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :before-upload="onBeforeUploadImage">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="node.label" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
                <el-color-picker v-model="color1"></el-color-picker>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="node.description" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button type="primary">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
  </el-row>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import userlist from '~/components/common/userlist.vue'
  
  export default {
    layout: 'frame',
    components: {
       'el-user-list':userlist
    },
    async asyncData () {
      let {data} = await axios.get('/admin/rbac/node/lists');
      return {
        nodeParent: data.lists,
      }
    },
    data() {
      return {
        node: {
          label: '',
          state: 1,
          icon:'',
          parentId:'',
          description: ''
        },
        iconLists: require('~/assets/icon/icon.json'),
      }
    },
    methods: {
      chooseIcon (item) {
        this.node.icon = item
      },
      onSubmit() {
        axios.post('/admin/rbac/node',qs.stringify({
            label: this.node.label,
            icon: this.node.icon,
            state: this.node.state,
            path: this.node.path || '',
            parentId: this.node.parentId || 0,
            description: this.node.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加节点',
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
<style type="text/css" scoped>
@component-namespace system {
  @b auth {
    @e icon {
      float: left;
      margin-right: 20px;
      cursor: pointer;
    }
    @e iconnow>i {
      color: red;
    }
    @e api {
      float: left;
      margin-right: 20px;
      min-width: 1170px;
    }
    @e span {
      color: #606266;
    }
    @e iconfont {
      font-size: 20px;
    }
  }
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