<template>
	<view class="bind">
		<u-navbar :title="$t('title.text25')" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff"
			leftIconSize="40rpx" :titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>

		<view class="bind_form">
			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title1')" border="none" v-model="bindForm.firstname" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title2')" border="none" v-model="bindForm.lastname" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title3')" border="none" v-model="bindForm.email" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title4')" border="none" v-model="bindForm.phone" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title5')" border="none" v-model="bindForm.cpf" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title7')" border="none" v-model="bindForm.pix" clearable
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"></u--input>
			</view>

			<view class="bind_input">
				<u--input :placeholder="$t('paycard.title10')" border="none" v-model="bindForm.pixtype" 
					:customStyle="{
					background: '#2b2e3d',
					padding: '20rpx'
				}"
				@focus="showBindPicker=true"
				></u--input>
			</view>
			<view style="height: 50rpx">
				
			</view>
			<u-button type="primary" :text="$t('popUp.text1')" @tap="subBindForm"></u-button>
		</view>
		
		<u-picker
		:cancelText="$t('userinfo.text15')"
		:confirmText="$t('userinfo.text16')"
		closeOnClickOverlay
		@close="showBindPicker=false"
		@cancel="showBindPicker=false"
		:show="showBindPicker" 
		:columns="pixtypearray"
		@confirm="bindPickerChange"
		></u-picker>
	</view>
</template>

<script>
	import typeCheck from '@/utils/class.js'
	
	import { addBind } from '@/api/bind.js'
	
	export default {
		data() {
			return {
				bindForm: {
					firstname: '',
					lastname: '',
					email: '',
					phone: '',
					cpf: '',
					pix: '',
					pixtype: '',
				},
				formLabels: {
					firstname: 'paycard.title1',
					lastname: 'paycard.title2',
					email: 'paycard.title3',
					phone: 'paycard.title4',
					cpf: 'paycard.title5',
					pix: 'paycard.title7',
					pixtype: 'paycard.title8',
				},
				pixtypearray: [['CPF', 'CNPJ', 'PHONE', 'EIAIL', 'EVP']],
				showBindPicker: false
			};
		},
		onShow() {
			console.log(typeCheck.validateEmail())
		},
		methods: {
			async subBindForm() { 
				for (let key in this.bindForm) {
					if (!this.bindForm[key]) {
						return this.$modal.msg(this.$t('paycard.title6') + this.$t(this.formLabels[key]));
					}
				}
				if (!typeCheck.validateEmail(this.bindForm.email)) {
					return this.$modal.msg(this.$t('paycard.title3') + this.$t('paycard.title9'));
				}
				
				const {code, data} = await addBind(this.bindForm)
				if(code == 200){
					this.$modal.msg(this.$t('popUp.text15'))
					this.$dDelay(1000).then(() => {
						this.$tab.navigateBack()
					})
				}
			},
			
			bindPickerChange({value}){
				this.bindForm.pixtype = value[0]
				this.showBindPicker = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bind {
		padding: 120rpx 0 0;

		.bind_form {
			padding: 20rpx;

			.bind_input {
				margin-top: 20rpx;
			}
		}
	}
</style>