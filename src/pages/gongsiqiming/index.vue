<template>
	<div class="company">
		<c-header :title="title"></c-header>
		<div class="company1 pad20">
			<div class="title">
				专业大师起公司名预约基本信息
			</div>
			<div class="company1-btm">
				<p>公司独家分析报告优惠: 不同优惠套餐选择，言诺公司起名-命名专业能力国内优秀,不名则已,一名惊人!公司起名加
微信,查询案例,预约公司起名服务!</p>
				<div class="company1-btm-item1">
					<span>负  责  人  ：</span>
					<input type="text" v-model="people">
				</div>
				<div class="company1-btm-item1">
					<span>公司类型：</span>
					<input type="text" v-model="companyName">
				</div>
				<div class="company1-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="companyPhone" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="gsqm">在线预约</div>
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
				title: '人工公司起名',
				people: '',
				companyPhone: '',
				companyName: '',
				ispay: false,
				order: {}
			}
		},
		components: {
			"c-header": header,
			"c-pay": pay
		},
		methods:{
			gsqm(){
				if(this.people && this.companyPhone && this.companyName){
					this.fullscreenLoading = true;
					this.axios.post(`${this.globals.url}api/ArtificialName/gname`,this.globals.qs.stringify({
							name: this.people,
							type: this.companyName,
							phone: this.companyPhone
						}))
					.then((response) => {
						console.log(response);
						let config = JSON.parse(localStorage.getItem('config'));
						if(response.data.status == 1){
							this.fullscreenLoading = false;
							this.order = {
								sta: '起名',
								surname: this.people,
								sex: '',
								phone: this.companyPhone,
								birthday: '',
								ordersn: response.data.data,
								types: this.companyName,
								body: 'artificial_name',
								price: config.Ggming
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
	.company1{
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
