//充值列表
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
                v-model="form.billId"
                placeholder="请输入提现申请单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="充值状态:">
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
            <el-form-item label="充值申请时间:" prop>
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
        height="49.3rem"
      >
        
        <el-table-column
          prop="id"
          label="充值申请单号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="充值金额"
          width=""
        ></el-table-column>
        <el-table-column
          prop="rechargeAmount"
          label="充值服务费"
          width=""
        ></el-table-column>
        <el-table-column
          prop="currency"
          label="到账币种"
          width=""
        ></el-table-column>
        <el-table-column
        prop="successAmount"
        label="到账金额"
        width=""
      ></el-table-column>
      <el-table-column
        prop="successDate"
        label="到账日期"
        width=""
      >
    </el-table-column>
      <el-table-column
        prop="status"
        label="充值状态"
        width=""
      >
      <template slot-scope="scope">
        <span
        v-if="scope.row.createTime==1"
          size="mini"
        >支付完成</span>
        <span
        v-else-if="scope.row.status==2"
          size="mini"
        >审核不通过</span>
        <span
        v-else-if="scope.row.status==3"
          size="mini"
        >审核通过</span>
        <span
        v-else-if="scope.row.status==4"
        size="mini"
      >支付处理中</span>
        <span
        v-else-if="scope.row.status==5"
        size="mini"
      >支付处理失败</span>
      <span
      v-else
        size="mini"
      >审批中</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="申请充值时间"
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
        status: 0,
        billId: ""
      },
      statusData: [
        {
          value: 0,
          label: "审批中"
        },
        {
          value: 1,
          label: "支付完成"
        },
        {
          value: 2,
          label: "审核不通过"
        },
        {
          value: 3,
          label: "审核通过"
        },
        {
          value: 4,
          label: "支付处理中"
        },
        {
          value: 5,
          label: "支付处理失败"
        },
      ],
      tableData: [],
      pageIndex: 1,
      pageSize:10,
      total: 0
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getList();
    },
  //查询
  onSubmit() {
    this.getList();
    },
    //获取列表
    getList() {
      let self = this;
      self.$api.post(
        "/core/api/payment/recharge/list",
        {
          page: self.pageIndex,
          size: self.pageSize,
          startTime: self.formatDate(self.form.startime[0]),
          endTime: self.formatDate(self.form.startime[1]),
          status: self.form.status?self.form.status:0,//订单状态，0审批中，1支付完成，2审核不通过，3审核通过，4支付处理中，5支付处理失败
          billId: self.form.billId,//流水号，支持模糊查询
       },
        r => {
          //console.log(r.data.total_count);
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

<style lang="less" src="./user-group-list.less"></style>
