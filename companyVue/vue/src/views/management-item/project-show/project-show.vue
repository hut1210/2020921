<template>
  <div class="schedule-out-box">
    <div class="information">
      <div class="button">项目信息</div>
      <div class="information-center">
        <center>
          <el-form ref="form" :model="form" label-position="right" label-width="180px">
            <el-form-item label="项目名称:" prop>
              <div class="form-div">{{form.pro_name}}</div>
            </el-form-item>
            <el-form-item label="产品名称:">
              <div class="form-div">{{form.product_name}}</div>
            </el-form-item>
            <el-form-item label="产品版本号:">
              <div class="form-div">{{form.version}}</div>
            </el-form-item>
            <el-form-item label="所属公司:">
              <div class="form-div">{{form.pro_company_name}}</div>
            </el-form-item>
            <el-form-item label="测试范围:">
              <div class="form-div" style="white-space:nowrap;">
                <el-checkbox-group v-model="form.testid">
                  <el-checkbox
                    v-for="item of checkedList"
                    :key="item.id"
                    :label="item.id"
                    disabled
                  >{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="项目经理:">
              <div class="form-div">{{form.pro_realname}}</div>
            </el-form-item>
            <el-form-item label="联系方式:">
              <div class="form-div">{{form.pro_mobile}}</div>
            </el-form-item>
            <el-form-item label="用户账号:">
              <div class="form-div div-click" @click="open(form)">
                <span class="form-label-span">{{form.pro_username}}</span> <span v-if ='$utils.getloc("group_id") == 2'>(点击在线沟通)</span>
              </div>
            </el-form-item>
          </el-form>
        </center>
      </div>
    </div>
    <div class="progress" ref="form" v-if="ispro != '已完成'">
      <div class="button">检测进度</div>
      <div class="progress-center">
        <center>
          <el-form ref="form" :model="form" label-position="right" label-width="180px">
            <el-form-item label="当前进度:">
              <el-select v-model="form.now_plan_id" class="flex" placeholder @change="selectChange">
                <el-option
                  v-for="item in form.plan_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.status == 2 ? true : false"
                ></el-option>
              </el-select>
              <el-select v-model="form.is_overdue" class="flex" placeholder>
                <el-option label="正常" value="0"></el-option>
                <el-option label="异常" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前进度说明:">
              <!-- <el-input
                type="text"
                v-model="form.tempo_explain"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input> -->
              <el-select style="width:24.3rem" 
              @change="changeProDesc" v-model="form.tempo_explain" placeholder="请选择">
                <el-option
                  v-for="item in proDescData"
                  :key="item.id"
                  :label="item.plan_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下一阶段送检准备工作:">
              <!-- <el-input
                type="text"
                v-model="form.next_content"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input> -->
              <el-select style="width:24.3rem" v-model="form.next_content" placeholder="请选择">
                <el-option
                  v-for="item in nextSubmitData"
                  :key="item.id"
                  :label="item.plan_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目进度：" v-if="showFlage">
              <el-radio-group
                v-model="form.is_end"
                style="text-align:left"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              >
                <el-radio :label="0">检测中</el-radio>
                <el-radio :label="1">检测完成</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="报告标题：" v-if="showFlage">
              <el-input
                type="text"
                v-model="form.report"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
            </el-form-item>
            <el-form-item label="报告内容：" v-if="showFlage">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.report_content"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
            </el-form-item>
            <el-form-item label="测试耗时：" v-if="showFlage">
              <el-input
                type
                v-model="form.num_day"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">天</span>
            </el-form-item>
            <el-form-item label="代码缺陷率：" v-if="showFlage">
              <el-input
                type
                v-model="form.code_bug"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">‰</span>
            </el-form-item>
            <el-form-item label="功能缺陷率：" v-if="showFlage">
              <el-input
                type
                v-model="form.function_bug"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">‰</span>
            </el-form-item>
            <el-form-item label="安全缺陷率：" v-if="showFlage">
              <el-input
                type
                v-model="form.safe_bug"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">‰</span>
            </el-form-item>
            <el-form-item label="测试轮次：" v-if="showFlage">
              <el-input
                type
                v-model="form.test_rounds"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">次</span>
            </el-form-item>
            <el-form-item label="安全方案未执行条数：" v-if="showFlage">
              <el-input
                type
                v-model="form.unexecuted"
                :disabled="$utils.getloc('group_id') == 5 ? true : false"
              ></el-input>
              <span class="item-span">条</span>
            </el-form-item>
          </el-form>
        </center>
      </div>
    </div>
    <div class="exhibition">
      <div class="button">检测流程进度排程展示</div>
      <center v-if="!flages">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in form.plan_list"
            :key="index"
            :color="activity.color"
            placement="bottom"
            :size="activity.size"
          >
            <div
              class="time-line"
              :style="{color:activity.color?activity.color:'red'}"
            >{{activity.start_time}}</div>
            <div
              :style="{color:activity.color?activity.color:'red'}"
            >{{activity.name}} ({{activity.executor == 1 ? '检测方' : '送检方'}})</div>
            <div :style="{color:activity.color?activity.color:'red'}">{{activity.tempo_explain}}</div>
            <div :style="{color:activity.color?activity.color:'red'}">{{activity.next_content}}</div>
          </el-timeline-item>
        </el-timeline>
      </center>
      <div class="technological-table" v-if="flages">
        <el-table :data="form.plan_list" style="width: 100%">
          <el-table-column prop label width="130">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder="请输入流程名称" disabled></el-input>
            </template>
          </el-table-column>
          <el-table-column label width="360">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.data"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop label width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.executor" placeholder="执行人">
                <el-option label="检测方" value="1"></el-option>
                <el-option label="送检方" value="2"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop label width="80">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.sort_order"
                placeholder="排序"
                disabled
                @blur="changeSort(scope.row.sort_order,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
        </el-table>
        <el-button style="margin-top: 20px;" @click="addPath">增加流程</el-button>
      </div>
      <div
        class="adjustment-btn"
        ref="form"
        v-show="form.is_end == 0"
        v-if="!flages || $utils.getloc('group_id') == 2"
      >
        <el-button @click="flages = true">调整排程</el-button>
      </div>
      <div class="sub-btn" ref="form" v-if="$utils.getloc('group_id') == 2">
        <el-button type="success" class="sub-btn-child" @click="preservation">保存</el-button>
        <el-button class="sub-btn-child" @click="goback">返回{{sortId}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proDescData:[],//当前进度说明数据源
      nextSubmitData:[],//下一阶段送检准备工作数据源
      ispro: this.$route.query.ispro,
      flag: true,
      flages: false,
      showFlage: false,
      id: "",
      form: {
        plan_list: [],
      },
      giveForm: {
        project_id: "",
        type: 1,
        current_plan_id: "",
        current_plan_name: "",
        current_plan_explain: "",
        current_next_content: "",
        current_status: "",
        is_end: "",
        report: "",
        report_content: "",
        plan_id: [],
        name: [],
        start_time: [],
        end_time: [],
        executor: [],
        sort_order: [],
      },
      activities: [],
      formAll: {},
      checkedList: [],
      options: [],
      lastId: "",
      sortId: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getTestrand();
    this.getcompanytype();
    this.getCont();
  },
  mounted(){
    
    this.getproDescData();
  },
  methods: {
    //联动当前进度说明
    changeProDesc(id){
      this.form.next_content = []
      this.$api.get(
        "/planNext",
        {pid: id},
        (r) => {
          this.nextSubmitData = r.data
        },
        (e) => {
            self.$message.error(e.msg)
        }
      );
    },
    open(row) {
      let self = this;
      if (self.$utils.getloc("group_id") == 5) {
        return false;
      }
      this.$store.commit("xianshi");
      var tokens = localStorage.getItem("token");
      this.$api.getTall(
        `/getFrindChat/?token=${tokens}&to_member_id=${row.pro_member}`,
        {},
        (res) => {
          let ul = res.data;
          let chat_id = "";
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].another_id == row.pro_member) {
              let index = i.toString();
              self.$store.commit("setActiveIndex", index);
              chat_id = res.data[i].chat_id;
            }
          }
          var userList = res.data;
          this.$store.commit("setList", userList);
          // 渲染用户列表
          self.$api.getTall(
            "/getChatMessage",
            {
              chat_id: chat_id,
              page: 1,
            },
            (r) => {
              self.$store.commit("setChatLeftData", r.data.list);
            }
          );
        }
      );

      // this.$message({
      //   message: '暂未开发,敬请期待',
      //   type: 'warning'
      // });
    },
    goback() {
      this.$router.go(-1);
    },
    // 获取测试范围
    getTestrand() {
      let self = this;
      self.$api.get(
        "/testrand",
        { type: "" },
        (r) => {
          let obj = {};
          for (let item in r.data) {
            obj = {};
            obj.id = item;
            obj.name = r.data[item];
            self.checkedList.push(obj);
          }
        },
        (e) => {
          self.$message.error(e.msg);
        }
      );
    },
    // 获取公司列表
    getcompanytype() {
      let self = this;
      self.$api.post("companytype", {}, (r) => {
        for (let item in r.data) {
          self.options.push(r.data[item]);
        }
      });
    },
    getCont() {
      let self = this;
      // self.sortId = 
      self.$api.get("/project/" + self.id, {}, (r) => {
        // this.sortId = r.data.now_plan_id;
        this.getproDescData(r.data.now_plan_id)
        // this.sort_order = r.data.plan_list.filter(element => element.name == text);
        // console.log(self.sortId)
        self.form = r.data;
        self.form.testid = self.form.testid.split("");
        self.form.is_overdue = self.form.is_overdue.toString();
        self.lastId = self.form.plan_list[self.form.plan_list.length - 1].id;
        if(r.data.now_plan_name == "测试完成"){
          self.showFlage = true;
        }
        if (self.form.current_plan_id == self.lastId) {
          self.showFlage = true;
        }
        for (let item of self.form.plan_list) {
          if (item.status == 1) {
            item.color = "#666";
          }
          if (item.status == 2) {
            item.color = "#ccc";
          }
          if (item.status == 3) {
            item.color = "#66CE90";
          }
          if (item.is_overdue == 1) {
            item.color = "red";
          }
          if (item.executor == 1) {
            item.size = "large";
          }
          item.executor = item.executor.toString();
          item.data = ["", ""];
          item.data = [item.start_time, item.end_time];
        }
      });
    },
    selectChange(id) {
      this.getproDescData(id)
      this.form.tempo_explain = ""
      this.form.next_content = []
      if (this.form.now_plan_id == this.lastId) {
        this.showFlage = true;
      } else {
        this.showFlage = false;
      }
    },
    // 添加流程
    addPath() {
      // this.form.plan_list.push({
      //   data: "",
      //   name: "",
      //   executor: "",
      //   sort_order: "",
      //   id: ''
      // });

      self = this;
      // console.log(self.form.plan_list.length)
      let tmpData = [];
      for (let i = 0; i < self.form.plan_list.length - 2; i++) {
        tmpData[i] = self.form.plan_list[i];
      }
      // console.log(tmpData);
      if ((self.form.plan_list.length - 11) / 3 + 2) {
        let newdata = (self.form.plan_list.length - 11) / 3 + 2;
        let newarr = ["零", "一", "二", "三", "四", "五"];
        if (newdata > 4) {
          self.$message.error("超乎我的预期了");
          return false;
        } else {
          tmpData.push({
            date: [],
            name: newarr[newdata] + "轮整改",
            executor: "2",
            sort_order: tmpData.length + 1,
          });
          tmpData.push({
            date: [],
            name: newarr[newdata + 1] + "轮环境搭建",
            executor: "2",
            sort_order: tmpData.length + 1,
          });
          tmpData.push({
            date: [],
            name: newarr[newdata + 1] + "轮测试",
            executor: "1",
            sort_order: tmpData.length + 1,
          });
          tmpData.push({
            date: [],
            name: "测试完成",
            executor: "1",
            sort_order: tmpData.length + 1,
          });
          tmpData.push({
            date: [],
            name: "测试报告",
            executor: "1",
            sort_order: tmpData.length + 1,
          });
          self.form.plan_list = tmpData;
        }
      }
    },
    preservation() {
      let self = this;
      for (let item of self.form.plan_list) {
        self.giveForm.plan_id.push(item.id);
        self.giveForm.name.push(item.name);
        self.giveForm.start_time.push(item.data[0]);
        self.giveForm.end_time.push(item.data[1]);
        self.giveForm.executor.push(item.executor);
        self.giveForm.sort_order.push(item.sort_order);
      }
      if (self.flages == true) {
        self.giveForm.type = 2;
      } else {
        self.giveForm.type = 1;
      }
      self.giveForm.project_id = self.form.project_id;
      self.giveForm.current_plan_id = self.form.now_plan_id;
      self.giveForm.current_plan_name = self.form.current_plan_name;
      self.giveForm.current_plan_explain = self.form.tempo_explain;
      self.giveForm.current_next_content = self.form.next_content;
      self.giveForm.current_status = self.form.is_overdue;
      self.giveForm.is_end = self.form.is_end;
      self.giveForm.report = self.form.report;
      self.giveForm.report_content = self.form.report_content;
      self.giveForm.num_day = self.form.num_day;
      self.giveForm.code_bug = self.form.code_bug;
      self.giveForm.function_bug = self.form.function_bug;
      self.giveForm.safe_bug = self.form.safe_bug;
      self.giveForm.test_rounds = self.form.test_rounds;
      self.giveForm.unexecuted = self.form.unexecuted;
      self.$api.put("/project/" + self.id, self.giveForm, (r) => {
        self.$message({
          message: "修改成功",
          type: "success",
        });
        setTimeout(() => {
          this.$router.push({ path: "/test-items" });
          
          // this.$router.push({ path: "/test-items-add" });
        }, 1000);
      });
    },
    //当前进度说明数据源
    getproDescData(id){
      this.$api.get(
        "/planNow",
        {id: id},
        (r) => {
          this.proDescData = r.data
        },
        (e) => {
            self.$message.error(e.msg)
        }
      );
    },
  },
  
};
</script>
<style lang="less" scoped >
.flex {
  width: 48%;
  display: inline-block;
}
.schedule-out-box {
  .item-span {
    position: absolute;
    top: 0;
    right: 10px;
    font-weight: bold;
    color: #66ce90;
    font-size: 14px;
  }

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
        width: 50%;
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
  /deep/.el-table__body {
    transform: translateX(25%);
  }
  .progress {
    width: 100%;
    height: auto;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .progress-center {
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
        }
        .div-click {
          cursor: pointer;
        }
      }
    }
  }
  /deep/.el-input__inner {
    height: 2.2rem;
  }
  .exhibition {
    width: 100%;
    height: auto;
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    .button {
      width: 175px;
    }
    center {
      width: 40%;
      margin: 40px 0 0 50%;
      .active {
        color: #ccc;
      }
      .el-timeline {
        .el-timeline-item {
          text-align: left;
        }
        .time-line {
          position: absolute;
          left: -100px;
        }
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
  .adjustment-btn,
  .sub-btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .sub-btn .sub-btn-child {
    width: 100px;
    height: 30px;
    margin-right: 20px;
  }
  .technological-table {
    width: 62%;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    .btn-box {
      text-align: center;
      margin-top: 20px;
    }
  }

  /deep/.el-input__inner {
    height: 2.2rem;
  }
}
</style>
