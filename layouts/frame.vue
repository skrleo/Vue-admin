<template>
    <div>
        <el-container class="main">
            <el-header class="main-header">
                <div class="logo">
                    <h3>后台管理系统</h3>
                </div>
                <el-dropdown>
                    <span class="el-head-img">
                        <!-- <el-avatar shape="square" size="medium" :src="userInfo.headimg"></el-avatar> -->
                        <nuxt-link :to="{name:'user-id',params:{ id: userInfo.uid }}">
                            <el-badge class="item">
                                <img :src="userInfo.headimg" alt="">
                            </el-badge>
                        </nuxt-link>       
                    </span>
                    <span class="el-dropdown-link">
                        <span style="line-height:45px;">{{userInfo.name || '普通管理员'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-link @click="drawer = true" :underline="false">
                                <i class="el-icon-third-tubiaozhizuomoban13"></i>消息
                            </el-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <nuxt-link :to="{name:'user-id',params:{ id: userInfo.uid }}">
                                <i class="el-icon-third-shezhi"></i>个人中心
                            </nuxt-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-link @click="loginOut()" :underline="false">
                                <i class="el-icon-third-tuichu"></i>退出登录
                            </el-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container class="aside">
                <el-aside :width="tabWidth+'px'">
                    <el-menu
                        router
                        default-active="2"
                        class="el-menu-vertical-demo">

                        <el-submenu :index="item.nodeId + ''" v-for="(item, index) in nodeList" :key="index">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.label}}</span>
                            </template>
                            <el-menu-item-group v-if="item.children">
                                <el-menu-item :index="node.path + ''" v-for="(node, index) in item.children" :key="index">
                                    {{node.label}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <nuxt/>
                </el-main>
            </el-container>
        </el-container>
        
        <el-drawer
            title="在线聊天"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose"
            size="35%">
            <div id="chat">
                <p class="head-title">欢迎使用在线聊天系统</p>
                <small>这里是团队默认讨论组，所有成员都会自动加入这个讨论组。跟新成员打个招呼噢~</small>
                <el-divider></el-divider>
                
                <div class="bubble" v-infinite-scroll="load">
                    <el-scrollbar style="height:390px;">
                         <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰：</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">小灰灰，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我很爱很爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">滚，一边去</div>
                            </div>
                        </div>
                        <br/>
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">小灰灰，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我很爱很爱你！</div>
                            </div>
                        </div>
                        
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">小灰灰，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我很爱很爱你！</div>
                            </div>
                        </div>
                        
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">小灰灰，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我很爱很爱你！</div>
                            </div>
                        </div>
                        
                        <div class="chat clearfix fr">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">谭琳宝宝</small>
                            <div class="chat-bubble">
                                <span class="triangle right"></span>
                                <div class="article">小灰灰，我爱你！</div>
                            </div>
                        </div>
                        <div class="chat clearfix">
                            <el-avatar size="medium" :src="circleUrl"></el-avatar>
                            <small class="nickname">小灰灰</small>
                            <div class="chat-bubble">
                                <span class="triangle"></span>
                                <div class="article">谭琳宝宝，我很爱很爱你！</div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>

                <div class="send-box">
                    <el-divider></el-divider>
                    <div class="chat-tool">
                        <span>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="链接地址" placement="top-start">
                                    <i class="el-icon-link"></i>
                                </el-tooltip>
                            </el-link>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="语音电话" placement="top">
                                    <i class="el-icon-phone-outline"></i>
                                </el-tooltip>
                            </el-link>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="视频聊天" placement="top">
                                    <i class="el-icon-video-camera-solid"></i>
                                </el-tooltip>
                            </el-link>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="图片" placement="top-end">
                                    <i class="el-icon-picture-outline"></i>
                                </el-tooltip>
                            </el-link>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="聊天设置" placement="top-start">
                                    <i class="el-icon-setting"></i>
                                </el-tooltip>
                            </el-link>
                            <el-link :underline="false">
                                <el-tooltip class="item" effect="dark" content="帮助" placement="top-end">
                                    <i class="el-icon-info"></i>
                                </el-tooltip>
                            </el-link>
                        </span>
                        <small class="chat-record"><el-link :underline="false">聊天记录</el-link></small>
                        <el-input type="textarea" :rows="4" v-model="chatMessage" placeholder="发送消息..." />
                    </div>
                    
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  import Cookie from 'js-cookie'

  export default {
    middleware: 'checkLogin',
    name: 'frame',
    created:function(){
        let Uid = Cookie.get('Uid');
        axios.get('/admin/base/lists',{
                params: {
                    uid: Uid
                }
            }).then(res => {
                this.nodeList = res.data.lists
              }).catch(res => {
                if(res.response.data.message === ''){
                  this.$message.error('请求异常，请稍后重试！');
                  Cookie.remove('token');
                  this.$router.push({
                    path: '/login',
                  });
                }else{
                  this.$message.error(res.response.data.message);
                  Cookie.remove('token');
                  this.$router.push({
                    path: '/login',
                  });
                }
              });
        axios.get(`/admin/user/${Uid}`)
            .then(res => {
                    this.userInfo = res.data.data
                });
    },
    methods:{
        loginOut(){
            axios.delete('/login').then(res => {
                console.log(res);
                //判断是否请求成功
                if(res.data.statusCode == '200'){
                    Cookie.remove('token');
                    this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
                    this.$router.push('/login'); 
                }
              })
              .catch(res => {
                if(res.response.data.message === ''){
                  this.$message.error('请求异常，请稍后重试！');
                }else{
                  this.$message.error(res.response.data.message);
                }
              });
        }
    },
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            chatMessage:'',
            drawer: false,
            direction: 'rtl',
            isCollapse: false,
            tabWidth: 200,
            test1: 1,
            intelval: null,
            nodeList:[],
            userInfo:{
                uid: 0 ,
                name: ''
            }
        };
    },
    methods: {
        handleClose(done) {
            done();
        },
        loginOut(){
            this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
            axios.delete('/login').then(res => {
                //判断是否请求成功
                if(res.data.statusCode == '200'){
                    Cookie.remove('token');
                    this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
                    this.$router.push('/login'); 
                }
                })
                .catch(res => {
                    if(res.response.data.message === ''){
                        this.$message.error('请求异常，请稍后重试！');
                    }else{
                        this.$message.error(res.response.data.message);
                    }
                });
        }
    },
    mounted () {
        var a_index = 0;
        $("body").click(function(e){
            var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
            var $i = $("<span/>").text(a[a_index]);
            a_index = (a_index + 1) % a.length;
            var x = e.pageX,y = e.pageY;
            $i.css({
                "z-index": 99999,
                "top": y - 20,
                "left": x,
                "position": "absolute",
                "font-weight": "bold",
                "color": "#ff6651"
            });
            $("body").append($i);
            $i.animate({"top": y-180,"opacity": 0},1500,function() {
                $i.remove();
            });
        });
    }
  }
</script>
<style scoped lang="scss">
    $header-height:50px;
    $background-color:rgb(253, 253, 253);
    $color: #dddddd;
    *{
        text-decoration-line: none;
    }
    .main{
        height: 97vh;
        min-width: 800px;
        min-height: 600px;
        overflow: hidden;

        .main-header {
            background-color: $background-color;
            color: $color;
            border-bottom: 1px solid #DDD;
            .logo{
                color:#7d7d7d;
                float: left;
                font-size: 23px;
                margin-top: -21px;
            }
            .el-dropdown{
                cursor: pointer;
                float: right;
            }
            .el-head-img{
                img{
                    $imgMargin: (($header-height - 45)/2);
                    display:inline-block;
                    width:38px;
                    height: 38px;
                    border-radius: 3px;
                    margin-top: $imgMargin;
                }
            }
            .el-dropdown-link{
                margin-right: 35px;
            }
        }
    }
    .aside{
        overflow: visible;
        height: 100%;
        background-color: $background-color;
        color: $color;
        aside{
            overflow: visible;
            height: 100%;
            background-color: $background-color;
            color: $color;
            border-right: 1px solid #DDD;
            .menu {
                width: 100%;
                border-right:0;
            }
         }
    }
    #chat{
        padding: 0 15px 0 15px;
        .head-title{
            font-size: 16px;
        }
        .send-box{
            width: 95%;
            font-size: 21px;
            position: absolute;
            line-height: 32px;
            bottom: 8px;
            .chat-tool{
                color: #7d7d7d;
                margin-top: -21px;
            }
            .chat-record{
                display: block;
                float: right;
                color: #000000;
            }
            .el-link i{
                font-size: 18px;
            }
        }
        .bubble {
            .nickname{
                margin-left: 8px;
                color: #6f6868;
            }
            .chat {
                display: inline-block;
                width: 100%;
                margin-bottom: 12px;
                position:relative;
                .el-avatar{
                    margin-top: 8px;
                    float: left;
                }
                .article {
                    max-width: 75%;
                    color:#FFF;
                    margin-left: 12px;
                    display:inline-block;
                    *display:inline; zoom:1;
                    padding:5px 10px;
                    border:1px solid #3079ED;
                    background:#eee;
                    border-radius:5px;
                    background-color: #4D90FE;
                    background-image:-webkit-gradient(linear,left top,left bottom,from(#4D90FE),to(#4787ED));
                    background-image:-webkit-linear-gradient(top,#4D90FE,#4787ED);
                    background-image:-moz-linear-gradient(center top , #4D90FE, #4787ED);
                    background-image:linear-gradient(top,#4D90FE,#4787ED);
                }
                .triangle {
                    position:absolute;
                    top:50%;
                    // margin-top:-8px;
                    left:40px;
                    display:block;
                    width:0;
                    height:0;
                    overflow:hidden;
                    line-height:0;
                    font-size:0;
                    border-bottom:8px solid #FFF;
                    border-top:8px solid #FFF;
                    border-left:none;
                    border-right:8px solid #4787ED;
                }
            }
            
            .fr { 
                width: 100%;
                .nickname{
                    float: right;
                    margin-right: 9px;
                    color: #6f6868;
                }
                .el-avatar{
                    float: right;
                }
                .triangle {
                    left:auto;
                    right:48px;
                    border-bottom:8px solid #FFF;
                    border-top:8px solid #FFF;
                    border-right:none;
                    border-left:8px solid #4787ED;
                }
                .article {
                    float:right;
                    margin: 23px -51px 12px 0;
                }
            }
        }
    }

</style>
