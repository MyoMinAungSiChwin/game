<template>
	<view class="game_userinfo">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('userinfo.text53')}}</text>
					</view>
				</view>
		
			</u-navbar>
		</view>
<!-- 		<game-header /> -->
		<view class="userinfo"
			:style="promotionVisible ? 'background-color: black;margin-top:100rpx;' : 'background-color: black;margin-top:0rpx;'">
			<!-- 顶部卡片容器 -->
<!--      <br/> <br/>-->
			<view class="profile-card">
				<!-- 内容区域 -->
				<view class="card-content">
					<!-- 上半部分：头像+信息 -->
					<view class="top-section">
						<image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
						<view class="info-container">
							<view class="level">VIP-{{vipsInfo.level}}</view>
							<view class="username">{{userInfo.username}}</view>
							<view class="nickname">@{{userInfo.username}}</view>
						</view>
					</view>

					<!-- 下半部分：金额模块 -->
					<view class="amount-section" @tap="sxClick">
						<text class="amount">K {{userInfo.money}}</text>
						<image class="refresh-icon" src="/static/load.png"></image>
					</view>
					<view class="button-group"
						style="display: flex; align-items: center; gap: 20rpx; margin-top: 30rpx;white-space: nowrap;">
						<u-button class="charge" shape="circle"
							@click="moenyClick(1)">{{$t('account.text1')}}</u-button>
						<u-button class="withdraw-vtb" shape="circle"
							@click="moenyClick(2)">{{$t('account.text2')}}</u-button>
						<u-button class=" card-manage" shape="circle"
							@click="moenyClick(3)">{{$t('account.text36')}}</u-button>
						<!-- <view class="btn charge" @tap="moenyClick(1)">{{$t('account.text1')}}</view>
						<view class="btn withdraw-vtb" @tap="moenyClick(2)">{{$t('account.text2')}}</view>
						<view class="btn card-manage" @tap="moenyClick(3)">{{$t('account.text36')}}</view> -->
					</view>

				</view>
			</view>
			<view style="margin-top: 30rpx;" v-if="tabText === $t('userinfo.text35')">
				<!-- <u-divider :text="$t('userinfo.text35')" textPosition="left"></u-divider> -->
				<u-divider :text="$t('account.text71')" textPosition="left" line-color="#be984c"
					text-color="#be984c"></u-divider>
				<view class="menu-grid">
					<view class="grid-container">
						<!-- 每个grid项 -->
						<view class="grid-item" v-for="(item, index) in gridItems" :key="index" @tap="jumpUrl(item)">
							<image v-if="item.type == 1" class="grid-icon"
								:src="userInfo.is_vip_claim > 0 ? item.selecticon : item.icon"></image>
							<text v-if="item.type == 1" class="grid-text"
								:style="userInfo.is_vip_claim > 0 ? 'color:red;' : ''">{{item.text}}</text>
							<image v-if="item.type !== 1" class="grid-icon" :src="item.icon"></image>
							<text v-if="item.type !== 1" class="grid-text">{{item.text}}</text>
						</view>
					</view>
				</view>
				<view v-if="userInfo.is_agent == 1">
					<u-divider :text="$t('account.text72')" textPosition="left" line-color="#4e65a1"
						text-color="#4e65a1"></u-divider>
					<view class="menu-grid">
						<view class="grid-container">
							<!-- 每个grid项 -->
							<view class="grid-item" v-for="(item, index) in agentItem" :key="index"
								@tap="jumpUrl(item)">
								<image class="grid-icon" :src="item.icon"></image>
								<text class="grid-text">{{item.text}}</text>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<view class="info_tow" v-if="tabText === $t('userinfo.text2')">
			<u-tabs :list="towTabs" :current="actIndex" :activeStyle="{color: '#4180ed'}"
				:inactiveStyle="{color: '#fff'}" @change="changeTows"></u-tabs>

			<view class="tow_table">
				<!-- 提现 -->
				<template v-if="towsType == $t('userinfo.text8')">
					<withdraw />
				</template>
				<!-- 充值 -->
				<template v-if="towsType == $t('userinfo.text12')">
					<filling />
				</template>

				<!-- 流水 -->
				<template v-if="towsType == $t('userinfo.text13')">
					<running />
				</template>
				<!-- 返利 -->
				<template v-if="towsType == $t('userinfo.text14')">
					<rebate />
				</template>

				<template v-if="towsType == $t('userinfo.text33')">
					<invitation />
				</template>
				<template v-if="towsType == $t('userinfo.text49')">
					<fk />
				</template>
			</view>
		</view>
		<!-- 修改密码 -->
		<u-modal :show="pwdShow" :title="$t('login.text21')" :confirmText="$t('tzjl.text13')"
			:cancelText="$t('tzjl.text14')" showCancelButton @cancel="cancelPwd" @confirm="confirmPwd">
			<view class="slot-content" style="width: 100%;">
				<view><u-divider :text="$t('login.text35')"></u-divider></view>
				<view>
					<!-- 新增：登录旧密码 -->
					<view style="margin-top: 10rpx;">
						<text style="color: black;">{{$t('login.text23')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text29')" border="surround" v-model="old_password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPassword = !showPassword">
								<u-icon :name="showPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>

					<view style="margin-top: 20rpx;">
						<text style="color: black;">{{$t('login.text24')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text30')" border="surround" v-model="password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPassword = !showPassword">
								<u-icon :name="showPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>

					<view style="margin-top: 10rpx;">
						<text style="color: black;">{{$t('login.text25')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text31')" border="surround" v-model="qr_password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPassword = !showPassword">
								<u-icon :name="showPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view v-if="userInfo.is_tx_password == 1"><u-divider :text="$t('login.text36')"></u-divider></view>
				<view v-if="userInfo.is_tx_password == 1">
					<!-- 新增：资金旧密码 -->
					<view style="margin-top: 10rpx;">
						<text style="color: black;">{{$t('login.text26')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPayPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text32')" border="surround"
								v-model="old_tx_password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPayPassword = !showPayPassword">
								<u-icon :name="showPayPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>

					<view style="margin-top: 20rpx;">
						<text style="color: black;">{{$t('login.text27')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPayPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text33')" border="surround" v-model="tx_password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPayPassword = !showPayPassword">
								<u-icon :name="showPayPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>

					<view style="margin-top: 10rpx;">
						<text style="color: black;">{{$t('login.text28')}}</text>
						<view style="margin-top: 10rpx;position: relative;">
							<u--input :type="showPayPassword ? 'text' : 'password'" clearable
								:placeholder="$t('login.text34')" border="surround" v-model="qr_tx_password"></u--input>
							<!-- 眼睛图标 -->
							<view style="position: absolute; right: 20rpx; top: 50%; transform: translateY(-50%);"
								@tap.stop="showPayPassword = !showPayPassword">
								<u-icon :name="showPayPassword ? 'eye' : 'eye-off'" size="20" color="#999"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-modal>
		<!-- 底部 -->
		<game-footer />
		<global-notify></global-notify>

		<game-tabbar :tabbarValue="4" />
	</view>
</template>

<script>
	import {
		gamevipsInfo,
		gameRebate,
		updatePwd
	} from '@/api/userinfo.js'

	import rebate from './child/rebate.vue'
	import running from './child/running.vue'
	import filling from './child/filling.vue'
	import withdraw from './child/withdraw.vue'
	import invitation from './child/invitation.vue'
	import fk from './child/fk.vue'
	import {
		mapGetters
	} from 'vuex'
	import index from '../../uni_modules/uview-ui'

	export default {
		name: 'gameUserinfo',
		components: {
			rebate,
			running,
			filling,
			withdraw,
			invitation,
			fk
		},
		computed: {
			...mapGetters(['userInfo', 'promotionVisible','showOrderSuccessTip','tipMessage']),
			// completionPercentage() {
			// 	if (this.userInfo.current_mosaic <= 0) {
			// 		return 0; // 避免除以0的情况
			// 	}
			// 	return (this.userInfo.record_amount / this.userInfo.current_mosaic) * 100;
			// }
		},
		onLoad(options) {

			if (options.text) {
				this.tabText = options.text
			}
			if (this.$isLogin()) {
				this.getGamevipsInfo()
			}
		},

		data() {
			return {
				showChild: false,
				childIndex: 0,
				actIndex: 0,
				pwdShow: false,
				old_password: '', // 新增：当前登录密码
				password: '',
				qr_password: '',
				old_tx_password: '', // 新增：当前资金密码
				tx_password: '',
				qr_tx_password: '',
				showPassword: false, // 控制登录密码可见性
				showPayPassword: false, // 控制资金密码可见性
				tabText: this.$t('userinfo.text35'),
				gridItems: [{
						icon: '/static/images/grzx/new/vip.png',
						selecticon: '/static/images/grzx/new/vip_red.png',
						text: this.$t('userinfo.text36'),
						url: '/pages/vip/index',
						type: 1
					},
					// {
					// 	icon: '/static/images/grzx/new/yqhy.png',
					// 	text: this.$t('userinfo.text37'),
					// 	url: '/pages/convidar/index',
					// 	type: 2
					// },
					{
						icon: '/static/images/grzx/new/wdzx.png',
						text: this.$t('userinfo.text38'),
						url: '/pages/withdraw/addBankCard',
						type: 3
					},
					{
						icon: '/static/images/grzx/new/czjl.png',
						text: this.$t('userinfo.text39'),
						url: '/pages/voucher-center/vouReport',
						type: 4
					},
					{
						icon: '/static/images/grzx/new/tx.png',
						text: this.$t('userinfo.text40'),
						url: '/pages/voucher-center/vouReport',
						type: 5
					},

					{
						icon: '/static/images/grzx/new/ls.png',
						text: this.$t('userinfo.text41'),
						type: 6
					},
					{
						icon: '/static/images/grzx/new/ls.png',
						text: this.$t('userinfo.text52'),
						url: '/pages/userinfo/tzjl',
						type: 13
					},
					{
						icon: '/static/images/grzx/new/ze.png',
						text: this.$t('userinfo.text42'),
						type: 7
					},

					// {
					// 	icon: '/static/images/grzx/new/yqjl.png',
					// 	text: this.$t('userinfo.text43'),
					// 	type: 8
					// },

					{
						icon: '/static/images/grzx/new/fk.png',
						text: this.$t('userinfo.text49'),
						type: 10
					},

					{
						icon: '/static/images/grzx/new/czjl.png',
						text: this.$t('team.text17'),
						type: 11
					},
					// {
					// 	icon: '/static/images/grzx/jy.png',
					// 	text: '投诉建议'
					// },
					// {
					// 	icon: '/static/images/grzx/app.png',
					// 	text: '下载APP'
					// },
					{
						icon: '/static/images/grzx/new/kf.png',
						text: this.$t('userinfo.text44'),
						type: 9
					},
					{
						icon: '/static/images/grzx/new/ze.png',
						text: this.$t('login.text21'),
						type: 14
					},
					// {
					// 	icon: '/static/images/grzx/new/exit.png',
					// 	text: this.$t('userinfo.text50'),
					// 	type: 12
					// },

				],
				agentItem: [{
						icon: '/static/images/grzx/new/zonglan.png',
						text: this.$t('team.text18'),
						url: '/pages/agent/team/overview',
						type: 1
					},
					{
						icon: '/static/images/grzx/new/tdgl.png',
						text: this.$t('team.text19'),
						url: '/pages/agent/team/index',
						type: 1
					},
					{
						icon: '/static/images/grzx/new/ykjl.png',
						text: this.$t('team.text1'),
						url: '/pages/agent/team/yk',
						type: 1
					},
					// {
					// 	icon: '/static/images/grzx/new/ykjl.png',
					// 	text: this.$t('team.text1'),
					// 	url: '/pages/agent/team/userInfo',
					// 	type: 1
					// },
					{
						icon: '/static/images/grzx/new/kh.png',
						text: this.$t('team.text44'),
						url: '/pages/agent/team/kh',
						type: 1
					},
					{
						icon: '/static/images/grzx/new/wdesr.png',
						text: this.$t('team.text50'),
						url: '/pages/agent/team/mysr',
						type: 1
					},
					{
						icon: '/static/images/grzx/new/yqjl.png',
						text: this.$t('team.text90'),
						url: '/pages/agent/team/account_record',
						type: 1
					},
					// {
					// 	icon: '/static/images/grzx/new/yqjl.png',
					// 	text: this.$t('team.text95'),
					// 	url: '/pages/agent/team/team_betting',
					// 	type: 1
					// },
				],

				childList: [{
						text: this.$t('userinfo.text1'),
						flUrl: require('@/static/images/convidar/userinfo.png')
					},
					{
						text: this.$t('userinfo.text2'),
						flUrl: require('@/static/images/convidar/userinfo.png')
					},
					{
						text: this.$t('userinfo.text3'),
						flUrl: require('@/static/images/convidar/userinfo.png')
					},
				],
				towTabs: [{
						name: this.$t('userinfo.text8'),
						index: 0
					},
					{
						name: this.$t('userinfo.text12'),
						index: 1
					},
					{
						name: this.$t('userinfo.text13'),
						index: 2
					},
					{
						name: this.$t('userinfo.text14'),
						index: 3
					},
					{
						name: this.$t('userinfo.text33'),
						index: 4
					},
					{
						name: this.$t('userinfo.text49'),
						index: 5
					},
				],
				vipsInfo: {},
				towsType: this.$t('userinfo.text12'),

			};
		},
		methods: {
	
			jumpUrl(item) {
				if (item.type == 1) {
					this.$tab.navigateTo(item.url)
				} else if (item.type == 2) {
					this.$tab.switchTab(item.url)
				} else if (item.type == 3) {
					this.$tab.navigateTo(item.url)
					//this.$store.dispatch('setUserPopup', true)
				} else if (item.type == 4) {
					this.$tab.navigateTo(item.url)
					// this.tabText = this.$t('userinfo.text2');
					// this.towsType = this.$t('userinfo.text12')
					// const targetName = this.towsType;
					// const foundItem = this.towTabs.find(item => item.name === targetName);
					// this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 5) {
					this.$tab.navigateTo(item.url)
					// this.tabText = this.$t('userinfo.text2');
					// this.towsType = this.$t('userinfo.text8')
					// const targetName = this.towsType;
					// const foundItem = this.towTabs.find(item => item.name === targetName);
					// this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 13) {
					this.$tab.navigateTo(item.url)
					// this.tabText = this.$t('userinfo.text2');
					// this.towsType = this.$t('userinfo.text8')
					// const targetName = this.towsType;
					// const foundItem = this.towTabs.find(item => item.name === targetName);
					// this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 6) {
					this.tabText = this.$t('userinfo.text2');
					this.towsType = this.$t('userinfo.text13')
					const targetName = this.towsType;
					const foundItem = this.towTabs.find(item => item.name === targetName);
					this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 7) {
					this.tabText = this.$t('userinfo.text2');
					this.towsType = this.$t('userinfo.text14')
					const targetName = this.towsType;
					const foundItem = this.towTabs.find(item => item.name === targetName);
					this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 8) {
					this.tabText = this.$t('userinfo.text2');
					this.towsType = this.$t('userinfo.text33')
					const targetName = this.towsType;
					const foundItem = this.towTabs.find(item => item.name === targetName);
					this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 9) {
					//客服
					const url =
						"https://36ia3gupax.irc6cz4m.com/9d2b025de53dd2fbd0b295ddjkfle-kelid120bf0e2054d3ea541099c2449ff66a8b4770800d1c71a668f2528594638ec3";
					window.open(url, '_blank');
				} else if (item.type == 10) {
					this.tabText = this.$t('userinfo.text2');
					this.towsType = this.$t('userinfo.text49')
					const targetName = this.towsType;
					const foundItem = this.towTabs.find(item => item.name === targetName);
					this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 12) {
					// 1. 先登出并关闭弹窗
					this.$store.dispatch('LogOut');
					this.$store.dispatch('setUserPopup', false);
					// 2. 构造只含非空参数的 query 对象
					  const PARAM_KEYS = ['invitation_code', 'is_agent', 'link_id'];
					  const query = {};

					  PARAM_KEYS.forEach(key => {
						// uni.getStorageSync 不存在时返回 '' 或 undefined
						const val = uni.getStorageSync(key);
						if (val !== null && val !== undefined && val !== '') {
						  query[key] = val;
						}
					  });

					  // 3. 小延迟后再跳转
					  this.$dDelay(100).then(() => {
						// 如果 query 里没东西，也会正常跳转，只是不带参数
						this.$router.push({
						  path: '/pages/jogos/index',
						  query
						});
					  });
				} else if (item.type == 11) {
					this.$tab.navigateTo(`/pages/team/index`)
				} else if (item.type == 13) {
					this.$tab.navigateTo(item.url)
					// this.tabText = this.$t('userinfo.text2');
					// this.towsType = this.$t('userinfo.text8')
					// const targetName = this.towsType;
					// const foundItem = this.towTabs.find(item => item.name === targetName);
					// this.actIndex = foundItem ? foundItem.index : -1; // -1 表示未找到
				} else if (item.type == 14) {
					console.log("修改密码");
					this.pwdShow = true

				}
			},
			// 确认修改密码
			// 确认修改密码
			async confirmPwd() {
				// 验证登录密码
				if (this.password || this.qr_password) {
					// 验证旧密码是否填写
					if (!this.old_password) {
						return uni.showToast({
							title: this.$t('login.text29'),
							icon: 'none'
						});
					}
					if (this.password !== this.qr_password) {
						return uni.showToast({
							title: this.$t('login.text37'),
							icon: 'none'
						});
					}
					if (this.password.length < 6) {
						return uni.showToast({
							title:this.$t('login.text38'),
							icon: 'none'
						});
					}
				}

				// 验证资金密码
				if (this.tx_password || this.qr_tx_password) {
					// 验证旧资金密码是否填写
					if (!this.old_tx_password) {
						return uni.showToast({
							title: this.$t('login.text32'),
							icon: 'none'
						});
					}
					if (this.tx_password !== this.qr_tx_password) {
						return uni.showToast({
							title:this.$t('login.text39'),
							icon: 'none'
						});
					}
					if (this.tx_password.length < 6) {
						return uni.showToast({
							title: this.$t('login.text40'),
							icon: 'none'
						});
					}
				}

				// 检查是否至少修改了一项
				if (!this.password && !this.tx_password) {
					return uni.showToast({
						title:  this.$t('login.text41'),
						icon: 'none'
					});
				}

				try {
					// 记录是否修改了登录密码（用于后续判断是否需要退出登录）
					const modifiedLoginPassword = !!this.password;
					// 构造请求参数
					const params = {
						old_password: this.old_password, // 当前登录密码
						password: this.password || undefined, // 为空则不传
						old_tx_password: this.old_tx_password, // 当前资金密码
						tx_password: this.tx_password || undefined
					};

					let {
						code,
						data
					} = await updatePwd(params)
					if (code == 200) {
						uni.showToast({
							title:this.$t('login.text42'),
							icon: 'success'
						});
						// 根据是否修改登录密码执行不同操作
						if (modifiedLoginPassword) {
							console.log("1231233")
							this.cancelPwd();
							// 仅当修改了登录密码时才执行退出操作
							uni.showLoading({
								title: this.$t('login.text43'),
							});

							this.$store.dispatch('LogOut');
							this.$store.dispatch('setUserPopup', false);

							// 延迟跳转到首页
							setTimeout(() => {
								uni.hideLoading();
								this.$tab.switchTab('/pages/jogos/index');
								// 刷新页面确保清除状态
								setTimeout(() => {
									location.reload();
								}, 500);
							}, 1000);
						} else {
							// 如果只修改了资金密码，则关闭弹窗即可
							this.cancelPwd();
						}

					} else {
						uni.showToast({
							title:  this.$t('login.text44'),
							icon: 'none'
						});
					}

				} catch (error) {}
			},

			// 取消修改
			cancelPwd() {
				this.pwdShow = false;
				// 清空输入内容
				// 清空所有输入
				this.old_password = '';
				this.password = '';
				this.qr_password = '';
				this.old_tx_password = '';
				this.tx_password = '';
				this.qr_tx_password = '';
				// 重置密码可见性状态
				this.showPassword = false;
				this.showPayPassword = false;
			},
			changeChildItem(text, index) {
				if (index == 2) return this.$tab.switchTab('/pages/convidar/index')
				this.tabText = text
				this.childIndex = index
				this.showChild = false
			},
			leftClick(){
					this.$tab.switchTab('/pages/jogos/index');
			},
			moenyClick(i) {
				// 存款
				if (i == 1) {
					this.$tab.navigateTo(`/pages/voucher-center/index`)
					// this.$store.dispatch('setAccountPopup', true)
					// return this.$store.dispatch('setAccessMode')
				}
				// 取款
				if (i == 2) {
					this.$tab.navigateTo(`/pages/withdraw/index`)
					// this.$store.dispatch('setAccountPopup', true)
					// return this.$store.dispatch('setAccessMode', 1)
				}
				if (i == 3) {
					this.$tab.navigateTo(`/pages/withdraw/myWithdrawCards`)
					// this.$store.dispatch('setAccountPopup', true)
				}
			},
			sxClick() {
				this.tabText = this.$t('userinfo.text35');
				this.towsType = this.$t('userinfo.text12')
				this.$modal.msg(this.$t('userinfo.text45'))
			},

			async getGamevipsInfo() {
				let {
					code,
					data
				} = await gamevipsInfo()
				console.log(data)
				if (code == 200) {
					this.vipsInfo = data
				}
			},

			changeTows({
				name
			}) {
				this.towsType = name
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_userinfo {
		// padding-top: 120rpx;
		color: #fff;

		.userinfo {
			padding: 20rpx;
		}

		.profile-card {
			height: 430rpx;
			border-radius: 20rpx;
			position: relative;
			overflow: hidden;
		}

		.card-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			opacity: 0.9;
		}

		.card-content {
			display: flex;
			flex-direction: column;
		}

		.top-section {
			display: flex;
			align-items: center;
			margin-bottom: 40rpx;
		}

		/* 修正头像样式 */
		.avatar {
			width: 140rpx !important;
			height: 140rpx !important;
			border-radius: 50%;
			border: 4rpx solid #fff;
			margin-right: 30rpx;
		}

		/* 金额模块样式 */
		.amount-section {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
		}

		.amount {
			font-size: 44rpx;
			color: #2d3436;
			font-weight: 600;
			text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.1);
		}

		.refresh-icon {
			width: 70rpx;
			height: 70rpx;
			padding: 12rpx;
			border-radius: 50%;
		}

		.info-container {
			display: flex;
			flex-direction: column;
			color: #333;
		}

		.level {
			background: #ffd700;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			font-size: 24rpx;
			align-self: flex-start;
			margin-bottom: 15rpx;
		}

		.username {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 10rpx;
		}

		.nickname {
			font-size: 28rpx;
			color: #666;
		}

		.profile-card {
			background-image: url('/static/card.png');
			background-position: center;
			background-size: 100%;
			background-repeat: no-repeat;
			// background: linear-gradient(135deg, #83a4d4, #b6fbff);
			border-radius: 20rpx;
			padding: 30rpx;
			position: relative;
		}

		/* 按钮容器样式 */
		.button-group {
			display: flex;
			// justify-content: center;
			// gap: 60rpx;
			justify-content: space-between;
			//margin-top: 30rpx;
			//padding: 0 20rpx;
		}

		/* 基础按钮样式 */
		.btn {
			padding: 36rpx 40rpx;
			//padding: 0rpx 24rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: 500;
			transition: all 0.3s;
			//box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		}

		/* 不同按钮的配色方案 */
		.charge {
			background-image: url('/static/cz.png');
			background-position: center;
			background-repeat: no-repeat;
			// background-size: 100%;
			//background: linear-gradient(45deg, #00c853, #64dd17);
			color: #fff;
		}

		.withdraw-vtb {
			// background: linear-gradient(45deg, #2962ff, #448aff);
			background-image: url('/static/qk.png');
			background-position: center;
			background-repeat: no-repeat;
			// background-size: 100%;
			color: #fff;
		}

		.card-manage {
			// background: linear-gradient(45deg, #607d8b, #78909c);
			background-image: url('/static/kgl.png');
			background-position: center;
			background-repeat: no-repeat;
			// background-size: 100%;
			color: #fff;
		}

		/* 点击效果 */
		.btn:active {
			transform: translateY(2rpx);
			box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
		}

		.menu-grid {
			// padding: 0rpx 20rpx;
		}

		.grid-container {
			display: flex;
			flex-wrap: wrap;

			border-radius: 16rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
		}

		.grid-item {
			width: 25%;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30rpx 0;
			/* 默认所有元素都有padding */
			box-sizing: border-box;
			position: relative;
		}

		/* 精准选择前4个元素（首行） */
		.grid-item:nth-child(-n+4) {
			padding-top: 0;
			padding-bottom: 0;
		}

		/* 如果需要完全移除首行元素的上下padding */
		.grid-item:nth-child(-n+4) {
			padding: 0;
		}

		/* 如果只需要移除顶部padding */
		.grid-item:nth-child(-n+4) {
			padding-top: 0;
		}

		/* 如果需要调整首行元素的底部间距 */
		.grid-item:nth-child(-n+4) {
			padding: 0 0 15rpx 0;
		}

		.grid-icon {
			width: 80rpx;
			height: 80rpx;
			// background-color: #2b2623;
			padding: 12rpx;
			border-radius: 50%;
			margin-bottom: 16rpx;
		}

		.grid-text {
			font-size: 24rpx;
			color: #be984c;
			line-height: 1.4;
			text-align: center;
			padding: 0 10rpx;
		}

		/* 点击效果 */
		.grid-item:active {
			// background-color: #f5f5f5;
		}
	}
</style>