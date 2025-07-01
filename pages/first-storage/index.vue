<template>
	<view class="first_storage">
		<u-navbar :title="$t('title.text21')" :autoBack="true" bgColor="#1d1f2b"
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
				<text>+ 20%</text>
			</view>
		</view>
		<view class="f_s_con d_bgColor">
			<view class="content">
				<u-parse :content="content"></u-parse>
			</view>
			
			<view class="f_s_btn">
				<u-button type="primary" :text="$t('jogos.fl0')" shape="circle" :customStyle="{height: '80rpx'}"
					color="linear-gradient(to bottom, rgb(247, 201, 112), rgb(235, 88, 46))"></u-button>
			</view>
		</view>
		
		<view class="tips_text">
			<view> Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos.</view>
			<view>
				 Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. 
			</view>
			
			<view>
				 Se isso acontecer, a conta relevante será permanentemente congelada. 
			</view>
			
			<view>
				 Nós não compensará as perdas causadas por trapaça! 
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
				type: 2
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
.first_storage{
	padding: 130rpx 20rpx 30rpx 20rpx;
	
	.f_s_head{
		width: 100%;
		height: 300rpx;
		background: linear-gradient(360deg,#FF3F09 0%,#FFD165 100%);
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
