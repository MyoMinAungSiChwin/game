<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('kh.text1')}}</text>
					</view>
				</view>

			</u-navbar>
		</view>
		<view>
			<!-- 自定义tabs组件 -->
			<custom-tabs :tabsList="tabs" @change="handleTabChange" :isShow="false" />
			<!-- 内容区域 -->
			<view class="content">
				<view v-show="currentTab === 0">
					<view style="margin:20px 10px;">
						<u-form :model="formData" :rules="rules" ref="uForm" label-width="150rpx">
							<!-- 开户类型 单选 -->
							<u-form-item label-width="250rpx" :label="$t('kh.text5')" prop="accountType">
								<u-radio-group v-model="formData.accountType">
									<u-radio name="玩家" :label="$t('kh.text6')" :checked="true"
										style="margin-right: 16px;"></u-radio>
									<u-radio name="代理" :label="$t('kh.text7')"></u-radio>
								</u-radio-group>
							</u-form-item>

							<!-- 注册账号 -->
							<u-form-item prop="username">
								<u-input v-model="formData.username" :placeholder="$t('kh.text8')" />
							</u-form-item>

							<!-- 登录密码 -->
							<u-form-item prop="password">
								<u-input v-model="formData.password" :placeholder="$t('kh.text9')" :password="true" />
							</u-form-item>

							<!-- 提交按钮 -->
							<u-form-item style="margin-top: 40rpx;">
								<u-button type="primary" @click="$u.debounce(handleSubmit, 2500)"
									:loading="loading">{{$t('kh.text22')}}</u-button>
							</u-form-item>

						</u-form>
					</view>
				</view>
				<view v-show="currentTab === 1">
					<view style="margin:20px 10px;">
						<u-form :model="linkData" ref="uFormLink" label-width="150rpx">
							<u-form-item style="display: none;">
								<div ref="qrcode"></div>

							</u-form-item>


							<!-- 开户类型 单选 -->
							<u-form-item label-width="250rpx" :label="$t('kh.text5')" prop="accountType">
								<u-radio-group v-model="linkData.accountType">
									<u-radio name="玩家" :label="$t('kh.text6')" :checked="true"
										style="margin-right: 16px;"></u-radio>
									<u-radio name="代理" :label="$t('kh.text7')"></u-radio>
								</u-radio-group>
							</u-form-item>
							<u-form-item @click="checkSzqx()">
								<u-input v-model="szqx" disabledColor="#ffffff" :placeholder="'1' + $t('kh.text10')">
									<template slot="suffix">
										<u-icon slot="right" name="arrow-right"></u-icon>
									</template>

								</u-input>

							</u-form-item>
							<u-form-item @click="checkTgqd()">
								<u-input v-model="tgqd" disabledColor="#ffffff" placeholder="论坛">
									<template slot="suffix">
										<u-icon slot="right" name="arrow-right"></u-icon>
									</template>

								</u-input>
							</u-form-item>
							<u-form-item>
								<u-input v-model="linkData.desc" disabledColor="#ffffff" :placeholder="$t('kh.text16')">
								</u-input>
							</u-form-item>
							<!-- 提交按钮 -->
							<u-form-item style="margin-top: 40rpx;">
								<u-button type="primary" @click="$u.debounce(linkHandleSubmit, 2500)"
									:loading="loading">{{$t('kh.text23')}}</u-button>
							</u-form-item>

						</u-form>
					</view>
				</view>
				<view v-show="currentTab === 2">
					<view style="margin:20px 10px;">
						<view class="container_link" v-if="linkSysData.length > 0">
							<view v-for="(item,index) in linkSysData" :key="index">
								<!-- 顶部导航栏 -->
								<view class="header">
									<view style="display: flex;">
										<u-icon name="share" size="25" color="red" style="margin-right:5rpx;"></u-icon>
										<text
											class="title">{{ item.link_qd == '自定义' ? item.desc : getLinkQdName(item.link_qd) }}
										</text>
									</view>
									<view class="icons">
										<u-icon name="man-add" color="#2979ff" size="25"
											@click="wantToGo(item)"></u-icon>
										<view class="divider">|</view>
										<u-icon name="photo" color="#2979ff" size="25" @click="erweima(item)"></u-icon>
										<view class="divider">|</view>
										<u-icon name="trash" color="#2979ff" size="25" @tap="delLink(item)"></u-icon>
										<view class="divider">|</view>
										<u-icon size="25" :name="!showRq ? 'arrow-down': 'arrow-up'" color="#2979ff"
											@click="rqClick"></u-icon>
									</view>
								</view>

								<!-- 日期显示 -->
								<view class="date-section" v-if="showRq">
									<text>{{$t('kh.text17')}}：{{item.addtime || ''}}</text>
									<text>{{$t('kh.text18')}}：{{item.expired_time || ''}}</text>
								</view>
								<!-- 代理信息卡片 -->
								<view class="card">
									<view class="info-table">
										<view class="row">
											<text>{{$t('kh.text19')}}</text>
											<text
												class="red-text">{{item.accountType == '玩家' ? $t('kh.text6') :  $t('kh.text7') || ''}}</text>
										</view>
										<view class="row">
											<text>{{$t('kh.text20')}}</text>
											<text>{{item.reg_count || 0}}</text>
										</view>
										<view class="row">
											<text>{{$t('kh.text21')}}</text>
											<text
												class="green-text">{{item.is_expired == 1 ? $t('kh.text24') : $t('kh.text25')  || ''}}</text>
										</view>
									</view>
								</view>

							</view>
						</view>
						<view v-if="linkSysData.length == 0">
							<u-empty mode="data">
							</u-empty>
						</view>
					</view>
				</view>
			</view>
			<u-action-sheet :show="showSzqx" :actions="actions" @close="showSzqx = false" @select="szqxSelect">
			</u-action-sheet>
			<u-action-sheet :show="showTgqd" :actions="tgqdActions" @close="showTgqd = false" @select="tgqdSelect">
			</u-action-sheet>
			<u-modal :show="showPic" :showConfirmButton="false" :closeOnClickOverlay="true" @close="close">
				<view class="slot-content" style="text-align: center; font-size: 35rpx; ">
					<view style="margin-bottom: 30rpx;">{{$t('kh.text34')}}</view>
					<view style="margin-top: 50rpx;">
						<view style="display: flex;align-items: center;justify-content: center;">{{$t('kh.text35')}}
						</view>
						<view>
							<view><img style="height: 200px; width: 200px;" :src="oneFindArr.qrcodeData"></view>
							<view> {{$t('kh.text36')}}</view>
						</view>
						<view style="margin-top:40rpx; color: #5d8df7;">
							<span style="padding-right: 4px;">https://blackdiamond1.tv</span>
						</view>
					</view>
					<view style="margin-top:40rpx;"><u-button @tap="copyUrl(oneFindArr.reg_link)" type="primary"
							color="linear-gradient(-90deg,#eb4f47,#eb3f3b)" :text="$t('kh.text37')"></u-button></view>
				</view>

			</u-modal>


			<u-modal :show="showTitle" :showConfirmButton="true" :confirmText="$t('tzsCustomize.confirm')" :cancelText="$t('tzsCustomize.cancel')" @confirm="confirmClick"
				:closeOnClickOverlay="true" :showCancelButton="true" @close="close" @cancel="cancelSub">
				<view class="slot-content" style="text-align: center; font-size: 35rpx; ">
					<view style="margin-bottom: 30rpx;">{{ $t('tzsCustomize.title2') }}</view>

                    <view style="margin-top: 50rpx;">
                        <view style="display: flex;align-items: center;justify-content: center;">{{ $t('tzsCustomize.username') }}</view>
                        <view><view>{{ formData.username }}</view></view>
                    </view>

                    <view style="margin-top: 50rpx;">
                        <view style="display: flex;align-items: center;justify-content: center;">{{ $t('tzsCustomize.resetPassword') }}</view>
                        <view><view>{{ formData.password ? formData.password : '123456' }}</view></view>
                    </view>

                    <view style="margin-top: 50rpx;">
                        <view style="display: flex;align-items: center;justify-content: center;">{{ $t('tzsCustomize.platformUrl') }}</view>
                        <view><view>https://blackdiamond1.tv</view></view>
                    </view>


				</view>

			</u-modal>
		</view>
<global-notify></global-notify>

	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		openAccount,
		createRegLink,
		saveBaseUrl,
		getRegLinkList,
		delRegLink
	} from '@/api/jogos.js'
	import QRCode from 'qrcodejs2';
	import CustomTabs from '@/components/custom-tabs.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
		},
		data() {
			return {
				oneFindArr: [],
				showTitle: false,
				showPic: false,
				showSzqx: false,
				showTgqd: false,
				qrcodeData: null,
				qrcodeInstance: null,
				showRq: false,
				actions: [{
						value: '1天',
						name: '1' + this.$t('kh.text10'),
					},
					{
						value: '7天',
						name: '7' + this.$t('kh.text10'),
					},
					{
						value: '30天',
						name: '30' + this.$t('kh.text10'),
					},
					{
						value: '1年',
						name: '1' + this.$t('kh.text11'),
					},
					{
						value: '2年',
						name: '2' + this.$t('kh.text11'),
					},
					{
						value: '永久',
						name: this.$t('kh.text12'),
					}
				],
				tgqdActions: [{
						value: '论坛',
						name: this.$t('kh.text13'),
					},
					{
						value: 'QQ群',
						name: this.$t('kh.text14'),
					},
					{
						value: '自定义',
						name: this.$t('kh.text15'),
					},
					{
						value: 'Facebook',
						name: 'Facebook',
					},
					{
						value: 'Line',
						name: 'Line',
					}
				],
				currentTab: 0,
				loading: false,
				formData: {
					accountType: '玩家', // 默认选中玩家
					username: '',
					password: '',

				},
				linkData: {
					accountType: '玩家', // 默认选中玩家
					szqx: '', //设置期限
					tgqd: '', //推广渠道
					desc: '',
				},
				tgqd: this.$t('kh.text13'), //推广渠道
				szqx: '1' + this.$t('kh.text10'), //设置期限
				rules: {
					accountType: [{
						required: true,
						message: this.$t('kh.text38'),
						trigger: 'change'
					}],
					username: [{
							required: true,
							message: this.$t('kh.text26'),
							trigger: 'blur'
						},
						{
							min: 4,
							max: 16,
							message: this.$t('kh.text27'),
							trigger: 'blur'
						}
					],
					password: [{
						min: 6,
						max: 16,
						message: this.$t('kh.text28'),
						trigger: 'blur'
					}]
				},
				tabs: [{
					label: this.$t('kh.text2'),
					icon: '/static/1.png',
					activeIcon: '/static/1.png'
				}, {
					label: this.$t('kh.text3'),
					icon: '/static/1.png',
					activeIcon: '/static/1.png'
				}, {
					label: this.$t('kh.text4'),
					icon: '/static/1.png',
					activeIcon: '/static/1.png'
				}],
				linkSysData: [],

			}

		},

		onLoad() {

		},
		mounted() {},
		beforeDestroy() {},
		methods: {
			getLinkQdName(linkQd) {
				if (!linkQd) return '';
				const action = this.tgqdActions.find(action => action.value === linkQd);

				return action ? action.name : '';
			},
			copyUrl(url) {
				let _this = this
				uni.setClipboardData({
					data: url,
					success: function() {
						_this.$modal.msg(_this.$t('mine.text27'))
					}
				})
			},
			close() {
				this.showPic = false
				setTimeout(() => {
					this.oneFindArr = []
				}, 1000);

			},
			wantToGo(item) {
				// alert(item.id)
				// Example: navigate to
				//  `/pages/user/add?id=123`
				console.log(JSON.stringify(item, null, 2));
				uni.navigateTo({
					url: `/pages/agent/team/userInfo`
				});
			},
			erweima(item) {
				this.oneFindArr = item
				this.showPic = true
			},
			delLink(item) {
				let _this = this
				uni.showModal({
					title: this.$t('kh.text30'),
					content: this.$t('kh.text29'),
					success: function(res) {
						if (res.confirm) {
							_this.confirmDel(item)
						} else if (res.cancel) {
							console.log('取消');
						}
					}
				});
			},
			async confirmDel(item) {
				try {
					this.loading = true;
					let {
						data,
						code
					} = await delRegLink({
						id: item.id
					});
					if (code == 200) {
						this.$modal.msg('link delete success')
						this.getRegLinkListInfo()
					}
				} catch (e) {
					console.log('验证失败:', e);
				} finally {
					this.loading = false;
				}
			},
			rqClick() {
				this.showRq = !this.showRq
			},
			checkSzqx() {
				this.showSzqx = true
			},
			szqxSelect(e) {
				this.szqx = e.name
				this.linkData.szqx = e.value
				this.$refs.uFormLink.validateField('linkData.szqx')
			},
			checkTgqd() {
				this.showTgqd = true
			},
			tgqdSelect(e) {
				this.tgqd = e.name
				this.linkData.tgqd = e.value
				this.$refs.uFormLink.validateField('linkData.tgqd')
			},
			confirmClick(){
				let _this = this
				const passw =  _this.formData.password ?  _this.formData.password : '123456'
				uni.setClipboardData({
					data: "用户名："+_this.formData.username + ',' + '重设登录密码：'+ passw + ',' + '平台网址:blackdiamond1.tv',
					success: function() {
						_this.showTitle = false
						_this.formData.username = ''
						_this.formData.password = ''
					}
				})
			},
			cancelSub(){
				this.formData.username = ''
				this.formData.password = ''
				this.showTitle = false
			},
			async getRegLinkListInfo() {
				this.loading = true;
				try {
					let {
						data,
						code
					} = await getRegLinkList();
					if (code == 200) {
						this.linkSysData = data
						console.log(data)
					}
				} catch (e) {
					console.log('验证失败:', e);
				} finally {
					this.loading = false;
				}
			},
			async handleSubmit() {

				
				try {
					// 表单验证
					await this.$refs.uForm.validate();
					this.loading = true;
					// 处理密码默认值
					const submitData = {
						...this.formData,
						password: this.formData.password || '123456'
					};
					let {
						data,
						code
					} = await openAccount(submitData);
					if (code == 200) {
						this.$modal.msg('open account success')
						this.showTitle = true
					}
					// 这里添加提交逻辑，例如：
					// await this.$api.register(submitData);
				} catch (e) {
					console.log('验证失败:', e);
				} finally {
					this.loading = false;
				}
			},
			handleTabChange(index) {
				console.log(index)
				this.currentTab = index;
				if (this.currentTab == 2) {
					this.getRegLinkListInfo()
				}

			},
			async linkHandleSubmit() {
				try {
					this.loading = true;
					if (this.linkData.szqx == "") {
						return this.$modal.msg(this.$t('kh.text31'))
					}
					if (this.linkData.tgqd == "") {
						return this.$modal.msg(this.$t('kh.text32'))
					}
					// 处理密码默认值
					const submitData = {
						...this.linkData,
					};
					let {
						data,
						code
					} = await createRegLink(submitData);
					if (code == 200) {
						this.saveLink(data)
					}
				} catch (e) {
					console.log('验证失败:', e);
				} finally {
					this.loading = false;
				}
			},
			async saveLink(item) {
				this.qrcodeInstance = new QRCode(this.$refs.qrcode, {
					text: item.reg_link,
					width: 256,
					height: 256,
					colorDark: '#000000',
					colorLight: '#ffffff',
					correctLevel: QRCode.CorrectLevel.H
				});
				const canvas = this.$refs.qrcode.querySelector('canvas');
				this.qrcodeData = canvas.toDataURL('image/png');

				try {
					let {
						data,
						code
					} = await saveBaseUrl({
						id: item.id,
						qrcodeData: this.qrcodeData
					});
					if (code == 200) {
						this.$modal.msg(this.$t('kh.text33'))
						this.linkData.desc = ""
					}
				} catch (e) {
					console.log('验证失败:', e);
				} finally {
					this.loading = false;
				}
			},
			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.custom-badge {
		position: absolute !important;
		/* 强制覆盖默认定位 */
		top: -5px !important;
		/* 根据需求调整 */
		right: -15px !important;
		/* 根据需求调整 */
	}

	.content {
		font-size: 40rpx;
	}

	.ag-link-lmanage {
		background-color: #f5f5f5;
		padding-top: 15.6px;
	}

	.ag-link-lmanage .ag-link-mgtop {
		background-color: #fff;
		padding: 0 15.6px 0 16.64px;
		height: 35.36px;
		color: #5e5e5e;
		line-height: 35.36px;
		overflow: hidden;
		font-size: 14.04px;
	}


	.container_link {
		// padding: 20rpx;
		background-color: #fff;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
		}

		.icons {
			display: flex;
			gap: 30rpx;
		}
	}

	.divider {
		color: #5e5e5e;
		/* 保持与图标颜色一致 */
		font-size: 20px;
		margin: 0 -4px;
		/* 微调间距 */
		transform: translateY(-1px);
		/* 垂直居中微调 */
	}

	.date-section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 20rpx;
		color: #666;
		font-size: 26rpx;
	}

	.card {
		margin: 20rpx 0;
		padding: 20rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

		.card-header {
			display: flex;
			align-items: center;
			// gap: 10rpx;
			color: #666;
			margin-bottom: 20rpx;
		}
	}

	.info-table {
		display: flex;
		justify-content: space-between;

		.row {
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 50rpx;
			padding: 15rpx 0;
			border-bottom: 1rpx solid #eee;
		}
	}

	.red-text {
		color: #e64340;
	}

	.green-text {
		color: #09bb07;
	}
</style>