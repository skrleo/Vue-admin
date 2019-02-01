<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>关联节点</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form label-width="80px" size="medium">
          <el-form-item label="角色名称" prop="name">
            <span style="color:#000;">超级管理员</span>
          </el-form-item>
          <el-form-item label="关联节点">
            <el-tree
                :data="node"
                show-checkbox
                node-key="nodeId"
                ref="node"
                default-expand-all
                :expand-on-click-node="false"
                @check-change="handleCheckChange">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdate(3)">立即关联</el-button>
            <el-button>取消</el-button>
          </el-form-item>
      </el-form>
    </el-row>
  </el-row>
  </section>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  
  export default {
    layout: 'main',
    async asyncData () {
      let { data } = await axios.get('/rbac/node/lists')
      return {
        node: JSON.parse(JSON.stringify(data.lists))
      }
    },
    data() {
      return{
        data:{
          nodeId:''
        },
        nodeIds:[]
      }
    },
    methods: {
      onUpdate(val){
        axios.put('rbac/purview/role/node',qs.stringify({
            roleId: val,
            nodeIds: this.$refs.node.getCheckedKeys()
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功关联节点',
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
  };
</script>