<template>
    <div>
        <el-container class="main">
            <el-header class="main-header">
                <div class="logo">
                    <h3>后台管理系统</h3>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <nuxt-link :to="{name:'user-id',params:{ id: 1 }}">
                            <img src="../assets/images/33d243824a318f1819630542733a21eb.jpeg" alt="">
                        </nuxt-link>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                         <nuxt-link :to="{ path: '/' }">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </nuxt-link>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container class="aside">
                <el-aside :width="tabWidth+'px'">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>个人中心</span>
                            </template>
                            <el-menu-item-group>
                                <nuxt-link :to="{name:'rbac'}">
                                    <el-menu-item index="1-1">选项1</el-menu-item>
                                </nuxt-link>
                                <nuxt-link :to="{name:'main'}">
                                    <el-menu-item index="1-2">选项2</el-menu-item>
                                </nuxt-link>
                                <!-- <nuxt-link :to="{name:'main',params:{newsId:'3306'}}">
                                    <el-menu-item index="1-2">选项2</el-menu-item>
                                </nuxt-link> -->
                            </el-menu-item-group>
                        </el-submenu>
                        
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span slot="title">用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <nuxt-link :to="{name:'user'}">
                                    <el-menu-item index="2-1">用户管理</el-menu-item>
                                </nuxt-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-document"></i>
                                <span slot="title">权限管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">选项1</el-menu-item>
                                <el-menu-item index="3-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
        
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <nuxt-link :to="{name:'node'}">
                                    <el-menu-item index="4-1">节点管理</el-menu-item>
                                </nuxt-link>
                                <nuxt-link :to="{name:'user'}">
                                    <el-menu-item index="4-2">权限管理</el-menu-item>
                                </nuxt-link>
                                <nuxt-link :to="{name:'role'}">
                                    <el-menu-item index="4-3">角色管理</el-menu-item>
                                </nuxt-link>
                                <nuxt-link :to="{name:'site'}">
                                    <el-menu-item index="4-4">站点管理</el-menu-item>
                                </nuxt-link>
                            </el-menu-item-group>
                        </el-submenu>

                        <nuxt-link :to="{name:'change'}">
                            <el-menu-item index="5">
                                <i class="el-icon-info"></i>
                                <span slot="title">变更日志</span>
                            </el-menu-item>
                        </nuxt-link>
                    </el-menu>
                </el-aside>
                <el-main>
                    <nuxt/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
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
                margin-top: -16px;
            }
            .el-dropdown{
                cursor: pointer;
                float: right;
            }
            .el-dropdown-link{
                img{
                    $imgMargin: (($header-height - 45)/2);
                    display:inline-block;
                    width:45px;
                    height: 45px;
                    border-radius: 25px;
                    margin-top: $imgMargin;
                    margin-right: 30px;
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

<script>
  export default {
    name: 'index',
    // created:function(){
    //   this.$router.push('/addtitle'); // 页面加载时跳转
    // },
    methods:{
        loadData(){
            axios.get(urls.api, { params: this.param })
            .then(res => {
            //请求成功回调
            //   this.$router.push('/main'); // 页面加载时跳转
            })
            .catch(error => {
            //请求失败
                
            });
        }
    },
    data() {
        return {
            isCollapse: false,
            tabWidth: 200,
            test1: 1,
            intelval: null,
        };
    }
  }
</script>

