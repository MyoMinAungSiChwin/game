<template>
	<view class="running">
		<view class="table_th game_flex align_center">
			<view class="rows">{{$t('userinfo.text21')}}</view>
			<view class="rows">{{$t('userinfo.text22')}}</view>
			<view class="rows">{{$t('userinfo.text23')}}</view>
			<view class="rows">{{$t('userinfo.text24')}}</view>
		</view>
		<view class="table_td game_flex align_center" v-for="item in list" :key="item.id">
			<view class="rows">{{item.game_name}}</view>
			<view class="rows">{{item.stake}}</view>
			<view class="rows">{{item.winlost}}</view>
			<view class="rows">{{item.settleTime}}</view>
		</view>

		<view class="u_empty">
			<u-empty :show="total == 0"
			:text="$t('userinfo.text19')"
			>
			</u-empty>

		</view>
		<view class="vip_five game_flex" v-show="total > 0">
			<view class="game_flex d_border12 align_center game_justify_center">
				<u-icon name="play-left-fill" :color="this.form.page == 1 ? '#999' : '#fff'" size="16"
					@tap="previous"></u-icon>
			</view>
			<view class="game_flex align_center game_justify_center">{{form.page}}</view>
			<view class="game_flex d_border12 align_center game_justify_center">
				<u-icon name="play-right-fill" :color="this.form.page * this.form.list == total ? '#999' : '#fff'"
					size="16" @tap="nextPage"></u-icon>
			</view>
		</view>


		<view class="game_flex align_center time_box">
			<view @tap="showStartTime=true" class="time">
				{{form.startDateTime || $t('userinfo.text17')}}
			</view>
			<view class="line"></view>
			<view @tap="showEndTime=true" class="time">
				{{form.endDateTime || $t('userinfo.text18')}}
			</view>
			
			<u-icon 
			v-show="form.startDateTime || form.endDateTime"
			@tap="offBtn"
			style="margin-left: 20rpx;" name="close-circle" color="#999" size="28rpx"></u-icon>
		</view>

		<u-datetime-picker 
		:closeOnClickOverlay="true"
		@close="showStartTime=false"
		@confirm="confirmStartDate"
		:cancelText="$t('userinfo.text15')"
		:confirmText="$t('userinfo.text16')"
		:show="showStartTime"  mode="date"></u-datetime-picker>
		<u-datetime-picker 
		:closeOnClickOverlay="true"
		@close="showEndTime=false"
		@confirm="confirmEndDate"
		:cancelText="$t('userinfo.text15')"
		:confirmText="$t('userinfo.text16')"
		:show="showEndTime"  mode="date"></u-datetime-picker>
	</view>
</template>

<script>
	import {
		gameRecord,
	} from '@/api/userinfo.js'
	export default {
		name: 'running',
		data() {
			return {
				form: {
					startDateTime: '',
					endDateTime: '',
					page: 1,
					list: 10,
				},
				list: [],
				total: 0,
				showStartTime: false,
				showEndTime: false
			}
		},
		created() {
			this.getGameRecord()
		},
		methods: {
			// 获取流水记录
			async getGameRecord() {
				let {
					code,
					data
				} = await gameRecord(this.form)
				if (code == 200) {
					this.list = data.data
					this.total = data.tal
				}
			},
			// 上一页
			previous() {
				if (this.form.page > 1) {
					this.form.page -= 1
					this.getGameRecord()
				}
			},

			// 下一页
			nextPage() {
				if (this.form.page * this.form.list < this.total) {
					this.form.page += 1
					this.getGameRecord()
				}
			},
			
			confirmStartDate({
				value
			}) {
				this.form.startDateTime = this.$u.timeFormat(value, 'yyyy-mm-dd')
				this.showStartTime = false
				if (!this.form.endDateTime) return
				this.getGameRecord()
			},
			
			
			confirmEndDate({
				value
			}) {
				this.form.endDateTime = this.$u.timeFormat(value, 'yyyy-mm-dd')
				this.showEndTime = false
				if (!this.form.startDateTime) return
				this.getGameRecord()
			},
			
			offBtn(){
				this.form.startDateTime = ''
				this.form.endDateTime = ''
				this.getGameRecord()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.running {
		position: relative;
		margin-bottom: 100rpx;
		min-height: 400rpx;

		.table_th {
			padding: 0 20rpx;
			height: 70rpx;
			background-color: #283754;
		}

		.table_td {
			padding: 0 20rpx;
			height: 70rpx;
		}

		.rows {
			flex: 1;
		}

		.vip_five {
			position: absolute; 
			bottom: -40rpx;
			right: 10rpx;

			&>view {
				margin-left: 20rpx;
				width: 50rpx;
				height: 50rpx;
				background-color: #202a38;
				cursor: pointer;
			}
		}
		.time_box{
			position: absolute;
			left: 0;
			bottom: -80rpx;
		}
		
		.time{
			padding: 20rpx 40rpx;
			border-radius: 30rpx;
			// background-color: #2b3752;
			border: 1px solid #999;
		}
		.line{
			margin: 0 20rpx;
			width: 30rpx;
			height: 4rpx;
			background-color: #fff;
		}
	}
</style>