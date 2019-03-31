<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>发布消息</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="message" ref="message" label-width="80px" size="medium">
      <el-form-item label="消息标题" prop="title">
        <el-input  v-model="message.title" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="文章状态" prop="status">
        <el-radio-group v-model="message.status">
          <el-radio label="0">发布</el-radio>
          <el-radio label="1">待发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发送人">
          
      </el-form-item>
      <el-form-item label="消息内容">
        <no-ssr><mavon-editor :toolbars="markdownOption" v-model="message.content"/></no-ssr>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
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
      message:{
          title:'',
          status:0,
          content:'',
      }
    }
  },
  methods: {
        onSubmit() {
          axios.post('/admin/message',qs.stringify({
              title: this.message.title,
              status: this.message.status,
              content: this.message.content || ''
            })).then(res => {
              //判断是否请求成功
              if(res.data.errorId === 'OK'){
                this.$message({
                    message: '成功添加标签',
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
