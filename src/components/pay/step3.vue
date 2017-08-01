<template>
	<div class="ex-warpper">
		<div v-if="status === '1'">
			<div class="head">
				<div class="money">
					<p>支付金额</p>
					&yen;{{money | checknum}}
				</div>
				<div class="shopname">
					<img src="../../assets/images/shop.png" alt="">
					<span>{{shopname || '平安银行特约商户'}}</span>
				</div>
			</div>
			<div class="top">
				<img src="../../assets/images/pack.png" alt=""><br>
				<p v-if="!isReview">
					<span class="active">{{money | checknum}}元</span>&nbsp;
					现金分享已存入您的e享账户
				</p>
				<p v-if="isReview">
					消费成功，审核后可领取e享现金分享
				</p>
			</div>
			<div class="btn">
				<input @click="toCheck" type="button" value="立即查看 >" />
			</div>
		</div>
		<div v-else>
			<div class="topImg">
				<img src="../../assets/images/paytop2.png" alt="">
			</div>
			<div class="btn blue">
				<input @click="toCheck" type="button" value="立即查看" />
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , Indicator , MessageBox} from 'mint-ui'
export default {
	data () {
		return{
			money: '0',
			shopname: '',
			isReview: false,
			outNo: '',
			status: '',
		}
	},
	computed: {

	},
	created () {
		this.outNo = this.$route.query.outNo
		this.status = this.$route.query.status
		if (this.outNo && this.outNo !== undefined && this.outNo.indexOf('undefine') === -1) {
			this.checkOrder()
		}else {
			this.money = this.$route.query.amount ? this.accDiv(this.$route.query.amount,100) : '0'
			this.isReview = true
		}
	},
	methods: {
		checkOrder () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.create({
				headers: {'authorization': ''}
			}).post('/consume/checkOrder',qs.stringify({outNo: this.outNo}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.shopname = res.data.data.shopName
					_this.money = res.data.data.money
					if(_this.money > 5 || res.data.data.limitStatus*1 === 1){
						_this.isReview = true
					}
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		toCheck () {
			this.$router.push('/login')
		},
		accDiv (arg1,arg2) {
			var t1=0,t2=0,r1,r2;
			try{t1=arg1.toString().split(".")[1].length}catch(e){}
			try{t2=arg2.toString().split(".")[1].length}catch(e){}
			r1=Number(arg1.toString().replace(".",""))
			r2=Number(arg2.toString().replace(".",""))
			return (r1/r2)*Math.pow(10,t2-t1);
		}
	},
	filters: {
		checknum (value) {
			value = value? value+'' : '0'
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		},
	},
	components: {

	},
}
</script>
<style scoped>
.ex-warpper{min-height: 100%;width: 100%;overflow-x: hidden;font-size: 1.6rem;}

.head{background: #fff;padding-left: 10px;margin-bottom: 18px;}
.head .money{color: rgb(33,42,50);font-size: 3rem;text-align: center;line-height: 30px;border-bottom: solid 1px #ebebeb;padding: 30px 0;}
.head .money p{color: rgb(88,100,133);font-size: 1.4rem;}
.head .shopname{padding: 10px 0;font-weight: bold;height: 25px;line-height: 25px;}
.head .shopname img{width: 25px;padding-right: 5px;vertical-align: middle;}

.top{width: 100%;text-align: center;margin-top: 30px;}
.top img{width: 100px;}
.top .active{width: 100%;color: #ea3925;font-size: 2rem;}
.top p{padding: 10px 15px 20px 15px;}
.btn{padding: 0 15px 0 15px;}
.ex-warpper .btn input[type=button]{width: 100%;background: #58c86b;border: none;color: #fff;height: 46px;border-radius: 5px;font-size: 1.6rem;}
.ex-warpper .btn input[type=button]:active{background: rgba(88,200,107,0.8);}
.ex-warpper .btn.blue input[type=button]{background: #047dcb;}
.ex-warpper .btn.blue input[type=button]:active{background: #0470b6;}

.topImg{padding-bottom: 50px;}
.topImg img{width: 100%;}
</style>