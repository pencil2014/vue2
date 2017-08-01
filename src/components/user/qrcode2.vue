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
			<div class="code">
				<vue-qrcode :value="link" :options="{ size: 230 }" tag="img"></vue-qrcode>
			</div>
			<div class="tip2">商家可以保存二维码图片，并打印作为支付台码</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox,Indicator,Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import VueQrcode from 'vue-qrcode'
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
	        link:'',
	        ExpandStatus: '',
		}
	},
	created () {
		 this.makeqrcode()
	},
	methods: {
		back () {
			this.$router.back();
		},
		makeqrcode () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})		 		
			axios.all([
			 	axios.post('user/personal'),
	        	axios.post('shop/examine'),
	        	axios.post('shop/shopExpandStatus')
			 ]).then(axios.spread(function (personal,shop,shopExpandStatus){
			 	Indicator.close();
			 	   if(personal.data.code === '10000' && shop.data.code === '10000' && shopExpandStatus.data.code === '10000') {

				 		if(shopExpandStatus.data.data.status !== '3'){
				 			MessageBox('提示','请先通过在线支付申请！').then(action =>{
								if(action === "confirm"){
									_this.$router.back()
								}
							});
							return
						}
				 		_this.link = window.location.origin + '/#/pay?userId=' + personal.data.data.userId + '&shopname=' + encodeURIComponent(shop.data.data.shopsName)
			 	}else{
			 		personal.data.code !== '10000' ? Toast(personal.data.msg) : ''
			 		shop.data.code !== '10000' ? Toast(shop.data.msg) : ''
			 		shopExpandStatus.data.code !== '10000' ? Toast(shopExpandStatus.data.msg) : ''
			 	}
			})).catch(function(){
			 	Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	components: {
		HeadTitle,
		VueQrcode
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
.ex-qrcode .qrcode-content .code { height: 230px; }
.ex-qrcode .qrcode-content #qrcode{width: 230px;margin: auto;}
.ex-qrcode .qrcode-content .tip1{color: rgb(33,42,50);padding: 20px 0;}
.ex-qrcode .qrcode-content .tip2{padding: 30px 60px;}
</style>