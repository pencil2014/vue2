<template>
	<div class="ex-realname">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*身份证信息只能提交一次，不能随意修改，请慎重填写</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">真实姓名</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入真实姓名" maxlength="10" v-model.trim="realName" @input="standard('realName')" ref="input">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">身份证号码</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入身份证号码" maxlength="18" v-model.trim="idCard" >
					</div>
				</div>
			</div>
		</div>
		<div class="ex-form">
			<p>*验证你的注册手机号：{{phone}}</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">短信验证码</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入验证码" maxlength="6" v-model.trim="phoneCode">
						<input type="button" name="" v-model.trim="secondText" @click="sendCode" :disabled='countdown'>
					</div>
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
import { Toast,MessageBox,Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
export default {
	data(){
		return{
			modal: {
				text:'实名认证',
				fixed: false
			},

			phone:'',
			realName:'',
			idCard:'',
			phoneCode:'',
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '审核中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
	        _Promise:'',
			countdown: false,
			second: '短信验证码',
			submitBtn: false
		}
	},
	components: {
		HeadTitle,
		Btn
	},
	computed:{
		disable () {
			let rule = !this.realName || !this.idCard || !this.phoneCode
			if(rule){
				return true
			}
			return false
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
			Toast('系统出错了，正在修复中...')
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g,'')
		},
		submit(){
			let _this = this;
			let rule1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
			if(_this.disable){
				return;
			}
			if(!rule1.test(_this.idCard)){
				Toast('请输入正确的身份证号码')
				return;
			}
			if(_this.submitBtn){
				return 
			}
			let _Promise = this.checkIdCard()
			_Promise.then( function () {
				_this.submitBtn = true;
				axios.post('verify/realName',qs.stringify({
					realName: _this.realName,
					idCard: _this.idCard,
					phoneCode: _this.phoneCode
				}),_this.config).then(res =>{
					Indicator.close();
					if (res.data.code === '10000') {
						MessageBox('恭喜！',
						'您已通过实名认证').then(action => {
							_this.$router.back();
							_this.submitBtn = false;
						})
					} else {
						Indicator.close();
						MessageBox({
							title: '抱歉',
							message: '实名认证未通过<br />原因是：'+res.data.msg,
							confirmButtonText: '知道了'
						}).then(action => {
							_this.submitBtn = false;
						})
					}
				}).catch(function(){
						Toast('系统出错了，正在修复中...')
						_this.submitBtn = false;
				})
			}).catch(function(err){
				MessageBox({
					title: '提示',
					message: err,
					confirmButtonText: '知道了'
				})
			})
			
		},
		sendCode () {
			let _this = this;
			let rule1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
			if(!_this.realName){
				Toast('请输入真实姓名')
				return;
			}
			if(!_this.idCard){
				Toast('请输入身份证号码')
				return;
			}
			if(!rule1.test(_this.idCard)){
				Toast('请输入正确的身份证号码')
				return;
			}
			_this.countdown = true
			let _Promise = this.checkIdCard()
			_Promise.then( function () {
				//获取短信验证码
				Indicator.open({
				  text: '正在获取...',
				  spinnerType: 'fading-circle'
				})
				axios.post('verify/sendPhoneCode',qs.stringify({
					phone: _this.phone,
					codeType: 6,
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
						Indicator.close()
						_this.countdown = false
						Toast('系统出错了，正在修复中...')
				})
			}).catch(function(err){
				MessageBox({
					title: '提示',
					message: err,
					confirmButtonText: '知道了'
				})
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
		checkIdCard () {
			let _this = this;
			 return new Promise(function(resolve, reject) {
				axios.post('verify/isIdCard',qs.stringify({
					idCard: _this.idCard
				})).then(function (res) {
					if (res.data.code === '10000') {
						resolve()
					} else {
						reject('该身份证号码已被其它用户使用，请更换身份证号码后进行实名认证')
					}
				}).catch(function(err){
					reject('系统出错了，正在修复中...')
				})
 			})
		}
	}
}
</script>
<style scoped>
.ex-realname{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-form{}
.ex-form p{min-height: 30px;line-height: 30px;word-wrap: break-word;padding: 8px 0 8px 10px;color: rgb(93,100,110);}
.ex-field{background: #fff;padding: 0 0 0 15px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 30%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 65%;height: 30px;border: none;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.readonly input{color: #586485}
</style>