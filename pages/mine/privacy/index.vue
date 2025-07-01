<template>
	<view class="d_privacy">
		<u-navbar title="隐私" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		
		
		<view class="d_pr_con">
			123
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
.d_privacy{
	color: #fff;
	.d_pr_con{
		padding: 0 30rpx;
		margin-top: 130rpx;
	}
}
</style>
