<template>
	<view>
		<view class="game_bonus">
			<game-header />
<!--      <br/><br/> -->
		<!-- 	<view class="tit">{{$t('bonus.text1')}}</view> -->
			<view class="u-page__item" style="margin-bottom:50rpx;" :style="promotionVisible ? 'margin-top:130rpx;' : 'margin-top:0rpx;'">
				<u-collapse accordion>
					<u-collapse-item  v-for="item in activityList" :key="item.id" @tap="tcClick(item)">
						<view slot="title">
							<view class="bouns_list">
								<view class="bouns_items">
									<u--image  :showLoading="true" radius="6" :src="$config.baseImgUrl + item.image"
										width="100%" height="280rpx" mode="aspectFit"></u--image>
									<view class="items_info">
										<view style="color: #fff;">{{item.titile}}</view>
									</view>
									<!-- <view class="bonus_foo">
										{{$t('bonus.text2')}}
									</view> -->
								</view>
							</view>
						</view>
						<text class="u-collapse-content" v-html="item.content"></text>
						
					</u-collapse-item>
				</u-collapse>
			</view>
			<!--$tab.navigateTo(`/pages/bonus/details/index?id=${item.id}`) -->
			<!-- <view class="bouns_list">
				<view class="bouns_items" 
				v-for="item in activityList"
				:key="item.id"
				@tap="tcClick(item)" 
				>
			
					<u--image 
					:showLoading="true" 
					radius="6"
					:src="$config.baseImgUrl + item.image"
					width="100%" height="280rpx"></u--image>
					<view class="items_info">
						<view>{{item.titile}}</view>
						<view>{{item.stub}}</view>
					</view>
					<view class="bonus_foo">
						{{$t('bonus.text2')}}
					</view>
				</view>
			</view> -->

			<!-- 底部 -->
			<game-footer />

		</view>
		<game-tabbar :tabbarValue="3" />
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		activityList
	} from '@/api/bonus'
	export default {
		name: "gameBonus",
		data() {
			return {
				activityList: []
			}
		},
		computed: {
			...mapGetters(['promotionVisible']),
		},
		onLoad() {
			this.getActivityList()
		},
		methods: {
			async getActivityList() {
				let {
					code,
					data
				} = await activityList()
				if (code == 200) {
					this.activityList = data
				}
			},
			tcClick(item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 0;

		&__item {

			&__title {
				color: $u-tips-color;
				background-color: $u-bg-color;
				padding: 15px;
				font-size: 15px;

				&__slot-title {
					color: $u-primary;
					font-size: 14px;
				}
			}
		}
	}

	.u-collapse-content {
		color: #fff;
		font-size: 14px;
		padding: 0 !important;
	}

	.game_bonus {
		padding-top: 100rpx;
		margin: 10rpx;
		color: #fff;

		.tit {
			font-size: 40rpx;
			margin-bottom: 30rpx;
		}

		.bouns_list {
			.bouns_items {
				// margin-bottom: 20rpx;
				background: #000 radial-gradient(ellipse at center 150%, #000, transparent 68%);

				.items_info {
					padding: 10rpx;

					&>view:nth-child(1) {
						font-size: 28rpx;
						// margin-bottom: 20rpx;
					}

					&>view:nth-child(2) {
						color: #648eb1;
						font-size: 20rpx;
						min-height: 80rpx;
					}
				}
			}

			.bonus_foo {
				height: 40rpx;
				color: #2281f6;
				text-align: center;
			}
		}
	}
	
	
</style>