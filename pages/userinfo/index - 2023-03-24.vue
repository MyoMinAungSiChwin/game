<template>
	<view class="game_userinfo">
		<game-header />
		<view class="userinfo">
			<view class="tabs game_flex align_center d_border12">
				<u-icon :name="require('@/static/images/convidar/userinfo.png')" color="#2979ff" size="28"></u-icon>
				<text @tap="showChild = !showChild">{{tabText}}</text>
				<u-icon name="arrow-down" color="#fff" size="28rpx"></u-icon>
				
				  <u-transition :show="showChild">
					  <view class="child_list d_border12">
					  	<view 
						v-for="(item,index) in childList"
						:key="item.text"
						class="game_flex align_center d_border12"
						:class="childIndex == index && 'curr_child'"
						@tap="changeChildItem(item.text, index)"
						>
					  		<u-icon :name="item.flUrl" color="#2979ff" size="28"></u-icon>
					  		<text>{{item.text}}</text>
					  		<u-icon name="checkbox-mark" color="#4180ed" size="28rpx"
							v-show="childIndex == index"
							></u-icon>
					  	</view>
					  </view>
				    </u-transition>
			</view>
			
			<view class="info_one" v-if="tabText === $t('userinfo.text1')">
				<!-- <view class="limit d_border12">
					<view class="game_flex align_center game_justify_center">平衡</view>
					<view>0.00</view>
				</view> -->
				
				<view class="one_dengji d_border12">
					<view class="game_flex align_center game_justify_center">{{$t('userinfo.text5')}}</view>
					<view class="game_flex">
						<view class="fl d_border12">
							<text style="font-size: 30rpx; display: block; text-align: center; margin: 30rpx 0 20rpx 0;">vip-{{vipsInfo.level}}</text>
							<u--image 
							style="margin-left: 30rpx;"
							:src="$config.baseImgUrl + vipsInfo.image" 
							width="180rpx" height="220rpx"></u--image>
						</view>
						<view class="fr d_border12">
							<view class="d_border12 game_flex">
								<view>{{$t('userinfo.text11')}}</view>
								<view>{{vipsInfo.bet}}</view>
								<view>
									<u-line-progress :percentage="vipsInfo.bet_b" activeColor="#4e8ff7"></u-line-progress>
								</view>
							</view>
							<view class="d_border12 game_flex">
								<view>{{$t('userinfo.text12')}}</view>
								<view>{{vipsInfo.recharge}}</view>
								<view>
									<u-line-progress :percentage="vipsInfo.recharge_b" activeColor="#4e8ff7"></u-line-progress>
								</view>
							</view>
							
							<text @tap="$tab.navigateTo('/pages/vip/index')">
								{{$t('userinfo.text7')}}
							</text>
						</view>
					</view>
				</view>
				
				<view class="one_foos">
					<view class="game_flex align_center game_justify_center d_border12">{{$t('userinfo.text32')}}</view>
					<view>
						<view>R$ {{userInfo.current_mosaic}}/ R$ {{userInfo.current_mosaic}}</view>
						<view>
							<u-line-progress :percentage="completionPercentage.toFixed(2)" activeColor="#4e8ff7"></u-line-progress>
						</view>
						<view>
							{{$t('userinfo.text10')}}
						</view>
						<view class="game_flex">
							<view class="game_flex align_center d_border12">
								<text>
									{{userInfo.current_mosaic >= 1 ? userInfo.current_mosaic : 0}}
								</text>
								<text>{{$t('userinfo.text30')}}</text>
							</view>
							<view class="game_flex align_center d_border12">
								<text>
									{{userInfo.current_mosaic >= 1 ? userInfo.record_amount : 0}}
								</text>
								<text>{{$t('userinfo.text31')}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="info_tow" v-if="tabText === $t('userinfo.text2')">
				<u-tabs :list="towTabs" :activeStyle="{color: '#4180ed'}" :inactiveStyle="{color: '#fff'}"
				@change="changeTows"
				></u-tabs>
			
				<view class="tow_table">
					<!-- 提现 -->
					<template v-if="towsType == $t('userinfo.text8')">
						<withdraw />
					</template>
					<!-- 充值 -->
					<template v-if="towsType == $t('userinfo.text12')">
						<filling />
					</template>
				
					<!-- 流水 -->
					<template v-if="towsType == $t('userinfo.text13')">
						<running />
					</template>
					<!-- 返利 -->
					<template v-if="towsType == $t('userinfo.text14')">
						<rebate />
					</template>
					
					<template v-if="towsType == $t('userinfo.text33')">
						<invitation />
					</template>
				</view>
			</view>
			
		
		</view>	
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="4" />
	</view>
</template>

<script>
	import { 
		gamevipsInfo, 
		gameRebate
	 } from '@/api/userinfo.js'
	 
	 import rebate from './child/rebate.vue'
	 import running from './child/running.vue'
	 import filling from './child/filling.vue'
	 import withdraw from './child/withdraw.vue'
	 import invitation from './child/invitation.vue'
	 
	 import {
	 	mapGetters
	 } from 'vuex'
	 
	export default {
		name: 'gameUserinfo',
		components:{
			rebate,
			running,
			filling,
			withdraw,
			invitation
		},
		computed: {
			...mapGetters(['userInfo']),
			completionPercentage() {
			    if (this.userInfo.current_mosaic <= 0) {
			      return 0; // 避免除以0的情况
			    }
			    return (this.userInfo.record_amount / this.userInfo.current_mosaic) * 100;
			  }
		}, 
		onLoad(options) {
			if(options.text){
				this.tabText = options.text
			}
			console.log(11)
			if (this.$isLogin()) {
				this.getGamevipsInfo()
			}
			
		}, 
		
		data() {
			return {
				showChild: false,
				childIndex: 0,
				tabText: this.$t('userinfo.text1'),
				childList: [
					{text: this.$t('userinfo.text1'), flUrl: require('@/static/images/convidar/userinfo.png')},
					{text: this.$t('userinfo.text2'), flUrl: require('@/static/images/convidar/userinfo.png')},
					{text: this.$t('userinfo.text3'), flUrl: require('@/static/images/convidar/userinfo.png')},
				],
				towTabs: [
					{name: this.$t('userinfo.text8')},
					{name: this.$t('userinfo.text12')},
					{name: this.$t('userinfo.text13')},
					{name: this.$t('userinfo.text14')},
					{name: this.$t('userinfo.text33')},
				],
				vipsInfo: {},
				towsType: this.$t('userinfo.text12'),
				
			};
		},
		methods: {
			changeChildItem(text,index){
				if(index == 2) return this.$tab.switchTab('/pages/convidar/index')
				this.tabText = text
				this.childIndex = index
				this.showChild = false
			},
			
			async getGamevipsInfo(){
				let {code,data} = await gamevipsInfo()
				console.log(data)
				if(code == 200){
					this.vipsInfo = data
				}
			},
			
			changeTows({name}){
				this.towsType = name
			}
		}
	}
</script>

<style lang="scss" scoped>
.game_userinfo{
	padding-top: 120rpx;
	color: #fff;
	.userinfo{
		.tabs{
			position: relative;
			flex-wrap: wrap;
			padding: 0 20rpx;
			height: 70rpx;
			border: 2px solid #2d3544;
			& > text{
				margin-left: 20rpx;
				flex: 1;
			}
			
			.child_list{
				position: absolute;
				top: 70rpx;
				left: 0;
				width: 100%;
				color: #444;
				z-index: 100;
				background-color: #ffffff;
				& > view {
					padding: 0 20rpx;
					height: 70rpx;
					& > text {
						padding-left: 20rpx;
						flex: 1;
					}
				}
				.curr_child{
					background-color: #f3f3f5;
					color: #4e8ff7;
				}
			}
		}
		.info_one{
			.limit{
				margin: 30rpx 10rpx 0 10rpx;
				padding: 30rpx;
				background-color: #181e27;
				& > view:nth-child(1){
					height: 70rpx;
					width: 100%;
					font-size: 34rpx;
					background-color: #323947;
				}
				& > view:nth-child(2){
					margin-top: 30rpx;
					font-size: 28rpx;
				}
			}
			.one_dengji{
				margin: 20rpx 10rpx;
				padding: 30rpx;
				background-color: #181e27;
				& > view:nth-child(1){
					height: 80rpx;
					font-size: 32rpx;
					font-weight: 700;
					background-color: #323947;
				}
				& > view:nth-child(2){
					margin-top: 20rpx;
					.fl{
						width: 240rpx;
						height: 360rpx;
						background-color: #28364f;
					}
					.fr{
						margin-left: 20rpx;
						flex: 1;
						& > view {
							flex-direction: column;
							justify-content: space-around;
							padding: 20rpx;
							margin-bottom: 20rpx;
							height: 170rpx;
							background-color: #323947;
							& > view:nth-child(1){
								font-size: 38rpx;
								font-weight: 700;
								text-align: center;
							}
							& > view:nth-child(2){
								height: 40rpx;
								line-height: 40rpx;
							}
							& > view:nth-child(3){}
						}
						& > text:last-child{
							display: block;
							text-align: center;
							color: #eb4749;
						}
					}
				}
			}
			
			.one_foos{
				padding: 20rpx;
				background-color: #191e26;
				& > view:nth-child(1){
					height: 80rpx;
					font-size: 32rpx;
					font-weight: 700;
					background-color: #323947;
				}
				& > view:nth-child(2){
					& > view:nth-child(1){
						height: 50rpx;
						line-height: 50rpx;
						font-weight: 700;
					}
					& > view:nth-child(2){
						margin: 20rpx 0;
					}
					& > view:nth-child(3){
						height: 50rpx;
						line-height: 50rpx;
						font-weight: 700;
					}
					& > view:nth-child(4){
						justify-content: space-between;
						& > view{
							flex-direction: column;
							padding: 20rpx;
							font-size: 22rpx;
							width: 49%;
							font-weight: 700;
							height: 100rpx;
							background-color: #323947;
						}
					}
				}
			}
		}
		
		.info_tow{
			padding: 20rpx;
			padding-bottom: 50rpx;
			background-color: #1e2531;
			.tow_table{
				
			}
		}
		
	}
}
</style>
