<template>
	<div class="dingdan">
		<c-header :title="title"></c-header>
		<div class="dingdan1 pad20">
			<div class="title">
				起名算命订单查询
			</div>
			<div class="dingdan1-btm">
				<p>请正确输入手机号或者订单编号，以方便最快的速度查到您的订单信息，谢谢合作！</p>
				<div class="dingdan1-btm-item1">
					<span>手机/订单号：</span>
					<input type="text" v-model="phone">
				</div>
				<div class="sub" @click="search">在线查询</div>
			</div>
		</div>
		<div class="dingdan2 pad20">
			<div class="dingdan2-title">您好，您查询的订单信息如下：</div>
			<div class="dingdan2-btm" v-if="orderList.length != 0">
				<div class="dingdan2-btm-item1" v-for="(item,index) in orderList" :key="index">
					<div class="item-title" v-if="item.type == 0">∞您的起名订单∞</div>
					<div class="item-title" v-if="item.type == 1">∞您的八字算命订单∞</div>
					<div class="item-btm">
						<div class="item-btm-title">
							<div>
								<p>订单编号：{{item.ordersn}}</p><p>手机号：<span>{{item.phone}}</span></p>
							</div>
							<div>
								<p>您的姓氏：<span>{{item.surname}}</span></p><p>您的性别：<span>{{item.gender}}</span></p><p>您的生辰：<span>（阴历）{{item.result[3]}}</span></p>
							</div>
						</div>
						<div class="item-btm-btm" v-if="item.type == 0">
							<div class="suolue" @click="checkqm" v-show="!qiming">点击查看详情  》》</div>
							<div class="xiangxi" v-show="qiming">
								<h3>您的生辰八字：<span>{{item.result[4]}}</span></h3>
								<div>
									<h4>您的起名结果：</h4>
									<div>
										<p v-for="(i,ind) in item.payresult" :key="ind"><span>[ {{i.name}} ]</span>&nbsp;&nbsp;&nbsp;&nbsp;{{i.content}}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="item-btm-btm" v-if="item.type == 1">
							<div class="suolue" @click="checkqm" v-show="!qiming">点击查看详情  》》</div>
							<div class="xiangxi" v-show="qiming">
								<h3>您的生辰八字：<span>{{item.result[2]}}</span></h3>
								<h6 v-for="(child,index) in item.payresult" class="bazixp"><div>{{child.name}}</div><p><span>感情运：</span>{{child.ganqing}}</p><p><span style="">事业运：</span>{{child.shiye}}</p><p><span>先天运：</span>{{child.xiantian}}</p><p><span>招财运：</span>{{child.zhaocai}}</p></h6>
							</div>
						</div>
					</div>
				</div>
				<div class="dingdan2-btm-item1" v-for="(item,index) in rengong" :key="index">
					<div class="item-title" v-if="item.paystatus == 1">∞您的人工起名订单∞</div>
					<div class="item-title" v-if="item.paystatus == 2">∞您的人工公司起名订单∞</div>
					<div class="item-btm">
						<div class="item-btm-title">
							<div>
								<p>订单编号：{{item.ordersn}}</p><p>手机号：<span>{{item.phone}}</span></p>
							</div>
							<div v-if="item.paystatus == 1">
								<p>您的姓氏：<span>王</span></p><p>您的生辰：<span>（阳历）{{item.datatime[0]}}年{{item.datatime[1]}}月{{item.hours[0]}}日{{item.hours[1]}}时</span></p>
							</div>
							<div v-if="item.paystatus == 2">
								<p>公司负责人：<span>{{item.name}}</span></p><p>公司类型：<span>{{item.type}}</span></p>
							</div>
						</div>
						<div class="item-btm-btm">
							<div class="lianxi">专业大师助手将24小时内与你联系，请保持电话通畅！<router-link to="/">在线客服>></router-link></div>
						</div>
					</div>
				</div>
				<!-- <div class="dingdan2-btm-item1">
					<div class="item-title">∞您的八字算命订单∞</div>
					<div class="item-btm">
						<div class="item-btm-title">
							<div>
								<p>订单编号：2456465465456465456</p><p>手机号：<span>15700001111</span></p>
							</div>
							<div>
								<p>您的姓名：<span>王小二</span></p><p>您的生辰：<span>（阳历）2019年5月22日 13时24分</span></p>
							</div>
						</div>
						<div class="item-btm-btm">
							<div class="suolue" @click="checkqm" v-show="!qiming">点击查看详情  》》</div>
							<div class="xiangxi" v-show="qiming">
								<h3>您的生辰八字：<span>己未  丙子  癸酉  壬子</span></h3>
								<h6><span>您的事业运：</span>透过姓名及生辰八字找到最适合你的工作及职务，由了解你先天八字机运来加强后天事业运。测算结果还告诉你适合从事的行业，有利事业的方</h6>
								<h6><span>您的招财运：</span>从姓名和生辰八字来看，你有机会一夜暴富？还是适合维持细水长流的稳定收入？你天生就是个聚财高手吗？最适合你的投资模式为何？想要拥有招财运，就要知道先天财气，对症下药才有适合你的理财模式及避免漏财的犯法。测算结果将告诉你什么样的物品可以让你发财、谁是你的财运贵人、哪个方位能让你招财更顺利！</h6>
								<h6><span>您的贵人运：</span>从姓名和八字生辰来看，你的贵人在哪里？把握和生命中贵人相处机会；防范身边小人，更能开创成功的运势！觉得自己总是遇不到贵人？没关系！测算结果还将指点你贵人的出生年份及生肖。</h6>
							</div>
						</div>
					</div>
				</div> -->
			</div>
			<div class="null" v-else>
				暂无更多订单信息~~~
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '订单查询',
				phone: '',  //手机/订单号
				qiming: false,
				orderList: [],
				rengong: [],
				userId: ''
			}
		},
		components: {
			"c-header": header
		},
		methods: {
			search() {
				if(this.phone){
					this.axios.post(`${this.globals.url}api/PayOrders/orderQuery`,this.globals.qs.stringify({
							ordersn: this.phone
						}))
					.then((response) => {
						console.log(response)
						if(response.data.status == 1){
							this.orderList = response.data.data;
						}else{
							this.orderList = [];
						}
					}).catch(function(error) {
						console.log(error);
					});
					this.axios.post(`${this.globals.url}api/ArtificialName/orders`,this.globals.qs.stringify({
							ordersn: this.phone
						}))
					.then((response) => {
						console.log(response)
						if(response.data.status == 1){
							let rglist = response.data.data.map(item => {
								let temp = item;
								if(temp.birth != null){
									temp.datatime = temp.birth.split('-');
									temp.hours = temp.datatime[2].split(' ');
								}
								return temp;
							})
							this.rengong = rglist;
						}else{
							this.rengong = [];
						}
						console.log(this.rengong);
					}).catch(function(error) {
						console.log(error);
					});
				}else{
					this.$message({
						type: 'warning',
						message: '请输入手机号或订单号!'
					});
				}
			},
			checkqm(){
				this.qiming = !this.qiming
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.null{
		text-align: center;
		padding: 40px 0;
		font-size: 24px;
		border: 1px solid #ccc;
		margin-bottom: 40px;
	}
	.bazixp{
		>div{
			text-align: center;
			color: #850004;
			font-size: 28px;
			font-weight: 600;
		}
		>p{
			margin-top: 20px;
			>span{
				color: #850004;
				font-weight: 600
			}
		}
	}
	.dingdan1{
		margin-bottom: 40px;
		&-btm {
			border: 1px solid #850004; /*no*/
			padding: 20px;
			>p {
				font-size: 24px;
				line-height: 36px;
				color: #333333;
			}
			>div {
				margin-bottom: 30px;
			}
			&-item1 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-top: 30px;
				>input {
					width: 400px;
					height: 70px;
					border-radius: 7px;
					box-sizing: border-box;
					padding-left: 10px;
					border: 1px solid #DCDFE6;
					/*no*/
				}
				.tips {
					font-size: 18px;
					color: #850004;
					padding: 10px 0 0 130px;
				}
			}
		}
	}
	.sub {
		width: 264px;
		height: 76px;
		text-align: center;
		line-height: 76px;
		background: url(../../assets/img/btn1.png);
		background-size: 100%;
		margin-left: 120px;
		font-size: 30px;
		color: #ffffff;
	}
	.item-title{
		width: 100%;
		height: 60px;
		background: #e6e6e6;
		text-align: center;
		line-height: 60px;
		font-size: 24px;
		color: #850004;
		font-weight: 600;
	}
	.item-btm{
		padding: 20px;
		border: 1px solid #ccc;
		&-title{
			border-bottom: 1px solid #ccc;
			>div{
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
				flex-wrap: wrap;
				>p{
					font-size: 24px;
					line-height: 45px;
					>span{
						color: #850004
					}
				}
			}
		}
		&-btm{
			.lianxi{
				font-size: 24px;
				text-align: center;
				padding-top: 10px;
				>a{
					font-size: 22px;
					color: #ff0008;
				}
			}
			.suolue{
				width: 100%;
				padding-top: 10px;
				text-align: center;
				font-size: 26px;
				color: #ff0008;
			}
			.xiangxi{
				line-height: 40px;
				>h3{
					font-size: 24px;
					font-weight: normal;
					>span{
						color: #850004
					}
				}
				>h6{
					font-size: 24px;
					line-height: 40px;
					padding: 10px 0;
					>span{
						color: #850004;
					}
				}
				>div{
					>h4{
						width: 390px;
					}
					>div{
						>p{
							margin-bottom: 10px;
							>span{
								color: #850004;
								font-weight: 600;
							}
						}
					}
					font-size: 24px;
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
	.dingdan2{
		&-title{
			width: 100%;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 30px;
			color: white;
			background: #ff0008;
		}
		&-btm{
			padding: 20px;
			border: 1px solid #ccc; /*no*/
			&-item1{
				margin-bottom: 30px;
			}
		}
	}
</style>
