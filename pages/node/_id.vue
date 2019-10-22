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
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">禁用</el-radio>
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
                <el-button type="primary" @click="onUpdate(node.nodeId)">立即修改</el-button>
                <el-button type="primary">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  import { all } from 'q';
  export default {
    layout:'frame',
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      const [node,nodeParent] = await Promise.all([
        axios.get(`/admin/rbac/node/${params.id}`),
        axios.get('/admin/rbac/node/lists')
      ])
      return {
        node: node.data.data,
        nodeParent: JSON.parse(JSON.stringify(nodeParent.data.lists))
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
            this.node.icon = item;
            var _dom = document.querySelector('.system-auth__icon.system-auth__iconnow');
            if (_dom) {
              _dom.classList.toggle('system-auth__iconnow');
            }
        },
        onUpdate(val) {
          axios.put(`/admin/rbac/node/${val}`,qs.stringify({
            nodeId: val,
            label: this.node.label,
            icon: this.node.icon,
            state: this.node.state,
            path: this.node.path || '',
            parentId: this.node.parentId || 0,
            description: this.node.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功修改节点',
                  type: 'success'
                });
            }
          }).catch(res => {
            if(res.response.data.message === ''){
              this.$message.error('请求异常，请稍后重试！');
            }else{
              this.$message.error(res.response.data.message);
            }
          });
        }
    }
  }
</script>
<style type="text/css" scoped>
  .system-auth__iconnow > i{
    color: rgba(247, 16, 8, 0.993);
  }
</style>

