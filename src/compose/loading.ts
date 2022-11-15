import { onMounted, onBeforeUnmount, nextTick } from 'vue'

const useLoading = (auto: boolean = true) => {
	const showLoading = () => {
		uni.showLoading({
			title: '加载中'
		})
	}
	const hideLoading = () => {
		nextTick(() => uni.hideLoading())
	}

	onMounted(() => {
		if (auto) showLoading()
	})
	onBeforeUnmount(() => {
		if (auto) hideLoading()
	})

	return { showLoading, hideLoading }
}

export default useLoading
