<template>
	<view class="statistics">
		<view class="tow_th game_flex align_center">
			{{$t('convidar.text15')}}
		</view>	
		<view class="tow_tbody">
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text16')}}</text>
				<text>1{{$t('convidar.text17')}}</text>
				<text>2{{$t('convidar.text17')}}</text>
				<text>3{{$t('convidar.text17')}}</text>
			</view>
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text18')}}</text>
				<text>{{thirdData.one_num}}</text>
				<text>{{thirdData.two_num}}</text>
				<text>{{thirdData.three_num}}</text>
			</view>
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text19')}}</text>
				<text>{{thirdData.one_fastmoney}}</text>
				<text>{{thirdData.two_fastmoney}}</text>
				<text>{{thirdData.three_fastmoney}}</text>
			</view>
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text20')}}</text>
				<text>{{thirdData.one_total_recharge}}</text>
				<text>{{thirdData.two_total_recharge}}</text>
				<text>{{thirdData.three_total_recharge}}</text>
			</view>
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text21')}}</text>
				<text>{{thirdData.one_total_wih}}</text>
				<text>{{thirdData.two_total_wih}}</text>
				<text>{{thirdData.three_total_wih}}</text>
			</view>
			<view class="tbody_item game_flex align_center">
				<text>{{$t('convidar.text22')}}</text>
				<text>{{thirdData.one_total_profit}}</text>
				<text>{{thirdData.two_total_profit}}</text>
				<text>{{thirdData.three_total_profit}}</text>
			</view>

		
		</view>
	<!-- 	<view class="tow_type game_flex">
			<view class="active_date">Day</view>
			<view>Week</view>
			<view>Month</view>
		</view> -->
	</view>
</template>

<script>
	import { allThirdLevelUsers } from '@/api/convidar.js'
	export default {
		name: 'Statistics',
		data() {
			return {
				thirdData: {}
			}
		},
		created() {
			this.getAllThirdLevelUsers()
		},
		methods: {
			async getAllThirdLevelUsers(){
				let {data,code} = await allThirdLevelUsers()
				if(code == 200){
					this.thirdData = data
				}
			},
			// 复制内容
			copyData() {
				let _this = this
				uni.setClipboardData({
					data: this.inviteData.share_link,
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.statistics {
		margin: 20rpx;

		.tow_th {
			padding: 0 20rpx;
			height: 90rpx;
			background-color: #1f3855;
		}

		.tow_tbody {
			background-color: #1e2b3b;

			.tbody_item {
				padding: 0 10rpx;
				height: 90rpx;
				border-bottom: 1px solid #303030;

				&>text:nth-child(1) {
					width: 300rpx;
				}

				&>text:nth-child(2),
				&>text:nth-child(3),
				&>text:nth-child(4) {
					flex: 1;
				}
			}
		}

		.tow_type {
			margin-top: 20rpx;
			&>view {
				padding: 20rpx 30rpx;
				cursor: pointer;
				border: 1px solid #818790;
			}

			&>view:nth-child(2) {
				border-top: 1px solid #818790;
				border-bottom: 1px solid #818790;
				border-right: none;
				border-left: none;
			}

			&>view:nth-child(1) {
				border-top-left-radius: 10px;
				border-bottom-left-radius: 10px;
			}

			&>view:nth-child(3) {
				border-top-right-radius: 10px;
				border-bottom-right-radius: 10px;
			}

			.active_date {
				color: #2d75d2;
				border-color: #2d75d2;
			}
		}
	}
</style>