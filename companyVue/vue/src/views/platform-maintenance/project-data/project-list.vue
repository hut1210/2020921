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
                v-model="form.merchantId"
                placeholder="请输入GrePay订单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="商户订单号:">
              <el-input
                v-model="form.merchantOrderId"
                placeholder="请输入商户订单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户ID:">
                <el-input
                  v-model="form.merchantUserId"
                  placeholder="请输入用户ID"
                ></el-input>
              </el-form-item>
            <el-form-item label="支付方式:">
              <el-select v-model="form.paytypeId" placeholder="请选择">
                <el-option
                  v-for="item in statusData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态:">
                <el-select v-model="form.status" placeholder="请选择">
                  <el-option
                    v-for="item in statusDatas"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            <el-form-item  style="margin-left: 2.5rem" label="生成时间:" prop>
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
      <el-table-column fixed prop="merchantId" label="商户ID"  width="160"></el-table-column>
      <el-table-column prop="amount" label="金额" width="160"></el-table-column>
      <el-table-column prop="paytypeName" label="支付方式"  width="160">
      </el-table-column>
      <el-table-column prop="paytypeRate" label="订单费率" width="160" ></el-table-column>
      <el-table-column prop="countryCode" label="国家码" width="160"></el-table-column>
      <el-table-column prop="currency" label="币种代码" width="160"></el-table-column>
      <el-table-column prop="merchantOrderId" label="商户订单ID" width="250"></el-table-column>
      <el-table-column prop="merchantSettlementAmount" label="商户结算金额" width="250" ></el-table-column>
      <el-table-column prop="merchantUserId" label="商户用户ID" width="250"></el-table-column>
      <el-table-column prop="merchantUserName" label="商户用户名" width="250"></el-table-column>
      <el-table-column prop="merchantUserEmail" label="商户用户邮箱" width="250"></el-table-column>
      <el-table-column prop="merchantUserIp" label="商户用户名IP" width="250"></el-table-column>
      <el-table-column prop="merchantUserPhone" label="商户用户手机号" width="250"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="160" ></el-table-column>
      <el-table-column prop="productDescription" label="产品描述" width="160" ></el-table-column>
      <el-table-column prop="status" label="状态" width="100" >
        <template slot-scope="scope">
          <span
          v-if="scope.row.payType==1"
            size="mini"
          >成功</span>
          <span
          v-if="scope.row.payType==2"
            size="mini"
          >失败</span>
          <span
          v-else
          size="mini"
        >处理中</span>
        </template>

      </el-table-column>
      <el-table-column prop="startTime" label="时间" width="160"></el-table-column>
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
        merchantId:"",
        merchantOrderId:"",
        merchantUserId:"",
        paytypeId:"",
        status:"0",
        startime:[]
      },
      tableData: [],
      statusData: [],
      statusDatas: [
      {
          value: '',
          label: '请选择'
        },
        {
          value: '0',
          label: '处理中'
        },
        {
          value: '1',
          label: '支付成功'
        },
        {
          value: '2',
          label: '支付失败'
        },
      ],
      pageIndex: 1,
      total: 0,
      pageSize:10,
    };
  },
  created() {
    this.getType();
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
    //获取订单列表
    getList() {
      let self = this;
      self.$api.post(
        "/gpmanage/partner/merchant/orders",
       {
    "pageNum":self.pageIndex,
    "size":self.pageSize,
    "orderID":self.form.merchantId,
    "MOrderID":self.form.merchantOrderId,
    "paytp":self.form.paytypeId,
    "status":self.form.status,
    "startTime":self.formatDate(self.form.startime[0]),
    "endTime":self.formatDate(self.form.startime[1])

       },
        r => {
          //console.log(r.data.total_count);
          self.tableData = r.result.list;
          self.total = r.result.total;
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //获取支付方式
    getType() {
      let self = this;
      self.$api.get(
        "/core/manager/pay/type",
        {},
        r => {
          
          self.statusData = r.result;
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped src="./projectnum-list.less"></style>
<style>
    /* .el-table td, .el-table th.is-leaf{background: #49a1c3 !important;} */
</style>
