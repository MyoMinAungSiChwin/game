<template>
  <view :style="containerStyle" v-if="src">
    <!-- 🟤 Top Black Spacer -->
    <view class="black-top-space"></view>

    <!-- 🟡 Back Button Trigger -->
    <view class="trigger-icon" @click="leftClick" v-if="!showNavbar">
      <u-icon name="arrow-down" color="#be984c" size="60"></u-icon>
    </view>

    <!-- 🔵 Navbar -->
    <u-navbar
        :customStyle="navbarStyle"
        leftText="返回"
        bgColor="black"
        :height="50"
        :safeAreaInsetTop="false"
        @leftClick="leftClick"
        v-show="showNavbar"
    >
      <view class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
      </view>
      <view class="u-nav-slot" slot="right">
        <view style="display: flex; align-items: center;">
          <view @tap="clickTop">
            <u-button
                type="primary"
                style="padding: 0 20rpx;"
                size="mini"
                color="#d29f69"
                icon="integral-fill"
                shape="circle"
            >
              充值
            </u-button>
          </view>
          <view @tap="qpClick" style="margin-left: 30rpx;">
            <text style="font-size: 24rpx; color: #be984c;">全屏</text>
          </view>
        </view>
      </view>
    </u-navbar>

    <!-- 🔴 Webview Content -->
    <web-view
        :src="src"
        :fullscreen="true"
        @loadstart="onLoadStart"
        @loadstop="onLoadStop"
    />

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
      src: '',
      navbarStyle: 'margin-top: env(safe-area-inset-top, 0px);'
    };
  },
  computed: {
    containerStyle() {
      return `
        height: 100%;
        width: 100%;
        background-color: black;
        padding-top: env(safe-area-inset-top, 0rpx);
        margin-top:70rpx;
      `;
    }
  },
  onLoad(option) {
    if (option.src) this.src = option.src;
    if (option.title) this.title = option.title;
  },
  methods: {
    // leftClick() {
    //   // uni.navigateBack();
    //   this.$tab.switchTab(`/pages/jogos/index`);
    // },
    leftClick() {
      const pages = getCurrentPages();
      const returnId = this.$route?.query?.returnId || '';
      const tableId = this.$route?.query?.tableId || '';

      const currentDomain = window.location.origin;
      const externalUrl = `${currentDomain}/#/?isApp=1&triggeredGameId=${returnId}&tableId=${tableId}`;

      if (pages.length > 1) {
        // uni.navigateBack();
        if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.openURL) {
          plus.runtime.openURL(externalUrl);
        } else {
          window.location.href = externalUrl;
        }
      } else {
        if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.openURL) {
          plus.runtime.openURL(externalUrl);
        } else {
          window.location.href = externalUrl;
        }
      }

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
      // this.$tab.navigateTo(`/pages/voucher-center/index`);
    },
    qpClick() {
      this.showNavbar = false;
    }
  }
};
</script>

<style>
/* 🔳 Global Background Fix */
page, html, body {
  height: 100% !important;
  margin: 0;
  padding: 0;
  background-color: #000;
}

/* 🟤 Top Spacer Styling */
.black-top-space {
  background-color: black;
  height: 100rpx; /* You can adjust to 60rpx or 100rpx if needed */
  width: 100%;
}

/* 🔘 Trigger Icon Style */
.trigger-icon {
  position: fixed;
  top: calc(0rpx + env(safe-area-inset-top, 0px));
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
  animation: pulse 2s infinite;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
  inset 0 1px 2px rgba(255, 255, 255, 0.2);
  margin-top: 70rpx;
}

.trigger-icon:active {
  background: #d0d0d0;
  transform: translateX(-50%) scale(0.98);
  transition: all 0.1s ease;
}

/* 🔁 Animation for Trigger */
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

/* 🖥️ H5 fallback iframe */
.iframe {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
