<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top">
			<i class="iconfont">&#xe7be;</i><br>
			进件基本资料已提交
			<div class="box">
				您需要和商玖支付（平安银行战略合作伙伴）签订《商户服务协议》以完成申请流程；您需打印并仔细阅读协议，在完全同意协议所有条目后，签字并上传规定格式的协议照片。可以通过以下两种方式完成协议签署：
			</div>
		</div>
		<div class="types">
			<div class="types-item">
				<div class="title">
					<span></span>
					<em>方法一：打开指定链接下载协议</em>
				</div>
				<!-- <span class="explain">在浏览器中打开链接，下载协议；<br>*苹果手机用户请在电脑端打开链接。</span> -->
				<span class="explain"> 
					<span  v-if="type ==='1'">长按复制以下链接在电脑端打开，下载并打印协议。</span>
					<span  v-if="type !=='1'">请在电脑端打开链接，下载并打印协议。
					</span>
				</span>
				<div class="download">
					<a href="http://download.exgj.com.cn/htmb.pdf">http://download.exgj.com.cn/htmb.pdf</a>
					<div class="button-wrap" v-if="type !== '1'">
						<input type="button" value="下载协议" @click="download">
					</div>
				</div>
			</div>
			<div class="types-item">
				<div class="title">
					<span></span>
					<em>方法二：联系客服</em>
				</div>
				<span class="explain">客服人员将指导您完成协议签署事宜</span>
				<div class="service-wrap">
					<div class="service">
						<span>客服电话：</span>
						<a href="tel:0755-23300320">0755-23300320</a>
						<a href="tel:400-6543-888">400-6543-888</a>
					</div>
					<div class="service">
						<span>客服QQ：</span>
						<a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512826&version=1&src_type=web&web_src=oicqzone.com">2852512826</a>
						<a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512824&version=1&src_type=web&web_src=oicqzone.com">2852512824</a>
						<a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512825&version=1&src_type=web&web_src=oicqzone.com">2852512825</a>
					</div>
				</div>
			</div>
			<div class="types-item">
				
			</div>
		</div>
		<div class="save">
			<input type="button" value="下一步，提交合同信息" @click="save">
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},
			countdown: false,
			secondText: '发送',
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disabled () {
		
		},
		type () {
			let ua = navigator.userAgent.toLowerCase()
			if(ua.indexOf('micromessenger') !== -1){
				return '1'
			}else if(ua.indexOf('alipayclient') !== -1){
				return '2'
			}else{
				return '3'
			}
		}
	},
	created () {

	},
	methods: {
		back () {
			this.$router.push('/business');
		},
		download () {
			window.location.href="http://download.exgj.com.cn/htmb.pdf";
		},
		save () {
			this.$router.push('/fillform/step5')
		}
	},
	beforeRouteLeave (to,from,next) {
		let integralPath = window.localStorage.getItem('integralPath')
		if(to.path !== '/fillform/step5'  && to.path !== integralPath && to.path !== '/login'){
			next(integralPath)
		}else{
			next()
		}
	},
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;}
.ex-fillform .top{text-align: center;font-size: 1.8rem;background: #fff;padding: 20px 10px 10px 10px;}
.ex-fillform .top i.iconfont{color: #3dbc3c;font-size: 4rem;}
.ex-fillform .top .box{text-align: left;background: #fff9e3;color: #f05850;padding: 10px;font-size: 1.4rem;margin: 15px 0 5px 0;}
.ex-fillform .types{background: #fff;padding: 20px;margin-top: 15px;text-align: center;}
.ex-fillform .types .types-item{padding-top: 15px;}
.ex-fillform .types .types-item .title{width: 100%;height: 32px;position: relative;text-align: center;}
.ex-fillform .types .types-item .title span{width: 100%;height: 1px;display: inline-block;background: #d8dde4;position: absolute;top: 15px;left: 0;z-index: 0;}
.ex-fillform .types .types-item .title em{display: inline-block;font-size: 1.4rem;color: #5d646e;line-height: 32px;font-weight: bold;background: #fff;padding: 0 14px;position: relative;font-style: normal;z-index: 1;}
.ex-fillform .types .types-item .explain{font-size: 1.4rem;color: #999;display: inline-block;padding-bottom: 15px;}
.ex-fillform .types .types-item .service-wrap .service{font-size: 1.4rem;}
.ex-fillform .types .types-item .service-wrap .service span{display: inline-block;width: 100%;color: #999;}
.ex-fillform .types .types-item .service-wrap .service a{color: #639de7;display: inline-block;padding: 0 10px;}
.ex-fillform .types .types-item .download{font-size: 1.6rem;padding: 0 0 15px;}
.ex-fillform .types .types-item .download a{color: #666;background: #ebebeb;border-radius: 5px;word-break: break-all;}
.ex-fillform .types .types-item .download input[type=button]{background: #fff;border: solid 1px;color: #047dcb;border-radius: 5px;padding: 5px 15px;margin-top: 15px;}
.ex-fillform .types .types-item .download input[type=button]:active{background: #ebebeb;}


.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}


/*.ex-fillform .types .types-item .email-wrap{width: 100%;padding: 0 20px;position: relative;height: 42px;}
.ex-fillform .types .types-item .email-wrap .email{width: 100%;border-radius: 5px;border: solid 1px #d8d8d8;background: #f2f2f2;padding-left: 10px;height: 100%;}
.ex-fillform .types .types-item .email-wrap .sendbtn{position: absolute;top: 3px;right: 23px;height: 36px;border: none;background: #047dcb;color: #fff;border-radius: 5px;padding: 0 20px;}
.ex-fillform .types .types-item .email-wrap .sendbtn:active{background: #0470b6;}*/
</style>

