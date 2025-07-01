<template>
	<view class="game_article">
		<game-header />
		<view class="article">
			<u-parse :content="details.content"></u-parse>
			
			<view class="article_btn">
				<u-button type="primary" :text="$t('account.text1')"  
				@tap="$store.dispatch('setAccountPopup', true)"
				></u-button>
			</view>
		</view>

		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="1" />
	</view>
</template>

<script>
	import {
		commonalityInstruc
	} from '@/api/jogos.js'
	
	export default {
		name: 'gameArticle',
		data() {
			return {
				details: '',
				type: '7' // 首次存款金
			};
		},
		onLoad() {
			this.getCommonalityInstruc()
		},
		methods: {
			async getCommonalityInstruc(){
				let {code, data} = await commonalityInstruc(this.type)
				if(code == 200){
					this.details = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_article {
		padding: 80rpx 20rpx 20rpx 20rpx;
		color: #fff;
		.article{
			padding: 20rpx 0;
			.article_btn{
				.u-button{
					width: 240rpx;
					height: 60rpx;
					background-color: #00b2fb;
				}
			}
		}
	}
</style>