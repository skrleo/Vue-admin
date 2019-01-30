<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/power' }">节点管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加节点</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>
        <el-form ref="node" :model="node" label-width="80px" size="small">
            <el-form-item label="节点名称">
                <el-input v-model="node.name" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="node.state">
                <el-radio label="0">启用</el-radio>
                <el-radio label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图标icon">
                <i class="el-icon-edit"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-delete"></i>
            </el-form-item>
            <el-form-item label="父级节点">
                <el-select v-model="node.parentId" placeholder="请选择父级节点">
                <el-option v-for="item in nodeParent" :key="item.nodeId" :label="item.label" :value="item.nodeId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="路由地址">
                <el-input v-model="node.path" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="节点描述">
                <el-input type="textarea" v-model="node.description" style="width:380px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      let {data} = await axios.get('/rbac/node/lists');
      console.log(data.lists);
      return {
        nodeParent: data.lists,
      }
    },
    data() {
      return {
        node: {
          name: '',
          state: 1,
          parentId:'',
          description: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>