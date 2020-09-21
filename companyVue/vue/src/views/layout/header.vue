<template>
  <div class="topHeader">
    <div class="dropdown">
      <div class="userMessage">
        <p style="cursor: pointer;" @click="toModifyPassword">欢迎您，{{userNickname}}</p>
        <span @click="logout">注销</span>
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
      userNickname:"", //this.$utils.getloc('nickname'),
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
    this.getJobmess();
  },
  methods: {
    logout(){
      let self = this
      self.$utils.removeloc('token')
      self.$router.push({ path: '/login' })
    },
    // 调用后端获取商户信息接口
    getJobmess() {
      debugger
      let self = this;
      // 调用后端获取商户信息接口
      self.$api.get(
      "gpmanage/partner/merchant/info",
      {},
        r => {
          self.userNickname=r.result.merchanDetail.companyName;
          self.$utils.setloc("userNickname", r.result.merchanDetail.companyName);
          if(r.result.merchanDetail.status==1){
            self.$utils.setloc("group_id", 1);
          }else if(r.result.merchanDetail.status==0 || r.result.merchanDetail.status==2){
            self.$utils.setloc("group_id", 2);
          }else{
            self.$utils.setloc("group_id", 0);
          }
          
        }
        
      );
    },
    toModifyPassword(){
      this.$router.push({ path: '/modify-password' })
    },
    
    
  }
}
</script>

<style scoped>
.setDropdown,.el-popper[x-placement^=bottom] {
  margin-top: 0px;

}
</style>
