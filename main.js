
// 域名重定向逻辑，必须放在最顶部
(function() {
  const host = window.location.host;
  const arr = host.split('.');
  const subdomain = arr[0];

  // 数据化的排除列表
  const skipSubdomains = ['www', 'ceshi' , 'xince'];

  // 只有子域名不在排除列表且域名段数大于 2 时才重定向
  if (arr.length > 2 && !skipSubdomains.includes(subdomain)) {
	const [invitation_code = '', is_agent = '', link_id = ''] = subdomain.split('-');
	const mainDomain = arr.slice(1).join('.');
	const search = window.location.search || '';
	const extra = search ? '&' + search.substring(1) : '';

	const newParams = `invitation_code=${invitation_code}&is_agent=${is_agent}&link_id=${link_id}${extra}`;
	const url = `${window.location.protocol}//${mainDomain}/#/?${newParams}`;
	window.location.replace(url)
	// window.location.href = url;
  }
})();

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


// 需要拦截并追加参数的跳转方法列表
const NAV_METHODS = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'];
// 缓存里的三个 key
const PARAM_KEYS = ['invitation_code', 'is_agent', 'link_id'];

NAV_METHODS.forEach(method => {
  uni.addInterceptor(method, {
    invoke(args) {
      // 先拿到本次跳转的原始 url
      let url = args.url || '';
      
      // 取出缓存里要追加的参数
      const extras = PARAM_KEYS.map(key => {
        const val = uni.getStorageSync(key);
        return (val !== null && val !== '' && typeof val !== 'undefined')
          ? `${key}=${encodeURIComponent(val)}`
          : null;
      })
      .filter(item => item)  // 过滤掉 null
      .join('&');

      if (extras) {
        // 判断原 url 有没有查询参数 ?，决定用 & 或 ?
        const sep = url.includes('?') ? '&' : '?';
        args.url = `${url}${sep}${extras}`;
      }

      // 返回 true 才会继续执行跳转
      return true;
    }
  });
});

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