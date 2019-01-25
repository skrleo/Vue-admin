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
      <el-table :data="lists" border style="width: 100%">
        <!--勾选框-->
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="uid" label="用户ID" width="120">
        </el-table-column>
        <el-table-column prop="name" label="用户账号" width="180">
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
     <!--分页条-->
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    props: [ 'dialogVisible', 'refresh', 'users'],
    data () {
      return {
        currentPage: 4,
        dialogVisible: false
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose(done) {
        
      }
    }
  }
</script>