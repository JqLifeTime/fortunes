<template>
	<div class="proDetail" 
		v-loading="loading"
		element-loading-text="拼命加载中"
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(255, 255, 255, .8)"
		style="width: 100%;height: 100vh;">
		<div class="banner">
			<el-carousel trigger="click">
				<el-carousel-item v-for="item in imglist" :key="item">
					<div><img :src="imgurl+item" alt=""></div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="pro-text pad20">
			<h3>{{products.name}}</h3>
			<h4><span>护宅物件</span>     库存：<span>{{stock}}件</span></h4>
			<p>简介：{{products.intro}}</p>
			<div class="price">
				<h5>￥{{price}} <s>￥{{products.price}}</s></h5>
			</div>
		</div>
		<div class="pro-detail pad20">
			<div class="pro-detail-nav">
				<div :class="detail == 0 ? 'pro-detail-active' : ''" @click="bindPro">产品详情</div>
				<div :class="detail == 1 ? 'pro-detail-active' : ''" @click="bindTuijian">产品推荐</div>
			</div>
			<div class="pro-detail-1" v-if="detail == 0"  v-html="products.content">
				
			</div>
			<div class="pro-detail-2" v-if="detail == 1">
				<proList :product="prolist"></proList>
			</div>
		</div>
		<div class="foot-btn">
			<div class="foot-btn-cart" @click="showshop">加入购物车</div>
			<div class="foot-btn-buy" @click="showshop">立即购买</div>
		</div>
		<div class="shopdask" v-if="isshow" @click="hideshop">
			<div class="shopdask-buy">
				<div class="shopdask-buy-top">
					<img :src="imgurl+products.photo_x" alt="">
					<div>
						<h3>{{products.name}}</h3>
						<p>库存：{{stock}}</p>
						<div><span>¥{{price}}</span><p><span @click.stop="jian">-</span>{{number}}<span @click.stop="jia">+</span></p></div>
					</div>
				</div>
				<div class="shopdask-buy-cen">
					<p v-for="(item,index) in products.proAttrList" :key="index" @click.stop="checkGG(item)" :class="guigeId == item.id ? 'guigeActive' : ''">{{item.name}}</p>
				</div>
				<div class="shopdask-buy-btm">
					<div class="shopdask-buy-btm-cart" @click.stop="addcart">加入购物车</div>
					<div class="shopdask-buy-btm-buy" @click.stop="buynow">立即购买</div>
				</div>
			</div>
		</div>
		<div class="goback" @click="goBack">
			<i class="iconfont icon-back"></i>
		</div>
	</div>
</template>

<script>
	import pro1 from 'assets/img/product.jpg'
	import proList from 'components/recommend'
	export default {
		data() {
			return{
				imgurl: this.globals.imgurl,
				imglist: [],
				proid: 0,
				detail: 0,   //产品详情，推荐切换
				products: '',   //产品详情
				number: 1,   //购买数量
				price: '', //单价
				stock: '', //库存
				guigeId: 0,  //规格id
				guigeName: '',  //规格name
				isshow: false,  //购买弹窗显示隐藏
				loading: true,
				userId: '',
				prolist: [],
			}
		},
		components:{
			proList
		},
		created() {
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			this.proid = this.$route.params.proId;
			this.axios.post(`${this.globals.url}api/goods/getGoodsDetails`,this.globals.qs.stringify({
					goodsId: this.proid
				}))
			.then((res) => {
				console.log(res);
				if(res.data.status == 1){
					let pro = res.data.proInfo;
					if(!pro.proAttrList){
						pro.proAttrList = [];
						pro.proAttrList[0] = {
							"id": "0",
							"pid": "",
							"name": "默认",
							"price": pro.price_yh,
							"stock": pro.num
						}
					}
					pro.content = pro.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					pro.content = pro.content.replace(/\<div/gi, '<div style="max-width:100%;height:auto" ');
					this.products = pro;
					this.price = pro.price_yh;
					this.stock = pro.num;
					this.imglist = pro.img_arr;
					this.checkGG(pro.proAttrList[0]);
					this.loading = false;
				}
				this.status = true;
			}).catch(function(error) {
				console.log(error);
			});
			// 产品详情推荐产品
			this.axios.post(`${this.globals.url}api/goods/goodsList`,this.globals.qs.stringify({
				is_hot: 1
			})).then((res) => {
				console.log(res);
				if(res.data.status == 1){
					if(res.data.data.root.length > 4){
						this.prolist = res.data.data.root.slice(0,4);
					}else{
						this.prolist = res.data.data.root
					}
				}
			}).catch(function(error) {
				console.log(error);
			});
			console.log(this.$route.params.proId);
		},
		methods:{
			// 选择规格
			checkGG(item){
				console.log(item);
				this.guigeId = item.id;
				this.price = item.price;
				this.stock = item.stock;
				this.guigeName = item.name;
			},
			// 隐藏购物弹窗
			hideshop(){
				this.isshow = false;
			},
			// 显示购物弹窗
			showshop(){
				if(this.userId){
					this.isshow = true;
				}else{
					this.$confirm('您还没有登录，请先登录', '温馨提示', {
						confirmButtonText: '去登录',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push({name: 'personal'});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消'
						});
					});
				}
			},
			// 切换商品详情,推荐
			bindPro(){
				this.detail = 0;
			},
			bindTuijian(){
				this.detail = 1;
			},
			// 减数量
			jian(){
				console.log('减')
				if(this.number != 1){
					this.number --;
				}
			},
			// 加数量
			jia(){
				console.log('加')
				if(this.number == this.products.num){
					return;
				}else{
					this.number ++;
				}
			},
			// 加入购物车,立即购买前重组数据
			resetData(){
				return {
					goodsId: this.products.id,
					goodsName: this.products.name,
					goodsNum: this.number,
					goodsPrice: this.price,
					goodsStock: this.stock,
					guigeId: this.guigeId,
					guigeName: this.guigeName,
					goodsImg: this.products.photo_x
				}
			},
			addcart(){
				let pros = this.resetData();
				let mycar = JSON.parse(localStorage.getItem("mycart")) || [];
				if(mycar.length != 0){
					let whetherSame = mycar.findIndex(item => item.goodsId == pros.goodsId && item.guigeId == pros.guigeId)
					console.log(whetherSame);
					if(whetherSame == -1){
						mycar.push(pros);
						localStorage.setItem('mycart',JSON.stringify(mycar));
						this.$message({
							type: 'success',
							message: '加入购物车成功!'
						});
						this.hideshop();
					}else{
						this.$message({
							type: 'warning',
							message: '购物车已存在该商品!'
						});
					}
				}else{
					mycar.push(pros);
					localStorage.setItem('mycart',JSON.stringify(mycar));
					this.$message({
						type: 'success',
						message: '加入购物车成功!'
					});
					this.hideshop();
				}
			},
			buynow(){
				let pros1 = [this.resetData()];
				localStorage.setItem('fromnow',JSON.stringify(pros1));
				this.$router.push({name: 'tijiaodingdan',params:{type: 2}})
			},
			goBack(){
				this.$router.go(-1); //返回上一层
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.goback{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: rgba(0,0,0,.5);
		color: white;
		text-align: center;
		line-height: 50px;
		font-size: 30px;
		position: fixed;
		top: 15px;
		left: 15px;
		z-index: 999;
		font-weight: 600;
	}
	.proDetail{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		background: #FEF9F5;
		padding-bottom: 100px;
	}
	.guigeActive{
		background: #850004 !important;
	}
	.shopdask{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		&-buy{
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			position: absolute;
			bottom: 0;
			left: 0;
			&-top{
				padding: 20px 20px 0 20px;
				display: flex;
				>img{
					margin-right: 15px;
					width: 150px;
					height: 150px;
				}
				>div{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					>h3{
						font-size: 24px;
						line-height: 38px;
					}
					>p{
						font-size: 24px;
						color: #999;
					}
					>div{
						display: flex;
						justify-content: space-between;
						align-items: center;
						>span{
							font-size: 30px;
							color: #ff0008;
						}
						>p{
							display: flex;
							align-items: center;
							font-size: 24px;
							>span{
								display: block;
								width: 40px;
								height: 40px;
								text-align: center;
								line-height: 35px;
								border: 1px solid #ccc;
								margin: 0 10px;
							}
						}
					}
				}
			}
			&-cen{
				padding: 8px 20px;
				display: flex;
				margin: 20px 0;
				>p{
					padding: 10px 12px;
					margin-right: 10px;
					background: #999;
					border-radius: 5px;
					color: white;
				}
			}
			&-btm{
				width: 100%;
				height: 80px;
				display: flex;
				>div{
					flex: 1;
					text-align: center;
					color: white;
					font-size: 26px;
					line-height: 80px;
				}
				&-cart{
					background: #ff0008;
				}
				&-buy{
					background: #000f81;
				}
			}
		}
	}
	.banner{
		width: 100%;
		height: 640px;
	}
	.banner img{
		width: 100%;
		height: 640px;
	}
	.pro-text{
		margin: 20px 0;
		>h3{
			font-size: 30px;
		}
		>h4{
			font-size: 24px;
			padding: 15px 0;
			>span{
				color: #850004;
			}
		}
		>p{
			font-size: 24px;
			color: #999;
		}
		.price{
			display: flex;
			justify-content: space-between;
			>h5{
				font-size: 32px;
				color: #FF0000;
				padding: 15px 0;
				>s{
					font-size: 24px;
					color: #999;
				}
			}
		}
	}
	.pro-detail{
		&-nav{
			display: flex;
			height: 60px;
			>div{
				flex: 1;
				text-align: center;
				line-height: 60px;
				font-size: 24px;
				color: #666;
				border-right: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				&:last-child{
					border-right: none;
				}
			}
		}
		.pro-detail-1,.pro-detail-2{
			padding: 15px 0;
			overflow: hidden;
			margin-bottom: 100px;
		}
	}
	.pro-detail-1 p{
		font-size: 24px !important;
		line-height: 40px !important;
	}
	.pro-detail-active{
		font-size: 26px !important;
		color: #FF0000 !important;
		border-bottom: 1px solid #FF0000 !important;
	}
	.foot-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80px;
		display: flex;
		>div{
			flex: 1;
			text-align: center;
			color: white;
			font-size: 26px;
			line-height: 80px;
		}
		&-cart{
			background: #ff0008;
		}
		&-buy{
			background: #000f81;
		}
	}
</style>
