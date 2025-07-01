<template>
	<view class="game_coupon">
		<game-header />
		<view class="coupon">

			<view class="coupon_img game_flex">
				<u--image width="230rpx" height="230rpx" :src="require('@/static/images/coupon.png')"
					mode="widthFix"></u--image>
			</view>


			<u--input :placeholder="$t('account.text4')" border="none" v-model="Code" color="#fff" shape="circle"
				:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}">
				<template slot="prefix">
					<u-icon :name="require('@/static/images/jogos/coupon-code.png')" color="#999" size="38rpx"></u-icon>
				</template>
			</u--input>

			<view class="coupon_btn">
				<u-button type="primary" :text="$t('coupon.text1')" @tap="exchangeBtn"></u-button>
			</view>

			<view class="coupon_text">
				<view>{{$t('coupon.text2')}}</view>
				<view>{{$t('coupon.text3')}}</view>
			</view>

		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="0" />
	</view>
</template>

<script>
	import {
		downCoupon
	} from '@/api/jogos.js'
	export default {
		name: 'gameCoupon',
		data() {
			return {
				Code: ''
			};
		},
		methods: {
			// 兑换
			async exchangeBtn() {
				let {
					code,
					data
				} = await downCoupon(this.Code)
				if (code == 200) {
					this.Code = ''
					this.$modal.msg(this.$t('coupon.text4'))
					this.$store.dispatch('GetInfo')
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_coupon {
		padding-top: 200rpx;

		.coupon {
			margin: 0 50rpx;

			.coupon_img {
				justify-content: center;
			}

			.coupon_btn {
				margin: 100rpx 50rpx;

				.u-button {
					height: 60rpx;
				}
			}

			.coupon_text {
				color: #fff;
				font-size: 22rpx;
			}
		}
	}
</style>