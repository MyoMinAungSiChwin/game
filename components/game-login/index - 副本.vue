<template>
	<view class="game_login">
		<u-popup :show="showLoginPopup" mode="bottom"
			@close="$store.dispatch('setLoginPopup', false); returnForm(); resetCheck()" :round="10">
			<view class="d_login_popup" style="background-image: url('../static/images/BJ.png'); 
  background-size: 100%; 
  background-repeat: no-repeat;
  display: flex; 
  flex-direction: column; 
  justify-content: flex-end; 
  align-items: center;
  position: relative;">
				<view class="login_type game_flex" style="position: absolute; top: 20rpx;left: 20rpx; width: 100%;">
					<view :class="['row_type', loginNavIndex == 1 && 'active_type']" @tap="loginNavIndex = 1">
						<text>{{$t('jogos.text24')}}</text>
					</view>
					<view :class="['row_type', loginNavIndex == 2 && 'active_type']" @tap="loginNavIndex = 2">
						<text>{{$t('jogos.text25')}}</text>
					</view>
				</view>

				<view class="login_from" style="
 background: rgba(41, 46, 61, 0.3);
    backdrop-filter: blur(20rpx);
    -webkit-backdrop-filter: blur(20rpx);
    padding: 30rpx;
    border-radius: 20rpx;
    width: 100%;
    border: 1rpx solid rgba(255,255,255,0.1);
  ">
					<!-- 登录 -->

					<template v-if="loginNavIndex == 1">
						<view style="text-align: center; font-size: 50rpx; color: #FFF9E3;">
							登录获得 10,000筹码!
						</view>
						<view>
							<u--input placeholder="username" border="none" v-model="loginForm.account"
								color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
								:class="[accountErr && 'error_input_border']">
								<template slot="prefix">
									<u-icon name="email" color="#999" size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="accountErr">{{accountErrText}}</text>
						</view>

						<view>
							<u--input :placeholder="$t('login.title2')" border="none" v-model="loginForm.password"
								color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
								:class="[passErr && 'error_input_border']" type="password">
								<template slot="prefix">
									<u-icon name="lock" color="#999" size="38rpx"></u-icon>
								</template>
								<template slot="suffix">
									<u-icon name="eye-fill" color="#999" size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="passErr">{{passErrText}}</text>
						</view>

						<view class="esqueceu" @tap="retrievePassword=true">
							{{$t('login.title3')}}?
						</view>
					</template>

					<!-- 注册 -->
					<template v-if="loginNavIndex == 2">
						<view style="text-align: center; font-size: 50rpx; color: #FFF9E3;">
							注册获得 10,000筹码!
						</view>
						<view>
							<u--input placeholder="username" border="none" v-model="loginForm.username" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
								:class="[usernameErr && 'error_input_border']">
								<template slot="prefix">
									<u-icon name="email" color="#999" size="38rpx"></u-icon>
								</template>

							</u--input>
							<text class="error_input_text" v-show="usernameErr">{{usernameErrText}}</text>
						</view>
						<view>
							<u--input :placeholder="$t('login.title1')" border="none" v-model="loginForm.account"
								color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
								:class="[accountErr && 'error_input_border']">
								<template slot="prefix">
									<u-icon name="email" color="#999" size="38rpx"></u-icon>
								</template>

							</u--input>
							<text class="error_input_text" v-show="accountErr">{{accountErrText}}</text>
						</view>

						<view>
							<u--input :placeholder="$t('login.title2')" border="none" v-model="loginForm.password"
								type="password" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}">
								<template slot="prefix">
									<u-icon name="lock" color="#999" size="38rpx"></u-icon>
								</template>
								<template slot="suffix">
									<u-icon name="eye-fill" color="#999" size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="passErr">{{passErrText}}</text>
						</view>
						<!-- 邀请码 -->
						<view>
							<!-- :class="[retrieveCodeErr && 'error_input_border']" -->
							<u--input :placeholder="$t('login.title7')" border="none"
								v-model="loginForm.invitation_code" type="text" color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}">
								<template slot="prefix">
									<u-icon name="scan" color="#999" size="38rpx"></u-icon>
								</template>
							</u--input>
							<!-- <text class="error_input_text" v-show="retrieveCodeErr">{{retrieveCodeErrText}}</text> -->
						</view>
				
		
						<view style="position: relative; display: flex;">
							<u--input :placeholder="$t('login.title5')" border="none" v-model="loginForm.codes"
								color="#fff"
								:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
								:class="[codeErr && 'error_input_border']">

								<template slot="prefix">
									<u-icon name="scan" color="#999" size="38rpx"></u-icon>
								</template>

							</u--input>

							<view style="position: absolute; right: 10rpx; top: 45%;">
								<u-code ref="uCode" :startText="$t('login.text1')" :endText="$t('login.text2')"
									@change="codeChange" seconds="60" :changeText="'X' + $t('login.text3')"></u-code>
								<u-button :text="tips" type="success" size="mini" color="#C7A58E" shape="circle"
									@tap="getVerificationCode('register', '1')"></u-button>
							</view>

							<text class="error_input_text" style="position: absolute; left: 0; bottom: -30rpx;"
								v-show="codeErr">{{codeErrText}}</text>
						</view>
					</template>
					<!-- 
					<view 
					class="cf-turnstile safety_check" 
					id="example-container"
						data-sitekey="1x00000000000000000000AA" data-callback="javascriptCallback">
					</view> -->
					<!-- 		<u-button class="login_btn" type="primary"
						:text="loginNavIndex == 1 ? $t('jogos.text24') : $t('jogos.text25')" shape="circle"
						@tap="loginSubmit"></u-button> -->
					<view class="login_btn23" @tap="loginSubmit" :style="{
						    backgroundImage: 'url(../static/images/btns.png)',
						    backgroundSize: '100% 100%',
						    backgroundRepeat: 'no-repeat'
						  }">
						<text class="btn_text">
							{{ loginNavIndex == 1 ? $t('jogos.text24') : $t('jogos.text25') }}
						</text>
					</view>
				</view>

				<u-icon class="off_icon" name="close" color="#5f7495" size="38rpx"
					style="position: absolute; top: 20rpx; right: 20rpx;"
					@tap="$store.dispatch('setLoginPopup', false); loginNavIndex=1"></u-icon>
			</view>

		</u-popup>

		<u-popup :show="retrievePassword" @close="retrievePassword=false; returnForm(); resetCheck()" mode="center"
			:round="10">
			<view class="retrieve_popup">
				<view v-if="retrieveProcedure == 1">
					<u--input :placeholder="$t('login.title1')" border="none" v-model="retrieveForm.username"
						color="#fff"
						:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
						:class="[retrieveUserErr && 'error_input_border']">

						<template slot="prefix">
							<u-icon name="email" color="#999" size="38rpx"></u-icon>
						</template>
					</u--input>

					<text class="error_input_text" v-show="retrieveUserErr">{{retrieveUserErrText}}</text>
					<u-button class="ret_btn" type="primary" :text="$t('login.title6')" shape="circle"
						@tap="verificationMailbox"></u-button>
				</view>

				<view v-if="retrieveProcedure == 2">
					<view>
						<u--input :placeholder="$t('login.title1')" border="none" v-model="retrieveForm.username"
							color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
							:class="[retrieveUserErr && 'error_input_border']">

							<template slot="prefix">
								<u-icon name="email" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>
						<text class="error_input_text" v-show="retrieveUserErr">{{retrieveUserErrText}}</text>
					</view>

					<view style="position: relative;">
						<u--input :placeholder="$t('login.title5')" border="none" v-model="retrieveForm.codes"
							color="#fff"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}"
							:class="[retrieveCodeErr && 'error_input_border']">

							<template slot="prefix">
								<u-icon name="scan" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>
						<text class="error_input_text" style="position: absolute; left: 0; bottom: -25rpx;"
							v-show="retrieveCodeErr">{{retrieveCodeErrText}}</text>
					</view>
					<view>
						<u--input :placeholder="$t('login.title2')" border="none" v-model="retrieveForm.password"
							color="#fff" type="password" :class="[retrievePassErr && 'error_input_border']"
							:customStyle="{'background': '#292e3d', height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '1px solid #666'}">
							<template slot="prefix">
								<u-icon name="lock" color="#999" size="38rpx"></u-icon>
							</template>
							<template slot="suffix">
								<u-icon name="eye-fill" color="#999" size="38rpx"></u-icon>
							</template>
						</u--input>

						<text class="error_input_text" v-show="retrievePassErr">{{retrievePassErrText}}</text>
					</view>


					<u-button class="ret_btn" type="primary" :text="$t('login.text10')" shape="circle"
						@tap="retrieveSubmit"></u-button>
				</view>
			</view>
		</u-popup>
	
	</view>
</template>

<script>
	import {
		getRequestParams
	} from '@/utils/common.js'
	import {
		mapGetters
	} from 'vuex'

	import {
		login,
		register,
		verificationCode,
		forgotPassword
	} from '@/api/login.js'

	export default {
		name: "gameLogin",
		props: {
			loginIndex: {
				type: [Number, String],
				default: 1
			},
			invitation_code: {
				type: [Number, String],
				default: ''
			},
			is_agent: {
				type: [Number, String],
				default: ''
			}
		},
		created() {
			this.loginNavIndex = this.loginIndex;
			this.$dDelay(200).then(() => {
			this.$set(this.loginForm, 'invitation_code', this.invitation_code)
			this.$set(this.loginForm, 'is_agent', this.is_agent)
			})
		},
		data() {
			return {
				retrievePassword: false,
				tips: '',
				loginNavIndex: 1,
				loginForm: {
					username: '',
					account: '',
					password: '',
					codes: '',
					invitation_code: '',
					is_agent:0
				},

				retrieveProcedure: 1,
				retrieveForm: {
					username: '',
					codes: '',
					password: ''
				},

				// 校验相关
				accountErr: false,
				usernameErr: false,
				usernameErrText: '',
				accountErrText: '',
				passErr: false,
				passErrText: '',
				codeErr: false,
				codeErrText: '',
				retrieveUserErr: false,
				retrieveUserErrText: '',
				retrieveCodeErr: false,
				retrieveCodeErrText: '',
				retrievePassErr: false,
				retrievePassErrText: '',
			};
		},
		computed: {
			...mapGetters(['showLoginPopup'])
		},

		methods: {
			// 登录、注册
			async loginSubmit() {
				if (!this.loginForm.username && this.loginNavIndex == 2) {
					this.usernameErr = true,
					this.usernameErrText = 'Username cannot be empty'
					return
				}
			
				if (!this.loginForm.account) {
					this.accountErr = true,
					this.accountErrText = this.$t('login.text5')
					return
				}
				
				if (this.accountErr) return

				if (!this.loginForm.password) {
					this.passErr = true,
						this.passErrText = this.$t('login.text7')
					return
				}

				if (this.passErr) return

				// if (!this.loginForm.invitation_code && this.loginNavIndex == 2) {

				// 			this.retrieveCodeErr = true,
				// 			this.retrieveCodeErrText = this.$t('login.text11')
				// 	return
				// }
				// if (this.retrieveCodeErr && this.loginNavIndex == 2) return


				if (!this.loginForm.codes && this.loginNavIndex == 2) {
					this.codeErr = true,
					this.codeErrText = this.$t('login.text11')
				} else {
					this.codeErr = false
				}
				if (this.codeErr && this.loginNavIndex == 2) reutrn

				if (this.loginNavIndex === 1) {
					let {
						data,
						code
					} = await this.$store.dispatch('Login', this.loginForm)
					if (code == 200) {
						this.$modal.msg(this.$t('msg.text3'))
						this.$store.dispatch('GetInfo')
						this.$store.dispatch('setLoginPopup', false)
						this.$setTemporizador()
					}
				} else {
					
					let {
						data,
						code
					} = await register(this.loginForm)
					if (code == 200) {
						this.$modal.msg(this.$t('msg.text2'))
						this.$dDelay(1000).then(() => {
							this.loginNavIndex = 1
						})
					}
				}
			},

			codeChange(val) {
				this.tips = val
			},

			// 修改密码 - 提交
			async retrieveSubmit() {

				if (!this.retrieveForm.username) {
					this.retrieveUserErr = true,
						this.retrieveUserErrText = this.$t('login.text5')
					return
				}
				if (this.retrieveUserErr) return

				if (!this.retrieveForm.codes) {
					this.retrieveCodeErr = true,
						this.retrieveCodeErrText = this.$t('login.text11')
				}
				if (this.retrieveCodeErr) return


				if (!this.retrieveForm.password) {
					this.passErr = true,
						this.passErrText = this.$t('login.text7')
					return
				}
				if (this.retrievePassErr) return

				const {
					code,
					data
				} = await forgotPassword(this.retrieveForm)
				if (code == 200) {
					// this.$modal.msg(this.$t('jogos.title5'))
					this.$dDelay(1000).then(() => {
						this.loginNavIndex = 1
					})
				}
			},

			// 验证邮箱
			async verificationMailbox() {
				if (!this.retrieveForm.username) {
					this.retrieveUserErr = true,
						this.retrieveUserErrText = this.$t('login.text5')
					return
				}

				if (this.retrieveUserErr) return

				let form = {
					username: this.retrieveForm.username,
					event: 'retrieve'
				}
				let ins = await verificationCode(form)
				if (ins.code == 200) {
					this.retrieveProcedure = 2
				}

				// if (!this.retrieveForm.username) {
				// 	this.retrieveUserErr = true,
				// 		this.retrieveUserErrText = '用户名是必填项'
				// 	return
				// }

				// if (this.retrieveUserErr) return

				// const {
				// 	code,
				// 	data
				// } = await verificationCode(this.retrieveForm)
				// if (code == 200) {
				// 	// this.$modal.msg(this.$t('jogos.title5'))
				// 	this.retrieveProcedure = 2
				// 	this.resetCheck()
				// }
			},

			// 获取验证码
			async getVerificationCode(event) {
				if (!this.loginForm.account) {
					this.accountErr = true,
						this.accountErrText = this.$t('login.text5')
					return
				}
				if (this.accountErr) return
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading()
					const form = {
						username: this.loginForm.account,
						event
					}
					const {
						code,
						data
					} = await verificationCode(form)
					uni.hideLoading();
					if (code == 200) {
						this.$modal.msg(this.$t('login.title4'))
						this.$refs.uCode.start();
					}
				} else {
					// this.$modal.msg(this.$t('login.title5'))
				}

			},
			// 重置校验
			resetCheck() {
				this.accountErr = false
				this.accountErrText = ''
				this.passErr = false
				this.passErrText = ''
				this.codeErr = false
				this.codeErrText = ''
				this.retrieveUserErr = false
				this.retrieveUserErrText = ''
				this.retrieveCodeErr = false
				this.retrieveCodeErrText = ''
				this.retrievePassErr = false
				this.retrievePassErrText = ''
			},

			returnForm() {
				this.loginForm = {
						account: null,
						password: null,
						invitation_code: null,
					},
					this.retrieveForm = {
						username: null,
						codes: null,
						password: null
					}

			},

			// 加载浏览器验证 创建实例
			// loadTurnstile() {
			// 	window.onloadTurnstileCallback = function() {
			// 		turnstile.render('#example-container', {
			// 			sitekey: '1x00000000000000000000AA',
			// 			callback: function(token) {
			// 				console.log(1231313123123123)
			// 				console.log(`Challenge Success ${token}`);
			// 			},
			// 		});
			// 	};
			// },

			// 动态加载js文件
			// loadScript(){
			// 	const script = document.createElement('script')
			// 	script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
			// 	script.defer = true
			// 	document.body.appendChild(script)
			// 	this.loadTurnstile()
			// }
		},
		watch: {
			loginNavIndex(index) {
				this.resetCheck()
				this.loginForm = {
					account: null,
					password: null,
					codes: null,
					invitation_code: null,
				}
			},

			'loginForm.account'(val) {
				if (val == null) return
				// if (!this.$isEmail(val)) {
				// 	this.accountErr = true,
				// 		this.accountErrText = this.$t('login.text6')
				// } else {
				// 	this.accountErr = false,
				// 		this.accountErrText = ''
				// }
			},

			'retrieveForm.username'(val) {
				if (val == null) return
				// if (!this.$isEmail(val)) {
				// 	this.retrieveUserErr = true,
				// 		this.retrieveUserErrText = this.$t('login.text6')
				// } else {
				// 	this.retrieveUserErr = false,
				// 		this.retrieveUserErrText = ''
				// }
			},

			'loginForm.password'(val) {
				if (!val) return
				if (val.length < 6 || val.length > 20) {
					this.passErr = true,
						this.passErrText = this.$t('login.text8')
				} else {
					this.passErr = false,
						this.passErrText = ''
				}
			},
			'loginForm.invitation_code'(val) {
				if (!val) return
				if (val.length < 4 || val.length > 6) {
					this.retrieveCodeErr = true,
						this.retrieveCodeErrText = this.$t('login.text9')
				} else {
					this.retrieveCodeErr = false,
						this.retrieveCodeErrText = ''
				}
			},

			'loginForm.codes'(val) {
				if (!val) return
				if (val.length < 4 || val.length > 6) {
					this.codeErr = true,
						this.codeErrText = this.$t('login.text9')
				} else {
					this.codeErr = false,
						this.codeErrText = ''
				}
			},

			'retrieveForm.codes'(val) {
				if (!val) return
				if (val.length < 4 || val.length > 6) {
					this.retrieveCodeErr = true,
						this.retrieveCodeErrText = this.$t('login.text9')
				} else {
					this.retrieveCodeErr = false,
						this.retrieveCodeErrText = ''
				}
			},

			'retrieveForm.password'(val) {
				if (!val) return
				if (val.length < 6 || val.length > 20) {
					this.retrievePassErr = true,
						this.retrievePassErrText = this.$t('login.text8')
				} else {
					this.retrievePassErr = false,
						this.retrievePassErrText = ''
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	.login_btn23 {
		width: 100%;
		height: 88rpx;
		margin-top: 40rpx;
		border-radius: 24rpx;
		/* 圆形效果 */
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s;
		/* 过渡动画 */
	}

	.btn_text {
		color: #ffffff;
		font-size: 32rpx;
		font-weight: 500;
		letter-spacing: 2rpx;
	}

	/* 点击反馈效果 */
	.login_btn23:active {
		opacity: 0.9;
		transform: scale(0.98);
	}

	.game_login {

		.d_login_popup {
			padding: 30rpx;
			height: 80vh;
			width: 100%;
			color: #fff;
			background-color: #181f2b;

			.login_type {
				transform: skew(15deg);

				.row_type {
					padding: 20rpx 0;
					width: 200rpx;
					color: black;
					text-align: center;
					font-weight: 700;

					&>text {
						display: inline-block;
						transform: skew(-15deg);
					}
				}

				.active_type {
					// background-color: #2282F5;
					background-image: url('/static/images/btn.png');
					background-repeat: no-repeat;
					background-size: 100%;
					background-position: center;
					font-weight: 700;
					color: white;
				}
			}

			.login_from {
				.fr_one {
					margin: 20rpx 0;
					flex-direction: column;
					align-items: center;
					font-size: 34rpx;

					&>text {
						margin-top: 20rpx;
					}
				}

				.fr_four {
					height: 80rpx;
					line-height: 80rpx;
				}

				.esqueceu {
					height: 70rpx;
					line-height: 70rpx;
					color: rgb(255, 249, 227);
					text-decoration: underline;
				}
			}

			.off_icon {
				position: absolute;
				top: 40rpx;
				right: 6%;
			}

			.login_btn {
				margin-top: 60rpx;
			}
		}

		.retrieve_popup {
			padding: 30rpx;
			width: 600rpx;
			color: #fff;
			border-radius: 12rpx;
			background-color: #181f2b;

			.ret_btn {
				margin-top: 40rpx;
			}
		}

		.web_view {
			margin: 40rpx auto 0 auto;
			background-color: pink;
		}

		.safety_check {
			margin: 30rpx auto 0 auto;
			padding: 0 10rpx;
			font-size: 18rpx;
			color: #666;
			text-align: center;
		}
	}
</style>