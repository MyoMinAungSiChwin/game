<template>
	<view class="game_details">
		<u-navbar :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff" leftIconSize="40rpx" leftIcon=""
			:titleStyle="{color: '#fff', fontSize: '32rpx'}" height="320rpx" @leftClick="goBack">
			<view slot="center">
							<view style="color: #fff;
								border-radius: 10rpx;
								margin: 30rpx 0rpx;
								 display: flex;
								 flex-wrap: wrap;
								 align-items: center;">
								<view v-for="(a,b) in scList" :key="b"
									:style="a.title == qiehuanIndex ? 'background-color: #cbbd9e; ' : ''" style=" display: flex; justify-content: center; align-items: center; width: 100rpx; margin-left: 20rpx; margin-bottom: 20rpx;
								border: 1px solid #cbbd9e;
								padding:20rpx;border-radius: 20rpx;" @click="qieHan(a.title)">
									<view>{{a.title}}</view>
								</view>
							</view>
						</view>
		</u-navbar>

		<view class="game_list d_flex">
			<view class="d_jl_list_item" v-for="(item,index) in gameList" :key="index" @tap="enterGameBtn(item)">
				<u--image radius="10rpx" :src="item.imageUrl" width="220rpx" height="150rpx">
					<template v-slot:loading>
						<u-loading-icon color="#666"></u-loading-icon>
					</template>
				</u--image>

				<view class="text d_ellipsis">
					{{item.gameName}}
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="load-more">
				<u-loadmore :status="hasMore ? 'loading' : 'nomore'" :loadText="{
			            loading: 'Loading...',
			            nomore: 'No more'
			          }" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		gameLists,
		enterGame
	} from '@/api/jogos.js'
	export default {
		data() {
			return {
				gameList: [],
				gameType: '',
				platType: '',
				pageNum: 1,
				pageSize: 21,
				hasMore: true,
				loading: false,
				qiehuanIndex: 'all',
				scList: [{
						url: '',
						title: 'all',
					},
					{
						url: '',
						title: 'ag',
					},
					{
						url: '',
						title: 'cp9',
					},
					{
						url: '',
						title: 'gb',
					},
					{
						url: '',
						title: 'jiji',
					},
					{
						url: '',
						title: 'ka',
					},
					{
						url: '',
						title: 'lgd',
					},
					{
						url: '',
						title: 'mg',
					},
					{
						url: '',
						title: 'nw',
					},
					{
						url: '',
						title: 'ps',
					},
					{
						url: '',
						title: 'r88',
					},
					{
						url: '',
						title: 'rt',
					},
					{
						url: '',
						title: 't1',
					}
				],
			};
		},
		onLoad({
			gameType
		}) {
			this.gameType = gameType
			this.getGameList()
		},
		methods: {
			qieHan(item) {
				this.pageNum = 1
				this.pageSize= 21
				this.hasMore = true
				this.loading = false
				this.qiehuanIndex = item
				this.getGameList()
			},
			async getGameList() {
				if (this.loading || !this.hasMore) return;

				this.loading = true;
				uni.showLoading({
					title: 'Loading...'
				});
				try {
					const {
						code,
						data
					} = await gameLists({
						gameType: this.gameType,
						platType: this.qiehuanIndex,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					})
					if (code === 200) {
						this.gameList = this.pageNum === 1 ?
							data.data : [...this.gameList, ...data.data];

						this.hasMore = data.data.length >= this.pageSize;
						this.pageNum += 1;
					}
				} catch (error) {
					console.error('加载失败:', error);
				} finally {
					this.loading = false;
					uni.hideLoading();
				}
			},

			// 进入游戏
			async enterGameBtn(row) {
				this.$tab.navigateTo(`/pages/jogos/game-intro/index?id=${row.id}`)
				return
				if (!this.$isLogin()) {
					return false
				}
				const form = {
					ispc: "device1",
					back: "/",
					gameCode: row.gameCode,
					gameType: row.gameType,
					platType: row.platType

				}
				let {
					code,
					data
				} = await enterGame(form)
				if (code == 200) {
					window.location.href = data
				}
			},
			onReachBottom() {
				this.getGameList();
			},
			goBack(){
				console.log("fanhui")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_details {
		padding: 130rpx 20rpx 20rpx 20rpx;

		.game_list {
			padding-top: 220rpx;
			flex-wrap: wrap;
			justify-content: space-between;

			.d_jl_list_item {
				margin-bottom: 20rpx;
				width: 220rpx;

				.text {
					margin: 10rpx;
					color: #838ca0;
					font-size: 24rpx;
				}
			}
		}

		.load-more {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
		}
	}
</style>