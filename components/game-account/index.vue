<template>
	<view class="game_account">
		<u-popup :show="showAccountPopup" mode="center" @close="$store.dispatch('setAccountPopup', false)" :round="10">
			<scroll-view scroll-y="true" class="account_popup">
				<view class="account_tabs game_flex">
					<view class="game_flex align_center game_justify_center" :class="accessMode == 0 && 'curr_tabs'"
						@tap="accessMode = 0">{{$t('account.text1')}}</view>
					<view class="game_flex align_center game_justify_center" :class="accessMode == 1 && 'curr_tabs'"
						@tap="accessMode = 1">{{$t('account.text2')}}</view>
				</view>

				<template v-if="accessMode == 0">
					<view class="account_input">
						<view class="title">{{$t('account.text3')}}</view>
						<!-- :disabled="form.is_get" -->
						<u--input :placeholder="$t('account.text4')" border="none" v-model="form.money" color="#fff"
							:customStyle="{'background': '#2c2939', height: '70rpx', padding: '0 20rpx', border: '1px solid #666'}"
							:disabled="form.is_get">
							</>
						</u--input>
						<view class="tips">{{gift}}</view>
					</view>

					<view class="account_amount game_flex">
						<view class="amount_item d_border12 game_flex align_center game_justify_center"
							v-for="(item, index) in rechlist" :class="amountIndex == index && 'active_amount_item'"
							@tap="changeAmountIndex(item, index)">
							{{item.money}}

							<text class="active_tips d_border12">{{item.gift}}</text>
						</view>

					</view>

					<view class="account_select d_border12">
						<u-checkbox-group placement="column" @change="checkboxChange">
							<u-checkbox :label="$t('account.text5')" :name="$t('account.text5')">
							</u-checkbox>
						</u-checkbox-group>
					</view>

					<view class="account_btn d_border12 game_flex align_center" @tap="withdrawRechargeBtn(0)">
						<view>{{$t('account.text1')}}</view>
						<view class="game_flex align_center">
							{{form.money}}
							<u-icon name="arrow-right" color="#fff" size="28rpx"></u-icon>
						</view>
					</view>

					<view class="account_foo">
						<view class="foo_one game_flex align_center">
							<u-icon name="question-circle" color="#fff" size="28rpx" style="margin-top: 8rpx;"></u-icon>
							<text style="margin: 0 10rpx;">{{$t('account.text7')}}?</text>
							<text style="color: #ed1c49;">{{$t('account.text8')}}</text>
						</view>
						<view class="foo_tow">
							{{$t('account.text9')}}
						</view>
						<view class="foo_three">
							<view>{{$t('account.text10')}}: $20</view>
							<view>1. {{$t('account.text11')}}。</view>
							<view>2. {{$t('account.text12')}}。</view>
							<view>3. {{$t('account.text13')}}。</view>
						</view>
					</view>
				</template>

				<template v-if="accessMode == 1">
					<view class="revocation">
						<view class="revo_one">
							<view>{{$t('account.text14')}}</view>
							<view>{{userInfo.money}}</view>
							<view class="game_flex">
								{{$t('account.text15')}}
								<u-icon name="question-circle" color="#fff" size="24rpx"></u-icon>

								<view class="tips">*</view>
							</view>
						</view>
						<view class="revo_tow">
							<u--input :placeholder="$t('account.text4')" border="none" v-model="form.money" color="#fff"
								:customStyle="{'background': '#2c2939', height: '70rpx', padding: '0 20rpx', border: '1px solid #666'}">
							</u--input>
						</view>
						<view class="revo_three" @tap="showBindInfo=true">
							<view class="title">{{$t('account.text16')}}</view>
							<u--input :placeholder="$t('account.text4')" border="none"  color="#fff"
								:customStyle="{'background': '#2c2939', height: '70rpx', padding: '0 20rpx', border: '1px solid #666'}"
								>

								<template slot="prefix">
									<u-icon :name="require('@/static/images/jogos/yhk.png')" color="#999"
										size="38rpx"></u-icon>
								</template>
								<template slot="suffix">
									<u-icon name="arrow-right" color="#999" size="28rpx"></u-icon>
								</template>
							</u--input>
						</view>
						<view class="revo_four">
							<view class="account_btn d_border12 game_flex align_center" @tap="withdrawRechargeBtn(1)">
								<view>{{$t('account.text2')}}</view>
								<view class="game_flex align_center">
									{{form.money}}
									<u-icon name="arrow-right" color="#fff" size="28rpx"></u-icon>
								</view>
							</view>
						</view>

						<view class="account_foo">
							<view class="foo_one ">
								<view>{{$t('account.text18')}}</view>

								<view>
									<text style="color: #ed1c49;" @tap="toVipPage">VIP-{{userInfo.level}} {{$t('account.text19')}}</text>
									<text>{{$t('account.text20')}}：{{vipsInfo.day_withdraw}}</text>
								</view>

								<view> {{$t('account.text21')}}: {{vipsInfo.withdraw}}% </view>
								<view> {{$t('vip.text12')}}：R${{vipsInfo.withdraw_limt}} </view>
								<!-- <view> {{$t('account.text23')}}：R$ 5,000.00 </view> -->
								<view> {{$t('account.text24')}}：00:00 - 24:00。 </view>
								<view> 1. {{$t('account.text25')}}。 </view>
								<view> 2. {{$t('account.text26')}}!</view>
								<view> 3. {{$t('account.text27')}}。</view>
							</view>
						</view>
					</view>
				</template>

			</scroll-view>
			<u-icon class="off_icon" name="close" color="#5f7495" size="38rpx"
				@tap="$store.dispatch('setAccountPopup', false)"></u-icon>
		</u-popup>



		<u-popup :show="showBindInfo" @close="showBindInfo=false" :round="10" mode="center">
			<scroll-view scroll-y="true" class="bind_info">
				<view>
					<view class="bind_title">{{$t('account.text6')}}</view>
					<view class="bind_item ">
						<view>
							<text>{{$t('account.text28')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.firstname" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
					</view>
					<view class="bind_item">
						<view>
							<text>{{$t('account.text29')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.lastname" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>

					</view>
					<view class="bind_item">
						<view>
							<text>{{$t('account.text30')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.email" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>

					</view>
					<view class="bind_item">
						<view>
							<text>{{$t('account.text31')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.phone" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>

					</view>

					<view class="bind_item">
						<view>
							<text>{{$t('account.text32')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.cpf" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>

					</view>
					<view class="bind_item">
						<view>
							<text>{{$t('account.text33')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.dict_key" clearable
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>

					</view>

					<view class="bind_item">
						<view>
							<text>{{$t('account.text34')}}</text>
							<text class="tips">*</text>
						</view>
						<u--input :placeholder="$t('jogos.text15')" border="none" v-model="bindForm.pixtype"
							:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}" @focus="showBindPicker=true"></u--input>
					</view>
					<view class="bind_item game_flex">
						<u-button :text="$t('account.text35')" color="linear-gradient(360deg,#9B81FF 0%,#2282F5 100%)"
							@tap="subBindForm"></u-button>
					</view>
				</view>
			</scroll-view>
		</u-popup>
		<u-picker :cancelText="$t('userinfo.text15')" :confirmText="$t('userinfo.text16')" closeOnClickOverlay
			@close="showBindPicker=false" @cancel="showBindPicker=false" :show="showBindPicker" :columns="pixtypearray"
			@confirm="bindPickerChange"></u-picker>

	</view>
</template>

<script>
	import {
		withdrawRecharge,
		rechlist,
	} from '@/api/mine.js'
import {
		gamevipsInfo, 
	 } from '@/api/userinfo.js'
	import {
		isBind,
		addBind
	} from '@/api/bind.js'

	import typeCheck from '@/utils/class.js'

	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "gameAccount",
		computed: {
			...mapGetters(['showAccountPopup', 'userInfo', 'accessModes'])
		},
		created() {
			this.getRechlist()
			if (this.$isLogin()) {
				
				this.getGamevipsInfo()
			}
			
			this.accessMode = this.accessModes
		},
		data() {
			return {
				amount: '',
				amountIndex: 0,
				accessMode: 1,
				rechlist: [],
				form: {
					// 0 充值  1 提现
					status: '0',
					// 是否充值奖励
					is_get: false,
					// 金额
					money: ''
				},
				gift: '',
				showBindInfo: false,
				bindForm: {
					// firstname: '',
					// lastname: '',
					// email: '',
					// phone: '',
					// cpf: '',
					// pix: '',
					// pixtype: '',
					// 姓
					firstname: "",
					// 名
					lastname: "",
					// 邮箱
					email: "",
					// 手机号
					phone: "",
					// 税号
					cpf: "",
					// 账号
					dict_key: "",
					// pix类型
					pixtype: "",
				},
				formLabels: {
					firstname: 'paycard.title1',
					lastname: 'paycard.title2',
					email: 'paycard.title3',
					phone: 'paycard.title4',
					cpf: 'paycard.title5',
					dict_key: 'paycard.title7',
					pixtype: 'paycard.title8',
				},
				pixtypearray: [
					['CPF', 'CNPJ', 'PHONE', 'EIAIL', 'EVP']
				],
				showBindPicker: false,
				vipsInfo: {}
			};
		},
		methods: {
			async changeAmountIndex(item, index) {
				this.amountIndex = index
				if (this.form.is_get) {
					this.form.money = item.true_money
					this.gift = item.gift
				} else {
					this.form.money = item.money
				}
			},

			// 充值/提现
			// async withdrawRechargeBtn(status) {
			//   const resolveDispatch = () => {
			//     this.$store.dispatch('GetInfo');
			//     this.$store.dispatch('setAccountPopup', false);
			//   }
			// this.form.status = status
			// if(status == 1){
			// 	let {code, data} = await isBind()
			// 	if(code == 200){
			// 		let {
			// 			code
			// 		} = await withdrawRecharge(this.form)
			// 		if (code == 200) {
			// 			resolveDispatch()
			// 		}
			// 	}
			// 	return
			// }
			// let {
			// 	code
			// } = await withdrawRecharge(this.form)
			// if (code == 200) {
			// 	resolveDispatch()
			// }

			async withdrawRechargeBtn(status) {
				this.$modal.msg("对不起,三方支付接口有误,处理中...")
				return 
				const resolveDispatch = () => {
					this.$store.dispatch('GetInfo');
					this.$store.dispatch('setAccountPopup', false);
				}

				this.form.status = status;
				let data;

				if (status == 1) {
					let res1 = await isBind();
					if (res1.code != 200) return;

					data = (await withdrawRecharge(this.form))
				} else {
					data = (await withdrawRecharge(this.form));
				}
				if (data.code == 200) {
					resolveDispatch();
					if (data.data.paymentUrl) {
						this.form.money = ''
						this.$dDelay(200).then(() => {
							this.$tab.navigateTo(`/pages/web-view/index?url=${data.data.paymentUrl}`)
						})
					}

				}
			},

			// },

			checkboxChange(text) {
				this.form.money = ''
				this.form.is_get = text.length ? true : false
			},

			async getRechlist() {
				let {
					code,
					data
				} = await rechlist()
				if (code == 200) {
					this.rechlist = data
				}
			},

			toVipPage() {
				this.showBindInfo = false
				this.$store.dispatch('setAccountPopup', false)
				this.$tab.navigateTo('/pages/vip/index')
			},

			async subBindForm() {
				for (let key in this.bindForm) {
					if (!this.bindForm[key]) {
						return this.$modal.msg(this.$t('paycard.title6') + this.$t(this.formLabels[key]));
					}
				}
				if (!typeCheck.validateEmail(this.bindForm.email)) {
					return this.$modal.msg(this.$t('paycard.title3') + this.$t('paycard.title9'));
				}

				const {
					code,
					data
				} = await addBind(this.bindForm)
				if (code == 200) {
					// this.$modal.msg(this.$t('popUp.text15'))
					this.$store.dispatch('GetInfo')
					this.showBindInfo = false
				}
			},

			bindPickerChange({
				value
			}) {
				this.bindForm.pixtype = value[0]
				this.showBindPicker = false
			},
			
			async getGamevipsInfo(){
				let {code,data} = await gamevipsInfo()
				if(code == 200){
					this.vipsInfo = data
				}
			},
		},
		watch: {
			accessMode(index) {
				this.form.money = '';
				if (this.$isLogin()) {
					
					this.getGamevipsInfo()
				}
			
			},
			accessModes(index) {
				this.accessMode = this.accessModes
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_account {
		position: relative;

		.account_popup {
			padding: 30rpx;
			width: 700rpx;
			height: 900rpx;
			background-color: #211e2f;
			color: #fff;

			.account_tabs {
				margin: 60rpx 0 20rpx 0;
				border-radius: 30rpx;
				background-color: #2b2939;

				&>view {
					padding: 0 20rpx;
					height: 60rpx;
				}

				.curr_tabs {
					background-color: #2282f5;
					border-radius: 30rpx;
					background-image: linear-gradient(to right, #7b3efa, #5f13ff);
				}
			}

			.account_input {
				position: relative;

				.title {
					padding-left: 30rpx;
					position: relative;
					height: 50rpx;
					line-height: 50rpx;

					&::before {
						content: '*';
						position: absolute;
						left: 0;
						top: 15%;
						font-size: 40rpx;
						color: darkred;
						font-weight: 700;
					}
				}

				.tips {
					position: absolute;
					right: 10rpx;
					top: 70%;
					font-size: 28rpx;
					color: #4aa459;
					font-weight: 700;
					transform: translateY(-50%);
				}

				::v-deep .u-input {
					background-color: #201e2e !important;
				}
			}

			.account_amount {
				flex-wrap: wrap;

				.amount_item {
					position: relative;
					margin-top: 10rpx;
					width: 32%;
					height: 80rpx;
					background-color: #24272d;
					border: 1px solid #24272d;

					.active_tips {
						position: absolute;
						top: -4rpx;
						right: 10rpx;
						padding: 0 4rpx;
						font-size: 16rpx;
						color: #fff;
						background-color: #4aa359;
					}
				}

				& .amount_item:nth-child(3n + 2) {
					margin: 10rpx;
				}

				.active_amount_item {
					background-color: #241b47;
					border-color: #2282f5;
				}
			}

			.account_select {
				margin: 20rpx 0;
				padding: 20rpx 10rpx;
				background-color: #1e2531;
			}

			.account_btn {
				padding: 0 20rpx;
				height: 80rpx;
				font-size: 30rpx;
				font-weight: 700;
				justify-content: space-between;
				background: linear-gradient(360deg, #9B81FF 0%, #2282F5 100%);
			}

			.account_foo {
				.foo_one {
					height: 80rpx;
					font-size: 24rpx;

					&>view:nth-child(1) {
						margin: 20rpx 0 10rpx 0;
					}
				}
			}


			.revocation {
				.revo_one {
					margin-top: 20rpx;

					&>view:nth-child(1) {
						font-size: 30rpx;
					}

					&>view:nth-child(2) {
						font-size: 26rpx;
					}

					&>view:nth-child(3) {
						position: relative;

						.tips {
							position: absolute;
							right: 84%;
							top: 70%;
							font-size: 28rpx;
							color: #d1374c;
							font-weight: 700;
							transform: translateY(-50%);
						}
					}

					&>view:nth-child(4) {}
				}

				.revo_tow {
					margin: 20rpx 0 30rpx 0;
				}

				.revo_three {
					margin-bottom: 50rpx;

					.title {
						padding-left: 30rpx;
						position: relative;
						height: 50rpx;
						line-height: 50rpx;

						&::before {
							content: '*';
							position: absolute;
							left: 0;
							top: 15%;
							font-size: 40rpx;
							color: darkred;
							font-weight: 700;
						}
					}
				}
			}

		}

		.off_icon {
			position: absolute;
			top: 20rpx;
			right: 6%;
		}



		.bind_info {
			padding: 30rpx;
			width: 700rpx;
			height: 900rpx;
			color: #fff;
			background-color: #201e2e;

			.bind_title {
				height: 50rpx;
				line-height: 50rpx;
				font-size: 32rpx;
				font-weight: 700;
			}

			.bind_item {
				margin-top: 40rpx;

				.tips {
					display: inline-block;
					margin-top: 20rpx;
					font-size: 28rpx;
					color: red;
					font-weight: 700;
				}
			}
		}
	}
</style>