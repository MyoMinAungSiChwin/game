<template>
	<view class="invite">
		<!-- <view class="one_tips game_flex d_border12 align_center">
			<u-icon name="photo" color="#2979ff" size="28"></u-icon>
			<text>提示</text>
		</view> -->
		<view class="one_grid">
			<u-grid :border="false" @click="click" col="2">
				<u-grid-item class="u_grid_item">
					<text>{{inviteData.count_user}}</text>
					<text>{{$t('convidar.text6')}}</text>
				</u-grid-item>
				
				<u-grid-item class="u_grid_item">
					<text>{{inviteData.count_money}}</text>
					<text>{{$t('convidar.text7')}}</text>
				</u-grid-item>
				
				<u-grid-item class="u_grid_item">
					<text>{{inviteData.today_user}}</text>
					<text>{{$t('convidar.text8')}}</text>
				</u-grid-item>
				
				<u-grid-item class="u_grid_item">
					<text>{{inviteData.today_money}}</text>
					<text>{{$t('convidar.text9')}}</text>
				</u-grid-item>
				
				<u-grid-item class="u_grid_item">
					<text>{{inviteData.moon_money}}</text>
					<text>{{$t('convidar.text10')}}</text>
				</u-grid-item>
				
			</u-grid>
		</view>
		<view class="one_foo">
			<view class="foo_one game_flex ">
				<view>{{$t('convidar.text11')}}:</view>
				<view>{{inviteData.share_link}}</view>
				<view class="d_border12 game_flex align_center game_justify_center"
				@tap="copyData"
				>{{$t('convidar.text12')}}</view>
			</view>
			
			<view class="foo_text game_flex">
				<text>{{$t('convidar.text13')}}</text>
				<text>{{$t('convidar.text14')}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { inviteLink } from '@/api/convidar.js'
	export default {
		name: 'Invite',
		data(){
			return {
				inviteData: {}
			}
		},
		created() {
			this.getInviteLink()
		},
		methods: {
			async getInviteLink(){
				let {data,code} = await inviteLink()
				if(code == 200){
					this.inviteData = data
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
	.invite{
		.one_tips{
			margin: 0 40rpx;
			padding: 10rpx 15rpx;
			color: #3e4145;
			background-color: #ecf5fe;
			& > text{
				margin-left: 20rpx;
			}
		}
		
		.one_grid{
			.u_grid_item{
				margin-bottom: 20rpx;
				height: 100rpx;
				& > text:nth-child(1){
					font-size: 40rpx;
					font-weight: 700;
				}
				& > text:nth-child(2){
					color: #777c83;
					font-size: 24rpx;
				}
			}
		}
		
		.one_foo{
			padding: 0 20rpx;
			.foo_one{ 
				margin-bottom: 20rpx;
				flex-direction: column;
				& > view:nth-child(2){
					margin: 20rpx 0;
				}
				& > view:nth-child(3){
					width: 200rpx;
					height: 60rpx;
					background-color: #2099f8;
				}
			}
			
			.foo_text{
				flex-direction: column;
				& > text:last-child {
					padding: 0 70rpx;
					text-align: center;
				}
			}
		}
	}
</style>