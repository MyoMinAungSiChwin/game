<template>
	<view class="game_fl_popup">
		<u-popup :show="showFlPopup" mode="right" 
		@close="$store.dispatch('setFlPopup', false)"
		>
			<!-- #ifdef APP-PLUS -->
			<view style="height: 60rpx"></view>
			<!-- #endif -->
			<view class="d_fl_popup d_border12" 
			>
				<!-- <view class="d_fl_one d_border12 game_flex"
				@tap="tabbatPath('/pages/convidar/index')"
				>
					<view class="tit">{{$t('jogos.text1')}}</view>
					<view class="con">{{$t('jogos.text2')}}</view>
				</view> -->
				
				
				<view class="d_fl_tow d_border12 game_flex">
					<view 
					v-for="item in leftList"
					:key="item.gameCode"
					class="tow_item d_border12"
					:style="{background: `url(${item.imageUrl}) 100% / 100% no-repeat`}"
					@tap="enterGameBtn(item)"
					>
						<view class="tit">{{item.gameName}}</view>
					</view> 
				</view>
				
				<view class="d_fl_three">
						<u-button type="primary" 
						:text="$t('jogos.text9')" 
						size="mini"
							@tap="allBtn"
						></u-button>
				</view>

				<view class="d_fl_four">
					<view class="rows game_flex d_border12 align_center"
					v-for="item in menuList"
					:key="item.url"
                @tap="onMenuItemClick(item)"
          >
						<u-icon :name="item.url" size="26"></u-icon>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	
	import { getLeft, information } from '@/api/jogos.js' 
	export default {
		name: "gameFlPopup",
		
		computed: {
			...mapGetters(['showFlPopup'])
		}, 
		created() {
			this.getLeft()
			//this.getInformation()
		},
		data() {
			return {
			menuList: [
				{
					url: require('@/static/images/jogos/coupon-code.png'),
					name: this.$t('jogos.text10'),
					path: '/pages/coupon/index'
				},
				// {
				// 	url: require('@/static/images/jogos/recharge.png'),
				// 	name: this.$t('jogos.text11'),
				// 	path: '/pages/article/index'
				// },
				{
					url: require('@/static/images/jogos/clube-vip.png'),
					name: this.$t('jogos.text12'),
					path: '/pages/vip/index'
				},
        {
          url: require('@/static/images/grzx/new/exit.png'),
          name: this.$t('userinfo.text50'),
          type: 12
        },
				// {
				// 	url: require('@/static/images/jogos/tg.png'),
				// 	name: this.$t('jogos.text13'),
				// 	path: ''
				// },
				
			],
			leftList: [],
			};
		},
		methods: {
      onMenuItemClick(item) {
        if (item.type === 12) {
		// 1. 先登出并关闭弹窗
		this.$store.dispatch('LogOut');
		this.$store.dispatch('setUserPopup', false);
		// 2. 构造只含非空参数的 query 对象
		  const PARAM_KEYS = ['invitation_code', 'is_agent', 'link_id'];
		  const query = {};

		  PARAM_KEYS.forEach(key => {
			// uni.getStorageSync 不存在时返回 '' 或 undefined
			const val = uni.getStorageSync(key);
			if (val !== null && val !== undefined && val !== '') {
			  query[key] = val;
			}
		  });

		  // 3. 小延迟后再跳转
		  this.$dDelay(100).then(() => {
			// 如果 query 里没东西，也会正常跳转，只是不带参数
			this.$router.push({
			  path: '/pages/jogos/index',
			  query
			});
		  });
        } else if (item.path) {
          // Navigate to the path if it's a regular menu item
          uni.navigateTo({
            url: item.path
          })
        }
        this.$store.dispatch('setFlPopup', false)
      },

			allBtn(){
				this.$store.dispatch('setFlPopup', false)
				this.$tab.reLaunch('/pages/jogos/index')
			},
			
			toPath(item){
				const reg = /^https:\/\//i; 
				this.$store.dispatch('setFlPopup', false)
				this.$dDelay(200).then(() => {
					// 外部链接
					if(reg.test(item.path)){
						return window.location.href = item.path
					}
					this.$tab.navigateTo(item.path)
				})
			},
			async getLeft(){
				let {code,data} = await getLeft()
				if(code == 200){
					this.leftList = data 
				}
			},
			
			enterGameBtn(row){ 
				this.$store.dispatch('setFlPopup', false)
				this.$dDelay(200).then(() => {
					this.$tab.navigateTo(`/pages/jogos/game-intro/index?id=${row.id}`)
				})
			},
			
			async getInformation(){
				let {code,data} = await information()
				if(code == 200){
					this.menuList[3].path = data.chat
				}
			},
			tabbatPath(url){
				this.$store.dispatch('setFlPopup', false)
				this.$dDelay(200).then(() => {
					this.$tab.switchTab(url)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_fl_popup {
		height: 100%;
		.d_fl_popup {
			padding: 60rpx 20rpx 20rpx 20rpx;
			position: relative;
			width: 400rpx;
			height: 100%;
			color: #fff;
			overflow-y: auto;
			background-color: #211e2f;
			
			
			.d_fl_one{
				padding: 10rpx;
				flex-direction: column;
				justify-content: space-around;
				height: 90rpx;
				background: url('@/static/images/jogos/referral.png') 100% / 100% no-repeat;
				.con{
					color: #dfc3f6;
					font-size: 22rpx;
				}
			}
			
			.d_fl_tow{
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 10rpx;
				padding: 10rpx;
				background-color: #2c283d;
				.tow_item{
					margin: 10rpx 5rpx;
					width: 47%;
					height: 120rpx;
					.tit{
						margin: 60rpx 0 0 10rpx;
					}
				}
			}
			
			.d_fl_three{
				padding: 0 60rpx 20rpx 60rpx;
				background-color: #2c283d;
			}
			
			.d_fl_four{
				.rows{
					margin-top: 10rpx;
					padding: 10rpx;
					color: #fff;
					font-weight: 700;
					cursor: pointer;
					background-color: #2c283d;
					& > text{
						margin-left: 15rpx;
					}
				}
			}
		}

	}
</style>