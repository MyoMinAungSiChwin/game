<template>
	<view class="game_web_view">
		<game-header />

		<view class="web_views">
			<web-view :src="url"  style="height: 86vh"> </web-view>
		</view>

		<!-- 底部 -->
		<!-- <game-footer /> -->
		<game-tabbar :tabbarValue="-1" />
	</view>
</template>

<script>
	export default {
		name: 'Orders',
		onLoad(option) {
			this.url = option.url
		},
		data() {
			return {
				url: ''
			};
		}
	}
</script>

<style lang="scss" scoped>
.game_web_view{
	padding-top: 120rpx;
}
</style>
