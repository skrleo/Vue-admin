<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <div class="banner">
      <el-row :gutter="20">
        <el-col :span="4">
          <img :src="user.headimg" :alt="user.headimg" style="width:100%;height:130px;">
        </el-col>
        <el-col :span="4">用户名称：{{user.name}}</el-col>
        <el-col :span="4">昵称：{{user.nickname}}</el-col>
        <el-col :span="3">性别：
          <span v-if="user.sex === 0">保密</span>
          <span v-else-if="user.sex === 1">男</span>
          <span v-else>女</span>
        </el-col>
        <el-col :span="3">状态：
          <span v-if="user.status === 0">启用</span>
          <span v-else>禁用</span>
        </el-col>
        <el-col :span="6">邮箱地址：{{user.email}} </el-col>
        <el-col :span="4">联系方式：{{user.phone}}</el-col>
        <el-col :span="3">登录次数：{{user.loginNum}} </el-col>
        <el-col :span="6">最后登录时间：{{user.lastLoginTime | d('yyyy-MM-dd hh:mm:ss')}}</el-col>
        <el-col :span="3"><el-button type="text" @click="updatePw()">修改密码</el-button></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="user">用户管理</el-tab-pane>
            <el-tab-pane label="操作历史" name="operationLog">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(operation, index) in operations"
                    :key="index"
                    color="#0bbd87"
                    :timestamp="operation.createdAt| d('yyyy-MM-dd hh:mm:ss')">
                    {{operation.detail}}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="role">角色管理</el-tab-pane>
            <el-tab-pane label="用户消息" name="message">
                <div style="height:62px;">
                  <!--搜索框-->
                  <el-form :inline="true" style="float:left;" size="small">
                      <el-form-item label="查询消息">
                          <el-input placeholder="搜索消息"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary">查询</el-button>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary">审核通过</el-button>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary">审核不通过</el-button>
                      </el-form-item>
                  </el-form>
                </div>
              <!--表格数据及操作-->
              <el-table :data="lists" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
                  <!--勾选框-->
                  <el-table-column type="selection" width="55">
                  </el-table-column>
                  <el-table-column prop="title" label="标题">
                    <template slot-scope="scope">
                        <nuxt-link :to="{name:'message-id',params:{ id: scope.row.messageId }}">
                          <span>{{scope.row.title}}</span>
                        </nuxt-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="是否已读">
                      <template slot-scope="scope">
                          <span>{{scope.row.status ? '已读':'未读'}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="status" label="消息类型">
                      <template slot-scope="scope">
                          <span>{{scope.row.status ? '站内信':'系统消息'}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="createdAt" label="提交时间">
                      <template slot-scope="scope">
                          <span>{{scope.row.createdAt | d('yyyy年MM月dd日 hh:mm:ss')}}</span>
                      </template>
                  </el-table-column>
              </el-table>
              <br>
              <!--分页条-->
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNow"
                  :page-sizes="[10, 50, 100, 150]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pageCount">
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout: 'main',
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
    color: #000;
  }
  .el-row {
    line-height: 32px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    color: #000;
    margin-bottom: 12px;
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>