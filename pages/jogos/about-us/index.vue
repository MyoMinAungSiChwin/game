<template>
	<view class="d_about_us">
		<u-navbar :title="$t('title.text24')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		<view style="padding: 20rpx; color: #fff;">
			 <u-parse :content="details.content"></u-parse>
		</view>
	</view>
</template>

<script>
	import { eventDetails } from '@/api/jogos.js'
	export default { 
		data() {
			return {
				details: {},
				type: 5
			};
		},
		onLoad() {
			this.getEventDetails()
		},
		methods: {
			async getEventDetails(){
				let {code, data } = await eventDetails(this.type)
				if(code == 200){
					this.details = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.d_about_us{
	padding: 140rpx 20rpx 0 20rpx;
}
</style>
