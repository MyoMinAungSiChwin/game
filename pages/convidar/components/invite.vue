<template>
	<view class="invite">
		<view style="background: linear-gradient(180deg,#f2f2f2,#f4f4f4);border-radius: .5rem; padding: 18rpx;">
			<div class="referral-top noRule">
				<div class="current-wrap">
					<div class="current-title">{{$t('convidar.text29')}}</div>
				</div>
				<div class="current-name">L1</div>
			</div>
			<div class="referral-middle">
				<div class="middle-no-data">{{$t('convidar.text28')}}</div>
			</div>
		</view>
		<div class="default-title"></div>
		<div class="invite-friends-bonus">
			<div class="default-title bonus-title">{{$t('convidar.text27')}}</div>
			<div class="bonus-item">
				<div class="bonus-img"><img src="/static/images/bonus.png" alt="goals"></div>
				<div class="bonus-info">
					<div class="info-title">{{$t('convidar.text26')}}</div>
					<div class="amount-balance-common info-num"><span class="currency">K</span><span
							class="number-mc undefined">0.00</span></div>
					<div class="info-detail">
						<div class="detail-num">0</div>
						<div class="detail-desc">{{$t('convidar.text25')}}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="invite-friends-info">

			<div class="info-item">
				<div class="item-title">{{$t('convidar.text9')}}</div>
				<div class="amount-balance-common item-number"><span class="currency ">K</span><span
						class="number-mc undefined">{{inviteData.today_money}}</span></div>
			</div>
			<div class="info-item">
				<div class="item-title">{{$t('convidar.text6')}}</div>
				<div class="item-number">{{inviteData.count_user}}</div>
			</div>
			<div class="info-item">
				<div class="item-title">{{$t('convidar.text8')}}</div>
				<div class="item-number">{{inviteData.today_user}}</div>
			</div>
			<div class="info-item">
				<div class="item-title">{{$t('convidar.text10')}}</div>
				<div class="item-number">{{inviteData.moon_money}}</div>
			</div>
			<div class="info-item">
				<div class="item-title">{{$t('convidar.text7')}}</div>
				<div class="amount-balance-common item-number"><span class="currency ">K</span><span
						class="number-mc undefined">{{inviteData.count_money}}</span></div>
			</div>
		</div>
		<div class="invite-friends-link">
			<div class="link-top-title">
				{{$t('convidar.text24')}}
				<div class="share"><u-icon name="attach" color="#3b2987" size="23"></u-icon></div>
			</div>
			<div class="link-subtitle">{{$t('convidar.text23')}}</div>
			<div class="invite-get-link">
				<div class="link-url">{{inviteData.share_link}}</div>
			</div>
			<div class="copy-container">
				<div class="link-qrcode" @tap="tanChuang"><u-icon name="attach" color="#fff"
						size="20"></u-icon><span>{{$t('convidar.text24')}}</span></div>
				<div class="link-copy" @tap="copyData"><u-icon name="coupon" color="#fff"
						size="20"></u-icon><span>{{$t('convidar.text12')}}</span></div>
			</div>
		</div>
		<u-modal :show="show" :showConfirmButton="false" width="550rpx">
			<view class="invite-friends-con">
				<div class="invite-friends-picture"><img alt=""
						src="/static/images/invite.png"></div>
				<div class="invite-friends-content">
					<div class="qrcode" style="margin-top: 11px;">
						<img style="height: 128px; width: 128px;" src="/static/images/erwemm.png">
					</div>
					<div class="share-btn" @tap="copyData">{{$t('convidar.text12')}}</div>
				</div>
				<div class="close-btn" @tap="closeBtn"><u-icon name="close-circle" color="#fff" size="38"></u-icon></div>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		inviteLink
	} from '@/api/convidar.js'
	export default {
		name: 'Invite',
		data() {
			return {
				inviteData: {},
				show: false
			}
		},
		created() {
			this.getInviteLink()
		},
		methods: {
			async getInviteLink() {
				let {
					data,
					code
				} = await inviteLink()
				if (code == 200) {
					this.inviteData = data
				}
			},
			// 复制内容
			copyData() {
				let _this = this
				uni.setClipboardData({
					data: this.inviteData.share_link,
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					}
				})
			},
			tanChuang() {
				this.show = true
			},
			closeBtn(){
				this.show = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	::v-deep .u-modal {
		/* 去除外层容器边框 */
		border: none !important;
	}

	::v-deep .u-popup__content {
		background: rgba(0, 0, 0, 0) !important;
	}

	::v-deep .u-modal__content {
		/* 强制内容区域样式 */
		padding: 0 !important;
		border: none !important;
		border-radius: 0 !important;
	}

	::v-deep .u-modal__content__text {
		/* 如果有嵌套文本容器 */
		margin: 0 !important;
		padding: 0 !important;
	}

	.invite-friends-con {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-height: 80vh;
		height: 660rpx;
		position: relative;
		padding-bottom: 3.66rem;
	}

	.invite-friends-picture {
		font-size: 0;
		top: 0;
		//border-radius: 22rpx;
		// max-height: 3.2rem;
		overflow: hidden;
	}

	.invite-friends-picture img {
		width: 100%;
	}

	.invite-friends-content {
		flex: 1 1 0%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -20rpx;

		border-radius: 22rpx;
		background-image: linear-gradient(180deg, #f3f7fb 33%, #e0e9f1);
		overflow-y: auto;
	}

	.share-btn {
		// margin-top: .4rem;
		display: block;
		color: #fff;
		font-size: 1.3rem;
		font-weight: 600;
		padding: .5rem .8rem;
		border-radius: 12rpx;
		background-image: linear-gradient(96deg, #6b73ff, #000dff);
	}

	.close-btn {
		position: absolute;
		bottom: -.01rem;
	}

	.invite {
		.one_tips {
			margin: 0 40rpx;
			padding: 10rpx 15rpx;
			color: #3e4145;
			background-color: #ecf5fe;

			&>text {
				margin-left: 20rpx;
			}
		}

		.one_grid {
			.u_grid_item {
				margin-bottom: 20rpx;
				height: 100rpx;

				&>text:nth-child(1) {
					font-size: 40rpx;
					font-weight: 700;
				}

				&>text:nth-child(2) {
					color: #777c83;
					font-size: 24rpx;
				}
			}
		}

		.one_foo {
			padding: 0 20rpx;

			.foo_one {
				margin-bottom: 20rpx;
				flex-direction: column;

				&>view:nth-child(2) {
					margin: 20rpx 0;
				}

				&>view:nth-child(3) {
					width: 200rpx;
					height: 60rpx;
					background-color: #2099f8;
				}
			}

			.foo_text {
				flex-direction: column;

				&>text:last-child {
					padding: 0 70rpx;
					text-align: center;
				}
			}
		}
	}


	.referral-top {
		height: 150rpx;
		min-height: 150rpx;
		background: url(/mobile/mc/referral-rank-bg-rules.2037aa3a.png) no-repeat top / cover;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.42rem;
		color: #1b1b4b;
		text-align: left;
		border-radius: 1.08rem;
	}

	.noRule {
		background: url('/static/images/referra.png') no-repeat top / cover;
	}

	.current-title {
		flex: 1 1 0%;
		font-size: 1.26rem;
		font-weight: 800;
		padding: 1.19rem;
		word-break: break-word;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		line-height: 1.5;
	}

	.current-name {
		padding-right: 1.31rem;
		word-break: break-word;
		font-size: 1.4rem;
		font-weight: 800;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		line-height: 1.5;
	}

	.referral-middle {
		height: 150rpx;
		min-height: 150rpx;
		border-radius: 1.08rem;
		background: linear-gradient(270deg, #7cc4f8, #abdcff);
		padding: 1.16rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 8rpx;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.middle-no-data {
		flex: 1 1 0%;
		min-height: 1.52rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #666;
	}

	.default-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1b1b4b;
		text-align: center;
		margin-bottom: 3.35rem;
	}

	.invite-friends-bonus {
		display: flex;
		flex-direction: column;
		gap: .2rem;
	}

	.invite-friends-bonus .bonus-title {
		margin: 0 1.6rem 1.15rem;
		font-size: 1.9rem;
		color: #fff;
	}

	.bonus-item {
		display: flex;
		min-height: 1.8rem;
		background-image: linear-gradient(180deg, #f3f7fb 0, #e0e9f1);
		padding: 1.17rem 1.3rem;
		border-radius: .08rem;
	}

	.bonus-img {
		width: 6.45rem;
	}

	.bonus-img img {
		width: 100%;
		object-fit: contain;
	}

	.bonus-info {
		margin-left: 1.53rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: left;
	}

	.info-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: #566073;
	}

	.info-num {
		font-size: 1.4rem;
		font-weight: 700;
		color: #3b2987;
		margin-top: 1.07rem;
	}

	.amount-balance-common {
		display: flex;
	}

	.currency {
		margin-right: .05rem;
	}

	.number-mc {
		margin-right: 1.1rem;
		font-family: SF Pro Display, SF Pro Icons, AOS Icons, Helvetica Neue For Number, Roboto Mono, PingFang SC, Arial, sans-serif;
	}

	.info-detail {
		display: flex;
		align-items: center;
		font-size: 1.24rem;
		color: #566073;
		margin-top: 1.07rem;
	}

	.detail-num {
		margin-right: .07rem;
	}

	.invite-friends-info {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		// padding: 0 .08rem;
		margin-top: 20rpx;
		gap: 1.15rem;
	}

	.info-item {
		flex: 1 1 0%;
		min-height: 3.1rem;
		border-radius: 0.5rem;
		background-image: linear-gradient(108deg, #abdcff, #0396ff);
		min-width: calc((100% - 1.15rem) / 2);
		display: flex;
		flex-direction: column;
	}

	.item-title {
		font-size: 1.22rem;
		font-weight: 600;
		color: #ebf7ff;
		margin: 1.19rem;
		display: flex;
		justify-content: center;
	}

	.item-number {
		font-size: 1.4rem;
		font-weight: 600;
		color: #fff;
		text-shadow: 0 1.04rem 1.04rem rgba(0, 0, 0, .15);
		display: flex;
		justify-content: center;
		margin-bottom: 20rpx;
	}

	.invite-friends-link {
		border-radius: 1.08rem;
		background-image: linear-gradient(180deg, #f3f7fb 0, #e0e9f1);
		min-height: 2.3rem;
		margin-top: 20rpx;
		// width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.4rem;
	}

	.link-top-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: #3b2987;
		display: flex;
		justify-content: center;
	}

	.share {
		margin-left: .2rem;
	}

	.share svg {
		width: .2rem;
		height: .2rem;
	}

	.link-subtitle {
		font-size: 1.2rem;
		font-weight: 600;
		color: #666;
		text-align: center;
		margin-top: 15rpx;
	}

	.invite-get-link {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1.08rem;
		background-color: #fff;
		height: 3.4rem;
		margin-top: .6rem;
	}

	.copy-container {
		font-size: 1.24rem;
		font-weight: 600;
		color: #fff;
		margin-top: 1.4rem;
		display: flex;
		align-items: stretch;
		width: 100%;
	}

	.link-qrcode {
		flex: 1 1 0%;
		margin-right: 1.2rem;
		border-radius: 1.08rem;
		background-image: linear-gradient(104deg, #6b73ff, #000dff);
		width: 50%;
		height: auto;
		min-height: 1.78rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 0 1.2rem 0 #ffc576;
		animation: bounce-in 1.5s ease-in-out infinite;
	}

	.link-qrcode svg {
		margin-right: .2rem;
		min-width: .3rem;
		height: .1rem;
	}

	.link-copy {
		flex: 1 1 0%;
		padding: .5rem;
		border-radius: 1.08rem;
		background-color: #428dfc;
		width: 50%;
		height: auto;
		min-height: 2.78rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.link-copy svg {
		margin-right: .2rem;
		min-width: .3rem;
		height: .1rem;
	}

	.copy-container span {
		white-space: wrap;
		word-break: break-word;
		min-width: 1.55rem;
	}

	@keyframes bounce-in {
		0% {
			transform: scale(1)
		}

		30% {
			transform: scale(.9)
		}

		50% {
			transform: scale(1.05)
		}

		70% {
			transform: scale(.9)
		}

		to {
			transform: scale(1)
		}
	}

	.link-url {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1 1 0%;
		font-size: 1.2rem;
		font-weight: 600;
		padding: 0 1.2rem;
		color: #000;
		text-align: center;
	}
</style>