
<template>
  
  <view style="height: 100%;" v-if="src">
    
    <view class="trigger-icon" @click="showNavbar = !showNavbar" v-if="!showNavbar">
      <u-icon name="arrow-down" color="#be984c" size="80"></u-icon>
    </view>

    <u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick"
              v-show="showNavbar">
      <view class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" slot="right">
        <view style="display: flex; align-items: center;">
          <view @tap="clickTop">
            <u-button type="primary" style="padding: 0 20rpx;" size="mini" color="#d29f69" icon="integral-fill" shape="circle">
              充值
            </u-button>
          </view>
          <view @tap="qpClick" style="margin-left: 30rpx;">
            <text style="font-size: 24rpx; color: #be984c;">全屏</text>
          </view>
        </view>
      </view>
    </u-navbar>

    <web-view :src="src" :fullscreen="true" @loadstart="onLoadStart" @loadstop="onLoadStop" />

    <!-- #ifdef H5 -->
    <!-- <iframe class="iframe" :src="src" frameborder="0"></iframe> -->
    <!-- #endif -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      webViewLoading: true,
      showNavbar: false,
      title: '',
      src: ''
    };
  },
  onLoad(option) {
    if (option.src) {
      this.src = option.src;
    }
    if (option.title) {
      this.title = option.title;
    }
  },
  methods: {
    leftClick() {
      // console.log("WebView URL:", this.src);
      // console.log("WebView Title:", this.title);
      // Return to the previous page (game list)
      // alert("ok");
        uni.navigateBack({
        delta: 1, // go back 1 page
        fail: () => {
          // If no page in stack, redirect manually
          uni.reLaunch({ url: '/pages/home/index' });
        }
      });
    },
    onLoadStart() {
      console.log("开始加载");
      this.webViewLoading = true;
    },
    onLoadStop() {
      console.log("加载完成");
      this.webViewLoading = false;
    },
    clickTop() {
      this.$tab.navigateTo(`/pages/voucher-center/index`);
    },
    qpClick() {
      this.showNavbar = false;
    },
    // onBackPress() {
    //   this.leftClick(); // Always return to game list
    //   return true;      // Prevent default behavior
    // }
  }
};
</script>

<style>
/* Apply to entire page */
page, html, body {
  height: 100% !important;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #000; /* optional */
}

/* View wrapper */
.full-page {
  height: 100%;
  width: 100vw;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Full webview */
.webview-full {
  flex: 1;
  width: 100%;
  height: 100%;
}

/* Trigger button */
.trigger-icon {
  position: fixed;
  /* top: 50rpx; */
  margin-top: 100rpx;
  left: 20%;
  transform: translateX(-50%);
  z-index: 99999;
  animation: pulse 2s infinite;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
  inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.u-navbar+.trigger-icon {
  top: calc(60px + env(safe-area-inset-top));
}

.trigger-icon:active {
  background: #d0d0d0;
  transform: translateX(-50%) scale(0.98);
  transition: all 0.1s ease;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Fallback for iframe (H5 only) */
.iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

