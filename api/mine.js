import request from '@/utils/request'

// 获取游戏金额
export function gameAmount() {
	return request({
		url: 'index/get_wallet',
		method: 'GET',
	})
}

// 游戏转换
export function walletTransfer(data) {
	return request({
		url: 'index/walletTransfer',
		method: 'POST',
		data
	})
}


// 充值 提现
export function withdrawRecharge(data) {
	return request({
		url: 'index/Withdraw_recharge',
		method: 'POST',
		data

	})
}


// 获取充值选项
export function rechlist() {
	return request({
		url: 'index/get_rechlist',
		method: 'POST',
	})
}

// 获取底部列表
export function foolDetails() {
	return request({
		url: 'index/get_fool',
		method: 'POST',
	})
}

// 获取底部列表详情
export function foolLevelDetails(id) {
	return request({
		url: 'index/fool_dtails',
		method: 'POST',
		data: {id}
	})
}