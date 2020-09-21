//提现列表
<template>
  <div class="main userList-main">
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
            <el-form-item label="提现申请单号:">
              <el-input
                v-model="form.keyword"
                placeholder="请输入提现申请单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="提现状态:">
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
            <el-form-item label="提现申请时间:" prop>
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
        height="49.7rem"
      >
        <el-table-column
          prop="username"
          label="提现申请单号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="提现金额"
          width=""
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="提现服务费"
          width=""
        ></el-table-column>
        <el-table-column
          prop="groupname"
          label="提现银行账户"
          width=""
        ></el-table-column>
        <el-table-column
          prop="company_name"
          label="提现状态"
          width=""
        ></el-table-column>
        <el-table-column
          prop="addtime"
          label="资金流水单号"
          width=""
        ></el-table-column>
        <el-table-column
        prop="addtime"
        label="申请提现时间"
        width=""
      ></el-table-column>
      <el-table-column
      prop="addtime"
      label="更新时间"
      width=""
    ></el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
                        <div class="operation">
                            <span class="oper_edit" @click="editRow(scope.row)">取消提现</span>
                        </div>
                    </template> 
        </el-table-column>
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
      total: 0,
      pageSize: 10 //每页显示条数
    };
  },
  created() {
    // this.getList();
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
    addUserList() {
      this.$router.push({
        name: "add-user",
        params: {
          type: "1"
        }
      });
    },
    //修改
    editRow(row) {
      let id = row.id;
      this.$router.push({
        name: "add-user",
        params: {
          id: id,
          type: "2"
        }
      });
    },
    //删除
    deleteRow(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let self = this;
          self.$api.delete(
            "user/" + id,
            { id: id },
            r => {
              this.$message({
                message: r.message,
                type: "success"
              });
              this.getList();
            },
            e => {
              self.$message.error(e.msg);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

    //获取用户列表
    getList() {
      let self = this;
      self.$api.get(
        "user",
        {
          page: self.pageIndex,
          pagesize: this.pageSize,
          keyword: self.form.keyword,
          status: self.form.status
        },
        r => {
          //console.log(r.data);
          self.tableData = r.data.data;
          self.total = r.data.total_count;
        },
        e => {
          self.$message.error(e.message);
        }
      );
    }
  }
};
</script>

<style lang="less" src="./user-list.less"></style>
