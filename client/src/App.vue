<template>
    <div id="app">
		<navigation />
    	<keep-alive>
      		<router-view class="router" v-if="$route.meta.keepAlive">
        		<!-- 这里是会被缓存的视图组件-->
      		</router-view>
    	</keep-alive>
    	<router-view class="router" v-if="!$route.meta.keepAlive">
      		<!-- 这里是不被缓存的视图组件-->
    	</router-view>
  	</div>
</template>

<script>
	import navigation from './views/nav/nav.vue'
  	export default {
		name: 'App',
		components: {
			navigation
		}
  	}
</script>

<style lang="less">
  	#app {
		width: 100%;
		height: 100%;
		// font-size: 15px;
		.router{
			position: absolute;
			top: 200px;
			left: 0;
			right: 0;
			bottom: 0;
		}
  	}
</style>