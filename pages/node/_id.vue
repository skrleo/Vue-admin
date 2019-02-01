<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>节点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="node" :model="node" label-width="80px" size="medium">
            <el-form-item label="节点名称">
                <el-input v-model="node.label" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="node.state">
                <el-radio label="0">启用</el-radio>
                <el-radio label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="图标icon" style="width:680px;">
              <div :class="{
                'system-auth__icon': 1,
                'system-auth__iconnow': item === node.icon
                }" v-for="(item, index) in iconLists" :key="index" @click="chooseIcon(item)" style="color:#000;float:left;margin-right:8px;">
                <i :class="item"></i>
              </div>
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
                <el-button type="primary">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  export default {
    layout:'main',
    validate ({ params }) {
      // Must be a number
      if(/^\d+$/.test(params.id)){
        this.id = params.id;
      }
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      let {data} = await axios.get(`/rbac/node/${params.id}`);
      return {
        node: data.data,
      }
    },
    data() {
      return {
        node: {
          label: '',
          state: 1,
          icon:'',
          parentId:'',
          description: ''
        },
        iconLists: require('~/assets/icon/icon.json'),
      }
    },
    methods: {
        chooseIcon (item) {
            this.node.icon = item
        },
        onSubmit() {
            console.log('submit!');
        }
    }
  }
</script>