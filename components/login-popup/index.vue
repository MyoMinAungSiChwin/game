<template>
	<view>
		<u-popup :show="showLoginPopup" :round="10" mode="center" @close="showLoginPopup=false">
			<view class="login_popup">
				<text>人生若只如初见，何事秋风悲画扇</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "LoginPopup",
		data() {
			return {
				showLoginPopup: true
			};
		}
	}
</script>

<style lang="scss" scoped>
.login_popup{
	
}
</style>