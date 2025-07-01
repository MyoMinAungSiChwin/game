<template>
	<view class="backwater">
		<u-navbar :title="$t('title.text26')" :autoBack="true" bgColor="#1d1f2b"
		leftIconColor="#fff"
		leftIconSize="40rpx"
		:titleStyle="{color: '#fff', fontSize: '32rpx'}"
		height="120rpx"
		>                  
		</u-navbar>
		
		
		<view class="three_list">
			<view class="tr_li_items d_border12 d_bgColor border_shadow" v-for="item in backwaterList"
				:key="item.id">
				<view class="rows d_flex">
					<view>{{$t('account.text12')}}</view>
					<view>{{item.money}}</view>
				</view>
				<view class="rows d_flex">
					<view>{{$t('account.text20')}}</view>
					<view>{{item.memo}}</view>
				</view>
				
				<view class="rows d_flex">
					<view>{{$t('account.text15')}}</view>
					<view>{{item.createtime}}</view>
				</view>
			</view>
		
			<u-loadmore :loadmoreText="$t('global.title2')" :loadingText="$t('global.title3')"
				:nomoreText="$t('global.title4')" :status="status" v-if="total > 0" />
			<u-empty :show="total == 0" :text="$t('global.title1')">
			</u-empty>
		
		</view>
	</view>
</template>

<script>
	import { backwaterList } from '@/api/backwater.js'
	export default {
		data() {
			return {
				backwaterList: [],
				form: {
					page: 1,
					list: 10
				},
				total: undefined,
				status: 'loadmore',
			};
		},
		methods: {
			async getBackwaterList() {
				let {
					code,
					data
				} = await backwaterList(this.form)
				if (code == 200) {
					this.total = data.tal
					this.status = 'loadmore'
					this.backwaterList = this.backwaterList.concat(data.data)
					if (this.form.list > data.data.length) {
						return this.status = 'nomore'
					}
				}
			},
		},
		onLoad() {
			this.getBackwaterList()
		},
		onReachBottom() {
			if (this.total < (this.form.page + 1) * this.form.list) {
				return false
			}
			this.form.page += 1
			this.getBackwaterList()
		}
	}
</script>

<style lang="scss" scoped>
.backwater{
	padding: 130rpx 20rpx 20rpx 20rpx;
	.three_list {
		.tr_li_items {
			margin-bottom: 20rpx;
			padding: 20rpx;
			color: #fff;
			.top {
				align-items: center;
				justify-content: space-between;
				height: 50rpx;
				color: #61a5eb;
				font-size: 32rpx;
			}
	
			.rows {
				align-items: center;
				justify-content: space-between;
				height: 80rpx;
				border-bottom: 1px solid #666;
	
				&>view:nth-child(1) {
					font-size: 26rpx;
					color: rgba(255, 255, 255, .7);
				}
			}
	
			.rows:last-child {
				border: none;
			}
		}
	}
}
</style>
