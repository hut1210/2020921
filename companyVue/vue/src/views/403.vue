<template>
  <div class="error-page">
    <!-- <div class="error-code">4<span>0</span>3</div> -->
    <div class="error-desc">啊哦~ 该页面您暂时没有访问权限</div>
    <div class="error-handle">
      <router-link to="/login">
        <el-button type="primary" size="large">返回登陆页</el-button>
      </router-link>
      <el-button class="error-btn" type="primary" size="large" @click="goBackHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // rollBackTables() {
    //   var text = "数据还原";
    //   apis.shiroApi
    //     .rollBackTables()
    //     .then(data => {
    //       var alertText = "";
    //       if (data.data.status == "SUCCESS") {
    //         text += "成功";
    //         alertText = text + ",请重新登陆";
    //       } else {
    //         text += "失败";
    //         alertText = text + ",请重试";
    //       }
    //       this.$alert(alertText, "提示", {
    //         confirmButtonText: "确定"
    //       });
    //       log(text);
    //     })
    //     .catch(e => {
    //       this.$alert("数据还原异常,请重试", "提示", {
    //         confirmButtonText: "确定"
    //       });
    //       text += "失败";
    //       log(text);
    //     })

    //   function log(text) {
    //     var loginLog = {
    //       ip: returnCitySN["cip"],
    //       city: returnCitySN["cname"] + "-" + text
    //     }

    //     apis.shiroApi.loginLog(loginLog);
    //   }
    // },
    goBackHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  box-sizing: border-box;
}

.error-code {
  line-height: 1;
  font-size: 250px;
  font-weight: bolder;
  color: #2d8cf0;
}

.error-code span {
  color: #00a854;
}

.error-desc {
  margin-top: 100px;
  font-size: 30px;
  color: #777;
}

.error-qq {
  font-size: 20px;
  color: #777;
}

.error-handle {
  margin-top: 30px;
  padding-bottom: 200px;
}

.error-btn {
  margin-left: 10px;
}
</style>
