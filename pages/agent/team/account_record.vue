<template>
  <view class="account-record" @click="closeAllDropdowns">
    <!-- Header -->
    <view class="navHeader">
      <u-navbar leftText="Back" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="goBack">
        <template #left>
          <u-icon name="arrow-left" color="#be984c" size="20" />
        </template>
        <template #center>
          <text class="title">{{ $t('team.text90') }}</text>
        </template>
      </u-navbar>
    </view>

    <view style="height: 80rpx" />

    <!-- Filter Bar -->
    <view class="filter-bar">
      <view class="filter-btn" style="flex-basis: 20%;" @tap.stop="toggleTypeDropdown">
        <text>{{ selectedTypeLabel }}</text>
        <u-icon name="arrow-down" size="14" color="#666" style="margin-left: 8rpx;" />
      </view>

      <view class="filter-btn" style="flex-basis: 45%;" @tap.stop="toggleDateDropdown">
        <text>{{ selectedDateTypeName }}</text>
        <u-icon :name="showDateOptions ? 'arrow-up' : 'arrow-down'" size="14" color="#666" style="margin-left: 8rpx;" />
      </view>

      <u-input
        v-model="filters.username"
        placeholder="Username"
        shape="circle"
        size="mini"
        clearable
        class="search-input"
        style="flex-basis: 35%;"
        @tap.stop
      />
    </view>

    <!-- Type Dropdown Sheet -->
    <view v-if="showTypeSelect" class="bottom-sheet" @tap.self="closeAllDropdowns">
      <view class="sheet-content">
        <scroll-view scroll-y class="sheet-scroll">
          <view
            v-for="item in selectOptions"
            :key="item.value"
            class="sheet-item"
            :class="{ active: item.value === filters.selectType }"
            @tap.stop="selectType(item)"
          >
            {{ item.label }}
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- Date Dropdown -->
    <view v-if="showDateOptions" class="date-options" @tap.self="closeAllDropdowns">
      <view
        v-for="item in dateTypeOptions"
        :key="item.key"
        class="date-option"
        :class="{ active: filters.date_type === item.key }"
        @tap.stop="onDateTypeClick(item)"
      >
        {{ item.name }}
      </view>
      <view class="date-option" @tap.stop="openCalendar">
        📅 {{ filters.startTime || 'Start' }} - {{ filters.endTime || 'End' }}
      </view>
    </view>

    <!-- Record List -->
    <scroll-view
      scroll-y
      class="record-list"
      :style="{height: 'calc(100vh - 200rpx)'}"
      @scrolltolower="onScrollToLower"
    >
      <view v-if="records.length">
        <view class="record-card" v-for="item in records" :key="item.id">
          <view class="card-header">
            <u-icon name="order" color="#19c2a6" size="22" />
            <text class="type-title">{{ formatMemo(item.memo) }}</text>
            <text class="date">{{ formatTime(item.createtime) }}</text>
          </view>
          <view class="card-body">
            <view class="row">
              <text class="label">Username：</text>
              <text class="value">{{ item.username }}</text>
            </view>
            <!-- <view class="row">
              <text class="label">订单编号：</text>
              <text class="value">{{ item.order_no || '' }}</text>
              <text class="platform">{{ item.platform || '' }}</text>
            </view> -->
          </view>
          <view class="card-footer">
            <view class="footer-col">
              <text class="footer-label">Balance</text>
              <text class="footer-value">{{ item.after*1 || '0.00' }}</text>
            </view>
            <view class="footer-col">
              <text class="footer-label">Transaction Amounts</text>
              <text class="footer-value" :class="item.money > 0 ? 'amount-in' : 'amount-out'">
                {{ item.money > 0 ? '+' : '' }}{{ item.money*1 }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-box">
        <image src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" style="width: 120rpx; height: 120rpx;" />
        <view class="empty-text">No data</view>
      </view>
    </scroll-view>

    <!-- Calendar -->
	<u-calendar
	  :show="rqShow"
	  mode="range"
	  :min-date="minDate"
	  :max-date="maxDate"
	  @confirm="handleConfirm"
	  @close="rqShow = false"
	/>
  </view>
</template>
<script>
import {
	AccountRecord
} from '@/api/jogos.js'
export default {
  data() {
    const today = new Date();
    const format = d => d.toISOString().split('T')[0];
    const todayStr = format(today);
    return {
      rqShow: false,
      showTypeSelect: false,
      showDateOptions: false,
      filters: {
        username: '',
        selectType: 0,
        date_type: 'today',
        startTime: todayStr + ' 00:00:00',
        endTime: todayStr + ' 23:59:59'
      },
      dateTypeOptions: [
        { key: 'today', name: 'Today' },
        { key: 'yesterday', name: 'Yesterday' },
        { key: 'last7days', name: 'Last 7 Days' },
        { key: 'month', name: 'This Month' }
      ],
      selectOptions: [
        { label: 'All', value: 0 },
        { label: 'Deposit', value: 1 },
        { label: 'Withdraw', value: 2 },
        { label: 'Betting', value: 3 },
        { label: 'Winning', value: 4 },
        { label: 'Bonus', value: 5 },
        { label: 'Other', value: 6 }
      ],
      records: [],
      total: 0,
      page: 1,
      limit: 20,
      loading: false,
      finished: false,
      fakeData: [
        { id: 1, username: 'din0xing', type: 1, amount: 2000, date: '2025-07-03' },
        { id: 2, username: 'hello99', type: 2, amount: 5000, date: '2025-07-02' },
        { id: 3, username: 'din0xing', type: 5, amount: 1000, date: '2025-07-01' }
      ]
    }
  },
	computed: {
	  // ✅ 3 months ago
	  minDate() {
	    const d = new Date();
	    d.setMonth(d.getMonth() - 2);
	    return d.toISOString().split('T')[0];
	  },
	
	  // ✅ Today
	  maxDate() {
	    const d = new Date();
	    return d.toISOString().split('T')[0];
	  },
	
	  selectedTypeLabel() {
	    return this.selectOptions.find(i => i.value === this.filters.selectType)?.label || 'All';
	  },
	
	  selectedDateTypeName() {
	    const labelMap = {
	      today: 'Today',
	      yesterday: 'Yesterday',
	      last7days: 'Last 7 Days',
	      month: 'This Month',
	      custom: `${this.filters.startTime || 'Start'} - ${this.filters.endTime || 'End'}`
	    };
	    return labelMap[this.filters.date_type] || 'Custom';
	  },
	
	  currentDefaultDate() {
	    const today = new Date().toISOString().split('T')[0];
	    return [this.filters.startTime || today, this.filters.endTime || today];
	  },
	
	  filteredData() {
	    const { username, selectType, startTime, endTime } = this.filters;
	    return this.fakeData
	      .filter(item => {
	        const matchUser = !username || item.username.includes(username);
	        const matchType = selectType === 0 || item.type === selectType;
	        const matchDate = (!startTime || !endTime) || (item.date >= startTime && item.date <= endTime);
	        return matchUser && matchType && matchDate;
	      })
	      .map(item => ({
	        ...item,
	        typeLabel: this.selectOptions.find(opt => opt.value === item.type)?.label || 'Other'
	      }));
	  }
	},
  onLoad(){
    this.page = 1;
    this.finished = false;
    this.AccountRecord(false);
  },
  methods: {
	  
   //  async AccountRecord(isAppend = false) {
   //    this.loading = true;
   //    const params = {
   //      ...this.filters,
   //      page: this.page,
   //      limit: this.limit
   //    };
   //    let { code, data } = await AccountRecord(params);
   //    if (code === 200) {
   //      if (isAppend) {
   //        this.records = this.records.concat((data.list || []).map(item => ({
   //          ...item,
   //          typeLabel: this.selectOptions.find(opt => opt.value === item.type)?.label || 'Other'
   //        })));
   //      } else {
   //        this.records = (data.list || []).map(item => ({
   //          ...item,
   //          typeLabel: this.selectOptions.find(opt => opt.value === item.type)?.label || 'Other'
   //        }));
   //      }
   //      this.total = data.total || 0;
   //      this.finished = this.records.length >= this.total;
   //    }
   //    this.loading = false;
   //  },
	  async AccountRecord(isAppend = false) {
	    this.loading = true;
	    const params = {
	      ...this.filters,
	      page: this.page,
	      limit: this.limit
	    };
	  
	    let { code, data } = await AccountRecord(params);
	  
	    // ✅ Console log the raw response for debugging
	    console.log('API Params:', params);
	    console.log('API Response:', data);
	  
	    if (code === 200) {
	      const processedData = (data.list || []).map(item => ({
	        ...item,
	        typeLabel: this.selectOptions.find(opt => opt.value === item.type)?.label || 'Other'
	      }));
	  
	      if (isAppend) {
	        this.records = this.records.concat(processedData);
	      } else {
	        this.records = processedData;
	      }
	  
	      this.total = data.total || 0;
	      this.finished = this.records.length >= this.total;
	    }
	    this.loading = false;
	  },
    toggleTypeDropdown() {
      this.showTypeSelect = !this.showTypeSelect
      this.showDateOptions = false
    },
    toggleDateDropdown() {
      this.showDateOptions = !this.showDateOptions
      this.showTypeSelect = false
    },
    closeAllDropdowns() {
      this.showTypeSelect = false
      this.showDateOptions = false
    },
    selectType(item) {
      this.filters.selectType = item.value
      this.closeAllDropdowns()
      this.AccountRecord();
    },
    openCalendar() {
      this.rqShow = true
    },
    handleConfirm(val) {
      // 过滤掉 __ob__ 这种非日期属性
      const arr = Array.isArray(val) ? val.filter(v => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) : [];
      const start = arr[0];
      const end = arr[arr.length - 1] || start;
      if (!start) return;
      this.filters.startTime = start + ' 00:00:00';
      this.filters.endTime = end + ' 23:59:59';
      this.filters.date_type = 'custom';
      this.rqShow = false;
      this.showDateOptions = false;
      this.AccountRecord();
    },
	
    onDateTypeClick(item) {
      const today = new Date()
      const format = d => d.toISOString().split('T')[0]
      let start = '', end = ''
      switch (item.key) {
        case 'today':
          start = end = format(today)
          break
        case 'yesterday':
          const y = new Date(today)
          y.setDate(y.getDate() - 1)
          start = end = format(y)
          break
        case 'last7days':
          const s7 = new Date(today)
          s7.setDate(s7.getDate() - 6)
          start = format(s7)
          end = format(today)
          break
        case 'month':
          const f = new Date(today.getFullYear(), today.getMonth(), 1)
          start = format(f)
          end = format(today)
          break
      }
      this.filters.startTime = start + ' 00:00:00'
      this.filters.endTime = end + ' 23:59:59'
      this.filters.date_type = item.key
      this.closeAllDropdowns()
      this.AccountRecord();
    },
    goBack() {
      uni.navigateTo({
        url: '/pages/userinfo/index'
      })
    },
    onScrollToLower() {
      if (this.loading || this.finished) return;
      this.page += 1;
      this.AccountRecord(true);
    },
    formatTime(ts) {
      if (!ts) return '';
      const date = new Date(Number(ts) * 1000);
      const pad = n => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    },
    formatMemo(memo) {
      switch (memo) {
        case '充值审核通过':
          return 'Deposit Success';
        case '发起提现':
          return 'Withdraw';
        case '提现驳回':
          return 'Withdraw Rejected';
        case '游戏下注扣款':
          return 'Betting';
        default:
          return memo;
      }
    }
  },
  watch: {
    'filters.username'(val) {
      this.page = 1;
      this.finished = false;
      this.AccountRecord(false);
    }
  }
}
</script>
<style scoped>
.account-record {
  background: #f8f8f8;
  min-height: 100vh;
}
.title {
  font-size: 35rpx;
  color: #be984c;
  font-weight: bold;
}
.filter-bar {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  gap: 20rpx;
}
.filter-btn {
  padding: 10rpx 20rpx;
  background: #f0f0f0;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
}
.search-input {
  min-width: 70rpx;
}
.date-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  background: white;
  padding: 20rpx;
}
.date-option {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  background: #f0f0f0;
}
.date-option.active {
  background: #be984c;
  color: white;
}
.record-list {
  padding: 20rpx;
}
.record-card {
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.04);
  padding: 0 0 20rpx 0;
}
.card-header {
  display: flex;
  align-items: center;
  padding: 20rpx 20rpx 0 20rpx;
  font-size: 30rpx;
  font-weight: bold;
}
.type-title {
  margin-left: 12rpx;
  color: #19c2a6;
}
.card-header .date {
  margin-left: auto;
  color: #999;
  font-size: 24rpx;
  font-weight: normal;
}
.card-body {
  padding: 10rpx 20rpx 0 20rpx;
}
.row {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  font-size: 26rpx;
}
.label {
  color: #999;
}
.value {
  color: #333;
  margin-left: 8rpx;
}
.platform {
  margin-left: auto;
  color: #666;
  font-size: 24rpx;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  padding: 18rpx 20rpx 0 20rpx;
  border-top: 1rpx solid #f0f0f0;
  margin-top: 10rpx;
}
.footer-col {
  display: flex;
  flex-direction: column;
}
.footer-label {
  color: #999;
  font-size: 22rpx;
}
.footer-value {
  font-size: 30rpx;
  font-weight: bold;
  margin-top: 4rpx;
}
.amount-in {
  color: #59d169;
}
.amount-out {
  color: #f6573a;
}
.empty-box {
  text-align: center;
  margin-top: 200rpx;
}
.empty-text {
  color: #999;
  font-size: 28rpx;
  margin-top: 20rpx;
}
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.sheet-content {
  background: #fff;
  overflow: hidden;
}
.sheet-scroll {
  max-height: 1000rpx;
}
.sheet-item {
  padding: 32rpx;
  text-align: left;
  font-size: 24rpx;
  border-bottom: 1rpx solid #eee;
}
.sheet-item.active {
  background-color: #be984c;
  color: #fff;
}
</style>
