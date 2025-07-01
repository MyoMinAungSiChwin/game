<template>
	<view class="savings_account">
		<u-navbar title="存款" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff" leftIconSize="40rpx"
			:titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>
		
		<view class="s_a_title">
			付款订单创建成功
		</view>	
		
		<view class="s_a_countdown">
			<text>Tempo </text>
			<text>1:20</text>
		</view>	
		
		<view class="s_a_tab">
			<view class="tr_li_items d_border12 d_bgColor border_shadow">
				<view class="rows d_flex">
					<view>价值</view>
				</view>
				<view class="rows d_flex">
					<view>奖金金额</view>
				</view>
				<view class="rows d_flex">
					<view>类型</view>
					<view>pixpay</view>
				</view>
			</view>
		</view>
		
		<view class="s_a_play d_border12 d_bgColor border_shadow">
			<view>Pague a corda</view>
			<view>
				00020101021226790014br.gov.bcb.pix2557brcode.starkinfra.com/v2/f0e6b42950a24be28890ede81f0080155204000053039865802BR5925Kendo Servicos Digitais e6009Sao Paulo62070503***63040514
			</view>
			<view class="d_flex">
					<u--image 
					radius="10"
					:showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" 
					width="500rpx" height="500rpx" @click="click"></u--image>
			</view>
			<view>
				<u-button type="primary" text="提款" :customStyle="{height: '80rpx', width: '400rpx'}"
					color="linear-gradient(to right, rgb(236, 97, 47), rgb(241, 154, 99))"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.savings_account{
	padding: 130rpx 20rpx 20rpx 20rpx;
	color: #fff;
	.s_a_title{
		padding: 20rpx 0;
		color: #f7ba17;
		text-align: center;
		background: linear-gradient(90deg, transparent 0%, rgba(247, 186, 23, .16) 50%, transparent 100%);
	}
	.s_a_countdown{
		height: 60rpx;
		line-height: 60rpx;
		text-align: right;
	}
	.s_a_tab{
		.tr_li_items {
			padding: 20rpx 20rpx 0 20rpx;
			height: 300rpx;
			.rows {
				align-items: center;
				justify-content: flex-end;
				height: 80rpx;
				border-bottom: 1px solid #666;
		
				&>view:nth-child(1) {
					font-size: 26rpx;
					color: rgba(255, 255, 255, .7);
				}
			}
		
			.rows:last-child {
				margin-top: 20rpx;
				justify-content: space-between;
				border: none;
				font-size: 40rpx;
			}
		}
	}
	
	.s_a_play{
		padding: 30rpx;
		margin-top: 30rpx;
		text-align: center;
		& > view:nth-child(2){
			margin: 20rpx 0;
		}
		& > view:nth-child(3){
			margin-bottom: 30rpx;
			justify-content: center;
		}
	}
	
}
</style>
