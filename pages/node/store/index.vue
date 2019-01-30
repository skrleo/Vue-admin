<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/power' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加权限</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>
        <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item label="节点名称">
                <el-input v-model="form.label" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="form.state"></el-switch>
            </el-form-item>
            <el-form-item label="图标icon">
                <i class="el-icon-edit"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-delete"></i>
            </el-form-item>
            <el-form-item label="路由地址">
                <el-input v-model="form.path" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="父级节点">
                <el-select v-model="form.parentId" placeholder="请选择父级节点">
                <el-option v-for="item in nodeParent" :key="item.nodeId" :label="item.label" :value="item.nodeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点描述">
                <el-input type="textarea" v-model="form.description" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbit">立即创建</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
  </el-row>
  </section>
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
      console.log(data.lists);
      return {
        role: data.lists,
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
      removeTag (tag) {
        this.users.forEach((item, index) => {
          if (item.uid === tag.uid) {
            this.users.splice(index, 1)
          }
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      chooseUsers(){
        this.dialogVisible = true;
        console.log('chooseUsers!');
      },
      largeText(val){
        console.log(val);
      }
    }
  }
</script>