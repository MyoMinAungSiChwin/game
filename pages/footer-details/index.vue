<template>
	<view class="footer_details">
		<game-header />

		<view class="d_co_con d_border12">
				<u-parse :content="foolDetails.content"></u-parse>
		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="1" />

	</view>
</template>

<script>
	 
	import {
		foolLevelDetails
	} from '@/api/mine.js'
	
	
	export default { 
		data() {
			return {
				foolDetails: {}
			};
		},
		onLoad(options) {
			this.id = options.id
			this.getFoolLevelDetails()
		},
		methods: {
			async getFoolLevelDetails() {
				let {
					code,
					data
				} = await foolLevelDetails(this.id)
				if (code == 200) {
					this.foolDetails = data
					console.log(this.foolDetails)
				}
			} 

		}
	}
</script>

<style lang="scss" scoped>
	.footer_details{
		padding: 120rpx 20rpx 20rpx 20rpx;
		color: #fff;
		.d_co_con{
			min-height: 500rpx;
		}
	}
</style>

 