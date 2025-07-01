<template>
	<view class="container">
		<!-- 顶部背景图 -->
		<image src="/static/images/cz/top-bg.png" mode="widthFix" class="header-image" />

		<!-- 新增顶部导航栏 -->
		<view class="header-nav">
			<view class="nav-left" @tap="navigateBack">
				<image class="back-icon" src="/static/images/cz/back-icon.png" />
			</view>
			<view class="nav-right" @tap="goToRechargeRecords">
				<!-- 			<text class="record-text">充值记录</text> -->
				<image class="record-icon" src="/static/images/cz/record-icon.png" />
			</view>
		</view>
		<view class="main-content">
			<!-- 主体内容 -->
			<view class="content">
				<!-- 支付方式 -->
				<view class="payment-section">
					<!-- 左侧固定宽度区块 -->
					<view class="payment-group left-group">
						<view class="group-title">
							<image class="group-title-icon" src="/static/images/cz/yh.png" />
							转账充值
						</view>
						<view class="crypto-methods">
							<view class="method-card crypto-card">
								<!-- 	<image class="method-icon" src="/static/images/cz/bank-icon.png" /> -->
								<text class="method-name">银行转账</text>
							</view>
						</view>
					</view>

					<!-- 右侧滚动区块 -->
					<view class="payment-group right-group">
						<view class="group-title">
							<image class="group-title-icon" src="/static/images/cz/zz.png" />
							加密货币充值
						</view>
						<scroll-view class="crypto-scroll" scroll-x :show-scrollbar="false">
							<view class="crypto-methods scroll-content">
								<view class="method-card crypto-card" :class="czmsIndex == index ? 'active' : ''"
									v-for="(item, index) in czmsList" :key="index" @tap="czms(item,index)">
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
						<input placeholder="请输入汇款姓名" class="custom-input" v-model="name"
							placeholder-style="color: #999;" />
					</view>
					<view class="input-wrapper">
						<input placeholder="K 请输入充值金额" type="number" v-model="deposit" class="custom-input"
							placeholder-style="color: #999;" />
					</view>
					<view class="amount-limit">
						单笔最低充值金额：K5.000，单笔最高充值金额：K1,000,0000
					</view>
				</view>

				<!-- 确认按钮 -->
				<button :class="btnDisabled ? 'confirm_btnDisabled' : 'confirm-btn'" :disabled="btnDisabled"
					@tap="nextOrder">确认充值</button>
			</view>
		</view>
		<!-- 底部品牌 -->
		<view class="brand-footer">
			<img src="/static/images/cz/brand-footer.png" />
		</view>
	</view>
</template>

<script>
	import {
		getBankListInfo,
		saveRechargeOrderInfo
	} from '@/api/jogos.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
			btnDisabled() {
				// 验证步骤
				const hasName = this.name.trim() !== ''

				// 1. 去除逗号并转换为数字
				const cleanAmount = this.deposit.replace(/,/g, '')
				const numAmount = Number(cleanAmount)

				// 2. 验证金额有效性
				const validAmount = !isNaN(numAmount) &&
					numAmount >= 5000 &&
					numAmount <= 1000000

				// 3. 当所有条件满足时才启用按钮
				return !(hasName && validAmount)
			}
		},
		data() {
			return {
				czmsIndex: 0, //充值模式索引
				deposit: '',
				name: '',
				czmsList: [],
				bankData: [],
				money: '',
				username: '',
			}
		},
		onLoad() {
			this.getDataInfo()
		},
		methods: {
			//数据源
			async getDataInfo() {
				let {
					data,
					code
				} = await getBankListInfo()
				if (code == 200) {
					this.czmsList = data
				}
			},
			czms(item, index) {
				this.bankData = (item)
				this.czmsIndex = index
			},
			//下一步
			async nextOrder() {
				let _this = this
				if (_this.bankData.length == 0) {
					_this.bankData = _this.czmsList[_this.czmsIndex]
				}
				if (_this.name == '') {
					this.$modal.msg("汇款姓名不能为空")
					return
				}
				if (_this.deposit == '') {
					this.$modal.msg("请输入充值金额")
					return
				}
				let {
					data,
					code
				} = await saveRechargeOrderInfo({
					user_id: _this.userInfo.user_id,
					username: _this.name,
					money: _this.deposit,
					type: 0,
					status: 0,
					bankCard: _this.bankData.sk_number,
					bankName: _this.bankData.bank_name,
				});
				if (code == 200) {
					this.$modal.msg("充值成功,请等待审核...")
					
					const dataInfo = {
						bankInfo: _this.bankData,
						deposit: _this.deposit,
						name: _this.name,
						dotopId: data.id
					};
					this.name = ''
					this.deposit = ''
					localStorage.setItem('moneyData', JSON.stringify(dataInfo));
					_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
					//_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
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
				padding: 20rpx;
				gap: 20rpx;
				/* 区块间距 */
			}

			/* 公共区块样式 */
			.payment-group {
				// background: #fff;
				border-radius: 16rpx;
				// padding: 20rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);

				.group-title {
					font-size: 28rpx;
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
					min-height: 130rpx;
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
						gap: 20rpx;
					}
				}
			}

			/* 卡片公共样式 */
			.method-card {
				padding: 20rpx;
				border: 2rpx solid #4d4c4c;
				border-radius: 12rpx;
				text-align: center;
				height: 120rpx;
				align-items: center;
				display: inline-flex;
				justify-content: center;

				&.active {
					border-color: #007AFF;
				}

				.method-icon {
					width: 60rpx;
					height: 60rpx;
					display: block;
					margin: 0 auto 10rpx;
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
		border: 1px solid #999 !important;
	}
</style>