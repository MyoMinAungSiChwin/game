<template>



	<view class="d_jogos">

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
		<view id="appBanner" style="
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #e0e0e0;
			border-top-left-radius: 16px;
			border-top-right-radius: 16px;
			box-shadow: 0 -2px 20px rgba(0,0,0,0.1);
			padding: 24rpx 30rpx 40rpx;
			z-index: 9999;
			font-family: 'Helvetica Neue', sans-serif;
			text-align: center;
			">
			<!-- Close Button -->
			<view style="
				position: absolute;
				top: 16rpx;
				right: 20rpx;
				width: 40rpx;
				height: 40rpx;
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 50%;
				font-size: 28rpx;
				font-weight: bold;
				line-height: 40rpx;
				text-align: center;
				color: #333;
				cursor: pointer;
			" @click="closeBanner">
				×
			</view>

			<!-- Top Text -->
			<view style="
				font-size: 28rpx;
				color: #333;
				margin-bottom: 20rpx;
				line-height: 1.4;
			">
				{{ $t('jogos.text35') }}
				<hr style="margin-top: 20rpx; margin-bottom: 20rpx; border: none; border-top: 2rpx solid #ccc;">
			</view>

			<!-- Action Buttons -->
			<view style="
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 20rpx;
				flex-wrap: wrap;
			">
				<!-- Android Button -->
				<view style="position: relative;">
				<a href="https://download.blackdiamond.tv" style="
					background-color: #3ddc84;
					padding: 16rpx 32rpx;
					border-radius: 12rpx;
					color: #fff;
					font-weight: bold;
					font-size: 28rpx;
					text-decoration: none;
					display: inline-flex;
					align-items: center;
					gap: 10rpx;
				">
					<i class="fab fa-android"></i> {{ $t('jogos.text33') }}
				</a>
				</view>

				<!-- iOS Button -->
				<a href="https://zjqyn.reutu.com/ABU125VNF/ywexymvizg" style="
				border: 2rpx solid #007aff;
				padding: 16rpx 32rpx;
				border-radius: 12rpx;
				color: #007aff;
				font-weight: bold;
				font-size: 28rpx;
				text-decoration: none;
				display: inline-flex;
				align-items: center;
				gap: 10rpx;
				background-color: #fff;
				">
				<i class="fab fa-apple"></i> {{ $t('jogos.text34') }}
				</a>
			</view>
		</view>






		<view class="d_j_banner d_bgColor">

			<!-- 覆盖内容 -->
			<view style="position: relative; z-index: 1;" class="header-section">
				<game-header />
				<!-- 将您的内容放在这里 -->
				<view class="d_j_banner d_bgColor"
					:style="promotionVisible ? 'margin-top:200rpx;' : 'margin-top:100rpx;'">
					<u-swiper :list="bannerList" circular keyName="image" indicator indicatorMode="dot" height="340rpx"
						previousMargin="30" bgColor="transparent" nextMargin="30" radius="6"></u-swiper>
				</view>
				<view class="game_notice">
					<u-notice-bar :text="noticeList" direction="row" bgColor="transparent"
						:icon="require('@/static/images/jogos/marquee.png')"></u-notice-bar>
				</view>
				<view class="margin_con">
					<!-- d_bgColor -->
					<view class="d_j_nav game_flex " style="background-color:transparent !important;">
						<view style="width: 100%; overflow-x: auto;">
							<u-grid :border="false" col="7" style="width: 100%; display: flex; flex-wrap: nowrap;">
								<u-grid-item v-for="(listItem, listIndex) in newGameNavList" :key="listIndex"
									@tap="changeNavItem(listItem, listIndex)"
									style="flex-shrink: 0; position: relative;">
									<!-- 图标部分 -->
									<u-image :src="listIndex === navItemStatus ? listItem.select_url : listItem.url"
										mode="widthFix" width="100rpx" height="100rpx">
										<template v-slot:loading>
											<u-loading-icon color="#666"></u-loading-icon>
										</template>
									</u-image>

									<!-- 文字标签 -->
									<view v-if="listIndex === navItemStatus" :style="{
										backgroundColor: listIndex === navItemStatus ? '#bb9b48' : 'transparent',
										padding: listIndex === navItemStatus ? '0rpx 10rpx' : '0',
										borderRadius: '10rpx'
									}" style="
				                    transition: all 0.3s;
				                    margin-top: 10rpx;
				                    text-align: center;
									font-size: 23rpx;font-weight: 600;line-height:1.5;white-space: nowrap;
				                ">
										<text v-if="$store.state.user.language" :style="{
											color: listIndex === navItemStatus ? '#333' : '#fff',
											fontSize: '20rpx',
											opacity: listIndex === 0 ? 1 : (listIndex === navItemStatus ? 1 : 0)
										}">

											{{ $store.state.user.language === 'zh' ? listItem.title :
												listItem[$store.state.user.language] }}
										</text>
										<text v-else :style="{
											color: listIndex === navItemStatus ? '#333' : '#fff',
											fontSize: '20rpx',
											opacity: listIndex === 0 ? 1 : (listIndex === navItemStatus ? 1 : 0)
										}">

											{{ listItem.title }}
										</text>
									</view>
								</u-grid-item>
							</u-grid>
						</view>
						<!-- 		<view v-for="item in gameNavList"
						:class="[item.status == navItemStatus ? 'cu_d_j_n_item' : '', 'd_j_n_item', 'game_flex', 'd_border12', 'game_flex1']"
						@tap="changeNavItem(item.status)">
						<view class="top">
							<u--image :src="item.status == navItemStatus ? item.currUrl : item.url" mode="widthFix" width="148rpx"
								height="148rpx">
								<template v-slot:loading>
									<u-loading-icon color="#666"></u-loading-icon>
								</template>
							</u--image>
						</view>
					</view> -->
					</view>
					<!-- 厂商 -->
					<view style="color: #fff;
						margin:10rpx 10rpx; !important;
						 display: flex;
						 flex-wrap: wrap;
						 align-items: center;" v-if="!dzpk_show && newGameNavList[navItemStatus]['child'] && !is_hot">
						<view class="game_flex d_bgColor"
							style=" width: 100%;height: 150rpx;border-radius: 10px;align-items: center;background-color: #2b283c;">
							<view style="width: 100%; overflow-x: auto;">
								<u-grid :border="false" col="4"
									style="width: 100%; display: flex; flex-wrap: nowrap; overflow-x: auto;">
									<u-grid-item v-for="(listItem, listIndex) in newGameNavList[navItemStatus]['child']"
										:key="listIndex" @tap="qieHan(listItem)">
										<view style="display: flex; align-items: center; flex-direction: column;">
											<u--image :src="listItem.provider.logo" mode="widthFix" width="100rpx"
												height="48rpx">
												<template v-slot:loading>
													<u-loading-icon color="#666"></u-loading-icon>
												</template>
											</u--image>
											<text style="color: #fff; font-size: 20rpx; text-align: center;">
												{{ $store.state.user.language == 'zh' ? listItem.provider.providerNameCN
													:
												listItem.provider.name}}
											</text>
										</view>

									</u-grid-item>
								</u-grid>
							</view>


						</view>
						<!-- <view v-for="(a,b) in gameNavList[navItemStatus]['child']" :key="b"
							:style="a.title == qiehuanIndex ? 'background-color: #cbbd9e; ' : ''" style=" display: flex; justify-content: center; align-items: center; width: 160rpx; margin-left: 20rpx; margin-bottom: 20rpx;
						border: 1px solid #cbbd9e;
						padding:20rpx;border-radius: 20rpx;" @tap="qieHan(a)">
							<view>{{a.title}}</view>
						</view> -->
					</view>

					<!--end 厂商 -->
					<view class="show_search" v-if="!dzpk_show">
						<u--input clearable color="#fff" :placeholder="$t('jogos.text15')" border="none"
							v-model="keyword" @input="inputChange" @clear="inputClear"
							:customStyle="{ 'background': 'black', height: '80rpx', padding: '0 20rpx', border: '2px solid #485365', borderRadius: '12rpx' }"></u--input>
					</view>
					<!-- searchGameList -->

					<template v-if="showSearchList">
						<view class="d_j_list d_bgColor d_border22" v-if="searchGameList.length > 0">
							<view class="d_jl_top d_flex">
							</view>
							<view class="d_jl_list game_flex">
								<view class="d_jl_list_item" v-for="(item, child) in searchGameList" :key="item.id"
									@tap="enterGameBtn(item)">
									<view class="image-container">
										<u--image radius="10rpx" :src="item.imageUrl" width="100%" height="300rpx">
											<template v-slot:loading>
												<u-loading-icon color="#666"></u-loading-icon>
											</template>
										</u--image>
										<!-- 左上角标 -->
										<view class="corner-mark left">{{ qiehuanIndex }}</view>

										<!-- 右上角图标 -->
										<!--  <view  class="corner-icon right">	  <u-icon  color="#2979ff" size="28"></u-icon></view> -->

									</view>
									<view v-if="$store.state.user.language === ''"
										style="color: #fff; text-align: center; margin-top: 20rpx;">
										{{ item.gameName_cn }}
									</view>
									<view v-if="$store.state.user.language === 'zh'"
										style="color: #fff; text-align: center; margin-top: 20rpx;">
										{{ item.gameName_cn }}
									</view>
									<view v-if="$store.state.user.language === 'english'"
										style="color: #fff; text-align: center; margin-top: 20rpx;">
										{{ item.gameName }}
									</view>
									<view v-if="$store.state.user.language == 'burmese'"
										style="color: #fff; text-align: center; margin-top: 20rpx;">
										{{ item.gameName_my }}
									</view>
								</view>
							</view>
						</view>
					</template>

					<template v-else>
						<view class="dzpk" v-if="dzpk_show && navItemStatus == 0">
							<!-- 左侧按钮 -->
							<view class="dzpk_left" @click="handleStart">
								<view
									style="display: flex;align-items: center;justify-content: center;color:#cbbd9e;    font-weight: bold;">
									{{ $t('jogos.text30') }}
								</view>
							</view>
						</view>

						<view v-if="dzpk_show && is_other_show">
							<view class="d_j_list d_bgColor d_border22" style="margin-top:10px;">
								<view class="d_jl_list game_flex">
									<view class="d_jl_list_item"
										style="width: 48% !important; height: 98px !important;margin-right: 5px!important;margin:3px;"
										v-for="(v, i) in zrList" :key="i" @tap="zrClick(v)">
										<u--image radius="10rpx" :src="v.url" width="100%" height="98px">
											<template v-slot:loading>
												<u-loading-icon color="#666"></u-loading-icon>
											</template>
										</u--image>

									</view>
								</view>
							</view>
						</view>
						<!-- 	<view style="background-color: #fff;">{{virtualScrollTop}}</view> -->
						<view style="overflow-y: hidden !important;" v-if="!dzpk_show">
							<!-- 	<scroll-view :scroll-top="virtualScrollTop" @scroll="handleScroll"
								@scrolltolower="onScrollToLower" :scroll-y="true" @touchstart="isManualScroll = true"
								@touchend="isManualScroll = false" class="scroll-view" ref="scrollView"> -->
							<view class="d_j_list d_bgColor d_border22" v-if="gameList.length > 0">
								<view class="d_jl_top d_flex">
								</view>
								<view class="d_jl_list game_flex">
									<view class="d_jl_list_item" v-for="(item, child) in gameList" :key="item.id"
										@tap="enterGameBtn(item)">
										<view :id="item.gameID" class="image-container">
											<u--image radius="10rpx" :src="item.imageUrl" width="100%" height="300rpx">
												<template v-slot:loading>
													<u-loading-icon color="#666"></u-loading-icon>
												</template>
											</u--image>
											<!-- 左上角标 -->
											<view class="corner-mark left" v-if="navItemStatus == 1">
												<text v-if="item.provider == 'PragmaticPlay'">
													PP
												</text>
												<text v-else-if="item.provider == 'JiLiGaming'">
													JlLi
												</text>
												<text v-else-if="item.provider == 'pp'">
													PP
												</text>
												<text v-else-if="item.provider == 'pg'">
													PGSolt
												</text>
												<text v-else>
													{{ item.provider }}
												</text>
											</view>
											<view class="corner-mark left" v-else>{{ qiehuanIndex }}</view>

											<!-- 右上角图标 -->
											<!--  <view  class="corner-icon right">	  <u-icon  color="#2979ff" size="28"></u-icon></view> -->

										</view>

										<view v-if="$store.state.user.language === ''"
											style="color: #fff; text-align: center; margin-top: 20rpx;">
											{{ item.gameName_cn }}
										</view>
										<view v-if="$store.state.user.language === 'zh'"
											style="color: #fff; text-align: center; margin-top: 20rpx;">
											{{ item.gameName_cn }}
										</view>
										<view v-if="$store.state.user.language === 'english'"
											style="color: #fff; text-align: center; margin-top: 20rpx;">
											{{ item.gameName }}
										</view>
										<view v-if="$store.state.user.language == 'burmese'"
											style="color: #fff; text-align: center; margin-top: 20rpx;">
											{{ item.gameName_my }}
										</view>

									</view>
								</view>
							</view>

							<!-- 加载提示 -->
							<view class="load-more" v-if="gameList.length > 0">
								<u-loadmore :status="hasMore ? 'loading' : 'nomore'" :loadText="{
									loading: 'Loading...',
									nomore: 'No more'
								}" />
							</view>

							<view class="d_flex" style="color: #fff; height: 344px;
					background-color: #181f2b; align-items: center;" v-if="gameList.length == 0">
								<u-empty class="u_empty" style="text-align: center;" :text="$t('userinfo.text19')">
								</u-empty>

							</view>
							<!-- </scroll-view> -->
						</view>

					</template>
				</view>

				<!-- <view class="d_kefu" @tap="openCall" v-for="(item,index) in kfData" :key="index">
					<u-icon name="../../static/images/jogos/dianban1.png" color="#2979ff" size="80rpx"></u-icon>
				</view> -->
				<view v-for="(item, index) in kfData" :key="index" class="d-kefu-item"
					:style="{ bottom: item.hig_bottom + 'rpx' }" @tap="openCall(item)">
					<u-icon :name="item.avatar" size="80rpx"></u-icon>
				</view>
				<!-- 底部 -->
				<game-footer />
				<game-tabbar :tabbarValue="0" />

				<game-announcement :content="announcementData" />
			</view>
		</view>








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
	getGame,
	getZrList,
	getGameTypeList,
	getCustomerList
} from '@/api/jogos.js'
import _ from 'lodash'
import {
	mapGetters
} from 'vuex'

export default {
	  mounted() {
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.closeBanner();
    }, 5000);
  },
	computed: {
		...mapGetters(['userInfo', 'token', 'promotionVisible']),

	},
	data() {
		return {
			navItemStatus: 0, //导航栏目索引
			loginNavInfo: [{
				name: this.$t('popUp.text5')
			},
			{
				name: this.$t('popUp.text6')
			},
			],
			pageNum: 1,
			pageSize: 150,
			hasMore: true,
			loading: false,
			value: '',
			zrList: [], //真人视讯
			gameList: [], //游戏
			newGameNavList: [], //导航栏
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
			keyword: '',
			total: undefined,
			status: 'loadmore',
			searchGameList: [],
			// 轮播图数据
			bannerList: [],
			announcementData: [],
			noticeList: "",
			dzpk_show: true,
			showCallPopup: false,
			qiehuanIndex: 'Jili',
			gameProviderId: 1020, //捕鱼的 jili
			newGameTypeIds: '', //游戏分类id字符串
			gpid: '',
			is_other_show: false,
			childArr: [],
			_eventBound: false,
			virtualScrollTop: 0, // 虚拟滚动位置
			isManualScroll: false, // 是否用户主动滚动
			saveStateTimer: null, // 状态保存节流计时器
			lang: 'zh',
			is_hot: false,
			kfData: [],
			isng: 0,
			form: {}
		}
	},

	
	onReachBottom() {
		this.onScrollToLower()
	},
	onShow() {
		console.log(this.promotionVisible)
		this.getGameTypeListInfo()
		// this.restoreState();
		this.getZrListInfo()
		this.getBanner()
		this.getNoticeList()
		this.getAnnouncementData()
		this.getCustomerListInfo()
	},
	onHide() {
		this.saveState();
	},
	methods: {
		closeBanner() {
			const banner = document.getElementById("appBanner");
			if (banner) banner.style.display = "none";
		},
		// 打开客服
		async getCustomerListInfo() {
			let {
				data,
				code
			} = await getCustomerList()
			console.log(data)
			if (code == 200) {
				this.kfData = data
			}
		},
		//搜索
		inputChange(e) {
			this.pageNum = 1;
			this.pageSize = 150;
			this.hasMore = true; // 重置为true，允许加载新数据
			this.getBameList();
		},
		inputClear() {
			this.pageNum = 1;
			this.pageSize = 150;
			this.hasMore = true; // 同样重置hasMore
			this.keyword = ''
			this.getBameList();
		},
		// 带节流的状态保存
		saveState() {
			clearTimeout(this.saveStateTimer);
			this.saveStateTimer = setTimeout(() => {
				const state = {
					screenWidth: uni.getSystemInfoSync().windowWidth,
					virtualScrollTop: this.virtualScrollTop,
					realScrollTop: this.realScrollTop,
					pageNum: this.pageNum,
					gameList: this.gameList,
					hasMore: this.hasMore,
					gpid: this.gpid,
					newGameTypeIds: this.newGameTypeIds,
					navItemStatus: this.navItemStatus,
					dzpk_show: this.dzpk_show
				};
				uni.setStorageSync('GAME_LIST_STATE', state);
			}, 300);
		},
		// 增强的状态恢复方法
		async restoreState() {
			const saved = uni.getStorageSync('GAME_LIST_STATE');
			if (!saved) return;
			// 1. 恢复基础状态
			this.navItemStatus = saved.navItemStatus;
			this.dzpk_show = saved.dzpk_show;
			this.gpid = saved.gpid;
			this.newGameTypeIds = saved.newGameTypeIds;
			this.pageNum = 1;
			this.gameList = [];
			this.hasMore = true;

			// 2. 重新加载历史数据
			try {
				await this.preloadPages(saved.pageNum);
			} catch (e) {
				console.error('预加载失败:', e);
				return;
			}

			// 3. 计算并恢复滚动位置
			this.$nextTick(() => {
				this.calcScrollPosition(saved).then(position => {
					this.virtualScrollTop = position;
					this.realScrollTop = position;
				});
			});
		},

		// 分页预加载
		async preloadPages(targetPage) {
			console.log(targetPage)
			while (this.pageNum < targetPage) {
				if (!this.hasMore) break;
				await this.getBameList();
			}
		},
		// 触底分页加载
		async onScrollToLower() {
			if (this.loading || !this.hasMore) return

			// 记录关键参数
			const prev = {
				scrollHeight: await this.getScrollHeight(),
				clientHeight: this.$refs.scrollView.$el.clientHeight,
				pageNum: this.pageNum
			}

			await this.getBameList()

			// 自动调整位置
			this.$nextTick(async () => {
				const currentHeight = await this.getScrollHeight()
				const delta = currentHeight - prev.scrollHeight

				// 非用户滚动时自动修正位置
				if (!this.isManualScroll) {
					this.realScrollTop = prev.scrollHeight - prev.clientHeight
					this.virtualScrollTop = this.realScrollTop
				}
			})
		},
		getScrollHeight() {
			return new Promise(resolve => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.scroll-view').boundingClientRect(res => {
					resolve(res?.height || 0);
				}).exec();
			});
		},
		// 精确计算滚动位置
		async calcScrollPosition(saved) {
			return new Promise(resolve => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.scroll-view').boundingClientRect(async res => {
					if (!res) return resolve(0);

					// 计算比例因子
					const ratio = uni.getSystemInfoSync().windowWidth / saved.screenWidth;
					const adjustedPosition = saved.virtualScrollTop * ratio;

					// 边界检查
					const maxScroll = res.height - this.$refs.scrollView.$el.clientHeight;
					resolve(Math.min(adjustedPosition, maxScroll));
				}).exec();
			});
		},
		// 修改后的滚动处理
		handleScroll: _.throttle(function (e) {
			if (!this.isManualScroll) return;

			this.virtualScrollTop = e.detail.scrollTop;
			console.log(this.virtualScrollTop)
			this.realScrollTop = e.detail.scrollTop;
			this.saveState();
		}, 300),
		async onScrollToLower() {
			this.isManualScroll = false;

			try {
				await this.getBameList();
				this.$nextTick(() => {
					this.isManualScroll = true;
				});
			} catch (e) {
				console.error('加载失败:', e);
			}
		},
		//分类读取
		async getGameTypeListInfo() {
			let {
				data,
				code
			} = await getGameTypeList()
			if (code == 200) {
				this.newGameNavList = data
			}

		},
		//真人视讯数据读取
		async getZrListInfo() {
			let {
				data,
				code
			} = await getZrList()
			if (code == 200) {
				this.zrList = data
			}
		},

		async getBanner() {
			let {
				data,
				code
			} = await banner()
			if (code == 200) {
				// data.map(item => {
				// 	return item.image = this.$config.baseImgUrl + item.image
				// })
				this.bannerList = data
			}
		},
		//下拉分页
		// onReachBottom() {
		// 	this.getBameList();
		// },
		//游戏列表
		async getBameList() {
			if (this.loading || !this.hasMore) return;
			this.loading = true;
			uni.showLoading({
				title: 'Loading...'
			});
			// const prevScrollHeight = this.$refs.scrollView.scrollHeight; // 记录加载前高度
			try {
				let {
					data,
					code
				} = await gameList({
					keyword: this.keyword,
					gpid: this.gpid,
					isng: this.isng,
					newGameType: this.newGameTypeIds,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				})
				if (code == 200) {
					this.gameList = this.pageNum === 1 ?
						data.data : [...this.gameList, ...data.data];

					this.hasMore = data.data.length >= this.pageSize;
					this.pageNum += 1;

					// 计算高度变化

					// 自动调整滚动位置
					if (this.pageNum > 1) {
						this.scrollTop += 20;
						this.$nextTick(() => {
							this.scrollTop += 1; // 确保触发滚动
						});
					}
				}
			} catch (error) {
				console.error('加载失败:', error);
			} finally {
				this.loading = false;
				uni.hideLoading();
			}
		},
		//厂商点击切换
		qieHan(item) {
			this.gpid = item.game_provoder_gpid
			console.log(this.gpid + '=============gpid 厂商id=======')
			console.log(this.newGameTypeIds + '=============newGameType 游戏id=======')
			this.pageNum = 1
			this.pageSize = 150
			this.hasMore = true
			this.loading = false
			this.gameList = []
			console.log(item)
			this.isng = item.is_ng ?? 0 //是否是ng厂家的游戏
			console.log("-------------------------")
			console.log(this.isng)
			this.qiehuanIndex = item.provider.name ?? '未知'
			//加入到缓存中 返回的时候使用
			localStorage.setItem('gpid', this.gpid);
			localStorage.setItem('newGameTypeId', this.newGameTypeIds);
			this.getBameList()
		},
		//点击导航栏切换
		changeNavItem(item, status) {
			if (status == 0 || status == 4) {
				localStorage.removeItem('gpid');
				localStorage.removeItem('newGameTypeId');
				localStorage.removeItem('status');
				localStorage.removeItem('dzpk_show');
				this.isng = 2;
			}
			this.is_other_show = item.id == item.is_other ? true : false
			localStorage.setItem('is_other_show', item.id == item.is_other ? 1 : 0);
			//厂商是否显示
			this.dzpk_show = item.is_child == 0 ? true : false
			//当前点击索引
			this.navItemStatus = status
			if (this.dzpk_show) return
			this.is_hot = item.is_hot == 1 ? true : false
			this.gpid = item.child[0].game_provoder_gpid ?? 0 //厂商id 默认取第一个
			this.qiehuanIndex = item.child[0].provider.name ?? '未知'
			if (status == 1) {
				this.isng = 2 //热门
			} else {
				console.log("执行了吗")
				this.isng = item.child[0].is_ng ?? 0 //是否是ng厂家的游戏
			}
			console.log("++++++++++++++++++++++++++++++++++")
			console.log(this.isng)
			this.newGameTypeIds = item.newGameType //newGameType 游戏id
			this.pageNum = 1
			this.pageSize = 150
			this.hasMore = true
			this.loading = false
			//加入到缓存中 返回的时候使用
			localStorage.setItem('gpid', this.gpid);
			localStorage.setItem('newGameTypeId', this.newGameTypeIds);
			localStorage.setItem('status', this.navItemStatus);
			localStorage.setItem('dzpk_show', this.dzpk_show == false ? 0 : 1);
			this.getBameList()

			// this.showSearchList = false
			// this.qiehuanIndex = 'Jili'
			// this.gameProviderId = 1020
			// // 收藏列表
			// console.log(status)
			// if (status == 0 || status == 1) {
			// 	this.dzpk_show = true;
			// } else {
			// 	this.dzpk_show = false;
			// 	this.gameList = [];
			//
			// }


		},

		// 进入游戏
		// 进入游戏
		async enterGameBtn(row) {

			if (!this.$isLogin()) {
				return this.$store.dispatch('setLoginPopup', true)
			}
			if (this.$store.state.user.language == 'zh') {
				this.lang = 'zh'
			} else if (this.$store.state.user.language == 'english') {
				this.lang = 'en'
			} else if (this.$store.state.user.language == 'burmese') {
				this.lang = 'my'
			}
			console.log(this.lang)
			const form = {
				ispc: "device1",
				back: "/",
				table_name: row.table_name,
				id: row.id,
				lang: this.lang,
			}
			let data = await enterGame(form)

			if (data.code == 200) {
				let url = data.data;
				console.log(url)
				let title = '测试'
				uni.navigateTo({
					url: `/pages/jogos/webview/index?src=${encodeURIComponent(url)}`
				});
				// window.location.href = data.data.login_url
			}
		},
		// async enterGameBtn(row) {

		// 	if (!this.$isLogin()) {
		// 		return this.$store.dispatch('setLoginPopup', true)
		// 	}
		// 	// if (this.userInfo.money == 0) {
		// 	// 	let _this = this
		// 	// 	uni.showModal({
		// 	// 		title: '提示',
		// 	// 		content: '您好,您的余额不足,请先充值',
		// 	// 		success: function(res) {
		// 	// 			if (res.confirm) {
		// 	// 				_this.$tab.navigateTo(`/pages/voucher-center/index`)
		// 	// 			} else if (res.cancel) {
		// 	// 				console.log('取消');
		// 	// 			}
		// 	// 		}
		// 	// 	});
		// 	// 	return
		// 	// }
		// 	// //2025-05-17
		// 	// if(row.table_name== 1){
		// 	// 	this.form = {
		// 	// 		ispc: "device1",
		// 	// 		back: "/",
		// 	// 		table_name:row.table_name,
		// 	// 		gameID: row.gameID,
		// 	// 		gameProviderId: row.gameProviderId,
		// 	// 		Portfolio: 'SeamlessGame'
		// 	// 	}
		// 	// }else{
		// 	// 	this.form = {
		// 	// 		ispc: "device1",
		// 	// 		back: "/",
		// 	// 		table_name:row.table_name,
		// 	// 		gameCode: row.gameCode,
		// 	// 		gameType: row.gameType,
		// 	// 		platType: row.platType
		// 	// 	}

		// 	// }
		// 	const form = {
		// 		ispc: "device1",
		// 		back: "/",
		// 		table_name: row.table_name,
		// 		id: row.id
		// 	}


		// 	let data = await enterGame(form)
		// 	if (data.code == 200) {

		// 		let url = data.data;
		// 		console.log(url)
		// 		let title = '测试'
		// 		uni.navigateTo({
		// 			url: `/pages/jogos/webview/index?src=${encodeURIComponent(url)}`
		// 		});
		// 		// window.location.href = data.data.login_url
		// 	}
		// },

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
		async zrClick(row) {

			if (!this.$isLogin()) {
				return this.$store.dispatch('setLoginPopup', true)
			}
			uni.showLoading({
				title: 'Loading...'
			});
			if (this.$store.state.user.language == 'zh') {
				this.lang = 'zh'
			} else if (this.$store.state.user.language == 'english') {
				this.lang = 'en'
			} else if (this.$store.state.user.language == 'burmese') {
				this.lang = 'my'
			}
			const form = {
				ispc: "device1",
				back: "/",
				gameID: row.gameId,
				gameProviderId: row.gameProviderId,
				table_name: 3,
				Portfolio: 'SeamlessGame',
			}

			let data = await enterGame(form)

			if (data.code == 200) {
				uni.hideLoading();
				// console.log(data.data.login_url)
				// window.open(data.data.login_url, '_blank');
				//window.location.href = data.data.login_url
				let url = data.data;
				console.log(url)
				uni.navigateTo({
					url: `/pages/jogos/webview/index?src=${encodeURIComponent(url)}`
				});
			}

		},
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
				success: function () {
					_this.$modal.msg(_this.$t('mine.text27'))
				}
			})
		},

		async getFuzzyQueryGame() {
			this.showSearchList = true

			let {
				code,
				data
			} = await fuzzyQueryGame({
				keyword: this.keyword,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
				newGameType: this.newGameTypeIds,
				gpid: this.gpid,
				isng: this.isng
			})
			if (code == 200) {

				this.total = data.tal
				this.status = 'loadmore'
				this.searchGameList = this.searchGameList.concat(data.data)
				// if (this.searchForm.list > data.data.length) {
				// 	return this.status = 'nomore'
				// }
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

				//this.$store.dispatch('setAnnouncementPopup', true)

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
		openCall(item) {
			let targetUrl = item.url; // 确保 url 来自可靠数据源
			if (typeof targetUrl !== 'string' || !targetUrl.trim()) {
				console.error('Invalid URL');
				return;
			}

			targetUrl = targetUrl.trim();

			// 处理协议相对路径（如 '//example.com'）
			if (targetUrl.startsWith('//')) {
				targetUrl = `https:${targetUrl}`;
			}

			// 检测并补全协议头
			if (!/^https?:\/\//i.test(targetUrl)) {
				targetUrl = `https://${targetUrl}`;
			} else if (/^http:\/\//i.test(targetUrl)) {
				// 可选：强制替换 HTTP 为 HTTPS
				targetUrl = targetUrl.replace(/^http:\/\//i, 'https://');
			}

			window.open(targetUrl, '_blank');
			//window.open(item.url, '_blank');
			//this.$modal.msg(this.$t('userinfo.text46'))
			// window.location.href = "https://www.baidu.com";
			// this.$tab.navigateTo('/pages/web-view/index?url=https://direct.lc.chat/16299930/')
		},
		handleStart() {
			if (!this.$isLogin()) {
				return this.$store.dispatch('setLoginPopup', true)
			} else {

				if (this.userInfo.is_dz == 0) {
					this.$modal.msg(this.$t('jogos.text32'))
					return;
				} else {
					if (this.$store.state.user.language == 'zh') {
						this.lang = 'zh'
					} else if (this.$store.state.user.language == 'english') {
						this.lang = 'en'
					} else if (this.$store.state.user.language == 'burmese') {
						this.lang = 'md'
					}
					// console.log("https://dzpk.s3.ap-southeast-1.amazonaws.com/web-mobile/index.html?token=" +
					// 	this.token + '&lang='+this.lang)
					// return
					// window.location.href = "https://dzpk.s3.ap-southeast-1.amazonaws.com/web-mobile/index.html?token=" +
					// 	this.token + '&lang=' + this.lang;
					window.location.href = "blackdiamond://dosomething=dezhou&token=" + this.token + "&lang=" + this
						.lang;
				}

			}
		},
		handleJoin() {
			this.$modal.msg("PLO开通中...")
		}
	},
	// watch: {
	// 	'keyword'() {
	// 		this.searchGameList = []
	// 		this.total = 0
	// 		this.pageNum = 1
	// 		this.pageSize = 12
	// 		if (this.keyword === '') {
	// 			console.log(123)
	// 			this.getBameList()
	// 		} else {
	// 			this.getBameList()
	// 			this.showSearchList = false;
	// 		}
	// 	}
	// },
	// onHide() {
	// 	clearInterval(this.timer)
	// },
	// onUnload(){
	// 	clearInterval(this.timer)
	// }
}
</script>
<style>
.uni-input-input {
	color: #fff !important;
}
</style>
<style lang="scss" scoped>
.horizontal-scroll {
	width: 100%;
}

.scroll-view {
	height: calc(100vh - 400rpx);
	overflow-anchor: none;
	contain: strict;
}

.swiper {
	height: 720rpx;
}

.scroll-container {
	display: inline-flex;
	padding: 0 20rpx;
}

.dzpk {
	display: flex;
	// justify-content: space-between;
	justify-content: center;
	align-items: center;
	background-image: url('/../static/images/jogos/new/dzz.jpg');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	margin: 6px;
	position: relative;
	height: 900rpx;
}

.dzpk_left {
	background-image: url('/../static/images/jogos/an.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	border-radius: 0px;
	cursor: pointer;
	transition: 0.3s;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	color: rgb(255, 249, 227);
	display: flex;
	align-items: center;
	justify-content: center;
	// margin-left: 30px;
	width: 400rpx;
	height: 100rpx;
	cursor: pointer;

}

.dzpk_right {
	background-image: url('/../static/images/jogos/an.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	color: white;
	border-radius: 40px;
	cursor: pointer;
	transition: 0.3s;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 160px;
	height: 60px;
	margin-right: 30px;
}

.dzpk_line {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 1px;
	background-color: #666;
	transform: translateX(-50%);
}

.scroll-item {
	width: 210rpx;
	flex-shrink: 0;
	margin-right: 25rpx;
	border-radius: 16rpx;
	overflow: hidden;
}

.scroll-item:last-child {
	margin-right: 0;
}

.d_jogos {
	// padding-top: 100rpx;

	.d_j_banner {
		// padding: 20rpx 0;
	}

	.margin_con {
		margin: 0rpx 5rpx;

		.d_j_nav {
			margin: 0 10rpx;
			position: relative;
			align-items: center;
			// height: 148rpx;
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
				// background-color: #4180ed;
			}

		}
	}




	.search_list {
		padding-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-between;
		align-items: center;
		height: 600rpx;
		background-color: #181f2b;

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

		.search_list_item:nth-child(3n) {
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
		margin: 20rpx 10rpx;
	}


	.d_j_list {
		// padding: 10rpx;
		box-shadow: 0 4rpx 16rpx rgba(255, 255, 255, 0.2);
		/* 调整为亮色阴影 */
		border-radius: 16rpx;
		margin: 10rpx;
		padding: 10rpx;
		//	background: rgba(255, 255, 255, 0.1) !important;
		/* 半透明背景 */
		backdrop-filter: blur(20rpx);
		/* 关键：背景模糊效果 */
		border: 1rpx solid rgba(255, 255, 255, 0.2);
		/* 添加透明边框增强质感 */
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		// width: 100%;

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

		.d_j_list::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(255, 255, 255, 0.05);
			z-index: -1;
		}

		.d_jl_list {
			padding-top: 20rpx;
			flex-wrap: wrap;
			justify-content: flex-start;

			.d_jl_list_item {
				margin-right: 14rpx;
				margin-bottom: 30rpx;
				// width: 32%;
				width: calc(33.3vw - 30rpx);
				/* 每屏显示3个项目 */
				min-width: 80rpx;
				/* 最小宽度限制 */
			}

			.d_jl_list_item:nth-child(3n) {
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

	.d-kefu-item {
		position: fixed;
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

/* 新增样式 */
.image-container {
	position: relative;
}

.corner-mark {
	position: absolute;
	z-index: 2;
	padding: 4rpx 12rpx;
	background: linear-gradient(180deg, #fe7c00, #e35100);
	color: white;
	font-size: 20rpx;
	border-radius: 0 10rpx 10rpx 0;
}

.corner-mark.left {
	left: 0;
	top: 0;
}

.corner-icon {
	position: absolute;
	z-index: 2;
	width: 40rpx;
	height: 40rpx;
	right: 20rpx;
	top: 20rpx;
}
</style>