import request from '@/utils/request'

// 邀请组件数据
export function inviteLink() {
  return request({
    url: 'index/get_links',
    method: 'GET',
  })
}

// 统计组件数据
export function allThirdLevelUsers() {
  return request({
    url: 'index/allThirdLevelUsers',
    method: 'POST',
  })
}