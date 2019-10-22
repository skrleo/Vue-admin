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
            <span style="color:#000;">{{role.name}}</span>
          </el-form-item>
          <el-form-item label="关联节点">
            <el-tree
                :data="node"
                show-checkbox
                node-key="nodeId"
                ref="node"
                default-expand-all
                :default-checked-keys="role.nodeIds"
                :expand-on-click-node="false">
            </el-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdate(role.roleId)">立即关联</el-button>
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
    layout: 'frame',
    validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      let [node, role] = await Promise.all([
        axios.get('/admin/rbac/node/lists'),
        axios.get(`/admin/rbac/role/${params.id}`)
      ])
      return {
        node: JSON.parse(JSON.stringify(node.data.lists)),
        role: role.data.data
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
        axios.put('/admin/rbac/purview/role/node',qs.stringify({
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