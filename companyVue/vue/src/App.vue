<template>
  <div id="app">
    <!-- 聊天弹窗 -->
    <chat :shows="this.$store.state.showFlag" :userList="this.$store.state.userList" :activeIndex = "this.$store.state.activeIndex" :chatLeftData = "this.$store.state.chatLeftData"></chat>
    <router-view/>
  </div>
</template>

<script>
import chat from "@/components/chat"
export default {
  data(){
    return{
      
    }
  },
  name: 'App',
  components:{
      chat,
  },

}
</script>

<style>
@import './style/common.css';
</style>
