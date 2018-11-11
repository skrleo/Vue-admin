<template>
  <nuxt/>
</template>

<script>
  
  export default {
    name: 'index',
    // created:function(){
    //   this.$router.push('/addtitle'); // 页面加载时跳转
    // },
    data () {
      return {
        loading: false,
        route: '/Default',
      }
    }
  }
</script>