<template>
	<div class="shops">
		<c-header :title="title"></c-header>
		<div class="shops1">
			<div class="shops1-left">
				<navs @switch-tab="proTap"></navs>
			</div>
			<div class="shops1-right">
				<proList :product="productList"></proList>
			</div>
		</div>
		<div class="tab">
			<c-tabbar></c-tabbar>
		</div>
	</div>
</template>

<script>
	import tabbar from 'components/tabbar'
	import header from 'components/header'
	import navs from './nav'
	import proList from 'components/recommend'
	export default {
		data(){
			return{
				title: '开运商城',
				curId: 0,
				p: 1,
				productList: [],
				isMore: true,
			}
		},
		components:{
			'c-header': header,
			'c-tabbar': tabbar,
			'navs': navs,
			'proList': proList
		},
		methods:{
			proTap(id){
				this.curId = id;
				this.p = 1;
				this.productList = [];
				this.getProduct(id);
			},
			getProduct(id){
				this.axios.post(`${this.globals.url}api/goods/goodsList`,this.globals.qs.stringify({
						cid: id,
						p: this.p
					}))
				.then((response) => {
					console.log(response)
					this.status = 1;
					if(response.data.status == 1){
						let prolist = response.data.data;
						this.productList = this.productList.concat(prolist.root);
						console.log(this.productList);
						if(prolist.totalPage > this.p){
							this.p++;
						}else{
							this.isMore = false;
						}
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foot{
		padding-bottom: 50px;
	}
	.shops{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		background: #FEF9F5;
		padding-bottom: 100px;
	}
	.shops1{
		margin-top: 40px;
		display: flex;
		&-left{
			
		}
		&-right{
			flex: 1;
		}
	}
	
</style>
