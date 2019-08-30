<template>
	<div class="g-tabbar">
		<div class="g-tabbar-item" @click="goHome">
			<i class="iconfont icon-home"></i>
			<span>首页</span>
		</div>
		<router-link class="g-tabbar-item" to="/kaiyunshangcheng">
			<i class="iconfont icon-category"></i>
			<span>开运商城</span>
		</router-link>
		<router-link class="g-tabbar-item" to="/cart">
			<i class="iconfont icon-cart"></i>
			<span>购物车</span>
		</router-link>
		<router-link class="g-tabbar-item" to="/personal">
			<i class="iconfont icon-personal"></i>
			<span>个人中心</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'Ctabbar',
		data() {
			return {
				
			};
		},
		methods:{
			goHome(){
				this.$router.push({name:'home'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.g-tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.router-link-active{
		color: #de181b;
	}
</style>
