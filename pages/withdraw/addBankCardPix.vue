<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size:35rpx; color: #be984c;font-weight: bold;">{{$t('account.text51')}}</text>
					</view>
				</view>
			</u-navbar>
		</view>
		<view class="flex-container account-form bank-card-container">
			<view class="ewallet-group-wrapper">
				<!-- 	<view class="banks-wrapper">
					<view class="bank-title">{{$t('account.text52')}}</view>
					<view class="bank-list-wrap">
						<view class="bank-list"> 
							<view class="bank-item has-icon" :class="usdt_group_index == index ? 'bank-active' : ''" @tap="groupClick(item,index)" v-for="(item,index) in groupData" :key="index">
								<view class="bank-icon">{{item.name || ''}}</view>
							</view>
							
						</view>
						
					</view>
				</view> -->
				<view class="banks-wrapper">
					<view class="bank-title">{{$t('account.text53')}}</view>
					<view class="bank-list-wrap">
						<view class="bank-list">

							<view class="bank-item " :class="usdt_type_index == index ? 'bank-active' : ''"
								@tap="typeClick(item,index)" v-for="(item,index) in typeData" :key="index">
								<view class=" bank-icon"></view>
								<view class="bank-text">{{item.name || ''}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="account-form-group" style="margin-bottom:17.2px !important;">
				<view class="mc-account-list">
					<u-icon name="account-fill" class="txt-svg" size="28"></u-icon>
					<input type="text" class="input-base" name="payee" v-model="userInfo.username"
						style="transition: 0.15s linear;" disabled="">
				</view>
				<view class="error "></view>
			</view>
			<view class="account-form-group" style="margin-bottom:17.2px !important;">
				<view class="mc-account-list">
					<u-icon name="account-fill" class="txt-svg" size="28"></u-icon>
					<input type="text" class="input-base" :disabled="isRealNameExist" name="payee" v-model="real_name"
						style="transition: 0.15s linear;">
				</view>
				<view class="error "></view>
			</view>
			<view class="account-form-group">
				<view class="mc-account-list">
					<u-icon name="tags-fill" class="txt-svg" size="28"></u-icon>
					<input class="input-base" v-model="moenyAddrss" :placeholder="'＊' +$t('account.text54')"
						name="bankCard" style="transition: 0.15s linear;">
					<view class="error "></view>
				</view>
			</view>
			<view class="account-form-group" style="margin-bottom: 17.2px !important;"
				v-if="userInfo.is_tx_password == 0">
				<view class="tip">{{$t('account.text50')}}</view>
				<view class="mc-account-list">
					<u-icon name="lock-fill" class="txt-svg" size="28"></u-icon>
					<input :type="isOpen?'text':'password'" v-model="password" class="pwd"
						:placeholder="'＊' +$t('account.text47')" name="withdraw" style="transition: 0.15s linear;">
					<view class="eye-group" id="payment">
						<u-icon name="eye-fill" @tap="isOpen=!isOpen" class="am-icon-md" size="28"></u-icon>
					</view>

				</view>
				<view class="error "></view>
			</view>
			<view class="account-form-group" v-if="userInfo.is_tx_password == 0">
				<view class="mc-account-list">
					<u-icon name="lock-fill" class="txt-svg" size="28"></u-icon>
					<input :type="qrisOpen?'text':'password'" class="pwd" :placeholder="'＊' +$t('account.text48')"
						name="withdrawT" style="transition: 0.15s linear;" v-model="qrpassword" />
				</view>
				<view class="eye-group" id="validate">
					<u-icon name="eye-fill" @tap="qrisOpen=!qrisOpen" class="am-icon-md" size="28"></u-icon>
				</view>
				<view class="error"></view>
			</view>
			<u-button :disabled="isSubmitting" style="margin-top: 50rpx;background-color: #2462c5; color: #fff;"
				@click="submitClick">{{$t('account.text49')}}</u-button>
			<!-- 	<span class="am-button" @tap="$u.debounce(submitClick, 1500)">{{$t('account.text49')}}</span> -->
		</view>
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
		getUsdtGroupList,
		getUsdtTypeList,
		addUserUsdtData
	} from '@/api/jogos.js'
	import CustomTabs from '@/components/custom-tabs.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
		isRealNameExist() {
			return !!this.userInfo.payeename && this.userInfo.is_update_count > 0
		}

		},
		watch: {
			'userInfo.payeename': {
				immediate: true,
				handler(newVal) {
					this.real_name = newVal
				}
			}
		},
		data() {
			return {
				isOpen: false,
				qrisOpen: false,
				groupData: [],
				typeData: [],
				usdt_group_index: 0,
				usdt_type_index: 0,
				usdt_group_id: 0,
				usdt_type_id: 0,
				usdt_group_name: 0,
				usdt_type_name: 0,
				moenyAddrss: '',
				qrpassword: '',
				password: '',
				real_name: '',
				isSubmitting: false,
			}

		},

		onLoad() {
			this.getUsdtGroupListInfo()
			this.getUsdtTypeInfo()
		},
		mounted() {

		},
		beforeDestroy() {},
		methods: {
			groupClick(item, index) {
				this.usdt_group_index = index
				this.usdt_group_id = item.id
				this.usdt_group_name = item.name
			},
			typeClick(item, index) {
				this.usdt_type_index = index
				this.usdt_type_id = item.id
				this.usdt_type_name = item.name

			},
			async getUsdtGroupListInfo() {
				let {
					data,
					code
				} = await getUsdtGroupList()
				if (code == 200) {
					this.groupData = data
				}
			},
			async getUsdtTypeInfo() {
				let {
					data,
					code
				} = await getUsdtTypeList()
				if (code == 200) {
					this.typeData = data
				}
			},
			hasChinese(str) {
				return /[\u2E80-\u2EFF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(str);
			},
			//确认提交
			async submitClick() {

				// if(this.usdt_group_index == 0){
				// 	this.usdt_group_id = this.groupData[this.usdt_group_index].id
				// 	this.usdt_group_name = this.groupData[this.usdt_group_index].name
				// }
				if (this.isSubmitting) return;
				try {
					this.isSubmitting = true; // 开始提交
					if (this.usdt_type_index == 0) {
						this.usdt_type_id = this.typeData[this.usdt_type_index].id
						this.usdt_type_name = this.typeData[this.usdt_type_index].name
					}
					if (uni.$u.test.isEmpty(this.moenyAddrss)) {
						this.$modal.msg('钱包地址不能为空')
						return
					}
					if (this.hasChinese(this.moenyAddrss)) {
						this.$modal.msg('钱包地址不能包含中文')
						return
					}
					if (uni.$u.test.isEmpty(this.real_name)) {
						this.$modal.msg('请填写真实姓名')
						return
					}
					if(this.hasChinese(this.real_name)){
						this.$modal.msg('真实名称不能包含汉字')
						return
					}
					if (this.userInfo.is_tx_password == 0) {
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
					uni.showLoading({
						title: '提交中...'
					});
					let {
						data,
						code
					} = await addUserUsdtData({
						is_tx_password: this.userInfo.is_tx_password,
						// usdt_group_id: this.usdt_group_id,
						usdt_type_id: this.usdt_type_id,
						// usdt_group_name: this.usdt_group_name,
						usdt_type_name: this.usdt_type_name,
						money_address: this.moenyAddrss,
						password: this.password,
						username: this.userInfo.username,
						payeename: this.real_name,
						real_name: this.real_name,
						type: 1
					})
					if (code == 200) {
						this.usdt_group_index = 0
						this.usdt_type_index = 0
						this.usdt_group_id = 0
						this.usdt_type_id = 0
						this.usdt_group_name = ''
						this.usdt_type_name = ''
						this.password = ''
						this.qrpassword = ''
						this.money_address = ''
						this.$modal.msg('添加成功')
						uni.hideLoading()
						this.$tab.navigateTo(`/pages/withdraw/index?currentTab=1`)
					}
				} finally {
					setTimeout(()=>{
						this.isSubmitting = false; 
					},3000)
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
		background-color: #fff !important;
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

	.bank-text {
		color: black;
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
		color: #fff;
		background-color: rgb(36, 98, 197);
		border: 1px solid #ddd;
	}

	.banks-wrapper .bank-title {
		color: #747474;
		font-size: 16.0533px;
		margin-bottom: 11.4667px;
	}

	.banks-wrapper .bank-list-wrap {
		max-height: 183.467px;
		overflow-y: scroll;
		-webkit-overflow-scrolling: auto !important;
		margin-bottom: 17.2px;
	}

	.banks-wrapper .bank-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.banks-wrapper .bank-list .bank-item.bank-active {
		border: 1.14667px solid #ff3039;
		background-color: rgba(255, 48, 57, .06);
	}

	.banks-wrapper .bank-list .bank-item.has-icon {
		height: 40.4533px;
	}

	.banks-wrapper .bank-list .bank-item {
		padding: 2.86667px;
		margin-right: 10.4667px;
		margin-bottom: 11.4667px;
		font-size: 16.0533px;
		justify-content: center;
		white-space: break-spaces;
		align-items: center;
		display: flex;
		width: 30%;
		min-height: 40.4533px;
		border-radius: 9.17333px;
		border: 1.14667px solid #e4e4e4;
		background-color: #fff;
	}

	.banks-wrapper .bank-list .bank-item .bank-img {
		display: block;
		width: 100%;
		max-height: 100%;
		object-fit: contain;
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
</style>