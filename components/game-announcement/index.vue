<template>
	<view class="game_announcement">
		<u-popup 
		:show="showAnnouncementPopup" 
		round="10"
		@close="$store.dispatch('setAnnouncementPopup', false)"
		mode="center">
		
		<scroll-view scroll-y="true" class="announcement_popup">
			<view class="d_border12">
				<u-parse :content="content[index] && content[index].content"></u-parse>
			</view>
			</scroll-view>
			
			<view class="vip_five game_flex game_justify_center">
				<view class="game_flex d_border12 align_center game_justify_center">
					<u-icon name="play-left-fill" 
					
					:color="index == 0 ? '#999' : '#fff'" 
					size="16"
					@tap="previous"
					></u-icon>
				</view>
				<view class="game_flex d_border12 align_center game_justify_center"> 
					<u-icon name="play-right-fill" 
					:color="index == this.content.length-1 ? '#999' : '#fff'"
					size="16"
					@tap="nextPage"
					></u-icon>
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "gameAnnouncement",
		computed: {
			...mapGetters(['showAnnouncementPopup'])
		},
		props: {
			content:{
				type: Array,
				default : () => {[]}
			}
		},
		data() {
			return {
				index: 0
			};
		},
		
		methods: {
			// 上一页
			previous(){
				if(this.index > 0 ) this.index-=1
			},
			
			// 下一页
			nextPage(){
				if(this.index < this.content.length-1 ) this.index+=1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_announcement {
		.announcement_popup{
			padding: 20rpx;
			height: 600rpx;
			width: 550rpx;
			background-color: #1c1b34;
		}
		.vip_five{
			padding-bottom: 10rpx;
			background-color: #1c1b32;
			& > view {
				margin-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
				background-color: #202a38;
				cursor: pointer;
			}
		}
	}
</style>