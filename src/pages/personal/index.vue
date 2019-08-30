<template>
	<div class="personal">
		<c-header :title="title"></c-header>
		<div class="title">个人中心</div>
		<div class="per1 pad20">
			<div class="per1-wdl" v-if="!userId">
				<p>您还没有完成登录哦~</p>
				<p>您可以通过<span @click="dls">登陆</span>或<span @click="zcs">注册</span>来查看个人信息。</p>
			</div>
			<div class="per1-ydl" v-else>
				<p>您好，用户名称{{user}}</p>
				<p><span @click="change">密码修改</span><span @click="tuichu">退出登录</span></p>
			</div>
		</div>
		<div class="per2 pad20" v-if="userId">
			<div class="per2-s">
				<p class="arrow">
					<router-link to="/dingdanzhongxin">
						订单中心
					</router-link>
				</p>
				<p class="arrow">
					<router-link to="/dizhiguanli">
						地址管理
					</router-link>
				</p>
			</div>
		</div>
		<c-tabbar></c-tabbar>
		<div class="dask" v-if="dask">
			<div class="dask-cen" v-if="dlzc == 1">
				<h3>登录</h3>
				<input type="text" placeholder="请输入您的账号" ref="zhanghao" />
				<input type="password" placeholder="请输入您的密码" ref="mima" />
				<h6 @click="singin">登录</h6>
				<h5 @click="registerA">注册</h5>
				<div @click="closeAdd">x</div>
			</div>
			<div class="dask-cen" v-else-if="dlzc == 2">
				<h3>注册</h3>
				<input type="text" placeholder="请输入您的账号" ref="zhanghao1" />
				<input type="password" placeholder="请输入您的密码" ref="mima1" />
				<input type="text" placeholder="请再次输入您的密码" ref="mima2" />
				<h6 @click="register">注册</h6>
				<div @click="closeAdd">x</div>
			</div>
			<div class="dask-cen" v-else>
				<h3>密码修改</h3>
				<input type="password" placeholder="请输入您的原密码" ref="ymm" />
				<input type="password" placeholder="请输入您的新密码" ref="xmm" />
				<input type="password" placeholder="请再次输入您新密码" ref="xmm2" />
				<h6 @click="sureChange">确认修改</h6>
				<div @click="closeAdd">x</div>
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	import tabbar from 'components/tabbar'
	export default {
		inject: ['reload'],
		data() {
			return {
				title: '个人中心',
				status: 0, //是否已经登录
				dask: false, //弹窗显示状态
				dlzc: 0, //登录注册状态
				userId: '',
				user: this.globals.user //用户名
			};
		},
		components: {
			'c-header': header,
			'c-tabbar': tabbar
		},
		mounted() {
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			console.log(this.user);
		},
		methods: {
			sureChange() {
				console.log(this.$refs.ymm.value)
				console.log(this.$refs.xmm.value)
				console.log(this.$refs.xmm2.value)
			},
			change() {
				this.dask = true;
				this.dlzc = 0;
			},
			// 登录框显示
			dls() {
				this.dask = true;
				this.dlzc = 1;
			},
			// 注册显示
			zcs() {
				this.dask = true;
				this.dlzc = 2;
			},
			// 开始登录
			singin() {
				console.log('登录');
				this.axios.post(`${this.globals.url}api/PcUser/pclogin`, this.globals.qs.stringify({
					loginName: this.$refs.zhanghao.value,
					loginPwd: this.$refs.mima.value
				})).then((res) => {
					console.log(res);
					if (res.data.status == 1) {
						this.$message({
							type: 'success',
							message: '登录成功!'
						});
						this.globals.user = this.$refs.zhanghao.value;
						localStorage.setItem('userId', res.data.data.userId);
						this.reload();
					}else{
						this.$message({
							type: 'error',
							message: res.data.msg
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 开始注册
			register() {
				console.log(this.$refs.zhanghao1.value)
				console.log(this.$refs.mima1.value)
				console.log(this.$refs.mima2.value)
				console.log('注册');
				if (this.$refs.mima1.value == this.$refs.mima2.value) {
					this.axios.post(`${this.globals.url}api/PcUser/login`, this.globals.qs.stringify({
						loginName: this.$refs.zhanghao1.value,
						loginPwd: this.$refs.mima1.value,
						loginRePwd: this.$refs.mima2.value
					})).then((res) => {
						console.log(res);
						if (res.data.status == 1) {
							this.$message({
								type: 'success',
								message: '注册成功,请登录!'
							});
							this.dlzc = 1;
						}
					}).catch(function(error) {
						console.log(error);
					});
				} else {
					this.$message({
						type: 'error',
						message: '两次密码不相同!'
					});
				}
			},
			// 注册框跳转
			registerA() {
				this.dlzc = 2;
			},
			tuichu() {
				console.log('退出');
				this.$confirm('您确定要退出当前账号吗?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.removeItem('userId');
					localStorage.removeItem("mycart");
					localStorage.removeItem('address');
					this.$message({
						type: 'success',
						message: '退出成功!'
					});
					this.reload();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});
				});

			},
			closeAdd() {
				this.dask = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";

	.dask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .5);
		z-index: 999;

		&-cen {
			width: 540px;
			padding: 20px;
			border-radius: 10px;
			box-sizing: border-box;
			background: #FFFFFF;
			position: absolute;
			top: 200px;
			left: calc(50% - 270px);

			>h3 {
				text-align: center;
				padding: 15px 0;
				font-size: 30px;
				color: #850004;
			}

			>input {
				width: 100%;
				padding: 0 15px;
				box-sizing: border-box;
				border: 1px solid #ccc;
				background: #FEF9F5;
				height: 70px;
				margin: 10px 0;
				font-size: 24px;
			}

			>h5 {
				width: 100%;
				height: 70px;
				line-height: 70px;
				text-align: center;
				border: 1px solid #ccc;
				font-size: 28px;
				margin: 10px 0;
				border-radius: 10px;
			}

			>h6 {
				width: 100%;
				height: 70px;
				line-height: 70px;
				text-align: center;
				background: #850004;
				color: white;
				font-size: 28px;
				margin: 10px 0;
				border-radius: 10px;
			}

			>div {
				width: 40px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				background: #fff;
				border-radius: 50%;
				position: absolute;
				top: -20px;
				right: -20px;
			}
		}
	}

	.personal {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		background: #FEF9F5;
		padding-bottom: 100px;
	}

	.per1 {
		&-wdl {
			border: 1px solid #ccc;
			/*no*/
			padding: 30px;

			>p {
				font-size: 24px;
				color: #999;
				text-align: center;
				line-height: 60px;

				>span {
					color: #850004;
				}
			}
		}

		&-ydl {
			border: 1px solid #ccc;
			/*no*/
			padding: 30px;

			>p {
				font-size: 24px;
				color: #333;
				line-height: 50px;
				display: flex;
				justify-content: space-between;

				>span {
					color: #850004;
				}
			}
		}
	}

	.per2 {
		margin-top: 20px;

		&-s {
			>p {
				padding: 0 15px;
				border: 1px solid #ccc;
				height: 60px;
				margin-bottom: 20px;

				>a {
					width: 100%;
					height: 100%;
					display: block;
					line-height: 60px;
				}
			}
		}
	}
</style>
