<template>
	<view class="game_footer">
		<!-- <view class="fo_nav game_flex">
			<view class="game_flex d_border12 align_center">
				<text>{{userInfo.upmoeny || 0}}</text>
				<text>{{$t('footer.text1')}}</text>
			</view>
			<view class="game_flex d_border12 align_center">
				<text>{{userInfo.gamenum || 0}}</text>
				<text>{{$t('footer.text2')}}</text>
			</view>
		</view>

		<view class="fo_list game_flex">
			<view class="li_fl game_flex game_flex1">
				<text style="color: #98abd0;">{{$t('footer.text10')}}</text>
				<text v-for="item in leftList" :key="item.gameCode" @tap="enterGameBtn(item)">{{item.gameName}}</text>
			</view>
			<view class="li_fr game_flex game_flex1">
				<text style="color: #98abd0;">{{$t('footer.text3')}}</text>
				<text @tap="$tab.navigateTo(`/pages/footer-details/index?id=${item.id}`)" v-for="item in fooList"
					:key="item.id">{{item.title}}</text>
			</view>
		</view>

		<view class="fo_share game_flex">
			<u-icon size="40rpx" :name="item" v-for="(item,index) in shareList" :key="index"></u-icon>
		</view>

		<view class="fo_introduce">
			<view>{{$t('footer.text8')}}</view>
			<view style="min-height: 200rpx;">
				<u-parse :content="userDetails.content"></u-parse>
			</view>
		</view> -->

	<!-- 	<view class="fo_advertisement game_flex">
			<view v-for="(item,index) in advertisementList" :key="index">
				<u--image :showLoading="true" :src="item" width="100%" height="50rpx"></u--image>
			</view>
		</view> -->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getLeft
	} from '@/api/jogos.js'
	import {
		foolDetails
	} from '@/api/mine.js'

	import {
		commonalityInstruc
	} from '@/api/jogos.js'

	export default {
		name: "GameFooter",
		computed: {
			...mapGetters(['userInfo'])
		},
		created() {
			this.getFoolDetails()
			this.getCommonalityInstruc()
			this.getLeft()
		},
		data() {
			return {
				shareList: [
					require('@/static/images/footer/i.png'),
					require('@/static/images/footer/g.png'),
					require('@/static/images/footer/f.png'),
					require('@/static/images/footer/t.png'),
					require('@/static/images/footer/i.png'),
					require('@/static/images/footer/d.png'),
					require('@/static/images/footer/w.png'),
				],
				advertisementList: [
					require('@/static/images/footer/google.png'),
					require('@/static/images/footer/facebook.png'),
					require('@/static/images/footer/caleta.png'),
					require('@/static/images/footer/evoplay.png'),
					require('@/static/images/footer/ezugi.png'),
					require('@/static/images/footer/redtiger.png'),
					require('@/static/images/footer/iron.png'),
					require('@/static/images/footer/evolution.png'),
				],
				fooList: [],
				userDetails: {},
				leftList: [],
				timer: null
			};
		},
		methods: {
			async getFoolDetails() {
				let {
					code,
					data
				} = await foolDetails()
				if (code == 200) {
					this.fooList = data
				}
			},

			async getCommonalityInstruc() {
				// 8 = 关于我们
				let {
					code,
					data
				} = await commonalityInstruc(8)
				if (code == 200) {
					this.userDetails = data
				}
			},

			async getLeft() {
				let {
					code,
					data
				} = await getLeft()
				if (code == 200) {
					this.leftList = data
				}
			},

			enterGameBtn(row) {
				this.$store.dispatch('setFlPopup', false)
				this.$dDelay(200).then(() => {
					this.$tab.navigateTo(`/pages/jogos/game-intro/index?id=${row.id}`)
				})
			},

		
		},
		
	}
</script>

<style lang="scss" scoped>
	.game_footer {
		margin-top: 20rpx;
		height:100rpx;
		}
	// .game_footer {
	// 	padding: 40rpx 20rpx 100rpx 20rpx;
	// 	margin-top: 20rpx;
	// 	// height: 600rpx;
	// 	color: #eaeaea;
	// 	background-color: #191723;

	// 	.fo_nav {
	// 		height: 160rpx;
	// 		justify-content: space-between;

	// 		&>view {
	// 			padding: 30rpx 0;
	// 			width: 48%;
	// 			flex-direction: column;
	// 			justify-content: space-around;
	// 			height: 100%;
	// 			color: #fff;
	// 			background-color: #353a44;

	// 			&>text:nth-child(1) {
	// 				font-size: 42rpx;
	// 				font-weight: 700;
	// 				color: #437bde;
	// 			}
	// 		}
	// 	}

	// 	.fo_list {
	// 		margin-top: 30rpx;

	// 		&>view {
	// 			flex-direction: column;

	// 			&>text {
	// 				height: 50rpx;
	// 				font-size: 20rpx;
	// 				color: #58657c;
	// 			}
	// 		}
	// 	}

	// 	.fo_share {
	// 		height: 60rpx;

	// 		.u-icon {
	// 			margin-right: 10rpx;
	// 		}
	// 	}

	// 	.fo_introduce {
	// 		font-size: 24rpx;
	// 		color: #58657c;

	// 		&>view:nth-child(1) {
	// 			margin: 10rpx 0;
	// 			color: #98abd0;
	// 			font-weight: 700;
	// 			font-size: 30rpx;
	// 		}

	// 		&>view:nth-child(2) {
	// 			line-height: 36rpx;
	// 		}
	// 	}

	// 	.fo_advertisement {
	// 		margin-top: 20rpx;
	// 		flex-wrap: wrap;

	// 		&>view {
	// 			width: 25%;
	// 			height: 80rpx;
	// 		}
	// 	}
	// }
</style>