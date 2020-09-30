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
                v-model="form.applyId"
                placeholder="请输入提现申请单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="提现状态:">
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
            <el-form-item label="提现申请时间:" prop>
              <el-date-picker
                style="height: 2.5rem;"
                class="ydateinput"
                v-model="form.startime"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
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
          prop="applyId"
          label="提现申请单号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="提现金额"
          width=""
        ></el-table-column>
        <el-table-column
          prop="serviceFee"
          label="提现服务费"
          width=""
        ></el-table-column>
        <el-table-column
          prop="toAccount"
          label="提现银行账户"
          width=""
        ></el-table-column>
        <el-table-column
          prop="company_name"
          label="提现状态"
          width=""
        >
        <template slot-scope="scope">
          <span
          v-if="scope.row.status==1"
            size="mini"
          >待审核</span>
          <span
          v-else-if="scope.row.status==2"
            size="mini"
          >审核通过，通道提现中</span>
          <span
          v-else-if="scope.row.status==3"
            size="mini"
          >提现成功</span>
          <span
          v-else-if="scope.row.status==4"
          size="mini"
        >提现失败</span>
          <span
          v-else-if="scope.row.status==5"
          size="mini"
        >审核拒绝</span>
        </template>
      </el-table-column>
        <el-table-column
        prop="createTime"
        label="申请提现时间"
        width=""
      ></el-table-column>
      <el-table-column
      prop="updateTime"
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
        startime:[],
        status: 1,
        applyId: ""
      },
      //状态，1-待审核 2-审核通过，通道提现中 3-提现成功 4-提现失败 5-审核拒绝
      statusData: [
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 2,
          label: "审核通过"
        },
        {
          value: 3,
          label: "提现成功"
        },
        {
          value: 4,
          label: "提现失败"
        },
        {
          value: 5,
          label: "审核拒绝"
        },
      ],
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize: 10 //每页显示条数
    };
  },
  created() {
    this.getdate();
    
  },
  methods: {
     //时间 获取
     getdate(){
      var myDate = new Date();
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 0, 0))
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 23, 59))
      console.log('startT',this.form.startime[0])
      console.log('endT',this.form.startime[1])
    },
    formatDate:function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
},
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

    //获取提现列表
    getList() {
      let self = this;
      self.$api.post(
        "/core/manager/review/withdraws/list",
        
        {
          page: self.pageIndex,
          size: self.pageSize,
          startTime: self.formatDate(self.form.startime[0]),
          endTime: self.formatDate(self.form.startime[1]),
          status: self.form.status?self.form.status:1,//状态，1-待审核 2-审核通过，通道提现中 3-提现成功 4-提现失败 5-审核拒绝
          applyId: self.form.applyId,//流水号，支持模糊查询
        },
        r => {
          //console.log(r.data);
          self.tableData = r.result.list;
          self.total = r.result.total;
        },
        e => {
          self.$message.error(e.result);
        }
      );
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" src="./user-list.less"></style>
