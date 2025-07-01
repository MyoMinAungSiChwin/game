<template>
	<view class="game_userinfo">
		<game-header />
		<view class="userinfo">
			<!-- 顶部卡片容器 -->
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
					<view class="amount-section">
						<text class="amount">K {{userInfo.money}}</text>
						<image class="refresh-icon" src="/static/images/grzx/sx.png"></image>
					</view>
					<view class="button-group">
						<view class="btn charge">充值</view>
						<view class="btn withdraw">提款</view>
						<view class="btn card-manage">卡管理</view>
					</view>

				</view>
			</view>
			<view style="margin-top: 30rpx;">
				<u-divider text="会员中心" textPosition="left"></u-divider>
				<view class="menu-grid">
					<view class="grid-container">
						<!-- 每个grid项 -->
						<view class="grid-item" v-for="(item, index) in gridItems" :key="index">
							<image class="grid-icon" :src="item.icon"></image>
							<text class="grid-text">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="4" />
	</view>
</template>

<script>
	import {
		gamevipsInfo,
		gameRebate
	} from '@/api/userinfo.js'

	import rebate from './child/rebate.vue'
	import running from './child/running.vue'
	import filling from './child/filling.vue'
	import withdraw from './child/withdraw.vue'
	import invitation from './child/invitation.vue'

	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'gameUserinfo',
		components: {
			rebate,
			running,
			filling,
			withdraw,
			invitation
		},
		computed: {
			...mapGetters(['userInfo']),
			completionPercentage() {
				if (this.userInfo.current_mosaic <= 0) {
					return 0; // 避免除以0的情况
				}
				return (this.userInfo.record_amount / this.userInfo.current_mosaic) * 100;
			}
		},
		onLoad(options) {
			if (options.text) {
				this.tabText = options.text
			}
			console.log(1333)
			if (this.$isLogin()) {
				this.getGamevipsInfo()
			}
			
		},

		data() {
			return {
				showChild: false,
				childIndex: 0,
				tabText: this.$t('userinfo.text1'),
				gridItems: [{
						icon: '/static/images/grzx/jl.png',
						text: '奖励中心'
					},
					{
						icon: '/static/images/grzx/tz.png',
						text: '投注记录'
					},
					{
						icon: '/static/images/grzx/yk.png',
						text: '盈亏记录'
					},
					{
						icon: '/static/images/grzx/cz.png',
						text: '充值记录'
					},
					{
						icon: '/static/images/grzx/tx.png',
						text: '提现记录'
					},
					{
						icon: '/static/images/grzx/zb.png',
						text: '账变记录'
					},
					{
						icon: '/static/images/grzx/my.png',
						text: '我的中心'
					},
					{
						icon: '/static/images/grzx/aq.png',
						text: '账号安全'
					},
					{
						icon: '/static/images/grzx/yq.png',
						text: '邀请好友'
					},
					{
						icon: '/static/images/grzx/xx.png',
						text: '消息中心'
					},
					{
						icon: '/static/images/grzx/jy.png',
						text: '投诉建议'
					},
					{
						icon: '/static/images/grzx/app.png',
						text: '下载APP'
					},
					{
						icon: '/static/images/grzx/kf.png',
						text: '在线客服'
					}
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
						name: this.$t('userinfo.text8')
					},
					{
						name: this.$t('userinfo.text12')
					},
					{
						name: this.$t('userinfo.text13')
					},
					{
						name: this.$t('userinfo.text14')
					},
					{
						name: this.$t('userinfo.text33')
					},
				],
				vipsInfo: {},
				towsType: this.$t('userinfo.text12'),

			};
		},
		methods: {
			changeChildItem(text, index) {
				if (index == 2) return this.$tab.switchTab('/pages/convidar/index')
				this.tabText = text
				this.childIndex = index
				this.showChild = false
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
		padding-top: 120rpx;
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
			width:70rpx;
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
			background: linear-gradient(135deg, #83a4d4, #b6fbff);
			border-radius: 20rpx;
			padding: 30rpx;
			position: relative;
		}

		/* 按钮容器样式 */
		.button-group {
			display: flex;
			// justify-content: center;
			gap: 60rpx;
			margin-top: 50rpx;
			padding: 0 20rpx;
		}

		/* 基础按钮样式 */
		.btn {
			padding: 16rpx 50rpx;
			border-radius: 40rpx;
			font-size: 28rpx;
			font-weight: 500;
			transition: all 0.3s;
			box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
		}

		/* 不同按钮的配色方案 */
		.charge {
			background: linear-gradient(45deg, #00c853, #64dd17);
			color: #fff;
		}

		.withdraw {
			background: linear-gradient(45deg, #2962ff, #448aff);
			color: #fff;
		}

		.card-manage {
			background: linear-gradient(45deg, #607d8b, #78909c);
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
			background-color: #2b2623;
			padding: 12rpx;
			border-radius: 50%;
			margin-bottom: 16rpx;
		}

		.grid-text {
			font-size: 24rpx;
			color: #e2c5a5;
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