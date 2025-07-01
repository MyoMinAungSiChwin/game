import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (getToken() && !isToken) {
    config.header['token'] = getToken()
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout, 
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        let [error, res] = response
		
        if (error) {
          // toast('Conexão anormal da interface de back-end')
          // reject('Conexão anormal da interface de back-end')
		  toast('网络异常')
		  reject('网络异常')
          return
        }
        const code = res.data.code
        const msg = errorCode[code] || res.data.msg || errorCode['default']
		
	
        if (code === 401) {
			if(store.state.user.language == 'english'){
				showConfirm('The login status has expired, can I stay on the page or log back in?').then(res => {
				  if (res.confirm) {
				    store.dispatch('LogOut').then(res => {
				      uni.reLaunch({ url: '/pages/login' })
				    })
				  }
				})
			}else if(store.state.user.language == 'zh'){
				showConfirm('登录状态已过期，可以留在页面还是重新登录？').then(res => {
				  if (res.confirm) {
				    store.dispatch('LogOut').then(res => {
				      uni.reLaunch({ url: '/pages/login' })
				    })
				  }
				})
			}else if(store.state.user.language == 'my'){
				showConfirm('အကောင့်ဝင်မှု အခြေအနေ သက်တမ်းကုန်သွားပြီ။ စာမျက်နှာတွင် ကျန်ရှိနိုင်သည် သို့မဟုတ် ပြန်ဝင်မှု ပြုလုပ်ရန် သင် ရွေးချယ်မလဲ？').then(res => {
				  if (res.confirm) {
				    store.dispatch('LogOut').then(res => {
				      uni.reLaunch({ url: '/pages/login' })
				    })
				  }
				})
			}else{
			showConfirm('登录状态已过期，可以留在页面还是重新登录？').then(res => {
			  if (res.confirm) {
			    store.dispatch('LogOut').then(res => {
			      uni.reLaunch({ url: '/pages/login' })
			    })
			  }
			})
			}
			
          
          //reject('Sessão inválida ou a sessão expirou, por favor faça login novamente。')
		  reject('当前登录过期，请重新登录')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
			  toast(msg)
			  reject(code)
        }
        resolve(res.data)
      })
      .catch(error => {
        let { message } = error
		console.log(message)
        if (message === 'Network Error') {
          //message = 'Conexão anormal da interface de back-end'
		  message = '网络异常'
        } else if (message.includes('timeout')) {
          //message = 'Solicitação de interface do sistema expira'
		   message = '网络请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = 'Interface do sistema' + message.substr(message.length - 3) + 'excepção'
        }
        toast(message)
        reject(error)
      })
  })
}

export default request
