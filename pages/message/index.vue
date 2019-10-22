<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>消息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" style="float:left;" size="small">
              <el-form-item>
                  <nuxt-link :to="{name:'message-store'}">
                    <el-button type="primary">发布消息</el-button>
                  </nuxt-link>
              </el-form-item>
              <el-form-item label="查询消息">
                  <el-input placeholder="搜索消息"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!--表格数据及操作-->
        <el-table :data="lists" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="messageId" label="消息ID" width="80">
            </el-table-column>
            <el-table-column prop="title" label="消息标题">
            </el-table-column>
            <el-table-column prop="type" label="消息类型">
                <template slot-scope="scope">
                    <span>{{scope.row.type? '站内信':'系统消息'}}</span>
                </template>
            </el-table-column>
             <!-- <el-table-column prop="status" label="状态" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.status? '已发布':'未发布'}}</span>
                </template>
            </el-table-column> -->
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="260">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'message-id',params:{ id: scope.row.messageId }}">
                        <el-button type="info" icon="el-icon-view" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'message-id',params:{ id: scope.row.messageId }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="destroy(scope.row.messageId,scope.$index, lists)">删除</el-button>
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
      const { data } = await axios.get('/admin/message/lists')
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
        form: {
          name: '',
          state: true,
          description: ''
        },
        //查询输入框数据
        input: '',
        //导航条默认选项
        activeIndex: '1',
        activeIndex2: '1',
        dialogVisible: false
      }
    },
    methods: {
       handleSizeChange(val) {
        axios.get(`/admin/message/lists?pageSize=${val}`)
        .then(res => {
            this.lists = res.data.lists || [];
            this.pageSize = res.data.page.size || 10;
          });
      },
      handleCurrentChange(val) {
        axios.get(`/admin/message/lists?pageNow=${val}`)
        .then(res => {
            this.lists = res.data.lists || [];
            this.pageNow = res.data.page.now || 1;
          });
      },
      destroy(messageId,index,rows){
        axios.delete(`/admin/message/${messageId}`, {data: qs.stringify({messageId:messageId})})
        .then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
                rows.splice(index, 1);
                this.$message({
                    message: '成功删除消息',
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
  };
</script>
