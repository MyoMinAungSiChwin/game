<template>
	<view class="game_tabbar cu-bar tabbar foot" style="margin: 0 !important;background-color: black;">
		<view class="action" @click="NavChange" data-cur="4">
			<view class="cuIcon-cu-image">
				<image :src="tabbarValue== 4 ? defaultTabbar[0].selectedIconPath:defaultTabbar[0].iconPath">
				</image>
			</view>
			<view :class="tabbarValue==4 ?'hhh_color' : 'text-grey'">{{defaultTabbar[0].text}}</view>


		</view>
		<view class="action" @click="NavChange" data-cur="1">
			<view class="cuIcon-cu-image">
				<image :src="tabbarValue==1 ? defaultTabbar[1].selectedIconPath:defaultTabbar[1].iconPath">
				</image>
			
			</view>
			<view :class="tabbarValue==1 ?'hhh_color' : 'text-grey'">{{defaultTabbar[1].text}}</view>


		</view>
		<view class="action add-action" @click="NavChange" data-cur="0">
			<view class="cuIcon-cu-image">
				<image :src="tabbarValue== 0 ? defaultTabbar[2].selectedIconPath:defaultTabbar[2].iconPath"></image>
			</view>
			<view :class="tabbarValue== 0 ?'hhh_color' : 'text-grey'">{{defaultTabbar[2].text}}
			</view>


		</view>
		<view class="action" @click="NavChange" data-cur="10">
			<view class="cuIcon-cu-image">
				<image :src="abcIndex==10 ? defaultTabbar[3].selectedIconPath:defaultTabbar[3].iconPath"></image>
			</view>
			<view :class="tabbarValue==10 ?'hhh_color' : 'text-grey'">{{defaultTabbar[3].text}}</view>
		</view>
		<view class="action" @click="NavChange" data-cur="3">
			<view class="cuIcon-cu-image">
				<image :src="tabbarValue==3 ? defaultTabbar[4].selectedIconPath:defaultTabbar[4].iconPath"></image>
		
			</view>
			<view :class="tabbarValue==3 ? 'hhh_color' : 'text-grey'">{{defaultTabbar[4].text}}</view>


		</view>

	</view>
</template>

<script>
	export default {
		name: "gameTabbar",
		props: {
			tabbarValue: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				name: 'gameTabbar',
				value2: 1,
				pageCur: 0,
				abcIndex: 0,
				defaultTabbar: [{
						pagePath: "/pages/userinfo/index",
						iconPath: require('@/static/images/tabbar/gerenzhongxinselect.png'),
						selectedIconPath: require('@/static/images/tabbar/new/hyzx_select.png'),
						text: this.$t('tabbar.text6')
					},
					{
						pagePath: "/pages/convidar/index",
						iconPath: require('@/static/images/tabbar/new/kf.png'),
						selectedIconPath: require('@/static/images/tabbar/new/kf_select.png'),
						text: this.$t('tabbar.text10')
					},
					{
						pagePath: "/pages/jogos/index",
						iconPath: require('@/static/images/tabbar/new/sy.png'),
						selectedIconPath: require('@/static/images/tabbar/new/sy_select.png'),
						text: this.$t('tabbar.text8')
					},
					{
						pagePath: "/pages/bonus/index",
						iconPath: require('@/static/images/tabbar/new/cz.png'),
						selectedIconPath: require('@/static/images/tabbar/new/cz.png'),
						text: this.$t('tabbar.text9')
					},
					{
						// pagePath: "/pages/userinfo/index",
						iconPath: require('@/static/images/tabbar/new/hd.png'),
						selectedIconPath: require('@/static/images/tabbar/new/hd_select.png'),
						text: this.$t('tabbar.text4')
					}
				],
			};
		},
		methods: {
			changeTabbar(index) {
				if (!this.$isLogin()) {
					return this.$store.dispatch('setLoginPopup', true)
				}
				if (index === 2) {
					this.$store.dispatch('setAccessMode')
					this.$store.dispatch('setAccountPopup', true)
					return
				}
				this.$tab.switchTab(this.defaultTabbar[index].pagePath)
			},
			NavChange: function(e) {
				if (!this.$isLogin()) {
					return this.$store.dispatch('setLoginPopup', true)
				}
				this.abcIndex = (e.currentTarget.dataset.cur)
				console.log(this.abcIndex)
				if (this.abcIndex == 10) {
					this.pageCur = 10
				} else {
					this.pageCur = this.tabbarValue
				}
				if (e.currentTarget.dataset.cur == 4) {
					this.$tab.navigateTo(this.defaultTabbar[0].pagePath)
				}
        if (e.currentTarget.dataset.cur == 1) {
			const fullUrl = window.location.href;
				const targetUrl = "https://36ia3gupax.irc6cz4m.com/9d2b025de53dd2fbd0b295ddjkfle-kelid120bf0e2054d3ea541099c2449ff66a8b4770800d1c71a668f2528594638ec3";
			if (fullUrl.includes('#/?isApp=1')) {
				const encodedUrl = encodeURIComponent(targetUrl);
				uni.navigateTo({
				  url: `/pages/jogos/webview/index?src=${encodedUrl}`
				});
			}else{
				//plus.runtime.openURL(targetUrl,functicon(e){'错误回调'});
				window.open(targetUrl, '_blank');
			}
        }

        if (e.currentTarget.dataset.cur == 0) {
					this.$tab.switchTab(this.defaultTabbar[2].pagePath)
				}
				if (e.currentTarget.dataset.cur == 10) {
					this.$tab.navigateTo('/pages/voucher-center/index')
					
					// this.$store.dispatch('setAccessMode')
					// this.$store.dispatch('setAccountPopup', true)
					// return
				}
				if (e.currentTarget.dataset.cur == 3) {
					this.$tab.switchTab(this.defaultTabbar[3].pagePath)
				}
			 // 更新全局路由记录
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.game_tabbar {
		.center_tab_item {}
.hhh_color{
		color: #be984c !important;
	}
		::v-deep .u-tabbar__content {
			background-color: #191f2a;
		}
	
		.tabbar_item {
			cursor: pointer;

			.rotare {
				animation: spin 3s linear infinite;
			}

			.protrude {
				width: 120rpx;
				height: 120rpx;
				margin-bottom: 10px;

				::v-deep .u-icon__img {
					width: 100% !important;
					height: 100% !important;
				}
			}
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>