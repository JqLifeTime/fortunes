<template>
	<div class="qiming">
		<c-header :title="title"></c-header>
		<div class="qiming1 pad20">
			<div class="title">
				专业大师人工起名预约基本信息
			</div>
			<div class="qiming1-btm">
				<p>专业国学大师人工起名,35年八字人工起名经验,直到客户满意为止,获得众多家长的满意与肯定!大师人工分析生辰,可
电话沟通讲解起名过程,值得信赖的专业起名机构!</p>
				<div class="qiming1-btm-item1">
					<span>起名姓氏：</span>
					<input type="text" v-model="valueqm" />
				</div>
				<div class="qiming1-btm-item3">
					<span>出生时间：</span>
					<div>
						<el-date-picker value-format="yyyy,MM,dd,HH,mm" v-model="birthdayqm" type="datetime" placeholder="选择日期时间" class="birthday">
						</el-date-picker>
					</div>
				</div>
				<div class="qiming1-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phoneqm" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="subqiming" type="primary" v-loading.fullscreen.lock="fullscreenLoading">在线预约</div>
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
		data(){
			return{
				title: '人工起名',
				valueqm: '',
				riliqm: '0',
				birthdayqm: '',
				phoneqm: '',
				order: {},//订单支付所需对象
				ispay: false,
				fullscreenLoading: false
			}
		},
		components: {
			"c-header": header,
			"c-pay": pay
		},
		methods:{
			subqiming(){
				let config = JSON.parse(localStorage.getItem('config'));
				console.log(config);
				console.log(this.valueqm);
				console.log(this.riliqm);
				console.log(this.birthdayqm);
				console.log(this.phoneqm);
				if(this.valueqm && this.riliqm && this.birthdayqm && this.phoneqm){
					this.fullscreenLoading = true;
					this.axios.post(`${this.globals.url}api/ArtificialName/rname`,this.globals.qs.stringify({
							name: this.valueqm,
							birth: this.birthdayqm,
							phone: this.phoneqm
						}))
					.then((response) => {
						console.log(response);
						if(response.data.status == 1){
							this.fullscreenLoading = false;
							this.order = {
								sta: '起名',
								surname: this.valueqm,
								sex: '',
								phone: this.phoneqm,
								birthday: this.birthdayqm,
								ordersn: response.data.data,
								body: 'artificial_name',
								price: config.Rgming
							}
							this.ispay = true;
							console.log(this.order);
						}
					}).catch(function(error) {
						console.log(error);
					});
				}else{
					this.$message({
						type: 'warning',
						message: '请填写完整信息!'
					});
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.qiming1{
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
</style>
