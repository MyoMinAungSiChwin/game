import request from '@/utils/request'

// 登录方法
export function login(data) {
	const {
		account,
		password
	} = data
	return request({
		'url': 'user/login',
		'method': 'POST',
		data: {
			account,
			password
		}
	})
}
export function lunx(data) {
	return request({
		url: 'user/chaxunOrder',
		method: 'POST',
		data
	})
	
}

// 注册方法
export function register(data) { 
	return request({
		url: 'user/register',
		method: 'POST',
		data 
	})
}

// 获取用户详细信息
export function getInfo() {
	return request({
		url: 'user/getUserinfo',
		method: 'POST'
	})
}

// 退出方法
export function logout() {
	return request({
		url: '/logout',
		method: 'POST'
	})
}

// 获取验证码
export function verificationCode(data) {
	return request({
		url: 'index/send_email_mobile',
		method: 'POST',
		data
	})
}

// 忘记密码
export function forgotPassword(data) { 
	return request({
		url: 'user/change_pwd',
		method: 'POST',
		data
	})
}