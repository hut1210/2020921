
<template>
  <!-- 组织结构 修改 新增-->
  <div class="organ-structure-updata sharing">
    <div class="return">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置:</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>组织结构修改</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="上级组织：" prop="organization">
              <el-select v-model="ruleForm.organization" placeholder="请选择上级组织">
                <el-option label="顶级组织" value="0"></el-option>
                <el-option
                v-for="item in optionsSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织名称：" prop="qrganizationname">
              <el-input v-model="ruleForm.qrganizationname" placeholder="请输入组织名称"></el-input>
            </el-form-item>

            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
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
      companyId: '',
      rules: {
        qrganizationname: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { max: 15, message: '长度在 15 个字符以内', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ]
      },
      newId:[],
      newName: [],
    }
  },
  created() {
      this.companyId = this.$route.params.companyId;//公司ID
      this.organId = this.$route.params.id;//组织结构ID
      this.pid = this.$route.params.pid;//上级组织结构ID
      this.type = this.$route.params.type; //新增 修改
      this.orglist(this.companyId); //新增的下拉选择
      if(this.type == 0){

      }else{
        this.editOrgan();//修改的页面数据渲染
      }

  },
  methods: {
    // 获取组织结构列表
    orglist(companyId) {
      let self = this;
      self.$api.get(
        "orglist",
        { company_id: self.companyId },
        r => {
          //self.optionsSelect = r.data.list;
          for (let i=0;i<r.data.list.length;i++){
              self.optionsSelect.push({'id':r.data.list[i].id,'name':r.data.list[i].lefthtml + r.data.list[i].name})
          }
          //console.log(self.optionsSelect)
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //点击保存
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          if(this.type == 0){
            //新增方法
            this.addOrgan(this.ruleForm);
          }else{
            //修改方法
            this.editOrganForm(this.ruleForm);
          }

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //新增方法
    addOrgan(obj) {
      let self = this;
      let pid = obj.organization,
          name = obj.qrganizationname;
      self.$api.post(
        "org",
        { company_id: self.companyId, pid: pid, name: name},
        r => {
          self.$message.success(r.message);
          self.$router.push({
              name: "organ-structure-list",
              query: {
                companyId: self.companyId
              }
            });
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //修改渲染方法
    editOrgan() {
      let self = this;
      self.$api.get(
        "org/"+self.organId,
        {},
        r => {
            self.ruleForm.organization = r.data.pid
            self.ruleForm.qrganizationname = r.data.name
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },
    //修改提交方法
    editOrganForm(obj) {
      let self = this;
      let name = obj.qrganizationname,
          parentId = obj.organization;
      self.$api.post(
        "orginfo/"+self.organId,
        {name:name,pid:parentId,company_id:self.companyId},
        r => {
            self.$message.success(r.message);
            self.$router.push({
              name: "organ-structure-list",
              query: {
                companyId: self.companyId
              }
            });
        },
        e => {
          self.$message.error(e.message);
        }
      );
    },


  },
  mounted: function () {

  }
}
</script>
<style lang="less" src="../sharing.less"></style>
<style lang="less" src="./organ-structure-updata.less">
