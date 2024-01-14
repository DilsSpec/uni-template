<script setup lang="ts">
	import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
	onLaunch(() => {
	  // if (uni.getSystemInfoSync().platform === 'android') {
	  //   // 注册安卓原生事件监听器
	  //   uni.$on('appKeyInput', function(e) {
	  //     console.log('全局键盘输入：', e);
	  //     // 在这里可以处理全局键盘输入事件
	  //   });
	  // }
	});
	onShow(() => {
	    console.log("App Show");
	});
	onHide(() => {
		console.log("App Hide");
	});
</script>
<style lang="scss">
	@import "@/uni_modules/vk-uview-ui/index.scss";
</style>
