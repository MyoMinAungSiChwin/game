<template>
	<view class="game_header">
	
		<u-navbar bgColor="black" leftIcon="" height="80rpx">
			<view slot="left" class="head_center" style="padding: 0 !important;">
				<view class="d_logo game_flex game_flex1">
					<u--image :src="require('@/static/images/tabbar/selctlogo.png')" width="250rpx" height="50rpx"
						mode="">
					</u--image>
				</view>
			</view>
			<view slot="right" class="head_right game_flex align_center">
				<view style="color: #fff; display: flex; justify-content: space-between;" v-if="token">
					<view style="display: flex;justify-content: center;align-items: center; width:340rpx;">
						<u-avatar @tap="$store.dispatch('setUserPopup', true)" :src="userInfo.avatar" shape="circle"
							size="60rpx" style="margin-right: 10rpx;"></u-avatar>
						<view
							style="display: flex;flex-direction: column;justify-content: center;align-items: flex-start;line-height:30rpx;">
							<view style="font-weight: bold;">{{userInfo.username}}</view>
							<view style="display: flex;align-items: end;">
								<view style="color: #f6c530; font-weight: bold;">
									{{isMoneyHidden ? '***' : 'K' + userInfo.money}}</view>
								<view style="margin-left: 20rpx; display: flex; align-items: center;"
									@tap="toggleMoneyVisibility">
									<image style=" width: 36rpx;height: 36rpx;"
										:src="isMoneyHidden ? '/../static/images/yc.png' : '/../static/images/xs.png'" />
								</view>

							</view>
						</view>
					</view>
					<view style="display: flex;align-items: center;justify-content: center;">
						<view style="margin-right: 20rpx;"><u-icon class="off_icon" name="./static/ldf.png"
								size="20" @tap="$store.dispatch('setFlPopup', true)"></u-icon></view>
					</view>
					<view class="game_flex align_center" style="display: flex; align-items: center;"
						@tap="showLanguage=true">
						<view style="display: flex;justify-content: center;align-items: center;">
							<!-- 	<text style="color: #fff;">{{$store.state.user.language || 'portugal'}}</text> -->
							<!-- <u-icon name="reload" color="#999" size="28rpx"></u-icon> -->
							<u-icon size="25" name="/../static/images/tabbar/new/en.png" style="margin-left: 10rpx;"></u-icon>
						</view>
					</view>
				</view>
				<!-- 未登录 -->
				<view class="not_login game_flex" v-else>
					<view class="custom-btn" @tap="setLoginBox(1)" :style="{
					      backgroundImage: 'url(../static/images/btn.png)',
					      height: '36px' // 根据实际需求调整高度
					    }">
						<text class="btn-text">{{ $t('jogos.text24') }}</text>
					</view>
					<view class="custom-btn" @tap="setLoginBox(2)" :style="{
					      backgroundImage: 'url(../static/images/btn.png)',
					      height: '36px' 
					    }">
						<text class="btn-text">{{ $t('jogos.text25') }}</text>
					</view>
					<view class="game_flex align_center" style="display: flex; align-items: center;"
						@tap="showLanguage=true">
						<view style="display: flex;justify-content: center;align-items: center;">
							<!-- 	<text style="color: #fff;">{{$store.state.user.language || 'portugal'}}</text> -->
							<!-- <u-icon name="reload" color="#999" size="28rpx"></u-icon> -->
							<u-icon size="25" name="/../static/images/en.png" style="margin-left: 10rpx;"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</u-navbar>



		<!-- 公共 -->
		<game-login :loginIndex="loginIndex" :key="loginIndex" :invitation_code="invitation_code" :is_agent="is_agent" />
		<game-fl-popup />
		<game-user />
		<game-account />

		<!-- <game-animations /> -->

		<!-- 语言选择 -->
		<u-picker :closeOnClickOverlay="true" @close="showLanguage=false" @confirm="confirmLanguage"
			:cancelText="$t('userinfo.text15')" :confirmText="$t('userinfo.text16')" :show="showLanguage"
			:columns="columns" keyName="label"></u-picker>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "gameHeader",
		computed: {
			...mapGetters(['userInfo', 'token'])
		},
		created() {
			if (this.getUrlParam('invitation_code')) {
				this.$store.dispatch('setLoginPopup', true)
				this.loginIndex = 2
				this.invitation_code = this.getUrlParam('invitation_code'),
				this.is_agent = this.getUrlParam('is_agent') || 0

			}
		},
		data() {
			return {
				showLanguage: false,
				isMoneyHidden: false,
				columns: [
					[{
							label: '中文',
							id: 'zh'
						},
						{
							label: 'English',
							id: 'english'
						},
						// {
						// 	label: 'Spain',
						// 	id: 'spain'
						// },
						// {
						// 	label: 'Portugal',
						// 	id: 'portugal'
						// },
						{
							label: 'မြန်မာ',
							id: 'burmese'
						},
					]
				],
				invitation_code: '',
				loginIndex: 1,
				is_agent:0
			};
		},
		methods: {
			confirmLanguage({
				value
			}) {
				const info = value[0].id
				this.$store.dispatch('Language', info).then(() => {
					this.showLanguage = false
					window.location.reload()
				})
			},
			// 如果检测有pid 打开注册弹窗
				
			getUrlParam(param) {
					console.log("---------------------------")
				const options = uni.getLaunchOptionsSync();
				console.log(options)
				if (options.query && options.query[param]) {
					return options.query[param];
				}
				return null;
			},
			toggleMoneyVisibility() {
				this.isMoneyHidden = !this.isMoneyHidden
			},
			setLoginBox(index) {
				console.log("---------------------------")
				this.$store.dispatch('setLoginPopup', true)
				this.loginIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 基础按钮样式 */
	.custom-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 8px;
		padding: 0 20rpx;
		margin: 20rpx 20rpx;
		cursor: pointer;
		transition: opacity 0.3s;
		width: 200rpx;
	}

	/* 大号按钮额外样式 */
	.large-btn {
		width: 240px;
		/* 更大的宽度 */
	}

	/* 按钮文字样式 */
	.btn-text {
		color: #fff;
		font-size: 12px;
		font-weight: bold;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	/* 点击效果 */
	.custom-btn:active {
		opacity: 0.8;
		transform: scale(0.98);
	}

	.game_header {
		.head_left {}

		.head_center {
			// padding-left: 80rpx;
			width: 100%;

			.d_logo {
				padding: 10rpx 0 0 10rpx;
			}
		}

		.head_right {
			.d_balance {
				padding: 15rpx 20rpx;
				color: #fff;
				justify-content: space-between;
				align-items: center;

				.balance_txt {
					color: #f6c530;
					font-weight: 700;
					// margin-right: 10rpx;
					display: flex;
					align-items: center;
				}

				.balance_btn {
					margin: 0 20rpx;
					width: 70rpx;
					height: 35rpx;
					background-color: #ff3141;
					box-shadow: 0 0 #ff3141;
					border-radius: 12rpx;
					cursor: pointer;
					animation: grape 1.5s ease 0s infinite normal none running;
				}

				.balance_user {
					padding-right: 10rpx;
					// width: 100rpx;
					align-items: center;
					border-radius: 45rpx;
					// background-color: #3d3838;
					justify-content: space-between;
					cursor: pointer;
					// margin-right: 40rpx;
				}
			}

			// margin-left: 170rpx;

			.not_login {
				.u-button {
					height: 50rpx;
					border: none;
					color: #fff;
				}

				.u-button:last-child {
					margin-left: 20rpx;
				}
			}
		}
	}

	@keyframes grape {
		0% {
			transform: scale(1);
		}

		10% {
			transform: translate3d(-1px, 0, 0);
		}

		70% {
			box-shadow: 0 0 0 10px transparent;
			transform: scale(1);
		}

		100% {
			box-shadow: 0 0 transparent;
			transform: scale(1);
		}
	}
</style>