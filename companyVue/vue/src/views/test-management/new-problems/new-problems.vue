/* eslint-disable no-unused-vars */
<template>
  <!-- 新增问题 -->
  <!-- 组织结构修改 -->
  <div class="organ-structure-updata sharing new-problems">
    <div class="return">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新增问题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="新增问题名称：">
              <el-input v-model="ruleForm.title" placeholder="请输入新增问题名称"></el-input>
            </el-form-item>
            <el-form-item label="新增问题标签：">
              <el-input v-model="ruleForm.tabvalus" placeholder="请输入新增问题标签"></el-input>
            </el-form-item>
            <el-form-item label="新增问题内容：">
              <el-input
                type="textarea"
                :rows="6"
                style="width:386px;height:150px"
                v-model="ruleForm.content"
                placeholder="请输入新增问题内容"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)" class="success" style="display:inline-block !important;">保存</el-button>
            <el-button type="primary" @click="blak" class="fail" style="display:inline-block !important;background:#eee ;">返回</el-button>
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
      optionsSelect: [],
      ruleForm: {
        title: "", // 名称
        tabvalus: "", // 标签
        content: "",
      },
      id: "",
      rules: [],
    };
  },
  methods: {
    submitForm(formName) {
      console.log(formName);
      var token = localStorage.getItem("token");
      // eslint-disable-next-line no-unused-vars
      let obj = {
        token: token,
        title: formName.title,
        classify: formName.tabvalus,
        contents: formName.content,
        project_id: this.id,
      };
      this.$api.post("/problem", obj, (res) => {
        console.log(res.data);
      });
      this.$router.push({ path: "/question-list", query: { id: this.id } });
    },
    blak() {
      this.$router.go(-1);
    },
  },
  mounted: function () {
    this.id = this.$route.query.id;
  },
};
</script>
<style>
.new-problems .el-textarea {
  width: 32.125rem !important;
}
.new-problems .el-textarea__inner {
  width: 32.125rem;
}
</style>
<style lang="less" src="./sharing.less"></style>
<style lang="less" src="./new-problems.less" scoped>
