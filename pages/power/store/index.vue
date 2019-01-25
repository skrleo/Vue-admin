<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/power' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加权限</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名称" style="width:400px" >
      <el-button type="primary" size="medium" @click="dialogVisible = true">选择用户</el-button>
    </el-form-item>
    <el-form-item label="是否可用">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="用户角色">
      <el-checkbox-group v-model="form.type">
        <el-checkbox v-for="item in role" :key="item.roleId" :label="item.name" :value="item.roleId"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="备注" style="width:600px">
      <el-input type="textarea" v-model="form.desc" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
  <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="65%">
      <el-user-list></el-user-list>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import userlist from '~/components/common/userlist.vue'
  export default {
    layout: 'main',
    components: {
      'el-user-list':userlist
    },
    async asyncData () {
      let {data} = await axios.get('/rbac/role/lists');
      // let department = await axios.get('/rbac/node/lists')
      console.log(data.lists);
      return {
        role: data.lists,
        // department: department.lists
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>