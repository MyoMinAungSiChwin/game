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
							style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('account.text55')}}</text>
					</view>
				</view>
				<view class="u-nav-slot" slot="right">
					<view style="display: flex;" @tap="ckjyjl">
						<!-- 修改后的图标+徽章容器 -->
						<view class="icon-container"
							style="position: relative; display: inline-block; margin-right: 10rpx;">
							<u-icon name="order" color="#be984c" size="20"></u-icon>
							<!-- 	<u-badge class="custom-badge" max="99" :value="100" :offset="[5, -8]" size="18"
								bg-color="#ff4949"></u-badge> -->
						</view>

					</view>
				</view>
			</u-navbar>
		</view>
		<view>
			<!-- 自定义tabs组件 -->
			<custom-tabs :tabsList="tabs" @change="handleTabChange" :initialTab="currentTab"
				:key="'tabs-'+currentTab" />
			<!-- 内容区域 -->
			<view class="content">
				<view v-show="currentTab === 0">
					<view style="margin:40rpx 2rpx;">
						<view class="cards-title" style="margin-left: 40rpx;">
							{{$t('account.text56')}}({{bankData.length}}/5)
						</view>
						<view class="am-wingblank am-wingblank-lg">
							<swiper v-if="bankData.length > 0" style="height: 360rpx;" :indicator-dots="false"
								:autoplay="false" :circular="true" :current="currentIndex" @change="onSwiperChange"
								:interval="5000">
								<swiper-item v-for="(item,index) in bankData" :key="index">
									<view style="border-radius: 20rpx;
							            padding: 20rpx;
							            color: #fff;
							            background-image: -webkit-linear-gradient(-3deg, #c47ff4, #eb498e);
							            width: calc(100% - 50rpx);  <!-- 补偿间隔 -->
							            height: 100% !important;
							            transform: translateX(30rpx); <!-- 位置修正 -->
							            box-sizing: border-box;">
										<!-- 内容保持不变 -->
										<view style="height:52rpx; margin: 6rpx 0 16rpx; font-size:30rpx;">
											<span>{{item.bank_type_name || ''}}</span>
										</view>
										<view style="padding:14rpx 20rpx;display: flex;font-size: 30rpx;">{{$t('account.text33')}}</view>
										<view style="font-size: 40rpx;font-weight: 700;text-align: center;">
											​{{item.bank_number_str || '---'}}
										</view>
										<view
											style="padding:14rpx 20rpx;display: flex; font-size: 30rpx;justify-content: space-between; align-items: end;">
											<view><span class="card-name">{{userInfo.payeename || item.name}}</span>
											</view>
											<view style="display: flex; flex-direction: column;">
												<span>{{$t('account.text75')}}</span><span>{{item.addtime}}</span>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
							<view v-else class="withdraw-nbank"><span>{{$t('account.text40')}}</span>
							</view>
						</view>
					</view>
					<view class="withdraw-bkdbtn">
						<view class="withdraw-bkadd" @tap="addBankCard(1)"><u-icon class="am-icon-md" name="plus"
								color="#fff" size="20"></u-icon></view>
					</view>

					<view class="withdraw-bkinfo">
						<view>{{$t('account.text58')}}：
							24{{$t('account.text59')}}<br>{{$t('account.text60')}}：24{{$t('account.text61')}}
							<view>
								<view class="wysiwyg"></view>
							</view>
						</view>
						<view style="margin-top:22rpx;">
							{{$t('account.text62')}}{{txConfig.day_withdraw || 0}}({{$t('account.text64')}})，{{$t('account.text63')}}{{ txConfig.tx_num || 0 }}({{$t('account.text64')}})<br>
						</view>
						<view class="dark-gray">{{$t('account.text65')}}:MMK {{userInfo.money || ''}}</view>
						<view class="dark-gray">{{$t('account.text66')}}:MMK 0.00</view>
						<view class="wallet_return">
							<view><span>{{$t('account.text67')}}</span></view>
						</view>
					</view>
					<view class="amount-wrap" v-if="userInfo.current_mosaic == 0">

						<view class="amount-title">{{$t('account.text68')}}</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text69')}}</span>
							<input type="text" inputmode="decimal" autocomplete="new-password"
								:placeholder="$t('account.text68') + ' 5000-' + txConfig.withdraw_limt || 0" v-model="txmoeny" />
						</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text70')}}</span>
							<u-input :type="showPassword ? 'text' : 'password'" :password="!showPassword"
								:placeholder="$t('account.text70')" v-model="password"
								style="border: none !important;" />
							<image class="eye-icon"
								:src="showPassword ? '/static/images/eye_open.png' : '/static/images/eyeclose.png'"
								@tap="togglePassword" />
						</view>
					</view>
					<view style="width: 100%; font-size: 26rpx; padding: 0 20rpx; margin-top: 50rpx;" v-else>
						<view style="display: flex;justify-content: center;">{{$t('voucher.text65')}}</view>
						<view style="color:red; font-weight: bold; margin-top: 20rpx;">{{$t('voucher.text66')}}
						</view>
						<view style="margin-top: 20rpx;">
							<!-- 标题行 -->
							<view
								style="display: flex; justify-content: space-between; align-items: center; background-color: #e6e6e6; padding:20rpx 0;border-radius:10rpx;">
								<view style="flex: 1; text-align: center;">{{$t('voucher.text67')}}</view>

								<view style="flex: 1; text-align: center;">{{$t('voucher.text68')}}</view>
							</view>

							<!-- 内容行 -->
							<view style="display: flex; justify-content: space-between; padding: 30rpx 0;">
								<view style="flex: 1; text-align: center;">{{$t('team.text2')}}</view>

								<view style="flex: 1; text-align: center; color: red;">{{userInfo.current_mosaic}}
								</view>
							</view>
							<view @click="backHome"
								style="display: flex; justify-content: center; align-items: center; margin:40rpx 0; padding: 30rpx 0;background-color: red;color: #fff; border-radius: 20rpx;">
								{{$t('voucher.text69')}}
							</view>
						</view>
					</view>
				</view>
				<view v-show="currentTab === 1">
					<view style="margin:40rpx 2rpx;">
						<view class="cards-title" style="margin-left: 40rpx;">
							{{$t('account.text57')}}({{usdtData.length}}/1)
						</view>

						<view class="am-wingblank am-wingblank-lg">
							<swiper v-if="usdtData.length > 0" style="height: 360rpx;" :indicator-dots="false"
								:autoplay="false" :circular="true" :current="currentIndex" @change="onSwiperChange"
								:interval="5000">
								<swiper-item v-for="(item,index) in usdtData" :key="index">
									<view style="border-radius: 20rpx;
							            padding: 20rpx;
							            color: #fff;
							            background-image: -webkit-linear-gradient(-3deg, #c47ff4, #eb498e);
							            width: calc(100% - 50rpx);  <!-- 补偿间隔 -->
							            height: 100% !important;
							            transform: translateX(30rpx); <!-- 位置修正 -->
							            box-sizing: border-box;">
										<!-- 内容保持不变 -->
										<view
											style="display: flex; justify-content:space-between;align-items: center; height:52rpx; margin: 6rpx 0 16rpx; font-size:30rpx;">
											<!-- 	<view>{{item.usdt_group_name || ''}}</view> -->
											<view>{{item.usdt_type_name || ''}}</view>
										</view>
										<view style="padding:14rpx 20rpx;display: flex;font-size: 30rpx;">{{$t('account.text33')}}</view>
										<view style="font-size: 40rpx;font-weight: 700;text-align: center;">
											​{{item.money_address || '---'}}
										</view>
										<view
											style="padding:14rpx 20rpx;display: flex; font-size: 30rpx;justify-content: space-between; align-items: end;">
											<view><span class="card-name">{{userInfo.payeename || item.username}}</span>
											</view>
											<view style="display: flex; flex-direction: column;">
												<span>{{$t('account.text75')}}</span><span>{{item.addtime}}</span>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
							<view v-else class="withdraw-nbank"><span>{{$t('account.text39')}}</span>
							</view>

						</view>
					</view>
					<view class="withdraw-bkdbtn">
						<view class="withdraw-bkadd" @tap="addBankCard(2)"><u-icon class="am-icon-md" name="plus"
								color="#fff" size="20"></u-icon></view>
					</view>
					<view class="withdraw-bkinfo">
						<view>{{$t('account.text58')}}：
							24{{$t('account.text59')}}<br>{{$t('account.text60')}}：24{{$t('account.text61')}}
							<view>
								<view class="wysiwyg"></view>
							</view>
						</view>
						<view style="margin-top:22rpx;">
							{{$t('account.text62')}}{{txConfig.day_withdraw || 0}}({{$t('account.text64')}})，{{$t('account.text63')}}{{ txConfig.tx_num || 0 }}({{$t('account.text64')}})<br>
						</view>
						<view class="dark-gray">{{$t('account.text65')}}:MMK {{userInfo.money || ''}}</view>
						<view class="dark-gray">{{$t('account.text66')}}:MMK 0.00</view>
						<view class="wallet_return">
							<view><span>{{$t('account.text67')}}</span></view>
						</view>
					</view>
					<view class="amount-wrap" v-if="userInfo.current_mosaic == 0">
						<view class="amount-title">{{$t('account.text68')}}</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text69')}}</span>
							<input type="text" inputmode="decimal" autocomplete="new-password"
								:placeholder="$t('account.text68') +' 5000-' + txConfig.withdraw_limt" v-model="txmoeny" />
						</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text70')}}</span>
							<u-input :type="showPassword ? 'text' : 'password'" :password="!showPassword"
								:placeholder="$t('account.text70')" v-model="password"
								style="border: none !important;" />
							<image class="eye-icon"
								:src="showPassword ? '/static/images/eye_open.png' : '/static/images/eyeclose.png'"
								@tap="togglePassword" />
						</view>
					</view>
					<view style="width: 100%; font-size: 26rpx; padding: 0 20rpx; margin-top: 50rpx;" v-else>
						<view style="display: flex;justify-content: center;">{{$t('voucher.text65')}}</view>
						<view style="color:red; font-weight: bold; margin-top: 20rpx;">{{$t('voucher.text66')}}
						</view>
						<view style="margin-top: 20rpx;">
							<!-- 标题行 -->
							<view
								style="display: flex; justify-content: space-between; align-items: center; background-color: #e6e6e6; padding:20rpx 0;border-radius:10rpx;">
								<view style="flex: 1; text-align: center;">{{$t('voucher.text67')}}</view>

								<view style="flex: 1; text-align: center;">{{$t('voucher.text68')}}</view>
							</view>

							<!-- 内容行 -->
							<view style="display: flex; justify-content: space-between; padding: 30rpx 0;">
								<view style="flex: 1; text-align: center;">{{$t('team.text2')}}</view>

								<view style="flex: 1; text-align: center; color: red;">{{userInfo.current_mosaic}}
								</view>
							</view>
							<view @click="backHome"
								style="display: flex; justify-content: center; align-items: center; margin-top: 40rpx; padding: 30rpx 0;background-color: red;color: #fff; border-radius: 20rpx;">
								{{$t('voucher.text69')}}
							</view>
						</view>
					</view>
				</view>
				<view v-show="currentTab === 2">
					<view style="margin:40rpx 2rpx;">
						<view class="cards-title" style="margin-left: 40rpx;">
							{{$t('account.text56')}}({{xnData.length}}/5)
						</view>
						<view class="am-wingblank am-wingblank-lg">
							<swiper v-if="xnData.length > 0" style="height: 360rpx;" :indicator-dots="false"
								:autoplay="false" :circular="true" :current="currentIndex" @change="onSwiperChange"
								:interval="5000">
								<swiper-item v-for="(item,index) in xnData" :key="index">
									<view style="border-radius: 20rpx;
							            padding: 20rpx;
							            color: #fff;
							            background-image: -webkit-linear-gradient(-3deg, #c47ff4, #eb498e);
							            width: calc(100% - 50rpx);
							            height: 100% !important;
							            transform: translateX(30rpx);
							            box-sizing: border-box;">
										<!-- 内容保持不变 -->
										<view style="height:52rpx; margin: 6rpx 0 16rpx; font-size:30rpx;">
											<span>{{item.xn_type_name || ''}}</span>
										</view>
										<view style="padding:14rpx 20rpx;display: flex;font-size: 30rpx;">{{$t('account.text33')}}</view>
										<view style="font-size: 40rpx;font-weight: 700;text-align: center;">
											​{{item.xn_address || '---'}}
										</view>
										<view
											style="padding:14rpx 20rpx;display: flex; font-size: 30rpx;justify-content: space-between; align-items: end;">
											<view><span class="card-name">{{userInfo.payeename || item.username}}</span>
											</view>
											<view style="display: flex; flex-direction: column;">
												<span>{{$t('account.text75')}}</span><span>{{item.addtime}}</span>
											</view>
										</view>
									</view>
								</swiper-item>
							</swiper>
							<view v-else class="withdraw-nbank"><span>{{$t('account.text40')}}</span>
							</view>
						</view>
					</view>
					<view class="withdraw-bkdbtn">
						<view class="withdraw-bkadd" @tap="addBankCard(3)"><u-icon class="am-icon-md" name="plus"
								color="#fff" size="20"></u-icon></view>
					</view>

					<view class="withdraw-bkinfo">
						<view>{{$t('account.text58')}}：
							24{{$t('account.text59')}}<br>{{$t('account.text60')}}：24{{$t('account.text61')}}
							<view>
								<view class="wysiwyg"></view>
							</view>
						</view>
						<view style="margin-top:22rpx;">
							{{$t('account.text62')}}{{txConfig.day_withdraw || 0}}({{$t('account.text64')}})，{{$t('account.text63')}}{{ txConfig.tx_num || 0 }}({{$t('account.text64')}})<br>
						</view>
						<view class="dark-gray">{{$t('account.text65')}}:MMK {{userInfo.money || ''}}</view>
						<view class="dark-gray">{{$t('account.text66')}}:MMK 0.00</view>
						<view class="wallet_return">
							<view><span>{{$t('account.text67')}}</span></view>
						</view>
					</view>
					<view class="amount-wrap" v-if="userInfo.current_mosaic == 0">
						<view class="amount-title">{{$t('account.text68')}}</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text69')}}</span>
							<input type="text" inputmode="decimal" autocomplete="new-password"
								:placeholder="$t('account.text68') +' 10-2000'" v-model="txmoeny" />
						</view>
						<view class="w-input-content">
							<span class="placeholder">{{$t('account.text70')}}</span>
							<u-input :type="showPassword ? 'text' : 'password'" :password="!showPassword"
								:placeholder="$t('account.text70')" v-model="password"
								style="border: none !important;" />
							<image class="eye-icon"
								:src="showPassword ? '/static/images/eye_open.png' : '/static/images/eyeclose.png'"
								@tap="togglePassword" />
						</view>
					</view>
					<view style="width: 100%; font-size: 26rpx; padding: 0 20rpx; margin-top: 50rpx;" v-else>
						<view style="display: flex;justify-content: center;">{{$t('voucher.text65')}}</view>
						<view style="color:red; font-weight: bold; margin-top: 20rpx;">{{$t('voucher.text66')}}
						</view>
						<view style="margin-top: 20rpx;">
							<!-- 标题行 -->
							<view
								style="display: flex; justify-content: space-between; align-items: center; background-color: #e6e6e6; padding:20rpx 0;border-radius:10rpx;">
								<view style="flex: 1; text-align: center;">{{$t('voucher.text67')}}</view>

								<view style="flex: 1; text-align: center;">{{$t('voucher.text68')}}</view>
							</view>

							<!-- 内容行 -->
							<view style="display: flex; justify-content: space-between; padding: 30rpx 0;">
								<view style="flex: 1; text-align: center;">{{$t('team.text2')}}</view>

								<view style="flex: 1; text-align: center; color: red;">{{userInfo.current_mosaic}}
								</view>
							</view>
							<view @click="backHome"
								style="display: flex; justify-content: center; align-items: center; margin-top: 40rpx; padding: 30rpx 0;background-color: red;color: #fff; border-radius: 20rpx;">
								{{$t('voucher.text69')}}
							</view>
						</view>
					</view>
				</view>


			</view>
		</view>

		<view class="footer" v-if="userInfo.current_mosaic == 0">
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
				v-if="Object.keys(txConfig).length > 0">
				<!-- <view @tap="btnDisabled ? '' : submitSave"
					style="padding: 11.04px 0;display: flex;justify-content: space-around; width: 100%;" :style="btnDisabled ? 'background-color: #d8d8d8;' : 'background-color: #2462c5;'">
					<view class="voucher-btn"><span>{{$t('account.text49')}}{{btnDisabled}}</span></view>

				</view> -->
				<button :class="btnDisabled ? 'confirm_btnDisabled' : 'confirm-btn'" :disabled="btnDisabled"
					@click="handleSubmit">{{ btnDisabled ? '提交' : $t('account.text49') }}</button>
				<!-- 	<button :class="btnDisabled ? 'confirm_btnDisabled' : 'confirm-btn'" :disabled="btnDisabled"
						@click="nextOrder">确认充值</button> -->
				<!-- <view @tap="handleSubmit" class="submit-btn" :class="{ disabled: btnDisabled }" :style="{
				    padding: '11.04px 0',
				    display: 'flex',
				    justifyContent: 'space-around',
				    width: '100%'
				  }">
					<view class="voucher-btn">
						<span></span>
					</view>
				</view> -->
			</u-tabbar>
		</view>
		<global-notify></global-notify>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import _ from 'lodash'
	import {
		bankConfigInfo
	} from '@/api/userinfo.js'
	import {
		getUserBankList,
		getUserUsdtList,
		getUserXnList,
		userTx,
		getXnType,
		txConfigList
	} from '@/api/jogos.js'
	import CustomTabs from '@/components/custom-tabs.vue';
	export default {
		components: {
			CustomTabs,
			...mapGetters(['showOrderSuccessTip','tipMessage']),
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),

			// 计算提款限额安全值（处理异步未完成情况）
			withdrawLimit() {
				return this.txConfig?.withdraw_limt || 0
			},

			btnDisabled() {
				// ------------------------- 新增代码 -------------------------
				// 主动关联 currentTab 建立响应依赖
				const tabDependency = this.currentTab
				// ----------------------------------------------------------

				// 金额标准处理（保留两位小数并清除格式）
				const normalizedAmount = Number(
					String(this.txmoeny || '')
					.replace(/,/g, '')
					.replace(/\s/g, '')
					.replace(/^\.+/g, '')
					.replace(/(\.\d*?)\./g, '$1') || 0
				).toFixed(2)
				console.log(normalizedAmount)
				// 金额有效性（添加选项卡类型判断）
				const isAmountValid = () => {
					if (isNaN(normalizedAmount)) return false
					const minAmount = this.currentTab === 0 ? 1 : 1 // 根据实际业务调整
				
						if(this.currentTab == 2){
							return normalizedAmount >= minAmount &&
								parseFloat(normalizedAmount) <= parseFloat(this.withdrawLimit)
						}else{
							return normalizedAmount >= 5000 &&
								parseFloat(normalizedAmount) <= 5000000
						}
				
				}

				// 密码有效性（独立为方法复用）
				const isPasswordValid = (pwd) => {
					const pwdStr = String(pwd || '').trim()
					return pwdStr.length >= 6 && pwdStr.length <= 20
				}
				// 打印调试信息（生产环境需移除）
				console.log('[Debug] 提现参数状态:', {
					tab: this.currentTab,
					amount: normalizedAmount,
					valid_pwd: isPasswordValid(this.password),
					valid_amount: isAmountValid()
				})

				return !(isPasswordValid(this.password) && isAmountValid()) || this.isSubmitting;
			}
		},
		data() {
			return {
				bankData: [],
				currentTab: 0,
				currentIndex: 0, // 当前显示项的索引
				selectCurrentData: [],
				showPassword: false,
				password: '', //提现密码
				txmoeny: '', //提现金额
				tabs: [{
						label: this.$t('account.text43'),
						icon: '/static/1.png',
						activeIcon: '/static/1.png'
					},
					{
						label: this.$t('voucher.text51'),
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					},
					{
						label: this.$t('voucher.text52'),
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					}
				],
				txConfig: [],
				usdtData: [],
				xnData: [],
				zx: 0,
				zd: 0,
				usdtTypeData: [],
				isSubmitting: false // 新增提交状态标识
			}
		},
		onShow() {
			this.getUserBankInfo()
			this.getUserUsdtInfo()
			this.getUserXnListInfo()
			this.txConfigListInfo()
			this.getBankTypeInfo()
		},

		onLoad(option) {
			let _this = this
			if (Object.keys(option).length > 0) {
				// 将 URL 参数转为数字类型
				const tabValue = Number(option.currentTab);
				if ([0, 1, 2].includes(tabValue)) {
					this.currentTab = tabValue;
				}
			}

		},

		mounted() {

		},
		beforeDestroy() {},
		methods: {
			async getBankTypeInfo() {
				let {
					data,
					code
				} = await getXnType()
				if (code == 200) {
					this.usdtTypeData = data
				}
			},
			backHome() {
				this.$tab.switchTab('/pages/jogos/index')
			},
			// 添加点击防抖
			handleSubmit: _.debounce(function() {
				if (this.btnDisabled) return
				this.submitSave()
			}, 300),
			onSwiperChange(e) {
				const current = e.detail.current; // 获取当前索引
				this.currentIndex = current
				console.log("=====================")

			},
			async getUserBankInfo() {
				let {
					data,
					code
				} = await getUserBankList()
				if (code == 200) {
					this.bankData = data
				}

			},
			async getUserUsdtInfo() {
				let {
					data,
					code
				} = await getUserUsdtList()
				if (code == 200) {
					this.usdtData = data
				}

			},
			async getUserXnListInfo() {
				let {
					data,
					code
				} = await getUserXnList()
				if (code == 200) {
					this.xnData = data
				}

			},

			async txConfigListInfo() {
				let {
					data,
					code
				} = await txConfigList()
				if (code == 200) {
					this.txConfig = data
				}
			},
			handleTabChange(index) {

				this.currentTab = index;
				// 重置相关表单数据（强制触发响应更新）
				this.$nextTick(() => {
					this.txmoeny = ''
					this.password = ''
					this.$forceUpdate() // 如果使用非响应式UI库需添加
				})
			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},
			addBankCard(item) {
				if (item == 1) {
					this.$tab.navigateTo(`/pages/withdraw/addBankCard`)
				} else if (item == 2) {
					this.$tab.navigateTo(`/pages/withdraw/addBankCardPix`)
				} else {
					this.$tab.navigateTo(`/pages/withdraw/addXnCard`)
				}

			},
			async submitSave() {
				let _this = this
				if (_this.isSubmitting) return;
				try {
					_this.isSubmitting = true; // 开始提交
					if (uni.$u.test.isEmpty(this.txmoeny)) {
						this.$modal.msg('提现金额不能为空')
						return
					}
					if (uni.$u.test.isEmpty(this.password)) {
						this.$modal.msg('请填写资源密码')
						return
					}
					if (!uni.$u.test.rangeLength(this.password, [6, 10])) {
						this.$modal.msg('资源密码长度必须大于6小于10')
						return
					}

					if (!uni.$u.test.digits(this.txmoeny)) {
						this.$modal.msg('提现金额只能是数字')
						return
					}
					// 在业务逻辑中使用
					const userMoney = this.parseCurrency(this.userInfo.money);
					const txMoney = this.parseCurrency(this.txmoeny);
					//上线额度
					const limtMoney = this.parseCurrency(this.txConfig.withdraw_limt)
					//单笔限额
					const singleWithdraw = this.parseCurrency(this.txConfig.single_withdraw)

					if (this.userInfo.current_mosaic > 0) {
						this.$modal.msg('存在打码任务，无法提现');
						return;
					}

					if (userMoney < txMoney) {
						this.$modal.msg('余额不足');
						return;
					}
					if (singleWithdraw !== 0 && txMoney > singleWithdraw) {
						this.$modal.msg('超出单笔提现限额,无法提现');
						return;
					}

					if (this.txConfig.tx_num <= 0) {
						this.$modal.msg('今日提现次数达到上限,无法提现');
						return;
					}

					if (this.txConfig.withdraw_limt <= 0) {
						this.$modal.msg('今日提现次数达到上限,无法提现');
						return;
					}
					if (limtMoney !== 0 && txMoney > limtMoney) {
						this.$modal.msg('超出每日提现限额,无法提现');
						return;
					}
					if (txMoney < this.txConfig.zd_money) {
						this.$modal.msg('提现金额小于最低提现金额，无法提现');
						return;
					}
					const params = {
						username: _this.userInfo.username,
						withdraw: _this.txConfig.withdraw,
						money: _this.txmoeny,
						password: _this.password
					};
					if (this.currentTab === 0) {
						if (_this.bankData.length == 0) {
							this.$modal.msg('请添加银行卡');
							return;
						}
						Object.assign(params, {
							bank_id: _this.bankData[_this.currentIndex].id,
							bankName: _this.bankData[_this.currentIndex].bank_type_name,
							bankCard: _this.bankData[_this.currentIndex].bank_number,
							type: 1,
						});
					} else if (this.currentTab === 1) {
						Object.assign(params, {
							bank_id: _this.usdtData[_this.currentIndex].id,
							bankName: _this.usdtData[_this.currentIndex].usdt_type_name,
							bankCard: _this.usdtData[_this.currentIndex].money_address,
							type: 3,
						});
					} else {
						Object.assign(params, {
							bank_id: _this.xnData[_this.currentIndex].id,
							bankName: _this.xnData[_this.currentIndex].xn_type_name,
							bankCard: _this.xnData[_this.currentIndex].xn_address,
							type: 4,
						});
					}
					let {
						data,
						code
					} = await userTx(params)
					if (code == 200) {
						_this.txmoeny = ''
						_this.password = ''
						_this.$modal.msg('已提交')
					}
				} finally {
					setTimeout(() => {
						this.isSubmitting = false;
					}, 3000)
				}
			},
			parseCurrency(value) {
				if (typeof value === 'string') {
					// 移除逗号和货币符号（如￥$）
					const num = parseFloat(value.replace(/[^\d.]/g, ''));
					return isNaN(num) ? 0 : num;
				}
				return value || 0;
			},
			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			//查看交易记录
			ckjyjl() {
				this.$tab.navigateTo(`/pages/voucher-center/vouReport`)
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.confirm-btn {
		background: #2462c5;
		color: #fff;
		border-radius: 0rpx;
		width: 100%;
		/* 	margin-top: 60rpx;
				margin-bottom: 30rpx; */

	}

	.confirm_btnDisabled {
		background: #999;
		color: #fff;
		border-radius: 0rpx;
		width: 100%;
		/* margin-top: 60rpx;
				margin-bottom: 30rpx; */
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
		font-size: 36rpx;
		padding: 0 20rpx 20rpx 0;
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
		/* width: 51rpx;
		height: 51rpx; */
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
		margin-bottom: 40rpx;
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

	.submit-btn {
		background-color: #2462c5;
		transition: background-color 0.3s ease;
	}

	.submit-btn.disabled {
		background-color: #d8d8d8;
		cursor: not-allowed;
	}
</style>