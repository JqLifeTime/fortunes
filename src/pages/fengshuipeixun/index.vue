<template>
	<div class="peixun">
		<c-header :title="title"></c-header>
		<div class="px1 pad20">
			<div class="title">风水培训</div>
			<p class="px1-p">中国有句古话叫“授人以鱼不如授人以渔”，说的是传授给人既有知识，不如传授给人学习知识的方法。
应用到风水学习中，即是帮你看风水解决眼前的问题，不如教你如何看风水，不单能够帮助自己还能够帮助身边的人解决问题。
别人的帮助只在于一时，而个人的学习得来的知识却能受益终生.</p>
			<p class="px1-h3">您离真正的风水大师仅差一步之遥,传播”寻龙点穴”千年风水绝学和”阳宅风水绝学”,一对一开坛授课,我们旨在通过学习改善个人不佳风水的同时，也能够帮助身边的人解决此类问题，一人受益，惠及周围。</p>
		</div>
		<div class="px2 pad20">
			<ul>
				<li v-for="(item,index) in fengshui" :key="index" @click="goDetail(item.articleId)">
					<img :src="imgurl+item.articleImg">
					<div class="yangzhai4-text">
						<h3 class="ellipse">{{item.articleTitle}}</h3>
						<p class="ellipse3">{{item.articleDesc}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '风水培训',
				fengshui: ''
			}
		},
		components: {
			"c-header": header
		},
		mounted(){
			this.axios.post(`${this.globals.url}api/Common/article`,this.globals.qs.stringify({
				type: 3
			})).then((res) => {
				console.log(res);
				if(res.data.status == 1){
					let list = res.data.data.map(item => {
						item.articleDesc = item.articleDesc.replace(/\s/g,"");
						return item;
					})
					this.fengshui = list;
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods: {
			goDetail(id){
				this.$router.push({name:'news',params:{id: id}})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.px1{
		>p{
			font-size: 24px;
			line-height: 40px;
		}
		&-p{
			text-align: center;
		}
		&-h3{
			color: #850004;
			padding: 25px 0;
		}
	}
	.px2{
		margin-bottom: 40px;
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
			.px2-text{
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
