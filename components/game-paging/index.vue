<template>
	<view class="game_paging game_flex">
		<view class="paging_fl" @tap="prevPage">
			<u-icon name="arrow-left" color="#2979ff" size="28"></u-icon>
		</view>
		<view class="paging_list game_flex">
			<view class="paging_rows"
			v-for="item in visiblePageNumbers"
			:key="item"
			@tap="goToPage(item)"
			>{{item}}</view>
		</view>
		<view class="paging_fr" @tap="nextPage">
			<u-icon name="arrow-right" color="#2979ff" size="28"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "gamePaging",
		props: {
			// 当前第几页
			currentPage: {
				type: [String, Number],
				default: 1
			},
			// 可见范围展示几列
			totalPages: {
				type: [String, Number],
				default: 2
			},
			// 每页条数
			visiblePages: {
				type: [String, Number],
				default: 5,
			},
			
			// 数据总数
			total: {
				type: [String, Number],
				default: 0,
			}
		},
		  computed: {
		    visiblePageNumbers() {
		      const middlePage = Math.floor(this.visiblePages / 2);
		      let startPage = Math.max(1, this.currentPage - middlePage);
		      let endPage = startPage + this.visiblePages - 1;
		      if (endPage > this.totalPages) {
		        endPage = this.totalPages;
		        startPage = Math.max(1, endPage - this.visiblePages + 1);
		      }
		      return Array.from({ length: endPage - startPage + 1 }, (v, i) => startPage + i);
		    },
		  },
		data() {
			return {

			};
		},
		methods: {
			// 上一页
			prevPage(){
				if(this.currentPage > 1){
					 this.goToPage(this.currentPage - 1);
				}
			},
			// 下一页
			nextPage(){
				if (this.currentPage < this.totalPages) {
				        this.goToPage(this.currentPage + 1);
				      }
			},
			// 执行页数逻辑
			  goToPage(pageNumber) {
			      if (pageNumber < 1 || pageNumber > this.totalPages) return;
			      this.$emit('page-change', pageNumber);
			    },
		}
	}
</script>

<style lang="scss" scoped>
	.game_paging {
		.paging_list{
			.paging_rows{
				padding: 10rpx;
				background-color: pink;
			}
		}
	}
</style>