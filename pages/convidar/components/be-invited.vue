<template>
	<view class="be_invited">
		受邀


		<!-- <game-paging  :current-page="form.currentPage" :total="form.total" @page-change="changePage" /> -->
	</view>
</template>

<script>
	export default {
		name: 'beInvited',
		data() {
			return {
				form: {
					total: 20,
					currentPage: 1
				}
			}
		},
		methods: {
			changePage(pageNumber) {
				this.form.currentPage = pageNumber;
				console.log(pageNumber)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.be_invited {}
</style>