<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('team.text19')}}</text>
					</view>
				</view>

			</u-navbar>
		</view>
		<view>
			<!-- 自定义tabs组件 -->
			<!-- 	<custom-tabs :tabsList="tabs" @change="handleTabChange" :isShow="false" /> -->
			<!-- 内容区域 -->
			<view class="content">
				<view v-show="currentTab === 0">
					<view>
						<view style="display: flex;justify-content: space-between;align-items: center; gap:10; padding: 0 20rpx; 
						         box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);
						         position: relative;
						         border-bottom: 2rpx solid rgb(17, 39, 58);">
							<view style="width:80%;">
								<u-input v-model="filters.username" clearable @clear="clearEnter"
									:placeholder="$t('team.text6')" prefixIcon="search"
									prefixIconStyle="font-size: 22px;color: #909399">
									<template slot="suffix">
										<u-button size="mini" @tap="handleSearchEnter">{{$t('team.text61')}}</u-button>
									</template></u-input>
							</view>
							<view style="display: flex;align-items: center;padding: 40rpx 0rpx;" @click="allSearch">
								<text style="font-size: 25rpx;margin-right: 6rpx;">{{$t('team.text70')}}</text>
								<u-icon :name="!showModal ? 'arrow-down' :  'arrow-up'" size="15"></u-icon>
							</view>
						</view>
						<view v-show="showModal"
							style="background-color: #fff; width: 100%; position: absolute; z-index: 1000;">
							<view style="width: 100%; padding:0rpx 20rpx">
								<view class="list-item">
									<view class="item-title">
										<text>{{$t('team.text63')}}</text>
									</view>
									<view class="item-group">
										<view class="item-btn" :class="filters.range == range.key ? 'checked_btn' : ''"
											v-for="(range,index) in rangeData" :key="index" @tap="rangeClick(range)">
											<text>{{range.name}}</text>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="item-title">
										<text>{{$t('team.text65')}}</text>
									</view>
									<view class="item-group">
										<view class="item-btn" :class="filters.type == type.key ? 'checked_btn' : ''"
											v-for="(type,index) in typeData" :key="index" @tap="typeClick(type)">
											<text>{{type.name}}</text>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="item-title">
										<text>{{$t('team.text68')}}</text>
									</view>
									<view class="calendar-group item-spacing">
										<view class="calendar-select" @tap="regTimeClick('reg')">
											<view class="am-button-icon"><span style="padding: 20rpx;">
													{{filters.regStartTime}}{{filters.regStartTime ? ' 00:00:00' : '' }}
													-
													{{filters.regEndTime }}{{filters.regEndTime ? ' 23:59:59' : '' }}</span>
											</view>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="item-title">
										<text>{{$t('team.text69')}}</text>
									</view>
									<view class="item-group">
										<view class="item-btn" :class="filters.login == login.key ? 'checked_btn' : ''"
											v-for="(login,index) in loginData" :key="index" @tap="loginClick(login)">
											<text>{{login.name}}</text>
										</view>
									</view>
									<view style="margin-top: 30rpx;">
										<view class="calendar-group item-spacing">
											<view class="calendar-select"
												@tap="filters.login === 'last_login_time' ? regTimeClick('login') : ''">
												<view class="am-button-icon "
													:class="filters.login !== 'last_login_time' ? 'flex-shrink1' : ''">
													<span
														style="padding: 20rpx;">{{filters.loginStartDate}}{{filters.loginStartDate ? ' 00:00:00' : '' }}
														-
														{{filters.loginEndDate}}{{filters.loginEndDate ? ' 23:59:59' : '' }}</span>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="list-item">
									<view class="item-title">
										<text>{{$t('team.text74')}}</text>
									</view>
									<view class="item-group">
										<view class="item-btn"
											:class="filters.recharge == recharge.key ? 'checked_btn' : ''"
											v-for="(recharge,index) in rechargeData" :key="index"
											@tap="rechargeClick(recharge)">
											<text>{{recharge.name}}</text>
										</view>
									</view>
									<view style="margin-top: 30rpx;">
										<view class="calendar-group item-spacing">
											<view class="calendar-select"
												@tap="!shouldFlexShrink ? regTimeClick('recharge') : ''">
												<view class="am-button-icon"
													:class="shouldFlexShrink  ? 'flex-shrink1' : ''">
													<span style="padding: 20rpx;">
														{{filters.rechargeStartDate}}{{filters.rechargeStartDate ? ' 00:00:00' : '' }}
														-
														{{filters.rechargeEndDate}}{{filters.rechargeEndDate ? ' 23:59:59' : '' }}</span>
												</view>
											</view>
										</view>
									</view>
								</view>

							</view>
							<view class="list-submit">
								<view class="item-reset" @tap="resetClick">{{$t('team.text80')}}</view>
								<view class="item-confirm" @tap="confirmClick">{{$t('team.text79')}}</view>
							</view>

						</view>
						<view v-if="!showModal"
							style="display: flex;justify-content: space-between;align-items: center; margin:20rpx 20rpx;">
							<view>
								<view v-if="dataList.length > 0"
									style="border: 1px solid #595959; padding: 10rpx; font-size: 25rpx;border-radius: 12rpx;">
									{{dataList[0]['username']}}
								</view>
								<view v-else
									style="border: 1px solid #595959; padding: 10rpx; font-size: 25rpx;border-radius: 12rpx;">
									未知</view>
							</view>
							<view style="display: flex;align-items: center;">
								<view style="margin:  0 29rpx;">|</view><text style="font-size: 25rpx;color: orange;">
									{{$t('team.text8')}}</text>
								<view style="margin:  0 8rpx;font-size: 25rpx;">{{dataList.length}}</view>
							</view>
						</view>
						<view style="margin-top:30rpx;" v-if="!showModal">
							<view class="my-withdraw-cards">
								<view class="my-ew-banks-wrap">
									<view class="withdraw-bank-card-ew" v-for="(item,index) in dataList" :key="index"
										:style="index > 1? 'margin-top: 20px;' : ''">
										<div class="team-member-root">
											<div class="team-member-item-header">
												<div class="club-label">{{$t('team.text40') }}{{item.level}}</div>
												<div class="am-flexbox am-flexbox-dir-row am-flexbox-justify-between am-flexbox-align-middle"
													style="height: 100%;">
													<div class="item-header-name">
														<div class="ti-name" style="display: flex"><span
																class=" ">{{item.username}}</span><span class="self"
																v-if="userInfo.id == item.id">({{$t('team.text39')}})</span>
															<span class="self" style="font-size: 24rpx; "
																@click="bzClick(item)" v-else><u-icon name="tags-fill"
																	color="#000" size="20"></u-icon></span>
																<span>{{item.desc || ''}}</span>
														</div>
														<div class="ti-blance">
															<span>{{$t('team.text36')}}:
															</span><span style="font-weight: 700;">{{item.money}}</span>
														</div>
													</div>
												</div>
											</div>
											<div class="team-member-item-footer">
												<div class="item-left">
													<div class="item-date">
														<span>{{$t('team.text37')}}:
														</span><span
															style="font-weight: 700;">{{item.prevtime ? item.prevtime : '-'}}</span>
													</div>
													<div class="item-date">
														<span>{{$t('team.text38')}}:
														</span><span style="font-weight: 700;">{{item.jointime}}</span>
													</div>
												</div>
											</div>
										</div>

									</view>

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<global-notify></global-notify>
		<!-- 筛选弹窗 -->
		<!-- <u-calendar :show="rqShow" :min-date="minDate" :max-date="maxDate" :defaultDate=[filters.regStartTime,filters.regEndTime]
			mode="range" @change="handleDateChange" @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar> -->
		<!-- <u-calendar :show="rqShow" :min-date="minDate" :max-date="maxDate" :default-date="currentDefaultDate"
			mode="range" @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar> -->
		<u-calendar :show="rqShow" :min-date="calendar.minDate" :max-date="calendar.maxDate" :default-date="currentDefaultDate"
			mode="range" :monthNum="calendar.monthNum"  :defaultDate="calendar.defaultDate"  @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar>
		
		<u-popup :show="bzshow" @close="close" closeable>
		            <view style="height: 200px;">
						<view style="padding: 30rpx;">
							<view style="font-size: 40rpx;">{{$t('tzsCustomize.title6')}}</view>
							<view style="margin-top: 40rpx;">
								<view style="font-size: 28rpx; display: flex; align-items: center;">
									<u-icon name="account-fill" color="#000" size="20"></u-icon>
									{{username}}
								</view>
								<view style="margin-top: 20rpx;">
									  <u--input
										v-model="bz"
									    placeholder="备注"
									    border="surround"
									    clearable
									  ></u--input>
								</view>
								<view style="margin-top: 30rpx;"><u-button size="small" text="确定" @click="subQz"></u-button></view>
							</view>
						</view>
		            </view>
				</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getChildArr,updateUserDesc
	} from '@/api/jogos.js'

	import CustomTabs from '@/components/custom-tabs.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
			shouldFlexShrink() {
				return !['last_recharge_time', 'first_recharge_time'].includes(this.filters.recharge)
			},
			currentDefaultDate() {
				switch (this.currentDateType) {
					case 'reg':
						return [this.filters.regStartTime, this.filters.regEndTime];
					case 'login':
						return [this.filters.loginStartDate, this.filters.loginEndDate];
					case 'recharge':
						return [this.filters.rechargeStartDate, this.filters.rechargeEndDate];
					default:
						return [];
				}
			},
		},
		data() {
			return {
				rqShow: false,
				calendar: {
				      minDate: '',
				      maxDate: '',
				      defaultDate: '',
				      monthNum: 13,
				    },
				bz: '',
				username:'',
				userData:[],
				bzshow:false,
				mode: 'range',
				currentTab: 0,
				showPassword: false,
				password: '',
				dataList: [],
				monthFirstDay: this.getFirstDayOfMonth(),
				today: this.getToday(),
				minDate: this.getFirstDayOfMonth(), // 默认开始日期
				maxDate: this.getToday(), // 默认结束日期
				currentDateType: '', // 用于记录当前选择的时间类型
				filters: {
					username: '',
					range: 'all',
					type: 'all',
					regStartTime: '', // 默认开始日期,
					regEndTime: '', // 默认结束日期
					login: 'all',
					loginStartDate: '', //上次登录时间
					loginEndDate: '', //上次登录时间结束
					recharge: 'all', //充值
					rechargeStartDate: '', //充值时间 或着首充时间
					rechargeEndDate: '', //充值时间 或着首充时间结束
				},
				rangeData: [{
						id: 0,
						key: 'all',
						name: this.$t('team.text70')
					},
					{
						id: 1,
						key: 'child',
						name: this.$t('team.text64')
					}
				],
				typeData: [{
						id: 0,
						key: 'all',
						name: this.$t('team.text70')
					},
					{
						id: 1,
						key: 'agent',
						name: this.$t('team.text66')
					},
					{
						id: 2,
						key: 'player',
						name: this.$t('team.text67')
					}
				],
				loginData: [{
						id: 0,
						key: 'all',
						name: this.$t('team.text70')
					},
					{
						id: 1,
						key: 'login_log',
						name: this.$t('team.text71')
					},
					{
						id: 3,
						key: 'not_login_log',
						name: this.$t('team.text72')
					},
					{
						id: 4,
						key: 'last_login_time',
						name: this.$t('team.text73')
					}
				],
				rechargeData: [{
						id: 0,
						key: 'all',
						name: this.$t('team.text70')
					},
					{
						id: 1,
						key: 'recharge_log',
						name: this.$t('team.text75')
					},
					{
						id: 3,
						key: 'not_recharge_log',
						name: this.$t('team.text76')
					},
					{
						id: 4,
						key: 'last_recharge_time',
						name: this.$t('team.text77')
					},
					{
						id: 5,
						key: 'first_recharge_time',
						name: this.$t('team.text78')
					}
				],
				
				showModal: false,
				keyboardEnter: true, //键盘监听
				tabs: [{
						label: this.$t('team.text2'),
						icon: '/static/1.png',
						activeIcon: '/static/1.png'
					},
					{
						label: this.$t('team.text3'),
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					},
					{
						label: this.$t('team.text4'),
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					},
					{
						label: this.$t('team.text5'),
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					}
				]

			}

		},
		onLoad() {
			this.grReportListInfo()
			this.chooseTimed()
		},
		mounted() {
			
		},
		beforeDestroy() {},
		onReady() {
			uni.onKeyboardHeightChange(res => {
				if (res.height === 0 && this.keyboardEnter) {
					this.grReportListInfo()
				}
				this.keyboardEnter = false
			})
		},
		
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
			//全部下级搜索
			allSearch() {
				this.showModal = !this.showModal;
			},
			//范围选中
			rangeClick(item) {
				this.filters.range = item.key
			},
			//类型
			typeClick(item) {
				this.filters.type = item.key
			},
			//登录筛选
			loginClick(item) {
				this.filters.login = item.key
			},
			//注册时间
			regTimeClick(type) {
				this.currentDateType = type;
				this.rqShow = true
			},
			//充值
			rechargeClick(item) {
				this.filters.recharge = item.key
			},
			// 确认选择日期
			handleConfirm(e) {
				const [start, end] = e;
				const validEnd = this.validateDateRange(end);
				switch (this.currentDateType) {
					case 'reg':
						this.filters.regStartTime = start;
						this.filters.regEndTime = e.pop();
						break;
					case 'login':
						this.filters.loginStartDate = start;
						this.filters.loginEndDate = e.pop();
						break;
					case 'recharge':
						this.filters.rechargeStartDate = start;
						this.filters.rechargeEndDate = e.pop();
						break;
				}
				this.rqShow = false;
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
			//用户名搜索
			handleSearchEnter() {
				console.log("用户名搜索")
				this.grReportListInfo();
			},
			//清空用户搜索
			clearEnter() {
				console.log("清空")
				this.filters.username = '';
				this.grReportListInfo();
			},
			//重置
			resetClick() {
				console.log("清空")
				this.filters = {
					username: '',
					range: 'all',
					type: 'all',
					regStartTime: '',
					regEndTime: '',
					login: 'all',
					loginStartDate: '',
					loginEndDate: '',
					recharge: 'all',
					rechargeStartDate: '',
					rechargeEndDate: ''
				};
				this.grReportListInfo();
			},
			//确认搜索
			confirmClick() {
				console.log("确认搜索")
				this.showModal = false;
				this.grReportListInfo();
			},
			// 获取数据 -- 数据源
			async grReportListInfo() {
				// 转换日期格式
				const params = {
					...this.filters,
					regStartTime: this.filters.regStartTime || undefined, //注册
					regEndTime: this.filters.regEndTime || undefined, //注册
					loginStartDate: this.filters.loginStartDate || undefined, //登录
					loginEndDate: this.filters.loginEndDate || undefined, //登录
					rechargeStartDate: this.filters.rechargeStartDate || undefined, //充值
					rechargeEndDate: this.filters.rechargeEndDate || undefined //充值
				};

				let {
					data,
					code
				} = await getChildArr(params);
				if (code === 200) {
					this.dataList = data;
				}
			},
			// async grReportListInfo() {
			// 	let {
			// 		data,
			// 		code
			// 	} = await getChildArr();
			// 	if (code == 200) {
			// 		this.dataList = data
			// 		console.log(this.dataList)
			// 	}
			// },
			handleTabChange(index) {
				this.currentTab = index;
			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},

			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			bzClick(item) {
				this.username = item.username || ''
				this.userData = item;
				this.bzshow = true
				console.log(item)
			},
			close(){
				this.bzshow = false
			},
			//提交备注
			async subQz(){
				let _this = this
				const params = {
					user_id: _this.userData.id, 
					desc: _this.bz
				};
				try{
					let {
						data,
						code
					} = await updateUserDesc(params);
					if(code == 200){
						_this.grReportListInfo()
					}
				}finally{
					_this.bz = ''
					_this.bzshow = false
				}
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.flex-shrink1 {
		background-color: #efefef;
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

	.team-member-item-header {
		height: inherit;
		line-height: inherit;
		background-color: #f5f6f7;
		border-top-left-radius: 10.4px;
		border-top-right-radius: 10.4px;
		margin: 10.4px 10.4px 0;
		padding: 13.53px 10.4px;
		position: relative;
		direction: ltr;
	}

	.club-label {
		position: absolute;
		color: #f79a23;
		font-size: 12.48px;
		padding: 5.2px 11.96px;
		background-color: #eef0f1;
		border: 1.56px solid #fff;
		border-top-right-radius: 10.4px;
		border-bottom-left-radius: 10.4px;
		top: 0;
		right: 0;
		max-width: 114.4px;
		word-break: break-all;
	}

	.item-header-icon {
		width: 44.72px;
		text-align: center;
	}

	.user-status {
		width: 10.4px;
		display: inline-block;
		height: 10.4px;
		border-radius: 50%;
		position: absolute;
		left: 5.2px;
		top: 19.24px;
	}

	.mc-icon-member {
		position: relative;
		margin: 0;
		top: 0;
		fill: #000;
		height: 22.88px;
		vertical-align: bottom;
		text-align: center;
	}

	.mc-member-number {
		background-color: rgba(237, 38, 42, .1);
		border-radius: 9.88px;
		font-size: 12.48px;
		padding: 0 6.24px;
		color: #ec2529;
		line-height: 19.76px;
		text-align: center;
		display: inline-block;
		margin-top: 4.16px;
	}

	.item-header-name {
		margin-left: 6.24px;
	}

	.ti-name {
		font-size: 14.56px;
		color: #000;
		line-height: 22.88px;
		height: 22.88px;
		margin-bottom: 6.24px;
	}

	.self {
		padding-left: 2.6px;
	}

	.ti-blance {
		color: #616161;
		font-size: 13.52px;
	}

	.team-member-item-footer {
		padding: 15.08px 15.6px 9.36px 10.4px;
		background-color: #fafafa;
		border-bottom-left-radius: 10.4px;
		border-bottom-right-radius: 10.4px;
		margin: 0 10.4px;
		color: #a8a8a8;
		font-size: 12.48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-date {
		margin: 0 0 9.36px;
	}
</style>