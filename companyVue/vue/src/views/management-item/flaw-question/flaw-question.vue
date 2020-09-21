<template>
<!-- 缺陷问题 -->
  <div class="organ-structure-updata sharing">
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
            <el-form-item label="缺陷问题名称：" prop="organization">
              <el-input v-model="ruleForm.qrganizationname" placeholder="请输入缺陷问题名称"></el-input>
            </el-form-item>
            <el-form-item label="缺陷问题标签：" prop="qrganizationname">
              <el-input v-model="ruleForm.qrganizationname" placeholder="请输入缺陷问题标签"></el-input>
            </el-form-item>
             <el-form-item label="缺陷问题内容：" prop="qrganizationname">
              <el-input type="textarea" style="width:458px;height:243.2px" v-model="ruleForm.qrganizationname" placeholder="请输入缺陷问题内容"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="primary" @click="blak">返回</el-button>
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
        organization: '', // 上级组织
        qrganizationname: '' // 组织名称
      },
      rules: {
        qrganizationname: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    blak () {
      this.$router.go(-1)
    }
  },
  mounted: function () {}
}
</script>
<style lang="less" src="../sharing.less"></style>
<style lang="less" src="./flaw-question.less">
