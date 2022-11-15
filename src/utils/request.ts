// development
export const BASE_URL = ''

// production
// export const BASE_URL = ''

// @ts-ignore
import store from '@/store/index'
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { getCodeMap } from './map'
import { removeStorage } from './auth'
import Roll from './roll'

// import interface from uni d.ts
import RequestOptions = UniNamespace.RequestOptions

/*
 * option: extends uni http option
 * roll: roll send http for network error
 */
const request = (option: RequestOptions, roll: boolean = false) => {
	return new Promise((resolve, reject) => {
		if (!option.url) reject(new Error('请输入URL'))

		const roll_id = uuidv4()
		// in roll request with roll id for wather connector
		if (roll) {
			Roll.request(roll_id, option, resolve)
		}

		// http send success and callback
		const requestRoll = (res: any) => {
			if (roll) {
				Roll.response(roll_id, res)
			} else {
				resolve(res)
			}
		}

		// format http option with default config
		const formatOption = {
			url: BASE_URL + option.url,
			method: option.method ? option.method.toUpperCase() : 'GET',
			header: {
				// @ts-ignore
				'Authorization': store.state.user.token
			},
			timeout: 5000
		}

		// http send success callback
		const requestSuccess = (res: any) => {
			if (res.statusCode === 200) {
				requestRoll(res)
			}
			else if (res.statusCode === 401) {
				removeStorage()
				uni.showToast({
					title: res.data as string,
					icon: 'none',
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				}, 1500)
				reject()
			}
			else if (res.statusCode === 500) {
				reject()
			}
			else if (res.statusCode === 201 || res.statusCode === 204) {
				uni.showToast({
					title: getCodeMap(res.statusCode) as string,
					icon: 'success'
				})
				requestRoll(res)
			}
			else {
				requestRoll(res)
			}
		}

		// http send failed callback
		const requestFail = (err: any) => {
			if (err.statusCode) {
				removeStorage()
				uni.showToast({
					title: getCodeMap(401) as string,
					icon: 'none'
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/index'
					})
				}, 1500)
				reject(err)
			}

			if (roll) {
				setTimeout(() => requestSend(), 1000)
			}
			else uni.showToast({
				title: '网络出错！',
				icon: 'none'
			})
		}

		// http request send method
		const requestSend = () => {
			// @ts-ignore
			uni.request({
				...option,
				...formatOption,
				success: requestSuccess,
				fail: requestFail
			})
		}

		requestSend()
	})
}

export default request

