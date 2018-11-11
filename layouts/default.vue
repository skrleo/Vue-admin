<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24"><top></top></el-col>
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <div class="left-nav">
        <left></left>
      </div>
      <!--右侧内容区-->
      <div class="right-nav">
        <!--动态路由的设置-->
        <nuxt/>
        <!-- <nuxt-link to="addtitle">首 页</nuxt-link> -->
      </div>
    </el-col>
  </el-row>
</template>

<style>
  .left-nav{
    width: 200px;
    float: left;
  }
  .right-nav{
    float: left;
    overflow: hidden;
    width:calc(100% - 200px);
  }
</style>

<script>
  import TopNav from "../components/Nav/topNav.vue"
  import LeftNav from "../components/Nav/leftNav.vue"
  import Default from "./default.vue"

  export default {
    name: 'index',
    // created:function(){
    //   this.$router.push('/addtitle'); // 页面加载时跳转
    // },
    components: {
      default:Default,
      top: TopNav,
      left: LeftNav
    },
    data () {
      return {
        loading: false,
        route: '/Default',
      }
    }
  }
</script>