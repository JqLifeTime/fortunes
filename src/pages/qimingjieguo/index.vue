<template>
	<div class="qmjg">
		<c-header :title="title"></c-header>
		<div class="qmjg1 pad20">
			<div class="title">
				起名基本信息
			</div>
			<div class="qmjg1-btm">
				<div class="qmjg1-btm-item1">
					<p>起名姓氏</p>
					<p>{{qmjg[1][0]}}</p>
					<p>性别</p>
					<p>{{qmjg[1][1]}}</p>
				</div>
				<div class="qmjg1-btm-item2">
					<p>出生日期</p>
					<h3>{{qmjg[2]}}</h3>
				</div>
				<!-- <div class="qmjg1-btm-item2">
					<p>出生阳历</p>
					<h3>{{qmjg[4]}}</h3>
				</div> -->
				<div class="qmjg1-btm-item2">
					<p>出生农历</p>
					<h3>{{qmjg[4]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>生辰八字</p>
					<h3>{{qmjg[5]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>纳音五行</p>
					<h3>{{qmjg[6]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>八字五行个数</p>
					<h3>{{qmjg[7].count}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>比劫（金）</p>
					<h3>{{qmjg[7].scale[0]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>比劫（木）</p>
					<h3>{{qmjg[7].scale[1]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>比劫（水）</p>
					<h3>{{qmjg[7].scale[2]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>比劫（火）</p>
					<h3>{{qmjg[7].scale[3]}}</h3>
				</div>
				<div class="qmjg1-btm-item2">
					<p>比劫（土）</p>
					<h3>{{qmjg[7].scale[4]}}</h3>
				</div>
				<div class="qmjg1-btm-item3">
					<p>起名结果</p>
					<div>
						喜用分析 格局分析 适合事业 天乙贵人 文昌位 吉祥色彩 吉祥数字 吉祥方位
						<div class="btn">
							<h6 @click="jiesuo"><img src="../../assets/img/jiesuo.png">立即解锁美名</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="ispay">
			<c-pay :pays="order"></c-pay>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	import pay from 'components/pay'
	export default {
		data() {
			return {
				title: '起名结果',
				qmjg: null,
				ispay: false,
				order: {},
			}
		},
		mounted() {
			let config = JSON.parse(localStorage.getItem('config'));
			console.log(config);
			console.log(this.$route.params);
			let qm = this.$route.params;
			console.log(qm);
			this.axios.post(`${this.globals.url}api/GiveName/index`,this.globals.qs.stringify({
					surname: qm.surname,
					gender: qm.gender,
					birthstatus: qm.birthstatus,
					birthtime: qm.birthtime,
					namenum: qm.namenum,
					phone: qm.phone,
					timetype: qm.timetype,
				}))
			.then((response) => {
				console.log(response)
				if(response.data.status == 1){
					let res = response.data.data;
					console.log(res);
					res[1] = res[1].split('-');
					console.log(res[1]);
					this.qmjg = res;
					this.order = {
						sta: '起名',
						surname: qm.surname,
						sex: qm.gender,
						phone: qm.phone,
						birthday: qm.birthtime,
						ordersn: res[0],
						body: 'pay_orders',
						price: config.Naming
					}
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods:{
			jiesuo(){
				this.ispay = true;
			}
		},
		components: {
			'c-header': header,
			'c-pay': pay
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.title {
		font-size: 30px;
		font-weight: 600;
		color: #000000;
		margin: 40px 0;
		text-align: center;
	}

	.qmjg1-btm {
		border: 1px solid #ccc;
		/*no*/
		border-bottom: none;

		>div {
			border-bottom: 1px solid #ccc;
			/*no*/
		}

		&-item1 {
			display: flex;
			align-items: center;

			>p {
				flex: 1;
				text-align: center;
				height: 80px;
				line-height: 80px;
				font-size: 24px;
				color: #000000;
				border-right: 1px solid #ccc;

				/*no*/
				&:nth-child(2n) {
					font-size: 30px;
					color: #850004;
				}

				&:last-child {
					border-right: none;
				}
			}
		}

		&-item2 {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ccc;

			/*no*/
			>p {
				flex: 1;
				text-align: center;
				line-height: 80px;
				font-size: 24px;
				color: #000000;
				border-right: 1px solid #ccc;
				/*no*/
			}

			>h3 {
				flex: 3;
				text-align: center;
				line-height: 80px;
				font-size: 30px;
				font-weight: normal;
				color: #850004;
			}
		}

		&-item3 {
			display: flex;
			align-items: center;

			>p {
				width: 149px;
				height: 100%;
				text-align: center;
				font-size: 24px;
				color: #000000;
			}

			>div {
				border-left: 1px solid #ccc;
				/*no*/
				flex: 3;
				padding: 20px;
				font-size: 24px;
				line-height: 36px;
				color: #850004;

				.btn {
					width: 100%;
					height: 184px;
					background: url(../../assets/img/jieguo.png);
					background-size: 100%;
					display: flex;
					align-items: center;
					justify-content: center;

					>h6 {
						width: 240px;
						height: 70px;
						background-color: #850004;
						border-radius: 10px;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24px;
						font-weight: normal;
						color: #ffffff;

						>img {
							width: 28px;
							height: 32px;
							margin-right: 10px;
						}
					}
				}
			}
		}
	}
</style>
