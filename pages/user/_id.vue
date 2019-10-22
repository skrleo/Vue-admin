<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="banner">
      <el-tabs tab-position="top" style="">
        <el-tab-pane label="用户管理">
          <div class="userInfo">
            <el-row :gutter="24">
              <el-col :span="4">
                <img :src="user.headimg" :alt="user.headimg">
              </el-col>
              <el-col :span="20">{{user.name}}({{user.nickname}})<br/>
              {{user.phone}}<el-button type="text" @click="updatePw()">修改密码</el-button></el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-phone"></i>
              </el-col>
              <el-col :span="20">
                <small>性别</small><br/>
                <span v-if="user.sex === 0">保密</span>
                <span v-else-if="user.sex === 1">男</span>
                <span v-else>女</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-document"></i>
              </el-col>
              <el-col :span="20">
                <small>角色</small><br/>
                超级管理员
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-goods"></i>
              </el-col>
              <el-col :span="20">
                <small>账号状态</small><br/>
                <span v-if="user.status === 0">正常</span>
                <span v-else>禁用</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-picture"></i>
              </el-col>
              <el-col :span="20">
                <small>邮箱地址</small><br/>
                {{user.email}}</el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-share"></i>
              </el-col>
              <el-col :span="20">
                <small>登录次数</small><br/>
                {{user.loginNum}} 
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-setting"></i>
              </el-col>
              <el-col :span="20">
                <small>最后登陆时间</small><br/>
                {{user.lastLoginTime | d('yyyy-MM-dd hh:mm:ss')}}({{user.last_login_ip}})
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="4">
                <i class="el-icon-edit"></i>
              </el-col>
              <el-col :span="20">
                <small>备注</small><br/>xxxx
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>

    </div>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout: 'frame',
    validate ({ params }) {
      // Must be a number
      if(/^\d+$/.test(params.id)){
        this.uid = params.id;
      }
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      let {data} = await axios.get(`/admin/user/${params.id}`);
      return {
        user: data.data
      }
    },
    data() {
      return {
        user: {
          headimg:'',
          password: '',
          nickname: '',
          email: '',
          phone: ''
        },
        operations: {
          detail: '',
          createdAt: '',
          type: 0,
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        switch(tab.name){
          case 'first':
            this.categoryId = 0;
            break;
          case 'operationLog':
            axios.get('/admin/base/operation/log/lists', {
                params: {
                  uid:  this.user.uid
                }
              })
              .then(res => {
                this.operations = res.data.lists || [];
              });
            break ;
          case 'message':
            axios.get('/admin/message/lists', {
                params: {
                  uid:  this.user.uid
                }
              })
              .then(res => {
                this.pageNow = res.data.page.now || 1 ,
                this.pageSize = res.data.page.size || 10 ,
                this.pageCount = res.data.page.count || 0 ,
                this.lists = res.data.lists || []
              });
            break ;
          default:
            this.categoryId = 1;
        }
      },
      updatePw(){
        this.$prompt('请输入密码', '修改密码', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            placeholder:"请输入密码",
            inputErrorMessage: '密码格式不正确'
          }).then(({ value }) => {
            axios.put('/admin/user/fix/pw',qs.stringify({
                uid: this.user.uid,
                password: value,
              })).then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                  this.$message({
                      message: '修改密码成功',
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });       
          });
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
  a{
    text-decoration-line: none;
    color: #272626;
  }
  .el-tabs{
    color: #272626;
    margin-top: 23px;
    .userInfo{
      margin-top: 32px;
      .el-row {
        line-height: 16px;
        margin-bottom: 6px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        line-height: 28px;
        img{
          width:48px;
          height:48px;
          float:right;
          margin-top: 8px;
          border-radius: 6px;
        }
        i{
          color:#343131;
          font-size: 18px;
          float:right;
          line-height: 56px;
        }
        small{
          color:#929191;
        }
        .el-button{
          margin-left: 18px;
        }
      }
    }

  }
</style>