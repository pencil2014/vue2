<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">二级密码</label>
				<div class="ex-field-value">
					<input type="password" placeholder="请输入二级密码" maxlength="20" v-model.trim="psw">
				</div>
			</div>
			<div class="ex-field-wrapper">
				<label class="ex-field-title">确认二级密码</label>
				<div class="ex-field-value">
					<input type="password" placeholder="请再次确认二级密码" maxlength="20" v-model.trim="confirmpsw">
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
import md5 from "blueimp-md5"
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import { Toast,Indicator } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'设置二级密码',
				fixed: false,
			},
	        psw:'',
	        confirmpsw:'',
	        VeryCode:'',
	        phone:'',
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
			let rule1 = !this.psw || !this.confirmpsw||!this.VeryCode;
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
		Indicator.open({ spinnerType: 'fading-circle'})
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.phone = res.data.data.phone
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.close()
			Toast('网络请求超时！')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		submit () {
			let _this = this;
			if(_this.disable||_this.submitBtn){
				return;
			}
			if(!/^\w{6,20}$/.test(_this.psw)){
				Toast('密码只能在6~20位之间,由字母、数字或者下滑线组成')
				return;
			}
			if(_this.psw !== _this.confirmpsw){
				Toast('两次输入密码不一致')
				return;
			}
			_this.submitBtn = true;
			axios.post('user/setTwoPwd',qs.stringify({
				password: md5(_this.confirmpsw),
				phoneCode: _this.VeryCode
			})).then(res =>{
				if (res.data.code === '10000') {
					this.$router.push('/settings')
					Toast('设置成功')
				} else {
					_this.submitBtn = false;
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.submitBtn = false;
				Toast('网络请求超时！')
			})
		},
		sendCode () {
			let _this = this;
			//获取短信验证码
			_this.countdown = true
			Indicator.open({ spinnerType: 'fading-circle'})
			axios.post('verify/sendPhoneCode',qs.stringify({
				phone: _this.phone,
				codeType: 5,
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
					Indicator.close()
					_this.countdown = false
					Toast('网络请求超时！')
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
.ex-field-wrapper .ex-field-value input[type=password],
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 65%;height: 30px;border: none;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.readonly input{color: #586485}
</style> 