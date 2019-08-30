<template>
	<div class="news">
		<c-header :title='title'></c-header>
		<div class="news1 pad20">
			<div class="news1-title">
				<h3>{{newDetail.articleTitle}}</h3>
				<p>发布日期：{{newDetail.createTime}}  阅读量：{{newDetail.staffId}}</p>
			</div>
			<div class="news1-btm" v-html="newDetail.articleContent"></div>
		</div>
		<recommend title :product="newDetail.goodsList"></recommend>
	</div>
</template>

<script>
	import recommend from 'components/recommend'
	import header from 'components/header'
	export default {
		data() {
			return {
				title: '新闻详情',
				newDetail: '',
				proid: ''
			}
		},
		components:{
			recommend,
			"c-header": header
		},
		mounted() {
			console.log(this.$route.params.id);
			this.proid = this.$route.params.id;
			this.axios.post(`${this.globals.url}api/Common/article`,this.globals.qs.stringify({
				articleId: this.proid
			})).then((res) => {
				console.log(res);
				if(res.data.status == 1){
					res.data.data[0].articleContent = res.data.data[0].articleContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
					this.newDetail = res.data.data[0];
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.news1{
		&-title{
			margin-top: 30px;
			>h3{
				font-size: 30px;
				font-weight: 600;
				text-align: center;
			}
			>p{
				font-size: 24px;
				color: #666;
				text-align: center;
				padding: 15px 0;
				border-bottom: 1px solid #ccc; /*no*/
			}
		}
		&-btm{
			margin: 20px 0;
			>p{
				text-indent: 2em;
				font-size: 24px;
				color: #333;
				line-height: 40px;
				>img{
					width: 100% !important;
				}
			}
			>img{
				width: 100% !important;
			}
		}
	}
</style>
