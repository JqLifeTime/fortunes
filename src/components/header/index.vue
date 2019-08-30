<template>
	<div class="all">
		<div class="header pad20">
			<div class="header-back" @click="goback">
				<i class="iconfont icon-back"></i>
				<span v-text="title"></span>
			</div>
			<div class="header-nav" @click="show">
				<i class="iconfont icon-category"></i>
			</div>
			<transition name="fadeList">
			<div class="header-navlist" v-show="list">
				<div class="header-navlist-title">
					<img src="../../assets/img/dibu.jpg" alt="">
				</div>
				<div class="header-navlist-list pad20">
					<div class="list1" v-for="(item,index) in navlist" :key="index">
						<div class="list1-title">—— {{item.title}} ——</div>
						<ul>
							<li @click="close" class="arrow" v-for="(litem,lindex) in item.list1" :key="lindex">
								<router-link :to="litem.url">{{litem.name}}</router-link>
							</li>
						</ul>
					</div>
				</div>
				<div class="header-navlist-btn">
					<div @click="goHome"><img src="../../assets/img/shouye.png">回到首页</div>
					<div @click="close"><img src="../../assets/img/close.png">关闭导航</div>
				</div>
			</div>
			</transition>
		</div>
		<div class="logo pad20">
			<img src="../../assets/img/logo.png">
			权威国学大师入驻 专业网站值得信赖
		</div>
		<div class="banner">
			<el-carousel trigger="click">
				<el-carousel-item v-for="item in imgurl" :key="item">
					<div><img :src="item" alt=""></div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	import banner1 from 'assets/img/banner1.jpg'
	import banner2 from 'assets/img/banner2.jpg'
	import banner3 from 'assets/img/banner3.jpg'
	export default {
		name: 'Ctabbar',
		data() {
			return {
				list: false,
				imgurl: [banner1, banner2, banner3],
				navlist: [{
					title: '姓名服务',
					list1: [
						{
							name: '在线起名',
							url: '/zaixianqiming'
						},
						{
							name: '人工起名',
							url: '/rengongqiming'
						},
						{
							name: '公司起名',
							url: '/gongsiqiming'
						},
						{
							name: '在线测名',
							url: '/ceming'
						}
					]
				},{
					title: '命理服务',
					list1: [
						{
							name: '八字算命',
							url: '/bazisuanming'
						},
						{
							name: '称骨算命',
							url: '/chenggusuanming'
						},
						{
							name: '笔画算命',
							url: '/bihuasuanming'
						},
						{
							name: '属相配对',
							url: '/shuxiangpeidui'
						}
					]
				},{
					title: '风水服务',
					list1: [
						{
							name: '阳宅布局',
							url: '/yangzhai'
						},
						{
							name: '阴宅布局',
							url: '/yinzhai'
						},
						{
							name: '风水培训',
							url: '/fengshuipeixun'
						}
					]
				},{
					title: '挂件服务',
					list1: [
						{
							name: '开运挂件',
							url: '/kaiyunshangcheng'
						}
					]
				},{
					title: '订单服务',
					list1: [
						{
							name: '起名算命订单查询',
							url: '/dingdanchaxun'
						},
						{
							name: '商城订单',
							url: '/dingdanzhongxin'
						}
					]
				},{
					title: '个人服务',
					list1: [
						{
							name: '个人中心',
							url: '/personal'
						},
						{
							name: '人工客服',
							url: '/cart'
						}
					]
				}
				]
			};
		},
		props:{
			title: {
				type: String,
				default: ''
			}
		},
		methods:{
			goback(){
				this.$router.go(-1); //返回上一层
			},
			goHome(){
				this.$router.push({path:'/'})
				this.close();
			},
			show(){
				this.list = true;
			},
			close(){
				this.list = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.banner{
		height: 400px;
	}
	.fadeList-enter-active {
	  transition: opacity .5s;
	}
	.fadeList-leave-active {
	  transition: all .5s ease;
	}
	.fadeList-enter{
	  opacity: 0;
	}
	.fadeList-leave-to{
		transform: translateX(100%);
		opacity: 0;
	}
	.el-carousel__item{
		height: 400px;
	}
	.el-carousel__item div img {
		width: 100%;
	}
	.logo {
		height: 90px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22px;
		color: #000000;
	
		>img {
			width: 225px;
		}
	}
	
	.header{
		height: 88px;
		background-color: #850005;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
		&-back{
			font-size: 30px;
			display: flex;
			align-items: center;
			>i{
				font-size: 40px;
				margin: 0 10px 0 -10px;
			}
		}
		&-nav{
			>i{
				font-size: 45px;
			}
		}
		&-navlist{
			width: 100%;
			height: 100vh;
			overflow: hidden;
			overflow-y: auto;
			background: #FEF9F5;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
			&-title{
				height: 200px;
				background: #850005;
				>img{
					width: 100%;
				}
			}
			&-list{
				.list1{
					margin-top: 20px;
					&-title{
						text-align: center;
						font-size: 26px;
						font-weight: 600;
						line-height: 1;
						color: #850005;
						padding: 10px 0;
					}
					>ul li{
						height: 80px;
						background: #fff;
						box-sizing: border-box;
						padding: 0 20px;
						margin-bottom: 10px;
						>a{
							display: block;
							width: 100%;
							height: 100%;
							line-height: 80px;
							font-size: 28px;
							color: #333333;
						}
					}
				}
			}
			&-btn{
				display: flex;
				height: 100px;
				margin-top: 30px;
				>div{
					flex: 1;
					height: 100px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 32px;
					background: #850005;
					color: #ffffff;
					border-right: 1px solid #fff; /*no*/
					&:last-child{
						border-right: none;
					}
					>img{
						width: 42px;
						height: 42px;
						margin-right: 7px;
					}
				}
			}
		}
	}
</style>
