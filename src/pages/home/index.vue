<template>
	<div>
		<c-header :title="title"></c-header>
		<!-- 首页第一块 -->
		<div class="home1">
			<div class="title">
				<h3>易修阁在线起名</h3>
				<p>已有 <span>650320</span> 人选择易修阁，满意好评率高达95%</p>
			</div>
			<div class="home1-title">专业起名必填信息</div>
			<div class="home1-btm pad20">
				<div class="home1-btm-item1">
					<span>起名姓氏：</span>
					<input type="text" v-model="value" />
				</div>
				<div class="home1-btm-item2">
					<span>起名性别：</span>
					<input type="radio" value="男" v-model="sex" id="nan">
					<label for="nan">男</label>
					<input type="radio" value="女" v-model="sex" id="nv">
					<label for="nv">女</label>
				</div>
				<div class="home1-btm-item2">
					<span>出生状态：</span>
					<input type="radio" value="已出生" v-model="status" id="yi" checked>
					<label for="yi">已出生</label>
					<input type="radio" value="未出生" v-model="status" id="wei">
					<label for="wei">未出生</label>
				</div>
				<div class="home1-btm-item3">
					<span>{{status == '未出生' ? '预  产  期' : '出生时间'}}：</span>
					<div>
						<select class="rili" v-model="rili">
							<option value="1">公立</option>
							<option value="2">阴历</option>
						</select>
						<el-date-picker v-model="birthday" value-format="yyyy,MM,dd,HH,mm" type="datetime" placeholder="选择日期时间" class="birthday">
						</el-date-picker>
					</div>
				</div>
				<div class="home1-btm-item4">
					<span>起名字数：</span>
					<select name="num" v-model="nums">
						<option value="2">两个字</option>
						<option value="1">一个字</option>
					</select>
					<span class="tips">&nbsp;&nbsp;&nbsp;*不计算姓氏字数</span>
				</div>
				<div class="home1-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phone" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="subIndex">在线申请起名</div>
			</div>
		</div>
		<!-- 首页第一块 -->
		<!-- 首页第二块 -->
		<div class="home2 pad20">
			<div class="title2">
				<h3>国学权威专业起名网</h3>
				<p>好听好记好运-平安健康祈福</p>
			</div>
			<div class="home2-btm">
				<div class="home2-btm-item">
					<div class="home2-img">
						<img src="../../assets/img/zhuanye1.png" alt="">
					</div>
					<h3>正宗的起名方法</h3>
					<p>拥有完整专业的周易起名算法，专业精准分析，精确计算起名含量。</p>
				</div>
				<div class="home2-btm-item">
					<div class="home2-img">
						<img src="../../assets/img/zhuanye2.png" alt="">
					</div>
					<h3>正宗的起名方法</h3>
					<p>拥有完整专业的周易起名算法，专业精准分析，精确计算起名含量。</p>
				</div>
				<div class="home2-btm-item">
					<div class="home2-img">
						<img src="../../assets/img/zhuanye3.png" alt="">
					</div>
					<h3>正宗的起名方法</h3>
					<p>拥有完整专业的周易起名算法，专业精准分析，精确计算起名含量。</p>
				</div>
				<div class="home2-btm-item">
					<div class="home2-img">
						<img src="../../assets/img/zhuanye4.png" alt="">
					</div>
					<h3>正宗的起名方法</h3>
					<p>拥有完整专业的周易起名算法，专业精准分析，精确计算起名含量。</p>
				</div>
			</div>
		</div>
		<!-- 首页第二块 -->
		<!-- 首页第三块 -->
		<div class="home3 pad20">
			<div class="title">
				<h3>生辰八字算命</h3>
				<p>大师专业分析为你指点迷津，<br />
					贫者因知命而富 富者因知命而贵<br />
					命运是不能被完全改变的，但却可以适当的趋吉避凶，<br />
					就像天气预报说要下雨了，出门就要记得带伞……
				</p>
			</div>
			<div class="home3-btm">
				<p>八字测算命理，是指根据人的出生时间（生辰）排成命局，共有八个字（即生辰八字），结合八字的阴阳五行生克情况进行分析一个人的运势，所以称为生辰八字测算，是命理测算方法之中最正统的一种。</p>
				<div class="home3-btm-item1">
					<span>您的姓名：</span>
					<input type="text" v-model="value1" />
				</div>
				<div class="home3-btm-item2">
					<span>您的性别：</span>
					<input type="radio" value="0" v-model="sex1" id="bazinan">
					<label for="bazinan">男</label>
					<input type="radio" value="1" v-model="sex1" id="bazinv">
					<label for="bazinv">女</label>
				</div>
				<div class="home3-btm-item3">
					<span>出生时间：</span>
					<div>
						<el-date-picker v-model="birthday1" type="datetime" placeholder="选择日期时间" class="birthday">
						</el-date-picker>
					</div>
				</div>
				<div class="home3-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phone1" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="subbazi">在线算命</div>
			</div>
		</div>
		<!-- 首页第三块 -->
		<!-- 首页第四块 -->
		<div class="home4 pad20">
			<div class="title">
				<h3>易修阁</h3>
				<p>提前掌握命运玄机 把握人生转折点 享受幸福美满生活</p>
			</div>
			<div class="home4-btm">
				<img src="../../assets/img/gsjj.jpg" alt="">
				<p>所谓算命，就是运用具体人的姓名和出生时间等条件，来预测个体人的发展规律及在社会的发展关系。算命在学术上的专业称谓叫预测，研究算命的学术叫易学、也叫术数。理论核心是阴阳五行天干地支及八卦易经，理论系统较为复杂深奥。狭义的算命即是生辰八字算命，广义的算命则包含称骨算命、紫微斗数算命、面相手相算命、周易算命、姓名算命、八卦六爻、奇门遁甲、地理风水等等。中国预测的历史源远流长，其起源有据可靠可追溯到最高的伏羲氏，之后周文王演八卦，则算命开始逐步得以完善。</p>
				<h6>◇易修阁◇改变命运从这里开始，走向幸福美满生活</h6>
			</div>
		</div>
		<!-- 首页第四块 -->
		<!-- 首页第五块 -->
		<div class="home5 pad20">
			<div class="title">
				<h3>开运福运挂件</h3>
				<p>提前掌握命运玄机 把握人生转折点 享受幸福美满生活</p>
			</div>
			<div class="home5-btm">
				<div class="home5-btm-item" v-for="(item,index) in prolist" :key="index" @click="bindPro(item.id)">
					<div class="home5-img">
						<img :src="imgurl+item.photo_x" alt="">
					</div>
					<h3 class="ellipse2">{{item.name}}</h3>
					<p>￥{{item.price_yh}}<span>平安挂件</span></p>
				</div>
			</div>
		</div>
		<!-- 首页第五块 -->
		<!-- 首页第六块 -->
		<div class="home6">
			<img src="../../assets/img/xbanner.jpg" alt="">
		</div>
		<!-- 首页第六块 -->
		<!-- 首页第七块 -->
		<div class="home7 pad20">
			<div class="title">
				<h3>百科小知识</h3>
				<p>提前掌握命运玄机 把握人生转折点 享受幸福美满生活</p>
			</div>
			<div class="home7-btm">
				<ul>
					<li v-for="(item,index) in newslist" :key="index" @click="goDetail(item.articleId)">
						<h3>{{item.articleTitle}}<span>{{item.createTime}}</span></h3>
						<p>{{item.articleDesc}}</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- 首页第七块 -->
		
	</div>
</template>

<script>
	import header from 'components/header'
	
	export default {
		data() {
			return {
				title: '首页',
				value: '', //姓氏
				birthday: '', //出生日期
				status: '已出生', //出生状态
				rili: '1', //出生日历
				nums: '2', //名字字数
				phone: '', //手机号码
				sex: '男' ,//性别
				value1: '', //八字姓氏
				birthday1: '', //八字出生日期
				phone1: '', //八字手机号码
				sex1: '0',//八字性别
				newslist: null,
				prolist: null,
				imgurl: this.globals.imgurl
			};
		},
		mounted() {
			// 配置信息
			this.axios.post(`${this.globals.url}api/Common/sysConfig`).then((res) => {
				console.log(res);
				let config = JSON.stringify(res.data.data[3]);
				localStorage.setItem('config',config);
				let demo = JSON.parse(localStorage.getItem('config'));
				console.log(demo);
			}).catch(function(error) {
				console.log(error);
			});
			// 新闻中心
			this.axios.post(`${this.globals.url}api/Common/article`).then((response) => {
				console.log(response);
				let list;
				if(response.data.data.leng>4){
					list = response.data.data.slice(0,4);
					console.log(list);
				}else{
					list = response.data.data;
				}
				this.newslist = list.map(item => {
					item.createTime = item.createTime.split(" ")[0];
					item.articleDesc = item.articleDesc.replace(/\s/g,"");
					return item;
				})
				console.log(this.newslist);
			}).catch(function(error) {
				console.log(error);
			});
			// 首页产品
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
		},
		components: {
			'c-header': header
		},
		methods: {
			subIndex() {
				let tel_test = /^1[0-9]{10}$/;
				if(tel_test.test(this.phone)){
					if(this.value != '' && this.birthday != ''){
						let zxqm = {
							surname: this.value,
							gender: this.sex,
							birthstatus: this.status,
							birthtime: this.birthday,
							namenum: this.nums,
							phone: this.phone,
							timetype: this.rili
						}
						this.$router.push({name:'qimingjieguo',params:zxqm})
						// localStorage.setItem('indexqm' JSON.stringify(zxqm));
						console.log(zxqm);
					}else{
						alert('请填写完整信息！');
					}
				}else{
					alert('请输入正确的手机号！')
				}
			},
			subbazi(){
				console.log(this.value1);
				console.log(this.birthday1);
				console.log(this.phone1);
				console.log(this.sex1);
				this.$router.push({name:'bazisuanming'})
			},
			goDetail(id){
				this.$router.push({name:'news',params:{id: id}})
			},
			bindPro(id){
				this.$router.push({name:'productDetail', params: {proId:id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.title {
		margin: 40px 0;
		text-align: center;

		>h3 {
			font-size: 30px;
			color: #850005;
			margin-bottom: 10px;
		}

		>p {
			font-size: 24px;
			color: #000000;

			>span {
				color: #ff0008;
			}
		}
	}

	.title2 {
		padding: 40px 0;
		text-align: center;

		>h3 {
			font-size: 30px;
			color: white;
			margin-bottom: 10px;
		}

		>p {
			font-size: 24px;
			color: #fff;

			>span {
				color: #fff;
			}
		}
	}

	.home1 {
		&-title {
			text-align: center;
			line-height: 81px;
			font-family: KaiTi;
			font-size: 30px;
			color: #ffffff;
			width: 366px;
			height: 81px;
			margin: 0 auto;
			background: url(../../assets/img/tit.png) no-repeat center center;
			background-size: 100%;
		}

		&-btm {
			margin: 40px 0;

			>div {
				margin-bottom: 30px;
			}

			&-item1 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;
				flex-wrap: wrap;

				>input {
					width: 470px;
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
					width: 470px;
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
					width: 340px;
					height: 60px;
				}
			}

			&-item4 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;

				>select {
					width: 140px;
					height: 68px;
					border-radius: 7px;
					padding-left: 10px;
					background: #fff;
					border: 1px solid #DCDFE6;
					/*no*/
				}

				.tips {
					font-size: 18px;
					color: #850004;
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

	.home2 {
		// background: url(../../assets/img/ys-bg.jpg);
		background: #860205;

		&-btm {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding-bottom: 20px;

			&-item {
				width: 290px;
				height: 350px;
				background: #fff;
				margin-bottom: 20px;
				box-sizing: border-box;
				padding: 30px 20px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.home2-img {
					width: 100px;
					height: 100px;
					box-shadow: 0 0 10px rgba(0, 0, 0, .5);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					>img {
						width: 40px;
						height: 46px;
					}
				}

				>h3 {
					font-size: 30px;
					font-weight: normal;
					color: #850004;
				}

				>p {
					font-size: 22px;
					line-height: 36px;
					color: #333333;
				}
			}
		}
	}
	.home3{
		&-btm{
			box-sizing: border-box;
			padding: 20px;
			border: solid 1px #850004;
			margin: 40px 0;
			>p{
				font-size: 24px;
				line-height: 36px;
				color: #666666;
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
			
			&-item4 {
				font-size: 24px;
				color: #333333;
				display: flex;
				align-items: center;
			
				>select {
					width: 140px;
					height: 68px;
					border-radius: 7px;
					padding-left: 10px;
					background: #fff;
					border: 1px solid #DCDFE6;
					/*no*/
				}
			
				.tips {
					font-size: 18px;
					color: #850004;
				}
			}
		}
	}
	.home4{
		&-btm{
			>img{
				width: 100%;
				margin-bottom: 20px;
			}
			>p{
				font-size: 24px;
				line-height: 36px;
				color: #666666;
			}
			>h6{
				width: 100%;
				height: 60px;
				text-align: center;
				line-height: 60px;
				font-size: 24px;
				font-weight: normal;
				color: #333333;
				background-color: #ffffff;
				
			}
		}
	}
	.home5{
		&-btm{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			&-item{
				width: 290px;
				margin-bottom: 20px;
				.home5-img{
					width: 290px;
					height: 290px;
					>img{
						width: 100%;
						height: 100%;
					}
				}
				>h3{
					font-size: 24px;
					font-weight: normal;
					color: #000000;
					margin: 15px 0 8px 0;
				}
				>p{
					font-size: 30px;
					font-style: italic;
					color: #ff0008;
					>span{
						font-size: 20px;
						color: #666666;
					}
				}
			}
		}
	}
	.home6{
		margin-top: 20px;
		>img{
			width: 100%;
		}
	}
	.home7{
		margin-bottom: 40px;
		&-btm{
			>ul li{
				width: 100%;
				padding: 20px 0;
				border-top: 1px dashed #cccccc;
				&:last-child{
					border-top: 1px dashed #cccccc;
					border-bottom: 1px dashed #cccccc;
				}
				>h3{
					font-size: 24px;
					font-weight: normal;
					margin-bottom: 10px;
					color: #000000;
					display: flex;
					justify-content: space-between;
					>span{
						color: #666666;
					}
				}
				>p{
					font-size: 20px;
					line-height: 36px;
					color: #666666;
				}
			}
		}
	}
</style>
