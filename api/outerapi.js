import request from '@/utils/request'


export function getOuterByUser(data) {
	const {
		userid,
		token
	} = data
	return request({
		'url': 'user/outerByUser',
		'method': 'POST',
		data: {
			userid,
			token
		}
	})
}