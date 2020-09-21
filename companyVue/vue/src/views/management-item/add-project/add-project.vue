
<template>
  <div class="test-items-add-out-box">
        <div class="information">
            <div class="button">项目信息</div>
            <div class="information-center">
                <center>
                    <el-form ref="form" :model="form" label-position="right" label-width="180px">
                        <el-form-item label="项目名称:" prop="">
                            <el-input v-model="form.entryName"></el-input>
                        </el-form-item>
                        <el-form-item label="产品名称:">
                            <el-input v-model="form.productNme"></el-input>
                        </el-form-item>
                        <el-form-item label="产品版本号:">
                            <el-input v-model="form.editionName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属公司:">
                            <el-input v-model="form.company"></el-input>
                        </el-form-item>
                        <el-form-item label="测试范围:">
                            <el-checkbox v-model="checkedList.safe">安全性</el-checkbox>
                            <el-checkbox v-model="checkedList.infiltration">渗透测试</el-checkbox>
                            <el-checkbox v-model="checkedList.code">代码扫描</el-checkbox>
                            <el-checkbox v-model="checkedList.test">安全防护方案测试</el-checkbox>
                        </el-form-item>
                        <el-form-item label="项目经理:">
                            <el-input v-model="form.manager"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式:">
                            <el-input v-model="form.tel"></el-input>
                        </el-form-item>
                    </el-form>
                </center>
            </div>
        </div>
        <div class="technological">
            <div class="button">检测流程排程</div>
            <div class="technological-table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop=""
                        label=""
                        width="200">
                      <template slot-scope="scope">
                          <span v-if="!scope.row.flag">{{scope.row.name}}</span>
                          <el-input v-if="scope.row.flag" v-model="scope.row.name"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label=""
                        width="500">
                            <el-date-picker
                                v-model="tableData.date"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="">
                            <el-select v-model="tableData.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
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
      checkedList: {
        safe:false,
        infiltration:false,
        code:false,
        test:false
      },
      form: {
        entryName: "",
        productNme: "",
        editionName: "",
        company: "",
        manager: "",
        tel: ""
      },
      formData: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "提交测试",
          address: "上海市普陀区金沙江路 1518 弄",
          region: ""
        },
        {
          date: "2016-05-04",
          name: "资料审核",
          address: "上海市普陀区金沙江路 1517 弄",
          region: ""
        },
        {
          date: "2016-05-01",
          name: "资料整改",
          address: "上海市普陀区金沙江路 1519 弄",
          region: ""
        },
        {
          date: "2016-05-03",
          name: "测试排期",
          address: "上海市普陀区金沙江路 1516 弄",
          region: ""
        },
        {
          date: "2016-05-03",
          name: "一轮环境搭建",
          address: "上海市普陀区金沙江路 1516 弄",
          region: ""
        },
        {
          date: "2016-05-03",
          name: "一轮测试",
          address: "上海市普陀区金沙江路 1516 弄",
          region: ""
        }
      ]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    onSubmit() {},
    addPath() {
      this.tableData.push({
        flag: true,
        date: "",
        name: "",
        address: "",
        region: ""
      });
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
      width: 60%;
      margin: 0 auto;
      text-align: center;
      // border: 1px solid #ccc;
      padding: 20px;
      // border-radius: 15px;
      .btn-box {
        text-align: center;
        margin-top: 20px;
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
