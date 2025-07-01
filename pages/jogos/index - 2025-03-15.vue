<template>
	<view class="d_jogos">
		<game-header />


		<view class="game_notice">
			<u-notice-bar :text="noticeList" direction="column" bgColor="transparent"
				:icon="require('@/static/images/jogos/marquee.png')"></u-notice-bar>
		</view>
		<view class="d_j_banner d_bgColor">
			<u-swiper :list="bannerList" circular keyName="image" indicator indicatorMode="dot" height="340rpx"
				previousMargin="30" bgColor="transparent" nextMargin="30" radius="6"></u-swiper>
		</view>


		<view class="margin_con">
			<view class="d_j_nav game_flex d_bgColor">
				<view v-for="item in gameNavList"
					:class="[item.status == navItemStatus ? 'cu_d_j_n_item' : '', 'd_j_n_item', 'game_flex', 'd_border12', 'game_flex1']"
					@tap="changeNavItem(item.status)">
					<view class="top">
						<u--image :src="item.status == navItemStatus ? item.currUrl : item.url" width="40rpx"
							height="40rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
					</view>
				</view>
			</view>

			<view class="show_search" v-if="navItemStatus != 1 && navItemStatus != 4">
				<u--input :placeholder="$t('jogos.text15')" border="none" v-model="searchForm.keyword"
					:customStyle="{'background': '#0e131b', height: '80rpx', padding: '0 20rpx', border: '2px solid #485365', borderRadius: '12rpx'}"></u--input>
			</view>
			<!-- searchGameList -->

			<template v-if="showSearchList">
				<view class="search_list game_flex ">
					<view class="search_list_item" v-for="item in searchGameList" :key="item.id"
						@tap="enterGameBtn(item)">
						<u--image radius="10rpx" :src="item.imageUrl" width="100%" height="300rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
					</view>
					
					<u-empty class="u_empty" 
					:text="$t('userinfo.text19')"
					:show="searchGameList.length == 0">
					</u-empty>

				</view>
			</template>

			<template v-else>
				<view class="d_j_list d_bgColor d_border22" v-for="(key,value) in gameList" :key="value">
					<view class="d_jl_top d_flex">
						<u--image class="fl" :src="key.img" width="50rpx" height="50rpx">
							<template v-slot:loading>
								<u-loading-icon color="#666"></u-loading-icon>
							</template>
						</u--image>
						<view class="con">
							{{value}}
						</view>
						<view class="fr game_flex d_border12"
							@tap="$tab.navigateTo(`/pages/jogos/game-details/index?gameType=${key.data[0].gameType}&platType=${key.data[0].platType}`)">
							<text>{{$t('jogos.text14')}}</text>
						</view>
					</view>

					<view class="d_jl_list game_flex">
						<view class="d_jl_list_item" v-for="item in key.data" :key="item.id" @tap="enterGameBtn(item)">
							<u--image radius="10rpx" :src="item.imageUrl" width="100%" height="300rpx">
								<template v-slot:loading>
									<u-loading-icon color="#666"></u-loading-icon>
								</template>
							</u--image>
						</view>
					</view>


				</view>
			</template>
		</view>



		<view class="d_kefu" @tap="openCall">
			<u-icon name="../../static/images/jogos/dianban1.png" color="#2979ff" size="80rpx"></u-icon>
		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="0" />

		<game-announcement :content="announcementData" />

	<!-- 	<u-popup :round="10" mode="center" :show="showCallPopup" @close="announcementData=false">
			<view class="call_popup">
				<web-view src="https://www.baidu.com"></web-view>
			</view>
		</u-popup> -->

	</view>
</template>

<script>
	import {
		banner,
		gameList,
		enterGame,
		notice,
		fuzzyQueryGame,
		announcementData,
		getGame
	} from '@/api/jogos.js'


	import {
		mapGetters
	} from 'vuex'

	export default {
		computed: {
			...mapGetters(['userInfo', 'token'])
		},
		data() {
			return {
				navItemStatus: 1,
				loginNavInfo: [{
						name: this.$t('popUp.text5')
					},
					{
						name: this.$t('popUp.text6')
					},
				],
				value: '',
				gameNavList: [{
						url: require('@/static/images/jogos/paging-all.png'),
						currUrl: require('@/static/images/jogos/paging-all1.png'),
						status: 1
					},

					{
						url: require('@/static/images/jogos/paging-hot.png'),
						currUrl: require('@/static/images/jogos/paging-hot1.png'),
						status: 3
					},
					{
						url: require('@/static/images/jogos/paging-favorite.png'),
						currUrl: require('@/static/images/jogos/paging-favorite1.png'),
						status: 4
					},
					{
						url: require('@/static/images/jogos/paging-pg.png'),
						currUrl: require('@/static/images/jogos/paging-pg1.png'),
						status: 5
					},
					{
						url: require('@/static/images/jogos/paging-evo.png'),
						currUrl: require('@/static/images/jogos/paging-evo1.png'),
						status: 6
					},{
						url: require('@/static/images/jogos/pp.png'),
						currUrl: require('@/static/images/jogos/pps.png'),
						status: 7
					},{
						url: require('@/static/images/jogos/ag.png'),
						currUrl: require('@/static/images/jogos/ags.png'),
						status: 8
					},{
						url: require('@/static/images/jogos/yu.png'),
						currUrl: require('@/static/images/jogos/yus.png'),
						status: 10
					}

				],
				gameList: [],

				LoginName: this.$t('popUp.text7'),
				columns: [
					[{
							name: this.$t('settings.text5'),
							label: 'zh'
						},

						{
							name: this.$t('settings.text6'),
							label: 'Portugal'
						},
					]
				],
				showNoticeDot: false,
				showSearchList: false,
				searchForm: {
					keyword: '',
					page: 1,
					list: 10
				},
				total: undefined,
				status: 'loadmore',
				searchGameList: [],
				// 轮播图数据
				bannerList: [],
				announcementData: [],
				noticeList: [],

				showCallPopup: false
			}
		},
		onLoad() {
			this.getBanner()
			this.getBameList()
			this.getNoticeList()
			this.getAnnouncementData()
		},
		methods: {

			async getBanner() {
				let {
					data,
					code
				} = await banner()
				if (code == 200) {
					data.map(item => {
						return item.image = this.$config.baseImgUrl + item.image
					})
					this.bannerList = data
				}
			},

			async getBameList() {
				let {
					data,
					code
				} = await gameList({
					status: this.navItemStatus
				})
				if (code == 200) {
					this.gameList = data
					console.log(data,123)
				}
			},

			changeNavItem(status) {
				this.navItemStatus = status
				this.showSearchList = false
				// 收藏列表
				if (status == 4) return this.getGame()

				this.getBameList()
			},
			// 进入游戏
			async enterGameBtn(row) {
				this.$tab.navigateTo(`/pages/jogos/game-intro/index?id=${row.id}`)
				// return
				// if (!this.$isLogin()) {
				// 	return this.$store.dispatch('setLoginPopup', true)
				// }
				// const form = {
				// 	ispc: "device1",
				// 	back: "/",
				// 	gameCode: row.gameCode,
				// 	gameType: row.gameType,
				// 	platType: row.platType

				// }
				// let {
				// 	code,
				// 	data
				// } = await enterGame(form)
				// if (code == 200) {
				// 	window.location.href = data
				// }
			},

			// 获取收藏游戏列表
			async getGame() {
				let {
					code,
					data
				} = await getGame()
				if (code == 200) {
					this.searchGameList = data
					this.showSearchList = true
				}
			},

			// async confirmLanguage({
			// 	value
			// }) {

			// 	await this.$store.dispatch('Language', value[0].label)
			// 	this.$i18n.locale = value[0].label
			// 	this.$modal.msg(this.$t('popUp.text15'))
			// 	this.setTabBarItem()
			// },

			setTabBarItem() {
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
			},

			// 复制内容
			copyData() {
				let _this = this
				uni.setClipboardData({
					data: String(_this.userInfo.id),
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					}
				})
			},

			async getFuzzyQueryGame() {
				this.showSearchList = true

				let {
					code,
					data
				} = await fuzzyQueryGame(this.searchForm)
				if (code == 200) {

					this.total = data.tal
					this.status = 'loadmore'
					this.searchGameList = this.searchGameList.concat(data.data)
					if (this.searchForm.list > data.data.length) {
						return this.status = 'nomore'
					}
				}
			},

			// 获取首页公告
			async getAnnouncementData() {
				let {
					code,
					data
				} = await announcementData()
				if (code == 200) {
					this.announcementData = data.data
					this.$store.dispatch('setAnnouncementPopup', true)
				}
			},

			// 获取首页轮播消息
			async getNoticeList() {
				let {
					code,
					data
				} = await notice()
				if (code == 200) {
					this.noticeList = data
				}
			},
			openCall() {
					window.location.href = "https://www.baidu.com";
				// this.$tab.navigateTo('/pages/web-view/index?url=https://direct.lc.chat/16299930/')
			}
		},
		watch: {
			'searchForm.keyword'() {
				this.searchGameList = []
				this.total = 0
				this.searchForm.page = 1
				this.searchForm.list = 10

				if (this.searchForm.keyword) {
					this.getFuzzyQueryGame()
				} else {
					this.showSearchList = false;
				}
			}

		},
		// onHide() {
		// 	clearInterval(this.timer)
		// },
		// onUnload(){
		// 	clearInterval(this.timer)
		// }
	}
</script>

<style lang="scss" scoped>
	.d_jogos {
		padding-top: 100rpx;

		.d_j_banner {
			padding: 20rpx 0;
		}

		.margin_con {
			margin: 20rpx 5rpx;

			.d_j_nav {
				margin: 0 10rpx;
				position: relative;
				align-items: center;
				height: 60rpx;
				background-color: #2b283c;

				.d_j_n_item {
					margin-right: 20rpx;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					height: 100%;
					color: #838ca0;
					cursor: pointer;

					.foo {
						margin-top: 6rpx;
					}
				}

				.cu_d_j_n_item {
					position: relative;
					color: #fff;
					background-color: #4180ed;
				}

			}
		}




		.search_list {
			padding-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			height: 600rpx;

			.search_list_item {
				margin-bottom: 20rpx;
				margin-right: 14rpx;
				width: 32%;
				.text {
					margin: 10rpx;
					color: #838ca0;
					font-size: 24rpx;
				}
			}
			.search_list_item:nth-child(3n){
				margin-right: 0;
			}
			
		}

		::v-deep .uni-scroll-view-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			
			.search_list_item:nth-child(3n-1) {
				margin: 0 20rpx;
			}
		}

		.show_search {
			margin: 20rpx 40rpx;
		}

		.d_j_list {
			padding: 10rpx;

			.d_jl_top {
				margin: 10rpx 0;
				color: #6ca6bf;
				align-items: center;

				.con {
					margin: 0 20rpx;
					flex: 1;
					font-size: 32rpx;
					font-weight: 700;
				}

				.fr {
					padding: 0 16rpx;
					height: 40rpx;
					align-items: center;
					font-size: 20rpx;
					color: #fff;
					background-color: #4180ed;
				}
			}

			.d_jl_list {
				padding-top: 20rpx;
				flex-wrap: wrap;
				justify-content: flex-start;

				.d_jl_list_item {
					margin-right: 14rpx;
					margin-bottom: 30rpx;
					width: 32%;
				}
				.d_jl_list_item:nth-child(3n){
					margin-right: 0;
				}

				// &::after{
				// 	content: "";
				// 	flex: 1;
				// }

			}



		}



		.game_record {
			margin: 10rpx 20rpx;
			color: #5b667a;

			// background-color: pink;
			.record_top {
				margin: 0 40rpx;

				.rec_item {
					flex: 1;
					height: 80rpx;
					background: #181f2b;
				}

				.curr_rec_item {
					color: #fff;
					background-color: #4331be;
				}
			}

			.record_list {
				margin: 20rpx 0;

				.list_head {
					height: 70rpx;

					// background-color: #191f2a;
					&>view {
						flex: 1;
					}
				}

				.list_row {
					.list_rows {
						margin-bottom: 20rpx;
						height: 60rpx;

						&>view {
							flex: 1;
						}
					}
				}
			}

		}



		.d_kefu {
			position: fixed;
			bottom: 200rpx;
			right: 40rpx;
			border-radius: 50%;
		}


		.call_popup {
			width: 80vw;
			height: 70vh;
			border-radius: 10px;
			background-color: #fff;
		}
	}
</style>