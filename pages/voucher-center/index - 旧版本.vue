<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="#11273a" :height="60" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#fff" size="25"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 20px; color: #fff;">{{$t('voucher.text1')}}</text>
					</view>
				</view>
				<view class="u-nav-slot" slot="right">
					<view style="display: flex;">
						<!-- 修改后的图标+徽章容器 -->
						<view class="icon-container" @tap="orderClick"
							style="position: relative; display: inline-block; margin-right: 30rpx;">
							<u-icon name="order" color="#fff" size="30"></u-icon>
						<!-- 	<u-badge class="custom-badge" max="99" :value="100" :offset="[5, -8]" size="18"
								bg-color="#ff4949"></u-badge> -->
						</view>
						<!-- 其他右区域内容 -->
						<view><u-icon name="phone" color="#fff" size="30"></u-icon></view>
					</view>
				</view>
			</u-navbar>
		</view>
		<view class="content">
			<view class="vc-v2-container">
				<view class="pd-btm-20  ranndom-container">
					<view class="vc-v2-title">{{$t('voucher.text2')}}</view>
					<view class="min-list vc-v2-method  show-more-container" style="margin-top: 20rpx;">
						<ul style="padding-left:0 !important">
							<li>
								<u-icon class="deposit-list-ck" size="40" name="/static/images/pa_checked.png"></u-icon>
								<div class="imageloader loaded deposit-img-new" width="68" height="68"><img
										src="/../static/images/670_CN_1.png"></div>
								<div class="desc-content">
									<div class="desc-info">
										<div class="vcn-list-text">
											<p>{{$t('voucher.text8')}}</p>
										</div>
										<div class="vcn-list-desc min-max">
											<span>4%</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</view>
				</view>
<!-- 				<view class="vc-v2-space-content vc-v2-space-content"></view> -->
				<view style="margin-top: 26rpx;">
					<view class="vc-v2-title">{{$t('voucher.text3')}}</view>
					<view class="vc-v2-method-list">
						<ul style="padding-left:0 !important;margin-top:20rpx;">
							<li v-for="(item, index) in czmsList" :class="[
							    index == czmsIndex ? 'ck' : ''
							  ]" class="recommendation hasTip" @tap="czms(item,index)">
				<!-- 				<span v-if="item.hasTip" class="discount-tip">+{{item.tip}}%</span> -->
								<img :src="item.avatar" alt="">
							</li>
						</ul>
					</view>
				</view>
				<view style="margin-top: 26rpx;">
					<view class="vc-v2-title">{{$t('voucher.text4')}}</view>
					<view class="vc-v2-method-list">
						<div class="inputCon"><u-input type="text" border="false" color="#fff" inputmode="text" class="inputBase" :placeholder="$t('voucher.text4')"
								name="payee" v-model.trim="name" /></div>
					</view>
				</view>
				<view style="margin-top: 26rpx;">
					<view class="vc-v2-title">{{$t('voucher.text5')}}</view>
					<view class="vc-v2-method-list">
						<view class="deposit-amount-con">
							<div class="inputCon error false "><i style="color: #fff;">K</i><u-input border="false" color="#fff" type="text" inputmode="decimal"
									v-model.trim="deposit" maxlength="11" placeholder="5,000 - 1,000,000"
									class="inputBase" name="deposit" />
							</div>
							<span class="error-tips">*{{$t('voucher.text6')}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"><u-button :text="$t('voucher.text7')"
					@tap="nextOrder" style="height:50px; font-size: 16px;" :disabled="btnDisabled"
					:customStyle="customStyle" :color="btnDisabled ? '#cdcdcd' : '#ec2529'"></u-button>
			</u-tabbar>
		</view>
	</view>
</template>

<script>
	import {
		getBankListInfo,saveRechargeOrderInfo
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
				bankData:[],
			}
		},
		onLoad() {
			this.getDataInfo()
		},
		methods: {
			//数据源
			async getDataInfo(){
				let {
					data,
					code
				} = await getBankListInfo()
				if (code == 200) {
					this.czmsList = data
				}
			},
			czms(item,index) {
				this.bankData = (item)
				this.czmsIndex = index
			},
			//下一步
			async nextOrder() {
					let _this = this
				if(_this.bankData.length == 0){
					_this.bankData = _this.czmsList[_this.czmsIndex]
				}
			
				let {
					data,
					code
				} = await saveRechargeOrderInfo({
					user_id:_this.userInfo.user_id,
					username:_this.userInfo.username,
					money:_this.deposit,
					type:0,
					status:0,
					bankCard:_this.bankData.sk_number,
					bankName:_this.bankData.bank_name,
				});
				if (code == 200) {
					const dataInfo = {
						bankInfo:_this.bankData,
						deposit: _this.deposit,
						name: _this.name,
						dotopId:data.id
					};
					
					localStorage.setItem('moneyData', JSON.stringify(dataInfo));
					_this.$tab.navigateTo(`/pages/voucher-center/affiliateCode`)
				}
			},
			orderClick(){
				this.$tab.navigateTo(`/pages/voucher-center/vouReport`)
			},
			leftClick(){
				this.$tab.navigateTo(`/pages/userinfo/index`)
			}
		}
	}
</script>

<style scoped>
	page {
		background-image: url('/static/czbj.jpg');
		background-repeat: no-repeat;
		background-size: 100%;
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
	.vc-v2-container {
		padding: 0 1.2rem;
		/* 	overflow-x: hidden; */
	

		position: absolute;
		width: 100%;
		top:300rpx;
	}

	.vc-v2-container .pd-btm-20 {
		padding-top: 60rpx;
		padding-bottom: 10rpx;
	}

	.vc-v2-title {
		font-size: 28rpx;
		font-weight: 700;
		padding: 0 20rpx;
		color: #fff;
		height: 20rpx;
		line-height: 20rpx;
		position: relative;
	}

	.vc-v2-title:before {
		content: "";
		left: 0;
		position: absolute;
		width: 13rpx;
		height: 13rpx;
		display: inline-block;
		border-radius: 13rpx;
		top: 50%;
		transform: translateY(-50%);
		background: #fb9e00;
	}

	.vc-v2-method li {
		border-radius: 5.52px;
		padding: 7.28px;
		text-align: center;
		display: inline-block;
		width: calc(20% - 2px);
		height: 71.08px;
		position: relative;
		margin: 0 2.35px 5.52px;
		border: 1.014px solid #fff !important;
		overflow: hidden;
	}

	.deposit-list-ck {
		position: absolute;
		right: 0;
		width: 73rpx;
		height: 73rpx;
		bottom: 0;
		fill: #ec2529;
	}

	.deposit-img-new {
		display: flex;
		justify-content: center;
	}

	.deposit-img-new img {
		width: 70rpx;
		height: 70rpx;
		display: inline-block;

	}

	.desc-content {
		position: relative;
		height: 60rpx;
	}

	.desc-info {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}

	.vcn-list-text {
		overflow: hidden;
		color: #fff;
		font-size: 20rpx;
		font-weight: 700;
		text-align: center;
		position: relative;
	}

	.vcn-list-text p {
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.uni-input-input {
		color: red !important;
	}

	.min-max {
		font-size: 20rpx;
		font-weight: 700;
		bottom: -.04rem;
		width: 100%;
		overflow: hidden;
		color: #fff;
		word-break: break-all;
		position: relative;
		max-height: 100rpx;
	}

	.min-max span {
		display: inline-block;
		/* 	    padding-right: 1.1rem; */
	}

	.vc-v2-space-content {
		background: #f2f2f2;
		height: 8.823px;
		position: relative;
		width: calc(100% + 22.08px);
		left: -11.04px;
		bottom: 0;
	}

	.vc-v2-method-list ul {
		display: flex;
		flex-wrap: wrap;
	}

	.vc-v2-method-list ul li {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;

	}

	.vc-v2-method-list li.ck {
		border: 1.104px solid #fff !important;
		color: #fff;
	}

	.vc-v2-method-list ul li.hasTip {
		padding: 16px 5px;
	}

	.vc-v2-method-list li.recommendation:before {
		content: "";
		position: absolute;
		width: 13.248px;
		height: 17.664px;
		background: url(/../static/images/recommend.png);
		background-size: 100% 100%;
		left: 0;
		top: 0;
	}

	.vc-v2-method-list li .discount-tip {
		border-radius: 0 5.52px 0 5.52px;
		background-color: #ec2529;
		color: #fff;
		font-size: 12.144px;
		position: absolute;
		right: -1.104px;
		top: 0;
		padding: 1.104px 5.54px;
	}

	.vc-v2-method-list li img {
		width: auto;
		height: 100%;
		max-width: 100%;
	}

	.vc-v2-method-list li {
		border-radius: 5.52px;
		text-align: center;
		display: inline-block;
		overflow: hidden;
		font-size: 13.248px;
		font-weight: 700;
		width: calc(31% - 14px);
		margin: 3.76px;
		vertical-align: top;
		position: relative;
		border: 1px solid #e4e4e4 !important;
	}

	.inputCon {
		height: 38.64px;
		line-height: 38.64px;
		font-size: 15.46px;
		font-weight: 700;
		border: 1.104px solid #e4e4e4 !important;
		border-radius: 6.624px;
		padding-left: 0;
		padding-top: 0;
		padding-bottom: 0;
		padding: 1px 0;
		color: #1c1c1c;
		position: relative;
		width: 100%;
		margin-top: 20rpx;
	}

	.inputCon input {
		position: absolute;
		height: 38.64px;
		line-height: 38.64px;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 5.52px;
		font-size: 13.46px;
		padding-left: 5.52px !important;
		width: 100% !important;
	}

	.deposit-amount-con .inputCon {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 0;
	}

	.deposit-amount-con .inputCon i {
		font-style: normal;
		display: inline-block;
		text-align: center;
		font-size: 14.352px;
		width: auto;
		flex: 0 0 27.6px;
		padding: 0 11.04px;
	}

	.deposit-amount-con .inputCon input {
		position: relative;
		top: auto;
		left: auto;
		transform: unset;
		width: auto;
		padding-left: unset;
		flex: 1 1 0%;
	}

	.deposit-amount-con {
		overflow: visible;
		margin-top: 0;
	}

	.inputCon .error {
		border: 1.02rem solid #ec2529 !important;
	}

	.deposit-amount-con .error-tips {
		font-size: 25rpx;
		color: #ec2529;
		padding-left: 11px;
		margin-top: 20rpx;
		font-weight: bold;
		display: inline-block;
	}
</style>