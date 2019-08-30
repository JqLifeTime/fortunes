<template>
	<div class="recommend pad20">
		<div class="recommend-title" v-show="title">
			<h3>风水摆件</h3><p><router-link to="/kaiyunshangcheng">查看更多>></router-link></p>
		</div>
		<div class="recommend-btm">
				<div class="recommend-btm-item" v-for="(item,index) in product" :key="index" v-if="product.length != 0">
					<router-link :to="{name:'productDetail', params: {proId:item.id}}">
						<div class="recommend-img">
							<img :src="imgurl+item.photo_x" alt="">
						</div>
						<h3 class="ellipse2">{{item.name}}</h3>
						<p>￥{{item.price_yh}}<span>平安挂件</span></p>
					</router-link>
				</div>
				<div class="nulls"  v-if="product.length == 0">
					暂无相关产品...
				</div>
				<!-- <div class="recommend-btm-item">
					<router-link :to="{name:'productDetail', params: {proId:2}}">
						<div class="recommend-img">
							<img src="../../assets/img/product.jpg" alt="">
						</div>
						<h3>招财风水六帝钱古铜钱币</h3>
						<p>￥16.60<span>平安挂件</span></p>
					</router-link>
				</div>
				<div class="recommend-btm-item">
					<router-link :to="{name:'productDetail', params: {proId:3}}">
						<div class="recommend-img">
							<img src="../../assets/img/product.jpg" alt="">
						</div>
						<h3>招财风水六帝钱古铜钱币</h3>
						<p>￥16.60<span>平安挂件</span></p>
					</router-link>
				</div>
				<div class="recommend-btm-item">
					<router-link :to="{name:'productDetail', params: {proId:4}}">
						<div class="recommend-img">
							<img src="../../assets/img/product.jpg" alt="">
						</div>
						<h3>招财风水六帝钱古铜钱币</h3>
						<p>￥16.60<span>平安挂件</span></p>
					</router-link>
				</div> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgurl: this.globals.imgurl
			}
		},
		props:{
			title: {
				type: Boolean,
				default: false
			},
			product: {
				type: [Array,Object],
				default: () => []
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.nulls{
		width: 100%;
		text-align: center;
		padding: 40px 0;
		font-size: 26px;
		margin: 0 auto;
	}
	.recommend{
		&-title{
			width: 100%;
			height: 50px;
			background-color: #ebebeb;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24px;
			margin-bottom: 30px;
			>h3{
				width: 120px;
				height: 50px;
				background: #850004;
				text-align: center;
				line-height: 50px;
				color: white;
			}
			>p{
				padding-right: 15px;
			}
		}
		&-btm{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			&-item{
				width: 48%;
				margin-bottom: 20px;
				>a{
					.recommend-img{
						width: 100%;
						>img{
							width: 100%;
							height: 100%;
						}
					}
					>h3{
						font-size: 24px;
						font-weight: normal;
						color: #000000;
						margin: 15px 0 8px 0;
					}
					>p{
						font-size: 30px;
						font-style: italic;
						color: #ff0008;
						>span{
							font-size: 20px;
							color: #666666;
						}
					}
				}
			}
		}
	}
</style>
