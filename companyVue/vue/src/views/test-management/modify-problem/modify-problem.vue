<template>
<!-- 修改问题 -->
  <div class="organ-structure-updata nodifyP sharing">
    <div class="return">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改问题</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="修改问题名称：" prop="organization">
              <el-input v-model="ruleForm.title" placeholder="请输入修改问题名称"></el-input>
            </el-form-item>
            <el-form-item label="修改问题标签：" prop="qrganizationname">
              <el-input v-model="ruleForm.classify" placeholder="请输入修改问题标签"></el-input>
            </el-form-item>
             <el-form-item label="修改问题内容：" prop="qrganizationname">
              <el-input type="textarea" :rows="6" style="width:386px;height:150px" v-model="ruleForm.contents" placeholder="请输入修改问题内容"></el-input>
            </el-form-item>
            <el-button type="primary" v-if="type != 2" class="success" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="primary" v-if="type != 2" class="fail" @click="blak">返回</el-button>
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
      id:"",
      type:"",
      ruleForm: {
        
      },
      // rules: {
      //   qrganizationname: [
      //     { required: true, message: '请输入修改问题标签', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   qrganizationnames: [
      //     { required: true, message: '请输入修改问题内容', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   organization: [
      //     { required: true, message: '请输入修改名称', trigger: 'change' }
      //   ]
      // }
    }
  },
  created() {
    
     this.id = this.$route.query.id
     this.type = this.$route.query.type
    this.getquest () 
  },
  methods: {
    //编辑详情
    getquest () { // 
      let id = this.id;
      this.$api.get(
        '/problem/'+id, 
        {},
     
        r => { 
        this.ruleForm = r.data;
        
        console.log(r.data)
      },
      e => {
        this.$message.error(e.msg);
        }
      )
    },
    //更新保存
    submitForm (formName) {
      let self = this;
      self.$api.post(
        '/probleminfo/'+this.id,
        self.ruleForm,
        r => {
          this.$message({
            message: r.message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({path: ('/question-list'), query: {id: self.ruleForm.project_id} })
            
          }, 500);
        },
        e => {
          self.$message.error(e.msg);
        }
      );
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
.nodifyP .el-textarea {
  width: 32.125rem !important;
}
.nodifyP .el-textarea__inner {
  width: 32.125rem;
}
</style>

<style lang="less" src="./sharing.less"></style>
<style lang="less" src="./modify-problem.less">
