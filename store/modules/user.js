import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import {
	login,
	logout,
	getInfo,
	lunx
} from '@/api/login'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
	state: {
		token: getToken(),
		name: storage.get(constant.name),
		userInfo: storage.get(constant.userInfo),
		avatar: storage.get(constant.avatar),
		roles: storage.get(constant.roles),
		permissions: storage.get(constant.permissions),
		language: storage.get(constant.language),
		// language: 'zh',
		invitation_code: '',
		// 新增状态
		showOrderSuccessTip: false, // 控制订单成功通知的显示
		tipMessage: '', // 通知消息内容
		tipType:0
	},

	mutations: {
		setVipClaim(state, value) {
			if (state.userInfo) {
				state.userInfo.is_vip_claim = value;
			}
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
			storage.set(constant.name, name)
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
			storage.set(constant.avatar, avatar)
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
			storage.set(constant.roles, roles)
		},
		SET_PERMISSIONS: (state, permissions) => {
			state.permissions = permissions
			storage.set(constant.permissions, permissions)
		},
		SET_USER_INFO: (state, info) => {
			state.userInfo = info
			storage.set(constant.userInfo, info)
		},

		SET_LANGUAGE: (state, info) => {
			state.language = info
			storage.set(constant.language, info)
		},
		SET_CODES: (state, code) => {
			state.invitation_code = code
		},
		// 新增Mutation：控制通知弹窗
		SET_ORDER_SUCCESS_TIP: (state,show) => {
			console.log("++++++++++++++++"+show)
			state.showOrderSuccessTip = show
		},
		SET_ORDER_SUCCESS_MESSAGE: (state,mess) => {
			console.log("================="+mess)
			state.tipMessage = mess
		},
		SET_ORDER_SUCCESS_TYPE: (state,type) => {
			console.log("================="+type)
			state.tipType = type
		},
		SET_ORDER_SUCCESS_CLOSE: (state,show) => {
			console.log(show)
			state.showOrderSuccessTip = show
		},
		
	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(res => {
					const {
						token
					} = res.data.userinfo
					setToken(token)
					commit('SET_TOKEN', token)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		GetInfo({
			commit,
			state
		}) {
			if (!state.token) return
			return new Promise((resolve, reject) => {
				getInfo().then(res => {
					//轮询订单
					let lx_order_id = uni.getStorageSync('lx_order_id') || 0
					let language = state.language || 'zh'
					if (lx_order_id > 0) {
						lunx({
							language:language,
							lx_order_id: lx_order_id
						}).then(res => {
								console.log(res.data.jk)
							if (res.data.type == 'success') {
								//1.设置一个全局的参数 如showTip = true
								//2.并且删除 当前缓存  uni.removeStorageSync('lx_order_id')
								// 1. 显示通知弹窗
								commit('SET_ORDER_SUCCESS_TIP', true);
								
								commit('SET_ORDER_SUCCESS_MESSAGE',res.data.message);
								
								commit('SET_ORDER_SUCCESS_TYPE',res.data.jk);
								
								// 2. 删除订单缓存
								uni.removeStorageSync('lx_order_id');

								// 3. 3秒后自动关闭通知
								setTimeout(() => {
									commit('SET_ORDER_SUCCESS_TIP', false);
								}, 3000);
							}else{
								commit('SET_ORDER_SUCCESS_TIP', false);
							}
						}).catch(error => {
							reject(error)
						})
					}

					commit('SET_USER_INFO', res.data)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息 --三方
		GetOuterInfo({
			commit,
			state
		}, userInfo) {
			return new Promise((resolve, reject) => {
				setToken(userInfo.token)
				commit('SET_USER_INFO', userInfo)
				resolve(res)
			})
		},

		// 退出系统
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				commit('SET_TOKEN', '')
				commit('SET_ROLES', [])
				commit('SET_PERMISSIONS', [])
				commit('SET_USER_INFO', {})
				commit('SET_LOGIN_POPUP', false)
				removeToken()
				storage.clean()
				commit('SET_ORDER_SUCCESS_TIP', false);
				resolve()

			})
		},
		// 新增：手动关闭通知的方法
		closeOrderSuccessTip({ commit }) {
			commit('SET_ORDER_SUCCESS_TIP', false);
		},
		// 设置语言
		Language({
			commit
		}, info) {
			return new Promise((res, rej) => {
				commit('SET_LANGUAGE', info)
				res()
			})
		},

		setCode({
			commit
		}, code) {
			commit('SET_CODES', code)
		}
	}
}

export default user