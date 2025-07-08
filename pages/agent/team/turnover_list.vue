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
		      <text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('tzsCustomize.title8')}}</text>
		    </template>

		    <!-- Right slot -->
		    <template v-slot:right>
		      <view class="nav-actions">
		        <u-icon 
		          @click="notice" 
		          name="question-circle" 
		          color="#be984c" 
		          size="20" 
		          style="margin-left: 15rpx;" 
		        />
		      </view>
		    </template>
		  </u-navbar>
		</view>

		<!-- Filters -->
		<view class="content">
			<view style="display: flex; justify-content: space-between; align-items: center; gap:10; padding: 0 20rpx; box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);">
				<view style="display: flex; align-items: center; padding: 40rpx 0rpx;" @click="showDataClickFunction" >
					<text style="font-size: 20rpx; margin-right: 2rpx;">{{ selectedVendor }}</text>
					<u-icon :name="!showVendorModal ? 'arrow-down' : 'arrow-up'" size="15"></u-icon>
				</view>
				<view style="width:85%;">
					<u-input v-model="filters.username" clearable @clear="clearEnter" :placeholder="$t('team.text6')" prefixIcon="search" prefixIconStyle="font-size: 22px;color: #909399">
						<template slot="suffix">
							<u-button size="mini" @tap="handleSearchEnter">search</u-button>
						</template>
					</u-input>
				</view>
			</view>

			<!-- Game Cards -->
			<view style="margin-top:30rpx;" v-for="i in 10" :key="i">
				<view class="my-withdraw-cards">
					<view class="my-ew-banks-wrap">
						<view class="withdraw-bank-card-ew">
							<view class="cards-title" style="padding:0 20rpx; display: flex; justify-content: space-between;">
								<view style="font-weight: bold;">Pocket Gaming</view>
							</view>
							<view class="card" style="padding-bottom: 20rpx;padding-top: 20rpx;background-color: #faf8f5;">
								<view class="row">
									<view class="item"><text class="label">{{$t('tzsCustomize.title15')}} : Slot</text></view>
								</view>
								<view class="row">
									<view class="item"><text class="label">{{$t('tzsCustomize.title16')}}: CQ9</text></view>
								</view>
								<view class="row">
									<view class="item"><text class="label">{{$t('tzsCustomize.title17')}} : 100%</text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			</br></br></br>
		</view>

		<global-notify />

		<!-- Vendor Dropdown -->
		<view v-if="showTypeSelect" style="max-height: 400px;" class="bottom-sheet" @tap.self="closeAllDropdowns">
		  <view class="sheet-content">
		    <scroll-view scroll-y class="sheet-scroll">
		      <view class="close-button" @click="closeTheDropDownSelect">
		        <text>{{ selectedVendor }}</text>
		        <text>×</text>
		      </view>
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

		<!-- Reminder Popup -->
		<u-popup :show="showReminder" mode="center" border-radius="16" >
		  <view style="padding: 40rpx; width: 600rpx;">
		    <view style="font-size: 32rpx; font-weight: bold; margin-bottom: 20rpx;">{{$t('tzsCustomize.title18')}}</view>
		    <view style="font-size: 24rpx; color: red; font-weight: bold; margin-bottom: 20rpx;">
		      {{$t('tzsCustomize.title19')}}
		    </view>
		    <view style="font-size: 22rpx; color: #333; line-height: 1.6;"> 		      {{$t('tzsCustomize.title20')}}
		     <br/><br/>
		      <text style="font-weight:bold;">  {{$t('tzsCustomize.title21')}}:</text><br/>
		       {{$t('tzsCustomize.title22')}}
		    </view>
		    <view style="margin-top: 40rpx; text-align: center;">
		      <u-button type="primary" size="medium" @click="showReminder = false">OK</u-button>
		    </view>
		  </view>
		</u-popup>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { grReportList, getGameTypeListYk } from '@/api/jogos.js';

export default {
	computed: {
		...mapGetters(['userInfo']),
	},
	data() {
		return {
			selectedVendor: this.$t('tzsCustomize.title10'),
			showTypeSelect: false,
			showReminder: false,
			selectOptions: [
				{ label: 'All', value: 'All' }, { label: 'JL', value: 'JL' },
				{ label: 'PG', value: 'PG' }, { label: 'PP', value: 'PP' },
				{ label: 'CQ9', value: 'CQ9' }, { label: 'SG', value: 'SG' },
				{ label: 'JDB', value: 'JDB' }, { label: 'KA', value: 'KA' },
				{ label: 'AMBS', value: 'AMBS' }, { label: 'PS', value: 'PS' },
				{ label: 'AE', value: 'AE' }, { label: 'SW', value: 'SW' },
				{ label: 'YB', value: 'YB' }, { label: 'JK', value: 'JK' },
				{ label: 'BNG', value: 'BNG' }, { label: 'EP', value: 'EP' },
				{ label: 'BT', value: 'BT' }, { label: 'KM', value: 'KM' },
				{ label: 'LCC', value: 'LCC' }, { label: '365', value: '365' },
				{ label: 'AMB', value: 'AMB' }, { label: 'GPI', value: 'GPI' },
				{ label: 'WE', value: 'WE' }, { label: 'DG', value: 'DG' },
				{ label: 'SEX', value: 'SEX' }, { label: 'TCG_SEA', value: 'TCG_SEA' },
				{ label: 'TF', value: 'TF' }, { label: 'BTI', value: 'BTI' },
				{ label: 'SBO', value: 'SBO' }, { label: 'IA', value: 'IA' },
				{ label: 'BB', value: 'BB' }, { label: 'FB', value: 'FB' },
				{ label: 'UG2', value: 'UG2' }, { label: 'SV3', value: 'SV3' },
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
		};
	},
	methods: {
		goToTurnOver() {
			uni.navigateTo({ url: '/pages/agent/team/turnover_list' });
		},
		selectVendor(vendor) {
			this.selectedVendor = vendor;
			this.showVendorModal = false;
		},
		handleSearchEnter() {
			uni.showLoading({ title: '用户搜索中...' });
			this.grReportListInfo();
		},
		notice() {
			// alert(1);
			this.showReminder = true;
		},
		clearEnter() {
			this.filters.username = '';
			this.grReportListInfo();
		},
		closeTheDropDownSelect() {
			this.showTypeSelect = !this.showTypeSelect;
		},
		selectType(item) {
			this.selectedVendor = item.label;
			this.showTypeSelect = false;
		},
		showDataClickFunction() {
			this.showTypeSelect = !this.showTypeSelect;
		},
		closeAllDropdowns() {},
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
.close-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 10px;
  color: #666;
  border-bottom: 1px solid #eee;
}

.close-button text:last-child {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}


</style>
