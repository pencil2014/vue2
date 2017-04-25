<template>
<div class="ex-qrcode">
	<div class="head">
		<a class="return" href="javascript:;" @click="back">
		<i class="iconfont">&#xe605;</i><span>返回</span></a>
		商家收款二维码
	</div>
	<div class="qrcode-wrapper">
		<div class="qrcode-content">
			<div class="tip1">扫二维码向我付钱</div>
			<qrcode :cls="qrCls" :value="link" type="image" :size="250" :padding="25"></qrcode>
			<div class="tip2">商家可以保存二维码图片，并打印作为支付台码</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import Qrcode from 'v-qrcode'
import { MessageBox,Indicator,Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'推荐二维码和链接',
				fixed: false
			},
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
	        qrCls: 'qrcode',
	        userData:'',
	        shopData:''
		}
	},
	computed:{
		link () {
			return window.location.origin + '/#/pay?userCode='+ this.userData.userCode + '&userId=' + this.userData.userId + '&shopname=' + encodeURIComponent(this.shopData.shopsName)
		} 
	},
	created () {
		let _this = this
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		})
		axios.post('bankard/list',qs.stringify({})).then(function (res) {
			Indicator.close();
		 	if (res.data.code === '10000') {
		 		let cardlist = res.data.data.length
				if(cardlist === 0){
					MessageBox({
						title:'提示',
						message:'请去添加银行卡',
						showConfirmButton:true,
						showCancelButton:true,
						confirmButtonText:'确认',
						cancelButtonText:'取消',
					}).then(action =>{
						if(action === "confirm"){
							_this.$router.push('/addcard')
						}
					});
					return;
				}
				axios.all([
				 	axios.post('user/personal'),
		        	axios.post('shop/examine')
				 ]).then(axios.spread(function (personal,shop){
				 	if(personal.data.code === '10000' &&　shop.data.code === '10000') {
				 		_this.userData = personal.data.data
				 		_this.shopData = shop.data.data
				 	}else{
				 		Toast('系统错误！')
				 	}
				 })).catch(function(){
					Toast('网络请求超时！')
				})
		 	
		 	}
		}).catch(function(){
			Indicator.close();
			Toast('网络请求超时！')
		})	 
	},
	methods: {
		back () {
			this.$router.back();
		},
	},
	components: {
		HeadTitle,
		Qrcode
	},
}
</script>
<style scoped>
.ex-qrcode{background-color: rgb(7,127,204);width: 100%;height: 100%;}
.ex-qrcode .head,.ex-qrcode .head a{color: #fff;font-size: 2rem;}
.ex-qrcode .head{height: 58px;text-align: center;line-height: 58px;}
.ex-qrcode .head a.return{position: absolute;left: 7px;font-size: 1.8rem;}
.ex-qrcode .head i{font-size: 2rem;}
.ex-qrcode .qrcode-wrapper{width: 100%;}
.ex-qrcode .qrcode-content{background: #fff;border-radius: 5px;color: rgb(170,175,182);text-align: center;font-size: 1.4rem;margin: 15% 15px 0 15px;}
.ex-qrcode .qrcode{}
.ex-qrcode .qrcode-content .tip1{color: rgb(33,42,50);padding: 20px 0;}
.ex-qrcode .qrcode-content .tip2{padding: 30px 60px;}
</style>