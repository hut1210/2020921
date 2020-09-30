<template>
  <div class="login_box">
    <div class="header">
      <!-- <img src="@/images/companylogo.jpg" alt /> -->
      <p class="title">商户系统</p>
    </div>
    <div class="login_content">
      <div class="main_box">
        <div class="login_header">
          <img class="imgs" src="../../images/companylogo.jpg" alt />
        </div>
        <el-form ref="form" :model="formLogin">
          <el-form-item>
            <!-- <el-input type="text" class="phone" prefix-icon="el-icon-mobile-phone" placeholder="请输入帐号"></el-input> -->
            <div class="user-accounts phone">
              <i class="el-icon-mobile-phone"></i>
              <el-input type="text" placeholder="请输入帐号" v-model="formLogin.phone"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="verification-code phone">
              <i class="fa fa-shield"></i>
              <div class="input-box">
                <el-input type="text" placeholder="请输入验证码" v-model="formLogin.verify_code" autocomplete="off"></el-input>
              </div>
              <div v-show="show" class="count" @click="getCode" >获取验证码</div>
              <div v-show="!show" class="count">{{count}} s</div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="user-accounts phone">
              <i class="el-icon-lock"></i>
              <el-input type="password" placeholder="请输入密码" v-model="formLogin.password" auto-complete="new-password" ></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="user-accounts phone">
              <i class="el-icon-circle-check"></i>
              <el-input type="password" placeholder="请再次输入密码" v-model="formLogin.repassword" auto-complete="new-password" ></el-input>
            </div>
          <!-- </el-form-item>
          <el-form-item>
            <p class="forget_pass" @click="toLogin">去登陆</p>
          </el-form-item>
          <el-form-item> -->
             <el-button class="forget_btn" round @click="forget">提交</el-button>
          </el-form-item>
        </el-form>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: true,
      count: '',
      timer: null,
      formLogin:{
        phone: '',
        verify_code: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    //   60秒倒计时
    getCode () {
      let self = this
      if (self.formLogin.phone === '') {
        self.$message.error('请输入手机号')
        return false
      }
      let data = {}
      data.phone = self.formLogin.phone
      data.type = 'authentication'
      self.$api.post(
        'send_sms',
        data,
        r => {
          // 本地存储用户信息
          self.$message({
            type: 'success',
            message: '获取成功'
          })
           const TIME_COUNT = 60
          if (!self.timer) {
            self.count = TIME_COUNT
            self.show = false
            self.timer = setInterval(() => {
              if (self.count > 0 && self.count <= TIME_COUNT) {
                self.count--
              } else {
                self.show = true
                clearInterval(self.timer)
                self.timer = null
              }
            }, 1000)
          }
        },
        e => {
          self.$message.error(e.msg)
        }
      )
     
    },
    toLogin(){
      this.$router.push({ path: '/login' })
    },
    forget() {
      let self = this
      if (self.formLogin.phone === '') {
        self.$message.error('请输入手机号')
        return false
      }
      if (self.formLogin.verify_code === '') {
        self.$message.error('请输入验证码')
        return false
      }
      if (self.formLogin.password === '') {
        self.$message.error('请输入密码')
        return false
      }
      if (self.formLogin.repassword === '') {
        self.$message.error('再次输入密码不能为空')
        return false
      }
      self.$api.post(
        'forget',
        self.formLogin,
        r => {
          self.$router.push({ path: '/login' })
        },
        e => {
          self.$message.error(e.msg)
        }
      )
    }
  }
}
</script>
<style>
.el-input--prefix .el-input__inner {
  border-radius: 20px;
}
</style>
<style scoped >
@import url(./forgot-password.less);
</style>
