<template>
	<view class="content">
	    <image class="logo" src="/static/logo.png" />
	    <view class="text-area">
	        <u-input
				v-model="title"
				placeholder="Please Scan Code"
				:focus="inputFocus"
				@confirm="inputConfirm"></u-input>
	    </view>
	</view>
</template>

<script setup lang="ts">
	import useLoading from '@/compose/loading'
	import { ref, onMounted, nextTick } from 'vue'
	import { getStorage } from '@/utils/auth'
	import { onNavigationBarButtonTap } from '@dcloudio/uni-app'

	// const loading = useLoading()
	// setTimeout(() => {
	// 	loading.hideLoading()
	// }, 2000)
	const title = ref('')
	const inputFocus = ref(false)

	onMounted(() => {
		if (!getStorage('token')) {
			uni.showToast({
				title: '请先登录',
				icon: "error"
			})
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			},1000)
		}
		setTimeout(() => {
			inputFocus.value = true
		}, 0)
	})

	const handleExit = () => {
		uni.showModal({
			title: '提示',
			content: '确定退出登录吗？',
			success: function (res) {
				if (res.confirm) {
					uni.removeStorageSync('token')
					uni.removeStorageSync('userLoginInfo')
					uni.reLaunch({
						url: '/pages/login/index'
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}

	const handleScan = () => {
		const mpaasScanModule = uni.requireNativePlugin("Mpaas-Scan-Module")
		mpaasScanModule.mpaasScan({
			'scanType': ['qrCode', 'barCode']
		},
		(ret) => {
			if (ret.resp_code === 1000) {
				title.value = ret.resp_result
			}
		})
	}
	
	const inputConfirm = () => {
		inputFocus.value = false
		uni.showToast({
			title: `${title.value}`
		})
		setTimeout(() => {
			title.value = ''
			inputFocus.value = true
		}, 600)
	}

	onNavigationBarButtonTap((e) => {
		switch (e?.name) {
			case 'exit': handleExit()
				break;
			case 'scan': handleScan()
				break;
			default:
				break;
		}
	})
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
