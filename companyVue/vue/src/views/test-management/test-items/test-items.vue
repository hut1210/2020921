//项目列表
<template>
  <div class="main company-main">
    <!-- 顶部 -->
    <div class="mainHead">
      <!-- 搜素框 -->
      <div class="searchBox">
        <el-form :inline="true" ref="formList" :model="formList" class="demo-form-inline">
          <div class="search-input">
            <el-form-item label="公司:">
              <el-select v-model="formList.pro_company" placeholder="请选择">
                <el-option>请选择</el-option>
                <el-option
                  v-for="item in options"
                  :key="item.c_id"
                  :label="item.company_name"
                  :value="item.c_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词:">
              <el-input v-model="formList.keyword" placeholder="项目名称/产品名称/项目经理"></el-input>
            </el-form-item>
            <el-button class="btn-query" @click="onSubmit">搜索</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="dataList">
      <el-table :data="tableData" :header-cell-style="getClass" style="width: 100%">
        <el-table-column prop="product_name,version" label="产品名称(版本)">
          <template slot-scope="scopes">
            <div>{{scopes.row.product_name}} ({{scopes.row.version}})</div>
          </template>

        </el-table-column>
        <el-table-column prop="company_id" label="所属公司"></el-table-column>
        <el-table-column prop="pro_realname" label="项目经理">
          <template slot-scope="scope">
            <div style="cursor: pointer;" @click="talkBoss(scope.row)">{{scope.row.pro_realname}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="申请时间"></el-table-column>
        <el-table-column prop="test_realname" v-if="$utils.getloc('group_id') == 5" label="检测负责人"></el-table-column>
        <el-table-column prop="test_company_id" v-if="$utils.getloc('group_id') == 5" label="检测单位"></el-table-column>
        <el-table-column prop="status" label="当前阶段"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <div class="operation">
              <!-- <span class="oper_company" @click="problemList(scope.row)">问题列表</span> -->
              <!-- <span class="oper_company" @click="flawList(scope.row)">缺陷列表</span> -->
              <span
                class="oper_edit"
                v-if="$utils.getloc('group_id') == 5"
                @click="editRow(scope.row)"
              >查看</span>
              <span
                class="oper_edit"
                v-if="$utils.getloc('group_id') == 2"
                @click="editRow(scope.row)"
              >修改</span>
              <span
                class="oper_delet"
                v-if="$utils.getloc('group_id') == 2"
                @click="deleteRow(scope.row)"
              >删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      prev-text="上一页"
      next-text="下一页"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      form: {
        compty: "",
        word: "",
      },
      formList: {
        keyword: "",
        pro_company: "",
        page: 1,
        pagesize: 10,
        status: "",
      },
      total: 0,
      options: [],
      tableData: [],
      userList: [],
    };
  },
  created() {
    if (this.$route.query.status != "") {
      this.formList.status =
        this.$route.query.status == 0 ? "" : this.$route.query.status;
    }
    this.getCompany();
    this.getCompanytype();
  },
  watch: {
    $route(to, from) {
      if (this.$route.query.status != "") {
        this.formList.status =
          this.$route.query.status == 0 ? "" : this.$route.query.status;
      }
      this.getCompany();
      this.getCompanytype();
    },
  },

  methods: {
    //公司
    getCompany() {
      this.$api.post(
        "/companytype",
        { type: '' },
        (r) => {
          if (r.errcode == 0) {
            this.options = r.data;
          }
        },
        (e) => {
          //   self.$message.error(e.msg)
        }
      );
    },
    //列表
    getCompanytype() {
      let self = this;
      //console.log(self.formList.keyword);
      //console.log(self.formList);
      // self.formList.pro_company = 1;
      self.$api.get(
        "project",
        self.formList,
        (r) => {
          self.tableData = r.data.data ? r.data.data : r.data;
          if (self.tableData.length > 0) {
            for (let item of self.tableData) {
              for (let items in self.options) {
                if (item.test_company_id == self.options[items].c_id) {
                  item.test_company_id = self.options[items].company_name;
                }
                if (item.company_id == self.options[items].c_id) {
                  item.company_id = self.options[items].company_name;
                }
                if (item.status == 2) {
                  item.status = "已完成";
                } else if (item.status == 1) {
                  item.status = item.project_plan_name;
                }
              }
            }
            self.total = Number(r.data.total_count);
          } else {
            self.total = 0;
          }
        },
        (e) => {
          self.$message.error(e.msg);
          self.total = Number(0);
        }
      );
    },
    // 表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    //与项目经理会谈
    talkBoss(row) {
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
    },
    // 查询
    onSubmit() {
      this.getCompanytype();
    },
    handleSizeChange(val) {
      this.formList.pagesize = val;
      this.getCompanytype();
    },
    handleCurrentChange(val) {
      this.formList.page = val;
      this.getCompanytype();
    },
    // 新增
    addCompanyList() {
      this.$router.push({
        name: "test-items-add",
      });
    },
    // 修改
    editRow(row) {
      console.log(row);
      let id = row.id;
      this.$router.push({
        path: "/project-show",
        query: {
          id: id,
          ispro: row.status,
        },
      });
    },
    // 删除
    deleteRow(val) {
      let id = val.id;
      let self = this;
      self
        .$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          self.$api.delete(
            "/project/" + id,
            {},

            (r) => {
              this.$message({
                message: r.message,
                type: "success",
              });
              this.getCompanytype();
            },
            (e) => {
              self.$message.error(e.msg);
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 问题列表
    problemList(row) {
      this.$router.push({ path: "/question-list", query: { id: row.id } });
    },
    //缺陷列表
    flawList(row) {
      let projectId = row.id,
        conpanyName = row.pro_name;
      console.log(row);
      this.$router.push({
        path: "/defect-list",
        query: {
          projectId: projectId,
          conpanyName: conpanyName,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped src="./test-items.less"></style>
