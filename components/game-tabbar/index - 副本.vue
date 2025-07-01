<template>
	<view class="game_tabbar">
		<u-tabbar :value="tabbarValue" :placeholder="false" :safeAreaInsetBottom="false" @change="changeTabbar"
			:border="false" activeColor="#fff">
			<u-tabbar-item class="tabbar_item" :text="item.text" v-for="(item,i) in defaultTabbar" :key="item.text">
				<!-- :class="[i == 1 && 'rotare', i == 2 && 'protrude']" -->
				<u-icon slot="active-icon" :class="[i == 1 && 'rotare']" :name="item.selectedIconPath"
					:size="i == 2? '68': '28'"></u-icon>
				<u-icon :class="[i == 1 && 'rotare']" slot="inactive-icon" :name="item.iconPath"
					:size="i == 2? '68': '28'"></u-icon>
			</u-tabbar-item>
		</u-tabbar>

	</view>
</template>

<script>
	export default {
		name: "gameTabbar",
		props: {
			tabbarValue: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				name: 'gameTabbar',
				value2: 1,
				defaultTabbar: [{
						pagePath: "/pages/jogos/index",
						iconPath: require('@/static/images/tabbar/game-unchecked.png'),
						selectedIconPath: require('@/static/images/tabbar/game-checked.png'),
						text: this.$t('tabbar.text1')
					},
					{
						pagePath: "/pages/convidar/index",
						iconPath: require('@/static/images/tabbar/share-unchecked.png'),
						selectedIconPath: require('@/static/images/tabbar/share-checked.png'),
						text: this.$t('tabbar.text2')
					},
					{
						iconPath: require('@/static/images/tabbar/wallet.gif'),
						selectedIconPath: require('@/static/images/tabbar/wallet.gif'),
						text: "Depósito"
					},
					{
						pagePath: "/pages/bonus/index",
						iconPath: require('@/static/images/tabbar/bonus-unchecked.png'),
						selectedIconPath: require('@/static/images/tabbar/bonus-checked.png'),
						text: this.$t('tabbar.text4')
					},
					{
						pagePath: "/pages/download/index",
						iconPath: require('@/static/images/tabbar/download-unchecked.png'),
						selectedIconPath: require('@/static/images/tabbar/download-checked.png'),
						text: this.$t('tabbar.text5')
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_tabbar {
		.center_tab_item {}

		::v-deep .u-tabbar__content {
			background-color: black;
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