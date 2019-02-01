<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>节点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="height:62px;">
          <!--搜索框-->
          <el-form :inline="true" :model="formInline" style="float:left;" size="small">
              <el-form-item>
                <nuxt-link :to="{name:'node-store'}">
                  <el-button type="primary">添加节点</el-button>
                </nuxt-link>
              </el-form-item>
              <el-form-item label="节点">
                  <el-input placeholder="搜索节点"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
        <el-tree
          :data="data"
          :props="name"
          node-key="nodeId"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :expand-on-click-node="false"
          :render-content="renderContent"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
        </el-tree>
    </div>
</template>


 <script>
 
  import qs from 'qs';
  import axios from '~/plugins/axios.js'

  let id = 1000;
  export default {
    layout:'main',
    name:'node',
    async asyncData () {
      let { data } = await axios.get('/rbac/node/lists')
      return {
        nodeParent: data.lists,
        data: JSON.parse(JSON.stringify(data.lists))
      }
    },
    data() {
      return {
        form: {
          label: '',
          icon: '',
          state: true,
          path: '',
          parentId: '',
          description: ''
        }
      }
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.$router.push({ path: '/node/' + data.nodeId }) } >查看</el-button>
              <el-button size="mini" type="text" on-click={ () => this.destroy(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },
      destroy(node, data){
        axios.delete(`/rbac/node/${data.nodeId}`, {data: qs.stringify({nodeId:data.nodeId})})
        .then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
                this.$message({
                    message: '成功删除节点',
                    type: 'success'
                    });    
                }
                //删除当前节点
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            }).catch(res => {
                this.$message.error('请求错误，请重试');
            });
        }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
