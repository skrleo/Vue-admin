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
        <el-table :data="tableData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="name" label="权限ID" width="120">
            </el-table-column>
            <el-table-column prop="name" label="用户账号">
            </el-table-column>
            <el-table-column prop="address" label="所属部门">
            </el-table-column>
            <el-table-column prop="address" label="角色名称">
            </el-table-column>
            <el-table-column prop="address" label="权限描述">
            </el-table-column>
            <el-table-column prop="date" label="状态">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'artcle-id',params:{ id: scope.row.createdAt }}">
                        <el-button type="info" icon="el-icon-edit" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'artcle-id',params:{ id: scope.row.createdAt }}">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    </nuxt-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <!--分页条-->
        <el-pagination background layout="prev, pager, next" :total="1000">
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
    //   let { data } = await axios.get('/rbac/role/lists')
    //   console.log(data.lists);
    //   return {
    //     tableData: data.lists
    //   }
    },
    data() {
      return {
        form: {
          name: '',
          state: true,
          description: ''
        },
        //表格数据
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }],
        //查询输入框数据
        input: '',
        //导航条默认选项
        activeIndex: '1',
        activeIndex2: '1',
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
