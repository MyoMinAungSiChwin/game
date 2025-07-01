<template>
  <view class="game_download_popup">

    <u-popup :show="showDownload" mode="center" round="10" @close="closeDownload" closeable>
      <!-- 弹窗内容 -->
      <view class="download-dialog">
	
        <!-- 顶部财神形象 -->
        <view class="god-of-wealth" style="margin-top:60rpx;">
          <img :src="require('@/static/images/app/imagetz.png')" mode="aspectFit" class="god-image" />
<!--          <image src="https://www.may9.tv/m/title-dark.47b198d6.png" mode="aspectFit" class="god-image"></image>-->
        </view>

        <!-- 弹窗标题 -->
        <view class="dialog-header">
         <!-- <view class="app-number">19</view>
          <view class="dialog-title">APP DOWNLOAD</view> -->
        </view>
        
        <!-- 安卓下载选项 -->
        <view class="download-option" @click="download('android')">
          <view class="option-left">
          <!--  <text class="option-number">19</text> -->
            <view class="option-details">
              <text class="option-text">{{$t('jogos.text33')}}</text>
              <text class="option-date">BLACK DIAMOND</text>
            </view>
          </view>
          <view class="option-button">下载</view>
        </view>
        
        <!-- 苹果下载选项 -->
        <view class="download-option" @click="download('ios')">
          <view class="option-left">
    <!--        <text class="option-number">19</text> -->
            <view class="option-details">
              <text class="option-text">{{$t('jogos.text34')}}</text>
              <text class="option-date">BLACK DIAMOND</text>
            </view>
          </view>
          <view class="option-button">下载</view>
        </view>
        
        <!-- 底部森林之门 -->
       <view class="forest-gate">
      <!--    <text>森林见面之门1000</text>
          <text>19</text> -->
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "gameDownload",
  props: {
  	ios: {
  		type: String,
  		default: ''
  	},
  	android: {
  		type:String,
  		default: ''
  	},
  },
  computed: {
    ...mapGetters(['downloadVisible']),
    showDownload() {
		console.log(this.downloadVisible)
      return this.downloadVisible;
    }
  },
  methods: {
    ...mapMutations(['SET_DOWNLOAD_VISIBLE']),
    
    // 关闭下载弹窗
    closeDownload() {
      this.SET_DOWNLOAD_VISIBLE(false);
    },
    
    // 处理下载逻辑
    download(type) {
      console.log(`${type === 'android' ? '安卓' : '苹果'}APP下载开始`);
	  if(type == 'android'){
		  //const url = 'https://download.blackdiamond.tv'
		  
		  window.open(this.android, '_blank');
	  }else{
		  //const url = 'https://m2i3z.ffidplc.com/GN4FYL/yzc4mzdin2'
		  window.open(this.ios, '_blank');
	  }
      // 实际下载逻辑
      this.SET_DOWNLOAD_VISIBLE(false);
    }
  }
}
</script>

<style lang="scss" scoped>
/* 下载弹窗样式 */
.game_download_popup {
  z-index: 999999;
}

.download-dialog {
  width: 600rpx;
  background: linear-gradient(to bottom, #000000, #000000);
  border-radius: 20rpx;
  overflow: hidden;
  padding: 30rpx 25rpx;
  position: relative;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.5);
  
  /* 财神容器 */
  .god-of-wealth {
    // position: absolute;
    // top: 80rpx;
    // right: 20rpx;
    width: 100%;
    height: 330rpx;
    z-index: 10;
    
    .god-image {
      width: 100%;
      height: 100%;
      z-index: 2;
      position: relative;
    }
  }
  
  /* 弹窗标题 */
  .dialog-header {
    text-align: center;
    margin-top: 30rpx;
    margin-bottom: 40rpx;
    
    .app-number {
      color: #FFD700;
      font-size: 60rpx;
      font-weight: bold;
      line-height: 1;
    }
    
    .dialog-title {
      color: white;
      font-size: 40rpx;
      font-weight: bold;
      text-shadow: 0 2rpx 4rpx rgba(255, 215, 0, 0.5);
      margin-top: 10rpx;
    }
  }
  
  /* 下载选项 */
  .download-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15rpx;
    padding: 20rpx 25rpx;
    margin-bottom: 30rpx;
    border: 1rpx solid rgba(255, 215, 0, 0.3);
    
    .option-left {
      display: flex;
      align-items: center;
      
      .option-number {
        color: #FFD700;
        font-size: 50rpx;
        font-weight: bold;
        margin-right: 25rpx;
        min-width: 60rpx;
      }
      
      .option-details {
        display: flex;
        flex-direction: column;
        
        .option-text {
          color: white;
          font-size: 30rpx;
          font-weight: bold;
          line-height: 1.4;
        }
        
        .option-date {
          color: #FFD700;
          font-size: 26rpx;
          line-height: 1.2;
        }
      }
    }
    
    .option-button {
      background: linear-gradient(to right, #FFD700, #FFA500);
      color: #8B4513;
      font-size: 30rpx;
      font-weight: bold;
      padding: 10rpx 30rpx;
      border-radius: 30rpx;
      box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.3);
    }
  }
  
  /* 底部森林之门 */
  .forest-gate {
    text-align: center;
    color: white;
    font-size: 28rpx;
    margin-top: 15rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    text {
      &:first-child {
        font-size: 32rpx;
        letter-spacing: 2rpx;
        margin-bottom: 5rpx;
      }
      
      &:last-child {
        font-size: 42rpx;
        font-weight: bold;
        color: #FFD700;
      }
    }
  }
}
</style>