import request from '@/utils/request'

// 获取个人中心 vip信息
export function gamevipsInfo() {
	return request({
		url: 'index/vips_info',
		method: 'POST',
	})
}
export function bankConfigInfo() {
	return request({
		url: 'user/bankConfig',
		method: 'POST',
	})
}
// 获取充值提现记录
export function rechargeRecord(data) {
	return request({
		url: 'index/Wit_rech_list',
		method: 'POST',
		data
	})
}
export function updatePwd(data) {
	return request({
		url: 'user/updatePwd',
		method: 'POST',
		data
	})
}

// 获取罚款记录
export function fkRecord(data) {
	return request({
		url: 'index/fk_list',
		method: 'POST',
		data
	})
}

// 游戏流水记录
export function gameRecord(data) {
	return request({
		url: 'index/find_bets',
		method: 'POST',
		data
	})
}


// 游戏返利记录
export function gameRebate(data) {
	return request({
		url: 'index/rebate_list',
		method: 'POST',
		data
	})
}

// 邀请函详细信息记录
export function gameInvitation(data) {
	return request({
		url: 'index/getthree',
		method: 'POST',
		data
	})
}


 

