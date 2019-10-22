<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加标签</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="tag" ref="tag" label-width="80px" size="medium">
      <el-form-item label="标签名称" prop="name">
        <el-input  v-model="tag.name" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="标签状态" prop="status">
        <el-radio-group v-model="tag.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
           style="width:480px;"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="tag.description">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update(tag.tagId)">立即修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    
  </div>
</template>
<script>
import qs from 'qs';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie'
export default {
  layout: 'frame',
  validate ({ params }) {
      // Must be a number
      return /^\d+$/.test(params.id)
    },
  async asyncData ({ params }) {
    let {data} = await axios.get(`/admin/article/tag/${params.id}`);
    return {
      tag: data.data
    }
  },
  data() {
    return {
      tag:{
          name:'',
          status:'',
          description:'',
      }
    }
  },
  methods: {
        update(val) {
          axios.put(`/admin/article/tag/${val}`,qs.stringify({
              name: this.tag.name,
              status: this.tag.status,
              description: this.tag.description || ''
            })).then(res => {
              //判断是否请求成功
              if(res.data.errorId === 'OK'){
                this.$message({
                    message: '成功编辑标签',
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
