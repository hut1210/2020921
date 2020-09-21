//用户组列表
<template>
  <div class="main userGroup-main">
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
            <el-form-item label="充值申请单号:">
              <el-input
                v-model="form.keyword"
                placeholder="请输入提现申请单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="充值状态:">
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
            <el-form-item label="充值申请时间:" prop>
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
            <el-button class="btn-query" @click="onSubmit">查询</el-button>
            <!-- <div class="btn-add" @click="addUserList">添加</div> -->
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
        
        <el-table-column
          prop="name"
          label="充值申请单号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="name"
          label="充值币种"
          width=""
        ></el-table-column>
        <el-table-column
          prop="name"
          label="充值金额"
          width=""
        ></el-table-column>
        <el-table-column
          prop="name"
          label="充值服务费"
          width=""
        ></el-table-column>
        <el-table-column
          prop="name"
          label="到账币种"
          width=""
        ></el-table-column>
        <el-table-column
        prop="name"
        label="到账金额"
        width=""
      ></el-table-column>
      <el-table-column
        prop="name"
        label="到账日期"
        width=""
      ></el-table-column>
      <el-table-column
        prop="name"
        label="充值状态"
        width=""
      ></el-table-column>
      <el-table-column
      prop="name"
      label="资金流水单号"
      width=""
    ></el-table-column>
    <el-table-column
      prop="name"
      label="申请充值时间"
      width=""
    ></el-table-column>
    <el-table-column
      prop="name"
      label="更新时间"
      width=""
    ></el-table-column>
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
        status: "",
        keyword: ""
      },
      statusData: [
        {
          value: "1",
          label: "已审核"
        },
        {
          value: "0",
          label: "未审核"
        }
      ],
      tableData: [],
      pageIndex: 1,
      total: 0
    };
  },
  created() {
    //   this.getList();
  },
  methods: {
    //表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    //获取列表
    getList() {
      let self = this;
      self.$api.get(
        "group",
        { page: self.pageIndex, pagesize: 10, keyword: "", status: "" },
        r => {
          //console.log(r.data);
          self.tableData = r.data;
          self.total = r.data.total_page;
        },
        e => {
          self.$message.error(e.message);
        }
      );
    }
  }
};
</script>

<style lang="less" src="./user-group-list.less"></style>
