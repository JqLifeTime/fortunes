<template>
	<div class="mine-navbar">
		<div class="mine-navbar-left" v-if="$slots.left">
			<slot name="left"></slot>
		</div>
		<div class="mine-navbar-center" v-if="$slots.center">
			<slot name="center"></slot>
		</div>
		<div class="mine-navbar-right" v-if="$slots.right">
			<slot name="right"></slot>
		</div>
		<h1 class="mine-navbar-title" v-if="title">
			<span v-text="title"></span>
		</h1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			title:{
				type: String,
				default: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-navbar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100px;
		position: relative;
		&-left{
			margin-left: 10px;
			~ .mine-navbar-right{
				position: static;
			}
		}
		&-center{
			margin: 0 10px;
			flex: 1;
			~ .mine-navbar-right{
				position: static;
			}
		}
		&-right{
			position: absolute;
			right: 0;
			display: flex;
			align-items: center;
			height: 100%;
			margin-right: 10px;
		}
		&-title{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 20%;
			right: 20%;
			display: flex;
			align-items: center;
			
			>span{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				line-height: 1.5;
				width: 100%;
				text-align: center;
			}
		}
	}
</style>
