<template>
	<view class="game_orders">
		<game-header />
		
		<view class="orders">
			
		</view>
		
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="1" />
	</view>
</template>

<script>
	export default {
		name: 'Orders',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.game_orders{
	padding-top: 80rpx;
}
</style>
