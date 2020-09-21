<template>
  <div class="el-aside" :class="{ 'el-aside-collapse': isCollapse }">
    <div class="proTitle">
      <!--      <img src="../../images/logo.png" /> -->
      业务管理系统
    </div>

    <div class="sidebar">
      <div class="companylogo">
        <img class="imgs" src="../../images/companylogo.jpg" alt="" />
      </div>
      <el-menu
        class="sidebar-el-menu"
        :collapse="isCollapse"
        :default-active="$route.path"
        background-color="#ffffff"
        text-color="#CCCCCC"
        active-text-color="#66CE90FF"
        unique-opened
        router
      >
        <!-- <el-menu-item index="basic-setup" v-if="$utils.getloc('group_id') == 1"
          ><i class="el-icon-s-tools"></i>基本设置</el-menu-item
        > -->
        <!-- 资质信息已认证group_id==1,未认证0 -->
        <el-submenu index="1" v-if='$utils.getloc("group_id") == 0'>
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>商户信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="basic-setup">商户资质信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="1" v-if='$utils.getloc("group_id") == 1'>
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>商户信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="add-user">商户资质信息</el-menu-item>
            <el-menu-item index="make-user">商户配置参数</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
       
        <el-submenu index="2" v-if='$utils.getloc("group_id") == 1'>
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>交易管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="project-list">订单信息查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if='$utils.getloc("group_id") == 1'>
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>资金管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user-list">提现记录</el-menu-item>
            <el-menu-item index="user-group-list">充值记录</el-menu-item>
            <el-menu-item index="manage-info-list"
              >代付记录</el-menu-item
            >
            <!-- 无页面 -->
            <el-menu-item index="manage-info-list"
              >资金流水记录</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",

  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  },
  data() {
    return {
      showFlag: false,

      menus: [
        // {
        //   id: 1,
        //   parentId: 0,
        //   permissionName: '分类管理',
        //   permissionValue: null,
        //   permissionId: 'X0K27xEi',
        //   createTime: '2018-11-16T04:58:17.000+0000',
        //   updateTime: '2018-11-16T04:58:19.000+0000',
        //   isDelete: 0,
        //   permissionIcon: null,
        //   orderNumber: 1,
        //   isShow: 0,
        //   parentName: null,
        //   subMenus: [
        //     {
        //       id: 2,
        //       parentId: 1,
        //       permissionName: '分类管理子1',
        //       permissionValue: '/system/role',
        //       createTime: '2018-11-16T05:00:42.000+0000',
        //       updateTime: '2018-11-16T05:00:45.000+0000',
        //       isDelete: 0,
        //       permissionIcon: null,
        //       orderNumber: 1,
        //       isShow: 0,
        //       parentName: null,
        //       subMenus: null
        //     }
        //   ]
        // }
      ]
    };
  },
  created() {
    this.showFlag = this.$store.state.showFlag;
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.companylogo {
  width: 7.375rem;
  padding: 26px;
}
.companylogo img {
  display: block;
  width: 100%;
}
</style>
