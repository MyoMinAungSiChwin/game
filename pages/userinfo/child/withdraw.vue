<template>
	<view class="withdraw">
		<view class="table_th game_flex align_center">
			<view class="rows">{{$t('userinfo.text26')}}</view>
		<!-- 	<view class="rows">{{$t('userinfo.text20')}}</view> -->
			<view class="rows">{{$t('userinfo.text27')}}</view>
			<view class="rows">{{$t('userinfo.text28')}}</view>
			<view class="rows">{{$t('userinfo.text29')}}</view>
		</view>
		<view class="table_td game_flex align_center"
		v-for="item in list"
		:key="item.id"
		>
			<view class="rows">{{item.money}}</view>
<!-- 			<view class="rows">{{item.info}}</view> -->
			<view class="rows" v-if="item.type == 1">银行卡提现</view>
			<view class="rows" v-if="item.type == 3">KBZPAY提现</view>
			<view class="rows" v-if="item.type == 4">USDT提现</view>
			<view class="rows">{{item.addtime_txt}}</view>
			<view class="rows">{{item.orderNo}}</view>
		</view>
		
		<view class="u_empty">
			<u-empty :show="total == 0"
				:text="$t('userinfo.text19')"
			>
			</u-empty>
		
		</view>
		
		
		<view class="vip_five game_flex" v-show="total > 0">
			<view class="game_flex d_border12 align_center game_justify_center">
				<u-icon name="play-left-fill" 
				
				:color="this.form.page == 1 ? '#999' : '#fff'" 
				size="16"
				@tap="previous"
				></u-icon>
			</view>
			<view class="game_flex align_center game_justify_center">{{form.page}}</view>
			<view class="game_flex d_border12 align_center game_justify_center"> 
				<u-icon name="play-right-fill" 
				:color="this.form.page * this.form.list == total ? '#999' : '#fff'"
				size="16"
				@tap="nextPage"
				></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	rechargeRecord,
	 } from '@/api/userinfo.js'
	export default {
		name: 'withdraw',
		data(){
			return {
				form: {
					status: 1 ,// 1 提现 0 充值
					page: 1, 
					list: 10
				},
				list: [],
				total: 0
			}
		},
		created() {
			this.getRechargeRecord()
		},
		methods: {
			// 获取充值提现记录
			async getRechargeRecord(){
				let {code, data} = await rechargeRecord(this.form)
				if(code == 200){
					console.log(data)
					this.list = data.data
					this.total = data.tal
				}
			},
			// 上一页
			previous(){
				if(this.form.page > 1 ) {
					this.form.page-=1
					this.getRechargeRecord()
				}
			},
			
			// 下一页
			nextPage(){
				if(this.form.page * this.form.list < this.total ){
					this.form.page+=1
					this.getRechargeRecord()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.withdraw{
		position: relative;
		min-height: 400rpx;
		.table_th{
			padding: 0 20rpx;
			height: 70rpx;
			background-color: #283754;
		}
		.table_td{
			padding: 0 20rpx;
			height: 70rpx;
		}
		
		.rows{
			flex: 1;
		}
		
		.vip_five{
			position: absolute;
			bottom: -40rpx;
			right: 10rpx;
			& > view {
				margin-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
				background-color: #202a38;
				cursor: pointer;
			}
		}
	}
</style>