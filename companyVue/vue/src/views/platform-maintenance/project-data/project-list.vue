//月份总数据
<template>
  <div class="main projectlist-main">
    <!-- 顶部 -->
    <div class="mainHead">
      <!-- 搜素框 -->
      <div class="searchBox">
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          class="demo-form-inline"
        >
        <div class="search-input">
            <el-form-item label="GrePay订单号:">
              <el-input
                v-model="form.keyword"
                placeholder="请输入GrePay订单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="商户订单号:">
              <el-input
                v-model="form.keyword"
                placeholder="请输入商户订单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户ID:">
                <el-input
                  v-model="form.keyword"
                  placeholder="请输入用户ID"
                ></el-input>
              </el-form-item>
            <el-form-item label="支付方式:">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option>请选择</el-option>
                <el-option
                  v-for="item in statusData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态:">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option>请选择</el-option>
                  <el-option
                    v-for="item in statusDatas"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="生成时间:" prop>
              <el-date-picker
                class="ydateinput"
                v-model="startime"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button class="btn-query" @click="onSubmit">查询</el-button> 
            <el-button class="btn-query" @click="onSubmit">导出</el-button> 
          </el-form-item>
         </div>
        </el-form>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="dataList">
      <el-table
        :data="tableData"
        :header-cell-style="getClass"
        style="width: 100%"
        height="49.3rem"
      >
      <el-table-column fixed prop="company_name" label="GrePay订单号" width="160"></el-table-column>
      <el-table-column prop="tongji_month" label="商户订单号" width="160"></el-table-column>
      <el-table-column prop="two_rate" label="资金流水单号" width="160"></el-table-column>
      <el-table-column prop="defect_rate" label="用户ID" width="160"></el-table-column>
      <el-table-column prop="safe_two_rate" label="订单金额" width="160"></el-table-column>
      <el-table-column prop="safe_defect_rate" label="业务名称" width="160"></el-table-column>
      <el-table-column prop="code_rate" label="用户ID" width="160"></el-table-column>
      <el-table-column prop="diff_rate" label="订单金额" width="160"></el-table-column>
      <el-table-column prop="safe_two_rate" label="支付方式" width="160"></el-table-column>
      <el-table-column prop="safe_defect_rate" label="结算主体" width="160"></el-table-column>
      <el-table-column prop="code_rate" label="支付方式" width="160"></el-table-column>
      <el-table-column prop="diff_rate" label="商户费率" width="160"></el-table-column>
      <el-table-column prop="safe_two_rate" label="订单手续费" width="160"></el-table-column>
      <el-table-column prop="safe_defect_rate" label="商户结算金额" width="160"></el-table-column>
      <el-table-column prop="code_rate" label="商户名称" width="160"></el-table-column>
      <el-table-column prop="code_rate" label="订单状态" width="160"></el-table-column>
      <el-table-column prop="diff_rate" label="订单生成时间" width="160"></el-table-column>
      <el-table-column prop="diff_rate" label="更新时间" width="160"></el-table-column>

      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      form: {
        date: "",
        word: ""
      },
      statusData:[],
      tableData: [],
      pageIndex: 1,
      total: 0
    };
  },
  created() {
    // this.getList();
    // this.getCompanyType();
  },
  methods: {
    //表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    //查询
    onSubmit() {
      this.getList();
    },
    //新增
    addCprojectList() {
      this.$router.push({
        name: "project-datanum"
      });
    },
    //修改
    editRow(row) {
      //console.log(row);
      let id = row.id;
      this.$router.push({
        name: "project-datanum",
        params: {
          id: id
        }
      });
    },
    //删除
    deleteRow(row) {
      let id = row.c_id;
      this.deleteCompany(id);
    },
    //公司组织
    goOrglist(row) {
      console.log(row);
      let id = row.c_id,
        companyName = row.company_name;
      this.$router.push({
        name: "organ-structure-list",
        query: {
          companyId: id,
          companyName: companyName
        }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //获取公司列表
    getList() {
      let self = this;
      self.$api.get(
        "/projectCount",
        {
          page: self.pageIndex,
          pagesize: 10,
          month: self.form.date,
          name: this.form.word
        },
        r => {
          //console.log(r.data.total_count);
          self.tableData = r.data.data;
          self.total = r.data.total_count; //总条数
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //获取公司类型
    getCompanyType() {
      let self = this;
      self.$api.post(
        "companytype",
        {},
        r => {
          //console.log(r.data);
        },
        e => {
          self.$message.error(e.message);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped src="./projectnum-list.less"></style>
<style>
    .el-table td, .el-table th.is-leaf{background: #49a1c3 !important;}
</style>
