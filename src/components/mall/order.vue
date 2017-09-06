<template>
	<div class="ex-mall">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-mall-txt">订单详情</div>
		<div class="ex-mall-product">
			<div class="ex-mall-infoBox">
				<p class="img"><img :src="order.pic" alt=""></p>
				<div class="info">
					<p>商品名：{{order.commodityName}}</p>
					<p class="price">商品单价：<span>{{order.depositMoney}}基金 + {{order.integral}}e积分</span></p>
					<p>数量：{{order.commodityNumber}}</p>
					<p class="price">支付积分：<span>{{order.depositMoneyCost}}基金 + {{order.integralCost}}e积分</span></p>
				</div>
			</div>
		</div>

		<div class="ex-mall-orderinfo">
			<p>下单时间：{{order.createTime}}</p>
			<p>收货地址：{{order.detailedAddress}}</p>
			<p>支付身份：{{order.orderUserType | formatType}}</p>
			<p>订单状态：{{order.status | formatStatus}}</p>
			<p>快递公司：{{order.expressCompany}}</p>
			<p>快递单号：{{order.expressNo}}</p>
		</div>
		
		<div class="ex-mall-action">
			<button type='button' @click='golist'>查看我的订单</button>
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
			order: {
				"createTime": "",
        "commodityName": "",
        "integralCost": "",
        "depositMoneyCost": "",
        "status": "0",
        "integral": "",
        "depositMoney": "",
        "pic": "",
        "commodityNumber": "",
        "orderUserType": "0",
        "expressCompany": "0",
        "expressNo": "0",
        "expressCost": null,
        "detailedAddress": "",
        "userId": null,
        "ordNo": null,
        "id": ""
			},
			modal:{
				text:'积分商城',
				fixed: false
			}
		}
	},
	computed: {
	},
	created () {
		this.id = this.$route.params.id
		this.getorder()
	},
	methods: {
		back () {
			this.$router.back()
		},
		golist () {
			this.$router.push('/orderlist')
		},
		getorder () {
			let _this = this
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/declaration/checkOrder',qs.stringify({
				id: this.id
			})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.order = res.data.data
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(err){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	filters: {
		formatStatus (id) {
			let status = ['待发货','已发货','确认收货']
			return status[id*1]
		},
		formatType (id) {
			return id === '1' ? "会员" : "商家"
		}
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
.ex-mall-txt{margin: 1rem 0; padding: 1rem; background-color: #fff;}

.ex-mall-product{overflow: hidden;font-size: 1.4rem;}
.ex-mall-infoBox {margin-bottom: 1rem; overflow: hidden; color: #212A32;}
.ex-mall-infoBox .img { width: 8rem; height: 8rem; background-color: #fff; overflow: hidden; text-align: center; vertical-align: middle;  float: left; margin: 1rem;}
.ex-mall-infoBox .img img { width: 100%; vertical-align: middle;}
.ex-mall-infoBox .info { margin: 1rem 0 0 10rem; }
.ex-mall-infoBox .info p { margin-bottom: 0.5rem; }
.ex-mall-infoBox .info .price span {color: #DC342D;}
.ex-mall-infoBox .info span {background-color: #FFFAE8;}

.ex-mall-orderinfo{background-color: #fff; padding: 1rem;}
.ex-mall-orderinfo p{padding-bottom: 1rem;}
.ex-mall-action {margin: 1rem;}
.ex-mall-action button{background-color: #0069AD; color: #fff; width: 100%; height: 4rem; border-radius: 0.5rem;}
</style>
