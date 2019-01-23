<template>
  <div>
    <el-table :data="userLists" border style="width: 100%">
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
        :current-page="pageNow"
        :page-sizes="[10, 50, 100, 150]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    async asyncData () {
      let { data } = await axios.get('/user/lists')
      console.log(data);
      return {
        userLists: data.lists
      }
    },
   
  }
</script>