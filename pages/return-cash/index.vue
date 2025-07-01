
<template>
	<view class="return_cash">
		<u-navbar :title="$t('jogos.fl3')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		
		<view class="f_s_head d_border12 d_flex">
			<view class="s_h_fl">
				<u--image src="../../static/images/jogos/ad_1.png" 
				mode="widthFix"
				width="280rpx"
				height="315rpx"
				></u--image>
			</view>
			<view class="s_h_fr d_flex">
				<text>{{$t('jogos.fl2')}}</text>
				<text>+ 20%{{$t('jogos.fl8')}}</text>
			</view>
		</view>
		
		<view class="tips_text">
			<view> A partir de agora, a recarga pode obter recompensas extras em dinheiro. </view>
			<view>
				 Quanto mais você recarregar, maior será a taxa de recompensa, até 10%. Após a recarga, o dinheiro extra também será transferido diretamente para a sua conta. 
 			</view>
		</view>
		
		
		<view class="f_s_con d_bgColor">
			<view style="color: #ffa548; margin-bottom: 30rpx;">Nota especial:</view>
			<view class="content">
				<u-parse :content="content"></u-parse>
			</view>
			
			<view class="f_s_btn">
				<u-button type="primary" text="Recarregue agora" shape="circle" :customStyle="{height: '80rpx'}"
					color="linear-gradient(to bottom, rgb(242, 165, 96), rgb(235, 68, 204))"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import { eventDetails } from '@/api/jogos.js'
	export default {
		data() {
			return {
				content: '',
				type: 3
			};
		},
		onLoad() {
			this.getEventDetails()
		},
		methods:{
			async getEventDetails(){
				let {code, data} = await eventDetails(this.type)
				this.content = data.content
			}
		}
	}
</script>

<style lang="scss" scoped>
.return_cash{
	padding: 130rpx 20rpx 0 20rpx;
	
	.f_s_head{
		width: 100%;
		height: 300rpx;
		background: linear-gradient(360deg,#ea3ed2  0%, #f1a064 100%);
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
	
	.tips_text{
		margin: 20rpx 0;
		color: rgba(255,255,255,.8);
		font-size: 26rpx;
		line-height: 1.5;
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
