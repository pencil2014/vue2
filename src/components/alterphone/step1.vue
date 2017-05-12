<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">原手机</label>
				<div class="ex-field-value readonly">
					<input type="text" maxlength="11" readonly="readonly" v-model="originalPhone">
				</div>
			</div>
			<div class="ex-field-wrapper">
				<label class="ex-field-title">短信验证码</label>
				<div class="ex-field-value">
					<input type="text" placeholder="请输入验证码" maxlength="10" v-model.trim="VeryCode">
					<input type="button" name="" v-model.trim="secondText" @click="sendCode" :disabled='countdown'>
				</div>
			</div>
		</div>
		<Btn 
			text="下一步"  
			:disableBtn="disable"
			@callback="submit"
		>
		</Btn>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import { Toast,Indicator } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'更换注册手机',
				fixed: false,
			},
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
	        phone:'',
	        VeryCode:'',
	        countdown: false,
			second: '短信验证码',
			submitBtn: false
		}
	},
	components: {
		HeadTitle,
		Btn,
	},
	computed: {
		disable () {
			let rule1 = !this.phone || !this.VeryCode;
			if(rule1){
				return true
			}else{
				return false
			}
		},
		originalPhone () {
			return this.phone.replace(/^(\d{3})(\d{5})(\d{3})$/, '$1*****$3')
		},
		secondText () {
			if (/^\d*$/.test(this.second)) {
				return this.second + '秒'
			}else{
				return this.second
			}
		}
	},
	created () {
		let _this = this;
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.phone = res.data.data.phone
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.open({ spinnerType: 'fading-circle'})
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		submit () {
			let _this = this;
			if(_this.disable){
				return;
			}
			if(_this.submitBtn){
				return 
			}
			_this.submitBtn = true;
			axios.post('user/updateRegPhone1',qs.stringify({
				phoneCode: _this.VeryCode
			})).then(res =>{
				if (res.data.code === '10000') {
					_this.$router.push('/alterphone/step2')
				} else {
					_this.submitBtn = false;
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.submitBtn = false;
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		},
		sendCode () {
			let _this = this;
			//获取短信验证码
			_this.countdown = true
			Indicator.open({ spinnerType: 'fading-circle'})
			axios.post('verify/sendPhoneCode',qs.stringify({
				phone: _this.phone,
				codeType: 3,
				smsType: 1
			})).then(res =>{
				Indicator.close()
				if (res.data.code === '10000') {
					Toast('请查收您的短信')
					_this.countdownFn();
				} else {
					_this.countdown = false
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.countdown = false
				Indicator.close()
				Toast('系统出错了')
			})

		},
		countdownFn () {
			let _this = this
			_this.second = 120;
			let timer = setInterval(function(){
				_this.second -= 1
				if (_this.second < 0) {
					_this.countdown = false
					_this.second = '短信验证码'
					clearInterval(timer)
				}
			},1000)
		}
	},
	destroyed () {
		Indicator.close()
	}
}
</script>
<style scoped>
.ex-username{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-top: 16px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 30%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 65%;height: 30px;border: none;font-size: 1.4rem;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.readonly input{color: #586485}
</style> 