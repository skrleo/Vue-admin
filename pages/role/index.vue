<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" style="float:left;" size="small">
              <el-form-item>
                  <nuxt-link :to="{name:'role-store'}">
                    <el-button type="primary">添加角色</el-button>
                  </nuxt-link>
              </el-form-item>
              <el-form-item label="角色">
                  <el-input placeholder="搜索角色"></el-input>
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
            <el-table-column prop="roleId" label="角色ID" width="120">
            </el-table-column>
            <el-table-column prop="name" label="角色名称" width="180">
            </el-table-column>
             <el-table-column prop="state" label="状态" width="110">
                <template slot-scope="scope">
                    <span>{{scope.row.state ? '禁用':'启用'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="角色描述">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="360">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'role-id',params:{ id: scope.row.roleId }}">
                        <el-button type="info" icon="el-icon-view" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'role-node-id',params:{ id: scope.row.roleId }}">
                        <el-button type="warning" icon="el-icon-refresh" size="mini">关联节点</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'role-id',params:{ id: scope.row.roleId }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="destroy(scope.row.roleId,scope.$index, lists)">删除</el-button>
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

  let id = 1000;
  export default {
    layout:'frame',
    name:'node',
    async asyncData () {
        const Uid = Cookie.get('Uid');
        await axios.post('/admin/base/shortcut',qs.stringify({
            nodeId: '8',
            uid: Uid,
            }));
        const { data } = await axios.get('/admin/rbac/role/lists')
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
        axios.get(`/admin/rbac/role/lists?pageSize=${val}`)
        .then(res => {
            this.lists = res.data.lists || [];
            this.pageSize = res.data.page.size || 10;
          });
      },
      handleCurrentChange(val) {
        axios.get(`/admin/rbac/role/lists?pageNow=${val}`)
        .then(res => {
            this.lists = res.data.lists || [];
            this.pageNow = res.data.page.now || 1;
          });
      },
      destroy(roleId,index,rows){
        axios.delete(`/admin/rbac/role/${roleId}`, {data: qs.stringify({roleId:roleId})})
        .then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
                rows.splice(index, 1);
                this.$message({
                    message: '成功删除角色',
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
