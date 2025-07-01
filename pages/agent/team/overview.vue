<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;">{{$t('team.text18')}}</text>
					</view>
				</view>
				<view class="u-nav-slot" slot="right">
					<view style="display: flex;">
						<!-- 修改后的图标+徽章容器 -->
						<!-- <view class="icon-container" @tap="orderClick"
							style="position: relative; display: inline-block; margin-right: 30rpx;">
							<u-icon name="order" color="#fff" size="30"></u-icon> -->
						<!-- 	<u-badge class="custom-badge" max="99" :value="100" :offset="[5, -8]" size="18"
								bg-color="#ff4949"></u-badge> -->
						<!-- </view> -->
						<!-- 其他右区域内容 -->
						<view @click="tanc"><u-icon name="search" color="#be984c" size="30"></u-icon></view>
					</view>
				</view>
			</u-navbar>
		</view>
		<!-- 搜索页面 -->
		<view style="background-color: #fff; padding: 20rpx 20rpx;" v-if="searchShow">
			<view style="display: flex; justify-content: space-between; text-align: center;gap: 10px;">
				<view class="dateSe" v-for="(item,index) in dateTypeArr" :key="index" @tap="dateTypeClick(item)">
					{{item.name}}
				</view>

			</view>
			<view style="margin-top: 20rpx;">
				<view style="font-size: 30rpx; margin-bottom: 20rpx;">自定义</view>
				<view>
					<!-- 	<u--input placeholder="请选择日期" border="surround"></u--input> -->
					<!-- #ifndef APP-NVUE -->
					<u-input placeholder="请选择日期" v-model="textDate" disabled="">
					<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input placeholder="请选择日期" v-model="textDate" disabled="">
						<!-- #endif -->
							<template slot="suffix">
								<u-button @tap="selectDate"  color="#be984c" size="mini">选择日期</u-button>
							</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="content" :style="searchShow ? '' : 'margin-top: 150rpx;'">
			<view class="overview-statis-wrapper">
				<view class="overview-title">
					<span>{{$t('team.text20')}}</span><span class="count">{{dataList.reg_count || 0}}</span>
				</view>
				<view class="overview-select">
					<view class="item-btn ">
						<view class="item-content"><span class="count">{{dataList.reg_count || 0}}</span><span
								class="item-title">{{$t('team.text21')}}</span>
						</view>
					</view>

					<view class="item-btn">
						<view class="item-content"><span class="count">{{dataList.reg_count || 0}}</span><span
								class="item-title">{{$t('team.text22')}}</span>
						</view>
					</view>
					<view class="item-btn">
						<view class="item-content"><span class="count">{{dataList.deposit_users || 0}}</span><span
								class="item-title">{{$t('team.text59')}}</span>
						</view>
					</view>
					<view class="item-btn">
						<view class="item-content"><span class="count">{{dataList.withdraw_users || 0}}</span><span
								class="item-title">{{$t('team.text58')}}</span>
						</view>
					</view>
					<view class="item-btn">
						<view class="item-content"><span class="count">{{dataList.tzrs_count || 0}}</span><span
								class="item-title">{{$t('team.text23')}}</span>
						</view>
					</view>
					<!-- <view class="item-btn">
						<view class="item-content"><span class="count">0</span><span class="item-title">{{$t('team.text26')}}</span>
						</view>
					</view> -->
					<!-- 	<view class="item-btn">
						<view class="item-content"><span class="count">0</span><span class="item-title">{{$t('team.text27')}}</span>
						</view>
					</view>
					<view class="item-btn">
						<view class="item-content "><span class="count">0</span><span class="item-title">{{$t('team.text28')}}</span>
						</view>
					</view> -->
				</view>
			</view>
			<view class="overview-sum-wrapper">
				<view class="sum-list-item">
					<view class="item-left">
						{{$t('team.text29')}}
					</view>
					<view class="item-right">{{dataList.deposit_amount || 0}}</view>
				</view>
				<view class="sum-list-item">
					<view class="item-left">
						{{$t('team.text57')}}
					</view>
					<view class="item-right" style="color: blue; font-weight: bold;">{{dataList.jl_count || 0}}</view>
				</view>
				<view class="sum-list-item">
					<view class="item-left">
						{{$t('team.text30')}}
					</view>
					<view class="item-right">{{dataList.withdraw_amount || 0}}</view>
				</view>
				<!-- 	<view class="sum-list-item">
					<view class="item-left">{{$t('team.text31')}}
					</view>
					<view class="item-right text-blue">0.00</view>
				</view> -->
				<view class="sum-list-item">
					<view class="item-left">{{$t('team.text32')}}
					</view>
					<view class="item-right">{{dataList.yxtz_count || 0}}</view>
				</view>
				<!-- <view class="sum-list-item">
					<view class="item-left">{{$t('team.text51')}}11
					</view>
					<view class="item-right text-blue">{{dataList.won_count || 0}}</view>
				</view> -->
				<!-- 	<view class="sum-list-item">
					<view class="item-left">{{$t('team.text52')}}
					</view>
					<view class="item-right win-amount">{{dataList.actualStake || 0}}</view>
				</view> -->

				<view class="sum-list-item">
					<view>
						{{$t('team.text83')}}
					</view>
					<view class="item-right"
						:style="parseFloat(dataList.zongshuying) > 0 ? 'color: green;font-weight: bold;' : 'color: red;font-weight: bold;'">
						{{dataList.zongshuying || 0}}
					</view>
				</view>
				<view class="sum-list-item">
					<view>
						{{$t('team.text34')}}
					</view>
					<view class="item-right"
						:style="parseFloat(dataList.zongyingkui) > 0 ? 'color:green;font-weight: bold;' : 'color: red;font-weight: bold;'">
						{{dataList.zongyingkui || 0}}
					</view>
				</view>
				<!-- 	<view class="sum-list-item">
					<view class="item-left">{{$t('team.text35')}}
					</view>
					<view class="item-right win-amount">0.00</view>
				</view> -->
			</view>
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
				<view style="width: 100%;  display: flex;align-items: center; justify-content: center;">
					<view style="text-align: center; color: red; font-weight: bold; font-size: 25rpx; ">{{$t('team.text84')}}</view>
				</view>
			</u-tabbar>
		</view>
		<u-calendar :show="rqShow" :min-date="calendar.minDate" :max-date="calendar.maxDate"
			:default-date="calendar.defaultDate" mode="range" :monthNum="calendar.monthNum" @close="rqShow=false"
			@confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar>
		<global-notify></global-notify>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		zlList
	} from '@/api/jogos.js'
	export default {
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
		},
		data() {
			return {
				searchShow: false,
				rqShow: false,
				dataList: [],
				filters: {
					date_type: 'today',
					startTime: '', // 默认开始日期,
					endTime: '', // 默认结束日期
				},
				calendar: {
					minDate: '',
					maxDate: '',
					defaultDate: '',
					monthNum: 13,
				},
				textDate: '',
				dateTypeArr: [{
						id: 0,
						key: 'today',
						name: this.$t('team.text54')
					},
					{
						id: 1,
						key: 'yesterday',
						name: this.$t('team.text53')
					},
					{
						id: 2,
						key: 'last7days',
						name: this.$t('team.text55')
					},
					{
						id: 3,
						key: 'month',
						name: this.$t('team.text56')
					}
				],
			}
		},
		onLoad() {
			this.orderLogInfo()
		},
		mounted() {
			this.chooseTimed()
		},
		beforeDestroy() {},
		methods: {
			// 设置默认日期，最大值为今天，最小值为去年今天
			chooseTimed() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month <= 9) {
					month = '0' + month;
				}
				if (day <= 9) {
					day = '0' + day;
				}
				let minyear = year - 1;
				this.calendar.minDate = minyear + '-' + month + '-' + day;
				this.calendar.maxDate = year + '-' + month + '-' + day;
				this.calendar.defaultDate = year + '-' + month + '-' + day;
			},
			async orderLogInfo() {
				try{
					let {
						data,
						code
					} = await zlList(this.filters);
					if (code == 200) {
						this.dataList = data
						console.log(this.dataList)
					}
				}finally{
					uni.hideLoading()
				}
			},
			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			tanc() {
				this.searchShow = !this.searchShow
			},
			//日期选择
			dateTypeClick(item) {
				uni.showLoading({
					title: '数据加载中...'
				});
				this.filters.date_type = item.key
				this.orderLogInfo()
				this.searchShow = false
			},
			selectDate() {
				this.rqShow = true
			},
			// 确认选择日期
			handleConfirm(e) {
				uni.showLoading({
					title: '数据加载中...'
				});
				const [start, end] = e;
				this.filters.startTime = start;
				this.filters.endTime = e.pop();
				this.filters.date_type = 'custom'
				this.textDate = start + '-' + e.pop()
				this.rqShow = false
				this.searchShow = false
				this.orderLogInfo()
				console.log(this.filters)
			},

		}
	}
</script>

<style>
	page {
		background-color: #fff !important;
	}

	.content {
		/* margin-top: 150rpx; */
	}

	.overview-statis-wrapper {
		margin: 0 13px;
		position: relative;
	}

	.overview-statis-wrapper .overview-title {
		font-size: 13px;
		font-weight: 700;
		color: #424242;
		text-align: left;
	}

	.overview-statis-wrapper .overview-title .count {
		padding-left: 3px;
	}

	.overview-statis-wrapper .overview-select {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 18px;
	}

	.overview-statis-wrapper:after {
		background: url(https://www.may9.tv/mobile/mc/overview-item.7a4d6796.png) no-repeat 50% / contain;
		width: 94px;
		min-height: 54px;
		position: absolute;
		content: "";
		top: -5.2px;
		right: 4.16px;
	}

	.overview-statis-wrapper .overview-select .item-btn {
		background-color: #fef1f1;
	}

	.overview-statis-wrapper .overview-select .item-btn {
		flex: 0 0 24%;
		position: relative;
		margin-top: 10.4px;
		border-radius: 4.16px;
	}

	.overview-statis-wrapper .overview-select .item-btn input[type=radio] {
		display: none;
	}

	.overview-statis-wrapper .overview-select .select-item {
		width: 100%;
		height: 100%;
		display: flex;
		position: absolute;
		border-radius: 4.16px;
		z-index: 1;
	}

	.overview-statis-wrapper .overview-select .item-content {
		padding: 7.8px 15.6px 15.6px 19.76px;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.overview-statis-wrapper .overview-select .item-content .count {
		font-size: 18.72px;
		font-weight: 700;
		color: #424242;
		position: relative;
	}

	.overview-statis-wrapper .overview-select .item-btn .count:before {
		background-color: #ed4f4f;
	}

	.overview-statis-wrapper .overview-select .item-content .count:before {
		position: absolute;
		content: "";
		width: 3.64px;
		height: 7.28px;
		border-radius: 2.08px;
		left: -10.4px;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.overview-statis-wrapper .overview-select .item-content .item-title {
		font-size: 10.4px;
		color: #646464;
		word-break: break-word;
		margin-top: 6.24px;
	}

	.checked {
		border: 1px solid #ed4f4f;
	}

	/* 	.checked:before {
	    width: 0;
	    height: 0;
	    border-style: solid;
	    border-width:6.76px;
	    content: "";
	    position: absolute;
	    top: -11.96px;
	    left: 0;
	    right: 0;
		color: #ed4f4f;
	    margin: auto;
	    z-index: 3;
		border-color: transparent transparent #f1fbfe;
	} */

	.overview-sum-wrapper {
		background-color: #fafafa;
		border-radius: 10.4px;
		margin: 13px 13px 0;
	}

	.overview-sum-wrapper .sum-list-item {
		margin: 0 16.12px;
		display: flex;
		padding: 12.48px 0 11.96px;
		border-bottom: 1px solid #ececec;
		font-size: 12.48px;
		color: #424242;
		font-weight: 500;
		justify-content: space-between;
	}

	.win-amount {
		color: red !important;
	}

	.dateSe {
		width: 30%;
		border: 1px solid #be984c;
		padding: 20rpx 0;
		border-radius: 10rpx;
	}
</style>