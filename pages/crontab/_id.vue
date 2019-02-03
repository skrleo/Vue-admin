<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>任务管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加任务</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="role" :model="role" label-width="80px" size="medium">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="role.name" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="state">
             <el-radio-group v-model="role.state">
              <el-radio label="0">执行一次</el-radio>
              <el-radio label="1">循环执行</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间间隔">
                <el-input placeholder="请输入间隔时间" v-model="input" class="input-with-select" style="width:280px;">
                    <el-select v-model="select" slot="append" placeholder="秒">
                    <el-option label="秒" value="1"></el-option>
                    <el-option label="分" value="2"></el-option>
                    <el-option label="时" value="3"></el-option>
                    </el-select>
                </el-input>
          </el-form-item>
          <el-form-item label="起止时间" prop="state">
             <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
                }">
            </el-time-select>
            <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: startTime
                }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="执行任务" style="width:600px" prop="description">
            <el-input v-model="role.name" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="备注" style="width:600px" prop="description">
            <el-input type="textarea" v-model="role.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
    data() {
      return {
        role:{
          name:'',
          state:'',
          description:''
        },
        startTime: '',
        endTime: '',
        select: '',
        dialogVisible: false
      }
    },
    methods: {
      onSubmit() {
        axios.post('/admin/rbac/role',qs.stringify({
            name: this.role.name,
            state: this.role.state,
            description: this.role.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功添加角色',
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
<style>
  .el-select .el-input {
    width: 68px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>