//缺陷列表
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
                        <el-breadcrumb-item :to="{ path: '/' }"> {{pro_name}}</el-breadcrumb-item>
                        <el-breadcrumb-item class="beforeloca">缺陷列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                    <div class="search-input">
                        <el-form-item label="关键词:">
                            <el-input v-model="form.word" placeholder="项目名称/产品名称/项目经理"></el-input>
                        </el-form-item>
                        <el-button class="btn-query"  @click="onSubmit">搜索</el-button>
                        <div class="btn-add" v-if='$utils.getloc("group_id") == 2'  @click="addCompanyList">新增</div>
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
                <el-table-column prop="title" label="缺陷名称" width=""></el-table-column>
                <el-table-column prop="classify" label="缺陷标签" width=""></el-table-column>
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
      form:{
        word: ''
      },
      options:[{
        lable: '1',
        value: '组织1',
      },{
        lable: '2',
        value: '组织2',
      }],
      tableData:[],
      pageIndex:1,
      total: 0,
      pro_name:''
    }
  },
  created () {
      this.projectId =  this.$route.query.projectId;//项目ID
      this.pro_name = this.$route.query.conpanyName;//项目名
      this.getList(this.projectId);
  },
  methods: {
    //表头背景色
    getClass() {
        return "background: #66CE90FF";
    },
    //查询
    onSubmit(){
        this.getList(this.projectId);
    },
    //分页
    handleCurrentChange(val) {
        this.pageIndex = val;
        this.getList();
    },
    //新增
    addCompanyList(){
        let id = 0;
        this.$router.push({
            name: 'defects-problem',
            params: {
                id: id,
                type:0,
                projectId:this.projectId
            }
        })
    },
    //修改
    editRow(row){
        let id = row.id;
        this.$router.push({
            name: 'defects-problem',
            params: {
                id: id,
                type:1
            }
        })
    },
    //查看
    lookRow(row){
        let id = row.id;
        this.$router.push({
            name: 'defects-problem',
            params: {
                id: id,
                type:2
            }
        })
    },
    //删除
    deleteRow(row){
        let id = row.id;
        this.deleteCompany(id);
    },
    //删除方法
    deleteCompany(id){
        let self = this;
        self.$confirm('此操作将删除此条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            self.$api.delete(
                'defect/'+id,
                {},
                r => {
                    self.$message({
                        type: 'success',
                        message: r.message
                    });
                    self.getList();

                },
                e => {
                    self.$message.error(e.message)
                }
            )
        }).catch(() => {
            self.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },

    //获取缺陷列表
    getList(){
        let self = this
        self.$api.get(
            'defect',
            {page:self.pageIndex,pagesize:10,project_id:self.projectId,keyword:self.form.word},
            r => {
                //console.log(r.data.total_count);
                self.tableData = r.data.data
                self.total = r.data.total_page
            },
            e => {
                self.$message.error(e.message)
            }
        )
    },




  }
}
</script>

<style lang="less" scoped src="./defect-list.less"></style>
