<template>
	<view class="telegram">
		<u-navbar title="Canal De Telegram" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		
		<view class="f_s_head d_border12 d_flex">
			<view class="s_h_fl">
				</u--image>
			</view>
			<view class="s_h_fr d_flex">
				<text>{{$t('jogos.fl2')}}</text>
				<text>+ 20% {{$t('jogos.fljj')}}</text>
			</view>
		</view>
		<view class="f_s_con d_bgColor">
			<view class="content">
				<u-parse :content="content"></u-parse>
			</view>
			
			<view class="f_s_btn">
			
			<u-button type="primary" :text="$t('buddy.title3')" shape="circle" :customStyle="{height: '80rpx'}"
				color="linear-gradient(to bottom, rgb(99, 198, 60), rgb(240, 197, 90))"
				@tap="link(info.chat)"
				></u-button>
			<view style="height: 40rpx"></view>
			<u-button type="primary" :text="$t('buddy.title4')" shape="circle" :customStyle="{height: '80rpx'}"
				color="linear-gradient(to bottom, rgb(99, 198, 60), rgb(240, 197, 90))"
				@tap="link(info.chats)"
				></u-button>
			</view>
		</view>
	 
	</view>
</template>

<script>
	import { eventDetails, information } from '@/api/jogos.js'
	export default {
		data() {
			return {
				content: '',
				type: 1,
				info: ''
			};
		},
		onLoad() {
			this.getEventDetails()
			//this.getInformation()
		},
		methods:{
			async getEventDetails(){
				let {code, data} = await eventDetails(this.type)
				this.content = data.content
			},
			async getInformation(){
				let {code, data} = await information()
				if(code == 200){
					this.info = data
				}
			},
			
			link(url){
				window.location.href = url
			}
		}
	}
</script>

<style lang="scss" scoped>
.telegram{
	padding: 130rpx 20rpx 30rpx 20rpx;
	
	.f_s_head{
		width: 100%;
		height: 180rpx;
		background: url('../../static/images/jogos/ad_2.png') no-repeat;
		background-size: 100% 100%;
		.s_h_fl{
			width: 280rpx;
		}
		.s_h_fr{
			padding-left: 20rpx;
			flex-direction: column;
			font-size: 35rpx;
			color: #fff;
			font-style: italic;
			& > text:nth-child(1){
				margin: 30rpx 0 30rpx 0;
				font-size: 28rpx;
			}
		}
	}
	.f_s_con{
		padding: 20rpx;
		margin: 20rpx 0;
		.content{
			padding: 20rpx;
			margin-bottom: 20rpx;
			min-height: 500rpx;
			color: #fff;
			border: 1px dashed rgba(0,0,0,.5);
		}
	}
}
</style>
