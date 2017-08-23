<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-top" v-if="status === '0' || status === '1' || status === '2'">
			<i class="iconfont ex">&#xe609;</i>
			<p class="strong">正在审核中...</p>
			您的二维码收款申请已经进入审核流程，<br>审核时间为1-3个工作日。
		</div>
		<div class="ex-top" v-if="status === '3'">
			<i class="iconfont suc">&#xe7be;</i>
			<p class="strong">审核通过</p>
			二维码收款功能已可用，<br>
			请在 “我的” 页面中查看。 
		</div>
		<div class="ex-top" v-if="status === '4'">
			<i class="iconfont err">&#xe63f;</i>
			<p class="strong">抱歉，审核未通过！</p>
			失败原因：{{remark}}
		</div>
		<div class="save" v-if="status === '4'" @click="edict">
			<input type="button" value="重新编辑">
		</div>
		<div class="save" v-if="status !== '4'" @click="back">
			<input type="button" value="知道了">
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
			status: '',
			remark: ''
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
		let _this = this
		axios.post('/exsd-web/shop/shopExpandStatus',qs.stringify({}))
		.then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.status = res.data.data.status
				_this.remark = res.data.data.remark
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Indicator.close()
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.push('/business');
		},
		edict () {
			this.$router.push('/fillform/step1');
		}
	},
	beforeRouteLeave (to,from,next) {
		let integralPath = window.localStorage.getItem('integralPath')
		if(to.path !== '/fillform/step1'  && to.path !== integralPath && to.path !== '/login'){
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
.ex-fillform .ex-top{background: #fff;width: 100%;text-align: center;color: #8f959e;font-size: 1.6rem;padding: 30px 0;}
.ex-fillform .ex-top .strong{font-size: 2rem;color: #212a32;height: 32px;}
.ex-fillform .ex-top i{font-size: 4.5rem;}
.ex-fillform .ex-top i.ex{color: #ffa100;}
.ex-fillform .ex-top i.err{color: #f0544d;}
.ex-fillform .ex-top i.suc{color: #3dbc3c;}

.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>

