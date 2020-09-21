<template>
  <div class="login_box">
    <div class="header">
      <!--      <img src="@/images/logo.png" alt />-->
      <p class="title">业务管理系统</p>
    </div>
    <div class="login_content" >
      <div class="main_box" >
        <div class="login_headerimg">
          <img
            class="headerimg"
            id="logoid"
            src="../../images/login.png"
            alt=""
          />
        </div>
        <div class="login_header">
          <!-- <img class="imgs" src="../../images/login_img.png" alt=""> -->
          业务管理系统
        </div>
        <el-form ref="form" :model="formLogin">
          <el-form-item>
            <div class="user-accounts phone">
              <i class="el-icon-user-solid"></i>
              <el-input
                type="text"
                placeholder="请输入邮箱账号"
                v-model="formLogin.email"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item v-if="ok">
            <div class="user-accounts phone">
              <i class="el-icon-user-solid"></i>
              <el-input
                type="text"
                placeholder="请输入昵称"
                v-model="formLogin.nick"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="user-accounts phone">
              <i class="el-icon-lock"></i>
              <el-input type="password" placeholder="请输入密码" v-model="formLogin.pwd" auto-complete="new-password" ></el-input>
            </div>
          </el-form-item>
          <el-form-item v-if="ok">
            <div class="user-accounts phone" >
              <i class="el-icon-circle-check"></i>
              <el-input type="password" placeholder="请再次输入密码" v-model="formLogin.cfpassword" auto-complete="new-password" ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="" v-if="ok==false">
            <p
              class="forget_pass"
              style="cursor: pointer;"
              @click="toForgotView"
            >
              忘记密码？
            </p>
            <p
            class="forget_pass"
            style="cursor: pointer;"
            @click="toaddView"
          >
            立即注册
          </p>
          </el-form-item>
          <el-form-item label="">
            <el-button v-if='ok'class="login" style="margin: 0.125rem auto;" round @click="login">注册</el-button> 
            <el-button v-else class="login" round @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      ok:false,
      redirect: "",
      ctoken: "",
      picCodeSrc: "",
      // 登录表单对象
      formLogin: {
        email: "",
        pwd: "",
        source: "PC",
        nick:"",
        cfpassword:"",
      },
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false // 显示错误提示
      }
    };
  },
  created() {
    // this.$utils.removeloc('token')
    // this.$utils.removeloc('userId')
    // this.$utils.removeloc('nickname')
    // this.redirect = this.$route.query.redirect
  },
  mounted() {},
  methods: {
    login() {
      let self = this;
      let href="/gpauth/partner/merchant/users/login"
      if (self.formLogin.email === "") {
        self.$message.error("请输入账号");
        return false;
      }
      if (self.formLogin.pwd === "") {
        self.$message.error("请输入密码");
        return false;
      }
      if(self.ok){
      if (self.formLogin.pwd != self.formLogin.cfpassword) {
        self.$message.error("两次密码输入不一致！");
        return false;
      }
      href="/gpauth/partner/merchant/users/add"
    }
      console.log(self.formLogin);
      // 调用后端登陆接口
      self.$api.post(
        // 'login',
        // self.formLogin,
        href,
        self.formLogin,
        r => {
          // 本地存储用户信息
          self.$utils.setloc("token", r.result.access_token);
         
          if (self.redirect && self.redirect.indexOf("/login") === -1) {
            self.$router.push({ path: self.redirect });
          } else {
            if (r.code == 1000) {
              if(self.ok){
                 // 资政信息未认证0 已认证1
            self.$utils.setloc("group_id", 0);
                this.$message({
                message: "注册成功",
                type: "success"
              });
              }else{
                   // 资政信息未认证0 已认证1 后台获取
                this.$message({
                message: "登陆成功",
                type: "success"
              });
              }
              
              self.$router.push({ path: "/basic-setup" });
            } else {
              self.$message.error(r.result);
            }
          }
        }
        
      );
    },
    
    toForgotView() {
      let self = this;
      self.$router.push({
        path: "/forgot-password"
      });
    },
    toaddView(){
      let self = this;
      self.ok=true;
    }
  }
};
</script>

<style  lang="less" scoped>
@import "./login.less";
</style>
<style lang="less" scoped>
@import "../forgot-password/forgot-password.less";
</style>
