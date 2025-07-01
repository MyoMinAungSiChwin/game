<template>
	<view class="d_notice">
		<u-navbar :title="$t('title.text23')" :autoBack="true" bgColor="#1d1f2b" leftIconColor="#fff" leftIconSize="40rpx"
			:titleStyle="{color: '#fff', fontSize: '32rpx'}" height="120rpx">
		</u-navbar>

		<u-collapse class="u_collapse" :border="false">
			<u-collapse-item class="u_collapse_item  d_bgColor d_border12" :title="item.title" :label="item.addtime_txt"
				v-for="item in noticeList" :key="item.id">
				<u-parse :content="item.content"></u-parse>
			</u-collapse-item>
		</u-collapse>

		<u-empty 
		:text="$t('global.title1')"
		:show="noticeList && noticeList.length == 0" marginTop="400rpx">
		</u-empty>



	</view>
</template>

<script>
	import {
		notice
	} from '@/api/jogos.js'
	export default {
		data() {
			return {
				noticeList: undefined
			};
		},
		onLoad() {
			this.getNoticeList()
		},
		methods: {
			async getNoticeList() {
				let {
					data,
					code
				} = await notice()
				if (code == 200) {
					this.noticeList = data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_notice {
		padding: 130rpx 40rpx 20rpx 40rpx;

		::v-deep .u_collapse {
			.u_collapse_item {
				margin-bottom: 20rpx;
				font-size: 20rpx;
				color: #fff;
			}

		}

		::v-deep .u-cell__title-text {
			color: #fff;
		}

	}
</style>