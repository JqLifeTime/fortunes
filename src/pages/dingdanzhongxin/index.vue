<template>
	<div class="orderCen positionA">
		<c-header :title="title"></c-header>
		<div class="title">订单中心</div>
		<div class="orderc1 pad20">
			<div class="orderc1-cen">
				<div class="orderc1-cen-nav">
					<ul>
						<li data-index='0' data-status='' @click="bindNav(0,null)" :class="tabIndex == 0 ? 'active-li' : ''">全部</li>
						<li data-index='1' data-status='0' @click="bindNav(1,0)" :class="tabIndex == 1 ? 'active-li' : ''">待付款</li>
						<li data-index='2' data-status='10' @click="bindNav(2,10)" :class="tabIndex == 2 ? 'active-li' : ''">待发货</li>
						<li data-index='3' data-status='20' @click="bindNav(3,20)" :class="tabIndex == 3 ? 'active-li' : ''">待签收</li>
						<li data-index='4' data-status='30' @click="bindNav(4,30)" :class="tabIndex == 4 ? 'active-li' : ''">已完成</li>
					</ul>
				</div>
				<!-- 全部订单 -->
				<div class="orders" v-if="tabIndex == 0">
					<div class="orders-item1" v-for="(item,index) in orderList" :key="index">
						<div class="orders-item1-title">
							<h3>订单编号：{{item.orderNo}}</h3>
							<p v-if="item.orderStatus == 0">待付款</p>
							<p v-if="item.orderStatus == 10">待发货</p>
							<p v-if="item.orderStatus == 20">待签收</p>
							<p v-if="item.orderStatus == 30">已完成</p>
						</div>
						<div class="orders-item1-cen">
							<div @click="goDetail(item.orderId)">
								<div class="orders-cen1" v-for="(i,ind) in item.goodsList" :key="ind">
									<img :src="imgurl+i.goodsThumbs">
									<div class="orders-cen1-text">
										<h3 class="ellipse2">{{i.goodsName}}</h3>
										<h4>数量：{{i.goodsNums}}件&nbsp;&nbsp;&nbsp;&nbsp;规格：{{i.goodsAttrName == null ? '默认':i.goodsAttrName}}</h4>
										<h5>¥{{i.realPrice}}</h5>
									</div>
								</div>
							</div>
						</div>
						<div class="orders-item1-btm">
							<p>∑合计：<span>¥{{item.totalMoney}}</span></p>
							<div v-if="item.orderStatus == 0">
								<h6 @click="quxiao(item.orderId)">取消订单</h6>
								<h6 @click="goOn(item.orderId)">继续付款</h6>
							</div>
							<div v-if="item.orderStatus == 10">
								<h6 @click="goDetail(item.orderId)">查看订单</h6>
							</div>
							<div v-if="item.orderStatus == 20">
								<h6 @click="sureGet(item.orderId)">确认收货</h6>
							</div>
							<div v-if="item.orderStatus == 30">
								<h6 @click="orderDel(item.orderId)">删除订单</h6>
							</div>
						</div>
					</div>
					<div class="ifypage" v-if="orderList.length != 0">
						<div class="prev" @click="bindPrev">上一页</div>
						{{page}}/{{totalPage}}
						<div class="next" @click="bindNext">下一页</div>
					</div>
					<div class="null"  v-else>
						暂无更多订单数据~~~
					</div>
				</div>
				<!-- 全部订单 -->
				<!-- 代付款 -->
				<div class="orders" v-if="tabIndex == 1">
					<div class="orders-item1" v-for="(item,index) in orderList" :key="index">
						<div class="orders-item1-title">
							<h3>订单编号：{{item.orderNo}}</h3>
							<p>待付款</p>
						</div>
						<div class="orders-item1-cen">
							<div @click="goDetail(item.orderId)">
								<div class="orders-cen1" v-for="(i,ind) in item.goodsList" :key="ind">
									<img :src="imgurl+i.goodsThumbs">
									<div class="orders-cen1-text">
										<h3 class="ellipse2">{{i.goodsName}}</h3>
										<h4>数量：{{i.goodsNums}}件&nbsp;&nbsp;&nbsp;&nbsp;规格：{{i.goodsAttrName == null ? '默认':i.goodsAttrName}}</h4>
										<h5>¥{{i.realPrice}}</h5>
									</div>
								</div>
							</div>
						</div>
						<div class="orders-item1-btm">
							<p>∑合计：<span>¥{{item.totalMoney}}</span></p>
							<div>
								<h6 @click="quxiao(item.orderId)">取消订单</h6>
								<h6>继续付款</h6>
							</div>
						</div>
					</div>
					<div class="ifypage" v-if="orderList.length != 0">
						<div class="prev" @click="bindPrev">上一页</div>
						{{page}}/{{totalPage}}
						<div class="next" @click="bindNext">下一页</div>
					</div>
					<div class="null"  v-else>
						暂无更多订单数据~~~
					</div>
				</div>
				<!-- 代付款 -->
				<!-- 代发货 -->
				<div class="orders" v-if="tabIndex == 2">
					<div class="orders-item1" v-for="(item,index) in orderList" :key="index">
						<div class="orders-item1-title">
							<h3>订单编号：{{item.orderNo}}</h3>
							<p>待发货</p>
						</div>
						<div class="orders-item1-cen">
							<div @click="goDetail(item.orderId)">
								<div class="orders-cen1" v-for="(i,ind) in item.goodsList" :key="ind">
									<img :src="imgurl+i.goodsThumbs">
									<div class="orders-cen1-text">
										<h3 class="ellipse2">{{i.goodsName}}</h3>
										<h4>数量：{{i.goodsNums}}件&nbsp;&nbsp;&nbsp;&nbsp;规格：{{i.goodsAttrName == null ? '默认':i.goodsAttrName}}</h4>
										<h5>¥{{i.realPrice}}</h5>
									</div>
								</div>
							</div>
						</div>
						<div class="orders-item1-btm">
							<p>∑合计：<span>¥{{item.totalMoney}}</span></p>
							<div>
								<h6 @click="goDetail(item.orderId)">查看订单</h6>
							</div>
						</div>
					</div>
					<div class="ifypage" v-if="orderList.length != 0">
						<div class="prev" @click="bindPrev">上一页</div>
						{{page}}/{{totalPage}}
						<div class="next" @click="bindNext">下一页</div>
					</div>
					<div class="null"  v-else>
						暂无更多订单数据~~~
					</div>
				</div>
				<!-- 代发货 -->
				<!-- 配送中 -->
				<div class="orders" v-if="tabIndex == 3">
					<div class="orders-item1" v-for="(item,index) in orderList" :key="index">
						<div class="orders-item1-title">
							<h3>订单编号：{{item.orderNo}}</h3>
							<p>待签收</p>
						</div>
						<div class="orders-item1-cen">
							<div @click="goDetail(item.orderId)">
								<div class="orders-cen1" v-for="(i,ind) in item.goodsList" :key="ind">
									<img :src="imgurl+i.goodsThumbs">
									<div class="orders-cen1-text">
										<h3 class="ellipse2">{{i.goodsName}}</h3>
										<h4>数量：{{i.goodsNums}}件&nbsp;&nbsp;&nbsp;&nbsp;规格：{{i.goodsAttrName == null ? '默认':i.goodsAttrName}}</h4>
										<h5>¥{{i.realPrice}}</h5>
									</div>
								</div>
							</div>
						</div>
						<div class="orders-item1-btm">
							<p>∑合计：<span>¥{{item.totalMoney}}</span></p>
							<div>
								<h6 @click="sureGet(item.orderId)">确认收货</h6>
							</div>
						</div>
					</div>
					<div class="ifypage" v-if="orderList.length != 0">
						<div class="prev" @click="bindPrev">上一页</div>
						{{page}}/{{totalPage}}
						<div class="next" @click="bindNext">下一页</div>
					</div>
					<div class="null"  v-else>
						暂无更多订单数据~~~
					</div>
				</div>
				<!-- 配送中 -->
				<!-- 已完成 -->
				<div class="orders" v-if="tabIndex == 4">
					<div class="orders-item1" v-for="(item,index) in orderList" :key="index">
						<div class="orders-item1-title">
							<h3>订单编号：{{item.orderNo}}</h3>
							<p>已完成</p>
						</div>
						<div class="orders-item1-cen">
							<div @click="goDetail(item.orderId)">
								<div class="orders-cen1" v-for="(i,ind) in item.goodsList" :key="ind">
									<img :src="imgurl+i.goodsThumbs">
									<div class="orders-cen1-text">
										<h3 class="ellipse2">{{i.goodsName}}</h3>
										<h4>数量：{{i.goodsNums}}件&nbsp;&nbsp;&nbsp;&nbsp;规格：{{i.goodsAttrName == null ? '默认':i.goodsAttrName}}</h4>
										<h5>¥{{i.realPrice}}</h5>
									</div>
								</div>
							</div>
						</div>
						<div class="orders-item1-btm">
							<p>∑合计：<span>¥{{item.totalMoney}}</span></p>
							<div>
								<h6 @click="orderDel(item.orderId)">删除订单</h6>
							</div>
						</div>
					</div>
					<div class="ifypage" v-if="orderList.length != 0">
						<div class="prev" @click="bindPrev">上一页</div>
						{{page}}/{{totalPage}}
						<div class="next" @click="bindNext">下一页</div>
					</div>
					<div class="null"  v-else>
						暂无更多订单数据~~~
					</div>
				</div>
				<!-- 已完成 -->
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		inject:['reload'],
		data() {
			return{
				tabIndex: 0,
				title: '订单中心',
				page: 1,
				orderList: [],
				ismore: true,
				status: '',
				totalPage: 1,
				imgurl: this.globals.imgurl,
				userId: ''
			}
		},
		components:{
			'c-header':header
		},
		mounted() {
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			this.bindNav(0,null);
		},
		methods:{
			// 切换tab
			bindNav(e,status){
				console.log(e,status);
				if(status != null){
					this.status = status;
				}else{
					this.status = '';
				}
				console.log(this.status);
				this.tabIndex = e;
				this.page = 1;
				this.orderList = [];
				this.ismore = true;
				this.getOrderList(status);
			},
			// 获取订单列表
			getOrderList(status){
				this.axios.post(`${this.globals.url}api/Order/orderList`,this.globals.qs.stringify({
						userId: this.userId,
						status: status,
						page: this.page
				})).then((res) => {
					console.log(res);
					this.totalPage = res.data.totalPage;
					if(res.data.root.length != 0){
						this.orderList = res.data.root;
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 上一页
			bindPrev(){
				let stu = this.status;
				console.log('当前状态为'+stu)
				if(this.page != 1){
					this.page --;
					this.getOrderList(stu);
				}
			},
			// 下一页
			bindNext(){
				let stu = this.status;
				console.log('当前状态为'+stu)
				if(this.page < this.totalPage){
					this.page ++;
					this.getOrderList(stu);
				}
			},
			// 取消订单
			quxiao(id){
				this.$confirm('您确定取消该订单吗?', '温馨提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.axios.post(`${this.globals.url}api/Payment/orderClose`,this.globals.qs.stringify({
							userId: this.userId,
							orderId: id
					})).then((res) => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '取消成功!'
						});
						this.reload();
					}).catch(function(error) {
						console.log(error);
					});
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '取消操作'
				  });          
				});
			},
			// 删除已完成订单
			orderDel(id){
				this.$confirm('您确定删除该订单吗?', '温馨提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.axios.post(`${this.globals.url}api/Order/orderDel`,this.globals.qs.stringify({
							userId: this.userId,
							orderId: id
					})).then((res) => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.reload();
					}).catch(function(error) {
						console.log(error);
					});
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '取消操作'
				  });
				});
			},
			// 确认收货
			sureGet(id){
				this.$confirm('您确定已收到货吗?', '温馨提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {
					this.axios.post(`${this.globals.url}api/Order/orderConf`,this.globals.qs.stringify({
							userId: this.userId,
							orderId: id
					})).then((res) => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '收货成功!'
						});
						this.reload();
					}).catch((error) => {
						console.log(error);
					});
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '取消操作'
				  });
				});
			},
			goOn(id){
				this.axios.post(`${this.globals.url}api/Payment/payAgain`,this.globals.qs.stringify({
						userId: this.userId,
						orderId: id
				})).then((res) => {
					console.log(res);
					this.axios.post(`${this.globals.url}api/AlipayWap/PcPayment`,this.globals.qs.stringify({
						ordersn: res.data.data.orderNo,
						body: 'orders'
					}))
					.then((response) => {
						console.log(response)
						const div = document.createElement('div')
						div.innerHTML = response.data //此处form就是后台返回接收到的数据
						document.body.appendChild(div)
						document.forms[0].submit()
						// setTimeout(() => {
						// 	document.body.removeChild(div)
						// },1000);
					}).catch(function(error) {
						console.log('支付失败！');
						console.log(error);
					});
					// this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 跳转详情页
			goDetail(id){
				this.$router.push({name:'dingdanxiangqing',params:{orderId: id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.null{
		width: 100%;
		text-align: center;
		padding: 40px 0;
		font-size: 24px;
	}
	.ifypage{
		display: flex;
		font-size: 24px;
		align-items: center;
		justify-content: center;
		margin-top: 20px;
		.prev,.next{
			width: 120px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-radius: 5px;
			background: #850004;
			color: white;
			font-size: 24px;
			margin: 0 10px;
		}
	}
	.orderc1{
		&-cen{
			border: 1px solid #ccc; /*no*/
			box-sizing: border-box;
			padding: 15px;
			&-nav{
				display: flex;
				justify-content: space-between;
				>ul{
					width: 100%;
					display: flex;
					>li{
						flex: 1;
						border: 2px solid rgba(0,0,0,0); /*no*/
						font-size: 24px;
						text-align: center;
						padding-bottom: 15px;
					}
				}
			}
		}
	}
	.orders-item1{
		background: #fff;
		padding: 0 15px;
		margin-bottom: 20px;
		&:last-child{
			margin-bottom: 0px;
		}
		&-title{
			display: flex;
			font-size: 24px;
			justify-content: space-between;
			padding: 15px 0;
			border-bottom: 1px solid #ccc; /*no*/
			>p{
				color: #850004;
			}
		}
		&-cen{
			padding: 20px 0;
			border-bottom: 1px solid #ccc; /*no*/
			.orders-cen1{
				display: flex;
				margin-bottom: 20px;
				&:last-child{
					margin-bottom: 0px;
				}
				>img{
					width: 160px;
					height: 160px;
					margin-right: 15px;
				}
				&-text{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					>h3{
						font-size: 24px;
					}
					>h4{
						font-size: 22px;
						color: #666;
					}
					>h5{
						font-size: 26px;
						color: #ff0000;
					}
				}
			}
		}
		&-btm{
			padding: 15px 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 24px;
			>p{
				color: #666;
				>span{
					color: #ff0000
				}
			}
			>div{
				display: flex;
				>h6{
					width: 120px;
					height: 50px;
					border: 1px solid #666;
					color: #666;
					border-radius: 25px;
					text-align: center;
					line-height: 50px;
					margin-left: 15px;
					font-size: 22px;
					&:nth-child(2){
						border: 1px solid #ff0000;
						color: #ff0000;
					}
					
				}
			}
		}
	}
	.active-li{
		border-bottom: 2px solid #850004 !important; /*no*/
		color: #850004 !important; /*no*/
	}
</style>
