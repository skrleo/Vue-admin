<template>
  <div>
    <div class="banner">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>快捷方式</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="showDel">操作按钮</el-button>
            </div>
            <div v-for="(shortcut,index) in shortcuts" :key="index" class="text item">
              <span @click="delShortcut(shortcut.shortcutId,index,shortcuts)" v-if="isCollapse == true">
                <i class="el-icon-circle-close-outline del_shortcut"></i>
              </span>
              <nuxt-link :to="{name: `${shortcut.path}`}">
                <div class="icon-text">
                  <i :class="shortcut.icon"></i>
                </div>
                {{shortcut.label}}
              </nuxt-link>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>待办事件</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              我的消息
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              我的邮件
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              备忘录
            </div>
            <div class="text item">
              <div class="icon-text">
                <i class="el-icon-circle-plus-outline"></i>
              </div>
              我的邮件
            </div>
          </el-card>
          
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>网站配置</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 6" :key="o" class="text item">
              {{'列表内容 ' }}
            </div>
          </el-card>
        </el-col>
      </el-row>
      
      <div class="home-card">
        <div class="home-item" v-for="n in 7" :key="n">
          <img class="home-img" src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
          <div class="home-right">
            <span style="color: #999; fontSize: 12px">当周流入总计</span>
            <span class='home-num' >124,345</span>
            <span><i class="el-icon-caret-bottom" style="color: red; fontSize: 12px" ></i> <i style="color: red">&nbsp;-10%</i>&nbsp;&nbsp;  <span style="color: #999; fontSize: 12px">同比上月</span></span>
          </div>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="18">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>网站访问量</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <ve-line :data="chartData"></ve-line>
          </el-card>
        </el-col>
        <el-col :span="6">
          <p style="color:#424040;font-size:21px;">公告:</p>
          <ul style="color:#424040;font-size:16px;line-height:28px;">
            <li>商家社区有赞的10条举措，与商家共渡难关</li>
            <li>商家社区有赞的10条举措，与商家共渡难关</li>
            <li>商家社区有赞的10条举措，与商家共渡难关</li>
            <li>商家社区有赞的10条举措，与商家共渡难关</li>
          </ul>
        </el-col>
      </el-row>
    </div>
</div>
</template>
<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js';
  import Cookie from 'js-cookie'

  export default {
    layout: 'frame',
    created: function () {
      axios.get('/admin/base/shortcut/lists')
        .then(res => {
          console.log(res.data);
          this.shortcuts = res.data.lists || [];
        });
    },
    data() {
      return {
        shortcuts:[],
        qrCode:'',
        isCollapse:false,
        chartData: {
          columns: ['日期', '访问用户', '新增用户'],
          rows: [
            { '日期': '星期日', '访问用户': 393, '新增用户': 43, },
            { '日期': '星期一', '访问用户': 193, '新增用户': 13, },
            { '日期': '星期二', '访问用户': 330, '新增用户': 30, },
            { '日期': '星期三', '访问用户': 223, '新增用户': 23, },
            { '日期': '星期四', '访问用户': 123, '新增用户': 13, },
            { '日期': '星期五', '访问用户': 392, '新增用户': 32, },
            { '日期': '星期六', '访问用户': 153, '新增用户': 42, },
          ]
        }
      }
    },
    methods: {
      showDel(){
        if(this.isCollapse == true){
          this.isCollapse = false
        }else{
          this.isCollapse = true
        }
      },
      delShortcut(val,index,rows){
        axios.delete(`/admin/base/shortcut/${val}`, {data: qs.stringify({shortcutId:val})})
            .then(res => {
                //判断是否请求成功
                if(res.data.errorId === 'OK'){
                    rows.splice(index, 1);
                    this.$message({
                        message: '成功删除快捷方式',
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
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
  a{
    text-decoration-line: none;
    color: #000000;
  }
  .home-card {
    width:100%;
    overflow: hidden;
    padding: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    .home-item {
      border-style: solid;
      border-width: 1px;
      border-color: #E4E4E4;
      width: calc(25% - 30px);
      padding: 10px 0px 10px 20px;
      margin-right: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      background: #fff;
      &:nth-child(4) {
        margin-right: 0;
      }
      .home-img {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 0;
        padding: 0;
      }
      .home-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 10px;
        .home-num {
          font-size: 40px;
          margin: 5px 0;
        }
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .text {
    float: left;
    margin: 8px 6px;
    font-size: 14px;
    .del_shortcut{
      margin-right: 2px;
      color:red;
      font-size: 18px;
    }
    .icon-text{
      margin-bottom: 8px;
      text-align: center;
      width: 100%;
      i{
        font-size: 23px;
      }
    }
  }
</style>