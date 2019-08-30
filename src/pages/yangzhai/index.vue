<template>
	<div class="yangzhai">
		<c-header :title="title"></c-header>
		<div class="yangzhai1">
			<div class="title">风水布局</div>
			<p>所谓人因宅而立，宅因人得存，人宅相扶，感通天地，自古以来就讲究人宅相配，利用风水布局改善居住环境！</p>
		</div>
		<div class="yangzhai2 pad20">
			<div class="yangzhai2-item1">
				<img src="../../assets/img/yangzhai.jpg" alt="">
				<div class="yangzhai2-item1-text">
					<p><span>家居风水</span>可以对家居的外部环境和室内环境进行细致分析、观形察势，以人为核心，贯穿家居的选择环境、优化环境、改造环境的过程中，已形成一套完整的体系。家居风水在住宅上的体现首先表现在房屋的外部环境，通过住宅与周边环境各个细节的相互关系，趋吉辟凶。与外部选址相比，内部的布置也是尤为重要的，从大门的布置到卧室床位的摆放，从主色调的选用到家居饰物的摆放，大门有大门的风水，客厅有客厅的风水，面面俱到，细致而实用。</p>
					<div>
						<h3><img src="../../assets/img/phone.png" alt="">电话预约：<span>0370-11122111</span></h3>
						<h6><router-link to="">在线客服预约</router-link></h6>
					</div>
				</div>
			</div>
			<div class="yangzhai2-item1">
				<img src="../../assets/img/yangzhai1.jpg" alt="">
				<div class="yangzhai2-item1-text">
					<p><span>公司风水</span>主要讲究旺运、财运而显得更为细致而复杂；要讲究天时、地利、人和，所谓成功则天时、地利、人和三者俱全。天时反映宜经营场所的环境风水，不同性质的经营场所都有与之相适应的环境风水的要求；地利方面则是选择一个藏风聚气的好环境，无论是新建商业区还是写字楼，都要选择一处风水旺地；人和既有内部员工的团结又要内部好的布局，这就需要考虑到公司内部环境风水、领导办公室、财务室布局等方面。</p>
					<div>
						<h3><img src="../../assets/img/phone.png" alt="">电话预约：<span>0370-11122111</span></h3>
						<h6><router-link to="">在线客服预约</router-link></h6>
					</div>
				</div>
			</div>
		</div>
		<div class="yangzhai3 pad20">
			我国自古以来，凡事都讲究“天时、地利、人和”。所以下面，让我们一起来去看一看，学习一下，风水布局的知识要点，并掌握如何打造一个好的风水布局。
		</div>
		<div class="yangzhai4 pad20">
			<ul>
				<li v-for="(item,index) in yangzhai" :key="index" @click="goDetail(item.articleId)">
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
				title: '阳宅风水',
				yangzhai: '',
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
				type: 2
			})).then((res) => {
				console.log(res);
				if(res.data.status == 1){
					let list = res.data.data.map(item => {
						item.articleDesc = item.articleDesc.replace(/\s/g,"");
						return item;
					})
					this.yangzhai = list;
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
			border-bottom: 1px solid #850004; /*no*/
			display: flex;
			flex-direction: column;
			&:last-child{
				border-bottom: none;
			}
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
