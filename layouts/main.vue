<template>
    <div>
        <el-container class="main">
            <el-header class="main-header">
                <div class="logo">
                    <h3>后台管理系统</h3>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <nuxt-link :to="{name:'user-id',params:{ id: userInfo.uid }}">
                            <el-badge class="item">
                                <img :src="userInfo.headimg" :alt="用户头像">
                            </el-badge>
                        </nuxt-link>       
                        <span style="line-height:45px;">{{userInfo.name || '匿名用户'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
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

  export default {
    middleware: 'checkLogin',
    name: 'main',
    created:function(){
        let Uid = Cookie.get('Uid');
        axios.get('/base/lists',{
                params: {
                    uid: Uid
                }
            })
            .then(res => {
                this.nodeList = res.data.lists
              });
        axios.get(`/user/${Uid}`)
        .then(res => {
                this.userInfo = res.data.data
              });
    },
    methods:{
        loginOut(){
            Cookie.remove('token');
            this.$message({
                message: '退出成功',
                type: 'success'
            });
            this.$router.push('/login'); 
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
            .el-dropdown-link{
                margin-right: 35px;
                img{
                    $imgMargin: (($header-height - 45)/2);
                    display:inline-block;
                    width:45px;
                    height: 45px;
                    border-radius: 25px;
                    margin-top: $imgMargin;
                }
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
