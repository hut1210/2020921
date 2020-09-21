import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export default new vuex.Store({
  state: {
    // 公共信息
    isShow: true,
    isCollapse: false,
    isBrokerage: false,
    showFlag:false,
    userList:[],
    activeIndex: '0',
    chatLeftData: []
  },
  mutations: {
    hide (state) {
      state.isShow = !state.isShow
    },
    collapse (state) {
      state.isCollapse = !state.isCollapse
    },
    brokerageSwitch (state, status) {
      state.isBrokerage = status
    },
    xianshi(state){
      state.showFlag=true
    },
    yincang(state){
      state.showFlag=false
    },
    setActiveIndex(state,val){
      state.activeIndex = val
    },
    setList(state,arr){
      state.userList = arr
    },
    setChatLeftData(state,arr) {
      state.chatLeftData = arr
    }
  }
})
