import request from '@/utils/request'

// 奖励 列表
export function childUser() {
  return request({
    url: 'restricted/getUserChildArr',
    method: 'GET',
  })
}


