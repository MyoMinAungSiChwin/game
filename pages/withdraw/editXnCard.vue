<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">添加虚拟币钱包</text>
					</view>
				</view>
			</u-navbar>
		</view>
		<view class="flex-container account-form bank-card-container">
			<view class="inputCon" style="margin-bottom:17.2px" @tap="bankTypeClick">
				<view class="inputSelect">

					<u-input type="text" class="pwd" placeholder="选择虚拟币类型"
						style="pointer-events: none;transition: 0.15s linear;width: 100%;" :readonly="readonly"
						name="withdraw" v-model="bankTypeName">
						<template slot="prefix">
							<u-icon name="coupon-fill" color="#999" size="48rpx"></u-icon>
						</template>
					</u-input>
				</view>
				<view class="inputIcon icon-down">
					<u-icon class="svg" name="arrow-down" color="#be984c" size="20"></u-icon>
				</view>
			</view>
			<view class="account-form-group" style="margin-bottom:17.2px !important;">
				<view class="mc-account-list">
					<!-- <u-icon name="photo" color="#2979ff" class="txt-svg" size="28"></u-icon>
					<input type="text" class="input-base" placeholder="刘*****" name="payee"  v-model="userInfo.username"
						style="transition: 0.15s linear;" disabled="" /> -->
					<u-input type="text" class="pwd" :placeholder="'* ' + $t('account.text46')" disabled name="withdraw"
						style="transition: 0.15s linear;width: 100%;" v-model="userInfo.username">
						<template slot="prefix">
							<u-icon name="account-fill" color="#999" size="48rpx"></u-icon>
						</template>
					</u-input>
				</view>
				<view class="error "></view>
			</view>
			<view class="account-form-group">
				<view class="mc-account-list">
					<u-input type="text" class="pwd" placeholder="钱包地址" name="withdraw"
						style="transition: 0.15s linear;width: 100%;" v-model="xn_address">
						<template slot="prefix">
							<u-icon name="file-text-fill" color="#999" size="48rpx"></u-icon>
						</template>
					</u-input>
					<!-- 	<u-icon name="photo" color="#2979ff" class="txt-svg" size="28"></u-icon><input class="input-base "
						:placeholder="'* ' + $t('account.text46')" name="bankCard" style="transition: 0.15s linear;" v-model="bank_number" />
					<view class="error "></view> -->
				</view>
			</view>
			<view class="account-form-group" style="margin-bottom: 17.2px !important;" v-if="userInfo.is_xn_pwd == 0">
				<view class="tip">{{$t('account.text50')}}</view>
				<view class="mc-account-list">
					<u-input :type="isOpen?'text':'password'" class="pwd" :placeholder="'* ' + $t('account.text47')"
						name="withdraw" style="transition: 0.15s linear;width: 100%;" v-model="password">
						<template slot="prefix">
							<u-icon name="lock-fill" color="#999" size="48rpx"></u-icon>
						</template>
						<template slot="suffix">
							<u-icon @tap="isOpen=!isOpen" name="eye-fill" color="#999" size="48rpx"></u-icon>
						</template></u-input>
					<!-- <view class="eye-group" id="payment">
						<u-icon name="photo" color="#2979ff" class="am-icon-md" size="28"  @tap="isOpen=!isOpen"></u-icon>
					</view> -->

				</view>
				<view class="error "></view>
			</view>
			<view class="account-form-group" v-if="userInfo.is_xn_pwd == 0">
				<u-input :type="qrisOpen?'text':'password'" class="pwd" :placeholder="'* ' + '确认资金密码'" name="withdraw"
					style="transition: 0.15s linear;width: 100%;" v-model="qrpassword">
					<template slot="prefix">
						<u-icon name="lock-fill" color="#999" size="48rpx"></u-icon>
					</template>
					<template slot="suffix">
						<u-icon @tap="qrisOpen=!qrisOpen" name="eye-fill" color="#999" size="48rpx"></u-icon>
					</template></u-input>
				<view class="error"></view>
			</view>
			<span class="am-button" style="margin-top: 50rpx;background-color: #2462c5; color: #fff;"
				@tap="submitClick">{{$t('account.text49')}}</span>
		</view>
		<u-action-sheet :actions="bankType" :show="show" title="选择虚拟币类型" @close="actionClose"
			@select="actionSelect"></u-action-sheet>

		<global-notify></global-notify>
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
		getXnType,
		addUserXnData,
		editXnCard,
		detailXnCard
	} from '@/api/jogos.js'
	import CustomTabs from '@/components/custom-tabs.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				isOpen: false,
				qrisOpen: false,
				readonly: true,
				hasBackParam: '',
				bankType: [],
				show: false,
				bankTypeName: '',
				bank_type_id: 0,
				xn_address: '',
				qrpassword: '',
				password: '',
				user_xn_id: 0,
				xnData: []
			}
		},

		onLoad(option) {
			this.user_xn_id = option.id
			this.getBankTypeInfo()
			this.getDetailXnInfo()
			console.log(this.userInfo.is_tx_password)
		},
		mounted() {},
		beforeDestroy() {},
		methods: {
			async getDetailXnInfo() {
				let {
					data,
					code
				} = await detailXnCard({
					id: this.user_xn_id
				})
				if (code == 200) {
					this.xnData = data
					this.xn_address = data.xn_address
					this.bankTypeName = data.xn_type_name
					this.bank_type_id = data.xn_type_id
				}
			},
			//确认提交
			async submitClick() {
				if (uni.$u.test.isEmpty(this.bank_type_id)) {
					this.$modal.msg('请选择虚拟币类型')
					return
				}
				if (uni.$u.test.isEmpty(this.xn_address)) {
					this.$modal.msg('请填写虚拟地址')
					return
				}
				if (this.userInfo.is_xn_pwd == 0) {
					if (uni.$u.test.isEmpty(this.password)) {
						this.$modal.msg('请填写资金密码')
						return
					}
					if (!uni.$u.test.rangeLength(this.password, [6, 10])) {
						this.$modal.msg('资金密码长度必须大于6小于10')
						return
					}
					if (uni.$u.test.isEmpty(this.qrpassword)) {
						this.$modal.msg('确认资金密码不能为空')
						return
					}
					if (!uni.$u.test.rangeLength(this.qrpassword, [6, 10])) {
						this.$modal.msg('确认资金密码长度必须大于6小于10')
						return
					}
					if (this.password !== this.qrpassword) {
						this.$modal.msg('确认资金密码填写不一致')
						return
					}
				}


				let {
					data,
					code
				} = await editXnCard({
					id: this.user_xn_id,
					xn_type_id: this.bank_type_id,
					xn_address: this.xn_address,
					username: this.userInfo.username,
					type: 1,
					xn_type_name: this.bankTypeName
				})
				if (code == 200) {
					this.bank_type_id = 0
					this.bankTypeName = ''
					this.xn_address = ''
					this.$modal.msg('添加成功')
					this.$tab.navigateTo(`/pages/withdraw/index?currentTab=2`)
				}
			},
			bankTypeClick() {
				this.show = true
			},
			actionClose() {
				this.show = false
			},
			actionSelect(e) {
				this.bankTypeName = e.name
				this.bank_type_id = e.id
				this.actionClose()
			},
			async getBankTypeInfo() {
				let {
					data,
					code
				} = await getXnType()
				if (code == 200) {
					this.bankType = data
				}
			},
			leftClick() {
				if (this.$route.query.back === undefined || this.$route.query.back === 'undefined') {
					this.$tab.navigateTo(`/pages/withdraw/index`)
				} else {
					this.$tab.navigateTo(decodeURIComponent(this.$route.query.back))
				}

			}
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

	.bank-card-container {
		text-align: left;
		padding-bottom: 57px !important;
	}

	.flex-container {
		min-height: 114px;
		overflow: hidden;
	}

	.inputCon {
		width: 100%;
		height: 61px;
		line-height: 61px;
		font-size: 18px;
		padding: 1px 0;
		color: #1c1c1c;
		position: relative;
	}

	.inputSelect {
		display: inline-block;
		vertical-align: top;
		height: 60px;
		line-height: 60px;
		width: 90%;
		border: none;
	}

	.account-form .inputSelect .inputBase {
		padding-left: 57px;
	}

	.inputBase {
		background: #efefef;
		color: #747474;
		display: block;
		height: 100%;
		width: 100%;
		border: none;
		padding-right: 14px;
		border-radius: 8px;
	}

	.inputIcon {
		display: inline-block;
		height: 60px;
		width: 14%;
		background: #3b79f3 !important;
		text-align: center;
		position: absolute;
		right: 0;
		top: 1px;
		border-radius: 0 8px 8px 0;
		z-index: 9;
	}

	.icon-down .svg {
		position: absolute;
		top: 17px;
		left: 50%;
		transform: translateX(-50%);
	}

	.account-form .account-form-group {
		position: relative;
		margin-bottom: 5.73333px !important;
	}

	.account-form .mc-account-list {
		overflow: hidden;
		position: relative;
	}

	.account-form input {
		padding-left: 55.04px;
		padding-right: 14.3333px;
		height: 60.2px;
		background-color: #efefef;
		outline: none;
		color: #333;
		border: 1.72px solid transparent;
		border-radius: 8.6px;
		vertical-align: middle;
		transition: 0.15s linear;
		position: relative;
	}


	.pwd {
		width: 80%;
		padding-left: 55.04px;
		padding-right: 14.3333px;
		height: 60.2px;
		background-color: #efefef;
		outline: none;
		color: #333;
		border: 1.72px solid transparent;
		border-radius: 8.6px;
		vertical-align: middle;
		transition: 0.15s linear;
		position: relative;
	}


	.account-form .txt-svg {
		position: absolute;
		top: 30.1px;
		left: 27.52px;
		transform: translate(-50%, -50%);
		color: #a5a5a5;
		z-index: 9;
	}

	.tip {
		text-align: left;
		color: red;
		font-size: 17.2px;
		font-weight: 700;
		padding: 2.86667px 0;
	}

	.account-form .eye-group {
		position: absolute;
		right: 28.6667px;
		top: 0;
		bottom: 0;
		margin: auto 0;
		width: 25.2267px;
		height: 25.2267px;
	}

	.am-icon-md {
		width: 25.2267px;
		height: 25.2267px;
	}

	.btn-gray {
		border-radius: 5.73333px !important;
		background: #d8d8d8 !important;
		transition: all .3s linear;
	}

	.am-button {
		display: block;
		outline: 0 none;
		-webkit-appearance: none;
		box-sizing: border-box;
		padding: 0;
		text-align: center;
		font-size: 20.64px;
		height: 53.8933px;
		line-height: 53.8933px;
		border-radius: 5.73333px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		white-space: nowrap;
		color: #000;
		background-color: #fff;
		border: 1px solid #ddd;
	}
</style>