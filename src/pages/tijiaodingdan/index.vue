<template>
	<div class="orderSubmit positionA">
		<c-header :title="title"></c-header>
		<div class="submitOrder">
			<div class="order-address" style="margin-top: 0px;">
				<router-link to="/dizhiguanli" class="address-checked" v-if="addressStatus == 1">
					<p><span>姓名：{{address.userName}}</span><span>手机号：{{address.userPhone}}</span></p>
					<h6>地址：{{address.address + address.address_xq}}</h6>
				</router-link>
				<router-link to="/dizhiguanli" class="address-add arrow" v-else>
					<p><span>+</span>添加收货地址</p>
				</router-link>
			</div>
			<div class="submit-pro">
				<ul>
					<li v-for="(item,index) in prolist" :key="index">
						<img :src="imgurl+item.goodsImg">
						<div class="list1-xq-text">
							<h3 class="ellipsis2">{{item.goodsName}}</h3>
							<h4>数量：{{item.goodsNum}}&nbsp;&nbsp;&nbsp;&nbsp;规格：{{item.guigeName}}</h4>
							<p>￥{{item.goodsPrice}}</p>
						</div>
					</li>
				</ul>
			</div>
			<div class="freight" v-if="orderdetail.deliverMoney != 0">
				快递费用<span>¥{{orderdetail.deliverMoney}}</span>
			</div>
			<div class="beizhu">
				<p>商品备注（选填）</p>
				<textarea placeholder="请输入你的备注信息，谢谢合作" placeholder-color="#999" v-model="remark"></textarea>
			</div>
			<div class="submits">
				<p>∑合计：<span>￥{{totalMoney}}</span></p>
				<h6 @click="submitOrder">提交订单</h6>
			</div>
			<div class="dask" v-if="ewmdask">
				<img :src="ewm.code" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '提交订单',
				addressStatus: 0, //有无默认地址
				address: '', //地址详情
				prolist: null, //订单商品列表
				imgurl: this.globals.imgurl,
				totalMoney: 0, //总价
				orderdetail: '', //下单详情
				remark: '', //订单备注
				ewmdask: false, //二维码弹窗
				ewm: '', //二维码
				type: '', //从购物车购买，还是直接购买
				userId: ''
			}
		},
		mounted() {
			console.log(this.$route.params.type);
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			let type = this.$route.params.type || this.globals.buytype;
			console.log('type值为：'+type);
			if (type == 2) {
				this.globals.buytype = 2;
				let buynow = JSON.parse(localStorage.getItem('fromnow'));
				this.prolist = buynow;
			} else if (type == 1){
				this.globals.buytype = 1;
				let buycart = JSON.parse(localStorage.getItem('fromcart'));
				this.prolist = buycart;
			}else{
				this.$confirm('您有未支付订单，需要支付吗？', '温馨提示', {
					confirmButtonText: '去支付',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({name: 'dingdanzhongxin'});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});
				});
			}
			let formdata = this.prolist.map(item => {
				let temp = {
					goodsId: item.goodsId,
					num: item.goodsNum,
					goodsAttrId: item.guigeId
				}
				return temp;
			})
			console.log(formdata);
			// 生成订单，获取订单信息
			this.axios.post(`${this.globals.url}api/Payment/submitGoodsOrder`, this.globals.qs.stringify({
					goods: JSON.stringify(formdata),
					userId: this.userId
				}))
				.then((response) => {
					console.log(response);
					this.orderdetail = response.data.data;
					this.totalMoney = response.data.data.totalMoney;
					if (response.data.data.deliverMoney != 0) {
						this.totalMoney += response.data.data.deliverMoney * 1
					}
					let temp = localStorage.getItem('address');
					// 如果有缓存的话就用缓存里面地址，如果没有调用接口默认地址
					// 下订单之后获取返回的地址信息
					if (response.data.data.memberInfo == null) {
						this.addressStatus = 0;
					} else if (temp) {
						this.addressStatus = 1;
						this.address = JSON.parse(temp);
					} else {
						this.addressStatus = 1;
						this.address = response.data.data.memberInfo;
					}
				}).catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			submitOrder() {
				var that = this;
				console.log(this.orderdetail);
				console.log(this.address);
				this.axios.post(`${this.globals.url}api/Payment/unifiedorder`, this.globals.qs.stringify({
						orderId: this.orderdetail.orderId,
						userName: this.address.userName,
						voucherId: 0,
						reduceMoney: 0,
						userPhone: this.address.userPhone,
						address: this.address.address_s + this.address.address_xq,
						deliverMoney: this.orderdetail.deliverMoney,
						totalMoney: this.orderdetail.totalMoney,
						orderRemarks: this.remark,
						orderType: 2
					}))
					.then((response) => {
						console.log(response);
						let orderNo = response.data.data.orderNo
						if (response.data.status == 1) {
							if (this.globals.buytype == 1) {
								let shops = JSON.parse(localStorage.getItem('mycart')),
									goods = this.prolist;
								console.log(shops);
								console.log(goods);
								for (var i = 0; i < shops.length; i++) {
									for (var k = 0; k < goods.length; k++) {
										if (shops[i].goodsId == goods[k].goodsId && shops[i].guigeId == goods[k].guigeId) {
											shops.splice(i, 1);
										}
									}
								}
								localStorage.setItem('mycart', JSON.stringify(shops))
							}
							this.axios.post(`${this.globals.url}api/AlipayWap/PcPayment`,this.globals.qs.stringify({
								ordersn: orderNo,
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
							// this.ewmdask = true;
							// this.ewm = response.data.data;
							// that.$message({
							// 	type: 'success',
							// 	message: '请在五分钟内完成订单!'
							// });
						}
					}).catch(function(error) {
						console.log(error);
					});

				// let timer = setInterval(function() {
				// 	console.log(that.ewm);
				// 	console.log('支付状态');
				// 	if (that.ewmdask) {
				// 		that.axios.post(`${that.globals.url}api/Payment/orderQuery`, that.globals.qs.stringify({
				// 			orderNo: that.ewm.orderNo
				// 		})).then((response) => {
				// 			console.log(response);
				// 			console.log(timer);
				// 			if (response.data.data == 'PAY') {
				// 				clearInterval(timer);
				// 				this.$router.push({
				// 					name: 'dingdanzhongxin'
				// 				})
				// 			}
				// 		}).catch(function(error) {
				// 			console.log(error);
				// 			clearInterval(timer)
				// 		});
				// 	}
				// }, 1500);
				// setTimeout(function() {
				// 	clearInterval(timer);
				// }, 300000)
			},

		},
		components: {
			'c-header': header
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.dask {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .5);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;

		>img {
			width: 60%;
		}
	}

	.submitOrder {
		padding: 20px;
	}

	.order-address {
		padding: 20px;
		background: #fff;
		font-size: 24px;
		color: #333;
		margin: 20px 0;
	}

	.order-address a {
		color: #333;
	}

	.order-address p {
		display: flex;
		justify-content: space-between;
	}

	.order-address h6 {
		font-size: 24px;
		font-weight: normal;
		color: #646466;
		margin-top: 20px;
	}

	.address-add {
		font-size: 26px;
		color: #333333;
	}

	.address-add p {
		display: flex;
		align-items: center;
		line-height: 1;
	}

	.address-add span {
		display: block;
		width: 32px;
		height: 32px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #fe6306;
		border-radius: 50%;
		color: #fe6306;
		margin-right: 10px;
	}

	.submit-pro ul li {
		margin-bottom: 20px;
		display: flex;
	}

	.submit-pro ul li:last-child {
		margin-bottom: 0;
	}

	.submit-pro ul li img {
		width: 160px;
		height: 160px;
		margin-right: 20px;
	}

	.submit-pro {
		padding: 20px;
		background: #fff;
	}

	.list1-xq-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list1-xq-text h3 {
		font-size: 24px;
		line-height: 36px;
		color: #333333;
		font-weight: normal;
	}

	.list1-xq-text h4 {
		font-size: 24px;
		font-weight: normal;
		color: #999999;
	}

	.list1-xq-text p {
		font-size: 30px;
		color: #df273f;
	}

	.freight {
		display: flex;
		height: 80px;
		align-items: center;
		justify-content: space-between;
		font-size: 28px;
		color: #333333;
		background: #fff;
		padding: 0 20px;
		margin-top: 20px;
	}

	.freight span {
		color: #ff0000;
	}

	.beizhu {
		padding: 20px;
		font-size: 28px;
		color: #666666;
		background: #fff;
		margin: 20px 0;
	}

	.beizhu textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 11px 18px;
		background-color: #f2f2f5;
		height: 120px;
		resize: none;
		margin-top: 20px;
		border: 1px solid #ccc;
	}

	.submits {
		height: 80px;
		background: #fff;
		padding-left: 20px;
		font-size: 24px;
		color: #999999;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.submits p span {
		font-size: 26px;
		color: #ff0000;
	}

	.submits h6 {
		width: 200px;
		height: 80px;
		background-color: #fa610e;
		color: white;
		text-align: center;
		line-height: 80px;
		font-size: 28px;
		font-weight: normal;
	}
</style>
