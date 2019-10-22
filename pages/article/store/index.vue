<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ name: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-form :model="article" ref="article" label-width="80px" size="medium">
      <el-form-item label="景点名称" prop="title">
        <el-input  v-model="article.title" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input  v-model="article.address" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="开放时间" prop="openTime">
        <el-date-picker
          v-model="article.openTime"
          value-format="timestamp"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="人均消费" prop="price">
        <el-input  v-model="article.price" style="width:360px;"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="article.status">
          <el-radio label="0">待发布</el-radio>
          <el-radio label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          action="http://api.example.com/v1.0/api/upload/img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="onBeforeUploadImage">
          <img v-if="article.cover" :src="article.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="景点标签">
        <el-tag
          v-for="tag in tags"
          closable
          :key="tag.tagId"
          :label="tag.name"
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="tagVisible"
          v-model="article.name"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      </el-form-item>
      <el-form-item label="景点类目" prop="categoryId">
        <el-select v-model="article.categoryId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="景点简介" prop="description">
        <el-input
          type="textarea"
          style="width:480px;"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="article.description">
        </el-input>
      </el-form-item>
      <el-form-item label="推荐理由" prop="reason">
        <no-ssr><mavon-editor :toolbars="markdownOption" v-model="article.reason"/></no-ssr>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
  data() {
    return {
      dialogVisible: false,
      tags: [],
      tagVisible: false,
      article:{
        cover:'',
        title:'',
        reason: '', 
        name:'',
        price:'',
        address:'',
        openTime:'',
        status: 0,     
        recommend:'',      
        categoryId:''
      },
      options: [{
        value: '0',
        label: '推荐'
      }, {
        value: '1',
        label: '景点'
      }, {
        value: '2',
        label: '活动'
      }, {
        value: '3',
        label: '产品'
      }],
      markdownOption:{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook:"#### 开始编写",
      codeStyle: "dark"
    }
  },
  methods: {
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 1MB!')
      }
      return isIMAGE && isLt1M
    },
    uploadSuccess(response, file, fileList){
      this.article.cover = response.data.filePath;
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
            url: 'server url',
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
            $vm.$img2Url(pos, url);
        })
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    showInput() {
      this.tagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      axios.post('/admin/article/tag',qs.stringify({
          name: this.article.name
        })).then(res => {
          //判断是否请求成功
          if(res.data.errorId === 'OK'){
            /**
             * 获取tagId
             */
            const tagId = res.data.data.tagId;
            const tagName = this.article.name;
            this.tags.push({
                  tagId : tagId,
                  name : tagName
              });
            this.tagVisible = false;
            this.article.tagName = '';
          }
        })
    },
    onSubmit() {
      const Uid = Cookie.get('Uid');
      axios.post('/admin/article',qs.stringify({
          uid: Uid,
          title: this.article.title,
          tagIds: this.tags||[],
          reason: this.article.reason || '',
          price: this.article.price || '',
          address: this.article.address || '',
          openTime: this.article.openTime || '',
          status: this.article.status,
          cover: this.article.cover || '',
          description: this.article.description || '',
          categoryId: this.article.categoryId || 0,
        })).then(res => {
          //判断是否请求成功
          if(res.data.errorId === 'OK'){
            this.$message({
                message: '成功发布文章',
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
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 118px;
    height: 118px;
    line-height: 118px;
    text-align: center;
  }
  .avatar {
    width: 118px;
    height: 118px;
    display: block;
  }
  a{
    color: #000;
    text-decoration-line: none;
  }
  ul li{
    list-style-type: none;
  }
 .el-footer {
    background-color: #39393b;
    color: #fafafa;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    width: 80%;
    margin: 0 auto;
  }
</style>