<template>
	<view class="bonus_details">
		<game-header />
		<u-parse :content="content.content"></u-parse>
		
		<!-- 底部 -->
		<game-footer />
		
		<game-tabbar :tabbarValue="3" />
	</view>
</template>

<script>
		import { activityDetails } from '@/api/bonus' 
	export default {
		name: 'bonusDetails',
		data() {
			return {
				content: ''
			};
		},
		onLoad(options) {
			this.getActivityDetails(options.id)
		},
		methods: {
			async getActivityDetails(id){
				let {code, data} = await activityDetails(id)
				if(code == 200){
					this.content = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.bonus_details{
	color: #fff;
	padding: 100rpx 20rpx 20rpx 20rpx;
}
</style>
