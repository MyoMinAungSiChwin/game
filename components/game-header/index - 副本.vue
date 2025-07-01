<template>
	<view class="game_header">
		<u-navbar bgColor="#1c1b36" height="80rpx">
			<view slot="left" class="head_left" >
				<u-icon class="off_icon" name="./static/images/jogos/unfold.png" size="48rpx"
					@tap="$store.dispatch('setFlPopup', true)"></u-icon>

			</view>
			<view slot="center" class="head_center">
				<view class="d_logo game_flex game_flex1">
					<!-- <u--image :src="require('@/static/logo.png')" width="170rpx" height="40rpx" mode="">
					</u--image> -->
				</view>
			</view>
			<view slot="right" class="head_right game_flex align_center">
				<!-- 已登录 -->
				<view v-if="token" class="d_balance d_border22 d_flex">

					<!-- 	<text class="balance_btn game_flex game_justify_center align_center"
					@tap="$store.dispatch('setAccessMode'); $store.dispatch('setAccountPopup', true);"
					>
						<u-icon name="minus-square-fill" color="#fff" size="30rpx"></u-icon>
					</text> -->
					<view class="balance_user game_flex" @tap="$store.dispatch('setUserPopup', true)">
						<view style="display: flex; align-items: center; background: url('../static/images/landi1.png');background-size: 100% 100%; background-position: center;background-repeat: no-repeat;    width: 250rpx;
    height: 50rpx;">
							<u-avatar :src="userInfo.avatar" shape="circle" size="40rpx" style="margin-left: 10rpx;"></u-avatar><text
								style="margin-left:1rpx;">{{userInfo.username}}</text>
						</view>
					
						<!-- <u-icon name="arrow-down" color="#fff" size="25rpx"></u-icon> -->
					</view>
					<view class="balance_txt" style="background: url('../static/images/landi1.png');background-size: 100% 100%; background-position: center;background-repeat: no-repeat;    width: 150rpx;
    height: 50rpx;"><u-icon size="20" name="/../static/images/jinbi.png" style="margin-left: 10rpx;"></u-icon>{{userInfo.money}}</view>
				</view>

				<!-- 未登录 -->
				<view class="not_login game_flex" v-else>
					<u-button :text="$t('jogos.text24')" @tap="setLoginBox(1)" color="#4faff8" type="primary">
					</u-button>

					<u-button :text="$t('jogos.text25')" color="#4180ed" type="primary" size="large"
						@tap="setLoginBox(2)">
					</u-button>
				</view>

				<view class="game_flex align_center" style="margin: 0 6rpx;" @tap="showLanguage=true">
					<text style="color: #fff;">{{$store.state.user.language || 'portugal'}}</text>
					<u-icon name="reload" color="#999" size="28rpx"></u-icon>
				</view>
			</view>
		</u-navbar>


		<!-- 公共 -->
		<game-login :loginIndex="loginIndex" :key="loginIndex" :invitation_code="invitation_code" />
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
				this.invitation_code = this.getUrlParam('invitation_code')

			}
		},
		data() {
			return {
				showLanguage: false,
				columns: [
					[{
							label: '中文',
							id: 'zh'
						},
						{
							label: 'english',
							id: 'english'
						},
						{
							label: 'spain',
							id: 'spain'
						},
						{
							label: 'portugal',
							id: 'portugal'
						},
					]
				],
				invitation_code: '',
				loginIndex: 1
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
				const options = uni.getLaunchOptionsSync();
				if (options.query && options.query[param]) {
					return options.query[param];
				}
				return null;
			},

			setLoginBox(index) {
				this.$store.dispatch('setLoginPopup', true)
				this.loginIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_header {
		.head_left {}

		.head_center {
			padding-left: 80rpx;
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
					margin-right: 10rpx;
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
					margin-right: 40rpx;
				}
			}

			margin-left: 170rpx;

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