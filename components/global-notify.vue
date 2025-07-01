<template>
	<u-popup :show="showOrderSuccessTip" mode="top" round="10" @close="closeDownload" :custom-style="popupStyle">
		<view style="height: 180rpx;display: flex; justify-content: center; align-items: center;">
			<view style=" padding: 30rpx 50rpx; line-height: 50rpx; color: black; display: flex;"
				:style="tipType == 2 ? 'color:red' : 'color:green'">
				<u-icon name="checkmark-circle-fill" color="green" size="28" style="margin-right: 20rpx;"  v-if="tipType == 1"></u-icon>
				<u-icon name="close-circle-fill" color="red" size="28" style="margin-right: 20rpx;" v-if="tipType == 2"></u-icon>
				{{tipMessage}}
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters,mapMutations 
	} from 'vuex';
	export default {
		data() {
			return {
				popupStyle: {
					background: 'rgba(255, 255, 255, 0.8)', // 白色90%透明
					  
				}
			}
		},
		computed: {
			...mapGetters(['showOrderSuccessTip', 'tipMessage', 'tipType','closeOrderSuccessTip'])
		},
		methods: {
			...mapMutations([
			  'SET_ORDER_SUCCESS_CLOSE'// 映射Vuex mutation
			]),
			closeDownload() {
				this.SET_ORDER_SUCCESS_CLOSE(false);
			},
		}
	}
</script>