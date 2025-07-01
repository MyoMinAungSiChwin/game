<template>
	<view class="d_mine">
		<view class="d_m_user d_flex">
			<u-avatar class="fl" size="100rpx" :src="userInfo.avatar" shape="square"></u-avatar>
			<view class="con d_flex">
				<view>{{userInfo.username}}</view>
				<view class="d_flex" @tap="copyData">
					<text style="margin-right: 20rpx;">ID: {{userInfo.id}}</text>
					<u--image :showLoading="true" src="../../static/images/copy.png" width="28rpx"
						height="28rpx"></u--image>
				</view>
			</view>
			<<!-- view class="fr border_shadow">
				<text>按钮</text>
		</view> -->
	</view>
	<view class="d_m_detail">
		<u-grid :border="false" col="2">
			<u-grid-item class="detail_grid_item">
				<text>{{gameAmount.money}}</text>
				<text>{{$t('mine.text1')}}</text>
			</u-grid-item>
			<u-grid-item class="detail_grid_item">
				<view class="d_flex">
					<text style="margin-right: 10rpx;">{{gameAmount.balance}}</text>
					<u-icon name="reload" color="#999" size="34rpx" @tap="changeGameAmount"></u-icon>
				</view>
				<text>{{$t('mine.text22')}}</text>
			</u-grid-item>
		</u-grid>
	</view>
	<view class="d_m_vip d_bgColor border_shadow d_border12">
		<view class="vi_top d_flex">
			<view class="v_t_fl">
				<u--image :showLoading="true" src="../../static/images/vip-background.png" width="200rpx"
					height="160rpx" mode="scaleToFill">
				</u--image>
				<text>VIP {{userInfo.level}}</text>
			</view>
			<view class="v_t_fr">
				<view style="margin-bottom: 10rpx;">
					<text style="margin-right: 20rpx">{{$t('mine.text3')}}: </text>
					<text style="color: #ff5a2c;">{{userInfo.recharge}}</text>
				</view>
				<view>
					<u-line-progress :percentage="userInfo.recharge_b" activeColor="#37dfb1"></u-line-progress>
				</view>
				<view style="height: 24rpx;"></view>
				<view style="margin-bottom: 10rpx;">
					<text style="margin-right: 20rpx">{{$t('mine.text4')}}: </text>
					<text style="color: #ff5a2c;">{{userInfo.bet}}</text>
				</view>
				<view>
					<u-line-progress :percentage="userInfo.bet_b" activeColor="#37dfb1"></u-line-progress>
				</view>
			</view>
		</view>
		<view class="vi_grid">
			<u-grid :border="false" class="grid" col="2">
				<u-grid-item class="vi_grid_item d_border12 d_flex"
					@tap="$tab.navigateTo('/pages/mine/account/index?index=0')">
					<text style="margin-right: 20rpx;" class="grid-text">{{$t('mine.text5')}}</text>
					<u-icon name="../../static/images/conta.png" size="38rpx"></u-icon>
				</u-grid-item>
				<u-grid-item class="vi_grid_item d_border12 d_flex"
					@tap="$tab.navigateTo('/pages/mine/account/index?index=1')">
					<text style="margin-right: 20rpx;" class="grid-text">{{$t('mine.text6')}}</text>
					<u-icon name="../../static/images/conta.png" size="38rpx"></u-icon>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
	<view class="d_m_list border_shadow d_border12 d_bgColor">
		<view style="margin-top: 20rpx; color: #46b5fb;">
			{{$t('mine.text7')}}
		</view>
		<view class="li_items d_flex" @tap="$tab.navigateTo('/pages/mine/account/index?index=2')">
			<view>{{$t('mine.text8')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
		
		<view class="li_items d_flex" @tap="$tab.navigateTo('/pages/mine/backwater/index?index=2')">
			<view>{{$t('title.text26')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
		
		
		<view class="li_items d_flex" @tap="showConversion=true">
			<view>{{$t('mine.text9')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
		<view class="li_items d_flex" @tap="$tab.navigateTo('/pages/mine/play-record/index')">
			<view>{{$t('mine.text10')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
		<view class="li_items d_flex" @tap="$tab.navigateTo('/pages/mine/settings/index')">
			<view>{{$t('mine.text11')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
		<view class="li_items d_flex" @tap="show=true">
			<view>{{$t('mine.text12')}}</view>
			<u-icon name="arrow-right" color="#888" size="30rpx"></u-icon>
		</view>
	</view>

	<u-popup :show="show" @close="show=false" mode="center" round="16rpx">
		<view class="quit_pop d_bgColor d_border12">
			<view>
				<view style="height: 40rpx"></view>
				<view>{{$t('popUp.text4')}}</view>
			</view>
			<view class="d_flex">
				<u-button type="primary" :text="$t('userinfo.text15')" shape="circle" color="#22306b"
					@tap="show=false"></u-button>
				<u-button type="primary" :text="$t('userinfo.text16')" shape="circle" @tap="logOutBtn"
					color="linear-gradient(to right, rgb(34, 48, 107), rgb(0, 162, 251))"></u-button>
			</view>
		</view>
	</u-popup>

 
	</view>
</template>

<script>
	import {
		gameAmount,
	} from '@/api/mine.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				show: false,
				gameAmount: {},
				showConversion: false,
			 
			}
		},
		onShow() {
			this.getGameAmount()
			this.$store.dispatch('GetInfo')
		},
		methods: {
			logOutBtn() {
				this.$store.dispatch('LogOut').then(() => {
					this.show = false
					this.$modal.msg(this.$t('popUp.text19'))
					this.$dDelay(1000).then(res => {
						this.$tab.reLaunch('/')
					})
				})
			},

			async getGameAmount() {
				try {
					let {
						code,
						data
					} = await gameAmount()
					if (code == 200) {
						this.gameAmount = data
						uni.hideLoading()
					}
				} catch {
					uni.hideLoading()
				}

			},

			changeGameAmount() {
				uni.showLoading()
				this.getGameAmount()
			},


			// 复制内容
			copyData(){
				let _this = this
				uni.setClipboardData({
					data: String(_this.userInfo.id),
					success: function () {	
							_this.$modal.msg(_this.$t('mine.text27'))
						}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_mine {
		padding: 20rpx;

		.d_m_user {
			height: 120rpx;
			align-items: center;

			.con {
				padding: 0 20rpx;
				flex: 1;
				flex-direction: column;
				font-size: 36rpx;
				color: #fff;

				&>view:last-child {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: #999;
				}
			}

			.fr {
				padding: 0 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				font-size: 22rpx;
				color: #fff;
				background: linear-gradient(58deg, #ffa305 0%, #ffcc5a 100%);
			}
		}

		.d_m_detail {
			margin: 30rpx 0;

			.detail_grid_item {
				font-size: 38rpx;
				color: #fff;

				&>text:last-child {
					margin-top: 10rpx;
					color: #bebec2;
					font-size: 24rpx;
				}
			}
		}

		.d_m_vip {
			margin: 20rpx 0;
			padding-bottom: 20rpx;

			.vi_top {
				padding: 30rpx;
				height: 260rpx;
				color: #fff;

				.v_t_fl {
					position: relative;

					&>text {
						position: absolute;
						left: 50%;
						bottom: 50%;
						transform: translate(-50%, -20%);
					}
				}

				.v_t_fr {
					padding: 0 20rpx;
					flex: 1;
					font-size: 23rpx;

				}
			}

			.vi_grid {
				color: #fff;

				.vi_grid_item {
					flex-direction: row;
					margin-left: 20rpx;
					width: 46% !important;
					height: 100rpx;
					background: linear-gradient(58deg, #ff4e05 0%, #ff995a 100%) !important;
				}

				.vi_grid_item:nth-child(2) {
					background: linear-gradient(60deg, #3378ee 0%, #0de5ff 100%) !important;
				}



			}
		}

		.d_m_list {
			padding: 0 20rpx;
			color: #bebec2;
			overflow: hidden;

			.li_items {
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				font-size: 28rpx;
				border-bottom: 1px solid #666;

				&:last-child {
					border: none;
				}
			}
		}

		.quit_pop {
			padding: 20rpx;
			width: 600rpx;
			color: #fff;

			&>view:nth-child(1) {
				height: 130rpx;
				font-size: 29rpx;
			}

			&>view:nth-child(2) {
				.u-button {
					margin: 0 20rpx;
				}
			}
		}

	
	}
</style>