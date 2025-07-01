<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text
							style="font-size:35rpx; color: #be984c;font-weight: bold;">{{$t('userinfo.text52')}}</text>
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
						<view style="display: flex; justify-content: space-between; align-items: center; 
						             gap: 10rpx; padding: 0 20rpx; box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);
						             position: relative; border-bottom: 2rpx solid rgb(17, 39, 58); 
						             width: 100%; flex-wrap: nowrap;">
						    <!-- 时间选择框 - 自适应宽度 -->
						    <view class="calendar-group" style="flex: 1; min-width: 0; margin: 20rpx 0;">
						        <view class="calendar-select" @tap="dateTypeTimeClick('select')"
						              style="border: 1rpx solid #ddd; border-radius: 8rpx; background: #fff; 
						                     overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
						            <view class="am-button-icon" style="padding: 10rpx 20rpx; overflow: hidden;
						                      text-overflow: ellipsis; white-space: nowrap;">
						                <span v-if="filters.startTime && filters.endTime">
						                   {{filters.startTime}} 00:00:00/{{filters.endTime}} 23:59:59
						                </span>
						                <span v-else>
						                   {{calendar.defaultDate}} 00:00:00/{{calendar.defaultDate}} 23:59:59
						                </span>
						            </view>
						        </view>
						    </view>
						
						    <!-- 右侧按钮 - 固定宽度 -->
						    <view class="calendar-group" @click="csTypeAll"
						          style="flex-shrink: 0; margin: 20rpx 0; padding: 12rpx 24rpx; 
						                 font-size: 24rpx; border: 2rpx solid #70b603; 
						                 border-radius: 10rpx; background: #fff; color: #70b603;
						                 white-space: nowrap;">
						        {{dqtitle ? dqtitle : $t('tzjl.text1')}}
						    </view>
						</view>
						<!-- <view style="display: flex;justify-content:space-between;align-items: center; gap:10; padding: 0 20rpx;
					         box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);
					         position: relative;
					         border-bottom: 2rpx solid rgb(17, 39, 58); width:100%;">
							<view class="calendar-group item-spacing" style="margin:20rpx 0;">
								<view class="calendar-select"  @tap="dateTypeTimeClick('select')">
									<view class="am-button-icon" style="white-space: nowrap;
    text-overflow: ellipsis;"><span style="padding: 20rpx;"
											v-if="filters.startTime && filters.endTime">
											{{filters.startTime}} 00:00:00/{{filters.endTime}} 23:59:59</span>
										<span style="padding: 20rpx;" v-else>
											{{calendar.defaultDate}} 00:00:00/{{calendar.defaultDate}} 23:59:59</span>
									</view>
								</view>
							</view>
							<view class="calendar-group item-spacing"
								style="margin:30rpx 0; font-size: 24rpx;border: 2rpx solid #70b603;white-space: nowrap;
    text-overflow: ellipsis; padding:20rpx 20rpx; border-radius:10rpx;"
								@click="csTypeAll">
								{{dqtitle ? dqtitle : $t('tzjl.text1')}}
							</view>
						</view> -->
						<view v-if="betData.length > 0">
							<view v-for="(item,index) in betData" :key="index">
								<view
									style="display: flex;margin:20rpx; font-size:26rpx; color: black; font-weight: bold;justify-content: space-between; align-items: center;">
									<view>
										<span class="green-dot"></span>
										<text
											v-if="$store.state.user.language == 'burmese'">{{item.game_name['gameName_my'] || ''}}</text>
										<text
											v-if="$store.state.user.language == 'zh'">{{item.game_name['gameName_cn'] || ''}}</text>
										<text
											v-if="$store.state.user.language == 'english'">{{item.game_name['gameName'] || ''}}</text>
									</view>
									<view>
										{{item.order_time || ''}}
									</view>
								</view>

								<view style="margin-top:30rpx;">
									<view class="my-withdraw-cards">
										<view class="my-ew-banks-wrap">
											<view class="withdraw-bank-card-ew">
												<!-- <view class="cards-title">{{$t('team.text9')}}</view> -->
												<view class="card">
													<view class="cards-title" style="color: black; font-weight: bold;">
														{{$t('tzjl.text2')}}
													</view>
													<view class="cards-title" style="color: black; font-weight: bold;">
														{{item.ref_no || ''}}
													</view>
													<view class="row" style="gap: 40rpx; margin-top: 30rpx;">
														<view style="color: black; font-weight: bold;font-size: 26rpx;">
															<text>{{$t('tzjl.text3')}}：</text>
															<text>{{item.stake || 0}}</text>
														</view>
														<view style="color: black; font-weight: bold;font-size: 26rpx;">
															<text>{{$t('tzjl.text4')}}：</text>
															<text>{{item.actual_stake || 0}}</text>
														</view>
													</view>
													<view class="row" style=" margin-top: 30rpx;">
														<view>
															<view
																style="color: black; font-weight: bold;font-size: 26rpx;">
																{{$t('tzjl.text5')}}：
															</view>
															<view style="margin-top:10rpx;"
																:style="item.status == 'won' ? ' color: green;' : ' color: red;' ">
																{{item.winlost}}
															</view>
														</view>
														<view>
															<view
																style="color: black; font-weight: bold;font-size: 26rpx;">
																{{$t('tzjl.text6')}}：
															</view>
															<view style="margin-top:10rpx;">-
															</view>
														</view>
													</view>
												</view>

											</view>

										</view>
									</view>
								</view>
							</view>
							<!-- 加载提示 -->
							<view v-if="loading" style="text-align: center; font-size: 24rpx;">{{$t('tzjl.text7')}}...</view>
							<view v-if="isFinished" style="text-align: center; font-size: 24rpx;">{{$t('tzjl.text8')}}</view>
							<view style="height: 100rpx;"></view>
						</view>
						<view style="margin-top:530rpx;" v-else>
							<u-empty mode="data">
							</u-empty>
						</view>

					</view>
				</view>

			</view>
		</view>
		<u-tabbar :fixed="true" :placeholder="false" :safeAreaInsetBottom="true">
			<view style="display: flex;justify-content: center; align-items: center; width: 100%; gap: 20rpx;">
				<view style="line-height: 40rpx;">
					<view style="text-align: center;">{{$t('tzjl.text3')}}</view>
					<view style="text-align: center; color: #70b603!important; font-weight: bold;">
						{{summaryData.total_bet || 0}}
					</view>
				</view>
				<view style="line-height: 40rpx;">
					<view style="text-align: center;">{{$t('tzjl.text4')}}</view>
					<view style="text-align: center; color: #70b603!important; font-weight: bold;">
						{{summaryData.total_actual_stake || 0}}
					</view>
				</view>
				<view style="line-height: 40rpx;">
					<view style="text-align: center;">{{$t('tzjl.text6')}}</view>
					<view style="text-align: center; color: #70b603!important; font-weight: bold;">0</view>
				</view>
				<view style="line-height: 40rpx;">
					<view style="text-align: center;">{{$t('tzjl.text5')}}</view>
					<view style="text-align: center; color: #70b603!important; font-weight: bold;">
						{{summaryData.total_win || 0}}
					</view>
				</view>
			</view>
		</u-tabbar>
		<global-notify></global-notify>
		<!-- <u-action-sheet :show="showCs" :actions="csData" :title="$t('tzjl.text9')" @close="showCs = false" @select="CsSelect">
		</u-action-sheet> -->
		  <u-picker :show="showCs" :columns="[csData]" :cancelText="$t('tzjl.text14')" :confirmText="$t('tzjl.text13')" keyName="name" @confirm="CsSelect" @cancel="showCs=false"></u-picker>
		<!-- 	<u-calendar :show="rqShow" :min-date="minDate" :max-date="maxDate" :default-date="currentDefaultDate"
			mode="range" @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar> -->
		<u-calendar :title="$t('tzjl.text10')" :confirmText="$t('tzjl.text11')" :confirmDisabledText="$t('tzjl.text11')" :show="rqShow" @close="rqShow = false" @confirm="handleConfirm" mode="range"
			:defaultDate="calendar.defaultDate" :maxDate="calendar.maxDate" :minDate="calendar.minDate" 
			:monthNum="calendar.monthNum"></u-calendar>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		myIncome,
		betList,
		getGameTypeList,
		getGameTypeInfo,
		csList
	} from '@/api/jogos.js'

	import CustomTabs from '@/components/custom-tabs-yk.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
		},
		data() {
			return {
				rqShow: false,
				showModal: false,
				currentTab: 0,
				showPassword: false,
				password: '',
				showCs: false,
				dataList: [],
				dqtitle:'',
				currentDateType: '',
				startTime: '', // 默认开始日期,
				endTime: '', // 默认结束日期
				filters: {
					game_class_id: 0,
					page: 1,
					pageSize: 5,
					startTime: '', // 默认开始日期,
					endTime: '', // 默认结束日期
					cs: ''
				},
				calendar: {
					minDate: '',
					maxDate: '',
					defaultDate: '',
					monthNum: 13,
				},
				tabs: [],
				betData: [],
				csData: [],
				summaryData: [],
				loading: false, // 是否正在加载
				isFinished: false, // 是否已加载完所有数据
				scrollDisabled: false, // 防止滚动事件重复触发
				isSelectRq: false,
			}

		},

		onLoad() {
			this.getGameTypeListInfo()
			this.refreshData()
			this.csListInfo()
			this.chooseTimed()
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll);
			// 初始化加载第一页
			this.refreshData();
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll);
		},

		beforeDestroy() {},
		methods: {
			// 滚动事件处理
			handleScroll() {
				// 如果正在加载或已加载完成，则不再处理
				if (this.loading || this.isFinished) {
					return;
				}

				// 计算滚动位置
				const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

				// 如果滚动到底部（这里设置距离底部50px时触发）
				if (scrollTop + windowHeight >= scrollHeight - 50) {
					this.getBetList();
				}
			},
			// 初始化或刷新数据
			refreshData() {
				this.filters.page = 1;
				this.isFinished = false;
				this.getBetList();
			},
			async csListInfo() {
				let {
					data,
					code
				} = await csList({lang:this.$store.state.user.language});
				if (code == 200) {
					this.csData = data
				}
			},
			//数据源
			async getBetList() {
				// 如果已经加载完成或正在加载，则不再请求
				if (this.isFinished || this.loading) {
					return;
				}
				this.loading = true;
				uni.showLoading({
					title: '加载中'
				});
				try {
					let {
						data,
						code
					} = await betList(this.filters);
					if (code == 200) {
						// this.betData = data.list
						// this.summaryData = data.summary
						// 如果是第一页，直接赋值
						if (this.filters.page === 1) {
							this.betData = data.list;
						} else {
							// 否则追加数据
							this.betData = [...this.betData, ...data.list];
						}
						this.summaryData = data.summary;
						this.total = data.total;

						// 判断是否还有下一页
						if (this.filters.page * this.filters.pageSize >= data.total) {
							this.isFinished = true;
						} else {
							this.filters.page += 1;
						}
					}
				} finally {
					uni.hideLoading()
					this.loading = false;
				}
			},


			//分类读取
			async getGameTypeListInfo() {
				let {
					data,
					code
				} = await getGameTypeInfo()
				if (code == 200) {
					this.tabs = data
				}

			},



			//日期组件
			dateTypeTimeClick(type) {
				this.currentDateType = type;
				this.rqShow = true
			},
			// 确认选择日期
			handleConfirm(e) {
				// uni.showLoading({
				// 	title: '加载中'
				// });
				const [start, end] = e;
				const validEnd = this.validateDateRange(end);
				this.filters.startTime = start;
				this.filters.endTime = e.pop();
				this.rqShow = false;
				this.showModal = false
				this.refreshData()

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

			handleTabChange(item, index) {
				console.log(item)
				// this.$modal.msg('开通中...')
				// return
				uni.showLoading({
					title: '加载中...'
				});
				// let data = item.child; // 假设 data 可能是空数组 []
				// this.filters.type = item.id
				// this.filters.startTime = ''
				// this.filters.endTime = ''
				// // 提取去重后的值（如果 data 为空数组，直接返回 [0]）
				// const uniqueGameClassIds = data.length === 0 ? [0] : [...new Set(data.map(item => item.game_class_id))];
				// const uniqueGameProviderGpids = data.length === 0 ? [0] : [...new Set(data.map(item => item
				// 	.game_provoder_gpid))];
				// this.filters.game_class_id = uniqueGameClassIds.join(", ")
				// this.filters.game_provoder_gpid = uniqueGameProviderGpids.join(", ")
				this.currentTab = index;
				if (index == 0) {
					this.filters.game_class_id = 0
				} else {
					this.filters.game_class_id = item.id
				}

				this.refreshData()

			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},

			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			CsSelect(e) {
				this.filters.cs = e.value[0].value
				this.dqtitle = e.value[0].name
				this.showCs = false
				this.refreshData()
			},
			csTypeAll() {
				this.showCs = true
			},
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
				this.startTime = minyear + '-' + month + '-' + day;
				this.endTime = year + '-' + month + '-' + day;
				this.calendar.defaultDate = year + '-' + month + '-' + day;
			},

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

	.green-dot::before {
		content: "";
		display: inline-block;
		width: 20rpx;
		height: 20rpx;
		background-color: #70b603;
		border-radius: 50%;
		margin-right: 8rpx;
		vertical-align: middle;
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