<template>
  <section>
    <el-row class="panel panel-flat">
      <el-row class="panel-body clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>任务管理</el-breadcrumb-item>
          <el-breadcrumb-item>编辑任务</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-form ref="role" :model="task" label-width="80px" size="medium">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="task.name" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="state">
             <el-radio-group v-model="task.type">
              <el-radio :label="0">执行一次</el-radio>
              <el-radio :label="1">循环执行</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时间间隔">
                <el-input placeholder="请输入间隔时间" v-model="task.interval" class="input-with-select" style="width:280px;">
                    <el-select v-model="task.intervalType" slot="append" placeholder="秒">
                    <el-option label="秒" :value="0"></el-option>
                    <el-option label="分" :value="1"></el-option>
                    <el-option label="时" :value="2"></el-option>
                    </el-select>
                </el-input>
          </el-form-item>
          <el-form-item label="起止时间" prop="state">
            <el-date-picker
                v-model="task.beginTime"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="执行任务" style="width:600px" prop="action">
            <el-input v-model="task.action" style="width:280px;"></el-input>
          </el-form-item>
          <el-form-item label="备注" style="width:600px" prop="description">
            <el-input type="textarea" v-model="task.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUpdate(task.crontabId)">立即修改</el-button>
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
      if(/^\d+$/.test(params.id)){
        this.id = params.id;
      }
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      const {data} = await axios.get(`/admin/task/${params.id}`);
      return {
        task: data.data,
      }
    },
    data() {
      return {
        task:{
          name: '',
          type: 0,
          interval: 0,
          intervalType: 0,
          beginTime: 0,
          endTime: 0,
          action: '',
          description:''
        },
        select: ''
      }
    },
    methods: {
      onUpdate(val) {
        axios.put(`/admin/task/${val}`,qs.stringify({
            name: this.task.name,
            type: this.task.type,
            interval: this.task.interval,
            intervalType: this.task.intervalType,
            beginTime: this.task.beginTime[0],
            endTime: this.task.beginTime[1],
            action: this.task.action,
            description: this.task.description
          })).then(res => {
            //判断是否请求成功
            if(res.data.errorId === 'OK'){
              this.$message({
                  message: '成功编辑定时任务',
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