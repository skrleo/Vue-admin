
<template>
  <section>
    <el-dialog
        title="选择用户"
        :visible.sync="dialogVisible"
        width="65%"
        :before-close="handleClose">
      <el-row class="panel panel-flat">
        <el-row class="panel-body clearfix">
       <el-form :inline="true" class="clearfix">
          <el-form-item class="mb30">
            <el-input v-model="sendData.phone" placeholder="手机号"/>
          </el-form-item>
          <el-form-item class="mb30">
            <el-input v-model="sendData.email" placeholder="邮箱"/>
          </el-form-item>
          <el-form-item class="mb30">
            <el-input v-model="sendData.name" placeholder="输入用户真实姓名搜索"/>
          </el-form-item>
          <el-form-item class="mb30">
            <el-button type="primary" icon="el-icon-search" @click="getLists">搜索</el-button>
          </el-form-item>
        </el-form>
      <el-table :data="lists" border style="width: 100%" ref="radioTable">
        <el-table-column prop="radio" width="34">
          <template slot-scope="scope">
              <input type="radio" :value="scope.row.uid"  v-model="radioUid">
          </template>
        </el-table-column>
         <el-table-column prop="name" label="真实姓名" width="120" />
        <el-table-column prop="nickname" label="账户昵称" width="120" />
        <el-table-column prop="phone" label="联系手机" width="120" />
        <el-table-column prop="regphone" label="注册手机" width="300" />
        <el-table-column label="更新时间" width="190">
          <template slot-scope="scope">
            <span>{{scope.row.updatedAt | d('date,1', 'Y年m月d日 H:i:s')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.state == 1 ? '正常' : '冻结'}}</span>
          </template>
        </el-table-column>
      </el-table> 
      <div class="pt10 pb10 clearfix">
        <el-pagination 
            @current-change="currentChange"
            @size-change="handleSizeChange"                
            :current-page="sendData.pageNow"
            :page-size="sendData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[5,10,20,30, 50, 70, 100,200,500,1000]"
            :total="count"
            class="pull-right"
          />    
      </div>
      <div>
        <el-button type="primary" class="pull-right" @click="handleClose">取消</el-button>
        <el-button type="primary" class="pull-right" style="margin-right:30px" @click="affirmSelect">确认</el-button>
      </div>
        </el-row>
      </el-row>
    </el-dialog>   
  </section>
</template>

<style>
  .pull-right {
    margin-top: 20px;
  }
</style>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  export default {
    props: ['dialogVisible'],
    data () {
      return {
        name: '',
        phone: '',
        sendData: {
          pageNow: 1,
          pageSize: 10
        },
        count: 0,
        search: '',
        lists: [],
        radioUid: ''
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
      // 关闭之前执行
      handleClose (done) {
        this.$refs.radioTable.clearSelection()
        this.$emit('update:userRadioDialogVisible', false)
        // window.location.reload()
      },
      // 当前页改变
      currentChange (val) {
        this.sendData.pageNow = val
        this.getLists()
      },
      // 当前页数改变
      handleSizeChange (pageSize) {
        this.sendData.pageSize = pageSize
        this.getLists()
      },
      // 确认
      affirmSelect () {
        if (!this.radioUid) {
          this.$message.error('还未选择用户！')
        }
        let activeItem = {}
        this.lists.forEach((item, index) => {
          if (item.uid === this.radioUid) {
            activeItem = item
          }
        })
        this.$emit('affirm', activeItem)
        this.$emit('update:userRadioDialogVisible', false)
      },
      chooseUser () {
        let currentItem = this.lists.find((item) => {
          return item.uid === this.radioUid
        })
        if (currentItem.name && currentItem.uid) {
          this.$emit('update:user', {
            name: currentItem.name,
            uid: currentItem.uid
          })
          this.$emit('update:userRadioDialogVisible', false)
        }
      }
    },
    mounted () {
      // this.getLists()
    }
  
  }
</script>