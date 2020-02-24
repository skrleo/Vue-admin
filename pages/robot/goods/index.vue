<template>
    <div style="margin-bottom:80px;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>机器人管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" style="float:left;" size="small">
              <el-form-item>
                <nuxt-link :to="{name:'robot-goods-store'}">
                    <el-button type="primary">添加商品</el-button>
                </nuxt-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="syncGoods()">更新商品</el-button>
              </el-form-item>
              <el-form-item label="查找商品">
                  <el-input placeholder="商品名称"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-select placeholder="请选择状态">
                    <el-option value="0">已发单</el-option>
                    <el-option value="1">未发单</el-option>
                </el-select>
              </el-form-item>
          </el-form>
        </div>
        <!--表格数据及操作-->
        <el-table :data="lists" border style="width: 100%" stripe ref="lists" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="robotGoodsId" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="itemid" label="商品ID" width="120">
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="125">
                <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.sort" controls-position="left" style="width:100px;" @change="handleChangeSort(scope.row.robotGoodsId,scope.row.sort)">
                    </el-input-number>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 1">拼多多</span>
                    <span v-else-if="scope.row.type === 2">京东</span>
                    <span v-else>淘宝</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="220">
            </el-table-column>
            <el-table-column prop="thumbUrl" label="商品封面" >
                <template slot-scope="scope">
                    <img :src="scope.row.thumbUrl" alt="" style="width:50px;height:50px;">
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="80">
                 <template slot-scope="scope">
                    <span>{{scope.row.status ? '已发单':'未发单'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="currentPrice" label="单价(元)">
            </el-table-column>
            <el-table-column prop="couponDiscount" label="券金额(元)">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="destroy(scope.row.robotGoodsId,scope.$index, lists)">删除</el-button>
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
  import Cookie from 'js-cookie'

  export default {
    layout:'frame',
    async asyncData () {
        const { data } = await axios.get('/admin/robot/goods/lists')
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
        dialogVisible: false
      }
    },
    methods: {
        handleChangeSort(robotGoodsId,sort) {
            axios.put(`/admin/robot/goods/changeSort`, qs.stringify({robotGoodsId:robotGoodsId,sort:sort}))
            .then(res => {
                }).catch(res => {
                    if(res.response.data.message === ''){
                        this.$message.error('请求异常，请稍后重试！');
                    }else{
                        this.$message.error(res.response.data.message);
                    }
                });
        },
        handleSizeChange(val) {
            axios.get(`/admin/robot/goods/lists?pageSize=${val}`)
            .then(res => {
                this.lists = res.data.lists || [];
                this.pageSize = res.data.page.size || 10;
            });
        },
        handleCurrentChange(val) {
            axios.get(`/admin/robot/goods/lists?pageNow=${val}`)
            .then(res => {
                this.lists = res.data.lists || [];
                this.pageNow = res.data.page.now || 1;
            });
        },
        destroy(robotGoodsId,index,rows){
            axios.delete(`/admin/robot/goods/${robotGoodsId}`, {data: qs.stringify({robotGoodsId:robotGoodsId})})
            .then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                    rows.splice(index, 1);
                    this.$message({
                        message: '成功删除商品',
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
        syncGoods(){
            axios.get(`/admin/robot/goods/syncGoods`)
            .then(res => {
                if(res.data.errorId === 'OK'){
                    this.$message({
                        message: '成功更新商品',
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
