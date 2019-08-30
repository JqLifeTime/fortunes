<template>
	<div class="bihua">
		<c-header :title="title"></c-header>
		<div class="bihua1 pad20">
			<div class="title">在线测名</div>
			<div class="bihua1-btm">
				<p>根据姓名学五格八十一数理吉凶，并结合周易五行，为您或您宝宝的名字进行测试评分。请输入简体汉字，您输入
的汉字系统均按《康熙字典》的繁体笔画数进行测算。</p>
				<div class="bihua1-btm-item1">
					<span>您的姓氏：</span>
					<input type="text" v-model="xingshi" />
				</div>
				<div class="bihua1-btm-item1">
					<span>您的名字：</span>
					<input type="text" v-model="mingzi" />
				</div>
				<div class="sub" @click="subceming" type="primary" v-loading.fullscreen.lock="fullscreenLoading">在线测名</div>
			</div>
		</div>
		<div class="bihua2 pad20" v-if="status == 1">
			<div class="bihua2-title">您的在线测名解析：</div>
			<div class="bihua2-btm">
				<h3>姓名：<span v-for="i in name">{{i}}</span></h3>
				<div class="culue">
					<div class="culue-l">
						<p>
							繁体：<span v-for="i1 in cmjg.fanti">{{i1}}</span>
						</p>
						<p>
							拼音：<span v-for="i2 in cmjg.pinyin">{{i2}}</span>
						</p>
						<p>
							笔划：<span v-for="i3 in cmjg.bihua">{{i3}}</span>
						</p>
						<p>
							五行：<span v-for="i4 in cmjg.wuxing">{{i4}}</span>
						</p>
						<p>
							吉凶：<span v-for="i5 in cmjg.jixiong">{{i5}}</span>
						</p>
					</div>
					<div class="culue-r">
						<p>天格-> {{cmjg.wuge[0].tiange}}</p>
						<p>人格-> {{cmjg.wuge[0].renge}}</p>
						<p>地格-> {{cmjg.wuge[0].dige}}</p>
						<p>外格-> {{cmjg.wuge[0].waige}}</p>
						<p>总格-> {{cmjg.wuge[0].zongge}}</p>
					</div>
				</div>
				<div class="xiangxi">
					<h3><span>天格5所示之先天运：</span>（代表12岁前的先天运势以及先天遗传，影响不大，若不理想不必计较）</h3>
					<p>『数理』：{{cmjg.wuge[1].details[1].title}}</p>
					<p>『签语』：五行俱权，循环相生，圆通畅达，福祉无穷。</p>
					<p>『含义』：{{cmjg.wuge[1].details[1].content}}</p>
				</div>
				<div class="xiangxi">
					<h3><span>人格7所示之主运：</span>（代表24-48岁人生颠峰期运势以及个性、才华及事业运，影响一生运势）</h3>
					<p>『数理』：{{cmjg.wuge[1].details[2].title}}</p>
					<p>『签语』：七政之数，精悍严谨，天赋之力，吉星照耀。</p>
					<p>『含义』：{{cmjg.wuge[1].details[2].content}}</p>
				</div>
				<div class="xiangxi">
					<h3><span>地格5所示之前运：</span>（代表36岁前的青年运势以及家庭夫妻、子女田宅，影响基础运）</h3>
					<p>『数理』：{{cmjg.wuge[1].details[3].title}}</p>
					<p>『签语』：五行俱权，循环相生，圆通畅达，福祉无穷。</p>
					<p>『含义』：{{cmjg.wuge[1].details[3].content}}</p>
				</div>
				<div class="xiangxi">
					<h3><span>外格3所示之副运：</span>（代表36-48岁的中年运势以及社交、朋友、工作环境等，影响后天的机遇）</h3>
					<p>『数理』：{{cmjg.wuge[1].details[4].title}}</p>
					<p>『签语』：三才之数，天地人和，大事大业，繁荣昌隆。</p>
					<p>『含义』：{{cmjg.wuge[1].details[4].content}}</p>
				</div>
				<div class="xiangxi">
					<h3><span>总格9所示之后运：</span>（代表48岁后的中晚年运势以及财富、收入，影响人生最终的成就）</h3>
					<p>『数理』：{{cmjg.wuge[1].details[0].title}}</p>
					<p>『签语』：大成之数，蕴涵凶险，或成或败，难以把握。</p>
					<p>『含义』：{{cmjg.wuge[1].details[0].content}}</p>
				</div>
				<div class="xiangxi">
					<p>天格5之数理暗示：{{cmjg.wuge[1].details[1].fortune}}</p>
					<p>人格7之数理暗示：{{cmjg.wuge[1].details[2].fortune}}</p>
					<p>地格5之数理暗示：{{cmjg.wuge[1].details[3].fortune}}</p>
					<p>外格3之数理暗示：{{cmjg.wuge[1].details[4].fortune}}</p>
					<p>总格9之数理暗示：{{cmjg.wuge[1].details[0].fortune}}</p>
					<p>说明：若五格数理暗示的凶数运较多，表示易破财、事业不顺、影响健康和家庭；女命狐独运、首领运及刚性运较多，则代表婚姻不顺。以上两种情况均建议改名或予以化解。</p>
				</div>
				<div class="xiangxi">
					<h3><span>总评及打分：</span></h3>
					<p>根据卜易居·名字测试打分，<i v-for="i in name">{{i}}</i>的姓名评分为：<span>{{pingfen}}分</span>，你的名字起得非常棒，成功与惊喜会伴随你的一生。但千万注意不要失去上进心。</p>
				</div>
			</div>
		</div>
		<!-- <div class="bihua3 pad20">
			<div class="title">
				八字精准算命
			</div>
			<div class="bihua3-btm">
				<p>命运是不能被完全改变的，但却可以适当的趋吉避凶，就像天气预报说要下雨了，出门就要记得带伞……如此我们通过
					对命理的预测，可以勾画出一个人的人生运行轨迹，从而指导人们在有利的时间去有利的方位，做有利的事情，在不利
					的时间避免去不利的方位，避免做不利的事情，这是命理预测的价值所在。</p>
				<div class="bihua3-btm-item1">
					<span>起名姓氏：</span>
					<input type="text" v-model="valuecm" />
				</div>
				<div class="bihua3-btm-item2">
					<span>起名性别：</span>
					<input type="radio" value="男" v-model="sexcm" id="bazinan">
					<label for="bazinan">男</label>
					<input type="radio" value="女" v-model="sexcm" id="bazinv">
					<label for="bazinv">女</label>
				</div>
				<div class="bihua3-btm-item3">
					<span>出生时间：</span>
					<div>
						<select class="rili" v-model="rilicm">
							<option value="1">公历</option>
							<option value="2">阴历</option>
						</select>
						<el-date-picker v-model="birthdaycm" value-format="yyyy,MM,dd,HH,mm" type="datetime" placeholder="选择日期时间" class="birthday">
						</el-date-picker>
					</div>
				</div>
				<div class="bihua3-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phonecm" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="subbazi">在线算命</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '在线测名',
				xingshi: '',
				mingzi: '',
				valuecm: '', //测名姓氏
				birthdaycm: '', //测名出生日期
				rilicm: '1', //测名出生日历
				phonecm: '', //测名手机号码
				sexcm: '男', //测名性别
				cmjg: '',//测名结果,
				name: '', //名字
				status: 0,  //测试状态
				fullscreenLoading: false,
				pingfen: 0
			}
		},
		components: {
			'c-header': header
		},
		methods: {
			subceming() {
				this.fullscreenLoading = true;
				let name1 = this.xingshi + this.mingzi;
				this.name = name1.split('');
				this.axios.post(`${this.globals.url}api/CheckName/index`,this.globals.qs.stringify({
						surname: this.xingshi,
						name: this.mingzi
					}))
				.then((response) => {
					console.log(response)
					this.status = 1;
					this.fullscreenLoading = false;
					let res = response.data.data;
					for (var i in res) {
						console.log(res[i]);
						if(res[i] instanceof Array){}
						else{
							res[i] = res[i].trim();
							res[i] = res[i].split(' ');
						}
					}
					let wuge = res.wuge[0],
						pingfen = 0;
					for(var i in wuge){
						let k = parseInt(wuge[i]);
						pingfen += k;
					}
					console.log(pingfen);
					console.log(res);
					this.cmjg = res;
					this.pingfen = pingfen;
					
				}).catch(function(error) {
					console.log(error);
				});
			},
			subbazi(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.bihua1 {
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

	.bihua2 {
		margin-top: 30px;

		&-title {
			width: 100%;
			height: 80px;
			background: #ff0008;
			text-align: center;
			line-height: 80px;
			font-size: 30px;
			color: white;
		}

		&-btm {
			padding: 20px;
			border: solid 1px #cccccc;
			margin-bottom: 40px;
			>h3 {
				font-size: 24px;
				line-height: 45px;

				>span {
					font-size: 30px;
					color: #850004;
					padding: 25px;
				}
			}

			.culue {
				display: flex;
				font-size: 24px;
				padding-bottom: 20px;
				margin-bottom: 20px;
				border-bottom: 1px solid #ccc;

				/*no*/
				&-l {
					flex: 4;

					>p {
						display: flex;
						line-height: 45px;

						>span {
							display: block;
							flex: 1;
							text-align: center;
						}
					}
				}

				&-r {
					flex: 2;

					>p {
						line-height: 45px;
						text-align: center;
					}
				}
			}
		}
	}

	.xiangxi {
		margin-bottom: 60px;

		&:last-child {
			margin-bottom: 20px;
		}

		>h3 {
			font-size: 24px;
			color: #333333;
			line-height: 60px;

			>span {
				font-size: 30px;
				font-weight: 600;
			}
		}

		>p {
			font-size: 24px;
			color: #333333;
			line-height: 50px;
			>span{
				font-size: 30px;
				color: #850004;
			}
		}
	}
	.bihua3{
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
					width: 350px;
					height: 60px;
				}
			}
		}
	}
</style>
