<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('tzjl.text12')}}</text>
					</view>
				</view>

			</u-navbar>
		</view>
		<view>
			<!-- 自定义tabs组件 -->
			<custom-tabs :tabsList="tabs" @change="handleTabChange" :isShow="true" />
			<!-- 内容区域 -->
			<view class="content">
				<view>
					<view>
						<view style="display: flex;justify-content:flex-end;align-items: center; gap:10; padding: 0 20rpx;
					         box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);
					         position: relative;
					         border-bottom: 2rpx solid rgb(17, 39, 58);">
						<!-- 	<view style="width:75%;">
								<u-input v-model="filters.username" clearable @clear="clearEnter"
									:placeholder="$t('team.text6')" prefixIcon="search"
									prefixIconStyle="font-size: 22px;color: #909399">
									<template slot="suffix">
										<u-button size="mini" @tap="handleSearchEnter">搜索</u-button>
									</template></u-input>
							</view> -->
							<view style="display: flex; align-items: right:;padding: 40rpx 0rpx;" @click="allSearch">
								<text style="font-size: 25rpx;margin-right: 6rpx;">{{selectedDateTypeName}}</text>
								<u-icon :name="!showModal ? 'arrow-down' :  'arrow-up'" size="15"></u-icon>
							</view>
						</view>
						<view v-show="showModal"
							style="background-color: #fff; width: 100%; position: absolute; z-index: 1000;">
							<view style="width: 100%; padding:0rpx 20rpx">
								<view class="list-item">

									<view class="item-group" style="margin-top: 30rpx;">
										<view class="item-btn"
											:class="filters.date_type == item.key ? 'checked_btn' : ''"
											v-for="(item,index) in dateTypeArr" :key="index" @tap="dateTypeClick(item)">
											<text>{{item.name}}</text>
										</view>
									</view>
									<view class="calendar-group item-spacing" style="margin-top: 30rpx;">
										<view class="calendar-select" @tap="dateTypeTimeClick('select')">
											<view class="am-button-icon"><span style="padding: 20rpx;">
													{{filters.startTime}}
													-
													{{filters.endTime }}</span>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="margin:20rpx;">
									<view
										style="border: 1px solid #595959; padding: 10rpx; font-size: 25rpx;border-radius: 12rpx;">
										{{userInfo.username || ''}}
									</view>
								</view>
								<!-- <view style="display: flex;align-items: center;">
											<view style="margin:  0 29rpx;">|</view><text style="font-size: 25rpx;color: orange;">
												{{$t('team.text8')}}</text>
											<view style="margin:  0 8rpx;font-size: 25rpx;">{{currentTab}}</view>
										</view> -->
							</view>
							<view style="margin-top:30rpx;">
								<view class="my-withdraw-cards">
									<view class="my-ew-banks-wrap">
										<view class="withdraw-bank-card-ew">
											<!-- <view class="cards-title">{{$t('team.text9')}}</view> -->
											<view class="card">
												<!-- 每行作为一个 flex 容器 -->
												<view class="row"  v-if="currentTab  == 0">
													<view class="item">
														<text class="label">{{$t('team.text10')}}：</text>
														<text class="value">{{dataList.zcz || 0}}</text>
													</view>
													<view class="item">
														<text class="label">{{$t('team.text11')}}：</text>
														<text class="value">{{dataList.ztx || 0}}</text>
													</view>
												</view>

												<view class="row">

													<view class="item">
														<text class="label">{{$t('team.text13')}}：</text>
														<text class="value"
															>{{dataList.zyouxiaotouzhu || 0}}</text>
													</view>
													<view class="item" v-if="currentTab  == 0">
														<text class="label">{{ $t('tzsCustomize.title5')}}</text>
														<text class="value" style="color: blue;">{{dataList.zzs || 0}}</text>
													</view>
													<view class="item" v-if="currentTab  !== 0">
														<text class="label">派奖金额</text>
														<text class="value">{{dataList.actualStake || 0}}</text>
													</view>
													<!-- <view class="item">
														<text class="label">{{$t('team.text51')}}：</text>
														<text class="value"
															style="color: blue;">{{dataList.won_count || 0}}</text>
													</view> -->
												</view>
												<view class="row">
												<!-- 	<view class="item">
														<text class="label">{{$t('team.text52')}}：</text>
														<text class="value"
															style="color: red;">{{dataList.lose_count || 0}}</text>
													</view> -->
													<view class="item">
														<text class="label">{{$t('tzsCustomize.title7')}}：</text>
														<text class="value"
															:style="dataList.zongshuying > 0 ? 'color: green;' : 'color: red;'">{{dataList.zongshuying || 0}}</text>
													</view>
													<view class="item">
														<text class="label">{{$t('team.text15')}}：</text>
														<text class="value"
															:style="dataList.zongyingkui > 0 ? 'color: green;' : 'color: red;'">{{dataList.zongyingkui }}</text>
													</view>
												</view>



											</view>

										</view>

									</view>
								</view>
							</view>
						</view>
						<!-- <view style="margin-top:530rpx;" v-else>
							<u-empty mode="data">
							</u-empty>
						</view> -->

					</view>
				</view>

			</view>
		</view>
<global-notify></global-notify>
	<!-- 	<u-calendar :show="rqShow" :title="$t('tzjl.text10')"  :min-date="minDate" :max-date="maxDate" :default-date="currentDefaultDate"
			mode="range" @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar> -->
		<u-calendar :show="rqShow" :min-date="calendar.minDate" :max-date="calendar.maxDate" :default-date="currentDefaultDate"
			mode="range" :monthNum="calendar.monthNum"  :defaultDate="calendar.defaultDate"  @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		myIncome,
		getGameTypeList
	} from '@/api/jogos.js'

	import CustomTabs from '@/components/custom-tabs-yk.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
			currentDefaultDate() {
				switch (this.currentDateType) {
					case 'select':
						return [this.filters.startTime, this.filters.endTime];
					default:
						return [];
				}
			},
			selectedDateTypeName() {
				if (this.filters.startTime && this.filters.endTime) {
					// 格式化为 MM/DD-MM/DD
					const format = date => {
						if (!date) return ''
						const [year, month, day] = date.split('-')
						return `${month.padStart(2, '0')}/${day.padStart(2, '0')}`
					}
					return `${format(this.filters.startTime)}-${format(this.filters.endTime)}`
				}

				// 当使用预设日期类型时
				const typeItem = this.dateTypeArr.find(
					item => item.key === this.filters.date_type
				)
				return typeItem ? typeItem.name : '未知时间段'
			}
		},
		data() {
			
			return {
				calendar: {
				      minDate: '',
				      maxDate: '',
				      defaultDate: '',
				      monthNum: 13,
				    },
				rqShow: false,
				monthFirstDay: this.getFirstDayOfMonth(),
				today: this.getToday(),
				minDate: this.getFirstDayOfMonth(), // 默认开始日期
				maxDate: this.getToday(), // 默认结束日期
				showModal: false,
				currentTab: 0,
				showPassword: false,
				password: '',
				dataList: [],
				currentDateType: '',
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
				filters: {
					username: '',
					date_type: 'today',
					startTime: '', // 默认开始日期,
					endTime: '', // 默认结束日期
					game_class_id: 0,
					game_provoder_gpid: 0,
					type: 1
				},
				tabs: []
			}

		},

		onLoad() {
			this.myIncomeInfo()
			this.getGameTypeListInfo()
			this.chooseTimed()
		},
		mounted() {

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
			//分类读取
			async getGameTypeListInfo() {
				let {
					data,
					code
				} = await getGameTypeList()
				if (code == 200) {
					this.tabs = data
				}

			},
			//用户名搜索
			handleSearchEnter() {
				uni.showLoading({
					title: '用户搜索中...'
				});
				this.myIncomeInfo();
			},
			//清空用户搜索
			clearEnter() {
				uni.showLoading({
					title: '数组加载中...'
				});
				this.filters.username = '';
				this.myIncomeInfo();
			},
			//全部下级搜索
			allSearch() {
				this.showModal = !this.showModal;
			},
			//日期选择
			dateTypeClick(item) {
				uni.showLoading({
					title: '日期条件筛选中...'
				});
				this.filters.date_type = item.key
				this.showModal = false
				this.myIncomeInfo()
			},
			//日期组件
			dateTypeTimeClick(type) {
				this.currentDateType = type;
				this.rqShow = true
			},
			// 确认选择日期
			handleConfirm(e) {
				uni.showLoading({
					title: '加载中'
				});
				const [start, end] = e;
				const validEnd = this.validateDateRange(end);
				switch (this.currentDateType) {
					case 'select':
						this.filters.startTime = start;
						this.filters.endTime = e.pop();
						break;
				}
				this.rqShow = false;
				this.showModal = false
				this.filters.date_type = 'custom'
				this.myIncomeInfo()
			},
			// 验证结束日期不超过今天
			validateDateRange(endDate) {
				const today = new Date(this.today);
				const selectedEnd = new Date(endDate);
				return selectedEnd > today ? this.today : endDate;
			},
			// 本月的第一天
			getFirstDayOfMonth() {
				const date = new Date();
				return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
			},
			//当天
			getToday() {
				const date = new Date();
				return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
			},
			async myIncomeInfo() {
				try {
					let {
						data,
						code
					} = await myIncome(this.filters);
					if (code == 200) {
						console.log(data)
						this.dataList = data
					}
				} catch (error) {
					console.error('加载失败:', error);
				} finally {
					uni.hideLoading();
				}
			},
			handleTabChange(item, index) {
				uni.showLoading({
					title: '加载中...'
				});
				this.dataList = []
		
				let data = item.child; // 假设 data 可能是空数组 []
				this.filters.type = item.id
				this.filters.startTime = ''
				this.filters.endTime = ''
				// 提取去重后的值（如果 data 为空数组，直接返回 [0]）
				const uniqueGameClassIds = data.length === 0 ? [0] : [...new Set(data.map(item => item.game_class_id))];
				const uniqueGameProviderGpids = data.length === 0 ? [0] : [...new Set(data.map(item => item
					.game_provoder_gpid))];
				this.filters.game_class_id = uniqueGameClassIds.join(", ")
				this.filters.game_provoder_gpid = uniqueGameProviderGpids.join(", ")
				console.log(this.filters);
				this.currentTab = index;
				this.myIncomeInfo()
			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},

			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.list-submit {
		display: flex;
		margin: 16.0533px 0 0;
		font-size: 16.0533px;
		align-items: center;
		height: 45.2933px;
		line-height: 45.2933px;
		text-align: center;
	}

	.item-reset {
		width: 50%;
		background-color: #f5f5f5;
		color: #646464;
	}

	.item-confirm {
		width: 50%;
		background-color: #fef4f4;
		color: #ec2529;
	}

	.am-button-icon {
		display: flex;
		justify-content: center;
		padding: 0 28.6667px 0 9.17333px;
		border-radius: 4.58667px;
		border: 1.14667px solid #cdcdcd;
		font-size: 13.76px;
		color: #5b5b5b;
	}

	.item-title {
		font-size: 25rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-group {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		flex-wrap: wrap;
		gap: 30rpx;
	}

	.item-btn {
		border: 1px solid #cdcdcd;
		border-radius: 10rpx;
		width: 30%;
		min-height: 60rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: normal;
		padding: 0 4rpx;
		/* 		margin: 14rpx 0; */
		word-wrap: break-word;
		word-break: break-word;
		text-align: center;

	}

	.checked_btn {

		border: 1px solid #ec2529;
		color: #ec2529;
		background-color: #fef4f4;

	}

	.list-item:first-child {
		border-top: none;
		margin-top: 0 !important;

	}

	.list-item {
		margin-top: 20rpx;

		border-top: 1px solid #ebebeb;
	}

	.custom-badge {
		position: absolute !important;
		/* 强制覆盖默认定位 */
		top: -5px !important;
		/* 根据需求调整 */
		right: -15px !important;
		/* 根据需求调整 */
	}

	.content {
		font-size: 40rpx;
	}

	.cards-title {
		font-size: 24rpx;
		padding: 0 10rpx 10rpx 0;
		color: #595959;
	}

	.am-wingblank-lg {
		margin-left: 34rpx;
		margin-right: 34rpx;
	}

	.withdraw-nbank {
		color: #fff;
		font-size: 54rpx;
		margin-top: 44rpx;
		margin-bottom: 44rpx;
		height: 400rpx !important;
		line-height: 400rpx;
		background: url(https://www.may9.tv/mobile/mc/no_cards.b073c0ab.png) no-repeat;
		border-radius: 10rpx;
		background-size: auto 100%;
		background-position: 50%;
		text-align: center;
		position: relative;
	}

	.withdraw-nbank span {
		font-size: 34rpx;
		color: #a9a9a9;
		position: relative;
		bottom: -150rpx;
		display: inline-block;
	}

	.withdraw-bkdbtn {
		height: 36rpx;
		border-bottom: 1px solid #dedede;
		line-height: 0;
		font-size: 0;
		position: relative;
	}

	.withdraw-bkadd {
		padding: 22rpx;
		background-color: #fe0000;
		border: 5rpx solid #fff;
		border-radius: 60rpx;
		position: absolute;
		right: 51rpx;
		bottom: -51rpx;
	}

	.am-icon-md {
		width: 51rpx;
		height: 51rpx;
	}

	.withdraw-bkinfo {
		color: #bababa;
		padding: 44rpx 50rpx 0;
		line-height: 40rpx;
		font-size: 26rpx;
	}

	.wysiwyg {
		line-height: 1.5;
		white-space: normal !important;

	}

	.dark-gray {
		color: #333;
	}

	.wallet_return {
		margin-top: 4rpx;
		margin-bottom: 35rpx;
		text-align: center;
	}

	.wallet_return view {
		margin-top: 10rpx;
		color: #3b79f3;
		background-color: #d7e7fe;
		display: inline-block;
		padding: 0 26rpx;
		font-size: 32rpx;
		/* 	    height: 80rpx; */
		line-height: 80rpx;
		border-radius: 65rpx;
		text-align: center;
		position: relative;
	}

	.icon {
		position: absolute;
		left: 22rpx;
		/* 	    top: 10rpx; */
		width: 56rpx;

		fill: #3b79f3;
	}

	.wallet_return view span {
		/* 	    padding-left: 64rpx; */
		padding: 0 64rpx;
		display: inline-block;
	}

	.amount-wrap {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
	}

	.amount-wrap .amount-title {
		margin: 0 51rpx;
		font-size: 28rpx;
		color: #333;
	}

	.w-input-content {
		display: flex;
		/* 新增flex布局 */
		align-items: center;
		/* 垂直居中 */
		margin: 10rpx 51rpx 0;
		height: 120rpx;
		border: 2rpx solid #ccc;
		border-radius: 10rpx;
		padding: 28rpx 20rpx;
		/* 调整左右padding */
		position: relative;
	}

	.w-input-content .placeholder {
		/* 移除绝对定位和高度100% */
		width: 140rpx !important;
		/* 改为固定宽度 */
		color: #0a0a0a;
		font-size: 34rpx;
		/* 与输入文字大小一致 */
		flex-shrink: 0;
		/* 防止被压缩 */
	}



	.w-input-content input {
		flex: 1;
		/* 自动撑满剩余空间 */
		height: 62rpx;
		font-size: 34rpx;
		border: 0 none;
		padding-left: 20rpx;
		/* 与文字间隔 */
		margin-left: 10rpx;
		/* 与文字间隔 */
	}

	.eye-icon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.voucher-btn {
		color: #fff;
		font-size: 14px;
		display: inline-block;
		min-height: 1rem;
		width: calc(33% - 22.08px);
		background: none;
		white-space: normal;
		word-break: break-word;
		vertical-align: middle;
		position: relative;
	}

	.voucher-btn span {
		display: flex;
		height: 100%;
		text-align: center;
		vertical-align: middle;
		justify-content: center;
		align-items: center;
	}

	.card {
		padding: 20rpx;
		background: #fff;
		border-radius: 12rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.item {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}

	.label {
		color: #666;
		font-size: 24rpx;
		margin-right: 10rpx;
	}

	.value {
		color: #333;
		font-size: 24rpx;
		font-weight: bold;
		text-align: right;
		flex-shrink: 0;
	}

	/* 最后一行不需要下边距 */
	.row:last-child {
		margin-bottom: 0;
	}
</style>