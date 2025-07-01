import VueI18n from "vue-i18n";
import Vue from 'vue'
import store from '@/store/index.js'

// 西班牙语
import spain from './spain.js'
// 中文
import zh from './zh.js' 
//英文
import english from './english.js'
// 葡萄牙
import portugal from './Portugal.js'
// 缅甸语
import burmese from './burmese.js'

Vue.use(VueI18n)

export default new VueI18n({
	locale: store.state.user.language || 'zh',
	// locale: 'zh',
	messages: {
		// 中文
		'zh': zh,
		// 西班牙
		//'spain': spain,
		// 英文
		'english': english,
		// 葡萄牙
		//'portugal': portugal,
		// 缅甸语
		'burmese': burmese
	}
});
 