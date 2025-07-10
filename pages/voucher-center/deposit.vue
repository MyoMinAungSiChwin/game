<template>
  <view class="voucher_center">
    <!-- Navbar -->
    <view class="navHeader" style="margin-bottom:100rpx;">
      <u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
        </view>
        <view class="u-nav-slot" slot="center">
          <text style="font-size: 35rpx; color: #be984c;">{{$t('tzsCustomize.title35')}}</text>
        </view>
        <view class="u-nav-slot" slot="right">
          <view class="icon-container" @tap="goToWithdraw" style="margin-right: 10rpx;">
            <u-icon name="minus-square-fill" color="#be984c" size="20"></u-icon>
          </view>
        </view>
      </u-navbar>
    </view>

    <!-- Tabs -->
    <view class="content" style="margin-top: 120rpx;">
      <u-tabs :list="list1" :scrollable="false" :lineWidth="120" @click="tabsClick"></u-tabs>

      <!-- Filters -->
      <view class="tabPane-tips mc-filter-container voucher-report-tab">
        <view class="am-flexbox am-flexbox-align-middle" style="flex-wrap: nowrap; overflow: hidden;">
          <span class="tabPane-span filter-tabPane-btn" @tap="allCz">
            {{$t('voucher.text47')}} - <text>{{ selectedBankType.label }}</text>
          </span>
          <span class="tabPane-span filter-tabPane-btn" @tap="allType">
            {{ selectedStatus.label }}
          </span>
          <span class="tabPane-span filter-tabPane-btn" @tap="allTime">
            {{ timeRange || $t('voucher.text31') }}
          </span>
        </view>
      </view>

      <!-- List -->
      <view>
        <scroll-view class="card-list" scroll-y v-if="filteredRechargeList.length > 0">
          <view v-for="(item, index) in filteredRechargeList" :key="index" class="recharge-card">
            <view class="card-header">
              <view class="bank-name">
                <text>{{ item.bankName }}</text>
                <text style="font-size: 24rpx;">{{ item.add_time }}</text>
              </view>
            </view>

            <view class="card-body">
              <view>{{$t('voucher.text32')}}：{{ item.orderNo }}</view>
              <view>{{ item.type == 1 ? '处理时间' : $t('voucher.text33') }}：{{ item.up_time || '-' }}</view>
            </view>

            <view class="card-body">
              <view class="details">
                <view class="detail-item">
                  <text class="label" v-if="item.type == 0">{{ $t('voucher.text34') }}</text>
                  <text class="label" v-if="item.type == 1 || item.type == 3 || item.type == 4">{{ $t('voucher.text53') }}</text>
                  <text class="label" v-if="item.type == 2">{{ $t('voucher.text54') }}</text>
                  <text class="value" style="color: red;">{{ item.money }}</text>
                </view>

                <view class="detail-item">
                  <text class="label">{{$t('voucher.text35')}}</text>
                  <text class="value">{{ item.status == 1 ? (item.type == 0 ? item.money : item.moneys || '-') : '-' }}</text>
                </view>

                <view class="detail-item" v-if="item.jl_money">
                  <text class="label" style="color: green;">{{$t('voucher.text55')}}</text>
                  <text class="value" style="color: green;">{{ item.status == 1 ? item.jl_money : '-' }}</text>
                </view>

                <view class="detail-item">
                  <text class="label">{{$t('voucher.text36')}}</text>
                  <text class="value" style="color: #0a98f8;">{{ item.status_txt }}</text>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- Empty State -->
        <view v-else style="display: flex; align-items: center; justify-content: center; height:calc(100vh - 172px);">
          <u-empty></u-empty>
        </view>

        <view style="height: 10px;"></view>
      </view>
    </view>

    <!-- Pickers -->
    <u-picker :show="czShow" :columns="[bankTypes.map(item => item.label)]" @confirm="czConfirm" @cancel="czClose"></u-picker>
    <u-picker :show="typeShow" :columns="[statusTypes.map(item => item.label)]" @confirm="typeConfirm" @cancel="typeClose"></u-picker>
    <u-calendar :show="timeShow" :title="$t('tzjl.text10')" mode="range" @confirm="confirm" @close="close" :minDate="minDate" :maxDate="maxDate"></u-calendar>

    <global-notify></global-notify>
  </view>
</template>
<script>
import { mapGetters } from 'vuex';
import { getOrderLogListInfo } from '@/api/jogos.js';

export default {
  name: 'voucher',
  computed: {
    ...mapGetters(['userInfo']),
    // ✅ Filter only deposit (type = 0 or 2)
    filteredRechargeList() {
      return this.rechargeList.filter(item => {
        const isDeposit = item.type === 0 || item.type === 2;
        const matchBank = this.selectedBankType.value === 0 || item.bankName === this.selectedBankType.value;
        const matchStatus = this.selectedStatus.value === 0 || item.status === this.selectedStatus.value;
        return isDeposit && matchBank && matchStatus;
      });
    }
  },
  data() {
    return {
      czShow: false,
      typeShow: false,
      timeShow: false,
      minDate: '',
      maxDate: '',
      page: 1,
      limit: 300,
      selectedBankType: { label: this.$t('tzsCustomize.title45'), value: 0 },
      selectedStatus: { label: this.$t('tzsCustomize.title37'), value: 0 },
      bankTypes: [],
      statusTypes: [],
      list1: [],
      rechargeList: [],
      total: 0,
      startTime: '',
      endTime: '',
      timeRange: '',
      activeIndex: 0
    };
  },
  onLoad() {
    this.initOptions();
    this.orderLogInfo();
  },
  mounted() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);
    this.minDate = twoMonthsAgo.toISOString().split('T')[0];
  },
  methods: {
    initOptions() {
      this.bankTypes = [
        { label: this.$t('tzsCustomize.title45'), value: 0 },
        { label: this.$t('tzsCustomize.title44'), value: 'KBZPAY' },
        { label: this.$t('voucher.text48'), value: 'Card' },
        { label: this.$t('voucher.text50'), value: 'USDT' }
      ];
      this.statusTypes = [
        { label: this.$t('tzsCustomize.title37'), value: 0 },
        { label: this.$t('tzsCustomize.title38'), value: 1 },
        { label: this.$t('tzsCustomize.title39'), value: 2 },
        { label: this.$t('tzsCustomize.title40'), value: 3 },
        { label: this.$t('tzsCustomize.title41'), value: 4 },
        { label: this.$t('tzsCustomize.title42'), value: 5 },
        { label: this.$t('tzsCustomize.title43'), value: 6 }
      ];
      this.list1 = [
        { name: this.$t('voucher.text38') },
        { name: this.$t('voucher.text39') },
        { name: this.$t('voucher.text40') }
      ];
    },
    goToWithdraw() {
      uni.navigateTo({ url: '/pages/voucher-center/withdraw' });
    },
    tabsClick(e) {
      this.activeIndex = e.index;
      this.setDateRangeByTab();
      this.orderLogInfo();
    },
    setDateRangeByTab() {
      const today = new Date();
      const formatDate = d => d.toISOString().split('T')[0];
      if (this.activeIndex === 0) {
        this.startTime = this.endTime = formatDate(today);
      } else if (this.activeIndex === 1) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        this.startTime = this.endTime = formatDate(yesterday);
      } else if (this.activeIndex === 2) {
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 6);
        this.startTime = formatDate(weekAgo);
        this.endTime = formatDate(today);
      }
      this.timeRange = `${this.startTime} ~ ${this.endTime}`;
    },
    async orderLogInfo() {
      const requestPayload = {
        page: this.page,
        limit: this.limit,
        status: this.selectedStatus.value,
        startTime: this.startTime,
        endTime: this.endTime,
        activeIndex: this.activeIndex,
        type: this.selectedBankType.value,
        lang: this.$store.state.user.language
      };

      console.groupCollapsed('%c🔍 Order Log API Request', 'color: #2196f3; font-weight: bold;');
      console.log('Request Payload:', requestPayload);
      console.groupEnd();

      try {
        const { data, code } = await getOrderLogListInfo(requestPayload);
        console.groupCollapsed('%c📦 API Response', 'color: #4caf50; font-weight: bold;');
        console.log('Response Code:', code);
        console.log('Response Data:', data);
        console.groupEnd();

        if (code === 200) {
          this.rechargeList = data.info?.data || [];
          this.total = data.count || 0;
        } else {
          console.warn('Unexpected response code:', code);
        }
      } catch (error) {
        console.error('%c❌ API Error:', 'color: red; font-weight: bold;', error);
      }
    },
    allCz() {
      this.czShow = true;
    },
    czConfirm(e) {
      this.selectedBankType = this.bankTypes[e.indexs[0]];
      this.orderLogInfo();
      this.czShow = false;
    },
    czClose() {
      this.czShow = false;
    },
    allType() {
      this.typeShow = true;
    },
    typeConfirm(e) {
      this.selectedStatus = this.statusTypes[e.indexs[0]];
      this.orderLogInfo();
      this.typeShow = false;
    },
    typeClose() {
      this.typeShow = false;
    },
    allTime() {
      this.timeShow = true;
    },
    confirm(e) {
      this.timeRange = `${e[0]} ~ ${e[e.length - 1]}`;
      this.startTime = e[0];
      this.endTime = e[e.length - 1];
      this.orderLogInfo();
      this.timeShow = false;
    },
    close() {
      this.timeShow = false;
    },
    leftClick() {
      this.$tab.navigateTo('/pages/userinfo/index');
    }
  }
};
</script>



<style scoped>
	page {
		background-color: #fff;
	}


	.u-button__text {
		font-size: 23px !important;
	}

	.custom-badge {
		position: absolute !important;
		/* 强制覆盖默认定位 */
		top: -5px !important;
		/* 根据需求调整 */
		right: -15px !important;
		/* 根据需求调整 */
	}

	.tabPane-tips {
		width: 100%;
		height: 55px;
		line-height: 55px;
		display: flex;
		background: #f0f0f0;
		border-bottom: 1px solid #ebebeb;
		z-index: 1;
	}

	.am-flexbox.am-flexbox-align-middle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 16px;
		gap: 16px;
	}

	.filter-tabPane-btn {
		color: #108ee9;
		display: inline-block;
		height: 33px;
		line-height: 33px;
		margin: 0;
		border-radius: 5.52px;
		white-space: nowrap;
		padding: 0 40rpx;
		border: 1px solid #108ee9;
	}

	/* 卡片容器 */
	.card-list {
		height: calc(100vh - 300rpx);
		/* 根据实际布局调整高度 */
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 单个卡片样式 */
	.recharge-card {
		background: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
		padding: 24rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.bank-name {
		font-size: 32rpx;
		color: #333;
		font-weight: 500;
	}

	.status {
		font-size: 28rpx;
		color: #108ee9;
		padding: 6rpx 16rpx;
		border: 1rpx solid #108ee9;
		border-radius: 8rpx;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	.amount {
		display: flex;
		align-items: flex-end;
		gap: 10rpx;
	}

	.amount .label {
		font-size: 28rpx;
		color: #666;
	}

	.amount .value {
		font-size: 40rpx;
		color: #333;
		font-weight: 600;
	}

	.details {
		display: flex;
		justify-content: space-between;
		gap: 10rpx;
		margin-top: 20rpx;
		line-height: 60rpx;
	}

	.detail-item {
		display: flex;
		flex-direction: column;

		align-items: center;
	}

	.detail-item .label {
		font-size: 26rpx;
		color: #666;
		white-space: nowrap;
	}

	.detail-item .value {
		font-size: 26rpx;
		color: #333;
	}
</style>