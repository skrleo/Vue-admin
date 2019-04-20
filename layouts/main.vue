<template>
    <div>
        <el-container class="main">
            <el-header class="main-header">
                <div class="logo">
                    <h3>后台管理系统</h3>
                </div>
                <el-dropdown>
                    <span class="el-head-img">
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
                        <nuxt-link :to="{name:'user-id'}">
                            <el-dropdown-item>
                                <i class="el-icon-third-tubiaozhizuomoban13"></i>
                                消息
                            </el-dropdown-item>
                        </nuxt-link>
                        <nuxt-link :to="{name:'user-id',params:{ id: userInfo.uid }}">
                            <el-dropdown-item>
                                <i class="el-icon-third-shezhi"></i>
                                个人中心
                            </el-dropdown-item>
                        </nuxt-link>
                        <el-dropdown-item @click.native="loginOut()">
                            <i class="el-icon-third-tuichu"></i>
                            退出登录
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
    </div>
</template>

<script>
  import qs from 'qs';
  import axios from '~/plugins/axios.js'
  import Cookie from 'js-cookie'
  import Echo from 'laravel-echo'
  import io from 'socket.io-client'

  export default {
    middleware: 'checkLogin',
    name: 'main',
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
    mounted () {
        window.io = io
        window.Echo = new Echo({
            broadcaster: 'socket.io',
            host: 'http://api.example.com:6001',
        })
        window.Echo.private('Message').listen('.sayHello', (res) => {
            this.$message({
                        message: '退出成功',
                        type: 'success'
                    });
        });
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
                    width:45px;
                    height: 45px;
                    border-radius: 25px;
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

</style>
