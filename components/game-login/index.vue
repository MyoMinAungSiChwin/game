<template>
	<view class="game_login">
		<u-popup :show="showLoginPopup" mode="bottom"
			@close="$store.dispatch('setLoginPopup', false); returnForm(); resetCheck()" :round="10">
			<view class="d_login_popup" style="
  background-image: url('../static/images/bj.jpg');
     background-size: 100% 100%;   
      background-repeat: no-repeat;   
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  height: 100vh;"
  >
				<u-icon class="off_icon" name="arrow-left" color="#fff" size="38rpx"
					style="position: absolute; top: 14%; left: 10%;"
					@tap="$store.dispatch('setLoginPopup', false); loginNavIndex=1"></u-icon>
				<view class="login_type game_flex">
					<view style="background-image: url('/static/images/tzs/loginandreg.png');    background-size: 100% 100%;
    background-repeat: no-repeat;margin-right: 30rpx;" :class="['row_type']" @tap="loginNavIndex = 1">
						<text>{{$t('jogos.text24')}}</text>
					</view>
					<view style="background-image: url('/static/images/tzs/loginandreg.png');    background-size: 100% 100%;
    background-repeat: no-repeat;" :class="['row_type']" @tap="loginNavIndex = 2">
						<text>{{$t('jogos.text25')}}</text>
					</view>

					<!-- <view :class="['row_type']" style="margin-right: 30rpx;" @tap="loginNavIndex = 1">
            <image src="/static/images/tzs/loginandreg.png" style="height: 10rpx;" mode="widthFix" />
			<text v-if="loginNavIndex == 1">{{$t('jogos.text24')}}</text>
          </view>
          <view :class="['row_type']" @tap="loginNavIndex = 2">
            <image src="/static/images/tzs/loginandreg.png " style="height: 35rpx;" mode="widthFix" />
		<text v-if="loginNavIndex == 2">{{$t('jogos.text25')}}</text>
          </view> -->


					<!--          <u-icon class="off_icon" name="close" color="#fff" size="38rpx"-->
					<!--                  style="position: absolute; top: 20rpx; left: 130%;"-->
					<!--                  @tap="$store.dispatch('setLoginPopup', false); loginNavIndex=1"></u-icon>-->

				</view>


				<view class="login_from" :style="loginNavIndex == 1 ? {
    height: formHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  } : {}" style="
  padding: 30rpx 40rpx;
  border-radius: 20rpx;
  width: 95%;
  border: 1rpx solid gold;
  margin: 100rpx auto 0 auto;
  box-sizing: border-box;
  marginBottom:18%;
">
					<!-- 登录 -->

					<template v-if="loginNavIndex == 1">
						<!-- 	<view style="text-align: center; font-size: 50rpx; color: #FFF9E3;">
							登录获得 10,000筹码!
						</view> -->
						<view style="flex: 1; display: flex; flex-direction: column; gap: 20rpx;">
							<view>
								<u--input :placeholder="$t('login.text12')" border="none" v-model="loginForm.account"
									color="#fff"
									:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FFEE58'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}"
									:class="[accountErr && 'error_input_border']">
									<template slot="prefix">
										<u-icon name="account-fill" color="#FDD835" size="38rpx"></u-icon>
									</template>
								</u--input>
								<text class="error_input_text" v-show="accountErr">{{accountErrText}}</text>
							</view>

							<view>
								<u--input :placeholder="$t('login.text13')" border="none" v-model="loginForm.password"
									color="#fff"
									:customStyle="{ height: '80rpx', padding: '0 20rpx', marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}"
									:class="[passErr && 'error_input_border']" :type="isOpen?'text':'password'">
									<template slot="prefix">
										<u-icon name="lock" color="#FDD835" size="38rpx"></u-icon>
									</template>
									<template slot="suffix">
										<u-icon name="eye-fill" color="#FDD835" size="38rpx"
											@tap="isOpen=!isOpen"></u-icon>
									</template>
								</u--input>
								<text class="error_input_text" v-show="passErr">{{passErrText}}</text>
							</view>
							<view
								style="display: flex;justify-content: space-between; align-items: center; margin-top: 20rpx;margin-bottom: 0rpx;">
								<view>
									<u-checkbox-group v-model="remember" activeColor="#FDD835" placement="column"
										@change="toggleRemember">
										<u-checkbox labelColor="#FDD835" labelSize="14" :label="$t('team.text81')"
											name="记住密码">
										</u-checkbox>
									</u-checkbox-group>
								</view>
								<view @click="retrievePasswordClick" style="font-size: 25rpx;">
									{{$t('login.title3')}}?
								</view>
							</view>
						</view>
					</template>

					<!-- 注册 -->
					<template v-if="loginNavIndex == 2">
						<!-- 	<view style="text-align: center; font-size: 50rpx; color: #FFF9E3;">
							注册获得 10,000筹码!
						</view> -->
						<view>
							<u--input :placeholder="$t('login.text12')" border="none" v-model="loginForm.username"
								color="#FDD835"
								:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FFEE58'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}"
								:class="[usernameErr && 'error_input_border']">
								<template slot="prefix">
									<u-icon name="account-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>

							</u--input>
							<text class="error_input_text" v-show="usernameErr">{{usernameErrText}}</text>
						</view>

						<view>
							<u--input :placeholder="$t('login.text13')" border="none" v-model="loginForm.password"
								:type="isOpen?'text':'password'" color="#FDD835"
								:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FFEE58'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}">
								<template slot="prefix">
									<u-icon name="lock-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>
								<template slot="suffix">
									<u-icon @tap="isOpen=!isOpen" name="eye-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="passErr">{{passErrText}}</text>
						</view>
						<view>
							<u--input :placeholder="$t('login.text14')" border="none" v-model="loginForm.qrpassword"
								:type="isqrOpen ?'text':'password'" color="#FDD835"
								:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FFEE58'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}">
								<template slot="prefix">
									<u-icon name="lock-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>
								<template slot="suffix">
									<u-icon @tap="isqrOpen=!isqrOpen" name="eye-fill" color="#FDD835"
										size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="qrpassErr">{{qrpassErrText}}</text>
						</view>
						<view>
							<u--input :placeholder="$t('login.text15')" border="none" v-model="loginForm.payeename"
								color="#FDD835"
								:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FFEE58'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}">
								<template slot="prefix">
									<u-icon name="account-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>
							</u--input>
							<text class="error_input_text" v-show="payeenameErr">{{payeenameErrText}}</text>
						</view>
						<view>
							<u--input :placeholder="$t('login.text16')" border="none" v-model="loginForm.mobile"
								color="#FDD835"
								:customStyle="{ height: '80rpx', padding: '0 20rpx', color:'#FDD835'  ,marginTop: '30rpx', border: '0px solid #666',borderBottom:'1px solid #666'}"
								:class="[mobileErr && 'error_input_border']">
								<template slot="prefix">
									<u-icon name="phone-fill" color="#FDD835" size="38rpx"></u-icon>
								</template>

							</u--input>
							<text class="error_input_text" v-show="mobileErr">{{mobileErrText}}</text>
						</view>

					</template>
					<u-button style="border-style:none !important; background-color:transparent !important;"
						class="login_btn" :style="loginNavIndex == 1 ? {
						    backgroundImage: 'url(../static/images/btnsNew.png)',
						    backgroundSize: '100% 100%',
						    backgroundRepeat: 'no-repeat',
							color:'#fff',

						  } : {
						    backgroundImage: 'url(../static/images/btnsNew.png)',
						    backgroundSize: '100% 100%',
						    backgroundRepeat: 'no-repeat',
							color:'#fff'
						  }" :text="loginNavIndex == 1 ? $t('jogos.text24') : $t('jogos.text25')" @click="loginSubmit"
						:disabled="isSubmitting"></u-button>

				</view>

				<!--        <u-icon class="off_icon" name="close" color="#fff" size="38rpx"-->
				<!--                style="position: absolute; top: 20rpx; right: 20rpx;"-->
				<!--                @tap="$store.dispatch('setLoginPopup', false); loginNavIndex=1">-->
				<!--        </u-icon>-->

			</view>

		</u-popup>

		<u-popup :show="retrievePassword" @close="retrievePassword=false; returnForm(); resetCheck()" mode="bottom"
			:round="10">
			<view class="retrieve_popup" style="width: 100% !important; height: 70vh;">
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
	import storageUtil from '../../utils/storageUtil';
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
			},
			link_id: {
				type: [Number, String],
				default: ''
			}
		},
		created() {
			this.loginNavIndex = this.loginIndex;
			this.$dDelay(200).then(() => {
				this.$set(this.loginForm, 'invitation_code', this.invitation_code)
				this.$set(this.loginForm, 'is_agent', this.is_agent)
				this.$set(this.loginForm, 'link_id', this.link_id)
			})
			try {
				const remembered = storageUtil.getSecureStorage('rememberedAccount');
				if (remembered && remembered.remember) {
					this.loginForm.account = remembered.username;
					this.loginForm.username = remembered.username;
					this.loginForm.password = remembered.password;
					this.remember = remembered.remember;
				}
			} catch (e) {
				console.error('读取失败:', e);
			}
		},
		data() {
			return {
				retrievePassword: false,
				tips: '',
				isOpen: false,
				isqrOpen: false,
				loginNavIndex: 1,
				screenHeight: uni.getSystemInfoSync().windowHeight, // 小程序获取屏幕高度
				loginForm: {
					username: '',
					account: '',
					password: '',
					codes: '',
					invitation_code: '',
					is_agent: 0,
					qrpassword: '', //确认密码
					payeename: '',
					mobile: '',
					link_id:0

				},
				remember: [],
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
				mobileErr: false,
				mobileErrText: '',
				accountErrText: '',
				passErr: false,
				passErrText: '',
				qrpassErr: false,
				qrpassErrText: '',
				codeErr: false,
				codeErrText: '',
				payeenameErr: false,
				payeenameErrText: '',
				retrieveUserErr: false,
				retrieveUserErrText: '',
				retrieveCodeErr: false,
				retrieveCodeErrText: '',
				retrievePassErr: false,
				retrievePassErrText: '',
				isSubmitting: false,
			};
		},
		computed: {
			...mapGetters(['showLoginPopup']),
			formHeight() {
				console.log(this.screenHeight)
				// 根据屏幕高度动态调整（示例：iPhone 14 Pro ≈ 650rpx，SE ≈ 235rpx）
				return Math.min(this.screenHeight * 0.79, 850) + 'rpx'; // 限制最大高度
			}
		},

		methods: {

			toggleRemember(e) {
				this.remember = e
			},
			//忘记密码
			retrievePasswordClick() {
				let targetUrl =
					'https://36ia3gupax.irc6cz4m.com/chatwindow.aspx?siteId=65002397&planId=10fe043a-4092-4f6a-b700-dc16822543e3'; // 确保 url 来自可靠数据源
				if (typeof targetUrl !== 'string' || !targetUrl.trim()) {
					console.error('Invalid URL');
					return;
				}

				targetUrl = targetUrl.trim();

				// 处理协议相对路径（如 '//example.com'）
				if (targetUrl.startsWith('//')) {
					targetUrl = `https:${targetUrl}`;
				}

				// 检测并补全协议头
				if (!/^https?:\/\//i.test(targetUrl)) {
					targetUrl = `https://${targetUrl}`;
				} else if (/^http:\/\//i.test(targetUrl)) {
					// 可选：强制替换 HTTP 为 HTTPS
					targetUrl = targetUrl.replace(/^http:\/\//i, 'https://');
				}

				window.open(targetUrl, '_blank');
				// this.$store.dispatch('setLoginPopup', false)
				// this.retrievePassword = true
			},
			hasChinese(str) {
				return /[\u2E80-\u2EFF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/
					.test(str);
			},
			// 登录、注册
			async loginSubmit() {
				let _this = this
				if (_this.isSubmitting) return;
				try {
					_this.isSubmitting = true; // 开始提交
					if (_this.hasChinese(_this.loginForm.account) && _this.loginNavIndex == 1) {
						_this.accountErr = true,
							_this.accountErrText = this.$t('login.text20')
						return
					}
					if (!_this.loginForm.username && _this.loginNavIndex == 2) {
						_this.usernameErr = true,
							_this.usernameErrText = this.$t('login.text5')
						return
					}
					if (_this.hasChinese(_this.loginForm.username) && _this.loginNavIndex == 2) {
						_this.usernameErr = true,
							_this.usernameErrText = this.$t('login.text20')
						return
					}
					if (!this.loginForm.password) {
						this.passErr = true,
							this.passErrText = this.$t('login.text7')
						return
					}
					if (this.passErr) return

					if (!this.loginForm.qrpassword && this.loginNavIndex == 2) {
						this.qrpassErr = true,
							this.qrpassErrText = this.$t('login.text7')
						return
					}

					if (this.loginForm.password !== this.loginForm.qrpassword && this.loginNavIndex == 2) {
						this.qrpassErr = true,
							this.qrpassErrText = this.$t('login.text17')
						return
					}

					if (this.hasChinese(this.loginForm.payeename) && this.loginNavIndex == 2) {
						this.payeenameErr = true,
							this.payeenameErrText = this.$t('login.text22')
						return
					}
					if (this.loginNavIndex == 2 && !this.loginForm.mobile) {
						this.mobileErr = true,
							this.mobileErrText = this.$t('login.text18')
						return
					}
					if (this.loginNavIndex == 2 && this.loginForm.mobile.length < 11) {
						this.mobileErr = true,
							this.mobileErrText = this.$t('login.text19')
						return
					}
					// if (!this.loginForm.invitation_code && this.loginNavIndex == 2) {

					// 			this.retrieveCodeErr = true,
					// 			this.retrieveCodeErrText = this.$t('login.text11')
					// 	return
					// }
					// if (this.retrieveCodeErr && this.loginNavIndex == 2) return

					if (this.loginNavIndex === 1) {
						// 模拟登录成功
						console.log(this.remember.length)
						if (this.remember.length > 0) {
							// 保存账号密码
							storageUtil.setSecureStorage('rememberedAccount', {
								username: this.loginForm.account,
								password: this.loginForm.password,
								remember: ['记住密码']
							});
						} else {
							// 不记住密码则清除存储
							uni.removeStorageSync('rememberedAccount');
						}
						this.userLogin(this.loginForm)
					} else {
							this.$set(this.loginForm, 'invitation_code', uni.getStorageSync('invitation_code'))
							this.$set(this.loginForm, 'is_agent', uni.getStorageSync('is_agent'))
							this.$set(this.loginForm, 'link_id', uni.getStorageSync('link_id'))
						let {
							data,
							code
						} = await register(this.loginForm)
						if (code == 200) {
							_this.$modal.msg(_this.$t('msg.text2'))
							let {
								data,
								code
							} = await this.$store.dispatch('Login', {
								account: _this.loginForm.username,
								password: _this.loginForm.password
							})
							if (code == 200) {
								_this.$store.dispatch('GetInfo')
								_this.$store.dispatch('setLoginPopup', false)
								// 2. 构造只含非空参数的 query 对象
								  const PARAM_KEYS = ['invitation_code', 'is_agent', 'link_id'];
								  const query = {};
								
								  PARAM_KEYS.forEach(key => {
									// uni.getStorageSync 不存在时返回 '' 或 undefined
									const val = uni.getStorageSync(key);
									if (val !== null && val !== undefined && val !== '') {
									  query[key] = val;
									}
								  });
								
								  // 3. 小延迟后再跳转
								  this.$dDelay(100).then(() => {
									// 如果 query 里没东西，也会正常跳转，只是不带参数
									this.$router.push({
									  path: '/pages/jogos/index',
									  query
									});
								  });
								// window.location.reload()
							}
						}
					}
				} finally {
					setTimeout(() => {
						this.isSubmitting = false;
					}, 3000)
				}

			},
			async userLogin(params) {
				let {
					data,
					code
				} = await this.$store.dispatch('Login', params)
				if (code == 200) {
					this.$modal.msg(this.$t('msg.text3'))
					this.$store.dispatch('GetInfo')
					this.$store.dispatch('setLoginPopup', false)
					this.$setTemporizador()
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
				if (this.hasChinese(val)) {
					this.accountErr = true,
						this.accountErrText = this.$t('login.text20')
				} else {
					this.accountErr = false,
						this.accountErrText = ''
				}
			},
			'loginForm.username'(val) {
				if (val == null) return
				if (this.hasChinese(val)) {
					this.usernameErr = true,
						this.usernameErrText = this.$t('login.text20')
				} else {
					this.usernameErr = false,
						this.usernameErrText = ''
				}
			},
			'loginForm.payeename'(val) {
				if (val == null) return
				if (this.hasChinese(val)) {
					this.payeenameErr = true,
						this.payeenameErrText = this.$t('login.text22')
				} else {
					this.payeenameErr = false,
						this.payeenameErrText = ''
				}
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
			'loginForm.qrpassword'(val) {
				if (!val) return
				if (this.loginForm.password !== val) {
					this.qrpassErr = true,
						this.qrpassErrText = '两次输入密码不正确'

				}
				if (val.length < 6 || val.length > 20) {
					this.qrpassErr = true,
						this.qrpassErrText = this.$t('login.text8')
				} else {
					this.qrpassErr = false,
						this.qrpassErr = ''
				}
			},
			'loginForm.mobile'(val) {
				if (!val) return
				if (val.length > 11) {
					this.mobileErr = true,
						this.mobileErrText = '请输入11位'
				} else {
					this.mobileErr = false,
						this.mobileErrText = ''
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
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.btn_text {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
}

.login_btn23:active {
  opacity: 0.9;
  transform: scale(0.98);
}

.game_login {
  .d_login_popup {
    min-height: 100vh; // changed from height to min-height
    width: 100%;
    color: #FDD835;
    background-color: #181f2b;
    box-sizing: border-box;
    padding-bottom: constant(safe-area-inset-bottom); /* iOS safe area */
    padding-bottom: env(safe-area-inset-bottom);

    .login_type {
      position: absolute;
      top: 19%;
      left: 3%;
      right: 3%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 20rpx;
      padding-right: 20rpx;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .row_type {
      min-width: 200rpx;
      height: 80rpx;
      color: #FDD835;
      text-align: center;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      & > text {
        font-size: 30rpx;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(180deg, #a36d09 16%, #faf2b2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }
    }

    .active_type {}
    .active_types {}

    .login_from {
      .fr_one {
        margin: 20rpx 0;
        flex-direction: column;
        align-items: center;
        font-size: 34rpx;

        & > text {
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
      left: 6%;
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

/* Responsive tweaks */
@media screen and (max-width: 420px) {
  .game_login .d_login_popup .retrieve_popup {
    width: 90%;
  }
}

@media screen and (min-width: 421px) and (max-width: 768px) {
  .game_login .d_login_popup .login_type .row_type {
    min-width: 180rpx;
  }
}

@media screen and (min-width: 769px) {
  .game_login .retrieve_popup {
    width: 600rpx;
  }
}
</style>
