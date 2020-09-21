//组织结构列表
<template>
  <div class="main organStructure-main">
    <!-- 顶部 -->
    <div class="mainHead">
      <div class="searchBox clearfix">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
              <i class="el-icon-caret-right"></i>当前位置：
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/company-list' }">{{company_name}}</el-breadcrumb-item>
            <el-breadcrumb-item class="beforeloca">组织架构</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="btn-add" @click="addOrganStructure">添加</div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="dataList">
      <el-table
        :data="tableData"
        row-key="id"
        default-expand-all
        :header-cell-style="getClass"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        height="49.3rem"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="name" label="组织名称" width>
          <template slot-scope="scope">
            <div class="organization" :style=" {'padding-left': scope.row.leftpin +'px'}">
              {{scope.row.lefthtml}}{{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width>
          <template slot-scope="scope">
            <div class="operation">
              <span class="oper_edit" @click="editRow(scope.row)">修改</span>
              <span class="oper_delet" @click="deleteRow(scope.row)">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      companyId: '',
      company_name: ''
    };
  },
  created() {
      this.companyId = this.$route.query.companyId;
      this.company_name = this.$route.query.companyName;
      this.orglist();
  },
  methods: {
    //表头背景色
    getClass() {
      return "background: #66CE90FF";
    },
    //新增
    addOrganStructure() {
      this.$router.push({
        name: "organ-structure-updata",
        params: {
          companyId: this.companyId,
          id: 0,
          type: 0,
          pid:0
        }
      });
    },
    //修改
    editRow(row) {
      let id = row.id,
          pid = row.pid;
      this.$router.push({
        name: "organ-structure-updata",
        params: {
          companyId: this.companyId,
          id: id,
          pid:pid,
          type: 1
        }
      });
    },
    //删除
    deleteRow(row) {
      let id = row.id;
      this.deletRow(id);
    },
    // 获取组织结构列表
    orglist() {
      
      let self = this;
      self.$api.get(
        "orglist",
        { company_id: self.companyId },
        r => {
          //console.log(r);
          self.tableData = r.data.list;
          self.tableData.children = r.data.company_data;
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //删除方法
    deletRow(id) {
      let self = this;
      self.$confirm('此操作将删除此条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            self.$api.delete(
                "org/"+id,
                {},
                r => {
                    self.$message({
                        type: 'success',
                        message: r.message
                    });
                    self.orglist();
                },
                e => {
                    self.$message.error(e.message);
                }
            );
        }).catch(() => {
            self.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });




      
    },



  },
  mounted(){
    
  }
};
</script>

<style lang="less">
.organStructure-main {
  .el-breadcrumb__item:first-child {
    .el-icon-arrow-right {
      display: none;
    }
  }
  .el-breadcrumb__inner {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #66ce90ff;
  }
}
</style>
<style lang="less" scoped src="./organ-structure-list.less"></style>