<template>
<div class="ex-qrcode">
	<HeadTitle :title="modal" @callback="back"></HeadTitle>
	<div class="ex-qrcode-wrapper">
		<qrcode :cls="qrCls" :value="link" type="image" :size="250"   :padding="0"></qrcode>
		
		<p>请被推荐人扫描此二维码注册</p>
	</div>
	
	<div class="ex-qrcode-link">
		<p class="title">也可以复制下方地址发送给您的朋友注册</p>
		<p class="link">{{link}}</p>
		<p class="copy">
			<a href="javascript:void(0)">长按文本复制链接</a>
		</p>
      </dd>
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
				Toast('网络请求超时！')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		//目前手机浏览器都复制不了
		copyLink () {
			let copyTxt = document.querySelector("input[name=copyTxt]");
			copyTxt.select();
			document.execCommand("copy");
			Toast({
			  message: '复制成功',
			});
		}
	},
	components: {
		HeadTitle,
		Qrcode
	},
}
</script>
<style scoped>
.ex-qrcode{width: 100%;background: #f4f5f7;color: #5d646e;overflow-x: hidden;height: 100%;min-height: 100%;}
.ex-qrcode-wrapper{margin-top: 50px;width: 100%;text-align: center;}
.ex-qrcode-wrapper p{margin-top: 20px;}

.ex-qrcode-link{border-top: solid 1px #e5e5e5;margin: 30px auto;padding-top: 30px;width: 80%;text-align: center;line-height: 15px;}
.ex-qrcode-link .title{padding-bottom: 5px;}
.ex-qrcode-link .link{background: #fff}
.ex-qrcode-link .copy{display: inline-block;margin-top: 12px;background: #fff;border: solid 1px #e5e5e5;padding: 10px 20px;border-radius: 4px;color: #5d646e;}
.ex-qrcode-link .copy a{color: #5d646e;}
.ex-qrcode-wrapper .qrcode{width: 240px;overflow: hidden;margin: auto}
.ex-qrcode-wrapper .qrcode img{width: 250px;}
</style>