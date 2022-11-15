import store from '@/store'
import { getStorage } from './auth'

// open router intercept
const router = (option: any = {}) => {
	// console.log('token', store.state.user.token)
	// @ts-ignore
	if (!getStorage('token')) {
		// 跳转到登录界面
		uni.showToast({
			title: '请先登录',
			icon: "error"
		})
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/index'
			});
		},1000)
		return
	}
	// console.log('token:',getToken())

	// 拼接 url 携带 请求数据
	let dataUrl = ''
	for (let item in option.data) {
		if(dataUrl !== ''){
			dataUrl = dataUrl + '&' + item + '=' +option.data[item]
		} else {
			dataUrl = '?' + item + '=' +option.data[item]
		}
	}
	// 保留页面跳转
	switch (option.methods || "navigateTo") {
		// 保留页面跳转
		case "navigateTo" :
			uni.navigateTo({
				url: option.path + dataUrl
			});
			break;
		// 关掉页面跳转
		case "redirectTo" :
			uni.redirectTo({
				url: option.path + dataUrl
			});
			break;
		// 关闭所有页面 打开到应用内的某个页面。
		case "reLaunch" :
			uni.reLaunch({
				url: option.path + dataUrl
			});
			break;
		// 跳转到tabBar 关闭非 tabBar。
		case "switchTab" :
			uni.switchTab({
				url: option.path + dataUrl
			});
			break;
		// 跳转到tabBar 关闭非 tabBar。
		case "switchTab" :
			uni.switchTab({
				url: option.path + dataUrl
			});
			break;

		// 关闭当前页面，返回上一页面或多级页面
		case "navigateBack" :
			uni.navigateBack({
				// @ts-ignore
			    url: option.path + dataUrl
			});
			break;
	}
}
export default router
