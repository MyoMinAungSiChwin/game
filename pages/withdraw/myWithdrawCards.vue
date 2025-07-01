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
							style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('account.text36')}}</text>
					</view>
				</view>
			</u-navbar>
		</view>
		<view class="my-withdraw-cards-wrap">
			<view class="my-withdraw-cards">
				<view class="my-ew-banks-wrap">
					<view class="withdraw-bank-card">
						<view class="cards-title">{{$t('account.text37')}} : {{bankData.length}}</view>
						<view class="cards-list" v-if="usdtData.length > 0">
							<view class="CN card-item" v-for="(item,index) in usdtData">
								<view class="card-content">
									<view class="item-top">
										<!-- <view class="item-icon"><img
												src="https://images.21892848.com/mcs-images/bank/mcs_1684162604022_V3-MCS-CONSOLE-UPLOAD.jpg"
												alt=""></view> -->
										<view class="item-info">
											<view class="bank-name">{{item.usdt_group_name}}-{{item.usdt_type_name}}
											</view>
											<view class="bank-num">{{item.money_address}}</view>
										</view>
									</view>
									<view class="item-bottom">
										<view style="display:flex;gap:40rpx;">
											<view style="display:flex;gap:0rpx;"   v-if="userInfo.is_del == 1" @tap="usdtDelCard(item)"><u-icon
													name="trash-fill"></u-icon>删除</view>
											<view style="display:flex;gap:0rpx;"  v-if="userInfo.is_edit == 1" @tap="usdtEditCard(item)"><u-icon
													name="edit-pen-fill"></u-icon>编辑</view>
										</view>
										<view>
											{{item.addtime}}
										</view>
									</view>
								</view>
							</view>

						</view>
						<view class="no-bank-card" v-else><span>{{$t('account.text39')}}</span></view>
					</view>
				</view>
				<view class="my-ew-banks-wrap">
					<view class="withdraw-bank-card">
						<view class="cards-title">虚拟钱包 : {{xnData.length}}</view>
						<view class="cards-list" v-if="xnData.length > 0">
							<view class="CN card-item" v-for="(item,index) in xnData">
								<view class="card-content">
									<view class="item-top">
										<!-- <view class="item-icon"><img
												src="https://images.21892848.com/mcs-images/bank/mcs_1684162604022_V3-MCS-CONSOLE-UPLOAD.jpg"
												alt=""></view> -->
										<view class="item-info">
											<view class="bank-name">{{item.xn_type_name}}
											</view>
											<view class="bank-num">{{item.xn_address}}</view>
										</view>
									</view>
									<view class="item-bottom">
										<view style="display:flex;gap:40rpx;">
											<view style="display:flex;gap:0rpx;" @tap="xnDelCard(item)"  v-if="userInfo.is_del == 1"><u-icon
													name="trash-fill"></u-icon>删除</view>
											<view style="display:flex;gap:0rpx;" @tap="xnEditCard(item)"  v-if="userInfo.is_edit == 1"><u-icon
													name="edit-pen-fill"></u-icon>编辑</view>
										</view>
										<view>
											{{item.addtime}}
										</view>
									</view>
								</view>
							</view>
				
						</view>
						<view class="no-bank-card" v-else><span>{{$t('account.text39')}}</span></view>
					</view>
				</view>
				<view class="my-banks-wrap">
					<view class="withdraw-bank-card">
						<view class="cards-title">{{$t('account.text38')}} : {{bankData.length}}</view>
						<view class="cards-list" v-if="bankData.length > 0">
							<view class="CN card-item" v-for="(item,index) in bankData">
								<view class="card-content">
									<view class="item-top">
										<!-- <view class="item-icon"><img
												src="https://images.21892848.com/mcs-images/bank/mcs_1684162604022_V3-MCS-CONSOLE-UPLOAD.jpg"
												alt=""></view> -->
										<view class="item-info">
											<view class="bank-name">{{item.bank_type_name}}</view>
											<view class="bank-num">{{item.bank_number_str}}</view>
										</view>
									</view>
									<view class="item-bottom">
										<view style="display:flex;gap:40rpx;">
											<view style="display:flex;gap:0rpx;"  v-if="userInfo.is_del == 1" @tap="delCard(item)"><u-icon
													name="trash-fill"></u-icon>删除</view>
											<view style="display:flex;gap:0rpx;"  v-if="userInfo.is_edit == 1" @tap="editCard(item)"><u-icon
													name="edit-pen-fill"></u-icon>编辑</view>
										</view>
										<view>
											{{item.addtime}}
										</view>
									</view>
								</view>
							</view>

						</view>
						<view class="no-bank-card" v-else><span>{{$t('account.text40')}}</span></view>
					</view>
				</view>
			</view>
			<view class="add-card-btn">
				<view class="svg" @tap="addShow">
					<u-icon name="plus-circle-fill" color="red" size="48"></u-icon>
				</view>
			</view>

		</view>
				<global-notify></global-notify>
		<u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" @cancel="changeHandler"
			:cancelText="$t('account.text42')" :confirmText="$t('account.text41')"></u-picker>
	</view>
</template>
<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		bankConfigInfo
	} from '@/api/userinfo.js'
	import {
		getUserBankList,
		delCardInfo,
		editCardInfo,
		getUserUsdtList,
		getUserXnList,
		delUsdtCard,delXnCard
	} from '@/api/jogos.js'
	import CustomTabs from '@/components/custom-tabs.vue';
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
				show: false,
				bankData: [],
				usdtData: [],
				xnData: [],
				columns: [
					[{
							name: this.$t('account.text43'),
							id: 1,
							// ...
						},
						{
							name: 'KBZPAY',
							id: 2,
						},
						{
							name: '虚拟币',
							id: 3,
						},
					]

				],

			}

		},

		onLoad() {
			this.getUserBankInfo()
			this.getUserUsdtInfo()
			this.getUserXnInfo()
		},
		onShow() {
			this.getUserBankInfo()
			this.getUserUsdtInfo()
			this.getUserXnInfo()
		},
		mounted() {

		},
		beforeDestroy() {},
		methods: {
			async getUserBankInfo() {
				let {
					data,
					code
				} = await getUserBankList()
				if (code == 200) {
					this.bankData = data
				}
			},
			async getUserXnInfo() {
				let {
					data,
					code
				} = await getUserXnList()
				if (code == 200) {
					this.xnData = data
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

			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			addShow() {
				this.show = true
			},
			confirm(e) {
				if (e.value[0]['id'] == 1) {
					const encodedBack = encodeURIComponent('/pages/withdraw/myWithdrawCards')
					this.$tab.navigateTo(`/pages/withdraw/addBankCard?back=` + encodedBack)
				} else if (e.value[0]['id'] == 2) {
					const encodedBack = encodeURIComponent('/pages/withdraw/myWithdrawCards')
					this.$tab.navigateTo(`/pages/withdraw/addBankCardPix?back=` + encodedBack)
				}else {
					const encodedBack = encodeURIComponent('/pages/withdraw/myWithdrawCards')
					this.$tab.navigateTo(`/pages/withdraw/addXnCard?back=` + encodedBack)
				}

				this.show = false
			},
			changeHandler() {
				this.show = false
			},
			//删除
			async delCard(item) {
				try {
					const res = await uni.showModal({
						title: '提示',
						content: '你确定要删除吗',
					});
					if (res[1].cancel) {
						this.$modal.msg('您已取消删除');
						return;
					}
					const {
						data,
						code
					} = await delCardInfo({
						id: item.id
					});
					if (code === 200) {
						this.$modal.msg('删除成功');
						await this.getUserBankInfo();
					}
				} catch (error) {
					console.error('删除银行卡失败:', error);
					this.$modal.msg('删除失败，请重试');
				}
			},
			//删除
			async usdtDelCard(item) {
				try {
					const res = await uni.showModal({
						title: '提示',
						content: '你确定要删除吗',
					});
					if (res[1].cancel) {
						this.$modal.msg('您已取消删除');
						return;
					}
					const {
						data,
						code
					} = await delUsdtCard({
						id: item.id
					});
					if (code === 200) {
						this.$modal.msg('删除成功');
						await this.getUserBankInfo();
						await this.getUserUsdtInfo()
					}
				} catch (error) {
					console.error('删除银行卡失败:', error);
					this.$modal.msg('删除失败，请重试');
				}
			},
			//删除
			async xnDelCard(item) {
				try {
					const res = await uni.showModal({
						title: '提示',
						content: '你确定要删除吗',
					});
					if (res[1].cancel) {
						this.$modal.msg('您已取消删除');
						return;
					}
					const {
						data,
						code
					} = await delXnCard({
						id: item.id
					});
					if (code === 200) {
						this.$modal.msg('删除成功');
						await this.getUserBankInfo();
						await this.getUserUsdtInfo()
						await this.getUserXnInfo()
					}
				} catch (error) {
					console.error('删除银行卡失败:', error);
					this.$modal.msg('删除失败，请重试');
				}
			},
			//编辑
			editCard(item) {
				this.$tab.navigateTo(`/pages/withdraw/editBankCard?id=` + item.id)
			},
			usdtEditCard(item) {
				this.$tab.navigateTo(`/pages/withdraw/editBankCardPix?id=` + item.id)
			},
			xnEditCard(item) {
				this.$tab.navigateTo(`/pages/withdraw/editXnCard?id=` + item.id)
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.custom-badge {
		position: absolute !important;
		/* 强制覆盖默认定位 */
		top: -5px !important;
		/* 根据需求调整 */
		right: -15px !important;
		/* 根据需求调整 */
	}

	.account-form {
		margin-top: 70px;
		padding: 0 5% 57px;
	}

	.my-withdraw-cards-wrap {
		height: calc(100vh - 57.3333px);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: #fff;
	}

	.my-withdraw-cards-wrap .my-withdraw-cards {
		flex: 1 1 0%;
		overflow: auto;
		padding-bottom: 5.73333px;
	}

	.my-withdraw-cards-wrap .my-withdraw-cards .my-ew-banks-wrap {
		height: auto;
		margin: 0 11.4667px;
	}

	.my-banks-wrap {
		height: auto;
		margin: 0 11.4667px;
	}

	.withdraw-bank-card {
		flex: 1 1 0%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.withdraw-bank-card-ew {
		flex: 1 1 0%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.cards-title {
		font-size: 16.0533px;
		color: #333;
		padding: 13.76px 0 13.76px 11.4667px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.cards-title {
		font-size: 16.0533px;
		color: #333;
		padding: 13.76px 0 13.76px 11.4667px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.cards-title:before {
		position: absolute;
		content: "";
		width: 5.73333px;
		height: 5.73333px;
		border-radius: 50%;
		background-color: #fdac40;
		left: 0;
	}

	.no-bank-card {
		width: 407.067px;
		height: 92.88px;
		line-height: normal;
		display: flex;
		align-items: center;
		background: url(https://www.may9.tv/mobile/mc/withdraw-card-default.61270f85.png) no-repeat 50% / cover;
		padding: 0 11.4667px;
		border-radius: 9.17333px;
		margin: 0 0 11.4667px;
		box-shadow: 0 2.86667px 8.6px 0 rgba(0, 0, 0, .12);
		text-align: left;
	}

	.no-bank-card span {
		bottom: auto;
		position: relative;
		padding-left: 49.3067px;
		display: flex;
		align-items: center;
		font-size: 14.9067px;
		color: #333;
	}

	.no-bank-card span:before {
		position: absolute;
		content: "";
		left: 0;
		width: 40.1333px;
		height: 40.1333px;
		border-radius: 50%;
	}

	.my-withdraw-cards-wrap .my-withdraw-cards .my-ew-banks-wrap .no-bank-card span:before {
		background: #fff url(https://www.may9.tv/mobile/mc/ebank-icon.211e86d0.png) no-repeat 50% / 31.5333px 31.5333px;
	}

	.my-withdraw-cards-wrap .my-withdraw-cards .my-banks-wrap .no-bank-card span:before {
		background: #fff url(https://www.may9.tv/mobile/mc/ebank-icon.211e86d0.png) no-repeat 50% / 31.5333px 31.5333px;
	}

	.my-withdraw-cards-wrap .add-card-btn {
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.my-withdraw-cards-wrap .add-card-btn .svg {
		width: 81.4133px;
		height: 81.4133px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.withdraw-bank-card .cards-list {
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column
	}

	.withdraw-bank-card .cards-list .card-item {

		height: 250rpx;
		display: flex;
		gap: 10.4px;
		padding: 10.4px;
		border-radius: 8.32px;
		margin-bottom: 10.4px;
		box-shadow: 0 2.6px 7.8px 0 rgba(0, 0, 0, .12)
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+1) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+2) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+3) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+4) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+5) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+6) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item:nth-child(7n+7) {
		background: url(https://pg2.ssy996.com/withdraw-card-bg.png) no-repeat 50%/cover
	}

	.withdraw-bank-card .cards-list .card-item .card-content {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		gap: 4.16px;
	}

	.withdraw-bank-card .cards-list .card-item .item-top {
		flex: 1 1 0%;
		display: flex;
		align-items: center;
		gap: 8.32px;
	}

	.withdraw-bank-card .cards-list .card-item .item-top .item-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 86.32px;
		height: 41.6px;
		border-radius: 6.24px;
		overflow: hidden
	}

	.withdraw-bank-card .cards-list .card-item .item-top .item-icon img {
		width: 100%
	}

	.withdraw-bank-card .cards-list .card-item .item-top .item-info {
		flex: 1 1 0%;
		display: flex;
		flex-direction: column;
		gap: 4.16px;
		font-size: 24rpx;
		margin-top: 20rpx;
	}

	.withdraw-bank-card .cards-list .card-item .item-top .item-info .bank-name {
		color: #333;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* 		overflow: hidden; */
		line-height: 1.5;
		word-break: break-word;
	}

	.withdraw-bank-card .cards-list .card-item .item-bottom {
		color: #999;
		font-size: 11.44px;
		text-align: right;
		flex: 1 1 0%;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
</style>