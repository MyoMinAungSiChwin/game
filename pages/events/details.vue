<template>
	<view class="ev_details">
		<u-navbar title="活动详情" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff" leftIconSize="40rpx"
			:titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>
		<u-parse :content="content.content"></u-parse>
	</view>
</template>

<script>
	import {
		activityDetails
	} from '@/api/events.js'
	export default {
		data() {
			return {
				content: '',
			};
		},
		onLoad(options) {
			this.getActivityDetails(options.id)
		},
		methods: {
			async getActivityDetails(id) {
				const {
					code,
					data
				} = await activityDetails(id)
				if (code == 200) {
					this.content = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ev_details {
		padding: 130rpx 30rpx 20rpx 30rpx;
		color: #fff;
	}
</style>