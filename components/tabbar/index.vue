<template>
	<view class="tabbar">
		<!-- 
			value 当前匹配项的name
			activeColor 选中标签的颜色
			inactiveColor 未选中标签的颜色
		 -->
		<u-tabbar :value="tabbarIndex" activeColor="#222" inactiveColor="" :border="false" :key="keys">
			<u-tabbar-item :text="item.text" v-for="item in tabbarDatas" :key="item.text" @click="changeTab(item)">
				<image :style="{width: `${item.width}rpx`,height: `${item.height}rpx`}" slot="inactive-icon" :src="item.iconPath"></image>
				<image :style="{width: `${item.width}rpx`,height: `${item.height}rpx`}" slot="active-icon" :src="item.selectedIconPath"></image>
			</u-tabbar-item>
		</u-tabbar>

	</view>
</template>

<script>
	import list from '@/utils/tabbar.js'
	export default {
		props: {
			tabbarIndex: {
				type: Number,
				default: 0
			}
		},

		data() {
			return {
				keys: false,
				tabbarDatas: list
			};
		},
		created() {
	 
		},
		mounted() {
		 
		},
		methods: {
			changeTab({
				pagePath
			}) {
				if (pagePath.indexOf('campus') == -1) {
					uni.switchTab({
						url: pagePath
					})
					return
				}
				 
				uni.reLaunch({
					url: pagePath
				})
			}

		},
 
	}
</script>

<style lang="scss" scoped>
	// .df_tabbar {
	// 	.u-page__item__slot-icon {
	// 		width: 28rpx;
	// 		height: 26rpx;
	// 	}
	// }
</style>