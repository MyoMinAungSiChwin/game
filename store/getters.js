const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	roles: state => state.user.roles,
	userInfo: state => state.user.userInfo,
	permissions: state => state.user.permissions,
	invitation_code: state => state.user.invitation_code,
	showOrderSuccessTip:state =>  state.user.showOrderSuccessTip,
	tipMessage:state =>  state.user.tipMessage,
	tipType:state =>  state.user.tipType,
	
	showUserPopup: state => state.popup.showUserPopup,
	showFlPopup: state => state.popup.showFlPopup,
	showAccountPopup: state => state.popup.showAccountPopup,
	accessModes: state => state.popup.accessModes,
	showLoginPopup: state => state.popup.showLoginPopup,
	showAnnouncementPopup: state => state.popup.showAnnouncementPopup,
	showConversionPopup: state => state.popup.showConversionPopup,
	promotionVisible: state => state.popup.promotionVisible,
	downloadVisible: state => state.popup.downloadVisible,

}
export default getters