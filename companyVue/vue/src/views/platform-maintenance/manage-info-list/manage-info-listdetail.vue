//代付详情列表
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
            <el-form-item label="付款单号:">
              <el-input
                v-model="form.id"
                placeholder="请输入付款单号"
              ></el-input>
            </el-form-item>
            <el-form-item label="付款状态:">
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
            <el-form-item label="收款人姓名:" prop>
              <el-input
              v-model="form.name"
              placeholder="请输入收款人姓名"
            ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-query" @click="onSubmit">查询</el-button> 
              <!-- <el-button class="btn-query" @click="onSubmitexport">导出</el-button>  -->
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
        <el-table-column prop="id" label="付款单号" width></el-table-column>
        <el-table-column prop="payeeName" label="收款人姓名" width></el-table-column>
        <el-table-column prop="payeeBankCode" label="收款人银行卡号" width></el-table-column>
        <el-table-column prop="amount" label="付款金额" width></el-table-column>
        <el-table-column prop="" label="付款备注" width></el-table-column>
        <el-table-column prop="status" label="付款状态" width>
          <template slot-scope="scope">
            <span
            v-if="scope.row.status==2"
              size="mini"
            >等待处理中</span>
            <span
            v-else-if="scope.row.status==1"
              size="mini"
            >处理成功</span>
            <span
            v-else
            size="mini"
          >等待处理中</span>
          </template>
        </el-table-column>
        <el-table-column prop="singleCharge" label="付款服务费" width></el-table-column>
        <el-table-column prop="addtime" label="付款详情" width></el-table-column>
        <el-table-column prop="payoutId" label="资金流水单号" width></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width></el-table-column>
        <!-- //商户系统是否需要重新付款功能？还是只从业务系统发起 失败 -->
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
       id:"",
        status:"0",
        name: ""
      },
      statusData: [
        {
          value: '0',
          label: '等待处理中'
        },
        {
          value: '1',
          label: '处理成功'
        },
        {
          value: '2',
          label: '失败'
        },
      ],
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize:10,
      orderId:"",
     
    };
  },
  created() {
    if (this.$route.params.id) {
      this.orderId=this.$route.params.id
      this.manage();
    }
   
  },
  methods: {
    //表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    //查询
    onSubmit() {
      this.manage();
    },
    //导出
    onSubmitexport() {
      this.manageexport();
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.manage();
    },
    //获取代付详情列表
    manage() {
      let self = this;
      self.$api.post(
        "/core/api/payment/payout/detaillist",
        { page: self.pageIndex,
          size: self.pageSize,
          orderId: self.orderId,
          status: self.form.status,
          name: self.form.name,
          id: self.form.id,
        },
        r => {
          console.log(r);
          self.tableData = r.result.list;
          self.total = r.result.total;
        },
        e => {
          self.$message.error(e.result);
        }
      );
    },
    manageexport(){
      let self = this;
      self.$api.exportTable(
        "/core/api/payment/payout/detaillist/export",
        { page: self.pageIndex,
          orderId: self.orderId,
          status: self.form.status,
          name: self.form.name
        },
        r => {
          console.log(r);
        },
        e => {
          self.$message.error(e.result);
        }
      );
    },
    //修改
    editRow(row) {
      let id = row.id;
      this.$router.push({
        name: "add-manage-info",
        params: {
          id: id,
          type:'2'
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
    //删除
    deleteRow(row) {
      let id = row.id;
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let self = this;
            self.$api.delete(
                'manage/'+id,
                {id:id},
                r => {
                    this.$message({
                        message: r.message,
                        type: "success"
                    });
                    this.manage();
                },
                e => {
                    self.$message.error(e.msg);
                }
            );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  mounted() {
    
  },
};
</script>

<style lang="less"  src="./manage-info-list.less"></style>
