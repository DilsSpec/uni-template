<template>
	<view v-if="spinning" class="loading-popup">
		<u-loading
			mode="flower"
			size="80"
			:show="spinning"/>
	</view>

	<view class="login-content">
		<view class="login-content__icon">
			<image class="login-content__icon-img" src="../../static/images/welcome.png" alt="" />
		</view>
		<view class="login-content__title">
			欢迎回来!
		</view>
		<view class="login-content__container">
			<view class="login-content__container-item">
				<u-icon class="login-content__container-icon" name="account" color="white" size="30"></u-icon>
				<u-input
					class="login-content__container-input"
					placeholder="请输入用户名"
					v-model="username"
					@confirm="loginSubmit"
				/>
			</view>
			<view class="login-content__container-item second">
				<u-icon class="login-content__container-icon" name="lock" color="white" size="30"></u-icon>
				<u-input
					class="login-content__container-input"
					placeholder="请输入密码"
					v-model="password"
					:type="passwordType"
					@focus="changePasswordType"
					@confirm="loginSubmit"
				/>
			</view>
			<view class="login-content__container-item third">
				<view class="login-content__container-action">
					<view
						v-if="register"
						class="login-content__container-action__register">
						立即注册
					</view>
					<view class="login-content__container-action__password">
						<u-checkbox v-model="checked">记住密码</u-checkbox>
					</view>
				</view>
			</view>
			<button
				class="login-content__container-button"
				@click="loginSubmit">
				登 录
			</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { login } from '@/api/index'
	import { setStorage } from '@/utils/auth'
	import useLoading from '@/compose/loading'
	import {
		ref,
		onBeforeMount,
		nextTick
	} from 'vue'
	const loading = useLoading(false)

	const spinning = ref(false)

	const passwordType = ref('text')

	const register = ref(false)

	const username = ref(undefined)
	const password = ref(undefined)

	const checked = ref(false)

	const changePasswordType = () => {
		if (passwordType.value === 'text') passwordType.value = 'password'
	}

	const loginSubmit = () => {
		const checkLoginInfo = (res: any) => {
			if (checked.value) {
				const userLoginInfo = {
					username: username.value,
					password: password.value,
					checked: checked.value
				}
				setStorage('userLoginInfo', userLoginInfo)
			} else {
				setStorage('userLoginInfo', '')
			}

			// 需替换
			setStorage('token', 'test-token')
		}
		if (username.value && password.value) {
			spinning.value = true
			login({
				username: username.value,
				password: password.value
			}).then(res => {
				spinning.value = false
				checkLoginInfo(res)

				uni.showToast({
					title: '登陆成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index'
					})
				}, 1000)
			}).catch(err => {
				spinning.value = false
				uni.showToast({
					title: err,
					icon: 'error'
				})
			})
		} else {
			uni.showToast({
				title: !username.value || username.value === '' ? '请填写用户名' : '请填写密码',
				icon: 'error'
			})
		}
	}

	onBeforeMount(() => {
		const userLoginInfo = uni.getStorageSync('userLoginInfo')
		if (userLoginInfo && userLoginInfo !== '') {
			username.value = userLoginInfo.username
			password.value = userLoginInfo.password
			changePasswordType()
			nextTick(() => {
				checked.value = userLoginInfo.checked
			})
		}
	})

</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
		position: relative;
	}
	.loading-popup {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2000;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
	}
	.login-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		//justify-content: center;
		height: 100vh;
		background-image: linear-gradient(0deg, #0ea1fe 0%, #125ee6 100%);
		&__icon {
			margin: 160rpx 80rpx 0;
			width: calc(100% - 160rpx);
			&-img {
				height: 100rpx;
				width: 100rpx;
			}
		}
		&__title {
			font-weight: 400;
			margin: 0 80rpx 80rpx;
			width: calc(100% - 160rpx);
			font-size: 64rpx;
			color: white;
		}
		&__container {
			width: 100%;
			padding: 80rpx 80rpx;
			border-radius: 16rpx;

			&-item {
				position: relative;
				height: 96rpx;
			}
			&-icon {
				position: absolute;
				left: 36rpx;
				line-height: 96rpx;
				height: 96rpx;
			}

			&-input {
				position: absolute;
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 50rpx;
				background: rgba(0, 0, 0, 0.05);
				font-size: 26rpx;
				padding-right: 40rpx !important;
				color: rgba(255, 255, 255, 0.95);
				::v-deep .input-placeholder {
					color: rgba(255, 255, 255, 0.6);
				}
				::v-deep .u-input__input {
					height: 60rpx;
					min-height: 60rpx !important;
					line-height: 60rpx;
					margin: 20rpx 0;
					padding-left: 80rpx;
					color: rgba(255, 255, 255, 0.95);
					::-ms-reveal{
						display: none;
					}
				}
			}
			.second {
				margin-top: 60rpx;
			}
			.third {
				margin-top: 20rpx;
			}
			&-action {
				// padding: 0 40rpx;
				line-height: 48rpx;
				display: flex;
				justify-content: space-between;
				&__register, &__password {
					color: rgba(255, 255, 255, .85);
					font-size: 26rpx;
				}
				&__password {
					flex: 1;
					text-align: right;
					::v-deep .u-checkbox__label {
						font-size: 26rpx;
						color: rgba(255, 255, 255, .85);
					}
				}
			}
			&-button {
				margin-top: 60rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-radius: 50rpx;
				background-image: linear-gradient(100deg, #0ea1fe 0%, #125ee6 100%);
				font-size: 30rpx;
				padding: 0 40rpx;
				color: rgba(255, 255, 255, 0.95);
			}
		}
	}
</style>
