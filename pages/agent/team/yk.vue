<template>
	<view class="voucher_center">
		<view class="navHeader" style="margin-bottom:100rpx;">
			<u-navbar leftText="返回" bgColor="black" :height="50" :safeAreaInsetTop="false" @leftClick="leftClick">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" color="#be984c" size="20"></u-icon>
				</view>
				<view class="u-nav-slot" slot="center">
					<view>
						<text style="font-size: 35rpx; color: #be984c;font-weight: bold;">{{$t('team.text1')}}</text>
					</view>
				</view>

			</u-navbar>
		</view>
		<view>
			<!-- 自定义tabs组件 -->
			<custom-tabs :tabsList="tabs" @change="handleTabChange" :isShow="true" />
			<!-- 内容区域 -->
			<view class="content">
				<view>
					<view>
						<view style="display: flex;justify-content: space-between;align-items: center; gap:10; padding: 0 20rpx;
					         box-shadow: 0 4rpx 3rpx rgba(0,0,0,0.08);
					         position: relative;
					         border-bottom: 2rpx solid rgb(17, 39, 58);">
							<view style="width:75%;">
								<u-input v-model="filters.username" clearable @clear="clearEnter"
									:placeholder="$t('team.text6')" prefixIcon="search"
									prefixIconStyle="font-size: 22px;color: #909399">
									<template slot="suffix">
										<u-button size="mini" @tap="handleSearchEnter">search</u-button>
									</template></u-input>
							</view>
							<view style="display: flex;align-items: center;padding: 40rpx 0rpx;" @click="allSearch">
								<text style="font-size: 25rpx;margin-right: 6rpx;">{{selectedDateTypeName}}</text>
								<u-icon :name="!showModal ? 'arrow-down' :  'arrow-up'" size="15"></u-icon>
							</view>
						</view>
						<view v-show="showModal"
							style="background-color: #fff; width: 100%; position: absolute; z-index: 1000;">
							<view style="width: 100%; padding:0rpx 20rpx">
								<view class="list-item">

									<view class="item-group" style="margin-top: 30rpx;">
										<view class="item-btn"
											:class="filters.date_type == item.key ? 'checked_btn' : ''"
											v-for="(item,index) in dateTypeArr" :key="index" @tap="dateTypeClick(item)">
											<text>{{item.name}}</text>
										</view>
									</view>
									<view class="calendar-group item-spacing" style="margin-top: 30rpx;">
										<text style="font-size: 12px;">{{$t('team.text91')}}</text>
										<view class="calendar-select" @tap="dateTypeTimeClick('select')">
											<view class="am-button-icon"><span style="padding: 20rpx;">
													{{filters.startTime}}
													-
													{{filters.endTime }}</span>
											</view>
										</view>
									</view>
									<view style="margin-top: 30rpx; display: flex; justify-content: space-between; align-items: center;">
										<view style="font-size: 30rpx;">{{$t('team.text92')}}</view>
										<view><u-switch v-model="lv" size="20" @change="change"></u-switch></view>
									</view>
								</view>
							</view>
						</view>
						<view>
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view style="margin:20rpx;">
									<view
										style="border: 1px solid #595959; padding: 10rpx; font-size: 25rpx;border-radius: 12rpx;">
										{{filters.username || userInfo.username}}
									</view>
								</view>
								<view style="display: flex;align-items: baseline; margin-right: 15rpx;">
									<view style="margin:0 10rpx;">|</view><text style="font-size: 25rpx;color: orange;">
										{{$t('team.text8')}}</text>
									<view style="margin:  0 8rpx;font-size: 25rpx;">{{dataList.count_r || 0}}</view>
								</view>
							</view>
							<view style="margin-top:30rpx;">
								<view class="my-withdraw-cards">
									<view class="my-ew-banks-wrap">
										<view class="withdraw-bank-card-ew">
											<view class="cards-title" @click="zsClick"
												style="padding:0 20rpx; display: flex; justify-content: space-between;">
												<view style="font-weight: bold;">{{userInfo.username || ''}}</view>
												<view>{{$t('team.text93')}}{{dataList.zs || 0 }} <span
														style="margin-left: 10rpx;">></span></view>
											</view>
											<view class="card">
												<!-- 每行作为一个 flex 容器 -->
												<view class="row" v-if="currentTab  == 0">
													<view class="item">
														<text class="label">{{$t('team.text10')}}：</text>
														<text class="value">{{dataList.zcz || 0}}</text>
													</view>
													<view class="item">
														<text class="label">{{$t('team.text11')}}：</text>
														<text class="value">{{dataList.ztx || 0}}</text>
													</view>
												</view>
												<view class="row">
													<view class="item">
														<text class="label">{{ $t('team.text13')}}</text>
														<text class="value">{{dataList.zyouxiaotouzhu || 0}}</text>
													</view>

												</view>
												<hr>

												<view class="row" style="margin-top: 20rpx;">

													<view class="item" v-if="currentTab  == 0">
														<text class="label">{{$t('tzsCustomize.title5')}}</text>
														<text class="value"
															style="color: blue;">{{dataList.zzs || 0}}</text>
													</view>
													<view class="item" v-if="currentTab  !== 0">
														<text class="label">{{ $t('team.text94')}}</text>
														<text class="value">{{dataList.actualStake || 0}}</text>
													</view>
													<!-- <view class="item">
														<text class="label">{{$t('team.text51')}}：</text>
														<text class="value"
															style="color: blue;">{{dataList.won_count || 0}}</text>
													</view> -->
												</view>

												<view class="row">
													<view class="item">
														<text class="label">{{$t('tzsCustomize.title7')}}：</text>
														<text class="value"
															:style="parseFloat(dataList.zongshuying) > 0 ? 'color: green;' : 'color: red;'">{{dataList.zongshuying || 0}}</text>
													</view>
													<view class="item">
														<text class="label">{{$t('team.text15')}}：</text>
														<text class="value"
															:style="parseFloat(dataList.zongyingkui) > 0 ? 'color: green;' : 'color: red;'">{{dataList.zongyingkui }}</text>
													</view>
												</view>
												<br />
											</view>
											<view v-for="(item,key) in dataList.user_list_data">
												<view class="cards-title" @click="zsClick"
													style="padding:0 20rpx; display: flex; justify-content: space-between;margin-top:20px;">
													<view
														style="font-weight: bold; display: flex; align-items: center;">

														<view v-if="item.is_agent === 1">
															<svg fill="#f2000c" height="23px" width="23px" version="1.1"
																id="Layer_1" xmlns="http://www.w3.org/2000/svg"
																xmlns:xlink="http://www.w3.org/1999/xlink"
																viewBox="0 0 480 480" xml:space="preserve">
																<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
																<g id="SVGRepo_tracerCarrier" stroke-linecap="round"
																	stroke-linejoin="round"></g>
																<g id="SVGRepo_iconCarrier">
																	<g>
																		<g>
																			<path
																				d="M420.526,259.853c33.711-5.7,59.474-35.09,59.474-70.403c0-39.345-32.034-71.354-71.408-71.354 c-39.371,0-71.401,32.009-71.401,71.354c0,32.686,22.074,60.293,52.087,68.743c-17.138,2.687-30.071,11.488-38.521,26.288 c-2.8,4.903-5.079,10.486-6.868,16.768c-5.902-10.095-13.456-19.495-22.535-27.914c-11.932-11.065-25.919-19.713-40.891-25.536 c29.151-15.938,48.969-46.907,48.969-82.422c0-51.733-42.079-93.822-93.8-93.822c-51.746,0-93.844,42.088-93.844,93.822 c0,35.517,19.829,66.488,48.996,82.425c-14.968,5.822-28.955,14.469-40.89,25.531c-9.407,8.718-17.17,18.49-23.164,28.992 c-2.15-6.82-4.93-12.918-8.338-18.262c-7.961-12.485-19.394-20.748-33.564-24.477c32.975-6.3,57.982-35.344,57.982-70.136 c0-39.345-32.031-71.354-71.401-71.354C32.034,118.096,0,150.105,0,189.45c0,33.043,22.557,60.906,53.075,69.022 c-16.505,2.978-29.707,11.659-38.602,25.582C5.289,298.43,0.632,318.224,0.632,342.89v55.555c0,5.523,4.477,10,10,10h111.56 h226.837H453.15c5.523,0,10-4.477,10-10V342.89c0-25.501-3.82-44.604-11.68-58.401 C444.326,271.946,433.953,263.713,420.526,259.853z M20,189.45c0-28.317,23.061-51.354,51.408-51.354 c28.343,0,51.401,23.037,51.401,51.354c0,28.352-23.059,51.419-51.401,51.419C43.061,240.869,20,217.802,20,189.45z M112.192,356.526v31.918h-91.56v-45.553c0-43.524,15.412-65.593,45.809-65.593c16.095,0,27.572,5.73,35.088,17.517 c7.075,11.096,10.663,27.271,10.663,48.075V356.526z M161.788,165.378c0-40.707,33.126-73.823,73.843-73.823 c38.241,0,69.776,29.246,73.439,66.552l-92.353-32.401c-3.599-1.263-7.604-0.368-10.323,2.307l-44.324,43.6 C161.897,169.555,161.788,167.48,161.788,165.378z M132.192,388.445v-31.918h-0.001c0-44.679,35.918-84.625,81.124-94.798 c1.59,1.066,3.502,1.689,5.561,1.689h8.172v116.441c0,3.654,1.966,6.841,4.893,8.586H132.192z M167.641,194.186l48.336-47.546 l92.179,32.34c-6.4,34.245-36.475,60.251-72.524,60.251C205.128,239.231,178.887,220.637,167.641,194.186z M339.028,388.445 h-96.873c2.926-1.745,4.893-4.932,4.893-8.586V263.418h9.014c1.611,0,3.128-0.39,4.477-1.067 c43.957,11.097,78.489,50.361,78.489,94.176V388.445z M357.19,189.45c0-28.317,23.059-51.354,51.401-51.354 c28.347,0,51.408,23.037,51.408,51.354c0,28.352-23.062,51.419-51.408,51.419C380.249,240.869,357.19,217.802,357.19,189.45z M443.15,388.445h-84.122v-31.918v-13.636c0-57.8,21.277-65.593,42.09-65.593c20.784,0,42.032,7.793,42.032,65.593V388.445z">
																			</path>
																		</g>
																	</g>
																</g>
															</svg>
														</view>
														<view v-else>
															<u-icon name="account" color="#000" size="20"></u-icon>
														</view>
														<view style="margin-left: 10rpx;"
															:style="{ color: item.is_agent === 1 ? 'red' : '' }">
															{{item.username || ''}}
														</view>
													</view>

												</view>
												<view class="card" style="margin-top: 20px;">
													<!-- 每行作为一个 flex 容器 -->

													<view class="row" v-if="currentTab  == 0">
														<view class="item">
															<text class="label">{{$t('team.text10')}}：</text>
															<text class="value">{{item.user_zcz || 0}}</text>
														</view>
														<view class="item">
															<text class="label">{{$t('team.text11')}}：</text>
															<text class="value">{{item.user_ztx || 0}}</text>
														</view>
													</view>
													<view class="row">
														<view class="item">
															<text class="label">{{ $t('team.text13')}}</text>
															<text class="value">{{item.user_zyouxiaotouzhu || 0}}</text>
														</view>

													</view>
													<hr>

													<view class="row" style="margin-top: 20rpx;">

														<view class="item" v-if="currentTab  == 0">
															<text class="label">{{$t('tzsCustomize.title5')}}</text>
															<text class="value"
																style="color: blue;">{{item.user_zzs || 0}}</text>
														</view>
														<view class="item" v-if="currentTab  !== 0">
															<text class="label">派奖金额</text>
															<text class="value">{{item.user_actualStake || 0}}</text>
														</view>
														<!-- <view class="item">
														<text class="label">{{$t('team.text51')}}：</text>
														<text class="value"
															style="color: blue;">{{dataList.won_count || 0}}</text>
													</view> -->
													</view>

													<view class="row">
														<view class="item">
															<text class="label">{{$t('tzsCustomize.title7')}}：</text>
															<text class="value"
																:style="parseFloat(item.user_zongshuying) > 0 ? 'color: green;' : 'color: red;'">{{item.user_zongshuying || 0}}</text>
														</view>
														<view class="item">
															<text class="label">{{$t('team.text15')}}：</text>
															<text class="value"
																:style="parseFloat(item.user_zongyingkui) > 0 ? 'color: green;' : 'color: red;'">{{item.user_zongyingkui }}</text>
														</view>
													</view>

													<br />

												</view>
											</view>


										</view>

									</view>
								</view>
							</view>
						</view>
						<!-- <view style="margin-top:530rpx;" v-else>
							<u-empty mode="data">
							</u-empty>
						</view> -->

					</view>
				</view>

			</view>
		</view>
		<global-notify></global-notify>
		<u-calendar :show="rqShow" :min-date="calendar.minDate" :max-date="calendar.maxDate"
			:default-date="currentDefaultDate" mode="range" :monthNum="calendar.monthNum"
			:defaultDate="calendar.defaultDate" @close="rqShow=false" @confirm="handleConfirm" closeOnClickOverlay>
		</u-calendar>

		<u-popup :show="zshyShow" mode="bottom" safeAreaInsetTop @close="zshyClose">
			<view style="height: 90vh; overflow: auto;">
				<view v-for="(item,key) in dataList.zs_user_list_data">
					<view class="cards-title" @click="zsClick"
						style="padding:0 20rpx; display: flex; justify-content: space-between;margin-top:20px;">
						<view style="font-weight: bold; display: flex; align-items: center;">
							<view v-if="item.is_agent === 1">
								<svg fill="#f2000c" height="23px" width="23px" version="1.1" id="Layer_1"
									xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
									viewBox="0 0 480 480" xml:space="preserve">
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
									<g id="SVGRepo_iconCarrier">
										<g>
											<g>
												<path
													d="M420.526,259.853c33.711-5.7,59.474-35.09,59.474-70.403c0-39.345-32.034-71.354-71.408-71.354 c-39.371,0-71.401,32.009-71.401,71.354c0,32.686,22.074,60.293,52.087,68.743c-17.138,2.687-30.071,11.488-38.521,26.288 c-2.8,4.903-5.079,10.486-6.868,16.768c-5.902-10.095-13.456-19.495-22.535-27.914c-11.932-11.065-25.919-19.713-40.891-25.536 c29.151-15.938,48.969-46.907,48.969-82.422c0-51.733-42.079-93.822-93.8-93.822c-51.746,0-93.844,42.088-93.844,93.822 c0,35.517,19.829,66.488,48.996,82.425c-14.968,5.822-28.955,14.469-40.89,25.531c-9.407,8.718-17.17,18.49-23.164,28.992 c-2.15-6.82-4.93-12.918-8.338-18.262c-7.961-12.485-19.394-20.748-33.564-24.477c32.975-6.3,57.982-35.344,57.982-70.136 c0-39.345-32.031-71.354-71.401-71.354C32.034,118.096,0,150.105,0,189.45c0,33.043,22.557,60.906,53.075,69.022 c-16.505,2.978-29.707,11.659-38.602,25.582C5.289,298.43,0.632,318.224,0.632,342.89v55.555c0,5.523,4.477,10,10,10h111.56 h226.837H453.15c5.523,0,10-4.477,10-10V342.89c0-25.501-3.82-44.604-11.68-58.401 C444.326,271.946,433.953,263.713,420.526,259.853z M20,189.45c0-28.317,23.061-51.354,51.408-51.354 c28.343,0,51.401,23.037,51.401,51.354c0,28.352-23.059,51.419-51.401,51.419C43.061,240.869,20,217.802,20,189.45z M112.192,356.526v31.918h-91.56v-45.553c0-43.524,15.412-65.593,45.809-65.593c16.095,0,27.572,5.73,35.088,17.517 c7.075,11.096,10.663,27.271,10.663,48.075V356.526z M161.788,165.378c0-40.707,33.126-73.823,73.843-73.823 c38.241,0,69.776,29.246,73.439,66.552l-92.353-32.401c-3.599-1.263-7.604-0.368-10.323,2.307l-44.324,43.6 C161.897,169.555,161.788,167.48,161.788,165.378z M132.192,388.445v-31.918h-0.001c0-44.679,35.918-84.625,81.124-94.798 c1.59,1.066,3.502,1.689,5.561,1.689h8.172v116.441c0,3.654,1.966,6.841,4.893,8.586H132.192z M167.641,194.186l48.336-47.546 l92.179,32.34c-6.4,34.245-36.475,60.251-72.524,60.251C205.128,239.231,178.887,220.637,167.641,194.186z M339.028,388.445 h-96.873c2.926-1.745,4.893-4.932,4.893-8.586V263.418h9.014c1.611,0,3.128-0.39,4.477-1.067 c43.957,11.097,78.489,50.361,78.489,94.176V388.445z M357.19,189.45c0-28.317,23.059-51.354,51.401-51.354 c28.347,0,51.408,23.037,51.408,51.354c0,28.352-23.062,51.419-51.408,51.419C380.249,240.869,357.19,217.802,357.19,189.45z M443.15,388.445h-84.122v-31.918v-13.636c0-57.8,21.277-65.593,42.09-65.593c20.784,0,42.032,7.793,42.032,65.593V388.445z">
												</path>
											</g>
										</g>
									</g>
								</svg>
							</view>
							<view v-else>
								<u-icon name="account" color="#000" size="20"></u-icon>
							</view>
							<view style="margin-left: 10rpx;" :style="{ color: item.is_agent === 1 ? 'red' : '' }">
								{{item.username || ''}}
							</view>
						</view>

					</view>
					<view class="card" style="margin-top: 20px;">
						<!-- 每行作为一个 flex 容器 -->

						<view class="row" v-if="currentTab  == 0">
							<view class="item">
								<text class="label">{{$t('team.text10')}}：</text>
								<text class="value">{{item.user_zcz || 0}}</text>
							</view>
							<view class="item">
								<text class="label">{{$t('team.text11')}}：</text>
								<text class="value">{{item.user_ztx || 0}}</text>
							</view>
						</view>
						<view class="row">
							<view class="item">
								<text class="label">{{ $t('team.text13')}}</text>
								<text class="value">{{item.user_zyouxiaotouzhu || 0}}</text>
							</view>

						</view>
						<hr>

						<view class="row" style="margin-top: 20rpx;">

							<view class="item" v-if="currentTab  == 0">
								<text class="label">{{$t('tzsCustomize.title5')}}</text>
								<text class="value" style="color: blue;">{{item.user_zzs || 0}}</text>
							</view>
							<view class="item" v-if="currentTab  !== 0">
								<text class="label">派奖金额</text>
								<text class="value">{{item.user_actualStake || 0}}</text>
							</view>
							<!-- <view class="item">
							<text class="label">{{$t('team.text51')}}：</text>
							<text class="value"
								style="color: blue;">{{dataList.won_count || 0}}</text>
						</view> -->
						</view>

						<view class="row">
							<view class="item">
								<text class="label">{{$t('tzsCustomize.title7')}}：</text>
								<text class="value"
									:style="parseFloat(item.user_zongshuying) > 0 ? 'color: green;' : 'color: red;'">{{item.user_zongshuying || 0}}</text>
							</view>
							<view class="item">
								<text class="label">{{$t('team.text15')}}：</text>
								<text class="value"
									:style="parseFloat(item.user_zongyingkui) > 0 ? 'color: green;' : 'color: red;'">{{item.user_zongyingkui }}</text>
							</view>
						</view>

						<br />

					</view>
				</view>
			</view>
		</u-popup>




	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		grReportList,
		getGameTypeListYk
	} from '@/api/jogos.js'

	import CustomTabs from '@/components/custom-tabs-yk.vue';
	export default {
		components: {
			CustomTabs
		},
		name: 'voucher',
		computed: {
			...mapGetters(['userInfo']),
			currentDefaultDate() {
				switch (this.currentDateType) {
					case 'select':
						return [this.filters.startTime, this.filters.endTime];
					default:
						return [];
				}
			},
			selectedDateTypeName() {
				if (this.filters.startTime && this.filters.endTime) {
					// 格式化为 MM/DD-MM/DD
					const format = date => {
						if (!date) return ''
						const [year, month, day] = date.split('-')
						return `${month.padStart(2, '0')}/${day.padStart(2, '0')}`
					}
					return `${format(this.filters.startTime)}-${format(this.filters.endTime)}`
				}

				// 当使用预设日期类型时
				const typeItem = this.dateTypeArr.find(
					item => item.key === this.filters.date_type
				)
				return typeItem ? typeItem.name : '未知时间段'
			}
		},
		data() {
			return {
				zshyShow: false,
				rqShow: false,
				monthFirstDay: this.getFirstDayOfMonth(),
				today: this.getToday(),
				minDate: this.getFirstDayOfMonth(), // 默认开始日期
				maxDate: this.getToday(), // 默认结束日期
				showModal: false,
				currentTab: 0,
				showPassword: false,
				password: '',
				dataList: [],
				currentDateType: '',
				dateTypeArr: [{
						id: 0,
						key: 'today',
						name: this.$t('team.text54')
					},
					{
						id: 1,
						key: 'yesterday',
						name: this.$t('team.text53')
					},
					{
						id: 2,
						key: 'last7days',
						name: this.$t('team.text55')
					},
					{
						id: 3,
						key: 'month',
						name: this.$t('team.text56')
					}
				],
				lv: true,
				filters: {
					username: '',
					date_type: 'today',
					startTime: '', // 默认开始日期,
					endTime: '', // 默认结束日期
					game_class_id: 0,
					game_provoder_gpid: 0,
					type: 1,
					lv: 1
				},
				tabs: [],
				calendar: {
					minDate: '',
					maxDate: '',
					defaultDate: '',
					monthNum: 13,
				},
			}

		},

		onLoad() {
			this.grReportListInfo()
			this.getGameTypeListInfo()
		},
		mounted() {
			this.chooseTimed()
		},
		beforeDestroy() {},
		methods: {
			// 设置默认日期，最大值为今天，最小值为去年今天
			chooseTimed() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (month <= 9) {
					month = '0' + month;
				}
				if (day <= 9) {
					day = '0' + day;
				}
				let minyear = year - 1;
				this.calendar.minDate = minyear + '-' + month + '-' + day;
				this.calendar.maxDate = year + '-' + month + '-' + day;
				this.calendar.defaultDate = year + '-' + month + '-' + day;
			},
			// 选择当前一个月之内的数据

			//分类读取
			async getGameTypeListInfo() {
				let {
					data,
					code
				} = await getGameTypeListYk()
				if (code == 200) {
					this.tabs = data
				}

			},
			//用户名搜索
			handleSearchEnter() {
				uni.showLoading({
					title: '用户搜索中...'
				});
				this.grReportListInfo();
			},
			//清空用户搜索
			clearEnter() {
				uni.showLoading({
					title: '数组加载中...'
				});
				this.filters.username = '';
				this.grReportListInfo();
			},
			//全部下级搜索
			allSearch() {
				this.showModal = !this.showModal;
			},
			//日期选择
			dateTypeClick(item) {
				uni.showLoading({
					title: '日期条件筛选中...'
				});
				this.filters.date_type = item.key
				this.filters.startTime = ''
				this.filters.endTime = ''
				this.selectedDateTypeName = item.key
				this.showModal = false
				this.grReportListInfo()
			},
			//日期组件
			dateTypeTimeClick(type) {
				this.currentDateType = type;
				this.rqShow = true
			},
			// 确认选择日期
			handleConfirm(e) {
				uni.showLoading({
					title: '加载中'
				});
				const [start, end] = e;
				const validEnd = this.validateDateRange(end);
				switch (this.currentDateType) {
					case 'select':
						this.filters.startTime = start;
						this.filters.endTime = e.pop();
						break;
				}
				this.rqShow = false;
				this.showModal = false
				this.filters.date_type = 'custom'
				this.grReportListInfo()
			},
			// 验证结束日期不超过今天
			validateDateRange(endDate) {
				const today = new Date(this.today);
				const selectedEnd = new Date(endDate);
				return selectedEnd > today ? this.today : endDate;
			},
			// 本月的第一天
			getFirstDayOfMonth() {
				const date = new Date();
				return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
			},
			//当天
			getToday() {
				const date = new Date();
				return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
			},
			async grReportListInfo() {
				try {
					let {
						data,
						code
					} = await grReportList(this.filters);
					if (code == 200) {
						console.log(data)
						this.dataList = data
					}
				} catch (error) {
					console.error('加载失败:', error);
				} finally {
					uni.hideLoading();
				}
			},
			handleTabChange(item, index) {
				uni.showLoading({
					title: '加载中...'
				});
				let data = item.child; // 假设 data 可能是空数组 []
				this.filters.type = item.id
				this.filters.startTime = ''
				this.filters.endTime = ''
				// 提取去重后的值（如果 data 为空数组，直接返回 [0]）
				const uniqueGameClassIds = data.length === 0 ? [0] : [...new Set(data.map(item => item.game_class_id))];
				const uniqueGameProviderGpids = data.length === 0 ? [0] : [...new Set(data.map(item => item
					.game_provoder_gpid))];
				this.filters.game_class_id = uniqueGameClassIds.join(", ")
				this.filters.game_provoder_gpid = uniqueGameProviderGpids.join(", ")
				console.log(this.filters);
				this.currentTab = index;
				this.grReportListInfo()
			},
			togglePassword() {
				this.showPassword = !this.showPassword
			},

			leftClick() {
				this.$tab.navigateTo(`/pages/userinfo/index`)
			},
			//直属会员
			zsClick() {
				if (this.dataList.zs_user_list_data.length == 0) {
					this.$modal.msg('直属会员不存在，请先关闭过滤后再试')
					return
				}
				this.zshyShow = true
			},
			zshyClose() {
				this.zshyShow = false
			},
			change(e) {
				uni.showLoading({
					title: '加载中...'
				});

				this.filters.lv = e == true ? 1 : 0
				this.grReportListInfo()
				this.showModal = false
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
	}

	.list-submit {
		display: flex;
		margin: 16.0533px 0 0;
		font-size: 16.0533px;
		align-items: center;
		height: 45.2933px;
		line-height: 45.2933px;
		text-align: center;
	}

	.item-reset {
		width: 50%;
		background-color: #f5f5f5;
		color: #646464;
	}

	.item-confirm {
		width: 50%;
		background-color: #fef4f4;
		color: #ec2529;
	}

	.am-button-icon {
		display: flex;
		justify-content: center;
		padding: 0 28.6667px 0 9.17333px;
		border-radius: 4.58667px;
		border: 1.14667px solid #cdcdcd;
		font-size: 13.76px;
		color: #5b5b5b;
	}

	.item-title {
		font-size: 25rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item-group {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		flex-wrap: wrap;
		gap: 30rpx;
	}

	.item-btn {
		border: 1px solid #cdcdcd;
		border-radius: 10rpx;
		width: 30%;
		min-height: 60rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: normal;
		padding: 0 4rpx;
		/* 		margin: 14rpx 0; */
		word-wrap: break-word;
		word-break: break-word;
		text-align: center;

	}

	.checked_btn {

		border: 1px solid #ec2529;
		color: #ec2529;
		background-color: #fef4f4;

	}

	.list-item:first-child {
		border-top: none;
		margin-top: 0 !important;

	}

	.list-item {
		margin-top: 20rpx;

		border-top: 1px solid #ebebeb;
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

	.cards-title {
		font-size: 24rpx;
		padding: 0 10rpx 10rpx 0;
		color: #595959;
	}

	.am-wingblank-lg {
		margin-left: 34rpx;
		margin-right: 34rpx;
	}

	.withdraw-nbank {
		color: #fff;
		font-size: 54rpx;
		margin-top: 44rpx;
		margin-bottom: 44rpx;
		height: 400rpx !important;
		line-height: 400rpx;
		background: url(https://www.may9.tv/mobile/mc/no_cards.b073c0ab.png) no-repeat;
		border-radius: 10rpx;
		background-size: auto 100%;
		background-position: 50%;
		text-align: center;
		position: relative;
	}

	.withdraw-nbank span {
		font-size: 34rpx;
		color: #a9a9a9;
		position: relative;
		bottom: -150rpx;
		display: inline-block;
	}

	.withdraw-bkdbtn {
		height: 36rpx;
		border-bottom: 1px solid #dedede;
		line-height: 0;
		font-size: 0;
		position: relative;
	}

	.withdraw-bkadd {
		padding: 22rpx;
		background-color: #fe0000;
		border: 5rpx solid #fff;
		border-radius: 60rpx;
		position: absolute;
		right: 51rpx;
		bottom: -51rpx;
	}

	.am-icon-md {
		width: 51rpx;
		height: 51rpx;
	}

	.withdraw-bkinfo {
		color: #bababa;
		padding: 44rpx 50rpx 0;
		line-height: 40rpx;
		font-size: 26rpx;
	}

	.wysiwyg {
		line-height: 1.5;
		white-space: normal !important;

	}

	.dark-gray {
		color: #333;
	}

	.wallet_return {
		margin-top: 4rpx;
		margin-bottom: 35rpx;
		text-align: center;
	}

	.wallet_return view {
		margin-top: 10rpx;
		color: #3b79f3;
		background-color: #d7e7fe;
		display: inline-block;
		padding: 0 26rpx;
		font-size: 32rpx;
		/* 	    height: 80rpx; */
		line-height: 80rpx;
		border-radius: 65rpx;
		text-align: center;
		position: relative;
	}

	.icon {
		position: absolute;
		left: 22rpx;
		/* 	    top: 10rpx; */
		width: 56rpx;

		fill: #3b79f3;
	}

	.wallet_return view span {
		/* 	    padding-left: 64rpx; */
		padding: 0 64rpx;
		display: inline-block;
	}

	.amount-wrap {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
	}

	.amount-wrap .amount-title {
		margin: 0 51rpx;
		font-size: 28rpx;
		color: #333;
	}

	.w-input-content {
		display: flex;
		/* 新增flex布局 */
		align-items: center;
		/* 垂直居中 */
		margin: 10rpx 51rpx 0;
		height: 120rpx;
		border: 2rpx solid #ccc;
		border-radius: 10rpx;
		padding: 28rpx 20rpx;
		/* 调整左右padding */
		position: relative;
	}

	.w-input-content .placeholder {
		/* 移除绝对定位和高度100% */
		width: 140rpx !important;
		/* 改为固定宽度 */
		color: #0a0a0a;
		font-size: 34rpx;
		/* 与输入文字大小一致 */
		flex-shrink: 0;
		/* 防止被压缩 */
	}



	.w-input-content input {
		flex: 1;
		/* 自动撑满剩余空间 */
		height: 62rpx;
		font-size: 34rpx;
		border: 0 none;
		padding-left: 20rpx;
		/* 与文字间隔 */
		margin-left: 10rpx;
		/* 与文字间隔 */
	}

	.eye-icon {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.voucher-btn {
		color: #fff;
		font-size: 14px;
		display: inline-block;
		min-height: 1rem;
		width: calc(33% - 22.08px);
		background: none;
		white-space: normal;
		word-break: break-word;
		vertical-align: middle;
		position: relative;
	}

	.voucher-btn span {
		display: flex;
		height: 100%;
		text-align: center;
		vertical-align: middle;
		justify-content: center;
		align-items: center;
	}

	.card {
		margin-top: 20rpx;
		background: #fff;
		border-radius: 12rpx;
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}

	.row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.item {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}

	.label {
		color: #666;
		font-size: 24rpx;
		margin-right: 10rpx;
	}

	.value {
		color: #333;
		font-size: 24rpx;
		font-weight: bold;
		text-align: right;
		flex-shrink: 0;
	}

	/* 最后一行不需要下边距 */
	.row:last-child {
		margin-bottom: 0;
	}
</style>