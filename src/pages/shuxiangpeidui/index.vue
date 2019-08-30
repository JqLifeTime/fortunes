<template>
	<div class="shuxiang">
		<c-header :title="title"></c-header>
		<div class="sx1 pad20">
			<div class="title">
				属相配对
			</div>
			<div class="sx1-btm">
				<p>生肖即属相。属相有鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪十二种。属相又都有五行的定义，而五行有相
					生相克的道理。属相五行喜相生，忌相克。
					俗语说：“白马犯青牛，羊鼠一旦休，蛇虎如刀错，龙兔泪交流，金鸡怕玉犬，猪猴不到头。”这是指十二生肖相害。
					宜婚配的生肖配对：“鼠配牛，虎配猪。兔配狗，龙配鸡。马配羊，蛇配猴。”这是指的十二生肖六合。相冲的属相配
					对：“鼠配马、牛配羊、虎配猴、兔配鸡、蛇配猪、龙配狗。”除此之外，还有生肖三合等情形，合则有情，均为最佳
					生肖配对。生肖三合：猴鼠龙三合、虎马狗三合、蛇鸡牛三合、猪兔羊三合。
					总体而言，十二生肖配对的原则，喜相合相生，忌相冲、相刑、相害。属相婚配以相冲最为不利。生肖配对，即根据上
					述理论编排而成。其实八字合婚在算命服务中，是一件非常繁杂的事情，要通过分析男女八字中的很多项对应信息，生
					肖是否相合，对于判定结果的影响，只占其中很小的比例。而且，婚姻主要还是靠两个人共同兴趣、爱好、世界观等及
					感情甚至是物质基础。传统的属相婚配测试只供参考！</p>
				<div class="sx1-btm-item3">
					<span>您的属相：</span>
					<div>
						<el-select v-model="shuxiang1" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="sx1-btm-item1">
					<span>对方属相：</span>
					<div>
						<el-select v-model="shuxiang2" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="sub" @click="subsx" type="primary" v-loading.fullscreen.lock="fullscreenLoading">开始解析</div>
			</div>
		</div>
		<div class="sx2 pad20" v-if="status">
			<div class="sx2-title">您好，您提交的信息如下：</div>
			<div class="sx2-btm">
				<p>您的属相：属{{sx1}}/对方属相：属{{sx2}}</p>
				<div class="sx2-btm-item1">
					<h3>∞ 您的属相配对解析结果如下∞</h3>
					<div v-html="pdjg"></div>
				</div>
				<div class="sx2-btm-item3">
					<div class="item-title">∞八字命运精批∞</div>
					<div class="sx2-btm-item3-btm">
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
				title: '属相配对',
				options: [{
					value: '1',
					label: '鼠'
				}, {
					value: '2',
					label: '牛'
				}, {
					value: '3',
					label: '虎'
				}, {
					value: '4',
					label: '兔'
				}, {
					value: '5',
					label: '龙'
				},{
					value: '6',
					label: '蛇'
				},{
					value: '7',
					label: '马'
				},{
					value: '8',
					label: '羊'
				},{
					value: '9',
					label: '猴'
				},{
					value: '10',
					label: '鸡'
				},{
					value: '11',
					label: '狗'
				},{
					value: '12',
					label: '猪'
				}
				],
				shuxiang1: '',
				shuxiang2: '',
				pdjg: '',
				sx1: '',
				sx2: '',
				fullscreenLoading: false,
				status: false
			}
		},
		components: {
			"c-header": header
		},
		methods: {
			subsx() {
				this.fullscreenLoading = true;
				if(this.shuxiang1 != ''){
					if(this.shuxiang2 != ''){
						this.sx1 = this.options[this.shuxiang1*1-1].label;
						this.sx2 = this.options[this.shuxiang2*1-1].label;
						this.axios.post(`${this.globals.url}api/Zodiac/matching`,this.globals.qs.stringify({
								oshuxiang: this.shuxiang2,
								zshuxiang: this.shuxiang1
							}))
						.then((response) => {
							console.log(response);
							this.fullscreenLoading = false;
							this.status = true;
							this.pdjg = response.data.data[0].result.replace(/\n/g,"<br/>");
						}).catch(function(error) {
							console.log(error);
						});
					}else{
						alert('请选择对方属相！')
					}
				}else{
					alert('请选择您的属相！')
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

	.sx1 {
		margin-bottom: 40px;

		&-btm {
			border: 1px solid #850004;
			/*no*/
			padding: 20px;

			>p {
				font-size: 24px;
				line-height: 36px;
				color: #333333;
				padding-bottom: 20px;
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

	.sx2 {
		margin-bottom: 40px;

		&-title {
			width: 100%;
			height: 80px;
			line-height: 80px;
			text-align: center;
			font-size: 30px;
			color: white;
			background: #ff0008;
		}

		&-btm {
			padding: 20px;
			border: 1px solid #ccc; /*no*/
			>div {
				margin-top: 30px;
			}
			>p {
				font-size: 24px;
				text-align: center;
				>span {
					color: #850004;
				}
			}

			&-item1 {
				>h3 {
					width: 100%;
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 26px;
					font-weight: 600;
					color: #850004;
					background-color: #e6e6e6;
				}
				
				>div {
					padding: 20px;
					border: 1px solid #ccc;
					border-top: none;
					text-align: center;
					font-size: 24px;
					line-height: 38px;
					color: #333333;
					>span{
						color: #850004;
					}
				}
			}

			&-item2 {
				>h3 {
					width: 100%;
					height: 60px;
					line-height: 60px;
					text-align: center;
					font-size: 26px;
					font-weight: 600;
					color: #850004;
					background-color: #e6e6e6;
				}

				>p {
					padding: 20px;
					border: 1px solid #ccc;
					border-top: none;
					text-align: center;
					font-size: 24px;
					line-height: 38px;
					color: #333333;
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
