<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>节点管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="form" :model="form" label-width="80px" size="medium">
            <el-form-item label="节点名称">
                <el-input v-model="form.name" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="路由地址">
                <el-input v-model="form.name" style="width:400px"></el-input>
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
                <el-input type="textarea" v-model="form.desc" style="width:580px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    layout:'main',
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