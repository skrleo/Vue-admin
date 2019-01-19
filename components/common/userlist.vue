<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <!--勾选框-->
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column
        prop="date"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="用户账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="电子邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="创建时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        }]
      }
    }
  }
</script>