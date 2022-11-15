<template>
	<view class="content">
	    <image class="logo" src="/static/logo.png" />
	    <view class="text-area">
	        <text class="title">{{ title }}</text>
	    </view>
	</view>
</template>

<script setup lang="ts">
	import useLoading from '@/compose/loading'
	import { ref, onMounted } from 'vue'
	import { getStorage } from '@/utils/auth'

	// const loading = useLoading()
	// setTimeout(() => {
	// 	loading.hideLoading()
	// }, 2000)
	const title = ref('Hello')

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
