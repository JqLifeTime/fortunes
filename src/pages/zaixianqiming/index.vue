<template>
	<div class="zaixianqiming">
		<c-header :title="title"></c-header>
		<div class="zxqm1">
			<div class="zxqm1-title">专业起名必填信息</div>
			<div class="zxqm1-btm pad20">
				<div class="zxqm1-btm-item1">
					<span>起名姓氏：</span>
					<input type="text" v-model="value" />
				</div>
				<div class="zxqm1-btm-item2">
					<span>起名性别：</span>
					<input type="radio" value="男" v-model="sex" id="nan">
					<label for="nan">男</label>
					<input type="radio" value="女" v-model="sex" id="nv">
					<label for="nv">女</label>
				</div>
				<div class="zxqm1-btm-item2">
					<span>出生状态：</span>
					<input type="radio" value="已出生" v-model="status" id="yi" checked>
					<label for="yi">已出生</label>
					<input type="radio" value="未出生" v-model="status" id="wei">
					<label for="wei">未出生</label>
				</div>
				<div class="zxqm1-btm-item3">
					<span>出生时间：</span>
					<div>
						<select class="rili" v-model="rili">
							<option value="1">公历</option>
							<option value="2">阴历</option>
						</select>
						<el-date-picker v-model="birthday" value-format="yyyy,MM,dd,HH,mm" type="datetime" placeholder="选择日期时间" class="birthday">
						</el-date-picker>
					</div>
				</div>
				<div class="zxqm1-btm-item4">
					<span>起名字数：</span>
					<select name="num" v-model="nums">
						<option value="2">两个字</option>
						<option value="1">一个字</option>
					</select>
					<span class="tips">&nbsp;&nbsp;&nbsp;*不计算姓氏字数</span>
				</div>
				<div class="zxqm1-btm-item1">
					<span>手机号码：</span>
					<input type="number" v-model="phone" placeholder="手机号码方便查询订单（必填项）">
					<span class="tips">*所填信息会被严格保密</span>
				</div>
				<div class="sub" @click="zaixian">在线申请起名</div>
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data(){
			return{
				title: '在线起名',
				value: '', //姓氏
				birthday: '', //出生日期
				status: '已出生', //出生状态
				rili: '1', //出生日历
				nums: '2', //名字字数
				phone: '', //手机号码
				sex: '男' ,//性别
			}
		},
		components: {
			'c-header': header
		},
		methods:{
			zaixian(){
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
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
	.zxqm1 {
		margin-top: 40px;
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
</style>
