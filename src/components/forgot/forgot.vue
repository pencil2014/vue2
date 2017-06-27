<template>
<div class="ex-container">
	<div class="ex-forgot" v-show="showforgot">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="tologin"><i class="iconfont">&#xe605;</i></a>
			<span>忘记密码</span>
		</div> -->
		<HeadTitle :title="modal" @callback="tologin"></HeadTitle>
		<div class="ex-forgot-box">
			<p class="ex-forgot-tips">我们将给您发送一个随机验证码，请注意查收短信。</p>
			<form action="" class="ex-login-from">
				<div class="ex-forgot-from-item">
					<label for="phone">手机号</label>
					<input type="tel" name="phone" id="phone"  v-model.trim="phone" placeholder="请输入注册手机号" maxlength="11">
				</div>
				<!-- <div class="ex-forgot-from-item">
					<label>图形验证码</label>
					<input type="text" v-model.trim="imgcode" placeholder="请输入图形验证码" maxlength="20">
					<img :src="imgurl" alt="" class="imgurl" @click="change">
				</div> -->

				<div id="captcha"></div> <!-- 验证码容器元素 -->

				<div class="ex-forgot-from-item">
					<label for="code">验证码</label>
					<input type="tel" name="code" id="code"  v-model.trim="code" placeholder="请输入验证码" maxlength="20">
					<a href="javascript:;" class='getcode' @click='getcode' v-show='!countdown'>获取验证码</a>
					<a href="javascript:;"  class='getcode' v-show='countdown'>{{second}}秒</a>
				</div>
			</form>
			<div class="button">
				<button type="button" class="ex-forgot-next" :class="{disableBtn:disableBtn}" @click='gotonext'>下一步</button>
			</div>
		</div>
	</div>
	<div class="ex-reset" v-show='!showforgot'>
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="toforgot"><i class="iconfont">&#xe605;</i></a>
			<span>忘记密码</span>
		</div> -->
		<HeadTitle :title="modal" @callback="toforgot"></HeadTitle>
		<form action="" class="ex-login-from">
				<div class="ex-forgot-from-item">
					<label for="pwd">新密码</label>
					<input type="password" name="pwd" id="pwd" v-model.trim="password" placeholder="请输入新密码" maxlength="20">
				</div>
				<div class="ex-forgot-from-item">
					<label for="confirm">确认密码</label>
					<input type="password" name="confirm" id="confirm" v-model.trim="confirm" placeholder="请再次输入新密码" maxlength="20">
				</div>
		</form>
		<div class="button">
			<button type="button" class="ex-forgot-next submit" :class="{disableBtn:checkpwd}" @click='reset'>提交</button>
		</div>
	</div>
</div>	
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import {initNECaptcha} from '../../assets/lib/load'
export default {
	data () {
		return {
			phone: '',
			code: '',
			imgcode: '',
			second: 120,
			countdown: false,
			repeatBtn: false,
			showforgot: true,
			password: '',
			confirm: '',
			modal:{
				text:'忘记密码',
				fixed: false,
			}
		}
	},
	computed: {
		disableBtn () {
			return (this.phone && this.code && this.imgcode) ? false : true 
		},
		checkpwd () {
			let check = (this.password === this.confirm) ? false : true
			if (check || !this.password || !this.confirm) {
				return true
			} else {
				return false
			}
		},
	},
	created () {
		// let phone = window.localStorage.getItem('phone')
		// if (!!phone) {
		// 	this.phone = phone
		// }

		// 生成验证码
		this.change()
	},
	methods: {
		change () {
			this.imgcode = ''
			Indicator.open({
			  text: '正在加载拼图...',
			  spinnerType: 'fading-circle'
			})
			// 生成验证码
			let _this = this
			initNECaptcha({
	      captchaId: '25bf95669a354b2ba8f2af1b2d42e2cd',
	      element: '#captcha',
	      mode: 'embed',
	      width: 'auto',
	      onVerify: function (err, data) {
	      	_this.imgcode =  data ? data.validate : ''
	      },
	      onReady: function (instance) {
	      	Indicator.close()
	      },
	    }, function onload (instance) {
	      // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
	    }, function onerror (err) {
	      // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	    })
		},
		tologin () {
			this.$router.push('/login')
		},
		toforgot () {
			this.showforgot = true
		},
		getcode () {
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			if(!this.imgcode){
				MessageBox('提示', '请先完成拼图!')
				return
			}
			Indicator.open({
			  text: '正在获取...',
			  spinnerType: 'fading-circle'
			})
			this.code = ''
			let _this = this
			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.msg === 'false') {
					Indicator.close()
					MessageBox('提示', "手机号码未注册!")
					return
				} else {
					// 请求验证码接口
					axios.post('verify/sendPhoneCode',qs.stringify({ 
						phone: _this.phone,
						codeType: 8,
						smsType: 1,
						vcode: _this.imgcode
					}))
					.then(function(res){
						Indicator.close()
						if (res.data.code === '10000') {
							_this.countdown = true
							_this.countdownFn()
							Toast('验证码已经发送，请注意查收！')
						} else {
							_this.change()
							_this.imgcode = ''
							Toast(res.data.msg)
						}
					})
					.catch(function(){
						Indicator.close()
						Toast('连接失败，请检查网络是否正常!')
					})
				}
			}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})

		},
		countdownFn () {
			let _this = this
			let timer = setInterval(function(){
				if (_this.second <= 0) {
					_this.countdown = false
					_this.second = 120
					clearInterval(timer)
				}
				_this.second -= 1
			},1000)
		},
		gotonext () {
			if (this.repeatBtn) {
				return
			}
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			if(!this.imgcode){
				MessageBox('提示', '请先完成拼图!')
				return
			}
			if (!(/^\d{4,10}$/.test(this.code))) {
				MessageBox('提示', '验证码不正确!')
				return
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			this.repeatBtn = true //防止重复提交
			let _this = this
			axios.post('verify/validatePhoneCode',qs.stringify({
				phone: _this.phone,
				phoneCode:_this.code,
				codeType:8
			})).then(function(res){
				Indicator.close()
				_this.repeatBtn = false 
				if (res.data.code !== '10000') {
					_this.change()
					Toast(res.data.msg)
					return
				} else {
					_this.showforgot = false
				} 
			}).catch(function(){

				Indicator.close()
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		reset () {
			if (this.repeatBtn) {
				return
			}
			if (this.checkpwd) {
				MessageBox('提示', '两次密码不一致！')
				return
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			this.repeatBtn = true //防止重复提交
			let _this = this
			axios.post('user/forgetPasswod',qs.stringify({phone: _this.phone,phoneCode:_this.code,password:_this.password})).then(function(res){
				Indicator.close()
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					MessageBox.alert('密码修改成功！').then(action => {
						_this.$router.push('/login')
					})
				} else {
					MessageBox('提示', '密码修改失败，请稍后重试！')
				}
			}).catch(function(){
				Indicator.close()
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	destroyed () {
		Indicator.close()
	},
	components: {
		HeadTitle,
	},
}
</script>
<style scoped>
.ex-container{height: 100%;}
.ex-forgot{background-color: #f4f5f7;min-height: 100%;}
.ex-forgot-tips{ text-align: left; padding: 1rem 0 0 1rem; color: #5d646e; }
.ex-login-from{padding: 0 0 0 1rem;background-color: #fff;margin-top: 1rem;}
.ex-forgot-from-item{ color: #212a32; border-bottom: 1px solid #e5e5e5; font-size: 1.4rem;  vertical-align: middle; position: relative;height: 4rem;padding: 0.5rem 0;}
.ex-login-from .ex-forgot-from-item:last-child{border-bottom: none;}
.ex-forgot-from-item label{vertical-align: middle;width: 20%;display: inline-block;}
.ex-forgot-from-item input{ height: 100%; border: none; padding-left: 0.5rem; width: 65%; }
.ex-forgot-from-item .getcode{ position:absolute; right: 10px;color: #2eadff;color: rgb(4,112,182);border: solid 1px rgb(4,112,182);padding: 0.4rem 1rem;top: 1.3rem;border-radius: 3px;}
.ex-forgot-from-item .imgurl{ position: absolute;right: 1rem;top: 50%;margin-top: -11px; }

.ex-forgot-next{ height: 4.5rem; font-size: 1.6rem; margin: 1rem 0; width: 100%; border-radius: 0.4rem; background-color: #047dcb; color: #fff;}
.ex-forgot-next:active{background-color: #0470b6;}
.submit{background-color: #047dcb;}
.submit:active{background-color: #0470b6;}

.button{width: 100%;padding: 0 1rem;box-sizing: border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}

.ex-reset {background-color: #f4f5f7;min-height: 100%;}

#captcha {margin: 1rem 1rem 1rem 0;}
</style>