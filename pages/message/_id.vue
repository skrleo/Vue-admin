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
      <el-form-item label="消息类型">
          <el-select v-model="message.type" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="文章状态" prop="status">
        <el-radio-group v-model="message.status">
          <el-radio :label="0">发布</el-radio>
          <el-radio :label="1">待发布</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="发送人">
        <el-tag @close="removeTag(tag)" v-for="tag in users" :key="tag.uid" closable>
          {{tag.name}}
        </el-tag>
        <el-button type="primary" size="small" @click="chooseUsers">选择用户</el-button>
      </el-form-item>
      <el-form-item label="消息内容">
        <no-ssr><mavon-editor :toolbars="markdownOption" v-model="message.content"/></no-ssr>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加管理员组件 -->
    <el-user-list :dialogVisible.sync="dialogVisible" :users.sync="users"></el-user-list>
  </div>
</template>
<script>
import qs from 'qs';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';
import userlist from '~/components/common/user-lists-checkbox'

export default {
  layout: 'frame',
  components: {
    'el-user-list':userlist
  },
  validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
  async asyncData ({ params }) {
    const {data} = await axios.get(`/admin/message/${params.id}`);
    return {
      message: data.data,
      users:data.data.users
    }
  },
  data() {
    return {
      message:{
          type: '',
          title:'',
          status:0,
          content:'',
      },
      users:[],
      dialogVisible: false,
      options: [{
          value: '0',
          label: '系统消息'
        }, {
          value: '1',
          label: '用户消息'
        }, {
          value: '2',
          label: '自定义消息'
        }],
    }
  },
  methods: {
      onSubmit() {
        axios.put('/admin/message',qs.stringify({
            uids: this.users,
            type:this.message.type,
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
    },
    // 移除用户
    removeTag (tag) {
      this.users.forEach((item, index) => {
        if (item.uid === tag.uid) {
          this.users.splice(index, 1)
        }
      })
    },
    chooseUsers(){
      this.dialogVisible = true;
    }
  }
}
</script>
