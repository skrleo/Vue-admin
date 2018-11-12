<template>
    <div>
        <el-container class="main">
            <el-header class="main-header">
                <div class="logo">
                    <h3>后台管理系统</h3>
                </div>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <img src="../assets/images/33d243824a318f1819630542733a21eb.jpeg" alt="">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
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
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                        <i class="el-icon-info"></i>
                        <span slot="title">变更日志</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <nuxt/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
    *{
        padding: 0;
        margin: 0;
    }

</style>
<style scoped lang="scss">
    $header-height:60px;
    $background-color:rgb(253, 253, 253);
    $color: #dddddd;
    .main{
        height: 100vh;
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
                margin-top: 12px;
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

