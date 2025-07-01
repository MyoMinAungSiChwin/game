import Vue from 'vue'
import App from './App'
import store from './store' // store
import plugins from './plugins' // plugins
import './permission'
import {
	isLogin,
	dDelay,
	isEmail
} from '@/utils/common.js'
import i18n from './lang/index.js'
import config from '@/config.js'
import uView from "@/uni_modules/uview-ui";
Vue.use(plugins).use(uView)

// import '@/utils/challenges.js'

import gameHeader from '@/components/game-header'
import GameFooter from '@/components/game-footer/index.vue'
import gameTabbar from '@/components/game-tabbar'
import gameUser from '@/components/game-user'
import gameLogin from '@/components/game-login'
import ganeFlPopup from '@/components/game-fl-popup'
import gameAccount from '@/components/game-account'
import gameAnnouncement from '@/components/game-announcement'
import gamePaging from '@/components/game-paging'
import gameConversion from '@/components/game-conversion'
import gameAnimations from '@/components/game-animations'
import gameDownLoad from '@/components/game-download'
import GlobalNotify from '@/components/global-notify.vue'
Vue.component('game-header', gameHeader)
Vue.component('game-footer', GameFooter)
Vue.component('game-tabbar', gameTabbar)
Vue.component('game-user', gameUser)
Vue.component('game-login', gameLogin)
Vue.component('game-fl-popup', ganeFlPopup)
Vue.component('game-account', gameAccount)
Vue.component('game-announcement', gameAnnouncement)
Vue.component('game-paging', gamePaging)
Vue.component('game-conversion', gameConversion)
Vue.component('game-animations', gameAnimations)
Vue.component('game-download', gameDownLoad)
Vue.component('global-notify', GlobalNotify)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$isLogin = isLogin
Vue.prototype.$dDelay = dDelay
Vue.prototype.$isEmail = isEmail
Vue.prototype.$mm = plugins


Vue.prototype.$setTemporizador = setInterval(() => {
	store.dispatch('GetInfo')


	// uni.onSocketMessage(res => {
	// 	const data = JSON.parse(res.data);
	// 	console.log(data)
	// });



}, 5000)

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})

app.$mount()