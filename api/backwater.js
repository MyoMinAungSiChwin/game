import request from '@/utils/request'

// 反水记录
export function backwaterList(data) {
  return request({
    url: 'index/rebate_list',
    method: 'POST',
	data
  })
}