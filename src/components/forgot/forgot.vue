<template>
<div>
	
	<div class="ex-forgot" v-show="showforgot">
		<div class="ex-topbar">
			<a href="javascript:;" @click="tologin"><i class="iconfont">&#xe605;</i></a>
			<span>忘记密码</span>
		</div>
		<div class="ex-forgot-box">
			<p class="ex-forgot-tips">我们将给您发送一个随机验证码，请注意查收短信。</p>
			<form action="" class="ex-login-from">
				<div class="ex-forgot-from-item">
					<label for="phone">手机号</label>
					<input type="text" name="phone" id="phone"  v-model.trim="phone" placeholder="请输入注册手机号" maxlength="11">
				</div>
				<div class="ex-forgot-from-item">
					<label for="code">验证码</label>
					<input type="text" name="code" id="code"  v-model.trim="code" placeholder="请输入验证码" maxlength="10">
					<a href="javascript:;" class='getcode' @click='getcode' v-show='!countdown'>获取验证码</a>
					<a href="javascript:;"  v-show='countdown'>{{second}}秒</a>
				</div>
				<button type="button" class="ex-forgot-next" :class="{disableBtn:disableBtn}" @click='gotonext'>下一步</button>
			</form>
		</div>
	</div>
	<div class="ex-reset" v-show='!showforgot'>
		<div class="ex-topbar">
			<a href="javascript:;" @click="toforgot"><i class="iconfont">&#xe605;</i></a>
			<span>忘记密码</span>
		</div>
		<form action="" class="ex-login-from">
				<div class="ex-forgot-from-item">
					<label for="pwd">新 密 码</label>
					<input type="password" name="pwd" id="pwd"  v-model.trim="password" placeholder="请输入新密码" maxlength="20">
				</div>
				<div class="ex-forgot-from-item">
					<label for="confirm">确认密码</label>
					<input type="password" name="confirm" id="confirm"  v-model.trim="confirm" placeholder="请再次输入新密码" maxlength="20">
				</div>
				<button type="button" class="ex-forgot-next submit" :class="{disableBtn:checkpwd}" @click='reset'>提交</button>
		</form>
	</div>
</div>	
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator } from 'mint-ui'
export default {
	data () {
		return {
			phone: '',
			code: '',
			second: 120,
			countdown: false,
			repeatBtn: false,
			showforgot: true,
			password: '',
			confirm: ''
		}
	},
	computed: {
		disableBtn () {
			return (this.phone && this.code) ? false : true 
		},
		checkpwd () {
			let check = (this.password === this.confirm) ? false : true
			if (check || !this.password || !this.confirm) {
				return true
			} else {
				return false
			}
		}
	},
	created () {
		let phone = window.localStorage.getItem('phone')
		if (!!phone) {
			this.phone = phone
		}
	},
	methods: {
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
			let _this = this
			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.code !== '10000') {
					MessageBox('提示', "手机号码未注册!")
					return
				} else {
					_this.countdown = true
					_this.countdownFn()
					// 请求验证码接口
					axios.post('verify/sendPhoneCode',qs.stringify({ 
						phone: _this.phone,
						codeType: 1,
						smsType: 1
					}))
					.then(function(res){
						if (res.data.code === '10000') {
							MessageBox('提示', '验证码已经发送，请注意查收！')
						} else {
							MessageBox('提示', res.data.msg)
						}
					})
					.catch(function(){
						Indicator.open({ spinnerType: 'fading-circle'})
					})
				}
			}).catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
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
			if (!(/^\d{4,10}$/.test(this.code))) {
				MessageBox('提示', '验证码不正确!')
				return
			}
			this.repeatBtn = true //防止重复提交
			let _this = this
			axios.post('verify/validatePhoneCode',qs.stringify({phone: _this.phone,phoneCode:_this.code,codeType:8})).then(function(){
				if (res.data.code !== '10000') {
					_this.repeatBtn = false 
					MessageBox('提示', res.data.msg)
					return
				} else {
					_this.repeatBtn = false
					_this.showforgot = false
				} 
			}).catch(function(){
				_this.repeatBtn = false
				Indicator.open({ spinnerType: 'fading-circle'})
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
			this.repeatBtn = true //防止重复提交
			let _this = this
			axios.post('ser/forgetPasswod',qs.stringify({phone: _this.phone,phoneCode:_this.code,password:_this.password})).then(function(){
				if (res.data.code === '10000') {
					MessageBox.alert('密码修改成功！').then(action => {
						_this.$router.push('/login')
					})
				} else {
					_this.repeatBtn = false
					MessageBox('提示', '密码修改失败，请稍后重试！')
				}
			}).catch(function(){
				_this.repeatBtn = false
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		}
	}
}
</script>
<style scoped>
.ex-forgot{background-color: #f4f5f7; height: 100%;}
.ex-forgot-tips{ text-align: center; padding: 1rem 0; color: #5d646e; }
.ex-login-from{background-color: #fff; padding: 0 1rem; padding-top: 0.2rem}
.ex-forgot-from-item{ color: #212a32; border-bottom: 1px solid #e5e5e5; font-size: 1.4rem;  vertical-align: middle; position: relative; margin: 0.5rem 0;}
.ex-forgot-from-item label{vertical-align: middle;}
.ex-forgot-from-item input{ height: 4rem; border: none; padding-left: 0.5rem; width: 80%; }
.ex-forgot-from-item .getcode{ position:absolute; right: 0; top: 1rem;color: #2eadff; }
.ex-forgot-next{ height: 4.5rem; font-size: 1.6rem; margin: 1rem 0; width: 100%; border-radius: 0.4rem; background-color: #62c1ff; color: #fff;}
.ex-forgot-next:active{background-color: #54a6dc;}
.submit{background-color: #58c86b;}
.submit:active{background-color: #52af62;}
.ex-reset {padding-top: 1rem;}
</style>