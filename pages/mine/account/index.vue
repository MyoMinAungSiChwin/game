<template>
	<view class="d_account">
		<u-navbar :title="$t('title.text8')" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff"
			leftIconSize="40rpx" :titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>

		<view class="d_a_tab">
			<view class="tab_one d_border12">
				<view class="title_t">{{$t('account.text1')}}</view>
				<u-grid :border="false" @click="click" col="2" style="height: 100%">
					<u-grid-item class="t_o_item">
						<view class="t_o_rows d_flex">
							<view>{{gameAmount.money}}</view>
							<view>{{$t('account.text2')}}</view>
						</view>
					</u-grid-item>
					<u-grid-item class="t_o_item ">
						<view class="t_o_rows d_flex  ">
							<view>{{gameAmount.balance}}</view>
							<view>{{$t('account.text3')}}</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="tab_tow d_border12" v-if="false">
				<u-grid :border="false" @click="click" col="2" style="height: 100%">
					<u-grid-item class="t_o_item">
						<view class="t_o_rows d_flex">
							<view>存款账户</view>
							<view>余额: 0.00</view>
							<view>可提款: 0.00</view>
						</view>
					</u-grid-item>
					<u-grid-item class="t_o_item ">
						<view class="t_o_rows d_flex  ">
							<view>推广账户</view>
							<view>余额: 0.00</view>
							<view>可提款: 0.00</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<view class="d_a_nav">
			<u-tabs :list="list" :activeStyle="{
				            color: '#fff',
				            fontWeight: 'bold',
				            transform: 'scale(1.2)'
				        }" @change="changeTab" :current="tabIndex"></u-tabs>
		</view>

		<view class="d_a_list">
			<view class="one" v-if="tabIndex == 0">
				<view class="one_tit">
					{{$t('account.text8')}}
				</view>

				<view class="one_input">
					<u--input :placeholder="$t('account.text7') + 20" border="none" clearable :customStyle="{
							background: '#2b2e3d',
							padding: '20rpx',
							color: '#fff'
						}" v-model="money" @change="changeMoney" :disabled="is_get.length == 1 ? true : false"></u--input>
					<!-- 如果is_get.length长度是1 代表选中了获取奖励 这时候不可以输入-->
					<view class="give_amount">{{gift}}</view>
				</view>

				<view class="one_row">
					<u-grid :border="false">
						<u-grid-item v-for="item in rechlist" :key="item.id" @tap="clickRech(item)">
							<view class="rows d_flex d_border12 d_bgColor">
								{{item.money}}
								<view class="give_amount">{{item.gift}}</view>
							</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="one_rewards">
					<u-checkbox-group v-model="is_get" placement="column" @change="money = ''; gift=''">
						<u-checkbox :label="$t('account.text9')" :name="1" labelSize="17" labelColor="#fff"
							activeColor="#46b5fb">
						</u-checkbox>
					</u-checkbox-group>
				</view>
				<!-- 
				<view class="one_play">
					选择你的付款方式
				</view>

				<view class="one_fast d_bgColor d_border12">
					快速支付渠道1
				</view> -->

				<view class="one_btn">
					<u-button type="primary" :text="$t('account.text4')" shape="circle" :customStyle="{height: '80rpx'}"
						color="linear-gradient(to right, rgb(236, 97, 47), rgb(241, 155, 100))"
						@tap="alertmodel(1)"></u-button>
				</view>

			</view>
			<view class="tow" v-else-if="tabIndex == 1">
				<!-- <view class="tow_input">
					<u--input placeholder="输入提款金额" border="none" clearable :customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
				</view> -->

				<view class="tow_tit">
					{{$t('account.text10')}}
				</view>

				<view class="tow_input">
					<u--input :placeholder="$t('account.text11')" border="none" v-model="money" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view>


				<!-- 	<view class="tow_input">
					<u--input placeholder="PIX" border="none" v-model="PIX" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view> -->

				<!-- <view class="tow_input">
					<u--input :placeholder="$t('account.text17')" border="none" v-model="mobile" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view>

				<view class="tow_input">
					<u--input :placeholder="$t('account.text19')" border="none" v-model="bankCard" clearable
						:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view>


				<view class="tow_input">
					<u--input :placeholder="$t('account.text18')" border="none" v-model="bankName" clearable
						:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view> -->

				<!-- 		<view class="tow_input">
					<u--input :placeholder="$t('account.text18')" border="none" v-model="bankName" clearable
						:customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
					<picker @change="bindPickerChange" :value="pixtypeindex" :range="pixtypearray" style="padding: 10px;
    background: rgb(43, 46, 61);border-radius: 8rpx;font-size: 30rpx;">
						<view class="uni-input">{{pixtypearray[pixtypeindex]}}</view>
					</picker>

				</view> -->

				<!-- <view class="tow_input">
					<u--input placeholder="输入提款金额" border="none" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view>
				<view class="tow_input">
					<u--input placeholder="输入提款金额" border="none" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view>
				<view class="tow_input">
					<u--input placeholder="输入提款金额" border="none" clearable :customStyle="{
						background: '#2b2e3d',
						padding: '20rpx'
					}"></u--input>
				</view> -->

				<!-- <view class="tow_play">
					选择您的付款方式
				</view>

				<view class="tow_fast d_bgColor d_border12">
					快速支付渠道1
				</view> -->

				<view class="tow_btn">
					<u-button type="primary" :text="$t('account.text5')" shape="circle" :customStyle="{height: '80rpx'}"
						@tap="alertmodel2(1)"
						color="linear-gradient(to right, rgb(73, 129, 232), rgb(103, 220, 250))"></u-button>
				</view>

				<view class="tow_withdrawal">
					<view class="tit d_flex">
						<text></text>
						<text>{{$t('account.text16')}}</text>
						<text></text>
					</view>
					<view class="con">
						<u-parse content=""></u-parse>
					</view>
				</view>
			</view>
			
			<view class="three" v-else-if="tabIndex == 2">
				<view class="three_tab">
					<u-tabs :list="[{name: $t('account.text4')},{name: $t('account.text5')}]" @change="changeThreeTab"
						:activeStyle="{
							            color: '#fff',
							            fontWeight: 'bold',
							            transform: 'scale(1.2)'
							        }"></u-tabs>
				</view>
					
				
				<view class="three_list">
					<view class="tr_li_items d_border12 d_bgColor border_shadow" v-for="item in rechargeRecordList"
						:key="item.id">
						<!-- 	<view class="top d_flex">
							<view>ID da ordem: 2D47DD7D2A18DFAC</view>
							<view>
								<u--image :showLoading="true" src="../../../static/images/copy.png" width="28rpx"
									height="28rpx"></u--image>
							</view>
						</view> -->
						<view class="rows d_flex">
							<view>{{$t('account.text12')}}</view>
							<view>{{item.money}}</view>
						</view>
						<view class="rows d_flex">
							<view>{{$t('account.text13')}}</view>
							<view>{{item.info}}</view>
						</view>
						<view class="rows d_flex">
							<view>{{$t('account.text14')}}</view>
							<view>
								{{item.type == 0 ? $t('account.text5'):$t('account.text4')}}
							</view>
						</view>
						<view class="rows d_flex">
							<view>{{$t('account.text15')}}</view>
							<view>{{item.addtime_txt}}</view>
						</view>
					</view>

					<u-loadmore :loadmoreText="$t('global.title2')" :loadingText="$t('global.title3')"
						:nomoreText="$t('global.title4')" :status="status" v-if="total > 0" />
					<u-empty :show="total == 0" :text="$t('global.title1')">
					</u-empty>

				</view>
				
			</view>
		</view>


		<u-popup :show="showConversion" @close="showConversion=false" mode="center" round="10">

			<view class="conversion_sty d_border12 d_bgColor" style="padding: 44upx;width: 80vw;">
				<!-- 11 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title1')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerFirstName"></u--input>
				</view>
				<!-- 22 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title2')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerLastName"></u--input>
				</view>
				<!-- 33 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title3')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerEmail"></u--input>
				</view>
				<!-- 44 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title4')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerPhone"></u--input>
				</view>

				<!-- // 付款人姓payerFirstName^
				// 付款人名lpayerLastName^
				// 付款人邮箱lpayerEmail^
				// 付款人电话lpayerPhone^
				// 付款人税号lpayerCPF^ -->

				<!-- payerCPF
				payerEmail
				payerFirstName
				payerLastName
				payerPhone -->

				<!-- 55 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title5')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerCPF"></u--input>
				</view>


				<view class="one_btn">
					<u-button type="primary" :text="$t('account.text4')" shape="circle" :customStyle="{height: '80rpx'}"
						color="linear-gradient(to right, rgb(236, 97, 47), rgb(241, 155, 100))"
						@tap="rechargeBtn(1)"></u-button>
				</view>

			</view>
		</u-popup>



		<u-popup :show="showConversion2" @close="showConversion2=false" mode="center" round="10">

			<view class="conversion_sty d_border12 d_bgColor" style="padding: 44upx;width: 80vw;">
				<!-- 11 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title1')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerFirstName"></u--input>
				</view>
				<!-- 22 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title2')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerLastName"></u--input>
				</view>
				<!-- 33 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title3')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerEmail"></u--input>
				</view>
				<!-- 44 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title4')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerPhone"></u--input>
				</view>

				<!-- 55 -->
				<view class="tow2">
					<view style="font-size: 28upx;">{{$t('paycard.title5')}}</view>
					<u--input :placeholder="$t('paycard.title6')" border="none" clearable
						:customStyle="{background: 'rgb(74 77 97)',padding: '10rpx',borderRadius: '10rpx',margin: '40rpx 0',color: '#fff'}"
						v-model="payerCPF"></u--input>
				</view>

				<view class="one_btn">
					<u-button type="primary" :text="$t('account.text4')" shape="circle" :customStyle="{height: '80rpx'}"
						color="linear-gradient(to right, rgb(236, 97, 47), rgb(241, 155, 100))"
						@tap="withdrawBtn(1)"></u-button>
				</view>

			</view>
		</u-popup>


	</view>
</template>

<script>
	import {
		withdrawRecharge,
		rechargeRecord,
		rechlist,
		gameAmount,
	} from '@/api/mine.js';
	import {
		mapGetters
	} from 'vuex';

	import {
		isBind
	} from '@/api/bind.js'

	export default {
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad({
			index
		}) {
			if (index) {
				this.tabIndex = +index
			}

			this.getRechargeRecord()
			this.getRechlist()
			this.getGameAmount()
		},
		data() {
			return {
				PIX: '',
				// (CPF/CNPJ/PHONE/EIAIL/EVP)
				pixtypearray: ['CPF', 'CNPJ', 'PHONE', 'EIAIL', 'EVP'],
				pixtypeindex: 0,
				showConversion: false,
				showConversion2: false,
				list: [{
						name: this.$t('account.text4')
					},
					{
						name: this.$t('account.text5')
					},
					{
						name: this.$t('account.text6')
					},
				],
				tabIndex: 0,
				rewards: 0,
				money: '',
				bankCard: '',
				mobile: '',
				bankName: '',
				is_get: [],
				rechargeRecordList: [],
				form: {
					// 0充值 1提现
					status: 0,
					page: 1,
					list: 10
				},
				status: 'loadmore',
				total: undefined,

				rechlist: [],
				// 用来展示输入框效果
				gift: '',
				gameAmount: {},

				payerCPF: '',
				payerEmail: '',
				payerFirstName: '',
				payerLastName: '',
				payerPhone: '',
			};
		},

		onShow() {

			this.$store.dispatch('GetInfo');

			this.payerCPF = this.userInfo.payerCPF;
			this.payerEmail = this.userInfo.payerEmail;
			this.payerFirstName = this.userInfo.payerFirstName;
			this.payerLastName = this.userInfo.payerLastName;
			this.payerPhone = this.userInfo.payerPhone;

		},

		methods: {

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.pixtypeindex = e.detail.value
			},

			changeTab({
				index
			}) {
				this.tabIndex = index
				this.money = ''
				this.is_get = []
				this.gift = ''
				this.bankCard = ''
				this.mobile = ''
				this.bankName = ''
			},

			changeThreeTab({
				index
			}) {
				this.form.page = 1
				this.form.status = index
				this.rechargeRecordList = []
				this.getRechargeRecord()
			},
			// 提款
			async withdrawBtn() {

				// $extendedParams = 'payeeName^收款人姓名|PIX^PIX账户|pixType^PIX账户类型|payeePhone^收款人电话|payeeEmail^收款人邮箱|payeeCPF^收款人税号';

				uni.showLoading();
				// var user = this.userInfo;


				if (!this.money) return this.$modal.msg(this.$t('userinfo.text152'))
				if (!this.payerCPF) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerEmail) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerFirstName) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerLastName) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerPhone) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.PIX) return this.$modal.msg(this.$t('paycard.title6'))

				var PixtypeArray = this.pixtypearray;

				const {
					code,
					msg,
					data
				} = await withdrawRecharge({
					status: 1,
					money: this.money,
					// is_get: this.is_get.length ? 1 : 0,

					payerCPF: this.payerCPF,
					payerEmail: this.payerEmail,
					payerFirstName: this.payerFirstName,
					payerLastName: this.payerLastName,
					payerPhone: this.payerPhone,

					PIX: this.PIX,
					pixType: PixtypeArray[this.pixtypeindex],
				})
				if (code == 200) {
					uni.hideLoading();
					uni.switchTab({
						url: '/pages/jogos/index'
					})
				} else {
					uni.hideLoading();
					this.$modal.msg(msg);
				}

			},

			alertmodel(e) {
				this.showConversion = true;
			},

			async alertmodel2(e) {
				const _this = this
				if (!_this.money) return _this.$modal.msg(_this.$t('userinfo.text152'))
				try {
					uni.showLoading();
					const {
						code,
						data
					} = await isBind()
					if (code == 200) {
						if (data.code == 200) {
							const {
								code,
								msg,
								data
							} = await withdrawRecharge({
								status: 1,
								money: _this.money,
							})

							if (code == 200) {
								uni.hideLoading();
								_this.money = ''
								this.$modal.msg(msg);
								// let item = {
								// 	url: data.paymentUrl
								// };
								// item = encodeURIComponent(JSON.stringify(item))
								// uni.navigateTo({
								// 	url: `/pages/framebox?item=${item}`
								// })

							} else {
								uni.hideLoading();
								this.$modal.msg(msg);
							}
						} else if (data.code == 101) {
							this.$tab.navigateTo('/pages/bind/index')
						}
					}

				} catch (err) {
					console.error(err)
				} finally {
					uni.hideLoading();
				}

				// this.showConversion2 = true;
			},

			// 充值
			async rechargeBtn() {
				uni.showLoading();

				if (!this.money) return this.$modal.msg(this.$t('userinfo.text152'))
				if (!this.payerCPF) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerEmail) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerFirstName) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerLastName) return this.$modal.msg(this.$t('paycard.title6'))
				if (!this.payerPhone) return this.$modal.msg(this.$t('paycard.title6'))

				const {
					code,
					msg,
					data
				} = await withdrawRecharge({
					status: 0,
					money: this.money,
					is_get: this.is_get.length ? 1 : 0,

					payerCPF: this.payerCPF,
					payerEmail: this.payerEmail,
					payerFirstName: this.payerFirstName,
					payerLastName: this.payerLastName,
					payerPhone: this.payerPhone,
				})

				if (code == 200) {
					uni.hideLoading();

					var item = {
						url: data.paymentUrl
					};

					item = encodeURIComponent(JSON.stringify(item))

					uni.navigateTo({
						url: `/pages/framebox?item=${item}`
					});

					// window.location.href = data.paymentUrl;
				} else {
					uni.hideLoading();
					this.$modal.msg(msg);
				}
			},

			async getRechargeRecord() {
				let {
					code,
					data
				} = await rechargeRecord(this.form)
				if (code == 200) {
					this.total = data.tal
					this.status = 'loadmore'
					this.rechargeRecordList = this.rechargeRecordList.concat(data.data)
					if (this.form.list > data.data.length) {
						return this.status = 'nomore'
					}
				}
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

			clickRech(item) {
				// 如果是1 代表选择了优惠奖金  使用true_money  否则 使用 money
				if (this.is_get.length == 1) {
					this.money = item.true_money
					this.gift = item.gift
				} else {
					this.money = item.money
				}
			},

			async getGameAmount() {
				try {
					let {
						code,
						data
					} = await gameAmount()
					if (code == 200) {
						this.gameAmount = data
						uni.hideLoading()
					}
				} catch {
					uni.hideLoading()
				}

			},


			async changeMoney() {
				// console.log(this.money)
			},
		},
		onReachBottom() {
			if (this.total < (this.form.page + 1) * this.form.list) {
				return false
			}
			this.form.page += 1
			this.getRechargeRecord()
		}
	}
</script>

<style lang="scss" scoped>
	.d_account {
		padding: 130rpx 20rpx 20rpx 20rpx;
		color: #fff;

		.d_a_tab {
			.tab_one {
				position: relative;
				z-index: 10;
				height: 200rpx;
				background: linear-gradient(45deg, #466ac5 0%, #46b5fb 100%);


				.title_t {
					position: absolute;
					left: 0;
					top: 0;
					padding: 5rpx 20rpx;
					font-size: 24rpx;
					background: rgba(0, 0, 0, .1);
					border-bottom-right-radius: 12rpx
				}

				.t_o_item {
					height: 100%;

					.t_o_rows {
						flex-direction: column;
						align-items: center;
						justify-content: center;
						height: 100%;
						font-size: 38rpx;
						font-weight: 700;

						&>view:nth-child(2) {
							margin-top: 20rpx;
							font-size: 26rpx;
							font-weight: normal;
						}
					}
				}
			}

			.tab_tow {
				position: relative;
				top: -50rpx;
				height: 230rpx;
				background: linear-gradient(180deg, rgba(76, 167, 255, .3) 0%, rgba(37, 110, 255, .3) 100%);

				.t_o_item {
					padding: 40rpx 40rpx 0 40rpx;
					height: 100%;

					.t_o_rows {
						width: 100%;
						flex-direction: column;
						justify-content: center;
						height: 100%;
						font-size: 22rpx;

						&>view:nth-child(1) {
							color: rgba(255, 255, 255, .7);
						}

						&>view:nth-child(2) {
							height: 60rpx;
							line-height: 60rpx;
						}
					}
				}
			}
		}

		.d_a_nav {
			border-bottom: 1px solid #666;

			::v-deep .u-tabs__wrapper__nav__item {
				flex: 1;
			}
		}

		.d_a_list {
			padding: 20rpx 0;

			.one {
				padding: 20rpx 0;

				.one_input {
					position: relative;
					margin: 20rpx 0;

					::v-deep .u-input {
						background-color: rgb(43, 46, 61) !important;
					}
				}

				.one_tit {
					padding: 20rpx 0;
					color: #f7ba17;
					text-align: center;
					background: linear-gradient(90deg, transparent 0%, rgba(247, 186, 23, .16) 50%, transparent 100%);
				}

				.one_row {
					.u-grid {
						justify-content: space-around !important;
					}

					.rows {
						position: relative;
						margin-bottom: 10rpx;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100rpx;
					}

					.u-grid-item {
						width: 32% !important;
					}

					.u-grid-item:nth-child(n+1) {
						// margin: 0 6rpx !important;
					}

				}

				.give_amount {
					position: absolute;
					top: 0;
					right: 0;
					padding: 0 10rpx;
					min-width: 100rpx;
					text-align: center;
					background: linear-gradient(58deg, #ff4e05 0%, #ff995a 100%);
					border-radius: 0 20rpx;
				}

				.one_rewards {
					margin: 40rpx 0 10rpx 0;
				}

				.one_play {
					color: #46b5fb;
					height: 80rpx;
					line-height: 80rpx;
				}

				.one_fast {
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
				}

				.one_btn {
					margin: 80rpx 100rpx 0 100rpx;
				}
			}

			.tow {
				.tow_input {
					margin-bottom: 20rpx;

					::v-deep .u-input {
						background-color: rgb(43, 46, 61) !important;
					}
				}

				.tow_tit {
					margin: 20rpx 0;
					padding: 20rpx 0;
					color: #f7ba17;
					text-align: center;
					background: linear-gradient(90deg, transparent 0%, rgba(247, 186, 23, .16) 50%, transparent 100%);
				}

				.tow_play {
					color: #46b5fb;
					height: 80rpx;
					line-height: 80rpx;
				}

				.tow_fast {
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
				}

				.tow_btn {
					margin: 80rpx 100rpx 0 100rpx;
				}

				.tow_withdrawal {
					height: 100rpx;

					.tit {
						margin: 20rpx 0;
						align-items: center;
						justify-content: space-around;

						&>text:nth-child(1) {
							width: 100rpx;
							height: 4rpx;
							background: linear-gradient(-90deg, #ff9602, transparent);
						}

						&>text:nth-child(2) {
							text-align: center;
							color: #ff9602;
							font-weight: 700;
						}

						&>text:nth-child(3) {
							width: 100rpx;
							height: 4rpx;
							background: linear-gradient(-90deg, #ff9602, transparent);
						}
					}

					.con {}
				}
			}

			.three {
				.three_tab {
					padding-left: 60rpx;
					margin-bottom: 30rpx;
				}

				.three_list {
					.tr_li_items {
						margin-bottom: 20rpx;
						padding: 20rpx;

						.top {
							align-items: center;
							justify-content: space-between;
							height: 50rpx;
							color: #61a5eb;
							font-size: 32rpx;
						}

						.rows {
							align-items: center;
							justify-content: space-between;
							height: 80rpx;
							border-bottom: 1px solid #666;

							&>view:nth-child(1) {
								font-size: 26rpx;
								color: rgba(255, 255, 255, .7);
							}
						}

						.rows:last-child {
							border: none;
						}
					}
				}
			}
		}
	}
</style>