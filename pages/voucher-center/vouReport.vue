<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;">{{$t('voucher.text41')}}</text>
					</view>
				</view>
				<view class="u-nav-slot" slot="right">
					<view style="display: flex;">
						<!-- 修改后的图标+徽章容器 -->
						<view class="icon-container" @tap="orderClick"
							style="position: relative; display: inline-block; margin-right: 10rpx;">
							<u-icon name="order" color="#be984c" size="20"></u-icon>
							<!-- 	<u-badge class="custom-badge" max="99" :value="100" :offset="[5, -8]" size="18"
								bg-color="#ff4949"></u-badge> -->
						</view>

					</view>
				</view>
			</u-navbar>
		</view>
		<view class="content" style="margin-top: 120rpx;">
			<u-tabs :list="list1" :scrollable="false" :lineWidth="120" @click="tabsClick"></u-tabs>
			<view class="tabPane-tips mc-filter-container voucher-report-tab">
				<view style="width: 100%;">
				<view class="am-flexbox am-flexbox-align-middle" style="flex-wrap: nowrap; overflow: hidden;">
				  <span 
				    class="tabPane-span filter-tabPane-btn" 
				    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30%;"
				    @tap="allCz"
				  >
				    {{$t('voucher.text47')}}-
				    <text v-if="type == 0">{{$t('voucher.text42')}}</text>
				    <!-- 其他条件省略 -->
				  </span>
				  <span 
				    class="tabPane-span filter-tabPane-btn"
				    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30%;"
				    @tap="allType"
				  >
				    {{ $t('voucher.text30') }}
				  </span>
				  <span 
				    class="tabPane-span filter-tabPane-btn"
				    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 30%;"
				    @tap="allTime"
				  >
				    {{timeRange || $t('voucher.text31')}}
				  </span>
				</view>
				</view>
			</view>
			<view>
				<!-- 新增卡片列表 -->
				<scroll-view class="card-list" scroll-y v-if="rechargeList.length > 0">
					<view v-for="(item, index) in rechargeList" :key="index" class="recharge-card">
						<view class="card-header">
							<view class="bank-name" style="display: flex;flex-direction: column;">
								<text>
									{{item.bankName}}
								</text>
								<text style="font-size: 24rpx;">{{ item.add_time }}</text>
							</view>
							<!-- <text class="status">{{ item.status }}</text> -->
						</view>
						<view class="card-body"
							style="background-color: #f6f6f6!important; padding: 30rpx; border-radius: 20rpx; line-height: 50rpx; font-size:24rpx ;">
							<view>{{$t('voucher.text32')}}：{{ item.orderNo }}</view>
							<!-- 				<view>附言：22</view> -->
							<view>{{item.type == 1? '处理时间' :  $t('voucher.text33')}}：{{ item.up_time || '-' }}</view>
							<!-- 		<view>手续费：</view>
							<view>活动：</view>
							<view>备注：</view> -->
						</view>
						<view class="card-body">

							<view class="details">
								<view class="detail-item">
									<text class="label" style="font-size: 24rpx !important;"
										v-if="item.type == 0">{{ $t('voucher.text34')}}</text>
									<text class="label" style="font-size: 24rpx !important;"
										v-if="item.type == 1">{{ $t('voucher.text53')}}</text>
									<text class="label" style="font-size: 24rpx !important;"
										v-if="item.type == 2">{{ $t('voucher.text54')}}</text>
									<text class="label" style="font-size: 24rpx !important;"
										v-if="item.type == 3">{{ $t('voucher.text53')}}</text>
									<text class="label" style="font-size: 24rpx !important;"
										v-if="item.type == 4">{{ $t('voucher.text53')}}</text>
									<text class="value"
										style="color: red;font-size: 24rpx !important;">{{ item.money }}</text>
								</view>
								<view class="detail-item">
									<text class="label"
										style="font-size: 24rpx !important;">{{$t('voucher.text35')}}</text>

									<text class="value" v-if="item.type == 0"
										style="font-size: 24rpx !important;">{{ item.status == 1 ? item.money + '' : '-' }}</text>
									<text class="value" v-if="item.type == 1"
										style="font-size: 24rpx !important;">{{ item.status == 1 ? item.moneys + '' : '-' }}</text>
									<text class="value" v-if="item.type == 2"
										style="font-size: 24rpx !important;">{{ item.status == 1 ? item.moneys + '' : '-' }}</text>
									<text class="value" v-if="item.type == 3"
										style="font-size: 24rpx !important;">{{ item.status == 1 ? item.moneys + '' : '-' }}</text>
									<text class="value" v-if="item.type == 4"
										style="font-size: 24rpx !important;">{{ item.status == 1 ? item.moneys + '' : '-' }}</text>
								</view>
								<view class="detail-item" v-if="item.jl_money">
									<text class="label" style="font-size: 24rpx !important; color: green;">{{$t('voucher.text55')}}</text>
									<text class="value" v-if="item.jl_money"
										style="font-size: 24rpx !important; color: green;">{{ item.status == 1 ? item.jl_money : '-' }}</text>
								</view>
								<view class="detail-item">
									<text class="label"
										style="font-size: 24rpx !important;">{{$t('voucher.text36')}}</text>
									<text class="value"
										style="font-size: 24rpx !important;color: #0a98f8!important;">{{ item.status_txt }}</text>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view v-else>
					<view
						style="display: flex;align-items: center;justify-content: center; height:calc(100vh - 172px);">
						<u-empty>
						</u-empty>
					</view>
				</view>
				<view style="height: 10px;"></view>
			</view>
		</view>
		<u-picker :show="czShow" :columns="columns" @confirm="czConfirm" @cancel="czClose" :confirmText="$t('account.text41')" :cancelText="$t('account.text42')"></u-picker>
		<u-picker :show="typeShow" :columns="typeColumns" @confirm="typeConfirm" @cancel="typeClose" :confirmText="$t('account.text41')" :cancelText="$t('account.text42')"></u-picker>
		<u-calendar :show="timeShow" :title="$t('tzjl.text10')" mode="range" @confirm="confirm" @close="close" :confirmText="$t('account.text41')" :confirmDisabledText="$t('account.text41')"></u-calendar>

		<view class="footer">
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
				<view style="padding: 11.04px 0;display: flex;justify-content: space-around; width: 100%;">
					<view
						style="display: flex;justify-content: center; align-items: center; font-size: 40rpx; font-weight: bold;">
						{{type == 0 || type == 2 ? $t('voucher.text37') : $t('voucher.text56')}}
					</view>
					<view
						style="display: flex;justify-content: center; align-items: center;font-size: 40rpx; font-weight: bold;">
						{{total}}
					</view>
				</view>
			</u-tabbar>
		</view>
		<global-notify></global-notify>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getOrderLogListInfo
	} from '@/api/jogos.js'
	export default {
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
		},
		data() {
			return {
				czShow: false,
				typeShow: false,
				timeShow: false,
				mode: 'range',
				page: 1,
				limit: 300,
				type: 0,
				columns: [
					[this.$t('voucher.text48'), this.$t('voucher.text49'), this.$t('voucher.text50'), this.$t('voucher.text51'), this.$t('voucher.text52')]
				],
				typeColumns: [

				],
				timeRange: '',
				list1: [{
					name: this.$t('voucher.text38'),
				}, {
					name: this.$t('voucher.text39'),
				}, {
					name: this.$t('voucher.text40'),
				}],
				startTime: '',
				endTime: '',
				activeIndex: 0,
				rechargeList: [],
				status: 0,
				total: 0
			}
		},
		onLoad() {
			this.orderLogInfo()
		},
		mounted() {

		},
		beforeDestroy() {},
		methods: {
			onReachBottom() {
				console.log("xialafenye")
			},
			tabsClick(e) {
				this.activeIndex = e.index
				this.orderLogInfo()
			},
			async orderLogInfo() {
				let _this = this
				let {
					data,
					code
				} = await getOrderLogListInfo({
					page: _this.page,
					limit: _this.limit,
					status: _this.status,
					startTime: _this.startTime,
					endTime: _this.endTime,
					activeIndex: _this.activeIndex,
					type: this.type,
					lang:this.$store.state.user.language
				});
				if (code == 200) {
					this.rechargeList = data.info.data
					this.typeColumns = [data.type]
					this.total = data.count
				}
			},
			allCz() {
				this.czShow = true
			},
			czConfirm(e) {
				
				this.type = e.indexs[0] //全部类型赋值
				this.orderLogInfo()
				this.czShow = false
			},
			czClose(e) {
				this.czShow = false
			},
			allType() {
				this.typeShow = true

			},
			//分类
			typeConfirm(e) {
				this.status = e.indexs[0] //全部类型赋值
				this.orderLogInfo()
				this.typeShow = false
			},
			typeClose(e) {
				this.typeShow = false
			},
			allTime() {
				this.timeShow = true

			},
			confirm(e) {
				this.timeRange = (e[0] + '~' + e[e.length - 1]);
				this.startTime = (e[0])
				this.endTime = (e[e.length - 1])
				this.orderLogInfo()
				this.timeShow = false
			},
			close() {
				this.timeShow = false
			},
			leftClick() {
				this.$tab.navigateTo(`/pages/voucher-center/index`)
			},
			orderClick() {
				this.$tab.navigateTo(`/pages/voucher-center/vouReport`)
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}


	.u-button__text {
		font-size: 23px !important;
	}

	.custom-badge {
		position: absolute !important;
		/* 强制覆盖默认定位 */
		top: -5px !important;
		/* 根据需求调整 */
		right: -15px !important;
		/* 根据需求调整 */
	}

	.tabPane-tips {
		width: 100%;
		height: 55px;
		line-height: 55px;
		display: flex;
		background: #f0f0f0;
		border-bottom: 1px solid #ebebeb;
		z-index: 1;
	}

	.am-flexbox.am-flexbox-align-middle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 16px;
		gap: 16px;
	}

	.filter-tabPane-btn {
		color: #108ee9;
		display: inline-block;
		height: 33px;
		line-height: 33px;
		margin: 0;
		border-radius: 5.52px;
		white-space: nowrap;
		padding: 0 40rpx;
		border: 1px solid #108ee9;
	}

	/* 卡片容器 */
	.card-list {
		height: calc(100vh - 300rpx);
		/* 根据实际布局调整高度 */
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 单个卡片样式 */
	.recharge-card {
		background: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.bank-name {
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
	}

	.status {
		font-size: 28rpx;
		color: #108ee9;
		padding: 6rpx 16rpx;
		border: 1rpx solid #108ee9;
		border-radius: 8rpx;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.amount {
		display: flex;
		align-items: flex-end;
		gap: 10rpx;
	}

	.amount .label {
		font-size: 28rpx;
		color: #666;
	}

	.amount .value {
		font-size: 40rpx;
		color: #333;
		font-weight: 600;
	}

	.details {
		display: flex;
		justify-content: space-between;
		gap: 10rpx;
		margin-top: 20rpx;
		line-height: 60rpx;
	}

	.detail-item {
		display: flex;
		flex-direction: column;

		align-items: center;
	}

	.detail-item .label {
		font-size: 26rpx;
		color: #666;
		white-space: nowrap;
	}

	.detail-item .value {
		font-size: 26rpx;
		color: #333;
	}
</style>