<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" :model="formInline" style="float:left;" size="small">
              <el-form-item>
                <nuxt-link :to="{name:'power-store'}">
                    <el-button type="primary">添加权限</el-button>
                </nuxt-link>
              </el-form-item>
              <el-form-item label="查找用户">
                  <el-input placeholder="查找用户"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!--表格数据及操作-->
        <el-table :data="lists" border style="width: 100%" stripe ref="lists" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="manageId" label="权限ID" width="120">
            </el-table-column>
            <el-table-column prop="hasOneUserBaseModel.name" label="用户账号">
            </el-table-column>
            <el-table-column label="角色名称" prop="hasManyUserToRoleModel"  width="150">
                <template slot-scope="scope">
                <span v-for="(item,index) in scope.row.hasManyUserToRoleModel" :key="item.roleId">
                    <span v-show="index > 0">/</span>{{item.hasOneRoleModel}}
                </span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="权限描述">
            </el-table-column>
            <el-table-column prop="status" label="状态">
                 <template slot-scope="scope">
                    <span>{{scope.row.status ? '启用':'禁用'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'power-id',params:{ id: scope.row.manageId }}">
                        <el-button type="info" icon="el-icon-view" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'power-id',params:{ id: scope.row.manageId }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
  import axios from '~/plugins/axios.js'

  let id = 1000;
  export default {
    layout:'main',
    name:'node',
    async asyncData () {
      let { data } = await axios.get('rbac/manage/lists')
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
      sumbit(data){
        axios.post('/rbac/role',qs.stringify({
            name: this.form.name,
            state: 1,
            description: this.form.description,
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加角色',
                  type: 'success'
                });  
              this.dialogVisible = false;   
            }
          }).catch(res => {
            this.$message.error('请求错误，请重试');
          });
      },
      cancel(data) {
        this.dialogVisible = false;     
      }
    }
  };
</script>
