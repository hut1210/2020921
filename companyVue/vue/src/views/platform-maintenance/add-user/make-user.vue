

<template>
  <!-- 认证信息 -->
  <div class="add-manage-info sharing">
    <!-- <div class="return">
      <div class="return-box" @click="goBack">返回列表</div>
    </div> -->
    <!-- tab标签 -->

    <div class="skillby-tab">
      <!-- 认证中查看信息 -->
      <div class="renzheng-look">
      <div  class="search_box">
        <p class="attestation-title">商户配置参数:</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="商户号：" prop="username">
              <el-input v-model="ruleForm.username" placeholder="商户号" readonly clearable></el-input>
            </el-form-item>
            <el-form-item label="应用名称：" prop="realname">
              <el-input v-model="ruleForm.realname" placeholder="输入真实姓名" clearable readonly></el-input>
            </el-form-item>
            <el-form-item label="APP_ID：" prop="username">
              <el-input v-model="ruleForm.username" placeholder="APP_ID" clearable readonly></el-input>
            </el-form-item>
            <el-form-item label="APP_Secret：" prop="realname">
              <el-input v-model="ruleForm.realname" placeholder="APP_Secret" clearable readonly></el-input>
            </el-form-item>
            <el-form-item label="使用说明：" prop="remarks">
              <el-input
                type="textarea"
                class="textarea"
                v-model="ruleForm.remarks"
                placeholder="使用说明"
              ></el-input>
            </el-form-item>
        <el-button type="primary" @click="resetclick">返回</el-button>
          </div>
        </el-form>
        
      </div>
    </div>
     
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      flag:false,
      groupState:false,
      renzhengtype: this.$route.params.type ?  this.$route.params.type : '1',
      groupData:[],
      tagsData:[],
      companyData:[],
      departmentData:[],
      optionsSelect: [],
      ruleForm: {
        username: "", //用户名称：
        realname: "", //真实姓名
        password: "", //密码：
        group: "", //用户组
        service: "",  //服务范围
        service_num: "",  //被选择数
        check_num: "",  //平均检测天数
        company_id: "", //公司
        department_id: "", //部门
        position: "", //职位：
        mobile: "", //电话：
        status: 1, //选择
        istop: 0, //选择
        remarks: "" //备注：
      },
      rules: {
        // username: [
        //   { required: true, message: "请输入用户名称", trigger: "blur" },
        //   { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        // ],
        // realname:{required: true, message: "请输入真实姓名", trigger: "blur" },
        // password:{required: true, message: "请输入用户密码", trigger: "blur" },
        // group:{required: true, message: "请选择用户组", trigger: "blur" },
        // company_id:{required: true, message: "请选择所属公司", trigger: "blur" },
        // department_id:{required: true, message: "请选择所属部门", trigger: "blur" },
        // position:{required: true, message: "请输入职位", trigger: "blur" },
        // mobile:[
        //   {validator: checkPhone, trigger: 'blur'}
        // ],
        // service_num:{type:"number",message: "被选择数必须为数字" },
        // check_num:{type:"number",message: "平均检测天数必须为数字"},
      }
    };
  },
  created() {
  },
  methods: {
    //联动用户组
    handleGroup(v){
      if(v == 2){
        this.groupState = true;
      }else{
        this.groupState = false;
      }
    },
    //联动部门
    handleCompany(val){
      this.departmentList(val)
      this.ruleForm.department_id = ''
    },
    //获取用户组列表
    groupList(){
      let self = this;
      self.$api.get(
        'group/',
        {},
        r => {
          this.groupData = r.data.filter(v => v.name != '超级管理员')
          // this.groupData = r.data
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },

    //获取用户标签
    tagList(){
      let self = this;
      self.$api.get(
        'tags/',
        {},
        r => {
          this.tagsData = r.data
          // this.groupData = r.data
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },
    //获取公司列表
    companyList(){
      let self = this;
      self.$api.post(
        'companytype/',
        {},
        r => {
          this.companyData = r.data
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },
    //获取部门列表
    departmentList(id){
      let self = this;
      self.$api.get(
        'orglist/',
        {company_id:id},
        r => {
          // this.departmentData = r.data.list
          for (let i=0;i<r.data.list.length;i++){
              self.departmentData.push({'id':r.data.list[i].id,'name':r.data.list[i].lefthtml + r.data.list[i].name})
          }
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      // let self = this
      // var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      // if (!myreg.test(self.ruleForm.mobile)) {
      //    self.$message.error('请输入正确的联系方式')
      //     return false
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.addManage();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增用户信息
    addManage() {
      // 成功
      let self = this;
      self.$router.push({
        name: "basic-setup",
        params:{
          type:'1'
        }

      });
      // 失败
      // self.$router.push({
      //   name: "basic-setup",
      //   params:{
      //     type:'3'
      //   }

      // });
      // let self = this;
      // self.$api.post(
      //   "user",
      //   self.ruleForm,
      //   r => {
      //     this.$message({
      //       message: r.message,
      //       type: "success"
      //     });
      //     setTimeout(() => {
      //       this.$router.push({
      //         name: "user-list"
      //       });
      //     }, 500);
      //   },
      //   e => {
      //     self.$message.error(e.data);
      //   }
      // );

    },
    //修改用户信息保存
    updataManage(){
      let self = this;
      self.$api.put(
        'user/'+self.$route.params.id,
        self.ruleForm,
        r => {
          this.$message({
            message: r.message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({
              name: "user-list"
            });
          }, 500);
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },
    // 修改用户信息展示
    modify() {
      let self = this;
      // 调用后端登陆接口
      self.$api.get(
        "user/" + self.$route.params.id,
        { id: self.$route.params.id },
        r => {
          if(r.data.group == 2){
            this.groupState = true;
          }
          this.ruleForm = r.data;
          this.ruleForm.password = ''
          this.departmentList(r.data.company_id)
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },
    //取消
    resetclick(){
      let self = this;
      self.$router.push({
        path: "/basic-setup",
      });

    }
  },
  mounted: function() {}
};
</script>
<style lang="less" src="../sharing.less"></style>
<style lang="less" src="./add-user.less"></style>
<style>
.add-manage-info .radio-box {
  line-height: 4.375rem!important;
  width: 32.125rem;
  height: 70px;
  text-align: left;
}
.add-manage-info .el-radio, .el-radio__input{
  line-height: 4.375rem;
}
.radio-box .el-radio__input.is-checked + .el-radio__label {
  color: #66ce90;
}
.radio-box .el-radio__input.is-checked .el-radio__inner {
  background: #66ce90;
  border-color: #66ce90;
}
</style>
