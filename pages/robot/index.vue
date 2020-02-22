<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" style="float:left;" size="small">
              <el-form-item>
                  <nuxt-link :to="{name:'robot-store'}">
                    <el-button type="primary">添加机器人</el-button>
                  </nuxt-link>
              </el-form-item>
              <el-form-item label="查询机器人">
                  <el-input placeholder="搜索机器人"></el-input>
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
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="uid" label="用户ID" width="80">
            </el-table-column>
            <el-table-column prop="wxid" label="微信Id" width="180">
            </el-table-column>
            <el-table-column prop="nickname" label="微信昵称">
            </el-table-column>
            <el-table-column prop="headUrl" label="微信头像">
                <template slot-scope="scope">
                    <img :src="scope.row.headUrl" alt="" style="width:50px;height:50px;">
                </template>
            </el-table-column>
            <el-table-column prop="alias" label="微信号">
            </el-table-column>
            <el-table-column prop="status" label="是否登录">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 1"><i class="isStatus" style="background:#67C23A;"/>在线</span>
                    <span v-else><i class="isStatus" style="background:#87888a;"/>离线</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="210">
                <template slot-scope="scope">
                    <!-- <nuxt-link :to="{name:'robot-id',params:{ id: scope.row.id }}">
                        <el-button type="info" icon="el-icon-view" size="mini">详情</el-button>
                    </nuxt-link> -->
                    <nuxt-link :to="{name:'robot-group-id',params:{ id: scope.row.id }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">群管理</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="destroy(scope.row.id,scope.$index, lists)">删除</el-button>
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
      const { data } = await axios.get('/admin/robot/lists')
      return {
          pageNow: data.page.now || 1 ,
          pageSize: data.page.size || 10 ,
          pageCount: data.page.count || 0 ,
          lists: data.lists || []
      }
    },
    data() {
      return {
           pageNow: 1 ,
           pageSize:  10 ,
           pageCount:  0 ,
           lists: []
      }
    },
    methods: {
        handleSizeChange(val) {
            axios.get(`/admin/robot/lists?pageSize=${val}`)
            .then(res => {
                this.lists = res.data.lists || [];
                this.pageSize = res.data.page.size || 10;
            });
        },
        handleCurrentChange(val) {
            axios.get(`/admin/robot/lists?pageNow=${val}`)
            .then(res => {
                this.lists = res.data.lists || [];
                this.pageNow = res.data.page.now || 1;
            });
        },
        destroy(id,index,rows){
            axios.delete(`/admin/robot/${id}`, {data: qs.stringify({id:id})})
            .then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                    rows.splice(index, 1);
                        this.$message({
                            message: '成功删除机器人',
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
<style>
    .isStatus{
        width:8px;
        height:8px;
        border-radius:50%;
        display:inline-block;
        margin-right:6px;
    }
</style>
