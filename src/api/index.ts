// @ts-ignore
import request from '@/utils/request'

export const test = () => {
	return request({
		method: 'POST',
		url: '/test-api/sss'
	}, true)
}

export const login = (data: any = {}) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('success')
		}, 1000);
	})
	return request({
		method: 'GET',
		url: '/test-api/login',
		data
	})
}
