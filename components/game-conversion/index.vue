<template>
  <u-popup :show="showConversionPopup" @open="getGameAmount" @close="$store.dispatch('setConversionPopup', false)"
    mode="center" round="10">
    <view class="conversion_sty d_border12">
      <view class="one d_flex">
        <view>
          {{$t('mine.text13')}}:
        </view>

        <u-radio-group v-model="walletTransferForm.plat_type" placement="column">
          <!-- 动态生成游戏平台选项 -->
          <u-radio
            v-for="option in dropdownOptions"
            :key="option.value"
            :label="option.label"
            :name="option.value"
            labelColor="#fff">
          </u-radio>
        </u-radio-group>

        <view style="height: 14rpx"></view>

        <u-radio-group v-model="walletTransferForm.status" placement="column">
          <u-radio :label="$t('mine.text20')" name="1" labelColor="#fff">
          </u-radio>
          <view style="height: 14rpx"></view>
          <u-radio :label="$t('mine.text21')" name="2" labelColor="#fff">
          </u-radio>
        </u-radio-group>
      </view>

      <view class="tow" v-if="walletTransferForm.status != 3">
        <view>
          {{walletTransferForm.status == '1' ? $t('mine.text20') : $t('mine.text21')}}
        </view>
        <u--input :placeholder="$t('mine.text19')" border="none" clearable :customStyle="{
            background: '#2b2e3d',
            padding: '20rpx'
          }" v-model="walletTransferForm.money"></u--input>
      </view>

      <view class="three">
        {{$t('mine.text23')}}: {{userInfo.money}}
      </view>

      <view class="four">
        <u-button type="primary" :text="$t('mine.text24')" shape="circle" :customStyle="{height: '70rpx'}"
          color="linear-gradient(to right, rgb(34, 48, 107), rgb(0, 162, 251))" @tap="getWalletTransfer"></u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
import {
  gameAmount,
  walletTransfer
} from '@/api/mine.js'
import {
  mapGetters
} from 'vuex'
export default {
  name: "game-conversion",
  computed: {
    ...mapGetters(['userInfo', 'showConversionPopup'])
  },
  data() {
    return {
      walletTransferForm: {
        // status = 1 转入 2 转出
        status: '1',
        money: '',
        plat_type: 'pp'  // 默认选择 'pp'
      },
      dropdownOptions: [
        { value: 'pp', label: 'PP' }
        // { value: 'pg', label: 'PG' },
        // { value: 'evo', label: 'EVO' },
        // { value: 'ag', label: 'AG' }
      ],
      gameAmount: {},
    };
  },

  methods: {
    // 游戏转入
    async getWalletTransfer() {
      let {
        code,
        data
      } = await walletTransfer(this.walletTransferForm)
      if (code == 200) {
        this.walletTransferForm = {
          status: '1',
          money: '',
          plat_type: 'pp'  // 转账后重置为默认值
        }
        this.$store.dispatch('setConversionPopup', false)
        this.$modal.msg(this.$t('mine.text25'))
        this.$store.dispatch('GetInfo')
      }
    },
    async getGameAmount() {
      try {
        let {
          code,
          data
        } = await gameAmount()
        if (code == 200) {
          this.gameAmount = data
          uni.hideLoading()
        }
      } catch {
        uni.hideLoading()
      }

    },
  }
}
</script>

<style lang="scss" scoped>
  .conversion_sty {
    padding: 20rpx;
    width: 550rpx;
    color: #fff;
    background-color: #201e2f;
    font-size: 24rpx;

    ::v-deep .u-radio {
      margin-right: 50rpx;
      color: #fff;
    }

    .o_d_scroll_view {
      padding-top: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
    }

    .one,
    .tow {
      flex-direction: column;

      &>view:nth-child(1) {
        height: 40rpx;
        line-height: 40rpx;
      }
    }

    .tow {
      margin: 30rpx 0;
    }

    .three {
      height: 80rpx;
      line-height: 80rpx;
    }

    .four {
      margin-top: 30rpx;
    }

    .quota_conversion {
      justify-content: space-around;
      & > view {
        align-items: center;
        height: 60rpx;
      }
    }
  }
</style>