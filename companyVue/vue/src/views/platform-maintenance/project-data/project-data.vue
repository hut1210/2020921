//项目数据
<template>
  <div class="project-data">
    <div class="pro-search">
      <el-form ref="form" :model="form">
        <el-form-item label="类型：">
          <el-select v-model="form.type" placeholder @change="changeType">
            <el-option
              v-for="(item,index) in typeData"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年月：">
          <el-select v-model="form.date" placeholder="请选择">
            <el-option label="请选择"></el-option>
            <el-option v-for="k in 12" :key="k" :label="k" :value="k"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 计划申请 -->
    <el-form :inline="true" ref="plan" :model="plan" v-if="flag == '1'">
      <div class="company" v-for="(item,index) in companyList" :key="index">
        <div>
          <span>公司名称：</span>
          <span>{{item.company_name}}</span>
        </div>
        <el-form-item label="计划申请：" prop="plan_apply">
          <el-input v-model="item.plan_apply" placeholder="请输入计划数量"></el-input>
        </el-form-item>
        <el-form-item label="计划内：" prop="apply_in">
          <el-input v-model="item.apply_in" placeholder="请输入计划内数量"></el-input>
        </el-form-item>
        <el-form-item label="计划外：" prop="apply_out">
          <el-input v-model="item.apply_out" placeholder="请输入计划外数量"></el-input>
        </el-form-item>
      </div>
      <div style="text-align:center;margin-top:30px;">
        <el-button type @click="submit">保存</el-button>
      </div>
    </el-form>
    <!-- 非功能 -->
    <el-form :inline="true" ref="plan" :model="plan" v-if="flag == '2'">
      <div class="company" v-for="(item,index) in companyList" :key="index">
        <div>
          <span>公司名称：</span>
          <span>{{item.company_name}}</span>
        </div>
        <el-form-item label="通过完成项目：">
          <el-input v-model="item.two_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="二轮通过率：">
          <el-input v-model="item.two_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="缺陷项目：">
          <el-input v-model="item.defect_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="平均缺陷率：">
          <el-input v-model="item.defect_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
      </div>
      <div style="text-align:center;margin-top:30px;">
        <el-button type @click="submit">保存</el-button>
      </div>
    </el-form>
    <!-- 安全出厂 -->
    <el-form :inline="true" ref="plan" :model="plan" v-if="flag == '3'">
      <div class="company" v-for="(item,index) in companyList" :key="index">
        <div>
          <span>公司名称：</span>
          <span>{{item.company_name}}</span>
        </div>
        <el-form-item label="通过完成项目：">
          <el-input v-model="item.safe_two_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="二轮通过率：">
          <el-input v-model="item.safe_two_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="缺陷项目：">
          <el-input v-model="item.safe_defect_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="平均缺陷率：">
          <el-input v-model="item.safe_defect_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
      </div>
      <div style="text-align:center;margin-top:30px;">
        <el-button type @click="submit">保存</el-button>
      </div>
    </el-form>
    <!-- 源代码/安全防护 -->
    <el-form :inline="true" ref="plan" :model="plan" v-if="flag == '4'">
      <div class="company" v-for="(item,index) in companyList" :key="index">
        <div>
          <span>公司名称：</span>
          <span>{{item.company_name}}</span>
        </div>
        <el-form-item label="通过完成项目：">
          <el-input v-model="item.code_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="千行代码缺陷率：">
          <el-input v-model="item.code_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="不一致项目：">
          <el-input v-model="item.diff_project" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="不一致率：">
          <el-input v-model="item.diff_rate" placeholder="请输入数量"></el-input>
        </el-form-item>
      </div>
      <div style="text-align:center;margin-top:30px;">
        <el-button type @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "project-data",
  data() {
    return {
      flag: "1",
      submitArr: [],
      form: {
        type: "1",
        date: "",
      },
      typeData: [
        {
          label: "计划申请",
          value: "1",
        },
        {
          label: "非功能",
          value: "2",
        },
        {
          label: "出场安全",
          value: "3",
        },
        {
          label: "源代码/安全防护",
          value: "4",
        },
      ],
      // dateData
      plan: {
        plan_for: "",
        plan_in: "",
        plan_out: "",
      },
      companyList: [
        { title: "第一家公司" },
        { title: "第二家公司" },
        { title: "第三家公司" },
      ],
    };
  },
  created() {
    this.getProjectData();
  },
  methods: {
    //联动类型
    changeType(type) {
      switch (type) {
        case "1":
          this.flag = "1";
          break;
        case "2":
          this.flag = "2";
          break;
        case "3":
          this.flag = "3";
          break;
        case "4":
          this.flag = "4";
          break;
      }
    },
    //保存
    submit() {
      let obj = {
        companyList: this.companyList,
      };
      let self = this;
      self.$api.post(
        "/projectData",
        {type: this.form.type, month: this.form.date, data: obj},
        (r) => {
          this.$message({
            message: r.message,
            type: "success",
          });
        },
        (e) => {
          self.$message.error(e.data);
        }
      );
    },
    //
    getProjectData() {
      let self = this;
      self.$api.get(
        "/companyPC",
        {},
        (r) => {
          console.log(r.data);
          this.companyList = r.data.data;
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
  },
};
</script>

<style lang="less" scoped src="./project-data.less"></style>
