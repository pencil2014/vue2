<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">新手机</label>
				<div class="ex-field-value">
					<input type="tel" maxlength="11" placeholder="请输入新手机号" v-model.trim="phone">
				</div>
			</div>
			<div class="ex-field-wrapper">
				<label class="ex-field-title">短信验证码</label>
				<div class="ex-field-value">
					<input type="text" placeholder="请输入验证码" maxlength="10" v-model.trim="phoneCode">
					<input type="button" name="" value="短信验证码" @click="sendCode" v-model.trim="secondText" :disabled='countdown'>
				</div>
			</div>
		</div>
		<Btn 
			text="提交"  
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
	        phoneCode:'',
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
			let rule1 = !this.phone || !this.phoneCode;
			if(rule1){
				return true
			}else{
				return false
			}
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
		axios.post('/exsd-web/user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.originalPhone = res.data.data.phone
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		submit () {
			let _this = this;
			let rule1 = /^1\d{10}$/;
			if(_this.disable){
				return
			}
			if(!rule1.test(_this.phone)){
				Toast('手机号码不正确！')
				return 
			}
			if(_this.submitBtn){
				return 
			}
			_this.submitBtn = true;
			axios.post('/exsd-web/user/updateRegPhone2',qs.stringify({
				phone:_this.phone,
				phoneCode: _this.phoneCode
			})).then(res =>{
				if (res.data.code === '10000') {
					Indicator.open({
					  text: '正在退出登录...',
					  spinnerType: 'fading-circle'
					})
					axios.post('/exsd-web/user/loginOut',qs.stringify({}))
					.then(function(res){
						Indicator.close()
						if(res.data.code === '10000'){
							window.localStorage.removeItem('token')
							window.localStorage.removeItem('usertype')
							Toast('修改成功，请重新登陆！')
							_this.$router.push('/login')
						}else{
							Toast(res.data.msg)
						}
					}).catch(function(){
						Indicator.close()
						Toast('连接失败，请检查网络是否正常!')
					})
				} else {
					_this.submitBtn = false;
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.submitBtn = false;
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		sendCode () {
			let _this = this;
			let rule1 = /^1\d{10}$/;
			if(_this.phone === ""){
				Toast('新手机号不能为空')
				return
			}
			if(!rule1.test(_this.phone)){
				Toast('手机号码不正确！')
				return 
			}
			if(_this.originalPhone === _this.phone){
				Toast('新手机号码不能与原手机号码一致')
				return
			}
			_this.countdown = true
			Indicator.open({ spinnerType: 'fading-circle'})
			//获取短信验证码
			axios.post('/exsd-web/verify/sendPhoneCode',qs.stringify({
				phone: _this.phone,
				codeType: 4,
				smsType: 1
			})).then(res =>{
				Indicator.close()
				if (res.data.code === '10000') {
					Toast('请查收您的短信')
					_this.countdownFn();
				} else {
					Toast(res.data.msg)
					_this.countdown = false
				}
			}).catch(function(){
				_this.countdown = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
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
		},
	},
}
</script>
<style scoped>
.ex-username{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-top: 16px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 30%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 65%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
</style> 