import request from '@/utils/request'

// 是否绑定
export function isBind() {
  return request({
    url: 'index/is_bank',
    method: 'POST',
  })
}

// 绑定信息
export function addBind(data) {
  return request({
    url: 'index/add_bank',
    method: 'POST',
	data
  })
}
