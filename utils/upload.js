import store from '@/store'
import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

const upload = config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  config.header = config.header || {}
  if (getToken() && !isToken) {
    config.header['Authorization'] = 'Bearer ' + getToken()
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
      uni.uploadFile({
        timeout: config.timeout || timeout,
        url: baseUrl + config.url,
        filePath: config.filePath,
        name: config.name || 'file',
        header: config.header,
        formData: config.formData,
        success: (res) => {
          let result = JSON.parse(res.data)
          const code = result.code || 200
          const msg = errorCode[code] || result.msg || errorCode['default']
          if (code === 200) {
            resolve(result)
          } else if (code == 401) {
            showConfirm("O status de login expirou, você pode permanecer na página ou fazer login novamente?").then(res => {
              if (res.confirm) {
                store.dispatch('LogOut').then(res => {
                  uni.reLaunch({ url: '/pages/login/login' })
                })
              }
            })
            reject('Sessão inválida ou a sessão expirou, por favor faça login novamente。')
          } else if (code === 500) {
            toast(msg)
            reject('500')
          } else if (code !== 200) {
            toast(msg)
            reject(code)
          }
        },
        fail: (error) => {
          let { message } = error
          if (message == 'Network Error') {
            message = 'Conexão anormal da interface de back-end'
          } else if (message.includes('timeout')) {
            message = 'Solicitação de interface do sistema expira'
          } else if (message.includes('Request failed with status code')) {
            message = 'Interface do sistema' + message.substr(message.length - 3) + 'excepção'
          }
          toast(message)
          reject(error)
        }
      })
  })
}

export default upload
