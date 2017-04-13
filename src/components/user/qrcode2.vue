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
			<qrcode :cls="qrCls" :value="link" type="image" :size="230" level = 'H'></qrcode>
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
			link:'',
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
		}
	},
	created () {
		let _this = this 
		// 获取用户详情
		let pageUrl = window.location.origin + '/#/register';
		axios.post('user/getQrcode',qs.stringify({
			pageUrl: pageUrl
		}),_this.config).then(function(res){
			Indicator.close();
			if (res.data.code === '10000') {
				let link = res.data.url.split('?');
				let usercode = link[1].split('=')[1];
				_this.link = link[0] + '/' + usercode;
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
			Indicator.close();
			Toast('系统错误！')
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