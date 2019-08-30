<template>
	<div class="addressgl positionA">
		<c-header :title="title"></c-header>
		<div class="address">
			<div class="address-list1" v-for="(item,index) in addressList" :key="index" v-if="addressList.length != 0">
				<h3 @click="checkAdd(item)"><span>姓名：{{item.userName}}</span><span>手机号：{{item.userPhone}}</span></h3>
				<p @click="checkAdd(item)">地址：{{item.address_s+item.address_xq}}</p>
				<div class="setdefault">
					<div @click="setdefault(item)">
						<h6 class="ischeck" :class="item.isDefault == 1 ? 'checked-address' : ''">
							<img src="../../assets/img/active.png">
						</h6>
						<span>设为默认</span>
					</div>
					<div>
						<h5 @click="write(item)">编辑</h5>
						<h5 @click="deleteAdd(item.addressId)">删除</h5>
					</div>
				</div>
			</div>
			<div class="tianjia">
				<h6 @click="adds()">+ 添加地址</h6>
			</div>
		</div>
		<div class="dask" v-if="dask">
			<div class="dask-cen" v-if="flag == 1">
				<h3>修改地址</h3>
				<input type="text" placeholder="请输入您的名字" v-model="addname" />
				<input type="number" length="11" placeholder="请输入您的电话" v-model="addphone" />
				<v-distpicker @selected="onSelected" :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
				<input type="text" placeholder="请输入您的具体位置" v-model="adddetial" />
				<h6 @click="sureChange">确认修改</h6>
				<div class="close" @click="closeAdd">x</div>
			</div>
			<div class="dask-cen" v-else>
				<h3>添加地址</h3>
				<input type="text" placeholder="请输入您的名字" ref="inp1" />
				<input type="number" length="11" placeholder="请输入您的电话" ref="inp2" />
				<v-distpicker @selected="onSelected1" :province="select1.province" :city="select1.city" :area="select1.area"></v-distpicker>
				<input type="text" placeholder="请输入您的具体位置" ref="inp4" />
				<h6 @click="sureAdd">确认添加</h6>
				<div class="close" @click="closeAdd">x</div>
			</div>
		</div>
	</div>
</template>

<script>
	import header from 'components/header'
	import VDistpicker from 'v-distpicker'
	export default {
		inject:['reload'],
		data() {
			return {
				title: '地址管理',
				addressList: [],
				addname: '',  //修改地址名字
				addphone: '',  //修改地址电话
				adddetial: '',  //修改地址详细地址
				dask: false,
				flag: '',
				select: { province: '河南省', city: '郑州市', area: '金水区' },   //修改地址
				select1: { province: '河南省', city: '郑州市', area: '金水区' },  //添加地址
				changeId: 0,//需要修改的地址id
				userId: ''
			}
		},
		mounted() {
			console.log(this.$route.params.type);
			let userId1 = localStorage.getItem('userId');
			if (userId1) {
				this.userId = userId1;
			}
			this.axios.post(`${this.globals.url}api/Address/index`,this.globals.qs.stringify({
					userId: this.userId
				}))
			.then((res) => {
				console.log(res);
				let newList = res.data.data.map(item => {
					let temp = item;
					temp.address_s = temp.address.replace(/,/g,'');
					return temp;
				})
				console.log(newList)
				this.addressList = newList;
				console.log(this.addressList);
			}).catch(function(error) {
				console.log(error);
			});
		},
		components: {
			'c-header': header,
			VDistpicker 
		},
		methods: {
			// 设置默认地址
			setdefault(item) {
				console.log(item);
				this.axios.post(`${this.globals.url}api/Address/add_adds`,this.globals.qs.stringify({
						userId: this.userId,
						userName: item.userName,
						userPhone: item.userPhone,
						address: item.address,
						address_xq: item.address_xq,
						addressId: item.addressId,
						isDefault: 1
					}))
				.then((res) => {
					console.log(res);
					this.$message({
						type: 'success',
						message: '设置成功!'
					});
					this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 删除地址
			deleteAdd(index) {
				console.log(index);
				this.axios.post(`${this.globals.url}api/Address/del_adds`,this.globals.qs.stringify({
						userId: this.userId,
						addressId: index
					}))
				.then((res) => {
					console.log(res);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			},
			// 编辑地址
			write(item) {
				console.log(item);
				this.dask = true;
				this.flag = 1;
				this.addname = item.userName;
				this.addphone = item.userPhone;
				this.adddetial = item.address_xq;
				this.changeId = item.addressId;
				let city = item.address.split(',');
				this.select = {
					province: city[0],
					city: city[1],
					area: city[2]
				}
			},
			adds() {
				this.dask = true;
				this.flag = 0;
			},
			// 关闭弹窗
			closeAdd() {
				this.dask = false;
			},
			// 选择地址
			checkAdd(item) {
				console.log(item);
				localStorage.setItem('address', JSON.stringify(item));
				this.$router.go(-1); //返回上一层
			},
			onSelected(data) {
			  console.log(data);
			  this.select = {
				province: data.province.value,
				city: data.city.value,
				area: data.area.value
			  }
			},
			onSelected1(data) {
			  console.log(data);
			  this.select1 = {
				province: data.province.value,
				city: data.city.value,
				area: data.area.value
			  }
			},
			// 确认添加
			sureAdd() {
				console.log(this.$refs.inp1.value);
				console.log(this.$refs.inp2.value);
				console.log(this.$refs.inp4.value);
				console.log(this.select1);
				let city = this.select1.province + ',' + this.select1.city + ',' + this.select1.area;
				console.log(this.city);
				let tel_test = /^1[0-9]{10}$/;
				if(this.$refs.inp1.value != ''){
					if(tel_test.test(this.$refs.inp2.value)){
						if(this.$refs.inp4.value != ''){
							this.axios.post(`${this.globals.url}api/Address/add_adds`,this.globals.qs.stringify({
									userId: this.userId,
									userName: this.$refs.inp1.value,
									userPhone: this.$refs.inp2.value,
									address: city,
									address_xq: this.$refs.inp4.value
								}))
							.then((res) => {
								console.log(res);
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								this.reload();
							}).catch(function(error) {
								console.log(error);
							});
						}else{
							this.$message({
								type: 'waring',
								message: '请填写详细地址!'
							});
						}
					}else{
						this.$message({
							type: 'waring',
							message: '请输入正确的手机号!'
						});
					}
				}else{
					this.$message({
						type: 'waring',
						message: '请输入您的姓名!'
					});
				}
			},
			// 确认修改
			sureChange() {
				console.log('修改')
				console.log(this.addname);
				console.log(this.addphone);
				console.log(this.adddetial);
				let city = this.select.province + ',' + this.select.city + ',' + this.select.area;
				this.axios.post(`${this.globals.url}api/Address/add_adds`,this.globals.qs.stringify({
						userId: this.userId,
						userName: this.addname,
						userPhone: this.addphone,
						address: city,
						address_xq: this.adddetial,
						addressId: this.changeId
					}))
				.then((res) => {
					console.log(res);
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
					this.reload();
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/scss/base";
	.dask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,.5);
		z-index: 999;
		&-cen{
			width: 540px;
			padding: 20px;
			border-radius: 10px;
			box-sizing: border-box;
			background: #FFFFFF;
			position: absolute;
			top: 200px;
			left: calc(50% - 270px);
			>h3{
				text-align: center;
				padding: 15px 0;
				font-size: 30px;
				color: #850004;
			}
			>input{
				width: 100%;
				padding: 0 15px;
				box-sizing: border-box;
				border: 1px solid #ccc;
				background: #FEF9F5;
				height: 70px;
				margin: 10px 0;
				font-size: 24px;
			}
			>h6{
				width: 100%;
				height: 70px;
				line-height: 70px;
				text-align: center;
				background: #850004;
				color: white;
				font-size: 28px;
				margin: 10px 0;
			}
			.close{
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
	.distpicker-address-wrapper select{
		width: 100% !important;
		font-size: 26px !important;
		padding: 10px 15px !important;
	}
	.address {
		padding: 20px;
	}

	.addressnull {
		padding: 60px 0;
		text-align: center;
		font-size: 20px;
		color: #999999;
	}

	.address-list1 {
		padding: 20px;
		background: #fff;
		margin-bottom: 20px;
	}

	.address-list1 h3 {
		font-size: 24px;
		font-weight: normal;
		color: #333;
		display: flex;
		justify-content: space-between;
		cursor: pointer;
	}

	.address-list1 p {
		font-size: 24px;
		font-weight: normal;
		line-height: 1;
		color: #666;
		padding: 20px 0;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
	}

	.setdefault {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24px;
		font-weight: normal;
		color: #666;
		margin-top: 15px;
	}

	.setdefault>div {
		display: flex;
	}

	.setdefault>div span {
		margin-left: 10px;
	}

	.setdefault>div>h6 {
		margin-left: 0;
	}

	.setdefault>div>h5 {
		font-weight: normal;
		margin-left: 40px;
		font-size: 24px;
		color: #666;
		cursor: pointer;
	}

	.tianjia {
		padding: 20px;
		background: #fff;
	}

	.tianjia h6 {
		background-color: #850004;
		border-radius: 30px;
		height: 60px;
		line-height: 60px;
		text-align: center;
		font-size: 28px;
		font-weight: normal;
		color: #ffffff;
		cursor: pointer;
	}

	.ischeck {
		width: 35px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
		border-radius: 50%;
		font-size: 24px;
		color: white;
		cursor: pointer;
		margin-left: 25px;
		overflow: hidden;
	}

	.ischeck img {
		width: 100%;
		display: none;
	}

	.checked-address {
		background-color: #ff0000 !important;
	}

	.checked-address img {
		width: 100%;
		display: block;
	}
</style>
