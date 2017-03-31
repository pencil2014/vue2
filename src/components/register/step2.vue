<template>
	<div class="ex-rigster-box">
		<div class="ex-rigster-header">
			您的好友<span v-if="name !== ''">{{name}}</span><span v-if="name === ''">{{userId}}</span><br>
			邀请您加入E享时代！
		</div>
		<div class="ex-rigster-info">
			请在下方输入您的手机号码，并设置一个密码，即可快速注册成为e享会员，立即体验“创新消费，科学分享”！
		</div>
		<div class="ex-rigster-form">
			<div class="ex-rigster-from-item">
				<i class="iconfont">&#xe6f2;</i>
				<input type="tel" name="phone"  v-model.trim="phone" placeholder="请输入手机号码" maxlength="11">
			</div>
			<div class="ex-rigster-from-item">
				<i class="iconfont">&#xe61e;</i>
				<input type="password" name="password"  v-model.trim="password" placeholder="请输入6-20位密码" maxlength="20">
			</div>
			<div class="ex-rigster-from-item verycode">
				<i class="iconfont">&#xe654;</i>
				<input type="text" name="password"  v-model.trim="code" placeholder="请输入验证码" maxlength="20">
				<a href="javascript:;" @click='getcode' v-show='!countdown'>获取短信验证码</a>
				<a href="javascript:;"  v-show='countdown'>{{second}}秒</a>
			</div>
			<div class="ex-rigster-from-submit">
				<button type="button" @click="register" :class="{disableBtn:disableBtn}">注 册</button>
			</div>
			<div class="ex-rigster-from-agreement">
				<input type="checkbox" name="agreement" v-model='agreement'> 我已阅读并同意 <a href="javascript:;">《E享时代注册协议》</a>
			</div>
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
			userId: '',
			name: '',
			phone: '',
			password: '',
			code: '',
			agreement:true,
			repeatBtn: false,
			countdown: false,
			second: 120
		}
	},
	computed: {
		disableBtn () {
			return (this.phone && this.password && this.code) ? false : true 
		}
	},
	created () {
		this.userId = this.$route.params.code
	},
	methods: {
		getcode () {
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			let _this = this
			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.code === '10000') {
					MessageBox('提示', "手机号码已经注册!")
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
		register () {
			if (!this.userId) {
				this.$router.push('/register')
			}
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			if (!(/.{6,20}/.test(this.password))) {
				MessageBox('提示', '密码长度为6~20位！')
				return
			}
			if (!this.code) {
				MessageBox('提示', '验证码不能为空！')
				return
			}
			Indicator.open({
			  text: '注册中...',
			  spinnerType: 'fading-circle'
			})
			this.repeatBtn = true //防止重复提交
			let _this = this

			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.code === '10000') {
					_this.repeatBtn = false 
					Indicator.close()
					MessageBox('提示', '手机号码已经注册!')
					return
				} else {

					// 请求注册接口
					axios.post('user/register',qs.stringify({
						user_id:_this.userId, 
						login_name: _this.phone,
						password: _this.password,
						phone_code: _this.code
					}))
					.then(function(res){
						if (res.data.code === '10000') {
							Indicator.close()
							window.localStorage.setItem('phone', _this.phone)
							window.localStorage.removeItem('token')
							_this.$router.push('/index')
						} else {
							Indicator.close()
							MessageBox('提示', res.data.msg)
						}
					})
					.catch(function(){
						ndicator.close()
						_this.repeatBtn = false
						Indicator.open({ spinnerType: 'fading-circle'})
					})
				}
			}).catch(function(){
				ndicator.close()
				_this.repeatBtn = false 
				Indicator.open({ spinnerType: 'fading-circle'})
			})

		}
	}
}
</script>

<style scoped>
.ex-rigster-box{}
.ex-rigster-header{text-align: center; padding-top: 1.5rem; color:#2eadff; font-size: 1.6rem; }
.ex-rigster-header span{color: #ffa132;}
.ex-rigster-info{ margin:1.5rem; padding: 1rem; background-color: #f4f5f7; color: #555;  line-height: 1.5;}
.ex-rigster-form{margin: 1.5rem;}
.ex-rigster-from-item {padding:0.5rem; border-bottom:1px solid #e5e5e5; position: relative;}
.ex-rigster-from-item i{font-size: 2.2rem; color: #bbb; vertical-align: middle;}
.ex-rigster-from-item input{ height: 3rem; vertical-align: middle; border: none; width:85%; padding-left: 0.5rem;}
.verycode input{ width: 60%; }
.verycode a{position: absolute; right: 0; top: 1.5rem; color: #ffa132; }
.ex-rigster-from-submit{margin: 1.5rem 0;}
.ex-rigster-from-submit button{ height: 4.5rem; width: 100%; border: none; background-color: #58c86b; color: #fff; border-radius: 0.4rem; font-size: 1.6rem;}
.ex-rigster-from-agreement{ color: #5d646e; margin: 0.2rem 0; }
.ex-rigster-from-agreement input{ width: 1.4rem; height: 1.4rem; border-radius: 0.5rem; vertical-align: middle; }
.ex-rigster-from-agreement a{color:#1b6798;vertical-align: middle;  }
</style>