<template>
	<div class="xiangqing positionA">
		<c-header :title="title"></c-header>
		<div class="xq1">
			<div class="orders-xq">
            <div class="order-status">
              当前订单状态：<span v-if="detail.orderStatus == 0">待付款</span>
			  <span v-if="detail.orderStatus == 10">待发货</span>
			  <span v-if="detail.orderStatus == 20">待签收</span>
			  <span v-if="detail.orderStatus == 30">已完成</span>
            </div>
            <div class="order-address">
              <p><span>姓名：{{detail.userName}}</span><span>手机号：{{detail.userPhone}}</span></p>
              <h6>地址：{{detail.userAddress}}</h6>
            </div>
            <div class="list1-xq">
              <ul>
                <li v-for="(item,index) in detail.goodsList" :key="index">
                  <img :src="imgurl+item.goodsThumbs">
                  <div class="list1-xq-text">
                    <h3 class="ellipsis2">{{item.goodsName}}</h3>
                    <h4>数量：{{item.goodsNums}}&nbsp;&nbsp;&nbsp;&nbsp;规格：{{item.goodsAttrName ? item.goodsAttrName : '默认'}}</h4>
                    <p>￥{{item.realPrice}}</p>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 订单底部 -->
            <div class="list1-xq-foot">
              <p>∑共计{{nums}}件商品  合计：<span>¥{{detail.totalMoney}}</span></p>
            </div>
            <!-- 订单底部 -->
            <div class="orders-beizhu">
            	<p><span>订单编号：</span>{{detail.orderNo}}</p>
            	<p><span>下单时间：</span>{{detail.createTime}}</p>
            	<p><span>我的备注：</span>{{detail.orderRemarks}}</p>
            </div>
            <!-- <div class="order-btn" v-if="detail.orderStatus == 0">
            	<h6>取消订单</h6>
            	<h6>继续付款</h6>
            </div>
			<div class="order-btn" v-if="detail.orderStatus == 10">
				<h6>取消订单</h6>
			</div>
			<div class="order-btn" v-if="detail.orderStatus == 20">
				<h6>确认收货</h6>
			</div>
			<div class="order-btn" v-if="detail.orderStatus == 30">
				<h6>删除订单</h6>
			</div> -->
          </div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '订单详情',
				detail: '',
				imgurl: this.globals.imgurl,
				nums: 0,
				userId: ''
			}
		},
		mounted() {
			console.log(this.$route.params.orderId);
			let orderid = this.$route.params.orderId;
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			this.axios.post(`${this.globals.url}api/Order/orderList`,this.globals.qs.stringify({
					userId: this.userId,
					orderId: orderid
			})).then((res) => {
				console.log(res);
				this.detail = res.data.root[0];
				this.nums = res.data.root[0].goodsList.length
			}).catch(function(error) {
				console.log(error);
			});
		},
		components: {
			'c-header': header
		}
	}
</script>

<style lang="scss" scoped>
	
	.orders-xq {
		padding: 20px;
	}

	.order-status {
		padding: 0 20px;
		height: 80px;
		line-height: 80px;
		font-size: 24px;
		color: #333333;
		background: #fff;
	}

	.order-status span {
		font-size: 30px;
		color: #ff0000;
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

	.list1-xq {
		border-bottom: 1px solid #ccc;
		background: #fff;
		padding: 20px;
	}

	.list1-xq ul li,
	.submit-pro ul li {
		margin-bottom: 20px;
		display: flex;
	}

	.list1-xq ul li:last-child,
	.submit-pro ul li:last-child {
		margin-bottom: 0;
	}

	.list1-xq ul li img,
	.submit-pro ul li img {
		width: 160px;
		height: 160px;
		margin-right: 20px;
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

	.list1-xq-foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: #fff;
	}

	.list1-xq-foot p {
		font-size: 24px;
		line-height: 1;
		color: #999999;
	}

	.list1-xq-foot p span {
		font-size: 28px;
		color: #df273f;
	}

	.orders-beizhu {
		padding: 20px;
		background: #fff;
		margin: 20px 0;
	}

	.orders-beizhu p {
		font-size: 24px;
		line-height: 42px;
		color: #333;
	}

	.orders-beizhu p span {
		color: #808080;
	}

	.order-btn {
		background: #fff;
		padding: 20px;
		display: flex;
		justify-content: flex-end;
	}

	.order-btn h6 {
		width: 120px;
		height: 48px;
		border-radius: 24px;
		border: solid 1px #999999;
		text-align: center;
		line-height: 48px;
		font-size: 18px;
		color: #999999;
		margin-left: 20px;
		font-weight: normal;
		cursor: pointer;
	}

	.order-btn h6:nth-child(2) {
		border: solid 1px #ff0000;
		color: #ff0000;
	}
</style>
