<template>
  <!-- <div>基本设置</div> -->
  <div class="basic-setup">
    <div v-if='$utils.getloc("group_id") == 0 && type!=1 && type!=3 ' class="search_box1">
         <div class="sure-message">
              <p> <img class="headerimg" id="logoid" src="@/images/nozhizhi.png" alt=""/>
            </p> 
              <p>还没有认证公司信息，快去认证吧</p>
              <el-button size="medium" type="primary" class="primarybut" @click="submitattestation">去认证</el-button
            >

         </div>
    </div>
    <div v-if='$utils.getloc("group_id") == 0 && type=="1"' class="search_box1">
      <div class="sure-message">
           <p> <img class="headerimg" id="logoid" src="@/images/nozhizhi.png" alt=""/>
         </p> 
           <p style="margin-left:-2rem">公司资质认证审核中</p>
           <el-button size="medium" type="primary" class="primarybut" @click="submitattestation(type)">查看认证信息</el-button
         >

      </div>
 </div>
 <div v-if='$utils.getloc("group_id") == 0 && type=="3"' class="search_box1">
  <div class="sure-message">
       <p> <img class="headerimg" id="logoid" src="@/images/nozhizhi.png" alt=""/>
     </p> 
       <p>公司资质认证未通过，请重新申请</p>
       <el-button size="medium" type="primary" class="primarybut" @click="submitattestation(type)">重新申请</el-button
     >

  </div>
</div>
    <div  v-if='$utils.getloc("group_id") == 1' class="search_box">
      <div class="search-box-buttom">
        <p class="top-title">账户概览:</p>
        <div class="wait-list">
          <div>
            <p>账户总余额</p>
            <p><span class="canuse-first">$78999.87</span></p>
          </div>
          <div>
            <p></p>
            <p>可用余额<span>68999.87</span></p>
          </div>
          <div>
            <p></p>
            <p class="m-arrive">不可用余额<span>$10000.11</span></p>
          </div>
          <div calss="use-hand" style="margin-top:6.35rem">
            <el-button size="medium" round @click="ModifyWindow = true">充值</el-button>
            <el-button size="medium" round @click="ModifyWindow1 = true">提现</el-button>
            <el-button size="medium" round @click="ModifyWindow2 = true">代付</el-button>
          </div>
        </div>
       
      </div>
      <div class="search-box-top">
        <!-- <p class="top-title">待办事项：</p> -->
        <div class="wait-list">
          <div>
            <p>昨日订单数</p>
            <p>3<span>笔</span></p>
          </div>
          <div>
            <p>昨日订单金额</p>
            <p>45633<span>元</span></p>
          </div>
          <div>
            <p>待审核充值</p>
            <p>3<span>笔</span></p>
          </div>
          <div>
            <p>待审核代付</p>
            <p>3<span>笔</span></p>
          </div>
         
          <div>
            <p>待审核提现</p>
            <p class="m-arrive">3<span>笔</span></p>
          </div>
        </div>
      </div>
      
    </div>
    <!-- 充值弹窗 -->
    <Modal
      class="noDesign"
      :show="ModifyWindow"
      width="59.25rem"
      :title="Topupapplication"
      @hideModal="hideModal"
    >
      <div class="modify-window">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="search-input">
            <el-form-item label="充值币种：" >
                <el-select v-model="ruleForm.username" placeholder="充值币种">
                  <el-option label="美元" value="美元"></el-option>
                  <el-option label="人民币" value="人民币"></el-option>
                  <el-option label="卢比" value="卢比"></el-option>
                  <el-option label="英镑" value="英镑"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="充值金额：" prop="money">
              <el-input
                v-model="ruleForm.money"
                placeholder="输入充值金额："
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="充值服务费：" prop="mobile">
             <span  class="recivemoney"</span>
            </el-form-item>
            <el-form-item label="到账币种：" >
              <el-select v-model="ruleForm.username" placeholder="到账币种">
                <el-option label="美元" value="美元"></el-option>
                <el-option label="人民币" value="人民币"></el-option>
                <el-option label="卢比" value="卢比"></el-option>
                <el-option label="英镑" value="英镑"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="到账金额：" prop="realname">
                <span class="recivemoney">约$899.22</span>
          </el-form-item>
          <el-form-item>
          到账金额=（充值金额-充值服务费）*到账币种当日汇率，实际到账
          金额以充值当日汇率计算结果为准
        </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="primarybut"
                @click="submitForm('ruleForm')"
                >确认充值</el-button
              >
              <el-button type="info" class="down" @click="hideModal()"
                >关闭</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </Modal>
    <!-- 提现弹框 -->
    <Modal
      class="noDesign"
      :show="ModifyWindow1"
      width="59.25rem"
      :title="Withdrawalapplication"
      @hideModal="hideModal1"
    >
      <div class="modify-window">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="search-input">
            <el-form-item label="可提现金额：" >
                <span class="recivemoney">₹99988.87</span>
              </el-form-item>
            <el-form-item label="本次提现金额：" prop="money">
              <el-input
                v-model="ruleForm.money"
                placeholder="输入本次提现金额"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="提现服务费：" prop="mobile">
              <span class="recivemoney">₹99.87（服务费将从您的账户余额中扣除）</span>
            </el-form-item>
            <el-form-item label="提现银行账户：" prop="mobile">
              <span class="recivemoney">6743 4638 4793 242</span>
            </el-form-item>
            <el-form-item label="到账金额：" prop="mobile">
              <span class="recivemoney"> ₹68999.87（约$3455.00） </span>
            </el-form-item>
            <el-form-item>
              到账币种为您提现银行卡支持的币种，到账金额=提现金额*您的提现
              银行卡支持币种的当日汇率
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="primarybut"
                @click="submitForm('ruleForm')"
                >确认提现</el-button
              >
              <el-button type="info" class="down" @click="ModifyWindow1 = false"
                >关闭</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </div>
    </Modal>
     <!-- 代付弹框 -->
     <Modal
     class="noDesign"
     :show="ModifyWindow2"
     width="59.25rem"
     :title="Paidforapplication"
     @hideModal="hideModal2"
   >
     <div class="modify-window">
       <el-form
         :model="ruleForm"
         :rules="rules"
         ref="ruleForm"
         class="demo-ruleForm"
       >
         <div class="search-input">
          <el-form-item label="代付方式：" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="付款至银行卡" ></el-radio>
              <el-radio label="付款至电子钱包"></el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="上传收款人信息：" prop="file">
             <el-input
               v-model="ruleForm.file"
               type="file"
               placeholder="点击上传"
             ></el-input>
             （服务费将从您的付款金额中扣除）
           </el-form-item>
          
           <el-form-item>
             <el-button
               type="primary"
               class="primarybut"
               @click="submitForm('ruleForm')"
               >申请代付</el-button
             >
             <el-button type="info" class="down"  @click="ModifyWindow2 = false"
               >关闭</el-button
             >
           </el-form-item>
         </div>
       </el-form>
     </div>
   </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      userId: {
        token: this.$utils.getloc("token")
      },
      imageUrl: "", //图片路径
      ModifyWindow: false, //充值弹窗
      ModifyWindow1: false, //提现弹窗
      ModifyWindow2: false, //代付弹窗
      Topupapplication: "充值申请",
      Paidforapplication: "代付申请",
      Withdrawalapplication: "提现申请",
      type: this.$route.params.type ?  this.$route.params.type : '2',
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        resource: "付款至银行卡",
        position: "",
        company_id: "",
        department_id: "",
        remarks: "",
        realname: "",
        file:""
      },
      theuser: {
        admin: "",
        realname: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    //点击修改个人信息
    modify() {
      this.ModifyWindow = true;
      this.ruleForm = this.theuser;
      this.ruleForm.password = "";
    },
    hideModal() {
      this.ModifyWindow = false;
    },
    hideModal1() {
      this.ModifyWindow1 = false;
    },
    hideModal2() {
      this.ModifyWindow2 = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let self = this;
          self.$api.put(
            "user/" + self.$utils.getloc("userId"),
            self.ruleForm,
            r => {
              this.$message({
                message: r.message,
                type: "success"
              });
              this.manage();
            },
            e => {
              self.$message.error(e.msg);
            }
          );
          this.ModifyWindow = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    manage() {
      let self = this;
      // 调用后端登陆接口
      self.$api.get(
        "manage/" + self.$utils.getloc("userId"),
        { id: self.$utils.getloc("userId") },
        r => {
          this.theuser = r.data;
          this.imageUrl = "https://st.elongtian.com" + r.data.headimg;
        },
        e => {
          self.$message.error(e.msg);
        }
      );
    },

    //跳到认证信息页面
    submitattestation(type){
      let self = this;
      //跳转查看
      if(type=="1"){
        self.$router.push({
        name: "add-user",
        params:{
          type:2
        }
      })
        }else{
          self.$router.push({
        path: "/add-user",
      })
        }
      
      }
      
      
    
  },
  mounted() {
    // this.manage();
  }
};
</script>

<style lang="less" src="./basic-setup.less">
  
</style>
