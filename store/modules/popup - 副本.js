const popup = {
	state: {
		showUserPopup: false,
		showFlPopup: false,
		showAccountPopup: false,
		showLoginPopup: false,
		showAnnouncementPopup: false,
		accessModes: 0,
		showConversionPopup: false,
		showshowSplash: false,
	},
	mutations: {
		setUserPopup: (state, data) => {
			state.showUserPopup = data
		},
		setFlPopup: (state, data) => {
			state.showFlPopup = data
		},
		setAccountPopup: (state, data) => {
			state.showAccountPopup = data
		},
		setLoginPopup: (state, data) => {
			state.showLoginPopup = data
		},
		setAnnouncementPopup: (state, data) => {
			state.showAnnouncementPopup = data
		},
		setAccessMode: (state, data) => {
			state.accessModes = data
		},
		setConversionPopup: (state, data) => {
			state.showConversionPopup = data
		},
		showshowSplash: (state, data) => {
			state.showshowSplash = data
		},

	},
	actions: {
		setUserPopup({
			commit
		}, data) {
			commit('setUserPopup', data)
		},
		setFlPopup({
			commit
		}, data) {
			commit('setFlPopup', data)
		},

		setAccountPopup({
			commit
		}, data) {
			commit('setAccountPopup', data)
		},

		setLoginPopup({
			commit
		}, data) {
			commit('setLoginPopup', data)
		},

		setAnnouncementPopup({
			commit
		}, data) {
			commit('setAnnouncementPopup', data)
		},

		setAccessMode({
			commit
		}, data) {
			data ? data = data : data = 0
			commit('setAccessMode', data)
		},
		setConversionPopup: ({
			commit
		}, data) => {
			commit('setConversionPopup', data)
		},
		showshowSplash: ({
			commit
		}, data) => {
			commit('showshowSplash', data)
		}

	}
}

export default popup