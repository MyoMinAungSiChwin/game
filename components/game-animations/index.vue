<template>
	<view class="game_animations">
		<view class="left">
			<view class="icon-wrapper" v-for="item in imglist" :key="item"
			:style="{ top: randomPosition(), left: randomPosition() }"
			>
				<img :src="item" class="bg-components"></img>
			</view>
		</view>

		<view class="right">
			<view class="icon-wrapper" v-for="item in imglist" :key="item"
			:style="{ top: randomPosition(), left: randomPosition() }"
			>
				<img :src="item" class="bg-components"></img>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "gameAnimations",
		data() {
			return {
				imglist: [
					require('@/static/images/animations/1.svg'),
					require('@/static/images/animations/2.svg'),
					require('@/static/images/animations/3.svg'),
					require('@/static/images/animations/4.svg'),
					require('@/static/images/animations/5.svg'),
					require('@/static/images/animations/6.svg'),
					require('@/static/images/animations/7.svg'),
					require('@/static/images/animations/8.svg'),
					require('@/static/images/animations/9.svg'),
					require('@/static/images/animations/10.svg'),
				]
			};
		},
		methods: {
			  randomPosition() {
			    const randomInt = Math.floor(Math.random() * 700); // 生成0-700之间的随机整数
			    return `${randomInt}rpx`; // 返回以像素为单位的值
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.game_animations {
		width: 100%;
		height: 100%;
		position: fixed;
		// z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		pointer-events: none;

		.icon-wrapper {
			position: relative;
			width: 30rpx;

			img {
				width: 100%;
			}
		}

		.left,
		.right {
			position: absolute;
			height: 100%;
			width: 100%;
			pointer-events: none;
		}

		.left {
			.icon-wrapper {
				position: absolute;

				@for $i from 1 through 100 {
					&:nth-child(#{$i}) {
						animation: linear 10s bg24#{$i} infinite alternate;
						$delay: random(500)+0ms;
						animation-delay: $delay;
						transform: translate3d((random(100) * 20rpx),
								(random(20) * 40rpx),
								(random(12) * 40rpx)) scale(0.2);

						@keyframes bg24#{$i} {
							0% {
								transform: scale(0.5);
							}

							100% {
								transform: translate3d(0, 0, 10rpx);
							}
						}
					}
				}
			}
		}

		.right {
			.icon-wrapper {
				position: absolute;

				@for $i from 1 through 100 {
					&:nth-child(#{$i}) {
						animation: linear 28s bg24#{$i} infinite;
						$delay: random(500)+0ms;
						animation-delay: $delay;
						transform: translate3d((random(150) * 20rpx),
								(random(400) * 40rpx),
								(random(500) * 40rpx)) scale(0.2);

						@keyframes bg24#{$i} {

							0%,
							50%,
							80%,
							90% {
								opacity: 0.7;
							}

							100% {
								transform: translate3d(0, 0, 60rpx) translateY(-80rpx);
								opacity: 0;
							}
						}
					}
				}
			}
		}

		&>img {
			position: absolute;
			pointer-events: none;
			user-select: none;
		}
	}
</style>