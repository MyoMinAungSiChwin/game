import request from '@/utils/request'

// 奖励 列表
export function activityList() {
  return request({
    url: 'index/activity',
    method: 'POST',
  })
}


// 奖励 详情
export function activityDetails(id) {
  return request({
    url: 'index/get_acdtai',
    method: 'POST',
	data:{id}
  })
}
