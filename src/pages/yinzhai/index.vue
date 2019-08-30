<template>
	<div class="yangzhai">
		<c-header :title="title"></c-header>
		<div class="yangzhai1">
			<div class="title">风水布局</div>
			<p>中国传统的风水学，提出龙真、穴的、砂环、水抱、四个准则来推定土地生气凝聚之处。</p>
		</div>
		<div class="yangzhai2 pad20">
			<div class="yangzhai2-item1">
				<img src="../../assets/img/yinzhai.jpg" alt="">
				<div class="yangzhai2-item1-text">
					<p><span>阴宅风水</span>，所谓阴宅，是指安葬祖先灵柩的地方，简单的理解就是坟墓。因为先人过世后在这个地方长眠安息，所以它被成为阴宅。作为风水中重要的一部分，阴宅也是十分讲究的。一直以来，中国古代流传下来的思想就认为，祖先安葬在好的风水福地，一定能给子孙后代带来吉祥如意，相反的，假如阴宅风水不好，则会影响到后人的运气，轻者诸事不顺，重者家庭破裂噩运连连。所以，阴宅的重要性是毋庸置疑的。</p>
					<div>
						<h3><img src="../../assets/img/phone.png" alt="">电话预约：<span>0370-11122111</span></h3>
						<h6><router-link to="">在线客服预约</router-link></h6>
					</div>
				</div>
			</div>
		</div>
		<div class="yangzhai3 pad20">
			入土为安，好的阴宅风水，都有什么共同的特点？中国传统的风水学，提出龙真、穴的、砂环、水抱、四个准则来推定土地生气凝聚之处。今天就来说说看看解解标准阴宅风水图，好风水是怎样来的。
		</div>
		<div class="yangzhai4 pad20">
			<ul>
				<li v-for="(item,index) in yinzhai" :key="index" @click="goDetail(item.articleId)">
					<img :src="imgurl+item.articleImg">
					<div class="yangzhai4-text">
						<h3 class="ellipse">{{item.articleTitle}}</h3>
						<p class="ellipse3">{{item.articleDesc}}</p>
					</div>
				</li>
			</ul>
		</div>
		<recommend title :product="prolist"></recommend>
	</div>
</template>

<script>
	import recommend from 'components/recommend'
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '阴宅风水',
				yinzhai: '',
				imgurl: this.globals.imgurl,
				prolist: []
			}
		},
		components:{
			recommend,
			"c-header": header
		},
		mounted(){
			this.axios.post(`${this.globals.url}api/Common/article`,this.globals.qs.stringify({
				type: 1
			})).then((res) => {
				console.log(res);
				if(res.data.status == 1){
					let list = res.data.data.map(item => {
						item.articleDesc = item.articleDesc.replace(/\s/g,"");
						return item;
					})
					this.yinzhai = list;
				}
			}).catch(function(error) {
				console.log(error);
			});
			// 阳宅推荐产品
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
		methods:{
			goDetail(id){
				this.$router.push({name:'news',params:{id: id}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.yangzhai1{
		>p{
			font-size: 24px;
			text-align: center;
			margin: -20px 0 20px 0;
		}
	}
	.yangzhai2{
		&-item1{
			padding: 20px 0;
			display: flex;
			flex-direction: column;
			>img{
				width: 100%;
			}
			&-text{
				>p{
					font-size: 24px;
					margin: 20px 0;
					>span{
						font-size: 28px;
						color: #850004;
					}
				}
				>div{
					display: flex;
					justify-content: space-between;
					font-size: 24px;
					>h3{
						width: 380px;
						height: 60px;
						border: solid 1px #850004;
						display: flex;
						justify-content: center;
						align-items: center;
						>img{
							width: 30px;
							height: 30px;
							margin-right: 10px;
						}
						>span{
							color: #850004;
						}
					}
					>h6{
						width: 200px;
						height: 60px;
						background-color: #850004;
						text-align: center;
						line-height: 60px;
						>a{
							display: block;
							color: white;
						}
					}
				}
			}
		}
	}
	.yangzhai3{
		font-size: 24px;
		color: #850004;
		line-height: 40px;
	}
	.yangzhai4{
		margin: 20px 0 40px 0;
		ul li{
			width: 100%;
			padding: 20px;
			box-sizing: border-box;
			background: #fff;
			display: flex;
			margin-bottom: 20px;
			>img{
				width: 160px;
				height: 160px;
				margin-right: 15px;
			}
			.yangzhai4-text{
				width: 380px;
				>h3{
					font-size: 28px;
					padding-bottom: 10px;
				}
				>p{
					font-size: 24px;
					color: #666;
					line-height: 36px;
				}
			}
		}
	}
</style>
