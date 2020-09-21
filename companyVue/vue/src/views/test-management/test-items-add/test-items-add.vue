
<template>
  <div class="test-items-add-out-box">
        <div class="information">
            <div class="button">项目信息</div>
            <div class="information-center">
                <center>
                    <el-form ref="form" :model="form" label-position="right" label-width="120px">
                        <el-form-item label="项目名称:" prop="">
                            <el-input v-model="form.pro_name"></el-input>
                        </el-form-item>
                        <el-form-item label="产品名称:">
                            <el-input v-model="form.product_name"></el-input>
                        </el-form-item>
                        <el-form-item label="产品版本号:">
                            <el-input v-model="form.version"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司:">
                            <el-select v-model="form.company_id"  placeholder="请选择" style="width:100%">
                              <el-option v-for="item in options" :key="item.c_id"  :label="item.company_name" :value="item.c_id" >
                              </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测试范围:">
                            <el-checkbox-group v-model="form.testid">
                              <el-checkbox v-for="item in checkedList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="项目经理:">
                            <el-input v-model="form.project_realname"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <el-input v-model="form.project_mobile" maxlength="11"></el-input>
                        </el-form-item>
                    </el-form>
                </center>
            </div>
        </div>
        <div class="technological">
            <div class="button">检测流程排程</div>
            <div class="technological-table">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column  prop="" label="" width="130">
                      <template slot-scope="scope">
                          <el-input v-model="scope.row.name" disabled placeholder="请输入流程名称"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" label="" width="360">
                       <template slot-scope="scope">
                        <el-date-picker v-model="scope.row.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="" width="120">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.executor" placeholder="执行人" disabled>
                            <el-option label="检测方"  value="1"></el-option>
                            <el-option label="送检方" value="2"></el-option>
                        </el-select>
                    
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="" width="80">
                      <template slot-scope="scope">
                          <el-input  v-model="scope.row.sort_order" placeholder="排序" disabled @blur="changeSort(scope.row.sort_order,scope.$index)"></el-input>
                      </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin-top: 20px;" @click="addPath">增加流程</el-button>
                <div class="btn-box">
                    <el-button type="success" size="medium" @click="onSubmit">保存</el-button>
                    <el-button type="primary" size="medium" @click="goback">返回</el-button>
                </div>
            </div>
        </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      checkedList: [],
      form: {
        testid: [],
        pro_name: '',
        product_name: '',
        version: '',
        project_realname: '',
        project_mobile: '',
        company_id: ''
      },
      options: [],
      formData: {},
      tableData: [
         {
          date: [],
          name: "提交测试",
          executor: '1',
          sort_order: "1"
        },
        {
          date: [],
          name: "资料审核",
          executor: '1',
          sort_order: "2"
        },
        {
          date: [],
          name: "资料整改",
          executor: '2',
          sort_order: "3"
        },
        {
          date: [],
          name: "任务下达",
          executor: '1',
          sort_order: "4"
        },
        {
          date: [],
          name: "一轮环境搭建",
          executor: '1',
          sort_order: "5"
        },
        {
          date: [],
          name: "一轮测试",
          executor: '1',
          sort_order: "6"
        },
        {
          date: [],
          name: "一轮整改",
          executor: '2',
          sort_order: "7"
        },
        {
          date: [],
          name: "二轮环境搭建",
          executor: '1',
          sort_order: "8"
        },
        {
          date: [],
          name: "二轮测试",
          executor: '1',
          sort_order: "9"
        },
        {
          date: [],
          name: "测试完成",
          executor: '1',
          sort_order: "10"
        },
        {
          date: [],
          name: "测试报告",
          executor: '1',
          sort_order: "11"
        }
      ]
    };
  },
  created(){
    this.getTestrand()
    this.getcompanytype()
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 获取测试范围
    getTestrand(){
      let self = this
      self.$api.get(
        '/testrand',
        {type: ''},
        r => {
            let obj = {}
            for (let item in r.data){
              obj = {}
              obj.id = item
              obj.name = r.data[item]
              self.checkedList.push(obj)
            }
        },
        e => {
            self.$message.error(e.msg)
        })
    },
    // 获取公司列表
    getcompanytype(){
      let self = this
      self.$api.post(
        'companytype',
        {type: 1},
        r =>{
          for(let item in r.data){
            self.options.push(r.data[item])
          }
        }
      )
    },
    onSubmit() {
      let self = this
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/
      if (self.form.pro_name == '') {
          self.$message.error('请输入项目名称')
          return false
      }
      if (self.form.product_name == '') {
          self.$message.error('请输入产品名称')
          return false
      }
      if (self.form.version == '') {
          self.$message.error('请输入版本号')
          return false
      }
      if (self.form.company_id == '') {
          self.$message.error('请选择公司')
          return false
      }
      if (self.form.testid== '') {
          self.$message.error('请选择检测范围')
          return false
      }
      if (self.form.project_realname == '') {
          self.$message.error('请输入项目经理')
          return false
      }
      if (self.form.project_mobile == '') {
          self.$message.error('请输入联系方式')
          return false
      } else if (!myreg.test(self.form.project_mobile)) {
         self.$message.error('请输入正确的联系方式')
          return false
      }
      self.form.name = []
      self.form.start_time = []
      self.form.end_time = []
      self.form.executor = []
      self.form.sort_order = []
      for(let item of self.tableData) {
        if (item.name == ''){
          self.$message.error('流程名称不能为空')
          return false
        }
        if (item.date == ''){
          self.$message.error('请选择时间')
          return false
        }
        if (item.executor == ''){
          self.$message.error('请选择执行人')
          return false
        }
        if (item.sort_order == ''){
          self.$message.error('排序不能为空')
          return false
        }
        self.form.name.push(item.name)
        self.form.start_time.push(item.date[0])
        self.form.end_time.push(item.date[0])
        self.form.executor.push(item.executor)
        self.form.sort_order.push(item.sort_order)
      }
      self.$api.post(
        '/project',
        self.form,
        r => {
          self.$message({
            message:'新增成功',
            type:'success'
          });
          setTimeout(() => {
            self.goback()
          }, 1000);
        }
      )
    },
    // 添加流程
    addPath() {
      self = this
      let tmpData= [];
      for(let i=0; i<this.tableData.length-2;i++)
      {
        tmpData[i] = this.tableData[i]
      }

      if((this.tableData.length - 11)/3 + 2 ){
        let newdata = (this.tableData.length - 11)/3 + 2;
        let newarr = ['零','一','二','三','四','五'];
        if(newdata > 4){
          self.$message.error('超乎我的预期了')
          return false
        }
        else
        {
          tmpData.push({
            date: [],
            name: newarr[newdata]+"轮整改",
            executor: "2",
            sort_order: tmpData.length + 1
          });
          tmpData.push({
            date: [],
            name: (newarr[newdata+1])+"轮环境搭建",
            executor: "2",
            sort_order: tmpData.length + 1
          });
          tmpData.push({
            date: [],
            name: (newarr[newdata+1])+"轮测试",
            executor: "1",
            sort_order: tmpData.length + 1
          });
          tmpData.push({
            date: [],
            name: "测试完成",
            executor: "1",
            sort_order: tmpData.length + 1
          });
          tmpData.push({
            date: [],
            name: "测试报告",
            executor: "1",
            sort_order: tmpData.length + 1
          });
          this.tableData = tmpData
        }
      }
    },
    changeSort(val,index){
      let self = this
      self.tableData.sort(this.compare('sort_order'))
    },
    // 排序
    compare(property){
      console.log(property,"...property")
      return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.test-items-add-out-box {
  .information {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .information-center {
      center {
        width: 40%;
        margin: 0 auto;
        // transform: translateX(-50%);
        .el-form-item {
          margin-top: 15px;
        }
        .form-div {
          border: 1px solid rgba(237, 235, 235, 1);
          border-radius: 2px;
          text-align: left;
          padding: 0 15px;
          height: 40px;
          line-height: 40px;
          .form-label-span {
            color: #66ce90;
            padding-right: 20px;
          }
          .form-div-label {
            width: 5px;
            height: 5px;
            display: inline-block;
            border-radius: 50%;
            border: 3px solid #66ce90;
          }
          .form-div-label-no {
            width: 5px;
            height: 5px;
            display: inline-block;
            border-radius: 50%;
            border: 3px solid #ccc;
          }
        }
        .div-click {
          cursor: pointer;
        }
      }
    }
  }
  .technological {
    overflow: hidden;
    padding: 20px;
    background: #fff;
    .technological-table {
      width: 62%;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      .btn-box {
        text-align: center;
        margin-top: 20px;
      }
      /deep/.el-table__body{
         transform: translateX(25%);
      }
    }
  }
  .button {
    width: 100px;
    height: 30px;
    padding: 0 10px;
    margin: 0 auto;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    background: rgba(252, 183, 42, 1);
    border-radius: 2px;
  }
}
</style>
<style>
.technological .technological-table .el-table__row {
     background-color: #f7fdf9 !important;
}
.technological .technological-table .el-table__header-wrapper {
  height:0
}
/* .el-table--striped .el-table__body tr.el-table__row--striped td {
     background-color: #141722;
} */
.el-table__body{
  width:62%;
}
.technological
  .technological-table
  .el-table__row
  .el-input--small
  .el-input__inner {
  height: 35px;
  line-height: 35px;
  text-align: center;
}
.information .information-center center .el-checkbox__inner {
  border-radius:50%;
}
.information .information-center center .el-checkbox{
  margin-right: 10px;
}
</style>
