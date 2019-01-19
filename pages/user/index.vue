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
          <el-form :inline="true" :model="formInline" style="float:left;" size="small">
              <el-form-item>
                <nuxt-link :to="{name:'user-store'}">
                    <el-button type="primary">添加用户</el-button>
                </nuxt-link>
              </el-form-item>
              <el-form-item label="节点">
                  <el-input placeholder="搜索节点"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!--表格数据及操作-->
        <el-table :data="userData" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
            <!--勾选框-->
            <el-table-column type="selection" width="55">
            </el-table-column>
            <!--索引-->
            <el-table-column prop="uid" label="用户ID" width="120">
            </el-table-column>
            <el-table-column prop="name" label="用户账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式">
            </el-table-column>
            <el-table-column prop="status" label="是否启用">
                <template slot-scope="scope">
                    <span>{{scope.row.status ? '是':'否'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                 <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <nuxt-link :to="{name:'user-id',params:{ id: scope.row.uid }}">
                        <el-button type="info" icon="el-icon-edit" size="mini">详情</el-button>
                    </nuxt-link>
                    <nuxt-link :to="{name:'user-id',params:{ id: scope.row.uid }}">
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
      let { data } = await axios.get('/user/lists')
      console.log(data.lists);
      return {
        userData: data.lists
      }
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
            roleId: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            roleId: 1,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            roleId: 1,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            roleId: 1,
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

      },
      cancel(data) {
        this.dialogVisible = false;     
      }
    }
  };
</script>
