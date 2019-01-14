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
                  <el-button type="primary" @click="dialogVisible = true">添加节点</el-button>
              </el-form-item>
              <el-form-item label="审批人">
                  <el-input placeholder="审批人"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                  <el-select placeholder="活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
        </div>
        <el-dialog
            title="添加节点"
            :visible.sync="dialogVisible"
            width="35%">
          <el-form ref="form" :model="form" label-width="80px" size="small">
            <el-form-item label="节点名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item label="Icon">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>
            <el-form-item label="路由地址">
                <el-input v-model="form.path"></el-input>
            </el-form-item>
            <el-form-item label="父级节点">
                <el-select v-model="form.parentId" placeholder="请选择父级节点">
                <el-option v-for="item in nodeParent" :key="item.nodeId" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点描述">
                <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sumbit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-tree
            :data="data"
            show-checkbox
            node-key="nodeId"
            node-value="name"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
        </el-tree>
    </div>
</template>


 <script>
 
  import axios from '~/plugins/axios'

  let id = 1000;
  export default {
    layout:'main',
    name:'node',
    async asyncData () {
      let { data } = await axios.get('http://api.example.com/v1.0/api/rbac/node/lists')
      return {
        nodeParent: data.lists,
        data: JSON.parse(JSON.stringify(data.lists))
      }
    },
    data() {
      const data = [{
        nodeId: 2,
        label: '文章管理',
        children: [{
          nodeId: 5,
          label: '文章列表'
        }, {
          nodeId: 6,
          label: '微信管理'
        }]
      },{
        nodeId: 1,
        label: '权限管理',
        children: [{
          nodeId: 4,
          label: '节点管理'
        },{
          nodeId: 4,
          label: '角色管理'
        },{
          nodeId: 4,
          label: '权限管理'
        }]
      }, {
        nodeId: 3,
        label: '站点管理',
        children: [{
          nodeId: 7,
          label: '站点配置'
        }]
      }];
      return {
        form: {
          name: '',
          icon: '',
          status: true,
          path: '',
          parentId: '',
          description: ''
        },
        dialogVisible: false,
        // data: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      sumbit(){
          this.$axios.post('http://api.example.com/v1.0/api/rbac/node', {
              name: this.form.name,
              icon: this.form.icon,
              status: this.form.status,
              path: this.form.path,
              parentId: this.form.parentId,
              description: this.form.description,
            }).then(res => {
              //将服务端的token存入cookie当中
              Cookie.set('token', res.data.token)
              //判断是否请求成功
              if(res.data.statusCode === 'OK'){
                this.$message({
                  message: '成功添加节点',
                  type: 'success'
                });       
                this.append(data);       
              }else{
                this.$message.error('res.data.message');
              }
            }).catch(res => {
              this.$message.error('请求错误，请重试');
            });
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.$router.push({ path: '/node/' + 1 }) } >查看</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
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
