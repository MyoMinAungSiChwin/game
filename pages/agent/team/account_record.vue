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
    <view v-if="filteredData.length" class="record-list">
      <view class="record-item" v-for="item in filteredData" :key="item.id">
        <view class="top">
          <text class="username">{{ item.username }}</text>
          <text class="type">{{ item.typeLabel }}</text>
        </view>
        <view class="bottom">
          <text class="amount">{{ item.amount }} MMK</text>
          <text class="date">{{ item.date }}</text>
        </view>
      </view>
    </view>
    <view v-else class="empty-box">
      <image src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" style="width: 120rpx; height: 120rpx;" />
      <view class="empty-text">No data</view>
    </view>

    <!-- Calendar -->
    <u-calendar
      :show="rqShow"
      mode="range"
      @confirm="handleConfirm"
      @close="rqShow = false"
    />
  </view>
</template>
<script>
export default {
  data() {
    return {
      rqShow: false,
      showTypeSelect: false,
      showDateOptions: false,
      filters: {
        username: '',
        selectType: 0,
        date_type: 'today',
        startTime: '',
        endTime: ''
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
      fakeData: [
        { id: 1, username: 'din0xing', type: 1, amount: 2000, date: '2025-07-03' },
        { id: 2, username: 'hello99', type: 2, amount: 5000, date: '2025-07-02' },
        { id: 3, username: 'din0xing', type: 5, amount: 1000, date: '2025-07-01' }
      ]
    }
  },
  computed: {
    selectedTypeLabel() {
      return this.selectOptions.find(i => i.value === this.filters.selectType)?.label || 'All'
    },
    selectedDateTypeName() {
      const labelMap = {
        today: 'Today',
        yesterday: 'Yesterday',
        last7days: 'Last 7 Days',
        month: 'This Month',
        custom: `${this.filters.startTime || 'Start'} - ${this.filters.endTime || 'End'}`
      }
      return labelMap[this.filters.date_type] || 'Custom'
    },
    currentDefaultDate() {
      const today = new Date().toISOString().split('T')[0]
      return [this.filters.startTime || today, this.filters.endTime || today]
    },
    minDate() {
      return '2025-01-01'
    },
    maxDate() {
      const d = new Date()
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    },
    filteredData() {
      const { username, selectType, startTime, endTime } = this.filters
      return this.fakeData
        .filter(item => {
          const matchUser = !username || item.username.includes(username)
          const matchType = selectType === 0 || item.type === selectType
          const matchDate = (!startTime || !endTime) || (item.date >= startTime && item.date <= endTime)
          return matchUser && matchType && matchDate
        })
        .map(item => ({
          ...item,
          typeLabel: this.selectOptions.find(opt => opt.value === item.type)?.label || 'Other'
        }))
    }
  },
  methods: {
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
    },
    openCalendar() {
      this.rqShow = true
    },
    handleConfirm([start, end]) {
      this.filters.startTime = start
      this.filters.endTime = end
      this.filters.date_type = 'custom'
      this.rqShow = false
      this.showDateOptions = false
    },
    onDateTypeClick(item) {
      const today = new Date()
      const format = d => d.toISOString().split('T')[0]
      let start = '', end = ''
      switch (item.key) {
        case 'today': start = end = format(today); break
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
      this.filters.startTime = start
      this.filters.endTime = end
      this.filters.date_type = item.key
      this.closeAllDropdowns()
    },
    goBack() {
      uni.navigateTo({
        url: '/pages/userinfo/index'
      })
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
.record-item {
  background: white;
  padding: 20rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
}
.record-item .top,
.record-item .bottom {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
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
