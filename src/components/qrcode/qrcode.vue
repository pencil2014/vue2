<template>
<div class="ex-qrcode">
	<HeadTitle :title="modal" @callback="back"></HeadTitle>
	<div class="ex-qrcode-wrapper">
		<dl class="ex-qrcode-codeIMG">
			<dt>
				<img :src="code" alt="">
			</dt>
			<dd>请被推荐人扫描此二维码注册</dd>
		</dl>
		<div class="ex-qrcode-link">
			<p class="title">也可以复制下方地址发送给您的朋友注册</p>
			<p class="link">{{link}}</p>
			<p class="copy">
				<a href="javascript:void(0)">复制链接</a>
				<input @click="copyLink" type="text" v-model="link" name="copyTxt" readonly>
			</p>
	      </dd>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
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
	        }
		}
	},
	computed: {
		code () {
			let rule = /120.77.22.9/gi;
			if(this.link){
				if(rule.test(axios.defaults.baseURL)){
					return 'http://www.exgj.com.cn:8080/exsd-web/user/getImg.png?url='+escape(this.link)
				}else{
					return axios.defaults.baseURL+'user/getImg.png?url='+escape(this.link)
				}
			}
		}
	},
	components: {
		HeadTitle
	},
	created () {
		let _this = this 
		// 获取用户详情
		let pageUrl = window.location.origin + '/register';
		axios.post('user/getQrcode',qs.stringify({
			pageUrl: pageUrl
		}),_this.config).then(function(res){
			Indicator.close();
			if (res.data.code === '10000') {
				_this.link = res.data.url;
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
				Indicator.close();
				MessageBox('提示', '系统出错了，正在修复中...')
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
	}
}
</script>
<style scoped>
.ex-qrcode{width: 100%;background: #f4f5f7;color: #5d646e;overflow-x: hidden;height: 100%;min-height: 100%;}
.ex-qrcode-wrapper{}
.ex-qrcode-codeIMG{margin: 12% auto 0;}
.ex-qrcode-codeIMG dt img{display: block;margin:auto;width: 230px;border-radius: 4px;min-height: 230px;}
.ex-qrcode-codeIMG dd{font-size: 1.6rem;width: 100%;text-align: center;line-height: 30px;}
.ex-qrcode-link{border-top: solid 1px #e5e5e5;margin: 30px auto;padding-top: 30px;width: 80%;text-align: center;line-height: 15px;}
.ex-qrcode-link .title{padding-bottom: 5px;}
.ex-qrcode-link .link{}
.ex-qrcode-link .copy{display: inline-block;margin-top: 12px;background: #fff;border: solid 1px #e5e5e5;padding: 10px 20px;border-radius: 4px;color: #5d646e;position: relative;}
.ex-qrcode-link .copy a{color: #5d646e;}
.ex-qrcode-link .copy:active{background: #ebebeb;}
input[name="copyTxt"]{height: 100%;filter:alpha(opacity=0);opacity: 0;position: absolute;top: 0;left: 0px;width: 100%;}
</style>