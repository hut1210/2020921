<template>
  <!-- <div>基本设置</div> -->
  <div class="basic-setup">
    <div
      v-if="$utils.getloc('group_id') == 0 && type != '3'"
      class="search_box1"
    >
      <div class="sure-message">
        <p>
          <img
            class="headerimg"
            id="logoid"
            src="@/images/nozhizhi.png"
            alt=""
          />
        </p>
        <p>还没有认证公司信息，快去认证吧</p>
        <el-button
          size="medium"
          type="primary"
          class="primarybut"
          @click="submitattestation"
          >去认证</el-button
        >
      </div>
    </div>
    <div v-if="$utils.getloc('group_id') == 2" class="search_box1">
      <div class="sure-message">
        <p>
          <img
            class="headerimg"
            id="logoid"
            src="@/images/nozhizhi.png"
            alt=""
          />
        </p>
        <p style="margin-left:-2rem">公司资质认证审核中</p>
        <el-button
          size="medium"
          type="primary"
          class="primarybut"
          @click="submitattestation(1)"
          >查看认证信息</el-button
        >
      </div>
    </div>
    <div
      v-if="$utils.getloc('group_id') == 0 && type == '3'"
      class="search_box1"
    >
      <div class="sure-message">
        <p>
          <img
            class="headerimg"
            id="logoid"
            src="@/images/nozhizhi.png"
            alt=""
          />
        </p>
        <p>公司资质认证未通过，请重新申请</p>
        <el-button
          size="medium"
          type="primary"
          class="primarybut"
          @click="submitattestation(type)"
          >重新申请</el-button
        >
      </div>
    </div>
    <div v-if="$utils.getloc('group_id') == 1" class="search_box">
      <div class="search-box-buttom">
        <p class="top-title">账户概览:</p>
        <div class="wait-list">
          <div>
            <p>账户总余额</p>
            <p>
              <span class="canuse-first">₹{{ objmessge.totalBalance }}</span>
            </p>
          </div>
          <div>
            <p></p>
            <p>
              可用余额<span>₹{{ objmessge.availableBalance }}</span>
            </p>
          </div>
          <div>
            <p></p>
            <p class="m-arrive">
              不可用余额<span>₹{{ objmessge.blockedBalance }}</span>
            </p>
          </div>
          <div calss="use-hand" style="margin-top:6.35rem">
            <el-button size="medium" round @click="btModifyWindow(1)"
              >充值</el-button
            >
             <el-button size="medium" round @click="btModifyWindow(2)"
              >提现</el-button
            > 
            <el-button size="medium" round @click="btModifyWindow(3)"
              >代付</el-button
            >
          </div>
        </div>
      </div>
      <div class="search-box-top">
        <!-- <p class="top-title">待办事项：</p> -->
        <!-- <div class="wait-list">
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
        </div> -->
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
          :model="formchongzhi"
          :rules="rulescz"
          ref="formchongzhi"
          class="demo-ruleForm"
          label-position="right" 
        >
          <div class="search-input">
            <el-form-item label="币种：">
              <el-select v-model="formchongzhi.currency" placeholder="充值币种">
                <el-option label="卢比" value="INR"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国家：">
              <el-select v-model="formchongzhi.countryCode" placeholder="国家">
                <el-option label="印度" value="IN"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值金额：" prop="amount">
              <el-input
                v-model.number="formchongzhi.amount"
                placeholder="输入充值金额："
                clearable
              ></el-input>
              
            </el-form-item>
            <el-form-item label="充值服务费：" prop="singleCharge">
              <span  class="recivemoney">{{
                singleCharge
              }}<i style="font-size: 0.75rem;
              margin-left: 1rem;
              color: #121313;">(仅供参考)</i></span>
            </el-form-item>
            <el-form-item label="到账金额：" prop="getamount">
              <span class="recivemoney">{{ getamount }}
                <i style="font-size: 0.75rem;
                margin-left: 1rem;
                color: #121313;">(仅供参考)</i>
              </span>
            </el-form-item>
            <el-form-item>
              到账金额=充值金额-充值服务费(充值费率{{rechargeRate}}+单笔费用{{rechargeSingleCharge}}) ，实际到账
              金额以充值当日费率计算结果为准
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="primarybut"
                @click="submitFormchongzhi('formchongzhi')"
                >确认充值</el-button
              >
              <el-button type="info" class="down" @click="ModifyWindow = false"
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
          :model="formtixian"
          :rules="ruletx"
          ref="formtixian"
          class="demo-ruleForm"
          label-position="right"
        >
          <div class="search-input">
            <el-form-item label="可提现金额：">
              <span class="recivemoney">₹{{ objmessge.availableBalance }}</span>
            </el-form-item>
            <el-form-item style="margin-left: -2.5rem;" label="本次提现金额：" prop="amount">
              <el-input
                v-model.number="formtixian.amount"
                placeholder="输入本次提现金额"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="提现服务费：" prop="">
              <span style="margin-left:4.875rem;" class="recivemoney"
                >₹{{recivemoneyfuwu}}<i style="font-size:0.5rem">（服务费将从您的账户余额中扣除）</i></span
              >
            </el-form-item>
            <el-form-item style='margin-left: -1.5rem'label="提现银行账户：" prop="">
              <span class="recivemoney">{{ objmessge.bankCardNumber }}</span>
            </el-form-item>
            <el-form-item label="到账金额：" prop="">
              <span class="recivemoney"> ₹{{recivemoney}} </span>
            </el-form-item>
            <el-form-item>
              到账金额=提现金额-提现服务费(提现费率{{withdrawRate}}+单笔费用{{withdrawSingleCharge}}) ，实际到账
              金额以提现当日汇率计算结果为准
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="primarybut"
                @click="submitFormtx('formtixian')"
                >确认提现</el-button
              >
              <el-button type="info" class="down" @click="ModifyWindow1= false"
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
          :model="ruleFormPaidfor"
          :rules="rules"
          ref="ruleFormPaidfor"
          class="demo-ruleForm"
          label-position="right"
        >
          <div class="search-input">
            <el-form-item label="代付方式：" prop="payType">
              <el-radio-group v-model="ruleFormPaidfor.payType">
                <el-radio :label="5">付款至银行卡</el-radio>
                <el-radio :label="1">付款至电子钱包</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="上传收款人信息：" style="margin-left:-3rem;" prop="file">
              <a href="javascript:;" class="file">
                {{ filename }}
                <input
                  type="file"
                  @change="getFile($event)"
                  class="inputstyle"
                />
              </a>
              <a
                download="代付单.csv"
                href="https://greapy.s3.ap-south-1.amazonaws.com/import.csv"
                >下载模板</a
              >
              <P>（服务费将从您的付款金额中扣除）</P>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="primarybut"
                @click="submitFormPaidfor('ruleFormPaidfor')"
                >申请代付</el-button
              >
              <el-button type="info" class="down" @click="ModifyWindow2 = false"
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
import axios from "axios";
import Modal from "@/components/Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    var checkamount = (rule, value, callback) => {
            if (value < 100 || value>100000) {
              callback(new Error('充值金额必须大于100小于100000'));
            } else{
              callback()
            }
      }
      var   txcheckamount = (rule, value, callback) => {
            if (value < 100) {
              callback(new Error('提现金额必须大于100'));
            } else{
              callback()
            }
      }
      
    return {
      //urlforpay:"https://uploader.shimo.im/f/y2hG6cRnijCaMI1b.csv",
      //https://uploader.shimo.im/f/y2hG6cRnijCaMI1b.csv?attname=%E4%BB%A3%E4%BB%98%E5%8D%95.csv&download
      userId: {
        token: this.$utils.getloc("token")
      },
      formtixian:{
        amount:"",
      },
      formchongzhi: {
        currency: "",
        countryCode: "",
        amount:"" ,
        singleCharge: "",
        rate:this.rechargeRate,
        merchantId:"",
      },
      ruletx:{
        amount: [
            { validator: txcheckamount, trigger: 'blur' },
            {required: true, message: "提现金额不能为空", },
            { type: 'number', message: '提现金额为数字'}
          ]
      },
      rulescz: {
        currency: [{ required: true, message: "请选择币种", trigger:'change'}],
        countryCode: {
          required: true,
          message: "请选择国家码",
          trigger:'change'
        },
        
        amount: [
            { validator: checkamount, trigger: 'blur' },
            {required: true, message: "请填写正确的充值金额", },
            { type: 'number', message: '请填写正确的充值金额'}
          ]
      },
      filename: "上传文件",
      hrefscsv: "../../../代付单.csv",
      imageUrl: "", //图片路径
      ModifyWindow: false, //充值弹窗
      ModifyWindow1: false, //提现弹窗
      ModifyWindow2: false, //代付弹窗
      Topupapplication: "充值申请",
      Paidforapplication: "代付申请",
      Withdrawalapplication: "提现申请",
      type: this.$route.params.type ? this.$route.params.type : "2",
      objmessge: {},
      actiondaifu: "/core/api/payment/paymentout",
      importHeaders: {
        Authorization: "Bearer " + this.$utils.getloc("token")
      },
      ruleFormPaidfor: {
        file: "",
        payType: 5,
        countryCode: "",
        currency: ""
      },
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
        file: ""
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
      },
      rechargeRate: "", //单笔费率
      rechargeSingleCharge: "", //单笔充值收费
      withdrawRate:"",//单笔提现费率
      withdrawSingleCharge:"",//单笔提现收费

    };
  },
  computed: {
    
    singleCharge: function() {
      debugger
      
      let singleCharges = this.rechargeSingleCharge +parseFloat(( this.rechargeRate * this.formchongzhi.amount ).toFixed(
        4
      ));

      this.formchongzhi.singleCharge = singleCharges;
      return singleCharges;
    },
    getamount: function() {
      debugger
      return ( this.formchongzhi.amount- this.formchongzhi.singleCharge).toFixed(4);
    },
    recivemoneyfuwu:function(){
     
      return (this.withdrawRate * this.formtixian.amount).toFixed(
        4
      );
    },
    recivemoney:function(){
      return ((1 - this.withdrawRate) * this.formtixian.amount -this.withdrawSingleCharge).toFixed(4);
    },

  },
  created() {
   
  },
  methods: {
    //充值
    getrate() {
      
      let self = this;
      self.$api.post(
        "/core/api/payment/merchant/rate",
        {},
        r => {
          this.rechargeRate = r.result.rechargeRate;
          this.rechargeSingleCharge = r.result.rechargeSingleCharge;
          this.withdrawRate = r.result.withdrawRate;
          this.withdrawSingleCharge = r.result.withdrawSingleCharge;
        },
        e => {
          console.log(e);
          self.$message.error(e.info);
        }
      );
    },
    submitFormchongzhi(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addManagecz();
        } else {
          console.log("error submit!!");
          self.$message.error("error submit!!");
          return false;
        }
      });
    },


    //新增充值信息
    addManagecz() {
      let self = this;
      console.log(self.formchongzhi);
      self.$api.post(
        "/core/api/payment/recharge",
        self.formchongzhi,
        r => {
          if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/user-group-list"
            });
          } else {
            this.$message.error(r.info);
          }
        },
        e => {
          self.$message.error(e.info);
        }
      );
    },
    // 提现
    
    submitFormtx(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addManagetx();
        } else {
          console.log("error submit!!");
          self.$message.error("error submit!!");
          return false;
        }
      });
    },

 //提现信息提交
 addManagetx() {
      let self = this;
      self.$api.post(
        "/core/manager/withdraw",
        self.formtixian,
        r => {
          if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/user-list"
            });
          } else {
            this.$message.error(r.info);
          }
        },
        e => {
          self.$message.error(e.info);
        }
      );
    },


    //代付
    //下载
    dowloads() {
      window.open(this.urlforpay);
    },
    downlodd: function() {
      window.open(this.hrefscsv);
    },
    getFile(event) {
      this.ruleFormPaidfor.file = event.target.files[0];
      console.log(this.ruleFormPaidfor.file);
      this.filename = this.ruleFormPaidfor.file.name;
    },
    //代付方法
    submitFormPaidfor() {
      let self = this;
      if (!self.ruleFormPaidfor.file) {
        this.$message.error({
          message: "请上传正确的文件格式"
        });
        return false;
      }
      console.log(self.ruleFormPaidfor);
      let formData = new FormData();
      formData.append("payType", self.ruleFormPaidfor.payType);
      formData.append("file", self.ruleFormPaidfor.file);
      formData.append("currency", self.$utils.getloc("currency"));
      formData.append("countryCode", self.$utils.getloc("countryCode"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + self.$utils.getloc("token")
        }
      };
      self.$api.post(
        "/core/api/payment/paymentout",
        formData,
        r => {
          if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/manage-info-list"
            });
          } else {
            this.$message.error(r.info+'：'+r.result);
          }
        },
        e => {
          self.$message.error(e.info);
        }
      );
    },

    //获取公司列表
    lookManage() {
      let self = this;
      self.$api.get(
        "gpmanage/partner/merchant/info",
        {},
        r => {
          this.objmessge = r.result.merchantAccount;
          self.$utils.setloc(
            "userNickname",
            r.result.merchanDetail.companyName
          );
          if (r.result.merchanDetail.status == 1) {
            self.$utils.setloc("group_id", 1); //認證通過
            self.$utils.setloc(
              "countryCode",
              r.result.merchantAccount.countryCode
            );
            self.$utils.setloc("currency", r.result.merchantAccount.currency);
          } 
        },
        e => {
          console.log(e);
          self.$message.error(e.info);
        }
      );
    },
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
    //跳到认证信息页面
    submitattestation(type) {
      let self = this;
      //跳转查看
      if (type == "1") {
        self.$router.push({
          name: "add-user",
          params: {
            type: 2
          }
        });
      } else {
        self.$router.push({
          path: "/add-user"
        });
      }
    },
    btModifyWindow:function(v){
      if(v==1){
        this.ModifyWindow=true;
        this.getrate();
      }else if(v==2){
        this.getrate();
        this.ModifyWindow1=true;
      }else {
        this.ModifyWindow2=true;
      }
    }
  },
  mounted() {
    debugger
    //此处信息可以放到x的state里面哟吼放
    if (this.$utils.getloc("group_id") == 1 || this.$utils.getloc("group_id") ==2) {
      this.lookManage();
    }
  }
};
</script>

<style lang="less" src="./basic-setup.less"></style>
