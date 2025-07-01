<template>
  <!-- 吸顶容器 -->
  <view class="sticky-tabs" :class="{'sticky': isSticky}" :style="{top: stickyTop}">
    <!-- 滚动容器 -->
    <scroll-view scroll-x class="scroll-container" :scroll-left="scrollLeft" :show-scrollbar="false">
      <!-- 标签项容器 -->
      <view class="tabs-container">
        <view v-for="(item, index) in tabsList" :key="index" class="tab-item"
              :class="{ 'active': current === index }" @tap="handleTabClick(index)">
          <!-- 文字区域 -->
          <view class="tab-content">
            <text class="tab-label">{{ item.label }}</text>
          </view>

          <!-- 激活指示器 -->
          <view class="active-indicator"></view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  props: {
    tabsList: {
      type: Array,
      default: () => []
    },
    initialTab: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      current: this.initialTab,
      isSticky: false,
      scrollLeft: 0,
      stickyTop: '0px'
    };
  },
  watch: {
    initialTab(newVal) {
      if (this.current !== newVal) {
        this.current = newVal;
        this.$nextTick(this.autoScroll);
      }
    }
  },
  mounted() {
    this.initPosition();
    this.$nextTick(this.autoScroll);
  },
  methods: {
    initPosition() {
      // 适配不同平台和状态栏高度
      try {
        const systemInfo = uni.getSystemInfoSync();
        const titleBarH = systemInfo.statusBarHeight + 44;
        this.stickyTop = `${titleBarH}px`;
      } catch (e) {
        console.warn('获取系统信息失败,使用默认值');
        this.stickyTop = '88rpx';
      }
    },

    handleTabClick(index) {
      if (this.current === index) return;

      this.current = index;
      this.$emit('change', index);
      this.$nextTick(this.autoScroll);
    },

    async autoScroll() {
      try {
        const [containerInfo, itemsInfo] = await Promise.all([
          this.getNodeInfo('.scroll-container'),
          this.getNodesInfo('.tab-item')
        ]);

        if (!containerInfo || !itemsInfo || itemsInfo.length <= this.current) return;

        const tab = itemsInfo[this.current];
        const containerWidth = containerInfo.width;
        const tabLeft = tab.left - containerInfo.left;
        const targetScroll = tabLeft - containerWidth / 2 + tab.width / 2;

        // 确保滚动位置在合理范围内
        this.scrollLeft = Math.max(0, Math.min(targetScroll, containerInfo.scrollWidth - containerWidth));
      } catch (e) {
        console.warn('自动滚动失败:', e);
      }
    },

    getNodeInfo(selector) {
      return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(this)
            .select(selector)
            .boundingClientRect(resolve)
            .exec();
      });
    },

    getNodesInfo(selector) {
      return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(this)
            .selectAll(selector)
            .boundingClientRect(resolve)
            .exec();
      });
    },

    // 由外部页面调用的方法
    handlePageScroll(e) {
      this.isSticky = e.scrollTop >= 120;
    }
  }
};
</script>

<style scoped>
/* 吸顶容器 */
.sticky-tabs {
  width: 100%;
  z-index: 999;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.sticky-tabs.sticky {
  position: sticky;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 滚动容器 */
.scroll-container {
  width: 100%;
}

/* 隐藏滚动条 */
scroll-view ::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* 标签项容器 */
.tabs-container {
  display: inline-flex;
  height: 120rpx;
  padding: 0 30rpx;
}

/* 单个标签项 */
.tab-item {
  position: relative;
  display: flex;
  /* 修改为 flex 布局 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30rpx;
  min-width: 100rpx;
  height: 100%;
  word-break: break-word;
  /* 允许单词内换行 */
}

/* 文字内容容器 */
/* 修改 .tab-content 布局 */
.tab-content {
  display: flex;
  flex-direction: column;
  /* 改为垂直布局 */
  align-items: center;
  justify-content: center;
  padding: 0 5rpx;
  height: auto;
  min-height: 100%;
  /* 确保最小高度 */
  width: 100%;
  /* 添加宽度约束 */
}

/* 文字样式 */
.tab-label {
  font-size: 28rpx;
  color: #666;
  line-height: 1.4;
  /* 增加行高 */
  text-align: center;
  word-break: break-word;
  /* 允许单词内换行 */
  max-width: 200rpx;
  overflow: hidden;
  display: block;
  /* 修改为 block 显示 */
  white-space: normal;
  /* 明确设置正常换行 */
  hyphens: auto;
  /* 允许自动断字 */
}

/* 激活状态文字样式 */
.tab-item.active .tab-label {
  color: #ec2529;
  font-weight: bold;
}

/* 激活指示器 */
.active-indicator {
  position: absolute;
  bottom: 0;
  width: 160rpx;
  height: 6rpx;
  background-color: transparent;
  border-radius: 10rpx;
  transition: all 0.3s ease;
}

.tab-item.active .active-indicator {
  background-color: #ec2529;
}
</style>
