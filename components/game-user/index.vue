<template>
	<view class="game_user" v-if="showUserPopup" @tap="$store.dispatch('setUserPopup', false)">
		<scroll-view scroll-y="true" class="box d_border12" @tap.stop  :style="promotionVisible ? 'top:230rpx;' : ''">
			<view class="user_head game_flex">
				<u-avatar :src="userInfo.avatar" size="100rpx"></u-avatar>
				<view class="head_fr">
					<view class="fr_one  d_border12">
						<view class="game_flex align_center">
							<text style="margin-right: 20rpx;">{{userInfo.username}}</text>
							<u-icon :name="require('@/static/images/copy.png')" size="22rpx" @tap="copyData(userInfo.username)"></u-icon>
						</view>
					
						<view class="fr_tow game_flex align_center d_border12">
							<text style="margin-right: 20rpx;">ID: {{userInfo.id}}</text>
							<u-icon :name="require('@/static/images/copy.png')" size="22rpx" @tap="copyData(userInfo.id + '')"></u-icon>
							</view>
					</view>
					<view class="user_quit" @tap="quitBtn">
						<text>{{$t('jogos.text23')}}</text>
					</view>
					<!-- <view class="fr_tow game_flex align_center d_border12">ID: {{userInfo.id}}</view> -->
				</view>
			</view>

			<view class="process_wrapper d_border12">
				<view class="pr_wr_top game_flex align_center">
					<view class="game_flex align_center">
						<u-icon :name="$config.baseImgUrl + userInfo.vip_img" color="#2979ff" size="28"></u-icon>
						<text style="margin-left: 10rpx;">{{$t('vip.text5')}}-{{userInfo.level}}</text>
					</view>
					<view class="game_flex align_center">
						<!-- <text style="margin-right: 10rpx;">贵宾-0</text> -->
						<!-- <u-icon name="question-circle" color="#fff" size="32rpx"></u-icon> -->
					</view>
				</view>
				<view class="pr_wr_con">
					<view class="wr_con_top game_flex align_center">
						<view>
							{{$t('userinfo.text11')}}
						</view>
						<view>
							<text>{{userInfo.bet}}</text>
							<!-- <text style="color: #ecba81; font-weight: 700;"> 500,00</text> -->
						</view>

					</view>
					<view class="wr_con_foo">
						<u-line-progress height="10" :percentage="userInfo.bet_b" activeColor="#517ee5"></u-line-progress>
					</view>

					<view class="wr_con_top game_flex align_center">
						<view>
							{{$t('userinfo.text12')}}
						</view>
						<view>
							<!-- <text>R$ 0.00/</text> -->
							<text>{{userInfo.recharge}}</text>
							<!-- <text style="color: #ecba81; font-weight: 700;"> 500,00</text> -->
						</view>

					</view>
					<view class="wr_con_foo">
						<u-line-progress height="10" :percentage="userInfo.recharge_b" activeColor="#517ee5"></u-line-progress>
					</view>
				</view>
			</view>

			<view class="user_popup_content d_border12 ">
				<view class="item game_flex align_center" v-for="(item,i) in popupContentList" :key="item.name"
					@tap="toPath(item,i)">
					<u-icon :name="item.url" color="#9cb2d9" size="38rpx"></u-icon>
					<text>{{item.name}}</text>
				</view>
			</view>

			<!-- <view class="user_quit" @tap="quitBtn">
				<text>{{$t('jogos.text23')}}</text>
			</view> -->
		</scroll-view>
		
		
		<game-conversion />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: "gameUser",

		computed: {
			...mapGetters(['userInfo', 'showUserPopup','promotionVisible'])
		}, 
		data() {
			return {
				popupContentList: [
					// {
					// 	name: this.$t('mine.text9'),
					// 	url: 'reload'
					// },
					{
						name: this.$t('jogos.text17'),
						path: '/pages/message/index',
						url: require('@/static/images/jogos/message.png')
					},
					{
						name: this.$t('jogos.text18'),
						url: require('@/static/images/jogos/recharge-1.png')
					},
					{
						name: this.$t('jogos.text19'),
						url: require('@/static/images/jogos/withdraw.png')
					},
					{
						name: this.$t('jogos.text20'),
						path: '/pages/vip/index',
						url: require('@/static/images/jogos/vip.png')
					},
					{
						name: this.$t('jogos.text21'),
						path: '/pages/userinfo/index',
						url: require('@/static/images/jogos/user.png')
					},
					// {
					// 	name: this.$t('jogos.text22'),
					// 	path: "/pages/userinfo/index?text=记录",
					// 	url: require('@/static/images/jogos/record.png')
					// },
				
				],
			};
		},
		methods: {
			quitBtn() {
				this.$store.dispatch('LogOut')
				this.$store.dispatch('setUserPopup', false)
				this.$dDelay(100).then(() => {
					this.$tab.switchTab('/pages/jogos/index')
				})
				window.location.reload()
			},
			// 复制内容
			copyData(data) {
				let _this = this
				uni.setClipboardData({
					data,
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},

			toPath(item,i) {
				// 额度转换
				// if(i == 0) {
				// 	return this.$store.dispatch('setConversionPopup', true)
				// }
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
				// // 存款
				// if(i == 2) {
				// 	this.$store.dispatch('setAccountPopup', true)
				// 	return this.$store.dispatch('setAccessMode')
				// } 
				// // 取款
				// if(i == 3) {
				// 	this.$store.dispatch('setAccountPopup', true)
				// 	return this.$store.dispatch('setAccessMode', 1)
				// }
				this.$store.dispatch('setUserPopup', false)
				this.$dDelay(200).then(() => {
					this.$tab.navigateTo(item.path)
				})
			},
			
		
		}
	}
</script>

<style lang="scss" scoped>
	.game_user {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		z-index: 999;
		color: #fff;
		backdrop-filter: saturate(180%) blur(10px);
		overflow: hidden;
		.box {
			padding: 20rpx;
			position: fixed;
			width: 75vw;
			max-height: 900rpx;
			top: 100rpx;
			right: 80rpx;
			z-index: 99;
			overflow: hidden;
			background-color: #211e30;
			::v-deep .uni-scroll-view-content{
				padding-bottom: 30px;
			}

			.user_head {
				margin: 10rpx 0 20rpx 0;

				.head_fr {
					margin-left: 30rpx;
					flex: 1;

					.fr_one {
						margin-bottom: 16rpx;
						justify-content: space-between;
						padding: 20rpx 10rpx;
						background-color: #2b293a;
						cursor: pointer;
					}

					.fr_tow {
						margin-top: 10rpx;
						font-size: 22rpx;
						// background-color: #fa1e44;
					}
				}
			}
		}

		.process_wrapper {
			margin: 20rpx 0;
			height: 200rpx;

			.pr_wr_top {
				height: 60rpx;
				justify-content: space-between;

				&>view {
					&>text {
						color: #ecba81;
						font-weight: 700;
					}
				}
			}

			.pr_wr_con {
				padding: 20rpx;
				background-color: #2c293b;

				.wr_con_top {
					height: 50rpx;
					justify-content: space-between;
				}
			}
		}

		.user_popup_content {
			margin-top: 60rpx;
			background-color: #2b293a;

			.item {
				padding: 0 20rpx;
				height: 80rpx;
				color: #adb6c4;
				font-size: 14rpx;

				&>text {
					margin-left: 20rpx;
				}
			}
		}

		.user_quit {
			// position: absolute;
			// bottom: 0;
			// height: 80rpx;
			// line-height: 60rpx;
			font-size: 28rpx;
			color: #fff;
		}
	}
</style>