<template>
	<div class="ex-mall">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="commodity-top">
			<div class="imgbox">
				<mt-swipe :auto="0">
				  <mt-swipe-item><img src="http://img1.imgtn.bdimg.com/it/u=3198762613,766144830&fm=27&gp=0.jpg" alt=""></mt-swipe-item>
				  <mt-swipe-item><img src="http://scimg.jb51.net/allimg/170316/106-1F316120433152.jpg" alt=""></mt-swipe-item>
				  <mt-swipe-item><img src="http://scimg.jb51.net/allimg/160120/14-160120164646256.jpg" alt=""></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="explain">
				<p>良品铺子手撕面包营养早餐食品蛋糕口袋面包糕点点心零食批发整箱</p>
				<p>
					<span class="integral">140基金 + 140e积分</span>
					<span class="f_right">库存：10</span>
				</p>
			</div>
		</div>
		<div class="commodity-detail">
			<div class="title"><span>—</span>商品详情<span>—</span></div>
			<div class="content">
				<div class="no-data" :class="{'hide': hasdata}">
					<img src="../../assets/images/nodata.png" alt="">
					还没有数据哦~
				</div>
			</div>
		</div>
		<div class="bottom" @click="tobuy">
			<button>立即购买</button>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { InfiniteScroll,Toast,Swipe, SwipeItem } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			modal: {
				text:'积分商城',
				fixed: true
			},
			hasdata: false,
	        nodateStatus: false
		}
	},
	mounted() {
		// hasdata () {
		// 	if(this.nodateStatus && this.list.length === 0){
		// 		return false
		// 	}else{
		// 		return true
		// 	}
		// },
    },
	computed: {

	},
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		back () {
			this.$router.back();
		},
		tobuy () {
			let id = this.$route.params.id
			this.$router.push({name: 'Buy', params: { id: id}})
		}
	},
	filters: {
	
	},
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-mall{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}
.commodity-top{background-color: #fff;margin-top: 4.5rem;}
.commodity-top .imgbox{height: 20rem;background-color: #fff;}
.commodity-top .imgbox img{width: 100%;height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.commodity-top .explain{font-size: 1.4rem;color: #212A32;padding: 0 10px;}
.commodity-top .explain p{padding: 10px 0;}
.commodity-top .explain p:first-child{border-bottom: solid 1px #ebebeb;}
.commodity-top .explain .integral{color: #DC342D;background-color: #FFFAE8;margin-top: 10px;}
.commodity-top .explain .f_right{float: right;color: #999;}
.commodity-detail{margin-top: 15px;margin-bottom: 72px;background-color: #fff;padding: 0 10px;}
.commodity-detail .title{text-align: center;padding: 10px 0;border-bottom: solid 1px #ebebeb;}
.commodity-detail .title span{color: #d6d6d6;}
.commodity-detail .content{padding: 10px 0;}

.no-data{width: 100%;text-align: center;color: #999;line-height: 30px;}
.no-data img{display: block;width: 150px;margin:10% auto 10% auto;}
.hide{display: none;}

.bottom{position: fixed;width: 100%;bottom: 0px;padding:10px 8px;border-top: solid 1px #ebebeb;background: #fff;}
.bottom button{display: inline-block;font-size: 1.6rem;height: 50px;color: #fff;background: #047dcb;width: 100%;border-radius: 4px;}
.bottom button:active{background: #0470b6;}
</style>