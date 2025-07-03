import request from '@/utils/request'

// banner
export function banner() {
	return request({
		url: 'index/getban',
		method: 'POST',
	})
}

// 公告
export function notice() {
	return request({
		url: 'index/getchat',
		method: 'POST'
	})
}

export function dowloadUrl() {
	return request({
		url: 'index/dowloadUrl',
		method: 'POST'
	})
}



// 游戏列表
export function gameList(data) {
	return request({
		url: 'index/game_index',
		method: 'POST',
		data
	})
}

// 进入游戏
export function enterGame(data) {
	return request({
		url: 'index/in_game',
		method: 'POST',
		data
	})
}

// 活动详情
export function eventDetails(type) {
	return request({
		url: 'index/get_contents',
		method: 'POST',
		data: {
			type
		}
	})
}

// 获取联系方式
export function information(data) {
	return request({
		url: 'index/get_c',
		method: 'GET',
	})
}

// 获取某个分类下游戏列表
export function gameLists(data) {
	return request({
		url: 'index/game_detai',
		method: 'POST',
		data
	})
}

//银行卡列表
export function getBankListInfo(data) {
	return request({
		url: 'bank/getBankListInfo',
		method: 'POST',
		data
	})
}

//保存订单信息
// export function saveRechargeOrderInfo(data) {
// 	return request({
// 		url: 'bank/saveRechargeOrder',
// 		method: 'POST',
// 		data
// 	})
// }
export function saveRechargeOrderInfo(data) {
	return request({
		url: 'bank/syncRechargeOrder',
		method: 'POST',
		data
	})
}
export function saveRechargeOrderLinShi(data) {
	return request({
		url: 'bank/saveRechargeOrderLinShi',
		method: 'POST',
		data
	})
}


export function txConfigList() {
	return request({
		url: 'bank/txConfigList',
		method: 'POST',
	})
}


export function getUsdtGroupList() {
	return request({
		url: 'bank/getUsdtGroupList',
		method: 'POST',
	})
}


export function getUsdtTypeList() {
	return request({
		url: 'bank/getUsdtTypeList',
		method: 'POST',
	})
}

export function expiredOrderInfo(data) {
	return request({
		url: 'bank/expiredOrder',
		method: 'POST',
		data
	})
}

export function getOrderLogListInfo(data) {
	return request({
		url: 'bank/getOrderLogListInfo',
		method: 'POST',
		data
	})
}

// 获取真人视讯数据源
export function getZrList(data) {
	return request({
		url: 'restricted/getZrList',
		method: 'POST',
		data
	})
}
export function openAccount(data) {
	return request({
		url: 'restricted/openAccount',
		method: 'POST',
		data
	})
}


export function createRegLink(data) {
	return request({
		url: 'restricted/createRegLink',
		method: 'POST',
		data
	})
}


export function saveBaseUrl(data) {
	return request({
		url: 'restricted/saveBaseUrl',
		method: 'POST',
		data
	})
}


export function getRegLinkList(data) {
	return request({
		url: 'restricted/getRegLinkList',
		method: 'POST',
		data
	})
}

export function delRegLink(data) {
	return request({
		url: 'restricted/delRegLink',
		method: 'POST',
		data
	})
}


    //获取用户所有子节点
export function getChildArr(data) {
	return request({
		url: 'restricted/getChildArr',
		method: 'POST',
		data
	})
}
//总览
export function zlList(data) {
	return request({
		url: 'restricted/zlLists',
		method: 'POST',
		data
	})
}

//团队
// export function grReportList(data) {
// 	return request({
// 		url: 'restricted/grReportLists',
// 		method: 'POST',
// 		data
// 	})
// }
//团队
export function grReportList(data) {
  return request({
    url: 'restricted/grReportListtest',
    method: 'POST',
    data
  })
}
//我的
export function myIncome(data) {
	return request({
		url: 'restricted/myIncomes',
		method: 'POST',
		data
	})
}

//我的
export function betList(data) {
	return request({
		url: 'restricted/betList',
		method: 'POST',
		data
	})
}

export function csList(data) {
	return request({
		url: 'restricted/getGameCs',
		method: 'POST',
		data
	})
}

// 获取所有分类
export function getGameTypeList(data) {
	return request({
		url: 'restricted/getGameTypeList',
		method: 'POST',
		data
	})
}


export function getGameTypeListYk(data) {
  return request({
    url: 'restricted/getGameTypeListYk',
    method: 'POST',
    data
  })
}

export function getGameTypeInfo(data) {
	return request({
		url: 'restricted/getGameTypeInfo',
		method: 'POST',
		data
	})
}

// 获取下载地址
export function downloadAddress() {
	return request({
		url: 'index/get_c',
		method: 'POST',
	})
}

// 模糊查询游戏
export function fuzzyQueryGame(data) {
	return request({
		url: 'index/game_like',
		method: 'POST',
		data
	})
}

// 弹窗公告
export function announcementData(){
	return request({
		url: 'index/conts',
		method: 'POST'
	})
}
//银行列表
export function getBankType(){
	return request({
		url: 'bank/getBankType',
		method: 'POST'
	})
}

export function getXnType(){
	return request({
		url: 'bank/getXnType',
		method: 'POST'
	})
}
//客服
export function getCustomerList(){
	return request({
		url: 'restricted/getCustomerList',
		method: 'POST'
	})
}

//删除银行卡
export function delCardInfo(data){
	return request({
		url: 'bank/delCard',
		method: 'POST',
		data
	})
}
export function delUsdtCard(data){
	return request({
		url: 'bank/delUsdtCard',
		method: 'POST',
		data
	})
}
export function delXnCard(data){
	return request({
		url: 'bank/delXnCard',
		method: 'POST',
		data
	})
}
//编辑银行卡
export function editCardInfo(data){
	return request({
		url: 'bank/editCard',
		method: 'POST',
		data
	})
}
export function editUsdtCard(data){
	return request({
		url: 'bank/editUsdtCard',
		method: 'POST',
		data
	})
}
export function editXnCard(data){
	return request({
		url: 'bank/editXnCard',
		method: 'POST',
		data
	})
}


//编辑银行卡
export function detailCardInfo(data){
	return request({
		url: 'bank/detailCard',
		method: 'POST',
		data
	})
}

export function detailXnCard(data){
	return request({
		url: 'bank/detailXnCard',
		method: 'POST',
		data
	})
}
export function detailUsdtCard(data){
	return request({
		url: 'bank/detailUsdtCard',
		method: 'POST',
		data
	})
}



//添加用户银行卡
export function addUserBank(data){
	return request({
		url: 'bank/addUserBank',
		method: 'POST',
		data
	})
}

export function addUserXnData(data){
	return request({
		url: 'bank/addUserXnData',
		method: 'POST',
		data
	})
}

export function addUserUsdtData(data){
	return request({
		url: 'bank/addUserUsdtData',
		method: 'POST',
		data
	})
}

//用户提现

export function userTx(data){
	return request({
		url: 'bank/userTx',
		method: 'POST',
		data
	})
}
    //获取用户银行卡列表
export function getUserBankList(){
	return request({
		url: 'bank/getUserBankList',
		method: 'POST'
	})
}


export function getUserUsdtList(){
	return request({
		url: 'bank/getUserUsdtList',
		method: 'POST'
	})
}

export function getUserXnList(){
	return request({
		url: 'bank/getUserXnList',
		method: 'POST'
	})
}
// 公共说明
export function commonalityInstruc(type){
	return request({
		url: 'index/get_contents',
		method: 'POST',
		data:{type}
	}) 
}

// 领取优惠券
export function downCoupon(Code){
	return request({
		url: 'index/set_code',
		method: 'POST',
		data:{Code}
	}) 
}

// 获取左侧
export function getLeft(){
	return request({
		url: 'index/get_left',
		method: 'POST',
	}) 
}

// 查看是否被收藏
export function lookLike(game_id){
	return request({
		url: 'index/look_like',
		method: 'POST',
		data: {game_id}
	}) 
}

// 收藏游戏
export function likeGame(game_id){
	return request({
		url: 'index/like_game',
		method: 'POST',
		data: {game_id}
	}) 
}


// 取消收藏游戏
export function cLikeGame(game_id){
	return request({
		url: 'index/c_like_game',
		method: 'POST',
		data: {game_id}
	}) 
}

// 获取收藏列表
export function getGame(game_id){
	return request({
		url: 'index/get_game',
		method: 'POST',
		data: {game_id}
	}) 
}


export function updateUserDesc(data) {
  return request({
    url: 'user/updateUserDesc',
    method: 'POST',
      data
  })
}


export function upgradeUserAccount(data) {
  return request({
    url: 'user/upgradeUserAccount',
    method: 'POST',
      data
  })
}