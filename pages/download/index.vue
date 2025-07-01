<template>
	<view>
		<view class="game_download">
			<game-header />
			<view class="download game_flex align_center">
				<u--image :showLoading="true" :src="require('@/static/images/app/download_logo.png')" width="220rpx"
					height="220rpx"></u--image>

				<view class="down_text">
					{{$t('download.text1')}}
				</view>

				<view class="down_btn">
					<u-button :icon="require('@/static/images/app/android.png')" type="primary" text="Android"
						color="#da7471" @tap="download"></u-button>
				</view>


			</view>
			<!-- 底部 -->
			<game-footer />

		</view>
		<game-tabbar :tabbarValue="4" />
	</view>
</template>

<script>
	import {
		downloadAddress
	} from '@/api/jogos.js'
	export default {
		name: "gameDownload",
		data() {
			return {
				downloadLink: ''
			}
		},
		onLoad() {
			this.getDownloadAddress()

		},
		methods: {
			async getDownloadAddress() {
				let {
					code,
					data
				} = await downloadAddress()
				if (code == 200) {
					this.downloadLink = data
				}
			},

			download() {
				window.location.href = this.downloadLink.appd
			},

		}
	}
</script>

<style lang="scss" scoped>
	.game_download {
		padding-top: 100rpx;
		margin: 100rpx 30rpx 0 30rpx;

		.download {
			flex-direction: column;
			background: radial-gradient(#00016b, transparent 86%);
		}

		.down_text {
			margin: 20rpx 0;
			font-size: 40rpx;
			color: #fff;
			font-weight: 700;
			line-height: 68rpx;
			text-align: center;
		}

		.down_btn {
			margin-bottom: 60rpx;
		}
	}
</style>