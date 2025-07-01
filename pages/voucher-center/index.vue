<template>
	<view class="container">
		<!-- 顶部背景图 -->
		<image src="/static/images/cz/top-bg.png" mode="widthFix" class="header-image" />

		<!-- 新增顶部导航栏 -->
		<view class="header-nav">
			<view class="nav-left" @tap="navigateBack">
				<u-icon class="back-icon" name="arrow-left" color="#be984c" size="18"></u-icon>
				<!-- <image class="back-icon" src="/static/images/cz/back-icon.png" /> -->
			</view>
			<view class="nav-right" @tap="goToRechargeRecords">
				<!-- 			<text class="record-text">充值记录</text> -->
				<image class="record-icon" src="/static/images/cz/record-icon.png" />
			</view>
		</view>
		<view class="main-content">
			<!-- 主体内容 -->
			<view class="content">
				<view style="margin-bottom:30rpx;">
					<u-tabs :list="list1" lineColor="#ecd09e" @click="czClick" :activeStyle="{ color: '#ecd09e' }"
						:inactiveStyle="{color: '#fff'}" :scrollable="false"></u-tabs>
				</view>
				<!-- 支付方式 -->
				<view class="payment-section">
					<!-- 左侧固定宽度区块 -->
					<!-- 	<view class="payment-group left-group">
						<view class="group-title">
							<image class="group-title-icon" src="/static/images/cz/yh.png" />
							转账充值
						</view>

					</view> -->

					<!-- 右侧滚动区块 -->
					<view class="payment-group right-group">
					<!-- 	<view style="display: flex; gap:20px">
							<view class="group-title">
								<image class="group-title-icon" src="/static/images/cz/yh.png" />
								{{czTypeIndex == 0 ?  $t('voucher.text57') : $t('voucher.text50')}}
							</view>
							<view class="group-title">
								<image class="group-title-icon" src="/static/images/cz/zz.png" />
								{{czTypeIndex == 0 ?  $t('voucher.text58') : $t('voucher.text58')}}
							</view>
						</view> -->
						<scroll-view class="crypto-scroll" scroll-x :show-scrollbar="false">
							<view class="crypto-methods scroll-content">
								<view class="method-card crypto-card" :class="czmsIndex == index ? 'active' : ''"
									v-for="(item, index) in czmsList" :key="index" @tap="czms(item,index)">
									<!-- 新增标签元素 -->
									<view class="bonus-tag">
										<text class="bonus-text">+{{ Math.floor(item.percentage) || 0 }}%</text>
									</view>
									<image class="method-icon" :src="item.avatar" />
									<text class="method-name">{{item.bank_name}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>

				<!-- 输入区域 -->
				<view class="input-group">

					<view class="input-wrapper">
						<input :placeholder="$t('voucher.text59')" class="custom-input" v-model="name"
							placeholder-style="color: #999;" />
					</view>
					<view class="input-wrapper">
						<input :placeholder="'K ' + $t('voucher.text60')" type="number" v-model="deposit" class="custom-input"
							placeholder-style="color: #999;" />
					</view>
					<view class="amount-limit">
					{{$t('voucher.text61')}}： K{{bankData.min_cz}}, {{$t('voucher.text62')}}：K{{bankData.max_cz}}
					</view>
					<view style="margin-top: 20rpx;" class="amount-limit" v-if="bankData.hl && bankData.hl_je">
						{{$t('voucher.text63')}}：{{bankData.hl}}:{{bankData.hl_je}}
					</view>
				</view>
				<!-- 确认按钮 -->
				<button :class="btnDisabled ? 'confirm_btnDisabled' : 'confirm-btn'" :disabled="btnDisabled"
					@click="nextOrder">{{$t('voucher.text64')}}</button>
			</view>
		</view>
		<global-notify></global-notify>
		<!-- 底部品牌 -->
		<view class="brand-footer">
			<img src="/static/images/cz/brand-footer.png" />
		</view>
	</view>
</template>

<script>
	import {
		getBankListInfo,
		saveRechargeOrderInfo,
		saveRechargeOrderLinShi
	} from '@/api/jogos.js'
	import {
		bankConfigInfo
	} from '@/api/userinfo.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo','showOrderSuccessTip','tipMessage']),
			btnDisabled() {
				// 验证步骤
				const hasName = this.name.trim() !== '';

				// 获取当前选中的充值方式的最小和最大金额
				const minAmount = Number(this.czmsList[this.czmsIndex]?.min_cz) || 0;
				const maxAmount = Number(this.czmsList[this.czmsIndex]?.max_cz) || Infinity;

				// 1. 去除逗号并转换为数字
				const cleanAmount = this.deposit.replace(/,/g, '');
				const numAmount = Number(cleanAmount);

				// 2. 验证金额有效性
				const validAmount = !isNaN(numAmount) &&
					numAmount >= minAmount &&
					numAmount <= maxAmount;

				// 3. 当所有条件满足时才启用按钮
				// 增加提交状态判断
				return !(hasName && validAmount) || this.isSubmitting;
			}
		},
		data() {
			return {
				list1: [{
					name: this.$t('voucher.text57'),
				}, {
					name: this.$t('voucher.text50'),
				}],
				czmsIndex: 0, //充值模式索引
				deposit: '',
				name: '',
				czmsList: [],
				bankData: [],
				money: '',
				username: '',
				configData: [],
				czTypeIndex: 0,
				networkStatus: {
					isOnline: true,
					lastErrorType: null // 记录最后错误类型
				},
				isSubmitting: false // 新增提交状态标识
			}
		},
		onLoad() {
			this.initNetworkListener()
			this.getDataInfo(),
				this.bankConfigInfoList()
		},
		methods: {
			hasChinese(str) {
				return /[\u2E80-\u2EFF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(str);
			},
			initNetworkListener() {
				// 浏览器原生检测
				this.networkStatus.isOnline = navigator.onLine

				// 添加事件监听
				window.addEventListener('online', () => {
					this.networkStatus.isOnline = true
					this.$modal.msg("网络已恢复")
				})

				window.addEventListener('offline', () => {
					this.networkStatus.isOnline = false
					this.$modal.msg("网络连接已断开")
				})
			},
			//充值点击
			czClick(e) {
				this.czTypeIndex = e.index
				this.deposit = ''
				this.name = ''
				this.czmsList = []
				this.getDataInfo()
			},
			//数据源
			async getDataInfo() {
				let {
					data,
					code
				} = await getBankListInfo({
					type: this.czTypeIndex
				})
				if (code == 200) {
					this.czmsList = data
					this.bankData = this.czmsList[this.czmsIndex]
				}
			},
			async bankConfigInfoList() {
				let {
					data,
					code
				} = await bankConfigInfo()
				if (code == 200) {
					this.configData = data
				}
			},
			czms(item, index) {
				this.bankData = (item)
				this.czmsIndex = index
			},
			//下一步
			async nextOrder() {
				let _this = this
				// 防止重复提交
				if (_this.isSubmitting) return;


				try {
					 _this.isSubmitting = true; // 开始提交
					if (_this.bankData.length == 0) {
						_this.bankData = _this.czmsList[_this.czmsIndex]
					}


					// 前置网络检查
					if (!this.networkStatus.isOnline) {
						this.$modal.msg("当前网络不可用，请检查连接")
						return
					}
					if (_this.name == '') {
						this.$modal.msg("汇款姓名不能为空")
						return
					}
					if (_this.hasChinese(_this.name)) {
						_this.$modal.msg('汇款姓名不能包含中文')
						return
					}
					if (_this.deposit == '') {
						this.$modal.msg("请输入充值金额")
						return
					}
					uni.showLoading({
						title: '提交中...'
					});
					let {
						data,
						code
					} = await saveRechargeOrderLinShi({
						user_id: _this.userInfo.user_id,
						username: _this.name,
						money: _this.deposit,
						type: _this.czTypeIndex,
						status: 0,
						bankid: _this.bankData.id,
						bankCard: _this.czTypeIndex == 0 ? _this.bankData.sk_number : _this.bankData.sk_account,
						bankName: _this.bankData.bank_name,
					});
					if (code == 200) {

						this.$modal.msg("充值成功,请等待审核...")
						const dataInfo = {
							bankInfo: _this.bankData,
							deposit: _this.deposit,
							name: _this.name,
							dotopId: data.order_id,
							type: _this.czTypeIndex,
						};
						this.name = ''
						this.deposit = ''
						localStorage.setItem('moneyData', JSON.stringify(dataInfo));
						_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
						//_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
					}
				} finally {
					uni.hideLoading();
					setTimeout(()=>{
						this.isSubmitting = false;
					},3000)
				}

			},
			goToRechargeRecords() {
				this.$tab.navigateTo(`/pages/voucher-center/vouReport`)
			},
			navigateBack() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #120f20;
		min-height: 100vh;
		color: #fff;

		.header-image {
			width: 100%;
			height: 300rpx;
		}

		.header-nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 3;
			background-color: rgba(18, 15, 32, 0.65); // 调整透明度为85%
			backdrop-filter: blur(10rpx); // 添加毛玻璃效果
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 50rpx;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2); // 添加底部阴影

			.nav-left {
				.back-icon {
					width: 14rpx;
					height: 25rpx;
					filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.3));
				}
			}

			.nav-right {
				.record-icon {
					width: 130rpx;
					height: 34rpx;
					filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.3));
				}

				.record-text {
					color: #fff;
					font-size: 32rpx;
					text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
					font-weight: 500;
					position: relative;

					&::after {
						content: '';
						position: absolute;
						bottom: -8rpx;
						left: 0;
						right: 0;
						height: 2rpx;
						background: linear-gradient(90deg,
								rgba(255, 255, 255, 0) 0%,
								rgba(255, 255, 255, 0.8) 50%,
								rgba(255, 255, 255, 0) 100%);
					}
				}
			}
		}

		.main-content {
			// 整体内容区域弧度
			border-top-left-radius: 80rpx;
			border-top-right-radius: 80rpx;
			overflow: hidden;
			margin: 0rpx 0rpx 0; // 上移覆盖背景图
			position: relative;
			z-index: 2;
			// background: #1a1a1a;
			// top: -10rpx;
			box-shadow: 0 -13rpx 1rpx rgba(87, 52, 22, 1); // 顶部金色辉光
		}

		.method-card {
			position: relative;
			/* 添加相对定位 */
		}

		.bonus-tag {
			position: absolute;
			top: 0rpx;
			right: 0rpx;
			background: #FF4444;
			border-radius: 8rpx;
			padding: 4rpx 6rpx;
			// transform: rotate(10deg); /* 轻微旋转效果 */
			box-shadow: 0 2rpx 8rpx rgba(255, 68, 68, 0.3);
			z-index: 2;
		}

		.bonus-text {
			color: #FFFFFF;
			font-size: 20rpx;
			font-weight: bold;
			line-height: 1.2;
			text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
		}

		/* 激活状态下的标签样式 */

		.content {
			padding: 10rpx 40rpx;
			background-color: #120f20;

			.recharge-type {
				display: flex;
				margin-bottom: 40rpx;
				background: #2a2a2a;
				border-radius: 12rpx;

				.type-item {
					flex: 1;
					text-align: center;
					padding: 20rpx;
					font-size: 32rpx;
					transition: all 0.3s;

					&.active {
						background: #3a3a3a;
						color: #ffd700;
					}
				}
			}

			/* 支付容器 */
			.payment-section {
				display: flex;
				padding: 20rpx 0;
				gap: 40rpx;
				/* 区块间距 */
			}

			/* 公共区块样式 */
			.payment-group {
				// background: #fff;
				border-radius: 16rpx;
				// padding: 20rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

				.group-title {
					font-size: 25rpx;
					color: #fff;
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;

					&-icon {
						width: 36rpx;
						height: 36rpx;
						margin-right: 12rpx;
					}
				}
			}

			/* 左侧固定区块 */
			.left-group {
				flex: 0 0 180rpx;

				/* 固定宽度 */
				.crypto-methods {
					min-height: 110rpx;
					/* 保持与右侧等高 */
				}


			}

			/* 右侧滚动区块 */
			.right-group {
				flex: 1;
				overflow: hidden;
				/* 隐藏滚动容器溢出 */

				.crypto-scroll {
					width: 100%;
					white-space: nowrap;
					/* 关键：禁止换行 */

					.scroll-content {
						display: inline-flex;
						/* 行内弹性布局 */
						gap: 30rpx;
					}
				}
			}

			/* 卡片公共样式 */
			.method-card {
				padding: 20rpx;
				border: 1rpx solid #fff;
				border-radius: 12rpx;
				text-align: center;
				height: 100rpx;
				width: 205rpx;
				align-items: center;
				display: inline-flex;
				justify-content: center;

				&.active {
					border-color: #007AFF;
				}

				.method-icon {
					width: 50rpx;
					height: 50rpx;
					display: block;
					margin: 0 auto 0rpx;
				}

				.method-name {
					font-size: 26rpx;
					color: #fff;
				}
			}

			/* 左侧特殊样式 */
			.left-group .method-card {
				width: 100%;
				/* 充满容器 */
			}

			/* 右侧滚动卡片 */
			.right-group .method-card {
				display: inline-flex;
				/* 行内排列 */
				// flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 10rpx;
			}

			.input-group {
				// position: relative;
				display: flex;
				flex-direction: column;
				justify-content: center;
				background-image: url('/static/images/cz/input_bj.png');
				background-size: 100% 100%;
				padding: 40rpx;
				margin-bottom: 30rpx;
				height: 450rpx;

				.input-wrapper {
					position: relative;
					margin-bottom: 40rpx;

					.custom-input {
						background: rgba(18, 15, 32, 100);
						border-radius: 12rpx;
						padding: 28rpx 28rpx 28rpx 28rpx;
						color: #fff;
						font-size: 30rpx;
						border: 1rpx solid #3a3a3a;
						height: 100rpx;
					}
				}
			}

			.confirm-btn {
				background: #2462c5;
				color: #fff;
				border-radius: 20rpx;
				margin-top: 60rpx;
				margin-bottom: 30rpx;
			}

			.confirm_btnDisabled {
				background: #999;
				color: #fff;
				border-radius: 20rpx;
				margin-top: 60rpx;
				margin-bottom: 30rpx;
			}
		}

		.brand-footer {
			text-align: center;
			padding: 40rpx;

			img {
				background-repeat: no-repeat;
				background-size: 100%;
				height: 50rpx;
			}
		}
	}

	.active {
		border: 1px solid #ecd09e !important;
	}
</style>