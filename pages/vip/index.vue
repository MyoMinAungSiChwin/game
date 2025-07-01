<template>
	<view class="d_vip">
		<game-header />
		<view class="vip">
			<view class="vip_one game_flex game_justify_center">
				<u--image :showLoading="true" :src="require('@/static/images/vip/vip_all_header.png')" width="480rpx"
					height="320rpx"></u--image>
			</view>
			<view class="vip_tow">
				<view class="vip_dengji" :style="{backgroundImage: `url(${$config.baseImgUrl + userInfo.vip_img})`}">
				</view>
				<view class="vip_foo">
					<text>vip-{{userInfo.level}}</text>
				</view>
			</view>
			<view class="vip_three">
				<view v-if="list.length">
					vip-{{list[index].level}}
					{{$t('vip.text1')}}
					{{list[index].running_money}}
					{{$t('vip.text2')}}
					{{list[index].running_water}}
					{{$t('vip.text3')}}
					。
				</view>
				<view>
					<!-- VIP TEM -->
					<!-- <text style="color: #d69140;"> 11 NÍVEIS </text> -->
					{{$t('vip.text4')}}
				</view>
			</view>
			<view class="vip_four game_flex align_center" v-if="list.length">
				<u--image :src="$config.baseImgUrl + list[index].image" width="200rpx" height="200rpx">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>

				<view>
					{{$t('vip.text5')}}
					{{list[index].level}}
				</view>

				<view class="four_title">
					{{$t('vip.text6')}}
				</view>
				<view>
					{{$t('vip.text7')}} {{list[index].running_water}}
				</view>

				<view>
					{{$t('vip.text8')}} {{list[index].running_money}}
				</view>
				<view class="four_title">
					{{$t('vip.text9')}}
				</view>
				<view>
					{{$t('vip.text10')}} {{list[index].withdraw}}
				</view>
				<view>
					{{$t('vip.text11')}} {{list[index].day_withdraw}}
				</view>
				<view>
					{{$t('vip.text12')}} {{list[index].withdraw_limt}}
				</view>
				<view>
					{{$t('vip.text13')}} {{list[index].week}}
				</view>
				<view>
					{{$t('vip.text14')}} {{list[index].moon}}
				</view>
				<view>
					{{$t('vip.text15')}} {{list[index].vip_up}}
				</view>
				<view>
					{{$t('vip.text16')}} {{list[index].single_withdraw}}
				</view>


			</view>

			<view class="vip_five game_flex game_justify_center">
				<view class="game_flex d_border12 align_center game_justify_center">
					<u-icon name="play-left-fill" :color="index == 0 ? '#999' : '#fff'" size="16"
						@tap="previous"></u-icon>
				</view>
				<view class="game_flex d_border12 align_center game_justify_center">
					<u-icon name="play-right-fill" :color="index == this.list.length-1 ? '#999' : '#fff'" size="16"
						@tap="nextPage"></u-icon>
				</view>
			</view>
		</view>
		<!-- 新增：悬浮领取奖励按钮 -->
		<view class="floating-reward" v-if="showRewardButton" @click="receiveVIPReward">
			<u--image :src="$config.baseImgUrl + userInfo.vip_img" width="80rpx" height="80rpx"></u--image>
			<text>领取</text>
		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="12" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		VIPList,
		claimVipReward
	} from '@/api/vip.js'
	export default {
		computed: {
			...mapGetters(['userInfo']),
			 showRewardButton() {
			    return this.userInfo && this.userInfo.is_vip_claim > 0;
			  }
		},
		data() {
			return {
				list: [],
				index: 0,
				userVipLevel: 0, // 用户实际VIP等级
				currentLevelRewardStatus: false // 当前等级奖励领取状态
			};
		},
		onLoad() {
			this.getVIPList()
		},
		methods: {
			// 新增：领取奖励
			async receiveVIPReward() {
				uni.showLoading({
					title: 'Loading...'
				});
				try {
					let data = await claimVipReward();
					if (data.code == 200) {
						this.$modal.msg("领取成功,奖励10分钟后到账!")
						 // 提交 mutation 更新状态
						this.$store.commit('setVipClaim', 0);
						 // 重新获取用户信息
						await this.$store.dispatch('GetInfo');
						location.reload();
					}
				} finally {
					uni.hideLoading()
				}
			},

			// 修改：获取VIP列表时处理奖励状态

			async getVIPList() {
				let {
					code,
					data
				} = await VIPList()
				if (code == 200) {
					this.list = data
				}
			},

			// 上一页
			previous() {
				if (this.index > 0) this.index -= 1
			},

			// 下一页
			nextPage() {
				if (this.index < this.list.length - 1) this.index += 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_vip {
		padding: 80rpx 20rpx 20rpx 20rpx;
		color: #fff;

		.vip {
			.vip_one {
				margin: 40rpx 0 20rpx 0;
			}

			.vip_tow {
				position: relative;
				margin: 30rpx auto;
				width: 400rpx;
				height: 400rpx;
				background: url('@/static/images/vip/vip_all_rank_bg.png') 100% / 100% no-repeat;

				.vip_dengji {
					position: absolute;
					width: 200rpx;
					height: 200rpx;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					background: 100% / 100% no-repeat;
				}

				.vip_foo {
					position: absolute;
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					bottom: -20rpx;
					left: 50%;
					text-align: center;
					transform: translateX(-50%);
					background: url('@/static/images/vip/vip_all_divider_bg.png') no-repeat;
					background-size: 100% 100%;
				}
			}

			.vip_three {
				padding: 0 50rpx;

				&>view:nth-child(1) {
					padding-bottom: 20rpx;
				}
			}

			.vip_four {
				padding: 60rpx;
				margin: 20rpx auto;
				width: 600rpx;
				line-height: 40rpx;
				height: 800rpx;
				flex-direction: column;
				background: url('@/static/images/vip/vip_all_box_bg.png') no-repeat;
				background-size: 100% 100%;

				.four_title {
					color: #fbecc8;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 24rpx;
				}
			}

			.vip_five {
				&>view {
					margin-left: 20rpx;
					width: 60rpx;
					height: 60rpx;
					background-color: #202a38;
					cursor: pointer;
				}
			}
		}

		/* 新增悬浮按钮样式 */
		.floating-reward {
			position: fixed;
			bottom: 200rpx;
			right: 30rpx;
			z-index: 99;
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			background: linear-gradient(135deg, #d4af37, #f8de7e);
			box-shadow: 0 8rpx 20rpx rgba(212, 175, 55, 0.4);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			animation: pulse 2s infinite;
			cursor: pointer;

			text {
				color: red;
				font-size: 24rpx;
				font-weight: bold;
				margin-top: 10rpx;
				text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.5);
			}

			&:active {
				transform: scale(0.95);
				box-shadow: 0 4rpx 10rpx rgba(212, 175, 55, 0.4);
			}
		}

		@keyframes pulse {
			0% {
				transform: scale(1);
			}

			50% {
				transform: scale(1.05);
			}

			100% {
				transform: scale(1);
			}
		}
	}
</style>