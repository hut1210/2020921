//问题列表
<template>
    <div class="main company-main">
        <!-- 顶部 -->
        <div class="mainHead">
            
            <!-- 搜素框 -->
            <div class="searchBox">
              <!-- 面包屑导航 -->
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item><i class="el-icon-caret-right"></i>当前位置：</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }"> 河南省电力公司</el-breadcrumb-item>
                        <el-breadcrumb-item class="beforeloca">问题列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                    <div class="search-input">
                        <el-form-item label="">
                            <el-input v-model="form.word" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-button class="btn-query"  @click="onSubmit">搜索</el-button>
                        <div class="btn-add" v-if='$utils.getloc("group_id") == 2' @click="addCompanyList">新增</div>
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
                <el-table-column prop="title" label="问题名称" width=""></el-table-column>
                <el-table-column prop="classify" label="问题标签" width=""></el-table-column>
                <el-table-column prop="addtime" label="时间" width=""></el-table-column>
                <el-table-column label="操作" width="">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="oper_edit" v-if='$utils.getloc("group_id") == 5' @click="lookRow(scope.row)">查看</span>
                            <span class="oper_edit" v-if='$utils.getloc("group_id") == 2' @click="editRow(scope.row)">修改</span>
                            <span class="oper_delet" v-if='$utils.getloc("group_id") == 2' @click="deleteRow(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
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
  name: 'home',
  data () {
    return {
      form: {
        compty: '',
        word: ''
      },
      options: [{
        lable: '1',
        value: '组织1'
      }, {
        lable: '2',
        value: '组织2'
      }],
      tableData: [],
      id: '',
      pid:"",
      pageIndex: 1,
      total: 0,
      pageSize:10,  

    }
  },
  created () {
    this.id = this.$route.query.id
    this.getQuestionList();
  },
  mounted: function () {
    this.getQuestionList();
  },
  methods: {
    // 表头背景色
    getClass () {
      return 'background: #66CE90FF'
    },
    // 获取列表
    getQuestionList () {
      let self = this
      var token = localStorage.getItem('token')
      this.$api.get('/problemlist', 
      {
        project_id: this.id,
        page:this.pageIndex,
        pagesize:this.pagesize,
        keyword: this.form.word,
      },
      r => {
                //console.log(r.data);
                self.tableData = r.data.data
                self.total = r.data.total_count
            },
            e => {
                self.$message.error(e.message)
            }
    )
  },
    // 查询
    onSubmit () {
      this.getQuestionList()

    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageIndex=val
      this.getQuestionList()
      console.log(`当前页: ${val}`)
    },
    // 新增
    addCompanyList () {
      this.$router.push({path: ('/new-problems'), query: {id: this.id} })
    },
    // 修改
    editRow (row) {
      let id = row.id
      this.$router.push({path: ('/modify-problem'), query: {id: id}})
    },
    lookRow (row) {
      let id = row.id
      this.$router.push({path: ('/modify-problem'), query: {id: id,type:2}})
    },
    
    // 删除
    deleteRow (row) {
     let id = row.id
     var token = localStorage.getItem('token')
     this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let self = this;
            self.$api.delete(
                '/problem/'+id,
                {},
                
                r => {
                    this.$message({
                        message: r.message,
                        type: "success"
                    });
                    this.getQuestionList();
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
    //  this.change()
    },
    // 更新数据
    change(){
      var token = localStorage.getItem('token')
      let obj ={
       token:token
     }
      this.$api.get("/problem/2",obj,(res)=>{
        console.log(res)
        this.tableData=res.data.data
     })
    }
  }
}
</script>

<style lang="less" scoped src="./question-list.less"></style>
