<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;">{{$t('voucher.text26')}}</text>
					</view>
				</view>
				<view class="u-nav-slot" slot="right">
					<view style="display: flex;">
						<!-- 修改后的图标+徽章容器 -->
						<view class="icon-container" @tap="ckjyjl"
							style="position: relative; display: inline-block; margin-right: 10rpx;">
							<u-icon name="order" color="#be984c" size="20"></u-icon>
							<!-- 	<u-badge class="custom-badge" max="99" :value="100" :offset="[5, -8]" size="18"
								bg-color="#ff4949"></u-badge> -->
						</view>

					</view>
				</view>
			</u-navbar>
		</view>
		<view class="content" style="margin-top: 150rpx;">
			<div class="voucher-msg-container">
				<div class="pay-pop-container">
					<div class="pay-way-msg-title">{{type == 0 ? $t('voucher.text8') : 'USDT充值'}}</div>
					<div class="pay-way-msg-info">{{$t('voucher.text9')}}</div>
				</div>
				<div class="pay-pop-container">
					<div>
						<div class="" style="padding: 0px;">
							<div class="false voucher-msg-list ">
								<div class="voucher-msg-title">{{$t('voucher.text10')}}</div>
								<div class="false voucher-msg-content">{{userInfo.username}}</div>
								<span class="voucher-msg-copy"
									@click="copyContent(userInfo.username)">{{$t('voucher.text12')}}</span>
							</div>
							<div class="false voucher-msg-list ">
								<div class="voucher-msg-title">{{$t('voucher.text11')}}</div>
								<div class="false voucher-msg-content">{{bankData.bank_name || ''}}</div><span
									class="voucher-msg-copy" id="kh_city"
									@click="copyContent(bankData.bank_name)">{{$t('voucher.text12')}}</span>
							</div>
							<div class="false voucher-msg-list ">
								<div class="voucher-msg-title">{{$t('voucher.text13')}}</div>
								<div class="false voucher-msg-content">{{bankData.sk_account}}</div><span
									class="voucher-msg-copy"
									@click="copyContent(bankData.sk_account)">{{$t('voucher.text12')}}</span>
							</div>
							<!-- 	<div class="false voucher-msg-list ">
								<div class="voucher-msg-title">{{$t('voucher.text13')}}({{$t('voucher.text14')}})</div>
								<div class="false voucher-msg-content">{{bankData.payee_account_name_py}}</div><span
									class="voucher-msg-copy"
									@click="copyContent(bankData.payee_account_name_py)">{{$t('voucher.text12')}}</span>
							</div> -->
							<div class="false voucher-msg-list " v-if="type == 0">
								<div class="voucher-msg-title">{{$t('voucher.text15')}}</div>
								<div class="false voucher-msg-content">{{bankData.sk_number}}</div><span
									class="voucher-msg-copy"
									@click="copyContent(bankData.sk_number)">{{$t('voucher.text12')}}</span>
							</div>
							<div class="false voucher-msg-list " v-if="type == 0">
								<div class="voucher-msg-title">{{$t('voucher.text16')}}</div>
								<div class="false voucher-msg-content">{{bankData.kh_address}}</div><span
									class="voucher-msg-copy"
									@click="copyContent(bankData.kh_address)">{{$t('voucher.text12')}}</span>
							</div>
							<div class="false voucher-msg-list ">
								<div class="voucher-msg-title">{{type == 0 ? $t('voucher.text5') : 'USDT金额'}}</div>
								<div class="false voucher-msg-content">{{deposit}}</div><span class="voucher-msg-copy"
									@click="copyContent(deposit)">{{$t('voucher.text12')}}</span>
							</div>
							<div class="voucher-msg-list order-time-count-down">
								{{$t('voucher.text17')}}
								<div>{{ timeDisplay }}</div>
							</div>
							<div class="">
								<div class="voucher-msg-desc">{{$t('voucher.text18')}}
									<br>{{$t('voucher.text19')}}。
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</view>
		<view class="footer">
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
				<view
					style="padding: 11.04px 0;display: flex;justify-content: space-around; width: 100%;background-color: #ec2529 !important;">
					<view class="voucher-btn" @tap="ckjyjl"><span>{{$t('voucher.text20')}}</span></view>
					<view class="voucher-btn mg20 more-voucher" @tap="wzcz"><span>{{$t('voucher.text21')}}</span></view>
					<div class="voucher-btn" @tap="zcyb"><span>{{$t('voucher.text22')}}</span></div>
				</view>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		expiredOrderInfo,saveRechargeOrderInfo
	} from '@/api/jogos.js'
	export default {
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
			timeDisplay() {
				const remaining = this.totalSeconds;
				const hours = Math.floor(remaining / 3600);
				const minutes = Math.floor((remaining % 3600) / 60);
				const seconds = remaining % 60;
				const formatNumber = (num) => num.toString().padStart(2, '0');
				return `${formatNumber(hours)}${this.$t('voucher.text23')}${formatNumber(minutes)}${this.$t('voucher.text24')}${formatNumber(seconds)}${this.$t('voucher.text25')}`;
			}

		},
		data() {
			return {
				btnDisabled: true,
				totalSeconds: 1800, // 30分钟 = 1800秒
				// 倒计时起始时间戳（单位：毫秒）
				startTime: null,
				// 是否正在计时（用于暂停/恢复）
				isCounting: false,
				timer: null,
				bankData: [],
				deposit: '',
				dotopId: 0,
				type:0
			}
		},
		onLoad() {

		},
		mounted() {
			const savedData = localStorage.getItem('voucherCountdown');
			const moneyData = localStorage.getItem('moneyData');
			if (savedData) {
				const {
					savedTotalSeconds,
					savedStartTime
				} = JSON.parse(savedData);
				this.totalSeconds = savedTotalSeconds;
				this.startTime = savedStartTime;
				this.startTimer();
			} else {
				this.startTimer();
				this.startTime = Date.now();
				this.saveToStorage();
			}
			if (moneyData) {
				const {
					bankInfo,
					deposit,
					name,
					dotopId,
					type
				} = JSON.parse(moneyData);
				this.deposit = deposit
				this.bankData = bankInfo
				this.dotopId = dotopId
				this.type = type
			} else {
				this.startTimer();
				this.zcyb()
			}
		},
		onHide() {
			let _this = this
			console.log("执行了吗")
			clearInterval(_this.timer)
			localStorage.removeItem('voucherCountdown');
		},
		beforeDestroy() {
			let _this = this
			console.log("执行了吗")
			clearInterval(_this.timer)
			localStorage.removeItem('voucherCountdown');
		},
		methods: {
			//复制
			copyContent(event) {
				uni.setClipboardData({
					data: event + '',
					success: () => {
						this.$modal.msg(event + this.$t('voucher.text27'))
					},
					fail: () => {
						this.$modal.msg(this.$t('voucher.text28'))
					}
				});
			},
			startTimer() {
				let _this = this
				_this.timer = setInterval(() => {
					const now = Date.now();
					const elapsed = (now - _this.startTime) / 1000;
					_this.totalSeconds = Math.floor(_this.totalSeconds - elapsed); // 强制取整
					_this.startTime = now; // 更新起始时间，避免误差累积
					_this.saveToStorage();
					if (_this.totalSeconds <= 0) {
						clearInterval(_this.timer);
						console.log('倒计时结束');
						_this.expiredInfo()
					}
				}, 1000);
			},
			async expiredInfo() {
				let _this = this
				let {
					data,
					code
				} = await expiredOrderInfo({
					id: _this.dotopId,
				});
				if (code == 200) {
					this.$refs.uToast.show({
						type: "default",
						message: 'The order has expired, please resubmit',
					})
					this.zcyb()
				}
			},
			saveToStorage() {
				const data = {
					savedTotalSeconds: Math.floor(this.totalSeconds), // 存储整数
					savedStartTime: this.startTime
				};
				localStorage.setItem('voucherCountdown', JSON.stringify(data));
			},
			//再存一笔
			zcyb() {
				this.$tab.navigateTo(`/pages/voucher-center/index`)
			},
			//完成充值
			async wzcz() {
				let _this = this
				try {
					uni.showLoading({
						title: '提交中...'
					});
					let {
						data,
						code
					} = await saveRechargeOrderInfo({
						id:_this.dotopId
					});
					if (code == 200) {
						//存储临时
						uni.setStorageSync('lx_order_id', data.order_id);
						this.$modal.msg("充值成功,请等待审核...")
						this.$tab.navigateTo(`/pages/userinfo/index`)
						// const dataInfo = {
						// 	bankInfo: _this.bankData,
						// 	deposit: _this.deposit,
						// 	name: _this.name,
						// 	dotopId: data.order_id,
						// 	type: _this.czTypeIndex,
						// };
						// this.name = ''
						// this.deposit = ''
						// localStorage.setItem('moneyData', JSON.stringify(dataInfo));
						// _this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
						//_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
					}
				} finally {
					uni.hideLoading();
				}
				
				
				
				//this.$tab.navigateTo(`/pages/voucher-center/index`)
				// this.$modal.msg('Please wait...')
				// setTimeout(() => {
				// 	this.$modal.msg('Please check the review status in your deposit history')
				// }, 2000);
			},
			//查看交易记录
			ckjyjl() {
				this.$tab.navigateTo(`/pages/voucher-center/vouReport`)
			},
			//返回
			leftClick() {
				this.$tab.navigateTo(`/pages/voucher-center/index`)
			},


		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.voucher-btn {
		color: #fff;
		font-size: 14px;
		display: inline-block;
		min-height: 1rem;
		width: calc(33% - 22.08px);
		border-radius: 5.52px;
		border: 1px solid #fff;
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

	.voucher-btn.more-voucher {
		padding: 2.76px;
		background-color: #0095fb;
		border: none;
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

	.pay-pop-container {
		padding: 0 19.32px;
		height: auto !important;
		background: #fff;
	}

	.pay-way-msg-info {
		background: #fff;
		font-size: 18px;
		color: #333;
		text-align: left;
		padding: 0;
		font-weight: 700;
		padding-bottom: 22.08px !important;
	}

	.pay-way-msg-title {
		background: #fff;
		font-size: 18px;
		color: #333;
		text-align: center;
		/* 	    padding: 20px; */
		font-weight: 700;
	}

	.voucher-msg-list {
		position: relative;
		line-height: 1.2;
		margin-bottom: 16.56px;
	}

	.voucher-msg-title {
		font-size: 16.56px;
		color: #666;
		margin-bottom: 3.3px;
	}

	.voucher-msg-content {
		font-size: 14px;
		font-weight: 700;
		color: #666;
		padding-right: 50px;
		word-break: break-all;
	}

	.voucher-msg-copy {
		right: 0;
		top: 50%;
		position: absolute;
		transform: translateY(-50%);
		color: #428dfc;
		background: #f0f2fe;
		border-radius: 5.52px;
		padding: 11.04px;
		line-height: 1.2;
		width: auto;
		min-width: 50px;
		text-align: center;
	}

	.order-time-count-down {
		font-size: 14.353px;
		color: #666;
	}

	.order-time-count-down div {
		font-size: 14.352px;
		color: #f33;
		font-weight: 700;
		margin-top: 3.312px;
	}

	.voucher-msg-container .voucher-msg-desc {
		margin: 8.832px 0;
		color: #f33;
		font-size: 16.56px;
		text-align: left !important;
		position: relative;
		padding: 11.04px 0;
	}

	.voucher-msg-desc:before {
		content: " ";
		position: absolute;
		width: calc(100% + 38.64px);
		height: 8.832px;
		background: #f5f5f9;
		left: -19.32px;
		top: -8.832px;
	}
</style>