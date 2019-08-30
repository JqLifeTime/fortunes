<template>
	<div class="foot">
		<span @click="goBeian">备案号：豫ICP备19030186号-2 </span>【易修阁】周易等在中国有着悠久的历史，民间算卦习俗同样有着长远的影响，请科学的对待它们，不要执迷其中
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			goBeian(){
				window.location.href = 'http://beian.miit.gov.cn/'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.foot{
		padding: 30px;
		background-color: #850004;
		font-size: 24px;
		line-height: 36px;
		color: #cccccc;
		text-align: center;
		>a{
			color: #cccccc;
		}
	}
</style>
