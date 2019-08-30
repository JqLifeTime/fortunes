<template>
	<div class="bazi">
		<c-header :title='title'></c-header>
		<div class="bazi1 pad20">
			<div class="title">
				八字精准算命
			</div>
			<div class="bazi1-btm">
				<p>命运是不能被完全改变的，但却可以适当的趋吉避凶，就像天气预报说要下雨了，出门就要记得带伞……如此我们通过
					对命理的预测，可以勾画出一个人的人生运行轨迹，从而指导人们在有利的时间去有利的方位，做有利的事情，在不利
					的时间避免去不利的方位，避免做不利的事情，这是命理预测的价值所在。</p>
				<div class="bazi1-btm-item1">
					<span>您的姓名：</span>
					<input type="text" v-model="valuebz" />
				</div>
				<div class="bazi1-btm-item2">
					<span>您的性别：</span>
					<input type="radio" value="男" v-model="sexbz" id="bazinan">
					<label for="bazinan">男</label>
					<input type="radio" value="女" v-model="sexbz" id="bazinv">
					<label for="bazinv">女</label>
				</div>
				<div class="bazi1-btm-item3">
					<span>出生时间：</span>
					<div>
						<el-date-picker v-model="birthdaybz" value-format="yyyy,M,d" type="date" placeholder="选择日期" class="birthday">
						</el-date-picker>
						<select class="select" v-model="shichen" placeholder="选择时辰">
							<option value="0-1">子 00:00-00:59</option>
							<option value="1-2">丑 01:00-01:59</option>
							<option value="2-3">丑 02:00-02:59</option>
							<option value="3-4">寅 03:00-03:59</option>
							<option value="4-5">寅 04:00-04:59</option>
							<option value="5-6">卯 05:00-05:59</option>
							<option value="6-7">卯 06:00-06:59</option>
							<option value="7-8">辰 07:00-07:59</option>
							<option value="8-9">辰 08:00-08:59</option>
							<option value="9-10">巳 09:00-09:59</option>
							<option value="10-11">巳 10:00-10:59</option>
							<option value="11-12">午 11:00-11:59</option>
							<option value="12-13">午 12:00-12:59</option>
							<option value="13-14">未 13:00-13:59</option>
							<option value="14-15">未 14:00-14:59</option>
							<option value="15-16">申 15:00-15:59</option>
							<option value="16-17">申 16:00-16:59</option>
							<option value="17-18">酉 17:00-17:59</option>
							<option value="18-19">酉 18:00-18:59</option>
							<option value="19-20">戌 19:00-19:59</option>
							<option value="20-21">戌 20:00-20:59</option>
							<option value="21-22">亥 21:00-21:59</option>
							<option value="22-23">亥 22:00-22:59</option>
							<option value="23-24">子 23:00-23:59</option>
						</select>
					</div>
				</div>
				<div class="bazi1-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phonebz" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="subbazi">在线算命</div>
			</div>
		</div>
		<div class="bazi2 pad20" v-if="result">
			<div class="bazi2-title">
				您好，您提交的信息如下：
			</div>
			<div class="bazi2-btm">
				<p>姓名：{{valuebz}} /性别：{{sexbz}} /生辰：{{bazimp[0][0]}}年{{bazimp[0][1]}}月{{bazimp[0][2]}}日/手机号：<span>{{phonebz}}</span></p>
				<div class="bazi2-btm-item1">
					<div class="item-title">∞您的生辰八字∞</div>
					<div class="bazi2-btm-item1-btm">
						<p>您的生辰（农历）{{bazimp[0][0]}}年{{bazimp[0][1]}}月{{bazimp[0][2]}}日</p>
						<p><span v-for="(item,index) in bazimp[2]">{{item}}</span></p>
					</div>
				</div>
				<div class="bazi2-btm-item2">
					<div class="item-title">∞您的生辰八字命盘∞</div>
					<div class="bazi2-btm-item2-btm">
						<div>
							<p>出生农历</p>
							<p v-for="(item,index) in bazimp[0]">{{item}}</p>
						</div>
						<div>
							<p>天干</p>
							<p v-for="(item,index) in bazimp[1]">{{item}}</p>
						</div>
						<div>
							<p>乾造</p>
							<p v-for="(item,index) in bazimp[2]">{{item}}</p>
						</div>
						<div>
							<p>地支</p>
							<p v-for="(item,index) in bazimp[3]">{{item}}</p>
						</div>
						<div>
							<p>五行</p>
							<p v-for="(item,index) in bazimp[4]">{{item}}</p>
						</div>
						<div>
							<p>纳音</p>
							<p v-for="(item,index) in bazimp[5]">{{item}}</p>
						</div>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞年命生肖∞</div>
					<div class="bazi2-btm-item3-btm">
						<p v-html="bazifx.animals"></p>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞八字测算∞</div>
					<div class="bazi2-btm-item3-btm">
						<p v-html="bazifx.bazi"></p>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞八字分析∞</div>
					<div class="bazi2-btm-item3-btm">
						<p v-for="(item,index) in bazifx.fenxi">{{item}}</p>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞您的事业运∞</div>
					<div class="bazi2-btm-item3-btm">
						<p>透过姓名及生辰八字找到最适合你的工作及职务，由了解你先天八字机运来加强后天事业运。测算结果还告诉你适合从事的行业，有利事业的方向。让你的工作和事业蒸蒸日上，让你自助又人助！</p>
						<div>
							<h6 @click="gobuy">
								<img src="../../assets/img/jiesuo.png" alt="">立即解锁精准解析
							</h6>
						</div>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞您的招财运∞</div>
					<div class="bazi2-btm-item3-btm">
						<p>从姓名和生辰八字来看，你有机会一夜暴富？还是适合维持细水长流的稳定收入？你天生就是个聚财高手吗？最适合你的投资模式为何？想要拥有招财运，就要知道先天财气，对症下药才有适合你的理财模式及避免漏财的犯法。测算结果将告诉你什么样的物品可以让你发财、谁是你的财运贵人、哪个方位能让你招财更顺利！</p>
						<div>
							<h6 @click="gobuy">
								<img src="../../assets/img/jiesuo.png" alt="">立即解锁精准解析
							</h6>
						</div>
					</div>
				</div>
				<div class="bazi2-btm-item3">
					<div class="item-title">∞您的贵人运∞</div>
					<div class="bazi2-btm-item3-btm">
						<p>从姓名和八字生辰来看，你的贵人在哪里？把握和生命中贵人相处机会；防范身边小人，更能开创成功的运势！觉得自己总是遇不到贵人？没关系！测算结果还将指点你贵人的出生年份及生肖。</p>
						<div>
							<h6 @click="gobuy">
								<img src="../../assets/img/jiesuo.png" alt="">立即解锁精准解析
							</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="ispay" ref='pay'>
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
				title: '八字算命',
				valuebz: '', //八字姓氏
				birthdaybz: '', //八字出生日期
				phonebz: '', //八字手机号码
				sexbz: '男', //八字性别
				bazimp: '', //八字结果
				bazifx: '', //八字分析
				shichen: '0-1', //时辰
				ispay: false,
				result: false, //结果
				order: {} //支付信息
			}
		},
		components: {
			'c-header': header,
			'c-pay': pay
		},
		methods: {
			gobuy(){
				this.$nextTick(() => {
					this.$refs.pay.scrollIntoView();
				})
			},
			subbazi() {
				console.log(this.valuebz)
				console.log(this.birthdaybz)
				console.log(this.phonebz)
				console.log(this.sexbz)
				let config = JSON.parse(localStorage.getItem('config'));
				console.log(config);
				var teltest = /^1[0-9]{10}$/;
				let time = this.birthdaybz + ',' + this.shichen;
				console.log(time);
				if (this.valuebz) {
					if (teltest.test(this.phonebz)) {
						if (this.birthdaybz) {
							this.axios.post(`${this.globals.url}api/Bazi/payIndex`, this.globals.qs.stringify({
									surname: this.valuebz,
									gender: this.sexbz,
									birthtime: time,
									phone: this.phonebz
								}))
								.then((response) => {
									console.log(response);
									let arr = response.data.data.splice(1, 6);
									arr = arr.map(item => {
										item = item.split('-');
										return item;
									})
									console.log(arr);
									this.bazimp = arr;
									this.bazifx = response.data.data[1];
									this.result = true;
									let orderson = response.data.data[0];
									console.log(this.bazifx);
									this.axios.post(`${this.globals.url}api/Bazi/pay_orders`, this.globals.qs.stringify({
										ordersn: orderson
									})).then((response) => {
										this.ispay = true;
										this.order = {
											sta: '算命',
											surname: this.valuebz,
											sex: this.sexbz,
											phone: this.phonebz,
											birthday: this.birthdaybz,
											ordersn: orderson,
											body: 'pay_orders',
											types: '',
											price: config.Bzming
										}
									}).catch(function(error) {
										console.log(error);
									});
								}).catch(function(error) {
									console.log(error);
								});
						} else {
							alert('请选择您的出生时间！')
						}
					} else {
						alert('请输入正确的手机号！')
					}
				} else {
					alert('请输入您的名字！')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.select {
		width: 180px;
		height: 70px;
		background: #fff;
		padding-left: 5px;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
		box-sizing: border-box;
		color: #666;
	}

	.bazi1 {
		margin-bottom: 40px;

		&-btm {
			border: 1px solid #850004;
			/*no*/
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
					width: 430px;
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

			&-item2 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;

				>input {
					display: none;
				}

				>label {
					position: relative;
					margin-right: 30px;
				}

				>label::before {
					display: inline-block;
					content: "";
					width: 24px;
					height: 24px;
					border: 1px solid rgb(219, 219, 219);
					margin-right: 6px;
					vertical-align: middle;
				}

				>label::after {
					display: inline-block;
					content: "";
					width: 16px;
					height: 16px;
					position: absolute;
					left: 6px;
					top: 10px;
					background-color: #e6e6e6;
				}

				>input:checked+label::before {}

				>input:checked+label::after {
					display: inline-block;
					content: "";
					width: 16px;
					height: 16px;
					/*border-radius: 50%;*/
					position: absolute;
					left: 6px;
					top: 10px;
					background-color: #850004;
				}
			}

			&-item3 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;

				>div {
					width: 430px;
					display: flex;
					justify-content: space-between;
				}

				.rili {
					width: 110px;
					height: 70px;
					border-radius: 7px;
					padding-left: 10px;
					background: #fff;
					border: 1px solid #DCDFE6;
					/*no*/
				}

				.birthday {
					width: 250px;
					height: 60px;
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

	.bazi2 {
		&-title {
			height: 80px;
			background: #ff0008;
			color: white;
			font-size: 24px;
			color: #ffffff;
			text-align: center;
			line-height: 80px;
		}

		&-btm {
			border: 1px solid #ccc;
			/*no*/
			padding: 20px;
			margin-bottom: 40px;

			>p {
				font-size: 24px;
				text-align: center;
				margin-bottom: 20px;

				>span {
					color: #850004;
				}
			}

			>div {
				margin-bottom: 30px;

				&:last-child {
					margin-bottom: 0px;
				}
			}

			&-item1 {
				&-btm {
					padding: 25px 0;
					text-align: center;
					border: 1px solid #ccc;
					/*no*/
					border-top: none;

					>p {
						font-size: 24px;
						line-height: 36px;

						&:last-child {
							color: #850004;
						}
					}
				}
			}

			&-item2 {
				&-btm {
					border: 1px solid #ccc;
					/*no*/
					border-top: none;
					border-bottom: none;

					>div {
						display: flex;
						border-bottom: 1px solid #ccc;

						/*no*/
						>p {
							flex: 1;
							border-right: 1px solid #ccc;
							text-align: center;
							height: 60px;
							line-height: 60px;
							color: #850004;

							&:first-child {
								color: #000;
							}

							&:last-child {
								border-right: none;
							}
						}
					}
				}
			}

			&-item3 {
				&-btm {
					border: 1px solid #ccc;
					/*no*/
					padding: 20px;
					border-top: none;

					>p {
						font-size: 24px;
						margin-bottom: 20px;
						line-height: 36px;
						text-align: center;
					}

					>div {
						width: 100%;
						height: 180px;
						background: url(../../assets/img/jieguo.png);
						background-size: 100%;
						display: flex;
						justify-content: center;
						align-items: center;

						>h6 {
							width: 280px;
							height: 70px;
							background: #850004;
							border-radius: 10px;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24px;
							color: white;

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
	}

	.item-title {
		width: 100%;
		height: 60px;
		background: #e6e6e6;
		text-align: center;
		line-height: 60px;
		font-size: 24px;
		color: #850004;
		font-weight: 600;
	}
</style>
