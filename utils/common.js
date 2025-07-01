import store from '@/store/index.js'

/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
uni.showToast({
		  icon: 'none',
		  title: content
		})
 
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

// 判断是否登录
export function isLogin(){
	console.log(store.state)
	if(store.state.user.token){
		return true
	}else{
		return false
	}
}

// 延时函数
export function dDelay(ms = 1000) {
	return new Promise(res => setTimeout(res, ms))
}

// 判断是否是正确邮箱
export function isEmail(email) {
    const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegexp.test(email);
}

// 提取出地址栏的参数并转为对象
export function getRequestParams(url) {
	let requestParams = {};
	if (url.indexOf('?') !== -1) {
		let str = url.substr(url.indexOf('?') + 1); //截取?后面的内容作为字符串 
		let strs = str.split('&'); //将字符串内容以&分隔为一个数组
		for (let i = 0; i < strs.length; i++) {
			if (decodeURI(strs[i].split('=')[1]).indexOf('#') != -1) {
				requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1].split('#')[0]);
			} else {
				requestParams[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
			}

			// 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
		}
	}
	return requestParams;
}