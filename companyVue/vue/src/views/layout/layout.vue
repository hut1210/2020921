<template>
  <div class="container">
    <el-container style="height: 100%">
      <!--菜单栏-->
      <aside-menu></aside-menu>
      <el-container>
        <!--头部-->
        <el-header class="elheader">
          <top-header></top-header>
        </el-header>
        <!--主内容-->
        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
        <!--底部-->
        <el-footer height="0px"></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from './asideMenu'
import topHeader from './header'
export default {
  name: 'layout',
  components: {
    asideMenu,
    topHeader
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>
  .el-main{
    background-color: #f3f2f2;
  }
  .elheader{
    height:60px !important
  }
</style>
