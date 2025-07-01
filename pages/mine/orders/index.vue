<template>
	<view class="game_orders">
		记录
	</view>
</template>

<script>
	import {
		gameRecord
	} from '@/api/mine.js'
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.getGameRecord()
		},
		methods: {
			async getGameRecord() {
				let {
					code,
					data
				} = await gameRecord(this.form)
				if (code == 200) {
					this.gameList = this.gameList.concat(data.data)
					this.total = data.tal
					this.status = 'loadmore'

					if (this.form.list > data.data.length) {
						return this.status = 'nomore'
					}

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_play_record {
		padding: 130rpx 20rpx 20rpx 20rpx;
		color: #fff;

		.d_p_re_time {
			justify-content: center;
			padding: 10rpx 20rpx;
			width: 380rpx;

			&>view:nth-child(2) {
				margin: 0 10rpx;
			}

			&>view:last-child {
				margin-left: 10rpx;
			}
		}

		.d_p_re_list {

			.tit {
				margin-top: 20rpx;
				border-radius: 12rpx 12rpx 0 0;

				.rows {
					flex: 1;
					height: 100rpx;
					justify-content: center;
					align-items: center;
				}
			}

			.re_lists {
				overflow: hidden;
				height: calc(100vh - 320rpx);

				.re_lists_items {
					height: 80rpx;

					&>text {
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
				}
			}

		}
	}
</style>