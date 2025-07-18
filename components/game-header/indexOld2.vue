<template>
  <view class="game_header">
    <view class="header-container" :style="{ top: headerTop }">
      <!-- Promotion bar -->
      <view class="promotion-header" v-if="showPromotion">
        <view class="app-info">
          <text class="app-number">
            <image style="width: 250rpx; height: 59rpx;" src="@/static/images/tabbar/selctlogo.png"></image>
          </text>
        </view>
        <view class="promotion-actions">
          <view class="download-btn" @click="downloadApp">
            <u--image :src="require('@/static/images/app/imageTz2.png')" width="195rpx" height="70rpx" :showLoading="true" />
          </view>
          <view class="close-btn" @tap="closePromotion">
            <text>×</text>
          </view>
        </view>
      </view>

      <u-navbar bgColor="black" leftIcon="" :paddingTop="navbarPadding" :height="navbarHeight" :fixed="showPromotion ? false : true">
        <view slot="left" class="head_center" style="padding: 0 !important;">
          <view class="d_logo game_flex game_flex1">
            <u--image :src="require('@/static/images/tabbar/selctlogo.png')" width="250rpx" height="59rpx" />
          </view>
        </view>
        <view slot="right" class="head_right game_flex align_center">
          <view style="color: #fff; display: flex; justify-content: space-between;" v-if="token">
            <view style="display: flex;justify-content: center;align-items: center; width:340rpx;">
              <u-avatar @tap="$store.dispatch('setUserPopup', true)" :src="userInfo.avatar" shape="circle" size="60rpx" style="margin-right: 10rpx;"></u-avatar>
              <view style="display: flex;flex-direction: column;justify-content: center;align-items: flex-start;line-height:30rpx;">
                <view style="font-weight: bold;">{{ userInfo.username }}</view>
                <view style="display: flex;align-items: end;">
                  <view style="color: #f6c530; font-weight: bold;">
                    {{ isMoneyHidden ? '***' : 'K' + userInfo.money }}
                  </view>
                  <view style="margin-left: 20rpx; display: flex; align-items: center;" @tap="toggleMoneyVisibility">
                    <image style="width: 36rpx;height: 36rpx;" :src="isMoneyHidden ? '/../static/images/yc.png' : '/../static/images/xs.png'" />
                  </view>
                </view>
              </view>
            </view>
            <view style="display: flex;align-items: center;justify-content: center;">
              <view style="margin-right: 20rpx;">
                <u-icon class="off_icon" name="./static/ldf.png" size="20" @tap="$store.dispatch('setFlPopup', true)"></u-icon>
              </view>
            </view>
            <view class="game_flex align_center" style="display: flex; align-items: center;" @tap="showLanguage = true">
              <u-icon size="25" name="/../static/images/en.png" style="margin-left: 10rpx;"></u-icon>
            </view>
          </view>

          <!-- Not logged in -->
          <view class="not_login game_flex" v-else>
            <view class="custom-btn" @tap="setLoginBox(1)" :style="{ backgroundImage: 'url(../static/images/tzs/loginandreg.png)', height: '38px' }">
              <text class="btn-text">{{ $t('jogos.text24') }}</text>
            </view>
            <view class="custom-btn" @tap="setLoginBox(2)" :style="{ backgroundImage: 'url(../static/images/tzs/loginandreg.png)', height: '38px' }">
              <text class="btn-text">{{ $t('jogos.text25') }}</text>
            </view>
            <view class="game_flex align_center" style="display: flex; align-items: center;" @tap="showLanguage = true">
              <u-icon size="25" name="/../static/images/en.png" style="margin-left: 10rpx;"></u-icon>
            </view>
          </view>
        </view>
      </u-navbar>
    </view>

    <!-- Popup Components -->
    <game-login :loginIndex="loginIndex" :key="loginIndex" :invitation_code="invitation_code" :is_agent="is_agent" />
    <game-fl-popup />
    <game-user />
    <game-account />
    <gameDownloadVue />

    <!-- Language Picker -->
    <u-picker
        :closeOnClickOverlay="true"
        @close="showLanguage = false"
        @confirm="confirmLanguage"
        :cancelText="$t('userinfo.text15')"
        :confirmText="$t('userinfo.text16')"
        :show="showLanguage"
        :columns="columns"
        keyName="label"
    ></u-picker>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import gameDownloadVue from '../game-download/index.vue'

export default {
  name: "gameHeader",
  components: {
    gameDownloadVue
  },
  computed: {
    ...mapGetters(['userInfo', 'token', 'promotionVisible']),
    headerTop() {
      return this.statusBarHeight + 'px';
    },
    navbarHeight() {
      return this.showPromotion ? '120rpx' : '120rpx';
    },
    navbarPadding() {
      return this.showPromotion ? '0rpx' : '0rpx';
    },
    contentPadding() {
      return this.showPromotion ? '230rpx' : '170rpx';
    },
    showPromotion() {
      return this.promotionVisible;
    }
  },
  data() {
    return {
      showLanguage: false,
      isMoneyHidden: false,
      columns: [
        [{
          label: '中文', id: 'zh'
        }, {
          label: 'English', id: 'english'
        }, {
          label: 'မြန်မာ', id: 'burmese'
        }]
      ],
      invitation_code: '',
      loginIndex: 1,
      is_agent: 0,
      statusBarHeight: 0
    };
  },
  created() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;

    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const isAppParam = urlParams.get('isApp');

    if (isAppParam === '1') {
      this.SET_PROMOTION_VISIBLE(false);
      uni.setStorageSync('promotionVisible', false);
    } else {
      this.initPromotionVisibility();
    }

    // 👉 Auto set English as default if no language is stored
    const storedLang = uni.getStorageSync('language');
    if (!storedLang) {
      this.$store.dispatch('Language', 'english');
      uni.setStorageSync('language', 'english'); // Optional: persist it
    }

    if (this.getUrlParam('invitation_code')) {
      this.$store.dispatch('setLoginPopup', true);
      this.loginIndex = 2;
      this.invitation_code = this.getUrlParam('invitation_code');
    }
  },
  methods: {
    ...mapMutations([
      'SET_PROMOTION_VISIBLE', 'SET_DOWNLOAD_VISIBLE'
    ]),
    initPromotionVisibility() {
      const storedValue = uni.getStorageSync('promotionVisible');
      if (storedValue !== null && storedValue !== "") {
        this.SET_PROMOTION_VISIBLE(storedValue);
      } else {
        this.SET_PROMOTION_VISIBLE(true);
      }
    },
    closePromotion() {
      this.SET_PROMOTION_VISIBLE(false);
      uni.setStorageSync('promotionVisible', false);
    },
    confirmLanguage({ value }) {
      const info = value[0].id;
      this.$store.dispatch('Language', info).then(() => {
        this.showLanguage = false;
        let currentUrl = window.location.href;
        if (!currentUrl.includes('isApp=1')) {
          currentUrl += currentUrl.includes('?') ? '&isApp=1' : '?isApp=1';
        }
        window.location.href = currentUrl;
      });
    },
    getUrlParam(param) {
      const options = uni.getLaunchOptionsSync();
      if (options.query && options.query[param]) {
        return options.query[param];
      }
      return null;
    },
    toggleMoneyVisibility() {
      this.isMoneyHidden = !this.isMoneyHidden;
    },
    setLoginBox(index) {
      this.$store.dispatch('setLoginPopup', true);
      this.loginIndex = index;
    },
    downloadApp() {
      this.$store.commit('SET_DOWNLOAD_VISIBLE', true);
    }
  }
}
</script>


<style lang="scss" scoped>
/* 吸顶头部容器 */
.header-container {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* 内容区域 - 自适应顶部间距 */
.content-container {
  transition: padding-top 0.3s ease;
}

/* 基础按钮样式 */
.custom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  // border-radius: 8px;
  // padding: 0 20rpx;
  margin: 0rpx 10rpx;
  cursor: pointer;
  transition: opacity 0.3s;
  width: 160rpx;
}

/* 推广条样式 */
.promotion-header {
  background-color: #000000;
  padding: 20rpx 33rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid black;
  // margin-bottom: 20px;
}

.app-info {
  display: flex;
  align-items: center;
}

.app-number {
  font-size: 36rpx;
  font-weight: bold;
  color: #FFFFFF;
  margin-right: 16rpx;
}

.app-details {
  display: flex;
  flex-direction: column;
}

.app-title {
  font-size: 24rpx;
  color: #FFFFFF;
}

.stars {
  color: #FFD700;
  font-size: 24rpx;
  letter-spacing: -1px;
  /* 让星号更紧凑 */
}

.promotion-actions {
  display: flex;
  align-items: center;
}

.download-btn {
  // background-color: #FFD700;
  // border-radius: 40rpx;
  // padding: 10rpx 30rpx;
  // font-size: 28rpx;
  // font-weight: bold;
  // color: #000000;
}

.close-btn {
  color: #fff;
  font-size: 40rpx;
  font-weight: bold;
  margin-left: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
}

/* 大号按钮额外样式 */
.large-btn {
  width: 240px;
  /* 更大的宽度 */
}

/* 按钮文字样式 */
.btn-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(180deg, #a36d09 16%, #faf2b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* 点击效果 */
.custom-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.game_header {
  .head_left {}

  .head_center {
    // padding-left: 80rpx;
    width: 100%;

    .d_logo {
      padding: 10rpx 0 0 10rpx;
    }
  }

  .head_right {
    .d_balance {
      padding: 15rpx 20rpx;
      color: #fff;
      justify-content: space-between;
      align-items: center;

      .balance_txt {
        color: #f6c530;
        font-weight: 700;
        // margin-right: 10rpx;
        display: flex;
        align-items: center;
      }

      .balance_btn {
        margin: 0 20rpx;
        width: 70rpx;
        height: 35rpx;
        background-color: #ff3141;
        box-shadow: 0 0 #ff3141;
        border-radius: 12rpx;
        cursor: pointer;
        animation: grape 1.5s ease 0s infinite normal none running;
      }

      .balance_user {
        padding-right: 10rpx;
        // width: 100rpx;
        align-items: center;
        border-radius: 45rpx;
        // background-color: #3d3838;
        justify-content: space-between;
        cursor: pointer;
        // margin-right: 40rpx;
      }
    }

    // margin-left: 170rpx;

    .not_login {
      .u-button {
        height: 50rpx;
        border: none;
        color: #fff;
      }

      .u-button:last-child {
        margin-left: 20rpx;
      }
    }
  }
}

@keyframes grape {
  0% {
    transform: scale(1);
  }

  10% {
    transform: translate3d(-1px, 0, 0);
  }

  70% {
    box-shadow: 0 0 0 10px transparent;
    transform: scale(1);
  }

  100% {
    box-shadow: 0 0 transparent;
    transform: scale(1);
  }
}
</style>