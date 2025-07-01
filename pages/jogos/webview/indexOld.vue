<template>
	<view style="height: 100%;" v-if="src">
		<view class="trigger-icon" @click="showNavbar = !showNavbar" v-if="!showNavbar">
			<u-icon name="arrow-down" color="#be984c" size="20"></u-icon>
		</view>
		<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick"
			v-show="showNavbar">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
			</view>
			<view class="u-nav-slot" slot="right">
				<view style="display: flex; align-items: center;">
					<view @tap="clickTop">
							<u-button type="primary" style="padding: 0 20rpx;" size="mini" color="#d29f69" icon="integral-fill" shape="circle">充值</u-button>
					</view>
					<view @tap="qpClick" style="margin-left: 30rpx;">
						<text style="font-size: 24rpx; color: #be984c;">全屏</text>
					</view>
				</view>
			</view>
		</u-navbar>
		<!-- #ifdef APP -->
			<web-view :src="src" :fullscreen="true" @loadstart="onLoadStart" @loadstop="onLoadStop" />
		<!-- #endif -->
		<!-- #ifdef H5 -->
			<iframe class="iframe" :src="src" frameborder="0"></iframe>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				webViewLoading: true,
				showNavbar: false, // 控制导航栏显示
				title: '',
				src: '',
			}
		},
		onLoad(option) {
			console.log(option)
			if (option.src) {
				this.src = (option.src); // 解码 src
			}
			if (option.title) {
				this.title = (option.title); // 解码 title
			}
		},
		methods: {
			leftClick() {
				this.showNavbar = false; // 隐藏导航栏
				this.$tab.switchTab(`/pages/jogos/index`)
			},
			onLoadStart() {
				console.log("开始加载")
				// WebView开始加载
				this.webViewLoading = true;
			},
			onLoadStop() {
				console.log("加载完成")
				// WebView加载完成
				this.webViewLoading = false;
			},
			clickTop() {
				this.$tab.navigateTo(`/pages/voucher-center/index`)
			},
			qpClick() {
				this.showNavbar = false; // 隐藏导航栏
			}
		}
	}
</script>
<style>
	page {
		height: 100vh !important;
		background-color: #fff !important;
	}

	.trigger-icon {}

	/* 适配图片中的样式 */
	.trigger-icon {
		/* 定位调整 */
		position: fixed;
		top: 10rpx;
		/* 适配地址栏高度 */
		left: 50%;
		transform: translateX(-50%);
		z-index: 99999;
		animation: pulse 2s infinite;
		/* 添加呼吸动画吸引注意 */
		/* 视觉样式 */
/* 		background: #e0e0e0; */
		/* 灰色背景 */
	/* 	padding: 0px 32rpx; */
		/* 椭圆形状 */
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		/* 圆角半径 */
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.1),
			inset 0 1px 2px rgba(255, 255, 255, 0.2);
		/* 立体凹陷效果 */

		/* 边框细节 */
/* 		border: 1px solid #bdbdbd; */
	}

	/* 适配状态栏高度 */
	.u-navbar+.trigger-icon {
		top: calc(60px + constant(safe-area-inset-top));
		/* iOS */
		top: calc(60px + env(safe-area-inset-top));
		/* Android */
	}

	/* 按钮交互效果 */
	.trigger-icon:active {
		background: #d0d0d0;
		transform: translateX(-50%) scale(0.98);
		transition: all 0.1s ease;
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(1);
		}

		50% {
			transform: translate(-50%, -50%) scale(1.1);
		}

		100% {
			transform: translate(-50%, -50%) scale(1);
		}
	}
	.iframe{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}
</style>