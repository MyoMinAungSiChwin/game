<template>
	<view class="d_settings">
		<u-navbar :title="$t('title.text22')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>
		</u-navbar>
		
		<view class="form_section d_bgColor d_border12 border_shadow">
		
			<view class="form_s_item d_flex ">
				<view class="label">
					{{$t('settings.text1')}}
				</view>
				<view class="name d_flex">
					<text>{{userInfo.username}}</text>
				</view>
			</view>
				
				
			<view class="form_s_item d_flex ">
				<view class="label">
					{{$t('settings.text2')}}
				</view>
				<view class="name">
					V1.0.0
				</view>
			</view>
		</view>
		
		
		<view class="form_section d_bgColor d_border12 border_shadow"
		style="margin-top: 30rpx;"
		>
		
	<!-- 	<view class="form_s_item d_flex"
		@tap="showLanguage=true"
		>
			<view class="label">
				{{$t('settings.text4')}}
			</view>
			<view class="name">
				<u-icon name="arrow-right" color="#999" size="32rpx"></u-icon>
			</view>
		</view> -->
		
		
		<!-- 	<view class="form_s_item d_flex"
			@tap="$tab.navigateTo('/pages/mine/privacy/index')"
			>
				<view class="label">
					{{$t('settings.text3')}}
				</view>
				<view class="name">
					<u-icon name="arrow-right" color="#999" size="32rpx"></u-icon>
				</view>
			</view> -->
			
		</view>
				<u-picker 
				:cancelText="$t('userinfo.text15')"
				:confirmText="$t('userinfo.text16')"
					:show="showLanguage" 
					:columns="columns"
					closeOnClickOverlay
					@close="showLanguage=false"
					@cancel="showLanguage=false"
					@confirm="confirmLanguage"
					keyName="name"
					></u-picker>
	</view>
</template>

<script>
	
	import { mapGetters } from 'vuex'
	
	export default {
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			console.log(this.userInfo)
		},
		data() {
			return {
				showLanguage: false,
				columns: [[
					{name: this.$t('settings.text5'), label: 'zh'},
					{name: this.$t('settings.text6'), label: 'Portugal'},
				]]
			};
		},
		methods: {
			async confirmLanguage({value}){
				
				await this.$store.dispatch('Language', value[0].label)
				this.showLanguage = false
				this.$i18n.locale = value[0].label
				this.$modal.msg(this.$t('popUp.text15'))
				this.setTabBarItem()
				await this.$dDelay(1000)
				this.$tab.navigateBack()
			},
			
			setTabBarItem(){
				uni.setTabBarItem({
					index: 0,
					text: this.$t('tabbar.one')
				})
				uni.setTabBarItem({
					index: 1,
					text: this.$t('tabbar.tow')
				})
				uni.setTabBarItem({
					index: 2,
					text: this.$t('tabbar.three')
				})
				uni.setTabBarItem({
					index: 3,
					text: this.$t('tabbar.four')
				})
				uni.setTabBarItem({
					index: 4,
					text: this.$t('tabbar.five')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_settings {
		padding: 140rpx 20rpx 20rpx 20rpx;
		color: #858992;
		
		.form_section{
			padding: 0 20rpx;
			.form_s_item {
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				border-bottom: 1px solid #444;
				
				.name{
					align-items: center;
					& > text:nth-child(1){
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>