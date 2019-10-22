<template>
    <div style="height:100%;">
        <div class="top-bar">
            <el-row>
                <el-col :span="8">当前用户: wechat</el-col>
                <el-col :span="8"><span class="text-1">状态：在线 </span></el-col>
                <el-col :span="8"><span class="text-2">注销登陆</span></el-col>
            </el-row>
        </div>
        <div class="main">
            <el-row>
                <el-col :span="4">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">在线聊天</span>
                        </template>
                        <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">系统消息</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">阅读中心</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">通讯管理</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">其他</span>
                    </el-menu-item>
                </el-menu>                
                </el-col>
                <el-col :span="6">
                    <div class="chat-lists">
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="room">
                            <div class="avatar">
                                <img src="http://img.17wangku.com/201902110822025c6130aa48687.jpg" alt="">
                            </div>
                            <div class="info">
                                <span>微信一群 <small style="float:right">23分钟前</small></span>
                                <small>
                                    [12条]微信用户: 新发的消息
                                </small>
                            </div>
                        </div>
                        <div class="more">
                            <div class="tip">
                                查看更多...
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="14">
                    <div class="message-bar">
                        <p class="title_wrap">微信一群</p>
                        <div class="content">

                        </div>
                        <div class="box-ft">
                            <div class="toolbar">
                                <span style="float:left;">
                                    <i class="el-icon-upload el-icon--right"></i>
                                    <i class="el-icon-upload el-icon--right"></i>
                                    <i class="el-icon-upload el-icon--right"></i>
                                </span>
                                <small style="float:right;font-size:14px;margin-right:8px;">
                                    聊天记录
                                </small>
                                <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                                    </el-input>
                                <el-button type="primary" style="float:right;margin-top:5px;" size="medium">发送</el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
 <script>

  import qs from 'qs';
  import axios from '~/plugins/axios.js';

  export default {
    layout:'frame',
    name:'chat',
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style scoped lang="scss">

  .top-bar{
      color: #000;
      padding-bottom: 5px;
      line-height: 28px;
      border-bottom: 1px solid #dddddd;
      .text-1{
          display: block;
          text-align: center;
      }
      .text-2{
          display: block;
          float: right;
      }
  }
  .main {
    margin: 0px;
    .chat-lists{
        overflow: hidden;
        height: 584px;
        padding:0 6px;
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        .room{
            float: left;
            width: 100%;
            height: 68px;
            border-bottom: 1px solid #dddddd; 
            .avatar{
                margin: 5px 0;
                float: left;
                border-radius: 3px;
                img{
                    height: 58px;
                    width: 58px;
                }
            }
            .info{
                color: #000;
                width: 226px;
                float: left;
                padding: 6px 6px;
                overflow: hidden;
                span{
                    display: block;
                    line-height: 36px;
                }
            }
        }
        .room:hover{
            cursor:pointer;
            background: rgba(241, 237, 237, 0.534);
        }
        .more{
            color: #000;
            display: block;
            float: left;
            width: 100%;
            line-height: 38px;
            text-align: center;
            height: 38px;
            margin: 0 auto;
        }
    }
    .message-bar{
      color: #000;
      .title_wrap{
        line-height: 38px;
        text-align: center;
        border-bottom:1px solid #dddddd; 
      }
      .content{
        width: 100%;
        height: 300px;
        border-bottom:1px solid #dddddd; 
      }
      .box-ft{
          .toolbar{
            font-size: 28px;
            line-height: 38px;
          }
      }
 }   
}
</style>