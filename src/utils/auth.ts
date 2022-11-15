// @ts-ignore
import Cookies from 'js-cookie'
// @ts-ignore
import store from '@/store/index'

// private: get token
const getToken = () => {
	// @ts-ignore
	if (store.state.user.token) {
		// @ts-ignore
		return store.state.user.token
	}
	if (Cookies.get('token')) {
		return Cookies.get('token')
	}
	if (uni.getStorageSync('token')) {
		return uni.getStorageSync('token')
	}
	return null
}

// save uni storage
export const setStorage = (key: string, value: any) => {
	uni.setStorageSync(key, value)
	if (key === 'token') {
		store.commit('user/SET_TOKEN', value)
	}
}

// get uni storage or token by cookie
export const getStorage = (key: string) => {
	if (key) {
		if (key === 'token') {
			return getToken()
		}
		return uni.getStorageSync(key) || null
	}
	return null
}

// remove uni storage
export const removeStorage = (key: string | undefined = undefined) => {
	if (key) uni.removeStorageSync(key)
	else uni.clearStorageSync()
}
