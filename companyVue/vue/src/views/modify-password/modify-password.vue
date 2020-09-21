<template>
  <div class="content">
      <div class="modify-form-box">
        <el-form  :model="formAll" > 
            <el-form-item >
                <div class="modify-form-cont">
                    <p class="modify-form-name">姓名:</p>
                    <div class="modify-form-input"><el-input type='text' v-model="formAll.username"></el-input></div>
                    <p class="modify-form-must">*</p>
                </div>
                
            </el-form-item>
            <el-form-item >
                <div class="modify-form-cont">
                    <p class="modify-form-name">登录手机号:</p>
                    <div class="modify-form-input">  <el-input type='text' v-model="formAll.mobile"></el-input></div>
                    <p class="modify-form-must">*</p>
                </div>
            </el-form-item>
            <el-form-item >
                <div class="modify-form-cont">
                    <p class="modify-form-name">旧密码:</p>
                    <div class="modify-form-input"> <el-input type='text' v-model="formAll.password_old" ></el-input></div>
                    <p class="modify-form-must"></p>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="modify-form-cont">
                    <p class="modify-form-name">新密码:</p>
                    <div class="modify-form-input"><el-input type='text' v-model="formAll.password"></el-input></div>
                    <p class="modify-form-title ">如果不修改留空即可</p>
                </div>
            </el-form-item>
            <el-form-item>
                <div class="btn-box">
                    <el-button type="primary" class="preservation-btn" @click="preservationClick">保存</el-button>
                     <el-button type="info" class="cancel-btn" @click="cancel">返回</el-button>
                </div>

            </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        formAll:{
            addtime: '',
            admin_hits: '',
            check_num: '',
            company_id: '',
            department_id: '',
            group: '',
            headimg: '',
            id: '',
            im_password: '',
            im_username: '',
            is_admin: '',
            is_lock: '',
            last_ip: '',
            last_time: '',
            mobile: '',
            password: '',
            position: '',
            realname: '',
            remarks: '',
            salt: '',
            service: '',
            service_num: '',
            status: '',
            username: '',
            password_old: ''
        },
        
    }
  },
  created () {
      this.getUserinfo()
  },
  methods: {
    getUserinfo(){
        let self = this
        if(self.$utils.getloc('token')){
            self.$api.get(
            '/user/'+self.$utils.getloc('userId'),
            {
                token: self.$utils.getloc('token'),
                id: self.$utils.getloc('userId')
            },
            r => {
                let resultData = r.data
                let form = self.formAll
                Object.keys(form).forEach(item => {
                    form[item] = resultData[item]
                })
                self.formAll.password = ''
            },
            e => {
                self.$message.error(e.msg)
            })
        } else {
            self.$router.push({ path: '/login' })
        }
        
    },
    preservationClick(){
        let self = this
        if (self.formAll.username == '') {
            self.$message.error('请输入姓名')
            return false
        }
        if (self.formAll.username == '') {
            self.$message.error('请输入姓名')
            return false
        }
        self.$api.put(
        '/user/'+self.$utils.getloc('userId'),
        self.formAll,
        r => {
            self.$message({
                type: 'success',
                message: '修改成功'
            });
            setTimeout(() => {
                self.$router.go(-1)
            }, 1000);
        },
        e => {
            self.$message.error(e.msg)
        })
    },
    cancel(){
        this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.content{
    width:1639px;
    height:calc(100% - 10px);
    background:rgba(255,255,255,1);
    border:1px solid rgba(240,242,241,1);
    box-shadow:0px 0px 18px 0px rgba(0, 0, 0, 0.15);
    border-radius:5px;
    margin:0 auto
}
.modify-form-box{
    width:800px;
    margin:220px auto 0;
    overflow: hidden;
}
.modify-form-cont{
    display: flex;
    align-items: center;
    margin-bottom:20px;
}
.modify-form-name{
    width:180px;
    text-align:right;
    font-size:20px;
    font-weight: 400;
    color:rgba(136,136,136,1);
    margin-right:14px;
    line-height: 50px;
}
.modify-form-input{
    width:391px;
    height:50px;
    background:rgba(255,255,255,1);
    border-radius:5px;
}
.modify-form-title{
    font-size:14px;
    font-weight:400;
    color:rgba(136,136,136,1);
    margin-left:11px;
}
.modify-form-must{
    font-size:30px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,206,144,1);
    margin-left:11px;
}
.btn-box{
    display: flex;
    justify-content: center;
    margin-top:100px;
}
.preservation-btn{
    width:241px;
    height:67px;
    background: rgba(102, 206, 144, 1);
    border-radius: 5px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    border:1px solid rgba(102, 206, 144, 1);
    margin-right:110px;
}
.cancel-btn{
    width:241px;
    height:67px;
    background:rgba(237,235,235,1);
    border-radius:5px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    border:1px solid rgba(237,235,235,1);
}
</style>
