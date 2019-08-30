<template>
	<div class="nav">
		<ul class="nav-ul">
			<li class="nav-li" v-for="(item,index) in items" @click="switchTab(item.id)" :class="{'nav-li-active': item.id === curId}">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>
	import {categoryNames} from './config.js'
	export default {
		data() {
			return {
				curId: 0,
				items: ''
			}
		},
		created() {
			this.axios.post(`${this.globals.url}api/goods/goodsCat`)
			.then((response) => {
				console.log(response);
				this.items = response.data.data;
				console.log(this.items);
				this.switchTab(response.data.data[0].id);
			}).catch(function(error) {
				console.log(error);
			});
			
		},
		methods:{
			switchTab(id){
				if(this.curId === id){
					return;
				}
				console.log('执行tab');
				this.curId = id;
				console.log(this.curId);
				this.$emit('switch-tab', id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.navscroll{
		// background: #fff;
		height: 100%;
		overflow: hidden;
	}
	.nav-li{
		width: 130px;
		height: 70px;
		line-height: 70px;
		text-align: center;
		border-bottom: 1px solid #ccc;
		background: #fff;
		font-weight: 700;
	}
	.nav-li-active{
		border-bottom: none;
		background: #850004;
		color: #fff;
	}
</style>
