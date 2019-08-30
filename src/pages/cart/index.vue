<template>
	<div class="cart">
		<c-header :title="title"></c-header>
		<div v-if="prolist.length != 0">
			<div class="catPro pad20">
				<h3>购物车</h3>
				<ul class="cart-pro">
					<li v-for="(item,index) in prolist" :key="index">
						<h6 class="ischeck" :class="item.flag == true ? 'checked' : ''" @click="check(index)">
							<img src="../../assets/img/active.png" alt="">
						</h6>
						<div class="cart-img">
							<img :src="imgurl+item.goodsImg" alt="">
						</div>
						<div class="cart-text">
							<p class="ellipse2">{{item.goodsName}}</p>
							<p style="color: #999;">数量：{{item.goodsNum}}&nbsp;&nbsp;&nbsp;&nbsp;规格：{{item.guigeName}}</p>
							<div>
								<p class="price">￥{{item.goodsPrice}}</p>
								<p><span class="reduct" :class="item.goodsNum <= 1 ? 'disabled' : ''" @click="reduce(index)">-</span> {{item.goodsNum}}
									<span @click="addNum(index)" class="add">+</span></p>
							</div>
						</div>
						<!-- <p @click="del(index)" style="cursor: pointer;">删除</p> -->
					</li>
				</ul>
			</div>
			<div class="cart-foot">
				<div class="foot-l">
					<h6 class="ischeck" :class="selectAll == true ? 'checked' : ''" @click="checkAll">
						<img src="../../assets/img/active.png" alt="">
					</h6>&nbsp;&nbsp;全选
					<p @click="dels" style="cursor: pointer;">删除选中商品</p>
				</div>
				<div class="foot-r">
					<p>总价：<span style="color: #ff0000;border: none;">￥{{totalMoney}}</span></p>
					<h6 @click="goBuy">去结算</h6>
				</div>
			</div>
		</div>
		<div class="null" v-else>
			<p>购物车是空的...</p>
			<h6>
				<router-link to="/kaiyunshangcheng">去购物</router-link>
			</h6>
		</div>
		<c-tabbar></c-tabbar>
	</div>
</template>

<script>
	import header from 'components/header'
	import tabbar from 'components/tabbar'
	export default {
		data() {
			return {
				totalMoney: 0,
				selectAll: false,
				title: '购物车',
				prolist: [],
				imgurl: this.globals.imgurl,
				userId: ''
			};
		},
		components:{
			'c-header':header,
			'c-tabbar': tabbar
		},
		mounted() {
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			let mycar = JSON.parse(localStorage.getItem("mycart"));
			console.log(mycar);
			if(mycar != null){
				mycar.map(item => {
					let temp = item;
					temp.flag = false;
					return temp;
				})
				this.prolist = mycar;
				console.log(this.prolist);
			}
			// localStorage.setItem("mycart", JSON.stringify(this.prolist));
		},
		methods: {
			goBuy(){
				let proTemp = this.prolist.filter(item => {
					return item.flag == true;
				})
				if(!this.userId){
					this.$confirm('您还没有登录，请先登录', '温馨提示', {
						confirmButtonText: '去登录',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push({name: 'personal'});
					}).catch(() => {
						
					});
					return;
				}
				if(proTemp.length != 0){
					localStorage.setItem('fromcart',JSON.stringify(proTemp));
					this.$router.push({name:'tijiaodingdan',params:{type: 1}})
				}else{
					this.$message({
						type: 'warning',
						message: '请选择要购买的商品!'
					});
				}
				
			},
			// 选中单个商品
			check(index) {
				console.log(index);
				this.prolist[index].flag = !this.prolist[index].flag;
				this.sub();
			},
			// 商品减
			reduce(index) {
				this.prolist[index].goodsNum = this.prolist[index].goodsNum*1-1;
				if (this.prolist[index].flag == true) {
					this.sub();
				}
			},
			// 商品加
			addNum(index) {
				this.prolist[index].goodsNum = this.prolist[index].goodsNum*1+1;
				if (this.prolist[index].flag == true) {
					this.sub();
				}
			},
			// 全选
			checkAll() {
				this.selectAll = !this.selectAll;
				console.log(this.selectAll);
				this.prolist.map(item => {
					item.flag = this.selectAll
					return item;
				})
				this.sub();
			},
			// 删除单个商品
			del(index) {
				this.$confirm('确定删除该商品?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.prolist.splice(index, 1);
					localStorage.setItem("mycart", JSON.stringify(this.prolist));
					this.sub();
				  this.$message({
					type: 'success',
					message: '删除成功!'
				  });
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			// 删除选中多件商品
			dels() {
				// 过滤出来未选中的数组,赋值给购物车列表，来实现删除功能
				let delslist = this.prolist.filter(item => {
					return item.flag == false
				});
				if (delslist.length == this.prolist.length) {
					this.$message({
						type: 'warning',
						message: '请选择要删除的商品!'
					});
					return false;
				}
				this.$confirm('确定删除选中商品?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.prolist = delslist;
					localStorage.setItem("mycart", JSON.stringify(this.prolist));
					this.sub();
				  this.$message({
					type: 'success',
					message: '删除成功!'
				  });
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			// 求和
			sub() {
				// 过滤出来为选中状态的产品数组
				let proTemp = this.prolist.filter(item => {
						return item.flag == true;
					}),
					total = 0;
				console.log(proTemp);
				// 求和
				for (let i = 0; i < proTemp.length; i++) {
					total += proTemp[i].goodsPrice * 1 * proTemp[i].goodsNum;
				}
				this.totalMoney = total.toFixed(2);
				// 判断购物车产品状态是否都为未选中,来决定全选按钮的选中状态
				let temp1 = this.prolist.findIndex(item => {
					return item.flag == false
				});
				if (temp1 == -1) {
					return this.selectAll = true;
				} else {
					return this.selectAll = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.null{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24px;
		padding: 40px 0;
		>h6{
			width: 250px;
			height: 70px;
			text-align: center;
			line-height: 70px;
			background: #FF0000;
			border-radius: 10px;
			margin: 15px 0;
			>a{
				color: white;
				font-size: 24px;
			}
		}
	}
	.cart{
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		background: #FEF9F5;
		padding-bottom: 100px;
	}
	.catPro{
		>h3{
			font-size: 30px;
			font-weight: 600;
			padding: 10px 0;
			text-align: center;
		}
	}
	.cart-pro {
		padding: 15px 0 80px 0;
	}
	
	.cart-pro li {
		display: flex;
		align-items: center;
		// border-bottom: 1px solid #ccc;
		padding: 20px 0;
		background: #fff;
		font-size: 24px;
		margin-bottom: 10px;
		border-radius: 10px;
	}
	
	.reduct,
	.add {
		display: inline-block;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #ccc;
		cursor: pointer;
		margin: 0 10px;
	}
	
	.cart-img {
		width: 160px;
		height: 160px;
		margin: 0 20px;
		border: 1px solid #ccc;
	}
	
	.cart-img img {
		width: 100%;
	}
	
	.cart-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-right: 15px;
		height: 160px;
	}
	
	.cart-text p {
		text-align: left;
	}
	
	.cart-text div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.price {
		color: #ff0000;
	}
	
	.disabled {
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
	}
	
	.ischeck {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 50%;
		font-size: 24px;
		color: white;
		cursor: pointer;
		margin-left: 25px;
		overflow: hidden;
	}
	
	.ischeck img {
		width: 100%;
		display: none;
	}
	
	.checked {
		background-color: #ff0000;
	}
	
	.checked img {
		width: 100%;
		display: block;
	}
	
	.cart-foot {
		font-size: 24px;
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 1px solid #ccc; /*no*/
		position: fixed;
		bottom: 85px;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.foot-l,
	.foot-r {
		display: flex;
		align-items: center;
		height: 100%;
	}
	
	.foot-l p {
		margin-left: 15px;
	}
	
	.foot-r h6 {
		padding: 0 15px;
		background: #FF0000;
		line-height: 80px;
		height: 100%;
		color: white;
		margin-left: 15px;
	}
</style>
