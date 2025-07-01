<template>
	<view class="d_buddy">
		<u-navbar :title="$t('title.text18')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		
		<view class="f_s_head d_border12 d_flex">
			<view class="s_h_fl">
				<u--image 
				src="../../static/images/jogos/ad_3.png" 
				mode="widthFix"
				width="280rpx"
				height="315rpx"
				>
				<template v-slot:loading>
				  <u-loading-icon color="#666"></u-loading-icon>
				</template>
				</u--image>
			</view>
			<view class="s_h_fr d_flex">
				<text>{{$t('buddy.title1')}}</text>
				<text>{{$t('buddy.title2')}}</text>
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
		
		<view class="tips_text">
			<view>{{$t('buddy.title5')}}:</view>
			<view>1、{{$t('buddy.title6')}}。</view>
			<view>
				2. {{$t('buddy.title7')}}。
 			</view>
			
			<view>
				3、{{$t('buddy.title8')}}。
			</view>
			
			<view>
				4. {{$t('buddy.title9')}}。
			</view>
			
			<view>
				5.{{$t('buddy.title10')}}。
			</view>
			
			<view>
				6.{{$t('buddy.title11')}}。
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
				type: 6,
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
				if(code == 200){
				this.content = data.content
				}
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
.d_buddy{
	padding: 130rpx 20rpx 30rpx 20rpx;
	
	.f_s_head{
		width: 100%;
		height: 300rpx;
		background: linear-gradient(360deg,#FFC342 0%,#10C901 100%);
		.s_h_fl{
			::v-deep .u-image__image{
				position: relative;
				top: -15rpx;
			}
		}
		.s_h_fr{
			padding-left: 20rpx;
			flex-direction: column;
			font-size: 35rpx;
			color: #fff;
			font-style: italic;
			& > text:nth-child(1){
				margin: 50rpx 0 30rpx 0;
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
	
	.tips_text{
		color: rgba(255,255,255,.8);
		font-size: 26rpx;
		line-height: 1.5;
	}
}
</style>
