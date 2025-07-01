<template>
	<!-- Sticky container -->
	<view class="sticky-tabs">
		<!-- Scrollable container -->
		<scroll-view scroll-x class="scroll-container" :scroll-left="scrollLeft">
			<!-- Tab items container -->
			<view class="tabs-container">
				<view
					v-for="(item, index) in tabsList"
					:key="index"
					class="tab-item"
					:class="{ 'active': current === index }"
					@click="switchTab(item, index)"
				>
					<!-- Label -->
					<text class="tab-label">
						<!-- Burmese -->
						<template v-if="$store.state.user.language === 'burmese'">
							{{ item.burmese === 'ပင်မစာမျက်နှာ' ? 'အားလုံး' : item.burmese }}
						</template>

						<!-- English -->
						<template v-else-if="$store.state.user.language === 'english'">
							{{ item.english === 'Home' ? 'All' : item.english }}
						</template>

						<!-- Chinese (default fallback) -->
						<template v-else>
							{{ item.title === '首页' ? '全部' : item.title }}
						</template>
					</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			tabsList: { // 标签数据
				type: Array,
				default: () => [{
						label: '首页',
						icon: '/static/1.png', // 默认图标
						activeIcon: '/static/1.png' // 激活图标
					},
					{
						label: '活动',
						icon: '/static/2.png',
						activeIcon: '/static/2.png'
					}
				]
			},
			initialTab: { // 初始选中索引
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				current: this.initialTab,
				isSticky: false, // 是否吸顶
				scrollLeft: 0, // 横向滚动位置
				stickyTop: '120rpx' // 吸顶距离
			};
		},
		mounted() {
			//this.initPosition();
		},
		methods: {
			// 初始化定位（处理导航栏高度）
			initPosition() {
				const systemInfo = uni.getSystemInfoSync();
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				this.stickyTop = `${menuButtonInfo.top + menuButtonInfo.height + 10}px`;
			},

			// 切换标签
			switchTab(item,index) {
				if (this.current === index) return;
				this.current = index;
				this.$emit('change', item,index);
				this.autoScroll();
			},

			// 自动滚动到选中项
			autoScroll() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.tab-item').boundingClientRect(rects => {
					const screenWidth = uni.getSystemInfoSync().windowWidth;
					const targetLeft = rects[this.current].left;
					this.scrollLeft = targetLeft - screenWidth / 2 + rects[this.current].width / 2;
				}).exec();
			}
		},
		// 监听页面滚动实现吸顶
		onPageScroll(e) {
			this.isSticky = e.scrollTop >= 120; // 根据实际场景调整阈值
		}
	};
</script>
<style scoped>
	/* 吸顶容器 */
	.sticky-tabs {
		width: 100%;
		z-index: 999;
		background-color: #ffffff;
		transition: all 0.3s;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
	}

	/* 滚动容器 */
	.scroll-container {
		white-space: nowrap;
		width: 100%;
		height: 100rpx;
	}

	/* 标签项容器 */
	.tabs-container {
		display: inline-flex;
		height: 100%;
/* 		padding: 0 30rpx; */
		width: 100%;
	}

	/* 单个标签项 */
	.tab-item {
		display: inline-flex;
		flex-direction: inherit;
		align-items: center;
		justify-content: center;
		padding: 0 40rpx;
		transition: all 0.3s;
		position: relative;
		width:50%;
	}

	/* 激活态指示条 */
	.tab-item.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 6rpx;
		background-color: #ec2529;
		border-radius: 2rpx;
	}

	/* 图标样式 */
	.tab-icon {
		width: 60rpx;
		height: 60rpx;
/* 		margin-bottom: 8rpx; */
		margin-right:30rpx ;
	}

	/* 文字样式 */
	.tab-label {
		font-size: 32rpx;
		color: #666;
		transition: color 0.3s;
	}

	.tab-item.active .tab-label {
		color: #ec2529;
		font-weight: bold;
	}
</style>