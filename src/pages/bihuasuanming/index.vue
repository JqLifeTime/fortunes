<template>
	<div class="bihua">
		<c-header :title="title"></c-header>
		<div class="bihua1 pad20">
			<div class="title">姓名笔画算命</div>
			<div class="bihua1-btm">
				<p>姓名笔划算命专题是我们精心为大家收集整理的，提供有关于姓名笔划算命的相关知识文章，以及众多网友分享的有
关于姓名笔划算命相关经验和体会，以及其有关问题的提问和解答。</p>
				<div class="bihua1-btm-item1">
					<span>您的姓氏：</span>
					<input type="text" v-model="valuebh1" />
				</div>
				<div class="bihua1-btm-item1">
					<span>您的名字：</span>
					<input type="text" v-model="valuebh2" />
				</div>
				<div class="sub" @click="subbihua" type="primary" v-loading.fullscreen.lock="fullscreenLoading">在线测试</div>
			</div>
		</div>
		<div class="bihua2 pad20" v-if="status == 1">
			<div class="bihua2-title">您的姓名笔画算命解析：</div>
			<div class="bihua2-btm">
				<h3>姓名：<span v-for="i in name">{{i}}</span></h3>
				<div class="culue">
					<div class="culue-l">
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
				<div class="item-title">∞八字命运精批∞</div>
				<div class="bihua2-btm-item3-btm">
					<p>以上分析只是通用性解释，如想知晓自身的性格分析、财运状况、婚姻感情、事业发展、一生运程，可请大师结合你的姓名，给出你更多更详细的解答。</p>
					<div>
						<h6 @click="goMore">
							<img src="../../assets/img/jiesuo.png" alt="">立即解锁精准解析
						</h6>
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
				title: '笔画算命',
				valuebh1: '',
				valuebh2: '',
				cmjg: '',
				status: 0,
				name: '',
				fullscreenLoading: false
			}
		},
		components: {
			'c-header': header
		},
		methods: {
			subbihua() {
				let name1 = this.valuebh1 + this.valuebh2;
				this.name = name1.split('');
				this.fullscreenLoading = true;
				if(this.valuebh1 != ''){
					if(this.valuebh2 != ''){
						this.axios.post(`${this.globals.url}api/Strokes/index`,this.globals.qs.stringify({
								surname: this.valuebh1,
								name: this.valuebh2
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
							console.log(res);
							this.cmjg = res;
						}).catch(function(error) {
							console.log(error);
						});
					}else{
						alert('请填写您的名字！')
					}
				}else{
					alert('请填写您的姓氏！')
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

	.bihua1 {
		margin-bottom: 30px;
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
		}
	}
</style>
