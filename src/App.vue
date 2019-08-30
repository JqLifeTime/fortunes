<template>
	<div id="app">
		<div class="g-header">
			<router-view v-if="isRouterAlive"></router-view>
		</div>
		<!-- 底部 -->
		<c-foot></c-foot>
		<!-- 底部 -->
	</div>
</template>

<script>
	import tabbar from 'components/tabbar'
	import foot from 'components/foot'
	export default {
		name: 'App',
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		components: {
			'c-tabbar': tabbar,
			'c-foot': foot
		}
	}
</script>

<style>
	body,
	html {
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.g-foot {
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
