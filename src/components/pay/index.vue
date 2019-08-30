<template>
	<div class="pay pad20">
		<div class="pay-title" v-if="pays.body === 'artificial_name'">
			付款后大师助手将于24小时内与您联系
		</div>
		<div class="pay-title" v-else>
			付款后可查看精准{{pays.sta}}结果
		</div>
		
		<div class="pay-btm">
			<div class="pay-btm-t">
				<h3><s>原价：199元</s> 优惠价：<span>{{pays.price}}</span>元</h3>
				<p>支付订单编号： <span>{{pays.ordersn}}</span></p>
				<p v-if="pays.birthday">姓氏：{{pays.surname}} {{pays.sex ? '/性别：'+pays.sex : ''}}/手机号：<span>{{pays.phone}}</span></p>
				<p v-if="pays.types">负责人：{{pays.surname}} / 手机号：<span>{{pays.phone}}</span></p>
				<p v-if="pays.birthday">生辰：{{pays.birthday[0]}}年{{pays.birthday[1]}}月{{pays.birthday[2]}}日 {{pays.birthday[3]}}时{{pays.birthday[4]}}分（阳历）</p>
				<p v-if="pays.types">公司类型：{{pays.types}}</p>
			</div>
			<div class="pay-btm-b">
				<h3>应付金额：<span>{{pays.price}}</span>元</h3>
				<div class="pays">
					<h5><img src="../../assets/img/weixin.png" alt="">微信支付</h5>
					<h5>
						<img src="../../assets/img/zhifubao.png" alt="">
						<!-- <form @submit="submit">
							<input type="hidden" v-model="pays.ordersn">
							<input type="hidden" v-model="pays.body">
							<input type="submit" value="支付宝支付" class="zfb">
						</form> -->
						<span @click="zfb">支付宝支付</span>
					</h5>
				</div>
				<p>支付后请耐心等待10秒钟出{{pays.sta}}结果</p>
				<h6 @click="goOrder">查看{{pays.sta}}订单详情</h6>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			pays: {
				type: Object,
				default: () => {}
			}
		},
		mounted() {
			this.birth();
		},
		methods: {
			goOrder() {
				this.$router.push({
					name: 'dingdanchaxun'
				})
			},
			birth() {
				console.log(this.pays);
				if (this.pays.birthday) {
					this.pays.birthday = this.pays.birthday.split(',');
					console.log(this.pays.birthday);
				}
			},
			zfb(){
				this.axios.post(`${this.globals.url}api/AlipayWap/PcPayment`,this.globals.qs.stringify({
					ordersn: this.pays.ordersn,
					body: this.pays.body
				}))
				.then((response) => {
					console.log(response)
					const div = document.createElement('div')
					div.innerHTML = response.data //此处form就是后台返回接收到的数据
					document.body.appendChild(div)
					document.forms[0].submit()
					setTimeout(() => {
						document.body.removeChild(div)
					},1000);
				}).catch(function(error) {
					console.log(error);
				});
			},
			submit(){
				let forms = {
					ordersn: this.pays.ordersn,
					body: this.pays.body
				}
				let formData = JSON.stringify(forms);
				this.$http.post(`${this.globals.url}api/AlipayWap/PcPayment`, formData).then((response) => {
					// success callback
				}, (response) => {
					// error callback
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.zfb{
		background: none;
		color: white;
	}
	.pay {
		margin: 40px 0;

		&-title {
			width: 100%;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 30px;
			font-weight: normal;
			color: #ffffff;
			background-color: #ff0008;
		}

		&-btm {
			border: solid 1px #cccccc;
			box-sizing: border-box;

			&-t {
				padding: 30px 0;
				text-align: center;
				border-bottom: 1px solid #ccc;

				>h3 {
					font-size: 24px;
					font-weight: normal;
					color: #000000;
					margin-bottom: 30px;

					>span {
						font-size: 30px;
						color: #850004;
					}
				}

				>p {
					font-size: 24px;
					line-height: 42px;
					color: #000000;

					>span {
						color: #850004;
					}
				}
			}

			&-b {
				padding: 30px 20px;
				text-align: center;

				>h3 {
					font-size: 24px;
					font-weight: normal;
					color: #000000;
					margin-bottom: 25px;

					>span {
						font-size: 30px;
						color: #850004;
					}
				}

				.pays {
					display: flex;
					justify-content: space-between;

					>h5 {
						width: 260px;
						height: 70px;
						font-size: 30px;
						font-weight: normal;
						color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;
						color: white;

						>img {
							width: 41px;
							height: 36px;
							margin-right: 10px;
						}

						&:first-child {
							background-color: #4bb414;
						}

						&:last-child {
							background-color: #02aaef;
						}
					}
				}

				>p {
					font-size: 24px;
					font-weight: normal;
					color: #999999;
					padding: 20px 0;
				}

				>h6 {
					width: 330px;
					height: 60px;
					background-color: #850004;
					border-radius: 6px;
					margin: 0 auto;
					font-size: 24px;
					text-align: center;
					line-height: 60px;
					color: #ffffff;
				}
			}
		}
	}
</style>
