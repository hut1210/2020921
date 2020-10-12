//管理员列表
<template>
  <div class="main manageInfo-main">
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
            <el-form-item label="代付申请单号:">
              <el-input
                v-model="form.billId"
                placeholder="请输入提现申请单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请单状态:">
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
            <el-form-item label="代付申请时间:" prop>
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
            <el-form-item>
              <el-button class="btn-query" @click="onSubmit">查询</el-button> 
              <!-- <el-button class="btn-query" @click="onSubmit">导出</el-button>  -->
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
        height="49.7rem"
      >
        <el-table-column fixed prop="id"   style="width:250rem;" label="代付申请单号" ></el-table-column>
        <el-table-column prop="bizType" label="代付类型" width>
            <template slot-scope="scope">
              <span
              v-if="scope.row.bizType==1"
                size="mini"
              >提现</span>
              <span
              v-else
              size="mini"
            >代付</span>
            </template>
        </el-table-column>
        <el-table-column prop="totalNum" label="申请代付笔数" width></el-table-column>
        <el-table-column prop="successNum" label="付款成功笔数" width></el-table-column>
        <el-table-column prop="amount" label="申请代付总金额" width></el-table-column>
        <el-table-column prop="successAmount" label="付款成功金额" width></el-table-column>
        <el-table-column prop="status" label="申请单状态" width>
          <template slot-scope="scope">
           
            <span
            v-if="scope.row.status==1"
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
        <el-table-column label="代付详情" width>
          <template slot-scope="scope">
            <div class="operation">
              <span  style="color: #65B4FF; cursor: pointer;padding-left: 1.375rem;" class="oper_edit" @click="editRow(scope.row)"> 点击查看</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="申请代付时间" width></el-table-column>
        <el-table-column prop="status" label="更新时间" width></el-table-column>

      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      form: {
        
        status: "0",
        billId:"",
        //统计时间]
        startime: [],
      },
     
     
      //订单状态，0审批中，1支付完成，2审核不通过，3审核通过，4支付处理中，5支付处理失败
      statusData: [
        {
          value: '0',
          label: '审批中'
        },
        {
          value: '1',
          label: '支付完成'
        },
        {
          value: '3',
          label: '审核通过'
        },
        {
          value: '4',
          label: '支付处理中'
        },
        {
          value: '5',
          label: '支付处理失败'
        },
      ],
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize:10,
    };
  },
 
  created() {
   this.getdate();
  },
  methods: {
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
    //时间 获取
    getdate(){
      var myDate = new Date();
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 0, 0))
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 23, 59))
      console.log('startT',this.form.startime[0])
      console.log('endT',this.form.startime[1])
    },
    //表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    //查询
    onSubmit() {
      this.payformanage();
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.payformanage();
    },
    //获取代付列表
    payformanage() {
     
      let self = this;
      self.$api.post(
        "/core/api/payment/payout/list",
        { page: self.pageIndex,
          size: self.pageSize,
          startTime: self.formatDate(self.form.startime[0]),
          endTime: self.formatDate(self.form.startime[1]),
          status: self.form.status?self.form.status:0,//订单状态，0审批中，1支付完成，2审核不通过，3审核通过，4支付处理中，5支付处理失败
          billId: self.form.billId,//流水号，支持模糊查询
        },
        r => {
          console.log(r);
         
          self.tableData = r.result.list;
          self.total = r.result.total;
          
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //修改
    editRow(row) {
      let id = row.id;
      this.$router.push({
        name: "manage-info-listdetail",
        params: {
          id: id,
        }
      });
    },
    addeditRow() {
      this.$router.push({
        name: "add-manage-info",
        params: {
          type:'1'
        }
      });

    },
   
  },
mounted() {
  this.payformanage();
},
};
</script>

<style lang="less"  src="./manage-info-list.less"></style>
