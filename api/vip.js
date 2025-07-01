import request from '@/utils/request'

// 会员vip列表
export function VIPList() {
	return request({
		url: 'index/get_vips',
		method: 'GET',
	})
}
// 领取VIP升级奖励
export function claimVipReward(data) {
	return request({
		url: 'user/claimVipReward',
		method: 'POST',
		data: data
	})
}
// // 会员vip详情
// export function memberInfo(level) {
// 	return request({
// 		url: 'index/vips_info',
// 		method: 'POST',
// 		data: {
// 			level
// 		}
// 	})
// }