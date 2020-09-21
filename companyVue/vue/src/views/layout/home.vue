<template>
  <div class="main">

    <!-- 顶部 -->
    <div class="mainHead">
      <!-- 搜素框 -->
      <div class="searchBox">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <div class="search-input">
            <el-form-item label="公司:">
              <el-select v-model="form.compty" placeholder="请选择">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词:">
                <el-input v-model="form.word" placeholder=""></el-input>
            </el-form-item>
            <el-button class="btn-query"  @click="onSubmit">查询</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="dataList">


    </div>


    
  </div>
  
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      form:{
        compty: '',
        word: ''
      },
      options:[{
        lable: '33',
        value: '北京',
      },{
        lable: '34',
        value: '天津',
      },{
        lable: '35',
        value: '河北',
      }]
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    //查询
    getToken(){
      let self = this
      if (self.$utils.getloc('token')) {
        return
      } else {
        self.$router.push({
              path: '/login'
          })
      }
    },
  }
}
</script>

<style scoped>
</style>
