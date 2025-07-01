
<script>
	import config from './config'
	import store from '@/store'
	import {
		getToken
	} from '@/utils/auth'
	import {
		getOuterByUser
	} from './api/outerapi'
import { mapState, mapActions } from 'vuex';
	export default {
		computed: {
				...mapState('user', ['showOrderSuccessTip', 'tipMessage'])
			},
		onLaunch: function(option) {
		
			// 判断是否刷新页面
			if (this.isPageReload()) {
				uni.removeStorageSync('promotionVisible')
			}
			 this.initApp(option.query)
		},
		onShow() {
			uni.hideTabBar();
		},
		methods: {
			...mapActions('user', ['closeOrderSuccessTip']),
					closeDownload() {
						this.closeOrderSuccessTip();
					},
			// 获取带参数的完整路径
			getCurrentFullPath() {
				// H5 环境处理
				//#ifdef H5
				const hashPath = window.location.hash.replace(/^#\//, '') || '/pages/jogos/index'
				return hashPath.includes('?') ? hashPath : `${hashPath}?t=${Date.now()}`
				//#endif

				// 小程序环境处理
				//#ifdef MP-WEIXIN
				const pages = getCurrentPages()
				return pages.length > 0 ? pages[pages.length - 1].route : '/pages/jogos/index'
				//#endif
			},
			// 检测页面刷新
			isPageReload() {
				if (typeof performance !== 'undefined') {
					const entries = performance.getEntriesByType('navigation')
					return entries[0]?.type === 'reload'
				}
				return false
			},
			// 初始化应用
			initApp(query) {
				// 初始化应用配置
				this.initConfig()
				// 检查用户登录状态
				//#ifdef H5
				this.checkLogin()
				// if (Object.keys(query).length > 0 ) {
				// 	this.syncLogin(query)
				// }
				if (query.userid !== undefined && query.token !== undefined) {
				    this.syncLogin(query);
				}

				//#endif
			},
			initConfig() {
				this.globalData.config = config
			},
			checkLogin() {
				if (!getToken()) {
					// this.$tab.reLaunch('/pages/login') 
				}
			},
			syncLogin(query) {
				let data = {
					userid: query.userid,
					token: query.token
				};
				getOuterByUser(data)
					.then(res => {
						// 后续操作
						this.$store.dispatch('GetOuterInfo', res.data.userinfo)
						this.$store.dispatch('setLoginPopup', false);
						this.$setTemporizador()
					})
					.catch(error => {
						console.error("同步登录失败:", error);
					});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/global.scss';

	.splash-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #ffffff;
		z-index: 9999;
		transition: opacity 0.5s;
	}

	.logo {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: contain;
		/* 保持图片比例 */
	}

	.loading-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 28rpx;
		color: #666;
		z-index: 2;
		/* 确保文字在图片上方 */
		text-shadow: 0 0 4rpx rgba(255, 255, 255, 0.5);
		/* 增加文字可视性 */
	}

	::v-deep .u-cell__body {
		padding: 0 !important;
	}

	::v-deep .u-cell__right-icon-wrap--down {
		display: none !important;
	}

	::v-deep .u-cell__right-icon-wrap--up {
		display: none !important;
	}

	::v-deep .u-collapse-item__content__text {
		padding: 12px 2px !important;
		//background-color: rgb(237, 165, 102) !important;
	}
	.u-form-item__body__right__message{
		margin-left: 0 !important;
	}
	.u-collapse-content img{
		width: 100% !important;
	}
	// @keyframes rotate {
	//   from { transform: rotate(0deg); }
	//   to { transform: rotate(360deg); }
	// }
</style>