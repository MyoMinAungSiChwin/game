import request from '@/utils/request'

// 活动列表
export function activityList() {
  return request({
    url: 'index/get_ac',
    method: 'GET',
  })
}

// 活动详情
export function activityDetails(id) {
  return request({
    url: 'index/get_acdtai',
    method: 'POST',
	data: {id}
  })
}