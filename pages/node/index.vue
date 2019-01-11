<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>节点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-dialog
            title="添加节点"
            :visible.sync="dialogVisible"
            width="35%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="节点名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="路由地址">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型">
                <el-radio-group v-model="form.resource">
                <el-radio label="一级菜单"></el-radio>
                <el-radio label="二级菜单"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="节点类型">
                <el-select v-model="form.region" placeholder="请选择父级节点">
                <el-option label="权限管理" value="beijing"></el-option>
                <el-option label="站点管理" value="shanghai"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点描述">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
        </el-tree>
    </div>
</template>


 <script>
  let id = 1000;
  export default {
    layout:'main',
    name:'node',
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
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
        dialogVisible: false,
        data: JSON.parse(JSON.stringify(data))
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
              <el-button size="mini" type="text" on-click={ (res) => this.dialogVisible = true }>添加</el-button>
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
