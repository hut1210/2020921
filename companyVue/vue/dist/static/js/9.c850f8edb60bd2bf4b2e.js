webpackJsonp([9],{"8alw":function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l={data:function(){return{flag:!1,groupState:!1,renzhengtype:this.$route.params.type?this.$route.params.type:"1",groupData:[],tagsData:[],companyData:[],departmentData:[],optionsSelect:[],ruleForm:{username:"",realname:"",password:"",group:"",service:"",service_num:"",check_num:"",company_id:"",department_id:"",position:"",mobile:"",status:1,istop:0,remarks:""},rules:{}}},created:function(){},methods:{handleGroup:function(e){this.groupState=2==e},handleCompany:function(e){this.departmentList(e),this.ruleForm.department_id=""},groupList:function(){var e=this,r=this;r.$api.get("group/",{},function(r){e.groupData=r.data.filter(function(e){return"超级管理员"!=e.name})},function(e){r.$message.error(e.msg)})},tagList:function(){var e=this,r=this;r.$api.get("tags/",{},function(r){e.tagsData=r.data},function(e){r.$message.error(e.msg)})},companyList:function(){var e=this,r=this;r.$api.post("companytype/",{},function(r){e.companyData=r.data},function(e){r.$message.error(e.msg)})},departmentList:function(e){var r=this;r.$api.get("orglist/",{company_id:e},function(e){for(var a=0;a<e.data.list.length;a++)r.departmentData.push({id:e.data.list[a].id,name:e.data.list[a].lefthtml+e.data.list[a].name})},function(e){r.$message.error(e.msg)})},goBack:function(){this.$router.go(-1)},submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;r.addManage()})},addManage:function(){this.$router.push({name:"basic-setup",params:{type:"1"}})},updataManage:function(){var e=this,r=this;r.$api.put("user/"+r.$route.params.id,r.ruleForm,function(r){e.$message({message:r.message,type:"success"}),setTimeout(function(){e.$router.push({name:"user-list"})},500)},function(e){r.$message.error(e.msg)})},modify:function(){var e=this,r=this;r.$api.get("user/"+r.$route.params.id,{id:r.$route.params.id},function(r){2==r.data.group&&(e.groupState=!0),e.ruleForm=r.data,e.ruleForm.password="",e.departmentList(r.data.company_id)},function(e){r.$message.error(e.msg)})},resetclick:function(){this.$router.push({path:"/basic-setup"})}},mounted:function(){}},t={render:function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",{staticClass:"add-manage-info sharing"},[a("div",{staticClass:"skillby-tab"},["2"==e.renzhengtype||1==e.$utils.getloc("group_id")?a("div",{staticClass:"renzheng-look"},[a("div",{staticClass:"search_box"},[a("p",{staticClass:"attestation-title"},[e._v("填写商户认证信息:")]),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[a("div",{staticClass:"search-input"},[a("el-form-item",{attrs:{label:"公司名称：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",readonly:"",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营业执照号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人姓名：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:"",readonly:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人证件号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人姓名：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:"",readonly:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人证件号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人手机号码：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:"",readonly:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人电子邮箱：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"银行账户：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:"",readonly:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"注册地址：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"经营地址：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:"",readonly:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属行业：",prop:"group"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.handleGroup},model:{value:e.ruleForm.group,callback:function(r){e.$set(e.ruleForm,"group",r)},expression:"ruleForm.group"}},e._l(e.groupData,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"官网链接：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入官网链接",clearable:"",readonly:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("p",{staticClass:"attestation-title",staticStyle:{"margin-left":"-17.625rem"}},[e._v("上传认证文件:")]),e._v(" "),a("div",{staticClass:"uploud-file"},[a("el-form-item",{attrs:{label:"商户开户资料信息表：",prop:"username"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])]),e._v(" "),a("el-form-item",{attrs:{label:"公司营业执照：",prop:"realname"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])]),e._v(" "),a("el-form-item",{attrs:{label:"公司注册证书：",prop:"username"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])]),e._v(" "),a("el-form-item",{attrs:{label:"法人身份证：",prop:"realname"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])]),e._v(" "),a("el-form-item",{attrs:{label:"公司章程：",prop:"username"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])]),e._v(" "),a("el-form-item",{attrs:{label:"银行账户开户证明：",prop:"realname"}},[a("a",{attrs:{href:"",download:"test.pdf"}},[e._v("下载")]),e._v(" "),a("a",{attrs:{href:"#"}},[e._v("预览")])])],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.resetclick}},[e._v("返回")])],1)])],1)]):a("div",{staticClass:"search_box"},[a("p",{staticClass:"attestation-title"},[e._v("填写商户认证信息:")]),e._v(" "),a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[a("div",{staticClass:"search-input"},[a("el-form-item",{attrs:{label:"公司名称：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"营业执照号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人姓名：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人证件号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人姓名：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人证件号码：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人手机号码：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商务联系人电子邮箱：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"银行账户：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"注册地址：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入真实姓名",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"经营地址：",prop:"username"}},[a("el-input",{attrs:{placeholder:"输入用户名称",clearable:""},model:{value:e.ruleForm.username,callback:function(r){e.$set(e.ruleForm,"username",r)},expression:"ruleForm.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属行业：",prop:"group"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.handleGroup},model:{value:e.ruleForm.group,callback:function(r){e.$set(e.ruleForm,"group",r)},expression:"ruleForm.group"}},e._l(e.groupData,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"官网链接：",prop:"realname"}},[a("el-input",{attrs:{placeholder:"输入官网链接",clearable:""},model:{value:e.ruleForm.realname,callback:function(r){e.$set(e.ruleForm,"realname",r)},expression:"ruleForm.realname"}})],1),e._v(" "),a("p",{staticClass:"attestation-title",staticStyle:{"margin-left":"-17.625rem"}},[e._v("上传认证文件:")]),e._v(" "),a("div",{staticClass:"uploud-file"},[a("el-form-item",{attrs:{label:"商户开户资料信息表：",prop:"username"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司营业执照：",prop:"realname"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司注册证书：",prop:"username"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"法人身份证：",prop:"realname"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"公司章程：",prop:"username"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"银行账户开户证明：",prop:"realname"}},[a("el-input",{attrs:{type:"file",placeholder:"上传"},model:{value:e.ruleForm.file,callback:function(r){e.$set(e.ruleForm,"file",r)},expression:"ruleForm.file"}})],1),e._v(" "),a("el-form-item",[e._v("\n            上传内容说明：需要上传扫描件或清晰的照看，支持.pdf、.png格式文件\n          ")])],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.resetclick}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("保存")])],1)])],1)])])},staticRenderFns:[]};var o=a("VU/8")(l,t,!1,function(e){a("X7Vd"),a("EbWC"),a("JTKZ")},null,null);r.default=o.exports},EbWC:function(e,r){},JTKZ:function(e,r){},X7Vd:function(e,r){}});
//# sourceMappingURL=9.c850f8edb60bd2bf4b2e.js.map