<template>
	<view>
		<view class="game_bonus">
			<game-header />
			<view class="tit">{{$t('bonus.text1')}}</view>
			<view class="bouns_list">
				<view class="bouns_items" 
				v-for="item in activityList"
				:key="item.id"
				@tap="tcClick(item)" 
				>
				<!--$tab.navigateTo(`/pages/bonus/details/index?id=${item.id}`) -->
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
			</view>
			
			<!-- 底部 -->
			<game-footer />
			
		</view>
		<game-tabbar :tabbarValue="3" />
	</view>
</template>

<script>
	import { activityList } from '@/api/bonus' 
	export default {
		name: "gameBonus",
		data(){
			return {
				activityList: []
			}
		},
		onLoad() {
			this.getActivityList()
		},
		methods: {
			async getActivityList(){
				let {code, data} = await activityList()
				if(code == 200){
					this.activityList = data
				}
			},
			tcClick(item){
				console.log(item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_bonus{
		padding-top: 100rpx;
		margin: 10rpx;
		color: #fff;
		.tit{
			font-size: 40rpx;
		}
		.bouns_list{
			.bouns_items{
				margin-bottom: 20rpx;
				background: #161e2a radial-gradient(ellipse at center 150%,#224393,transparent 68%);
				.items_info{
					padding: 10rpx;
					& > view:nth-child(1){
						font-size: 28rpx;
						margin-bottom: 20rpx;
					}
					& > view:nth-child(2){
						color: #648eb1;
						font-size: 20rpx;
						min-height: 80rpx;
					}
				}
			}
			.bonus_foo{
				height: 40rpx;
				color: #2281f6;
				text-align: center;
			}
		}
	}
</style>