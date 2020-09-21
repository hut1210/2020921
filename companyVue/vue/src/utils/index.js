// 本地存储
var localStorage = window.localStorage
function getloc (name) {
  var value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}
function setloc (name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}
function removeloc (name) {
  return localStorage.removeItem(name)
}
// 获取链接参数
function getparam (name, url) {
  var m
  var tmp
  url = (url || window.location.href).split('#')
  if (name.indexOf('#') !== -1) {
    tmp = url.length < 2 ? '' : url[1]
  } else {
    tmp = url[0]
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'))
  if (m) {
    return decodeURIComponent(m[0].split('=')[1])
  } else {
    return ''
  }
}
// 对象copy
function objcopy (obj) {
  let newobj = {}
  for (let attr in obj) {
    newobj[attr] = obj[attr]
  }
  return newobj
}
// 数组升序
function sortA (arr) {
  let newarr = arr
  newarr.sort((a, b) => { return a - b })
  return newarr
}
// 整数数组求和
function getSum (arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      sum += parseInt(arr[i])
    }
  }
  return sum
}

export default {
  getloc,
  setloc,
  removeloc,
  getparam,
  objcopy,
  sortA,
  getSum
}
