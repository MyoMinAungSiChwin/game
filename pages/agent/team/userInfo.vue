<template>
	<view class="voucher_center">
		<!-- Navigation Header -->
		<u-navbar leftText="返回" bgColor="#000" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
			</view>
			<view class="u-nav-slot" slot="center">
				<text class="nav-title">{{$t('tzsCustomize.title3')}}</text>
			</view>
		</u-navbar>

		
		<!-- Main Content -->
		<view class="content">
			<br> <br> <br>
			<u-input
			v-model="searchQuery"
			:placeholder="$t('tzsCustomize.title1')"
			prefixIcon="search"
			clearable
			@input="onSearchInput"
		/>
			<br> <br>
			<!-- User List -->
			<view v-if="filteredUsers.length">
				<view v-for="item in filteredUsers" :key="item.id" class="user-card">
					<!-- <view class="card-header">{{ item.username }}</view> -->
					<view class="card-row">
						<text class="label">{{$t('login.text12')}}:</text>
						<text class="value">{{ item.username }}</text>
					</view>
					<view class="card-row">
						<text class="label">{{$t('userinfo.text4')}}:</text>
						<text class="value">{{ item.money }}</text>
					</view>
				</view>
			</view>

			<!-- No Data -->
			<view v-else-if="!loading" class="empty-text">
				<text>{{$t('tzsCustomize.title4')}}.</text>
			</view>

			<!-- Loading -->
			<view v-else class="loading-text">
				<u-loading mode="circle" size="30" color="#be984c" />
			</view>
		</view>
		<global-notify></global-notify>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import { childUser } from '@/api/childUser.js'

export default {
	name: 'voucher',
	computed: {
		...mapGetters(['userInfo']),
		filteredUsers() {
			if (!this.searchQuery.trim()) return this.list
			const query = this.searchQuery.toLowerCase()
			return this.list.filter(user =>
				user.username.toLowerCase().includes(query)
			)
		}
	},
	data() {
		return {
			list: [],
			loading: true,
			searchQuery: ''
		}
	},
	onLoad() {
		this.getchildUser()
	},
	methods: {
		leftClick() {
			this.$tab.navigateTo('/pages/userinfo/index')
		},
		async getchildUser() {
			this.loading = true
			try {
				const response = await childUser()
				if (response.code === 200 && Array.isArray(response.data)) {
					this.list = response.data
				} else {
					console.warn('Unexpected response:', response)
				}
			} catch (error) {
				console.error('API call failed:', error)
			}
			this.loading = false
		},
		onSearchInput() {
			// Filtering handled via computed property
		}
	}
}
</script>

<style scoped>
page {
	background-color: #fff;
}

.nav-title {
	font-size: 35rpx;
	color: #be984c;
	font-weight: bold;
}

.search-bar {
	padding: 20rpx 30rpx 0;
}

.content {
	padding: 20rpx 30rpx 100rpx;
}

.user-card {
	background-color: #ffffff;
	border-radius: 20rpx;
	box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, 0.05);
	padding: 30rpx;
	margin-bottom: 25rpx;
}

.card-header {
	font-weight: 600;
	font-size: 32rpx;
	color: #333;
	margin-bottom: 20rpx;
}

.card-row {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	padding: 8rpx 0;
}

.label {
	color: #999;
}

.value {
	color: #333;
	font-weight: bold;
}

.empty-text,
.loading-text {
	text-align: center;
	margin-top: 100rpx;
	color: #888;
	font-size: 28rpx;
}
</style>
