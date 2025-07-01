<template>
	<view class="splash-screen">
		<image src="/static/images/BJ.png" class="logo" />
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 读取保存的路由路径
			const lastPath = uni.getStorageSync('lastVisitedPath') || '/pages/jogos/index'
			const isTab = uni.getStorageSync('isTab') || true
			console.log(lastPath)
			// 延迟跳转
			setTimeout(() => {
				if (isTab) {
					uni.switchTab({
						url: lastPath
					})
				} else {
					uni.redirectTo({
						url: lastPath
					})
				}
			}, 500)
		}
	}
</script>

<style>
	.splash-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #0e131b;
		z-index: 9999;
	}

	.logo {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>