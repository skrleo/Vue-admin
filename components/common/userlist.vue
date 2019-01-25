
<template>
  <section>
    <el-dialog
        title="添加角色"
        :visible.sync="dialogVisible"
        width="65%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    props: [ 'dialogVisible', 'refresh', 'users', 'siteId'],
    data () {
      return {
        name: '', // 用户名搜索
        phone: '', // 手机搜索
        pageNow: 1, // 当前页
        pageSize: 5, // 显示页数
        count: 0, // 总条数
        multipleSelection: [],
        lists: [],
        userName: []
      }
    },
    methods: {
      // 关闭之前执行
      handleClose (done) {
        
      },
      // 选择事件
      handleSelectionChange (row) {
        
      },
      // 确认
      affirmSelect () {
        
      },
      getList (page) {
        
      }
    },
    mounted () {
      // this.getList()
    }
  }
</script>