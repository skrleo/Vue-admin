<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>微信管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" style="float:left;" size="small">
              <el-form-item>
                  <el-button type="primary" @click="login_wechat">登录微信</el-button>
              </el-form-item>
              <el-form-item label="查询任务">
                  <el-input placeholder="搜索任务"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button type="warning">执行</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button type="danger">暂停</el-button>
              </el-form-item>
          </el-form>
          <span style="float:right;color:#000;line-height:42px;"><span style="width:8px;height:8px;border-radius:50%;background:#67C23A;display:inline-block;margin-right:6px;"></span>队列执行中</span>
        </div>
        <!--表格数据及操作-->
        <el-table :data="lists" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="crontabId" label="任务ID" width="80">
            </el-table-column>
            <el-table-column prop="name" label="任务名称">
            </el-table-column>
             <el-table-column prop="status" label="状态" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.status ? '暂停':'运行中'}}</span>
                </template>
            </el-table-column>
             <el-table-column prop="type" label="任务类型" width="90">
                <template slot-scope="scope">
                    <span>{{scope.row.status ? '循环执行':'执行一次'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="备注">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="260">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'crontab-id',params:{ id: scope.row.crontabId }}">
                        <el-button type="info" icon="el-icon-view" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'crontab-id',params:{ id: scope.row.crontabId }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="destroy(scope.row.crontabId,scope.$index, lists)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <!--分页条-->
        <el-pagination
            :current-page="pageNow"
            :page-sizes="[10, 50, 100, 150]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageCount">
        </el-pagination>

        <el-dialog
            title="微信登录"
            :visible.sync="centerDialogVisible"
            width="20%">
            <div style="text-align:center;">
                <img :src="qrCode" alt="" style="width:100%;height:100%;margin-top:-35px;">
                <i>请使用微信扫一扫登录微信</i>
            </div>
        </el-dialog>
    </div>
</template>


 <script>

  import qs from 'qs';
  import axios from '~/plugins/axios.js';

  let id = 1000;
  export default {
    layout:'frame',
    name:'node',
    async asyncData () {
      const { data } = await axios.get('/admin/task/lists')
      console.log(data.lists);
      return {
          pageNow: data.page.now || 1 ,
          pageSize: data.page.size || 10 ,
          pageCount: data.page.count || 0 ,
          lists: data.lists || []
      }
    },
    data() {
      return {
        lists: {
          crontabId: '',
          state: true,
          description: ''
        },
        qrCode:'',
        centerDialogVisible: false,
        //查询输入框数据
        input: '',
        timer: '',
        status: '',
        //导航条默认选项
        activeIndex: '1',
        activeIndex2: '1',
        dialogVisible: false
      }
    },
    computed: {
        // 计算属性
        statusData() { return this.status }
    },
    watch: {
        statusData: function (res) {
            if (res == '201') { //确认登录
                this.$message({
                     message: '确认登录',
                    type: 'success'
                }); 
                // 关闭弹窗
                this.centerDialogVisible=false;
            } 
            if (res == '201') { // 扫描成功 正在登录
                this.$message({
                     message: '扫描成功',
                    type: 'success'
                }); 
                // 关闭弹窗
                this.centerDialogVisible=false;
            } 
            if (res == '408') {//登录超时
               this.$message({
                     message: '登录超时',
                    type: 'error'
                });    
                // 关闭弹窗
                this.centerDialogVisible=false;
            }
            if (res != '200') {
                 // 当返回的新值为创建中的时候,保持3秒轮询
                this.timer = setInterval(() => {
                    setTimeout(this.check_login, 0)
                }, 3000)
            }
            if(this.centerDialogVisible == false){
                clearInterval(this.timer)
            }
            //使用$once(eventName, eventHandler)一次性监听事件
            this.$once('hook:boforeDestory', () => {
                clearInterval(this.timer)
            })
        }
    },
    methods: {
      //获取登录二维码
      login_wechat(){
          this.centerDialogVisible = true;
          axios.get('/chat/getQrCode')
            .then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                    this.qrCode = res.data.data.qrCode || [];
                    this.check_login();
                }
            });
      },
      //轮询查询登录
      check_login(){
          if(this.centerDialogVisible ==  true){
              axios.get('/chat/waitForLogin')
                .then(res => {
                    //判断是否请求成功
                    if(res.data.errorId === 'OK'){
                        this.status = res.data.data.code;  
                        this.$message({
                            message: res.data.data.code,
                            type: 'success'
                        });    
                    }
                });
          }
      }
    }
  };
</script>
