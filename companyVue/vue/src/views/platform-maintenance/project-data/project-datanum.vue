//月份总数据
<template>
  <div class="project-datanum">
    <div class="pro-search">
      <el-form ref="plan1" :model="plan1">
        <el-form-item label="年月：">
          <el-select v-model="plan1.month" placeholder="请选择">
            <el-option label="请选择"></el-option>
            <el-option v-for="k in 12" :key="k" :label="k" :value="k"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 计划申请 -->
    <el-form :inline="true" ref="data">
      <div class="companyquex">
        <div>
          <span>申请计划：</span>
          <a href="logo.jpg" download="网站log下载">下载</a> 
          <span></span>
        </div>

        <el-form-item label="申请计划：" prop="plan_apply">
          <el-input v-model="data.apply_test_num" placeholder="请输入计划项目数量"></el-input>
        </el-form-item>
        <el-form-item label="计划内项目数量：" prop="apply_in">
          <el-input v-model="data.plan_in" placeholder="请输入计划内项目数量"></el-input>
        </el-form-item>
        <el-form-item label="计划外项目数量：" prop="apply_in">
          <el-input v-model="data.plan_out" placeholder="请输入计划外项目数量"></el-input>
        </el-form-item>
        <el-form-item label="实际项目数量：" prop="plan_apply">
          <el-input v-model="data.fact_apply_num" placeholder="请输入实际项目数量"></el-input>
        </el-form-item>
      </div>


      <!-- <div class="company out_com"> -->
      <div class="companyquex">
        <div>
          <span>出厂非功能测试：</span>
          <span></span>
        </div>

        <el-form-item label="开展项目：" prop="plan_apply">
          <el-input v-model="data.start_num" placeholder="请输入开展项目数量"></el-input>
        </el-form-item>
        <el-form-item label="完成测试项目：" prop="apply_in"style="margin-left:0.81rem" >
          <el-input v-model="data.start_num_end" placeholder="请输入完成项目数量"></el-input>
        </el-form-item>
        <el-form-item label="二轮通过率：" prop="apply_in" style="margin-left: 2.25rem;">
          <el-input v-model="data.two_rate" placeholder="请输入非功能二轮通过率" ></el-input>
        </el-form-item>
        <el-form-item label="一轮通过数量：" prop="plan_apply">
          <el-input v-model="data.start_one" placeholder="请输入一轮通过数量"></el-input>
        </el-form-item>
        <el-form-item label="二轮通过：" prop="apply_in" style="margin-right: 4.125rem;">
          <el-input v-model="data.start_two" placeholder="请输入二轮通过数量"></el-input>
        </el-form-item>
        <el-form-item label="三轮通过：" prop="apply_out">
          <el-input v-model="data.start_three" placeholder="请输入三轮通过数量"></el-input>
        </el-form-item>
        <el-form-item
            label
            prop="data.group_rate_state"
            style="margin-left: 10.43rem;margin-top: 1.50rem;"
          >
            <el-radio-group v-model="data.group_rate_state">
              <!--v-model="form.resource" -->
              <el-radio label="1">达标</el-radio>
              <el-radio label="0">未达标</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

      <div class="companyquex">
        <div>
          <span>数据缺陷：</span>
          <span></span>
        </div>
        <el-form-item label="总缺陷数：" prop="data.plan_apply" style="margin-right: 1rem;">
          <el-input v-model="data.defect_num" placeholder="请输入缺陷总数量"></el-input>
        </el-form-item>
        <el-form-item label="A类：" prop="apply_in" style="margin-left: 3.43rem;">
          <el-input v-model="data.defect_a" placeholder="请输入缺陷A类数量"></el-input>
        </el-form-item>
        <el-form-item label="B类：" prop="apply_in">
          <el-input v-model="data.defect_b" placeholder="请输入缺陷B类数量"></el-input>
        </el-form-item>
        <el-form-item label="C类：" prop="apply_in">
          <el-input v-model="data.defect_c" placeholder="请输入缺陷C类数量"></el-input>
        </el-form-item>
        <el-form-item label="D类：" prop="apply_in">
          <el-input v-model="data.defect_d" placeholder="请输入缺陷D类数量"></el-input>
        </el-form-item>
        <el-form-item label="平均缺陷数：" prop="plan_apply" style=" margin-left: -1rem;margin-right: 2.25rem;">
          <el-input v-model="data.defect_rate" placeholder="请输入平均缺陷数"></el-input>
        </el-form-item>
        <el-form-item label="同比上月：" prop="apply_in" style="margin-right: 174px;">
          <el-input v-model="data.defect_rate_year" placeholder="请输入同比上月(下降前面加-)"></el-input>
        </el-form-item>
        <el-form-item
          label
          prop="data.defect_group_rate_state"
          style="margin-left: -82px;margin-top: 23px;"
        >
          <el-radio-group v-model="data.defect_group_rate_state">
            <!--v-model="form.resource" -->
            <el-radio label="1">达标</el-radio>
            <el-radio label="0">未达标</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="companyjiaoyan">
        <div>
          <span>安全出厂测试：</span>
          <span></span>
        </div>
        <el-form-item label="开展项目：" prop="data.plan_apply" style="margin-right: 1rem;">
          <el-input v-model="data.start_num_safe" placeholder="请输入开展项目数量"></el-input>
        </el-form-item>
        <el-form-item label="完成项目：" prop="apply_in" style="margin-left: 2.43rem;margin-right: 1.37rem;">
          <el-input v-model="data.start_num_end_safe" placeholder="请输入完成项目数量"></el-input>
        </el-form-item>
        <el-form-item label="安全测试二轮通过率：" prop="apply_in" style="margin-right: 1.75rem">
          <el-input v-model="data.two_rate_safe" placeholder="请输入安全测试二轮通过率"></el-input>
        </el-form-item>
        <el-form-item label="一轮通过：" prop="apply_in">
          <el-input v-model="data.start_one_safe" placeholder="请输入一轮通过数量"></el-input>
        </el-form-item>
        <el-form-item label="二轮通过：" prop="apply_in">
          <el-input v-model="data.start_two_safe" placeholder="请输入二轮通过数量"></el-input>
        </el-form-item>
        <el-form-item label prop="data.group_rate_safe_state" style="margin-left: 7.625rem;margin-right: 7.25rem;margin-top:1.62rem">
          <el-radio-group v-model="data.group_rate_safe_state">
            <el-radio label="1">达标</el-radio>
            <el-radio label="0">不达标</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="渗透缺陷：" prop="apply_in" style="margin-left: 0.81rem;margin-right: 0.87rem;">
          <el-input v-model="data.defect_num_tou" placeholder="请输入渗透缺陷"></el-input>
        </el-form-item>
        <el-form-item label="平均缺陷率：" prop="apply_in">
          <el-input v-model="data.defect_rate_tou" placeholder="请输入平均缺陷率"></el-input>
        </el-form-item>
        <el-form-item label="同比上月：" prop="apply_in" style="margin-right: 10.81rem;">
          <el-input v-model="data.defect_rate_month_tou" placeholder="请输入同比上月(下降前面加-)"></el-input>
        </el-form-item>
        <el-form-item label prop="data.group_rate_tou_state">
          <el-radio-group v-model="data.group_rate_tou_state">
            <el-radio label="1">达标</el-radio>
            <el-radio label="0">不达标</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="companyjiaoyan">
        <div>
          <span>代码扫描：</span>
          <span></span>
        </div>
        <el-form-item label="扫描项目数：" prop="data.plan_apply" style="margin-right:1rem;margin-left: -0.68rem;">
          <el-input v-model="data.scan_num" placeholder="请输入扫描项目数"></el-input>
        </el-form-item>
        <el-form-item label="发现缺陷数：" prop="apply_in" style="margin-left: 1.43rem;margin-right: 1rem;">
          <el-input v-model="data.qian_defect_num" placeholder="请输入发现缺陷数"></el-input>
        </el-form-item>
        <el-form-item label="平均千行代码缺陷率：" prop="apply_in" style="margin-right: 1.5rem;">
          <el-input v-model="data.qian_defect_rate" placeholder="请输入平均千行代码缺陷率"></el-input>
        </el-form-item>
        <el-form-item label="同比上月：" prop="apply_in">
          <el-input v-model="data.qian_defect_rate_month" placeholder="请输入同比上月(下降前面加-)"></el-input>
        </el-form-item>
        <el-form-item label prop="data.qian_group_rate_state" style="width:100%;margin-left: 8.125rem;">
          <el-radio-group v-model="data.qian_group_rate_state">
            <el-radio label="1">达标</el-radio>
            <el-radio label="0">不达标</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="companyjiaoyan">
        <div>
          <span>安全防护：</span>
          <span></span>
        </div>
        <el-form-item label="检查数：" prop="data.plan_apply" style="margin-right: 1rem;margin-left: 1.375rem;">
          <el-input v-model="data.safe_check_num" placeholder="请输入检查数"></el-input>
        </el-form-item>
        <el-form-item label="审查数：" prop="apply_in" style="margin-left: 3.43rem;">
          <el-input v-model="data.safe_shen_num" placeholder="请输入审查数"></el-input>
        </el-form-item>
        <el-form-item label="发现问题：" prop="apply_in" style="margin-left: 3.43rem;margin-right: 1rem;">
          <el-input v-model="data.safe_problem_num" placeholder="请输入发现问题"></el-input>
        </el-form-item>
        <el-form-item label="平均不一致率：" prop="apply_in" >
          <el-input v-model="data.diff_rate" placeholder="请输入平均不一致率"></el-input>
        </el-form-item>
        <el-form-item label="同比上月：" prop="apply_in" style="margin-left: 0.375rem;">
          <el-input v-model="data.diff_rate_month" placeholder="请输入同比上月增长(下降前面加-)"></el-input>
        </el-form-item>
        <el-form-item label prop="data.diff_group_rate_state" style="margin-left: 6.75rem;">
          <el-radio-group v-model="data.diff_group_rate_state">
            <el-radio label="1">达标</el-radio>
            <el-radio label="0">不达标</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>

      <div class="companyjiaoyan">
        <div>
          <span>测试周期：</span>
          <span></span>
        </div>
        <el-form-item label="非功能测试周期：" prop="data.plan_apply" style="margin-right: 1rem;margin-left: -2.75rem;">
          <el-input v-model="data.total_day" placeholder="请输入非功能测试周期"></el-input>
        </el-form-item>
        <el-form-item label="安全测试周期：" prop="apply_in" style="margin-left: 1.43rem;">
          <el-input v-model="data.safe_total_day" placeholder="请输入安全测试周期"></el-input>
        </el-form-item>
      </div>
      <div style="text-align:center;margin-top:1.875rem;">
        <el-button type @click="submit">保存</el-button>
      </div>
      <!--  -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "project-data",
  data() {
    return {
      data: {
        month: "",
        start_num: "",
        plan_in: "",
        plan_out: "",
        start_num: "",
        start_num_end: "",
        start_one: "",
        start_two: "",
        start_three: "",
        defect_num: "",
        defect_a: "",
        defect_b: "",
        defect_c: "",
        defect_d: "",
        defect_group_rate_state: "",
        defect_rate: "",
        defect_rate_year: "",
        start_num_safe: "",
        start_num_end_safe: "",
        group_rate_safe_state: "",
        start_one_safe: "",
        start_two_safe: "",
        defect_num_tou: "",
        defect_rate_tou: "",
        defect_rate_month_tou: "",
        group_rate_tou_state: "",
        apply_test_num:"",
        fact_apply_num:"",
        plan_in:"",
        plan_out:"",
        scan_num:"",
        qian_defect_num:"",
        qian_defect_rate:"",
        qian_defect_rate_month:"",
        qian_group_rate_state:"",
        safe_check_num:"",
        safe_shen_num:"",
        safe_problem_num:"",
        diff_rate:"",
        diff_rate_month:"",
        diff_group_rate_state:"",
        total_day:"",
        safe_total_day:"",

      },
      plan1: {
        mouth: 1,
      },

      flag: "1",
      submitArr: [],
      form: {
        type: "1",
        date: "",
      },
      // dateData

      id: "",
      projectCount: {},
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      this.getProjectData();
    }
  },
  methods: {
    //提交保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id == undefined) {
            //新增数据方法
            this.addCompany(this.ruleForm);
          } else {
            //修改数据方法
            this.formConpanymsg(this.ruleForm);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  
    //保存
    submit() {
      if (this.id) {
        //修改数据方法
        this.formprojectmsg(this.data);
      } else {
        //新增数据方法
        this.addproject(this.data);
      }
    },
    //提交新增
    addproject(obj) {
      let self = this;
      self.$api.post(
        "/projectCount",
        { month: this.plan1.month, data: obj },
        (r) => {
          //console.log(r);
          self.$message.success(r.message);
          self.$router.push({
            name: "project-list",
          });
        },
        (e) => {
          self.$message.error(e.message);
        }
      );
    },
    formprojectmsg: function () {
      let self = this;
      self.$api.put(
        "/projectCount",
        { id: this.id, month: this.plan1.month, data: this.data },

        (r) => {
          self.$message.success(r.message);
          self.$router.push({
            name: "project-list",
          });
        },
        (e) => {
          self.$message.error(e.data);
        }
      );
    },
    //编辑回显
    getProjectData() {
      let self = this;
      self.$api.get(
        "/projectCountEdit",
        {
          id: self.id,
        },
        (r) => {
          console.log(r.data);
          this.data = r.data;
          this.plan1.month = this.data.month;
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped src="./project-datanum.less"></style>
