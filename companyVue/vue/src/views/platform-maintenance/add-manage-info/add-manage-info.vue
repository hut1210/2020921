

<template>
  <!-- 新增管理员信息 -->
  <div class="add-manage-info sharing">
    <div class="return">
      <div class="return-box" @click="goBack">返回列表</div>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="用户名称：" prop="username">
              <el-input v-model="ruleForm.username" placeholder="输入用户名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="ruleForm.password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item label="电话：" prop="mobile">
              <el-input v-model="ruleForm.mobile" placeholder="输入电话"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="radio">
              <el-radio-group v-model="ruleForm.status" class="radio-box">
                <el-radio :label="0">禁用</el-radio>
                <el-radio :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
              <el-input
                type="textarea"
                class="textarea"
                v-model="ruleForm.remarks"
                placeholder="输入备注"
              ></el-input>
            </el-form-item>

            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      type: this.$route.params.type,
      companyData: [],
      departmentData: [],
      optionsSelect: [],
      ruleForm: {
        username: "", //用户名称：
        password: "", //密码：
        company_id: 0, //公司
        department_id: 0, //部门
        position: "管理员", //职位：
        mobile: "", //电话：
        status: 1, //选择
        remarks: "", //备注：
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: {
          required: true,
          message: "请输入用户密码",
          trigger: "blur",
        },
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
    const checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入正确的手机号"));
    };
  },
  created() {
    // 1添加
    //2修改
    if (this.type == "2") {
      this.modify();
    }
    this.companyList();
    // this.departmentList();
  },
  methods: {
    //联动部门
    handleCompany(val) {
      this.departmentList(val);
      this.ruleForm.department_id = "";
    },
    //获取公司列表
    companyList() {
      let self = this;
      self.$api.post(
        "companytype/",
        {},
        (r) => {
          this.companyData = r.data;
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
    //获取部门列表
    departmentList(id) {
      let self = this;
      self.$api.get(
        "orglist/",
        { company_id: id },
        (r) => {
          this.departmentData = r.data.list;
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      let self = this;
      var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!myreg.test(self.ruleForm.mobile)) {
        self.$message.error("请输入正确的联系方式");
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type == "1") {
            this.addManage();
          } else if (this.type == "2") {
            this.updataManage();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增管理员信息
    addManage() {
      let self = this;
      self.$api.post(
        "manage",
        self.ruleForm,
        // {
        //   username: self.ruleForm.username, //用户名称
        //   password: self.ruleForm.passwords, //密码
        //   mobile: self.ruleForm.mobile, //手机号
        //   position: self.ruleForm.position, //职位
        //   company_id: "1", //所属公司ID
        //   department_id: "1", //所属部门ID
        //   remarks: self.ruleForm.note //备注
        // },
        (r) => {
          this.$message({
            message: r.message,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({
              name: "manage-info-list",
            });
          }, 500);
        },
        (e) => {
          self.$message.error(e.data);
        }
      );
    },
    //修改管理员信息保存
    updataManage() {
      let self = this;
      self.$api.put(
        "manage/" + self.$route.params.id,
        self.ruleForm,
        (r) => {
          this.$message({
            message: r.message,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({
              name: "manage-info-list",
            });
          }, 500);
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
    // 修改管理员信息展示
    modify() {
      let self = this;
      // 调用后端登陆接口
      self.$api.get(
        "manage/" + self.$route.params.id,
        { id: self.$route.params.id },
        (r) => {
          this.ruleForm = r.data;
          this.ruleForm.password = "";
          this.departmentList(r.data.company_id);
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
  },
  mounted: function () {},
};
</script>
<style lang="less" src="../sharing.less"></style>
<style lang="less" src="./add-manage-info.less"></style>
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
