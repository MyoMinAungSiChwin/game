<template>
	<view class="game_message">
		<game-header />
		 <view class="message">
		 	
			
			<view class="message_btn">
				<u-button type="primary" :text="$t('mine.text26')"  
				></u-button>
			</view>
		 </view>	
		 <!-- 底部 -->
		 <game-footer />
		<game-tabbar :tabbarValue="2" />
	</view>
</template>

<script>
	export default {
		name: 'gameMessage',
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.game_message{
	padding: 80rpx 0 0 0;
	.message_btn{
		margin: 20rpx 200rpx;
	}
}
</style>
