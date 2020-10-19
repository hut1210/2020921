// 引用axios
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import utils from '../utils'
import router from '../router'

// axios.defaults.timeout = 5000
// 配置API接口公共地址
var root = process.env.NODE_ENV == 'development' ? '/api' : 'http://pg.grepayment.com'
//var root = process.env.NODE_ENV == 'development' ? '/api' : 'http://test.gettin.in'
//var root = process.env.NODE_ENV == 'development' ? '/api' : 'http://pg.helonovel.in'

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
*/
function apiAxios (method, url, params, success, failure) {
  if (params && url!="/core/api/payment/paymentout") {
    params = filterNull(params)
  }
  if (utils.getloc('token')) {
    params.token = utils.getloc('token')
  } else {
    params.token = ''
  }

  let loadingInstance = Loading.service({ target: '.el-main' })

 let obj={Authorization: "Bearer " + utils.getloc('token')
 }
 if(url=="/gpauth/partner/merchant/users/login" || url=="/gpauth/partner/merchant/users/add"){
    obj={};
 }
 
  axios({
    method: method,
    url: url,
    headers: obj ,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  }).then(function (res) {
    loadingInstance.close()
    if (res.data.code) {
      if (success) {
        success(res.data)
      }
    } else {
      Message.closeAll()
     
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        Message.error(res.result)
    }
  }).catch(
    function (err) {
      console.log("3333",err.response)
      loadingInstance.close()
      if (err.response) {
        
        let res = err.response
        Message.error(err.response.data.result)

      }else{
        Message.error('网络错误，请稍后重试')

      }
    }
  )
}
// 联调不加白屏渲染
function apiAxios1 (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  if (utils.getloc('token')) {
    params.token = utils.getloc('token')
  } else {
    params.token = ''
  }

  axios({
    method: method,
    url: url,
    headers: {
      'token': utils.getloc('token')
    },
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  }).then(function (res) {

    
    if (res.data.errcode === 0) {
      if (success) {
        success(res.data)
      }
    } else {
      if(res.data.errcode === 1) {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        Message.error(res.data.message)
      } else {
        Message.error(res.data.message)
      }
    }
  }).catch(
   
    function (err) {
      // console.log(3333,err)
      if (err) {
        Message.error('网络错误，请稍后重试')
        let res = err.response
      }
    }
  )
}
// 导出请求方法
function exportTable (url, params, downLoadFn, errFn) {
  let loadingInstance = Loading.service({ target: '.el-main' })
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: 'POST',
    baseURL: root,
    url: url,
    headers: {
      Authorization: "Bearer " + utils.getloc('token')
    },
    data: params,
    responseType: 'blob',
    withCredentials: false
  }).then(function (res) {
    if (res.data.size > 0) {
      downLoadFn(res.data)
    } else {
      errFn(res.data.msg)
    }
    loadingInstance.close()
  }).catch(
    function (err) {
      loadingInstance.close()
      if (err) {
        Message.error('网络错误，请稍后重试')
        let res = err.response
      }
    }
  )
}
// 返回在vue模板中的调用接口
export default {
 getUrlTitle:function(){
  return root;
},
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  getTall: function (url, params, success, failure) {
    return apiAxios1('GET', url, params, success, failure)
  },
  postTall: function (url, params, success, failure) {
    return apiAxios1('POST', url, params, success, failure)
  },
  putTall: function (url, params, success, failure) {
    return apiAxios1('PUT', url, params, success, failure)
  },
  deleteTall: function (url, params, success, failure) {
    return apiAxios1('DELETE', url, params, success, failure)
  },
  exportTable:function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
}
