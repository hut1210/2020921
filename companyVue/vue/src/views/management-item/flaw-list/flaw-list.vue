//缺陷列表
<template>
    <div class="main company-main">
        <!-- 顶部 -->
        <div class="mainHead">
            <!-- 面包屑导航 -->
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item><i class="el-icon-caret-right"></i>当前位置：</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }"> 河南省电力公司</el-breadcrumb-item>
                        <el-breadcrumb-item class="beforeloca">问题列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            <!-- 搜素框 -->
            <div class="searchBox">
                <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
                    <div class="search-input">
                        <el-form-item label="关键词:">
                            <el-input v-model="form.word" placeholder="项目名称/产品名称/项目经理"></el-input>
                        </el-form-item>
                        <el-button class="btn-query"  @click="onSubmit">搜索</el-button>
                        <div class="btn-add" @click="addCompanyList">新增</div>
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
                <el-table-column prop="companty" label="缺陷名称" width=""></el-table-column>
                <el-table-column prop="organization" label="缺陷标签" width=""></el-table-column>
                <el-table-column prop="business" label="时间" width=""></el-table-column>
                <el-table-column label="操作" width="">
                    <template slot-scope="scope">
                        <div class="operation">
                            <span class="oper_edit" @click="editRow(scope.row)">修改</span>
                            <span class="oper_delet" @click="deleteRow(scope.row)">删除</span>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>

        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper"
        :total="1000">
        </el-pagination>


    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      form:{
        compty: '',
        word: ''
      },
      options:[{
        lable: '1',
        value: '组织1',
      },{
        lable: '2',
        value: '组织2',
      }],
      tableData:[{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      },{
          companty: '北京通信技术有限公司',
          organization: '组织1-结构1',
          business: '软件安全测试',
          addTime: '2020-06-10',
          address: '北京市海淀区西直门',
      }],
        currentPage: 5,
    }
  },
  created () {
  },
  methods: {
    //表头背景色
    getClass() {
        return "background: #66CE90FF";
    },
    //查询
    onSubmit(){

    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    //新增
    addCompanyList(){
        this.$router.push({
            name: 'updata-company-info',
        })
    },
    //修改
    editRow(row){
        let id = row.id;
        this.$router.push({
            name: 'modify-problem',
            params: {
                id: id
            }
        })
    },
    //删除
    deleteRow(){

    },
  }
}
</script>

<style lang="less" scoped src="./flaw-list.less"></style>
