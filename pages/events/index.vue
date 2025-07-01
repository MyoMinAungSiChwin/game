<template>
	<view class="d_events">
		<u-navbar :title="$t('title.text3')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>                  
		</u-navbar>
		<view class="d_e_list">
			<view 
				class="d_e_l_items d_border12" 
				v-for="item in activityList" 
				:key="item.id"
				:style="{ backgroundImage: 'url(' + $config.baseImgUrl + item.image + ')' }"
				@tap="$tab.navigateTo(`/pages/events/details?id=${item.id}`)">

				<view class="layer d_flex">
					<view>{{item.titile}}</view>
					<u-icon name="arrow-right" color="#fff" size="28rpx"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		activityList
	} from '@/api/events.js'
	export default {
		data() {
			return {
				activityList: []
			};
		},
		onLoad() {
			this.getActivityList()
		},
		methods: {
			async getActivityList() {
				const {code, data} = await activityList()
				if(code == 200){
					this.activityList = data
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.d_events {
		color: #fff;
		padding: 130rpx 20rpx 0 20rpx;

		.d_e_tit {
			text-align: center;
			color: #5b70d3;

			&>view:nth-child(1) {
				color: #fff;
				margin-bottom: 10rpx;
			}
		}

		.d_e_list {
			.d_e_l_items {
				position: relative;
				margin-top: 20rpx;
				height: 340rpx;
				background-size: 100% 100%;

				.layer {
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 60rpx;
					color: #fff;
					background-color: #22306b;
					border-radius: 0 0 16rpx 16rpx;
					padding: 0 30rpx;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
</style>