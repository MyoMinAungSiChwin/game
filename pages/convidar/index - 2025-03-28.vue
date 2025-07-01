<template>
	<view class="d_convidar">
		<game-header />

		<view class="d_co_con d_border12">
			<view class="d_co_tabs">
				<u-tabs :list="tabList" :inactiveStyle="{color: '#fff'}" :activeStyle="{color: '#4180ed'}"
					@change="changeTabs"></u-tabs>
			</view>

			<view class="tabs_items">
				<template v-if="tabsIndex == 0">
					<invite />
				</template>
				<template v-else-if="tabsIndex == 1">
					<statistics />
				</template>
				<template v-else-if="tabsIndex == 2">
					<be-invited />
				</template>
				<template v-else-if="tabsIndex == 3">
					<bonus />
				</template>
				<template v-else>
					<details />
				</template>
			</view>
		</view>
		<!-- 底部 -->
		<game-footer />
		<game-tabbar :tabbarValue="1" />

	</view>
</template>

<script>
	// 邀请
	import Invite from './components/invite.vue'
	// 统计
	import Statistics from './components/statistics.vue'
	// 受邀
	import BeInvited from './components/be-invited.vue'
	// 奖金
	import Bonus from './components/bonus.vue'
	// 详情
	import Details from './components/invite.vue'
	import {
		inviteLink,
		invitationList
	} from '@/api/convidar.js'
	import {
		eventDetails
	} from '@/api/jogos.js'
	export default {
		components: {
			Invite,
			Statistics,
			BeInvited,
			Bonus,
			Details,
		},
		data() {
			return {
				tabList: [{
						name: this.$t('convidar.text1')
					},
					{
						name: this.$t('convidar.text2')
					},
					// {
					// 	name: '受邀人士'
					// },
					// {
					// 	name: '奖金'
					// },
					// {
					// 	name: '邀请详情'
					// },
				],
			
				currTab: this.$t('convidar.tabs1'),

				inviteLink: '',
				content: '',

				invitationLists: [],
				invitationList: [],

				tabsIndex: 0,

				activeDate: 0
			};
		},
		onLoad() {
			this.getInviteLink()
		},
		methods: {
			clickTCTabs({
				type
			}) {
				this.invitationList = this.invitationLists[type]
				if (type == 'tier1') {
					this.summation = 'one'
				} else if (type == 'tier2') {
					this.summation = 'two'
				} else if (type == 'tier3') {
					this.summation = 'three'
				}
			},

			async getInviteLink() {
				let {
					code,
					data
				} = await inviteLink()
				if (code == 200) {
					this.inviteLink = data.share_link
				}
			},


			// 复制内容
			copyData() {
				let _this = this
				uni.setClipboardData({
					data: _this.inviteLink,
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					}
				})
			},

			changeTabs({
				index
			}) {
				this.tabsIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.d_convidar {
		margin-top: 80rpx;
		padding-top: 80rpx;
		color: #fff;

		.d_co_tabs {
			padding: 20rpx 0;
			// justify-content: space-around;

			&>view {
				align-items: center;
				color: #888;

				&>view {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
				}
			}

			.curr_tabs {
				position: relative;
				color: #fff;

				&::before {
					content: '';
					position: absolute;
					bottom: -20rpx;
					left: 46%;
					background-color: #49acfb;
					width: 70rpx;
					height: 4rpx;
				}
			}
		}
		
		.tabs_items{
			padding: 20rpx;
		}

		.d_co_con {
			background-color: #1e2531;

		}
	}
</style>