<template>

	<web-view :src="urls" ></web-view>
	
</template>

<script>
	export default {
		data(){
			return{
				urls: ''
			}
		},
		
		onLoad(option) {
			if (option.item) {
				var iteminfo = JSON.parse(decodeURIComponent(option.item));
				this.urls = iteminfo.url
			}else{
				this.$modal.msg('参数错误');
				
				setInterval(() => {
				    uni.switchTab({
				    	url:'/pages/jogos/index'
				    })
				}, 2500);
				
			}
		},
		
		methods:{
			
		}
		
	}
	
	
</script>

<style>
</style>