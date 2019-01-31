<template>
  <section>
      <el-dialog
        title="选择用户"
        :visible.sync="dialogVisible"
        width="65%"
        :before-close="handleClose">
        <el-row :gutter="20" style="margin-bottom:30px;">
            <el-col :span="5">
                <el-input v-model="phone" placeholder="输入注册手机搜索" size="medium">
                </el-input>
            </el-col>
            <el-col :span="5">
                <el-input v-model="name"  placeholder="输入用户真实姓名搜索" size="medium">
                </el-input>
            </el-col>
            <el-col :span="5"> 
                <el-button type="primary" size="medium">搜索</el-button>
            </el-col>
        </el-row>
      <!-- <span>{{lists}}</span> -->
        <el-table :data="lists" border style="width: 100%" ref="multipleTable">
            <el-table-column width="55">
                <template slot-scope="scope">
                    <el-radio :label="scope.row.uid" v-model="uid" @change.native="chooseUser(scope.row)"> &nbsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column prop="uid" label="用户ID" width="120">
            </el-table-column>
            <el-table-column prop="account" label="用户账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdAt | d('yyyy-MM-dd hh:mm:ss')}}</span>
                </template>
            </el-table-column>
        </el-table>
     <br>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendUserId()">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  export default {
    props: [ 'dialogVisible'],
    data () {
      return {
          uid: 0,
        lists:[],
        name:'',
        phone:'',
        currentPage: 4
      }
    },
    created: function () {
      axios.get('/user/lists')
        .then(res => {
          console.log(res.data);
          this.lists = res.data.lists || [];
        });
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        this.$emit('update:dialogVisible', false)
      },
      chooseUser(val){
          this.user = val;
          console.log(val);
      },
      sendUserId(data){
        if (this.user.length === 0) {
          this.$message.error('还未选择用户！')
          return
        }
        this.$emit('update:user', this.user)
        this.handleClose()
      }
    }
  }
</script>