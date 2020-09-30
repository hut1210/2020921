<template>
  <div class="topHeader">
    <div class="dropdown">
      <div class="userMessage">
        <p style="cursor: pointer;" @click="toModifyPassword">欢迎您，{{userNickname}}</p>
        <span style="color: #ddd;font-size: 1rem;" @click="logout">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topHeader',
  data () {
    return {
      showFlag: false,
      userNickname:this.$utils.getloc('userNickname'),
      formLabelWidth: '100px',
      changePwdDialog: false,
      userName: '刘立峰',
      pwdform: {
        oldpwd: '',
        newpwd: '',
        agpwd: ''
      }
    }
  },
  created () {
    // this.getJobmess();
  },
  methods: {
    logout(){
      let self = this
      self.$utils.removeloc('token')
      self.$utils.removeloc('userNickname')
      self.$utils.removeloc("group_id");
      self.$router.push({ path: '/login' })
    },
    // 调用后端获取商户信息接口
   
    toModifyPassword(){
      this.$router.push({ path: '/basic-setup' })
    },
    
    
  }
}
</script>

<style scoped>
.setDropdown,.el-popper[x-placement^=bottom] {
  margin-top: 0px;

}
</style>
