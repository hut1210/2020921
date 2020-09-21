<!-- 项目统计 -->
<template>
  <div class="projects project-statistics">
    <div class="projects-number">
      <el-form ref="form" :model="form" label-width="80px" class="num-top">
        <el-form-item>
          <el-date-picker
            v-model="formAll.allData"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="送检公司:">
          <el-select v-model="formAll.pro_company" placeholder="请选择">
            <el-option>请选择</el-option>
            <el-option
              v-for="item in form.options"
              v-if='item.type == 1'
              :key="item.c_id"
              :label="item.company_name"
              :value="item.c_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="检测单位:">
          <el-select v-model="formAll.test_company" placeholder="请选择">
            <el-option>请选择</el-option>
            <el-option
              v-for="item in form.options"
              v-if='item.type == 2'
              :key="item.c_id"
              :label="item.company_name"
              :value="item.c_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词:">
          <div class="search">
            <el-input v-model="formAll.keyword" placeholder="项目名称/产品名称/项目经理"></el-input>
            <el-button @click='getList' style="margin-left:2em">搜索</el-button>
          </div>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <div class="num-echarts" id="myChart"></div>
    </div>
    <div class="projects-detection">
      <div id="detection"></div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import project from "./project-statistics";
export default project;
</script>
<style src='./project-statistics.less' scoped>
</style>
<style lang="less">
.project-statistics {
  .el-input--small .el-input__inner {
    width: 162.8px;
    height: 35px;
    line-height: 35px;
  }
  .el-range-editor--small.el-input__inner {
    height: 35px;
    width: 270px;
    line-height: 35px;
  }
  .search {
    .el-input--small .el-input__inner {
      width: 102%;
      height: 100%;
      letter-spacing: 2px;
    }
  }
}
</style>
