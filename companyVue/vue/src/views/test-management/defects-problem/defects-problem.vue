<template>
<!-- 缺陷问题 -->
  <div class="organ-structure-updata sharing defects-problem">
    <div class="return">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>缺陷问题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="缺陷问题名称：" prop="title">
              <el-input v-model="ruleForm.title" placeholder="请输入缺陷问题名称"></el-input>
            </el-form-item>
            <el-form-item label="缺陷问题标签：" prop="classify">
              <el-input v-model="ruleForm.classify" placeholder="请输入缺陷问题标签"></el-input>
            </el-form-item>
             <el-form-item label="缺陷问题内容：" prop="contents">
              <el-input type="textarea" :rows="6" style="width:386px;height:150px" v-model="ruleForm.contents" placeholder="请输入修改问题内容"></el-input>
            </el-form-item>
            <el-button type="primary" v-if="type != 2" class="success" @click="submitForm('ruleForm')" style="display:inline-block !important;">保存</el-button>
            <el-button type="primary" v-if="type != 2" class="fail" @click="blak"  style="display:inline-block !important;background:#eee ;">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      optionsSelect: [],
      ruleForm: {
        title: '', // 名称
        classify: '', // 标签
        contents: ''//内容
      },
      rules: {
        title: [
          { required: true, message: '请输入修改问题标签', trigger: 'blur' }
        ],
        classify: [
          { required: true, message: '请输入修改问题内容', trigger: 'blur' },
          { max: 10, message: '长度在 10个字符', trigger: 'blur' }
        ],
        contents: [
          { required: true, message: '请输入修改名称', trigger: 'blur' }
        ]
      },
      type: ''
    }
    
  },
  created(){
    this.id = this.$route.params.id;//问题ID
    this.type = this.$route.params.type;//新增 修改
    if(this.type == 0){
      this.projectId = this.$route.params.projectId;//项目ID
    }else{
      this.getList(this.id);//获取修改内容
    }
  },
  methods: {
    // 获取修改的当前问题
    getList(id){
        let self = this
        self.$api.get(
            'defect/'+id,
            {},
            r => {
               self.ruleForm = r.data;
            },
            e => {
                self.$message.error(e.message)
            }
        )
    },
    //提交修改内容
    formDate(obj){
        let self = this;
        let title=obj.title,
              classify=obj.classify,
              contents=obj.contents;
        self.$api.put(
            'defect/'+self.id,
            {title:title,classify:classify,contents:contents},
            r => {
               self.$message.success(r.message)
            },
            e => {
                self.$message.error(e.message)
            }
        )
    },
    //提交修改内容
    addformDate(obj){
        let self = this;
        let title=obj.title,
              classify=obj.classify,
              contents=obj.contents;
        self.$api.post(
            'defect',
            {title:title,classify:classify,contents:contents,project_id:self.projectId},
            r => {
               self.$message.success(r.message)
            },
            e => {
                self.$message.error(e.message)
            }
        )
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          if(this.type == 0){
            //新增
            this.addformDate(this.ruleForm);
          }else{
            //修改
            this.formDate(this.ruleForm);
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.$router.push({path:('/defect-list'),query:{projectId:this.projectId}})
    },
    blak () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    
  }
}
</script>
<style>
.defects-problem .el-textarea {
  width: 32.125rem !important;
}
.defects-problem .el-textarea__inner {
  width: 32.125rem;
}
</style>
<style lang="less" src="./sharing.less"></style>
<style lang="less" src="./defects-problem.less">
