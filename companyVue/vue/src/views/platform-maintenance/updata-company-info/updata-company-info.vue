
<template>
  <!-- 新增 修改 公司信息 -->
  <div class="updata-company-info sharing">
    <div class="return">
      <div class="return-box" @click="goBack">返回列表</div>
    </div>
    <!-- tab标签 -->
    <div class="skillby-tab">
      <!-- 查询 -->
      <div class="search_box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <div class="search-input">
            <el-form-item label="公司名称：" prop="company_name">
              <el-input v-model="ruleForm.company_name" placeholder="输入公司名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="公司类型：" prop="type">
              <el-select v-model="ruleForm.type" clearable placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人：" prop="company_person">
              <el-input v-model="ruleForm.company_person" placeholder="输入负责人" clearable></el-input>
            </el-form-item>
            <el-form-item label="负责人电话：" prop="company_person_tel">
              <el-input v-model="ruleForm.company_person_tel" placeholder="输入负责人电话" clearable></el-input>
            </el-form-item>
            <el-form-item label="公司地址：" prop="company_addr">
              <el-input v-model="ruleForm.company_addr" placeholder="输入公司地址" clearable></el-input>
            </el-form-item>

            <el-form-item label="业务范围：" prop="company_rand">
              <el-input type="textarea" style="height: 120px;" class="textarea" v-model="ruleForm.company_rand" placeholder="输入业务范围" clearable></el-input>
            </el-form-item>

            <el-button type="primary" style="display:block;" @click="submitForm('ruleForm')">保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsSelect: [],
      ruleForm: {
        company_name: "", //公司名称：
        type: "", //组织架构：
        company_person: "", //负责人：
        company_person_tel: "", //负责人电话：
        company_addr: "",//公司地址：
        company_rand: "" //业务范围：
      },
      options:[{
        value: '1',
        label: '送检（项目经理）',

      },{
        value: '2',
        label: '检测（检测经理）',
      }],
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 3 个字符", trigger: "blur" }
        ],
        type:{required: true, message: "请选择公司类型", trigger: "blur" },
        company_person:{required: true, message: "请输入负责人", trigger: "blur" },
        company_person_tel:{required: true, message: "请输入负责人联系方式", trigger: "blur" },
      }
    };
  },
  created () {
    this.c_id = this.$route.params.id;//公司ID

    if(this.c_id == undefined ){
      //新增进入
    }else{
      this.getCompanymsg(this.c_id);//修改进入
    }

  },
  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    //获取公司信息
    getCompanymsg(id){
      let self = this;
      self.$api.get(
          'company/'+id,
          {},
          r => {
            //console.log(r.data);
            self.ruleForm.company_name = r.data.company_name,
            self.ruleForm.company_person = r.data.company_person,
            self.ruleForm.company_person_tel = r.data.company_person_tel,
            self.ruleForm.company_addr = r.data.company_addr,
            self.ruleForm.company_rand = r.data.company_rand
            if( r.data.type == 1){
              self.ruleForm.type = '送检（项目经理）'
            }else{
              self.ruleForm.type = '检测（检测经理）'
            }
          },
          e => {
              self.$message.error(e.message)
          }
      )
    },
    //提交保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {

          if(this.c_id == undefined ){
            //新增数据方法
            this.addCompany(this.ruleForm);
          }else{
            //修改数据方法
            this.formConpanymsg(this.ruleForm);
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //提交修改内容
    formConpanymsg(obj){
        let self = this;
        if(obj.type == '送检（项目经理）'){
              self.type = 1;
          }else{
              self.type = 2;
          }
          let company_name=obj.company_name,
              company_person=obj.company_person,
              company_person_tel=obj.company_person_tel,
              company_addr=obj.company_addr,
              company_rand=obj.company_rand,
              type=self.type;
        self.$api.post(
            'companyinfo/'+this.c_id,
            {company_name:company_name,type:type,company_person:company_person,company_person_tel:company_person_tel,company_addr:company_addr,company_rand:company_rand},
            r => {
              //console.log(r);
              self.$message.success(r.message)
              self.$router.push({
                name: "company-list",
              });
            },
            e => {
                self.$message.error(e.message)
            }
        )
    },

    //提交新增
    addCompany(obj){
      let self = this;
      let company_name=obj.company_name,
              company_person=obj.company_person,
              company_person_tel=obj.company_person_tel,
              company_addr=obj.company_addr,
              company_rand=obj.company_rand,
              type=obj.type;
      self.$api.post(
          'company',
          {company_name:company_name,type:type,company_person:company_person,company_person_tel:company_person_tel,company_addr:company_addr,company_rand:company_rand},
          r => {
            //console.log(r);
            self.$message.success(r.message)
            self.$router.push({
              name: "company-list",
            });
          },
          e => {
              self.$message.error(e.message)
          }
      )
    }

  },
  mounted: function() {

  }
};
</script>
<style lang="less" src="../sharing.less"></style>
<style lang="less" src="./updata-company-info.less"></style>
