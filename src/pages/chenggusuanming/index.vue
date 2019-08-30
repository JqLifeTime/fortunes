<template>
	<div class="chenggu">
		<c-header :title="title"></c-header>
		<div class="cg1 pad20">
			<div class="title">
				称骨算命
			</div>
			<div class="cg1-btm">
				<p>称骨算命法，相传是唐朝周易大师袁天罡先生所创，其法将人的生辰八字，即出生的农历年月日时计算相应的“骨重”，
然后根据“称骨”的总值来进行算命。</p>
				<p>称骨算命说明：出生在夜11-12点，算第二天；闰月上半月算本月，下半月算下月。如闰五月十四，作五月算；闰五月
十六，作六月算。</p>
				<div class="cg1-btm-item3">
					<span>出生年份：</span>
					<div>
						<el-select v-model="year" placeholder="请选择出生年份">
							<el-option v-for="item in yearlist" :key="item.id" :label="item.year" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="cg1-btm-item3">
					<span>出生月份：</span>
					<div>
						<el-select v-model="month" placeholder="请选择出生月份">
							<el-option v-for="item in monthlist" :key="item.id" :label="item.month" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="cg1-btm-item3">
					<span>出生日期：</span>
					<div>
						<el-select v-model="day" placeholder="请选择出生日期">
							<el-option v-for="item in daylist" :key="item.id" :label="item.day" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="cg1-btm-item3">
					<span>出生时间：</span>
					<div>
						<el-select v-model="house" placeholder="请选择出生时间">
							<el-option v-for="item in houselist" :key="item.id" :label="item.hour" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="sub" @click="subcg" type="primary" v-loading.fullscreen.lock="fullscreenLoading">在线算命</div>
			</div>
		</div>
		<div class="cg2 pad20" v-if="status == 1">
			<div class="cg2-title">您好，您提交的信息如下：</div>
			<div class="cg2-btm">
				<!-- <p>您的生辰：2019年6月24日 13时24分 （阳历）/手机号：<span>15700001111</span></p> -->
				<div class="cg2-btm-item1">         
					<h3>∞您的生辰解析∞</h3>
					<div>
						<p>{{birthday}}</p>
					</div>
				</div>
				<div class="cg2-btm-item2">
					<h3>∞您的称骨算命结果如下∞</h3>
					<p>{{detail.title}}</p>
					<p>称骨歌：{{detail.song}}</p>
					<p>称骨歌释义：{{detail.desc}}</p>
					<p>八字命运详解：{{detail.content}}</p>
				</div>
				<div class="cg2-btm-item3">
					<div class="item-title">∞八字命运精批∞</div>
					<div class="cg2-btm-item3-btm">
						<p>以上分析只是通用性解释，如想知晓自身的性格分析、财运状况、婚姻感情、事业发展、一生运程，可请大师结合你的姓名，给出你更多更详细的解答。</p>
						<div>
							<h6 @click="goMore">
								<img src="../../assets/img/jiesuo.png" alt="">我要去解锁更多
							</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '称骨算命',
				year: '',  //称骨出生年份
				month: '',  //称骨出生月份
				day: '',  //称骨出生日期
				house: '',  //称骨出生时间
				rilicg: '0', //称骨出生日历
				phonecg: '', //称骨手机号码
				yearlist: '', //称骨年份列表
				monthlist: '', //称骨月份列表
				daylist: '', //称骨日期列表
				houselist: '', //称骨时间列表
				birthday: '', //生辰
				detail: '',
				status: 0,
				fullscreenLoading: false,
			}
		},
		components:{
			"c-header": header
		},
		created() {
			this.axios.post(`${this.globals.url}api/Bone/index`)
			.then((res) => {
				console.log(res)
				if(res.data.status == 1){
					this.yearlist = res.data.data.yearList;
					this.monthlist = res.data.data.monthList;
					this.daylist = res.data.data.dayList;
					this.houselist = res.data.data.hourList;
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods:{
			subcg(){
				if(this.year != ''){
					if(this.month != ''){
						if(this.day != ''){
							if(this.house != ''){
								this.birthday = this.yearlist[this.year*1-1].year + this.monthlist[this.month*1-1].month + this.daylist[this.day*1-1].day + this.houselist[this.house*1-1].hour
								this.fullscreenLoading = true;
								this.axios.post(`${this.globals.url}api/Bone/matching`,this.globals.qs.stringify({
										year: this.yearlist[this.year*1-1].weight,
										month: this.monthlist[this.month*1-1].weight,
										day: this.daylist[this.day*1-1].weight,
										hour: this.houselist[this.house*1-1].weight
									}))
								.then((response) => {
									console.log(response)
									this.status = 1;
									this.fullscreenLoading = false;
									this.detail = response.data.data;
								}).catch(function(error) {
									console.log(error);
								});
							}else{
								alert('请选择出生时间！')
							}
						}else{
							alert('请选择出生日期！')
						}
					}else{
						alert('请选择出生月份！')
					}
				}else{
					alert('请选择出生年份！')
				}
			},
			goMore(){
				this.$router.push({name: 'bazisuanming'});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	
	.cg1{
		margin-bottom: 40px;
		&-btm {
			border: 1px solid #850004; /*no*/
			padding: 20px;
			>p {
				font-size: 24px;
				line-height: 36px;
				color: #333333;
				margin-bottom: 20px;
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
	.cg2{
		margin-bottom: 40px;
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
			>div{
				margin-top: 30px;
			}
			>p{
				font-size: 24px;
				text-align: center;
				>span{
					color:#850004;
				}
			}
			&-item1{
				>h3{
					width: 100%;
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 26px;
					font-weight: 600;
					color: #850004;
					background-color: #e6e6e6;
				}
				>div{
					padding: 20px;
					border: 1px solid #ccc;
					>p{
						text-align: center;
						font-size: 24px;
						line-height: 38px;
						color: #333333;
						&:last-child{
							color: #850004;
						}
					}
				}
			}
			&-item2{
				>h3{
					width: 100%;
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 26px;
					font-weight: 600;
					color: #850004;
					background-color: #e6e6e6;
				}
				>p{
					padding: 20px;
					border: 1px solid #ccc;
					border-top: none;
					text-align: center;
					font-size: 24px;
					line-height: 38px;
					color: #333333;
				}
			}
			&-item3{
				&-btm{
					border: 1px solid #ccc; /*no*/
					padding: 20px;
					border-top: none;
					>p{
						font-size: 24px;
						margin-bottom: 20px;
						line-height: 36px;
						text-align: center;
					}
					>div{
						width: 100%;
						height: 180px;
						background: url(../../assets/img/jieguo.png);
						background-size: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						>h6{
							width: 280px;
							height: 70px;
							background: #850004;
							border-radius: 10px;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24px;
							color: white;
							>img{
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
</style>
