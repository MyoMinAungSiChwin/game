<template>
	<view class="game_intro">
		<game-header />
		<view class="intro">
			<u-icon name="arrow-left" color="#999" size="28rpx"
			class="icon"
			@tap="goBack"
			></u-icon>
			<view class="collect game_flex align_center game_justify_center d_border12"
			@tap="collectBtn"
			>
				<u-icon name="heart" color="#fff" size="28rpx" v-if="gameIntroData.is_collect == 0"
				></u-icon>
				<u-icon name="heart-fill" color="#eb565d" size="28rpx" v-else></u-icon>

				<text>
					{{gameIntroData.is_collect == 0 ? $t('jogos.text27') : $t('jogos.text28')}}
				</text>
			</view>
			<view class="con d_border12"
			:style="{
			    backgroundImage: 'url(' + gameIntroData.imageUrl + ')',
			    backgroundSize: '100% 100%',
			    backgroundRepeat: 'no-repeat'
			  }"
 			>

				<u-button class="u_btn" type="primary" text="Jogus"
				@tap="enterGameBtn"
				></u-button>
				<view class="mask">

				</view>
			</view>
		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar />
	</view>
</template>

<script>
	import { lookLike, likeGame, cLikeGame, enterGame } from '@/api/jogos.js'
	export default {
		data(){
			return {
				gameIntroData: {},
				isCollect: false,
				game_id: ''
			}
		},
		onLoad(options) {
			this.game_id = options.id
			this.getLookLike()
		},
		methods: {
			async getLookLike(){
				let {code, data} = await lookLike(this.game_id)
				console.log(data)
				if(code == 200){
					this.gameIntroData = data
				}
			},
			// 收藏
			async setLikeGame(){
				let {code, data} = await likeGame(this.game_id)
				console.log(data)
				if(code == 200){
					this.getLookLike()
				}
			},
			// 取消收藏
			async setCLikeGame(){
				let {code, data} = await cLikeGame(this.game_id)
				console.log(data)
				if(code == 200){
					this.getLookLike()
				}
			},

			collectBtn(){
				let is_collect = this.gameIntroData.is_collect

				if(is_collect == 0) {
					this.setLikeGame()

				}else{
					this.setCLikeGame()
				}
			},
			goBack(){
				uni.switchTab({
					url:"/pages/jogos/index"
				})
			},
			// 进入游戏
			async enterGameBtn() {
				if (!this.$isLogin()) {
					return this.$store.dispatch('setLoginPopup', true)
				}
				console.log(this.gameIntroData)
				const form = {
					ispc: "device1",
					back: "/",
					gameID:this.gameIntroData.gameID,
					gameProviderId:this.gameIntroData.gameProviderId,
					Portfolio:'SeamlessGame',
					gameCode: this.gameIntroData.gameCode,
					gameType: this.gameIntroData.gameType,
					platType: this.gameIntroData.platType

				}
			let data = await enterGame(form)
				if (data.code == 200) {
					console.log(data.data.login_url)
					window.location.href = data.data.login_url
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.game_intro{
		padding: 120rpx 20rpx 0 20rpx;
		color: #fff;
		.intro{
			position: relative;
			padding-top: 80rpx;
			.icon{
				position: absolute;
				left: 0;
				top: 20rpx;
			}
			.collect{
				padding: 0 20rpx;
				position: absolute;
				right: 0;
				top: 0;
				height: 60rpx;
				// width: 200rpx;
				background-color: #252e3f;
				& > text{
					margin-left: 10rpx;
				}
			}
			.con {
				position: relative;
				height: 500rpx;
				.u_btn{
					position: absolute;
					bottom: 20rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 200rpx;
					z-index: 100;
				}
				.mask{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%);
				}
			}
		}
	}
</style>