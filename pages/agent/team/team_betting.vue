<template>
	<view class="voucher_center" @click="closeAllDropdowns">
		<view class="navHeader" style="margin-bottom: 100rpx;">
		  <u-navbar
		    bgColor="black"
		    :height="50"
		    :safeAreaInsetTop="false"
		    @leftClick="leftClick"
		  >
		    <!-- Left slot -->
		    <template v-slot:left>
		      <u-icon name="arrow-left" color="#be984c" size="22"></u-icon>
		    </template>
		
		    <!-- Center slot -->
		    <template v-slot:center>
		    <text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('team.text95')}}</text>
		    </template>
		
		    <!-- Right slot -->
		    <template v-slot:right>
		      <view class="nav-actions">
		        <u-button class="exclude-btn" size="mini" type="primary" shape="circle">
		          <text style="font-size: 20rpx; line-height: 1.2;">
		            Exclusion<br />turnover list
		          </text>
		        </u-button>
		        <u-icon @click="showDataClickFunction" name="list" color="#be984c" size="20" style="margin-left: 15rpx;" />
		      </view>
		    </template>
		  </u-navbar>
		</view>

		<view>
			<custom-tabs :tabsList="tabs" @change="handleTabChange" :isShow="true" />

			<view class="content">
				<view style="display: flex; justify-content: space-between; align-items: center; gap:10; padding: 0 20rpx; box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08); border-bottom: 2rpx solid rgb(17, 39, 58);">
					<view style="width:45%;">
						<u-input v-model="filters.username" clearable @clear="clearEnter" :placeholder="$t('team.text6')" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399">
							<template slot="suffix">
								<u-button size="mini" @tap="handleSearchEnter">search</u-button>
							</template>
						</u-input>
					</view>

					<view style="display: flex; align-items: center; padding: 40rpx 0rpx;" @click="allSearchType">
						<text style="font-size: 20rpx; margin-right: 2rpx;">{{ selectedType }}</text>
						<u-icon :name="!showTypeModal ? 'arrow-down' : 'arrow-up'" size="15"></u-icon>
					</view>

					<view style="display: flex; align-items: center; padding: 40rpx 0rpx;" @click="allSearchVendor">
						<text style="font-size: 20rpx; margin-right: 2rpx;">{{ selectedVendor }}</text>
						<u-icon :name="!showVendorModal ? 'arrow-down' : 'arrow-up'" size="15"></u-icon>
					</view>

					<view style="display: flex; align-items: center; padding: 40rpx 0rpx;" @click="allSearch">
						<text style="font-size: 20rpx; margin-right: 2rpx;">{{ selectedDateTypeName }}</text>
						<u-icon :name="!showModal ? 'arrow-down' : 'arrow-up'" size="15"></u-icon>
					</view>
				</view>

				<view v-show="showVendorModal" style="background-color: #fff; width: 100%; min-height: 300px; position: absolute; z-index: 1000;">
					<view style="padding: 20rpx; display: flex; flex-wrap: wrap; gap: 20rpx;">
						<view v-for="(vendor, index) in vendorList" :key="index" @click="selectVendor(vendor)"
							style="border: 2rpx solid #ccc; border-radius: 10rpx; min-width: 70rpx; background-color: #f9f9f9; padding: 10rpx 15rpx; text-align: center;">
							<text style="font-size: 20rpx;">{{ vendor }}</text>
						</view>
					</view>
				</view>

				<view v-show="showTypeModal" style="background-color: #fff; width: 100%; position: absolute; z-index: 1000;">
					<view style="padding: 0rpx 20rpx;">
						<custom-tabs-team-betting :tabsList="tabs" @change="handleTabChange" :isShow="true" />
					</view>
				</view>

				<view v-show="showModal" style="background-color: #fff; width: 100%; position: absolute; z-index: 1000;">
					<view style="padding: 0rpx 20rpx;">
						<view class="item-group" style="margin-top: 30rpx;">
							<view class="item-btn" v-for="(item,index) in dateTypeArr" :key="index"
								:class="filters.date_type == item.key ? 'checked_btn' : ''" @tap="dateTypeClick(item)">
								<text>{{ item.name }}</text>
							</view>
						</view>

						<view class="calendar-group" style="margin-top: 30rpx;">
							<text style="font-size: 12px;">{{$t('team.text91')}}</text>
							<view style="margin-top: 20rpx;">
								<u-input placeholder="请选择日期" v-model="textDate" disabled="">
									<template slot="suffix">
										<u-button @tap="dateTypeTimeClick('select')" color="#be984c" size="mini">选择日期</u-button>
									</template>
								</u-input>
							</view>
						</view>
					</view>
				</view>

				<!-- Static Game Cards (can be looped in future) -->
				<view style="margin-top:30rpx;" v-for="i in 10" :key="i">
					<view class="my-withdraw-cards">
						<view class="my-ew-banks-wrap">
							<view class="withdraw-bank-card-ew">
								<view class="cards-title" style="padding:0 20rpx; display: flex; justify-content: space-between;">
									<view style="font-weight: bold;">Pocket Gaming | <span style="font-weight: lighter;margin-left: 10rpx;"> Slot </span></view>
									<view>{{ filters.username || userInfo.username }}</view>
								</view>
								<view class="card" style="padding-bottom: 20rpx;padding-top: 20rpx;background-color: #faf8f5; border-bottom: 1px solid black;">
									<view class="row">
										<view class="item">
											<text class="label">Fortune Dragon</text>
											<text class="value">411 rounds </text>
										</view>
									</view>
									<view class="row">
										<view class="item">
											<text class="label">Valid Bet</text>
											<text class="value">298,450</text>
										</view>
									</view>
									<view class="row">
										<view class="item">
											<text class="label">Win / Loss</text>
											<text class="value">74,000</text>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					
				</view>
				</br> </br> </br>
				<view class="sticky-footer">
				  <view class="footer-row">
				    <view class="footer-col">
				      <text class="footer-label">Records</text>
				      <text class="footer-value green">9</text>
				    </view>
				    <view class="footer-col">
				      <text class="footer-label">Valid bet</text>
				      <text class="footer-value green">600,000.00</text>
				    </view>
				  </view>
				  <view class="footer-row">
				    <view class="footer-col">
				      <text class="footer-label">Total rounds</text>
				      <text class="footer-value green">112</text>
				    </view>
				    <view class="footer-col">
				      <text class="footer-label">Win/Loss</text>
				      <text class="footer-value red">-12,324.00</text>
				    </view>
				  </view>
				</view>


			</view>
		</view>

		<global-notify />
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
		<u-calendar
			:show="rqShow"
			:min-date="calendar.minDate"
			:max-date="calendar.maxDate"
			:default-date="currentDefaultDate"
			mode="range"
			:monthNum="calendar.monthNum"
			@close="rqShow=false"
			@confirm="handleConfirm"
			closeOnClickOverlay
		/>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { grReportList, getGameTypeListYk } from '@/api/jogos.js';
import CustomTabs from '@/components/custom-tabs-yk.vue';
import CustomTabsTeamBetting from '@/components/custom-tabs-team-betting.vue';

export default {
	components: { CustomTabs, CustomTabsTeamBetting },
	computed: {
		...mapGetters(['userInfo']),
		currentDefaultDate() {
			return this.currentDateType === 'select'
				? [this.filters.startTime, this.filters.endTime]
				: [];
		},
		selectedDateTypeName() {
			if (this.filters.startTime && this.filters.endTime) {
				const format = date => {
					if (!date) return '';
					const [y, m, d] = date.split('-');
					return `${m.padStart(2, '0')}/${d.padStart(2, '0')}`;
				};
				return `${format(this.filters.startTime)}-${format(this.filters.endTime)}`;
			}
			const typeItem = this.dateTypeArr.find(item => item.key === this.filters.date_type);
			return typeItem ? typeItem.name : '未知时间段';
		}
	},
	data() {
		return {
			rqShow: false,
			showModal: false,
			showTypeModal: false,
			showVendorModal: false,
			currentTab: 0,
			currentDateType: '',
			selectedType: "Types",
			selectedVendor: "Vendors",
			showTypeSelect : false ,
			tabs: [],
			vendorList: ['All', 'JL', 'PG', 'PP', 'CQ9', 'SG', 'JDB', 'KA', 'AMBS', 'PS', 'AE', 'SW', 'YB', 'JK', 'BNG', 'EP', 'BT', 'KM', 'LCC', '365', 'AMB', 'GPI', 'WE', 'DG', 'SEX', 'TCG_SEA', 'TF', 'BTI', 'SBO', 'IA', 'BB', 'FB', 'UG2', 'SV3'],
			dateTypeArr: [
				{ key: 'today', name: this.$t('team.text54') },
				{ key: 'yesterday', name: this.$t('team.text53') },
				{ key: 'last7days', name: this.$t('team.text55') },
				{ key: 'month', name: this.$t('team.text56') }
			],
			selectOptions: [
			  { label: this.$t('team.text108'), value: 0 },
			  { label: this.$t('team.text109'), value: 1 },
			  { label: this.$t('team.text110'), value: 2 },
			  { label: this.$t('team.text111'), value: 3 },
			  { label: this.$t('team.text112'), value: 4 },
			  { label: this.$t('team.text113'), value: 5 },
			  { label: this.$t('team.text114'), value: 6 }
			],
			filters: {
				username: '',
				date_type: 'today',
				startTime: '',
				endTime: '',
				game_class_id: 0,
				game_provoder_gpid: 0,
				type: 1,
				lv: 1
			},
			calendar: {
				minDate: '',
				maxDate: '',
				defaultDate: '',
				monthNum: 13
			}
		};
	},
	onLoad() {
		this.grReportListInfo();
		this.getGameTypeListInfo();
		this.chooseTimed();
	},
	methods: {
		selectVendor(vendor) {
			this.selectedVendor = vendor;
			this.showVendorModal = false;
		},
		handleSearchEnter() {
			uni.showLoading({ title: '用户搜索中...' });
			this.grReportListInfo();
		},
		clearEnter() {
			this.filters.username = '';
			this.grReportListInfo();
		},
		allSearch() {
			this.showModal = !this.showModal;
			if (this.showModal) this.showTypeModal = this.showVendorModal = false;
		},
		allSearchType() {
			this.showTypeModal = !this.showTypeModal;
			if (this.showTypeModal) this.showModal = this.showVendorModal = false;
		},
		allSearchVendor() {
			this.showVendorModal = !this.showVendorModal;
			if (this.showVendorModal) this.showModal = this.showTypeModal = false;
		},
		showDataClickFunction(){
			this.showTypeSelect = !this.showTypeSelect
		},
		closeAllDropdowns() {
		  // this.showTypeSelect = false
		},
		dateTypeClick(item) {
			this.filters.date_type = item.key;
			this.filters.startTime = '';
			this.filters.endTime = '';
			this.showModal = false;
			this.grReportListInfo();
		},
		dateTypeTimeClick(type) {
			this.currentDateType = type;
			this.rqShow = true;
		},
		handleConfirm([start, end]) {
			this.filters.startTime = start;
			this.filters.endTime = end;
			this.filters.date_type = 'custom';
			this.rqShow = false;
			this.showModal = false;
			this.grReportListInfo();
		},
		chooseTimed() {
			const today = this.getToday();
			const first = this.getFirstDayOfMonth();
			this.calendar.minDate = first;
			this.calendar.maxDate = today;
			this.calendar.defaultDate = today;
		},
		getFirstDayOfMonth() {
			const d = new Date();
			return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-01`;
		},
		getToday() {
			const d = new Date();
			return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
		},
		async getGameTypeListInfo() {
			const { data, code } = await getGameTypeListYk();
			if (code === 200) this.tabs = data;
		},
		async grReportListInfo() {
			try {
				const { data, code } = await grReportList(this.filters);
				if (code === 200) this.dataList = data;
			} catch (e) {
				console.error('加载失败:', e);
			} finally {
				uni.hideLoading();
			}
		},
		handleTabChange(item, index) {
			this.filters.type = item.id;
			this.filters.startTime = '';
			this.filters.endTime = '';
			this.filters.game_class_id = [...new Set((item.child || []).map(i => i.game_class_id))].join(", ") || 0;
			this.filters.game_provoder_gpid = [...new Set((item.child || []).map(i => i.game_provoder_gpid))].join(", ") || 0;
			this.currentTab = index;

			const lang = this.$store.state.user.language;
			this.selectedType = lang === 'burmese' ? item.burmese : lang === 'english' ? item.english : item.title;

			this.grReportListInfo();
			this.showTypeModal = false;
		},
		leftClick() {
			this.$tab.navigateTo(`/pages/userinfo/index`);
		}
	}
};
</script>


<style scoped>
page {
	background-color: #fff;
}
.nav-title {
  font-size: 35rpx;
  font-weight: bold;
  color: #fff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15rpx;
}

.exclude-btn {
  padding: 10rpx 20rpx;
  border-radius: 50rpx;
  line-height: 1.2;
  font-size: 20rpx;
  text-align: center;
}
.content {
	font-size: 40rpx;
}

.cards-title {
	font-size: 24rpx;
	padding: 0 10rpx 10rpx 0;
	color: #595959;
}

.item-title {
	font-size: 25rpx;
	line-height: 80rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.item-group {
	display: flex;
	justify-content: space-between;
	font-size: 22rpx;
	flex-wrap: wrap;
	gap: 30rpx;
}

.item-btn {
	border: 1px solid #cdcdcd;
	border-radius: 10rpx;
	width: 30%;
	min-height: 60rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	line-height: normal;
	padding: 0 4rpx;
	word-wrap: break-word;
	word-break: break-word;
	text-align: center;
}

.checked_btn {
	border: 1px solid #ec2529;
	color: #ec2529;
	background-color: #fef4f4;
}

.card {
	margin-top: 20rpx;
	background: #fff;
/* 	border-radius: 12rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1); */
}

.row {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20rpx;
}

.item {
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20rpx;
}

.label {
	color: #666;
	font-size: 24rpx;
	margin-right: 10rpx;
}

.value {
	color: #333;
	font-size: 24rpx;
	font-weight: bold;
	text-align: right;
	flex-shrink: 0;
}

.row:last-child {
	margin-bottom: 0;
}

.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  border-top: 1rpx solid #eee;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.06);
}

.footer-row {
  display: flex;
  justify-content: space-between;
}

.footer-col {
  display: flex;
  gap: 10rpx;
  font-size: 26rpx;
}

.footer-label {
  font-weight: 500;
  color: #000;
}

.footer-value {
  font-weight: bold;
}

.green {
  color: #27ae60;
}

.red {
  color: #e74c3c;
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
