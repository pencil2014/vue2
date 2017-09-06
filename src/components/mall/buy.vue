<template>
	<div class="ex-mall">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-mall-addressBox">
			<div class="ex-mall-add" v-if='false'>
				<i class="iconfont icon">&#xe634;</i>
				<span>添加收货地址</span>
				<span class="add"><i class="iconfont">&#xe606;</i></span>
			</div>
			<div class="ex-mall-address" v-else>
				<p class="userinfo"><span class="name">收货人：{{address.name}}</span><span class="phone">{{address.phone}}</span></p>
				<div class="addr">
					<span class="icon"><i class="iconfont">&#xe634;</i></span>
					<span class="address">{{address.addr}}</span>
					<span class="change"><i class="iconfont">&#xe606;</i></span>
				</div>
			</div>
		</div>
		<div class="ex-mall-product">
			<div class="ex-mall-title">{{products.name}}</div>
			<div class="ex-mall-infoBox">
				<p class="img"><img src="../../assets/images/again.png" alt=""></p>
				<div class="info">
					<p>商品名：{{products.name}}</p>
					<p class="price">商品单价：<span>{{products.price1}}基金 + {{products.price2}}e积分</span></p>
					<p>数量：{{count}}</p>
				</div>
			</div>
			<div class="ex-mall-num">
				<span>购买数量</span>
				<div class="action">
					<span class="minus">-</span>
					<b>{{count}}</b>
					<span class="add">+</span>
				</div>
			</div>
			<div class="ex-mall-pay">
				<span class="title">支付方式</span>
				<div class="pay">
					<p>
						<img src="../../assets/images/nochoose.png" alt="" v-show='payway !== "1"'>
						<img src="../../assets/images/choose.png" alt="" v-show='payway === "1"'>
						商家身份 （<span>基金余额：{{userinfo.price1}}</span>，<span>e积分余额：{{userinfo.price2}}</span> ）
					</p>
					<p>
						<img src="../../assets/images/nochoose.png" alt="" v-show='payway !== "2"'>
						<img src="../../assets/images/choose.png" alt="" v-show='payway === "2"'>
						会员身份 （<span>基金余额：{{userinfo.price1}}</span>，<span>e积分余额：{{userinfo.price2}}</span> ）
					</p>
				</div>
			</div>
		</div>
		<div class="ex-mall-order">
			<p class="money">合计：<span>{{products.price1*count}}基金 + {{products.price2*count}}积分</span></p>
			<button type="button" class="exchange">确认兑换</button>
		</div>
	</div>	
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast  } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			id: '',
			address: {
				name: '张小花',
				phone: '17545236954',
				addr: '广东深圳南山科技园广东深圳南山科技园广东深圳南山科技园'
			},
			products: {
				name: '漫步者G4',
				imgUrl: '../../assets/images/again.png',
				price1: 140,
				price2: 140
			},
			userinfo: {
				price1: 450,
				price2: 360
			},
		  count: 2,
		  payway: '1',
			modal:{
				text:'积分商城',
				fixed: false,
			}
		}
	},
	computed: {
	},
	created () {
		this.id = this.$route.params.id
	},
	methods: {
		back () {
			this.$router.back()
		}
	},
	filters: {
	},
	destroyed () {
		Indicator.close()
	},
	components: {
		HeadTitle,
	},
}	
</script>

<style scoped>
.ex-mall {height: 100%; background-color: #f4f5f7;}
.ex-mall-addressBox{margin-bottom: 1rem;}
.ex-mall-add{background-color:#FFFAE8; padding: 0 1rem; line-height: 4rem; font-size: 1.4rem; color: #323232; vertical-align: middle; position: relative;}
.ex-mall-add .icon { color: #666; font-size: 2rem; }
.ex-mall-add .add { display: block; width: 4rem; text-align: center; height: 4rem; position: absolute; right: 0; top: 0;  color: #666;}

.ex-mall-address {padding: 1rem; background-color: #fff;  color: #323232; font-size: 1.4rem; }
.ex-mall-address .userinfo {padding-bottom: 0.5rem; padding-left: 2rem; overflow: hidden;}
.ex-mall-address .userinfo .phone { float: right;  padding-right: 1rem;}
.ex-mall-address .addr { position: relative; }
.ex-mall-address .addr .icon {display: inline-block; vertical-align: top;}
.ex-mall-address .addr .icon i{color: #666; font-size: 2rem;}
.ex-mall-address .addr .address { display: inline-block; width: 80%; }
.ex-mall-address .addr .change { position: absolute; right: 1rem ; top: 0.5rem;}
.ex-mall-address .addr .change i{ color: #999;font-size: 2rem;}

.ex-mall-product{ padding-bottom: 6rem; overflow: hidden;font-size: 1.4rem;}
.ex-mall-title {background-color: #fff;  color: #212A32; padding: 0.5rem 1rem; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }
.ex-mall-infoBox {margin-bottom: 1rem; overflow: hidden; color: #212A32;}
.ex-mall-infoBox .img { width: 8rem; height: 8rem; background-color: #fff; overflow: hidden; text-align: center; vertical-align: middle;  float: left; margin: 1rem;}
.ex-mall-infoBox .img img { width: 100%; vertical-align: middle;}
.ex-mall-infoBox .info { margin: 2rem 0 0 10rem; }
.ex-mall-infoBox .info p { margin-bottom: 0.5rem; }
.ex-mall-infoBox .info .price span {color: #DC342D;}
.ex-mall-infoBox .info span {background-color: #FFFAE8;}

.ex-mall-num{height: 4rem; line-height: 4rem; background-color: #fff; padding:0 1rem; border-bottom: 1px solid #eee; overflow: hidden;}
.ex-mall-num .action{ float: right;height:3rem; margin-top: 0.5rem;line-height: 3rem; }
.ex-mall-num .action span {display: inline-block; height: 3rem; width: 3rem;  text-align: center; background-color: #F5F5F5; font-size: 1.6rem;}
.ex-mall-num .action b{padding: 0 1rem; font-weight: normal;}

.ex-mall-pay {background-color: #fff; padding: 1rem;border-bottom: 1px solid #eee; overflow: hidden; }
.ex-mall-pay .title {float: left;}
.ex-mall-pay .pay {margin-left: 6rem;}
.ex-mall-pay .pay p{ margin-bottom: 1rem; }
.ex-mall-pay .pay img{ width: 1.8rem; vertical-align: middle;}

.ex-mall-order{position: absolute;bottom: 0; left: 0; width: 100%; background-color: #fff; height: 4rem; line-height: 4rem; padding: 1rem; font-size: 1.4rem;}
.ex-mall-order .money{float: left;}
.ex-mall-order .money span{background-color: #FFFAE8;color: #DC342D;}
.ex-mall-order .exchange { height: 4rem; border-radius: 0.5rem; padding: 0 1.5rem; float: right;margin-right: 2rem; background-color: #0069AD; color: #fff;}
</style>
