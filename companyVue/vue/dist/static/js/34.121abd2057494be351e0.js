webpackJsonp([34],{h7G7:function(e,t){},sAS2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={name:"home",data:function(){return{form:{compty:"",word:""},statusData:[],options:[{value:"1",label:"送检（项目经理）"},{value:"2",label:"检测（检测经理）"}],tableData:[],pageIndex:1,total:0}},created:function(){},methods:{getClass:function(){return"background: #66CE90FF"},onSubmit:function(){this.getList()},addCompanyList:function(){this.$router.push({name:"updata-company-info"})},editRow:function(e){var t=e.c_id;this.$router.push({name:"updata-company-info",params:{id:t}})},deleteRow:function(e){var t=e.c_id;this.deleteCompany(t)},goOrglist:function(e){console.log(e);var t=e.c_id,a=e.company_name;this.$router.push({name:"organ-structure-list",query:{companyId:t,companyName:a}})},handleCurrentChange:function(e){this.pageIndex=e,this.getList()},getList:function(){var e=this;e.$api.get("companylist",{page:e.pageIndex,pagesize:10,keyword:e.form.word,type:this.form.compty},function(t){e.tableData=t.data.data,e.total=t.data.total_count},function(t){e.$message.error(t.message)})},getCompanyType:function(){var e=this;e.$api.post("companytype",{},function(e){},function(t){e.$message.error(t.message)})},deleteCompany:function(e){var t=this;t.$confirm("此操作将删除此条信息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$api.delete("company/"+e,{},function(e){t.$message({type:"success",message:e.message}),t.getList()},function(e){t.$message.error(e.message)})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main company-main"},[a("div",{staticClass:"mainHead"},[a("div",{staticClass:"searchBox"},[a("el-form",{ref:"form",staticClass:"demo-form-inline",attrs:{inline:!0,model:e.form}},[a("div",{staticClass:"search-input"},[a("el-form-item",{attrs:{label:"GrePay订单号:"}},[a("el-input",{attrs:{placeholder:"请输入GrePay订单号"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户订单号:"}},[a("el-input",{attrs:{placeholder:"请输入商户订单号"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户ID:"}},[a("el-input",{attrs:{placeholder:"请输入用户ID"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户号:"}},[a("el-input",{attrs:{placeholder:"请输入商户号"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户名称:"}},[a("el-input",{attrs:{placeholder:"请输入商户名称"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商户名称:"}},[a("el-input",{attrs:{placeholder:"请输入商户名称"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"支付方式:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",[e._v("请选择")]),e._v(" "),e._l(e.statusData,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"订单状态:"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",[e._v("请选择")]),e._v(" "),e._l(e.statusData,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"生成时间:",prop:""}},[a("el-date-picker",{staticClass:"ydateinput",attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.startime,callback:function(t){e.startime=t},expression:"startime"}})],1),e._v(" "),a("el-button",{staticClass:"btn-query",on:{click:e.onSubmit}},[e._v("搜索")]),e._v(" "),a("div",{staticClass:"btn-add",on:{click:e.addUserList}},[e._v("导出")])],1)])],1)]),e._v(" "),a("div",{staticClass:"dataList"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":e.getClass,height:"49.3rem"}},[a("el-table-column",{attrs:{fixed:"",prop:"company_name",label:"GrePay订单号",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"tongji_month",label:"商户订单号",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"two_rate",label:"资金流水单号",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"defect_rate",label:"商户号",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_two_rate",label:"商户名称",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_defect_rate",label:"业务名称",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"code_rate",label:"用户ID",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diff_rate",label:"订单金额",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_two_rate",label:"支付公司",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_defect_rate",label:"结算主体",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"code_rate",label:"支付方式",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diff_rate",label:"商户费率",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_two_rate",label:"订单手续费",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"safe_defect_rate",label:"商户结算金额",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"code_rate",label:"订单状态",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diff_rate",label:"订单生成时间",width:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"diff_rate",label:"更新时间",width:""}})],1)],1),e._v(" "),a("el-pagination",{attrs:{"prev-text":"上一页","next-text":"下一页",layout:"prev, pager, next, jumper",total:e.total},on:{"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]};var r=a("VU/8")(l,o,!1,function(e){a("h7G7")},"data-v-2af3133f",null);t.default=r.exports}});
//# sourceMappingURL=34.121abd2057494be351e0.js.map