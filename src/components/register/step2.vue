<template>
	<div class="ex-rigster-box">
		<div class="ex-rigster-header">
			您的好友<span v-if="name !== ''">{{RecommendPhone}}<!-- {{name || userCode}} --></span><!-- <span v-else>{{userId}}</span> --><br>
			邀请您加入e享时代！
		</div>
		<div class="ex-rigster-info">
			请在下方输入您的手机号码，并设置一个密码，即可快速注册成为e享会员，立即体验“创新消费，科学分享”！
		</div>
		<div class="ex-rigster-form">
			<div class="ex-rigster-from-item">
				<!-- <i class="iconfont">&#xe6f2;</i> -->
				<img src="../../assets/images/Mobile.png" alt="" class="icon">
				<input type="tel" name="phone"  v-model.trim="phone" placeholder="请输入手机号码" maxlength="11">
			</div>

			<div class="ex-rigster-from-item">
				<!-- <i class="iconfont">&#xe61e;</i> -->
				<img src="../../assets/images/password.png" alt="" class="icon">
				<input type="password" name="password"  v-model.trim="password" placeholder="请输入6-20位密码" maxlength="20">
			</div>

			<!-- <div class="ex-rigster-from-item imgCodes-item">
				<img src="../../assets/images/imgCodes.png" alt="" class="icon">
				<input type="text" v-model.trim="imgcode" placeholder="请输入图形验证码" maxlength="10">
				<img :src="imgurl" alt="" class="imgurl" @click='change'>
			</div> -->

			 <div id="captcha"></div> <!-- 验证码容器元素 -->

			<div class="ex-rigster-from-item verycode">
				<!-- <i class="iconfont">&#xe654;</i> -->
				<img src="../../assets/images/Codes.png" alt="" class="icon">
				<input type="tel" name="verycode"  v-model.trim="code" placeholder="请输入验证码" maxlength="20">
				<a href="javascript:;" @click='getcode' v-show='!countdown' >获取短信验证码</a>
				<a href="javascript:;"  v-show='countdown' class="countdown">{{second}}秒</a>
			</div>
			<div class="ex-rigster-from-submit">
				<button type="button" @click="register" :class="{disableBtn:disableBtn}">注 册</button>
			</div>
			<div class="ex-rigster-from-agreement">
				<input type="checkbox" name="agreement" v-model='agreement'> 我已阅读并同意 <router-link to="/registerrule">《e享时代会员服务协议》</router-link>
			</div>
		</div>
	</div>
</template>
<script>
import md5 from "blueimp-md5"
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import {initNECaptcha} from '../../assets/lib/load'
export default {
	data () {
		return {
			userId: '',
			userCode: '',
			id: '',
			name: '',
			phone: '',
			password: '',
			code: '',
			agreement:true,
			repeatBtn: false,
			countdown: false,
			second: 120,
			RecommendPhone: '',
			imgcode: '',
			requestToken: ''
		}
	},
	computed: {
		disableBtn () {
			return (this.phone && this.password && this.code  && this.agreement && this.imgcode) ? false : true 
		}
	},
	created () {
		this.userId = this.$route.params.code
		let _this = this
		axios.post('user/personalbase',qs.stringify({userCode: this.userId}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.id = res.data.data.id
				_this.userCode = res.data.data.userCode
				_this.name = res.data.data.userName
				_this.RecommendPhone = res.data.data.phone
			} else {
				MessageBox('提示', res.data.msg).then(action =>{
					if(action === "confirm"){
						_this.$router.push('/register')
					}
				});
			}
		})
		.catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
		this.createRequestToken()
		// 生成验证码
		this.change()
	},
	methods: {
		createRequestToken () {
			let _this = this
			axios.post('user/createRequestToken',qs.stringify({
				moduleId: 1
			})).then(function(res){
				if(res.data.code === '10000'){
					_this.requestToken = res.data.data
				}else{
					Toast(res.data.msg)
				}
			}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		change () {
			this.imgcode = ''
			// 生成验证码
			Indicator.open({
			  text: '正在加载拼图...',
			  spinnerType: 'fading-circle'
			})
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
		      }
		    }, function onload (instance) {
		      // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
		    }, function onerror (err) {
		      // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
		    })
		},
		getcode () {
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			if (!this.imgcode) {
				MessageBox('提示', '请先完成拼图!')
				return 
			}
			this.second = 120
			this.code = ''
			Indicator.open({
			  text: '正在获取...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.msg ==='true') {
					Indicator.close()
					MessageBox('提示', "手机号码已经注册!")
					return
				} else {
					// 请求验证码接口
					axios.post('verify/sendPhoneCode',qs.stringify({ 
						phone: _this.phone,
						codeType: 1,
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
				Indicator.close()
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
		register () {
			if (this.repeatBtn) {
				return
			}
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
			if (!this.imgcode) {
				MessageBox('提示', '请先完成拼图!')
				return 
			}
			if (!this.code) {
				MessageBox('提示', '验证码不能为空！')
				return
			}
			if (!this.agreement) {
				MessageBox('提示', '请勾选同意《“e享时代”会员注册协议》！')
				return
			}
			if(!this.requestToken){
				MessageBox('提示', '数据验证中,请稍后重试！')
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
				if (res.data.msg ==='true') {
					_this.repeatBtn = false 
					Indicator.close()
					MessageBox('提示', '手机号码已经注册!')
					return
				} else {
					// 请求注册接口
					axios.post('user/register',qs.stringify({
						user_id: _this.id, 
						login_name: _this.phone,
						password: _this.password,
						phone_code: _this.code,
						requestToken: _this.requestToken
					}))
					.then(function(res){
						Indicator.close()
						if (res.data.code === '10000') {
							window.localStorage.setItem('phone', _this.phone)
							axios.defaults.headers.common['authorization'] = 'Bearer ' + res.data.data.token
							window.localStorage.setItem('usertype', '1')
							window.localStorage.setItem('token', res.data.data.token)
							_this.$router.push('/index')
						} else {
							Indicator.close()
							_this.change()
							_this.requestToken = ''
							_this.createRequestToken()
							_this.second = 0
							_this.repeatBtn = false
							Toast(res.data.msg)
						}
					})
					.catch(function(){
						Indicator.close()
						_this.second = 0
						_this.repeatBtn = false
						Toast('连接失败，请检查网络是否正常!')
					})
				}
			}).catch(function(){
				Indicator.close()
				_this.repeatBtn = false 
				Toast('连接失败，请检查网络是否正常!')
			})

		}
	},
	mounted () {
	},
	destroyed () {
		Indicator.close()
	}
}
</script>

<style scoped>
.ex-rigster-box{ position: absolute; width: 100%;}
.ex-rigster-header{text-align: center; padding-top: 5%; color:#2eadff; font-size: 2rem; }
.ex-rigster-header span{color: #ffa132;}
.ex-rigster-info{ margin:1.5rem; padding: 1rem; background-color: #f4f5f7; color: #555;  line-height: 1.5;font-size: 1.4rem;}
.ex-rigster-form{margin: 1.5rem;}
.ex-rigster-from-item {padding: 0.5rem; border-bottom:1px solid #e5e5e5; position: relative;height: 4rem;line-height: 4rem;}
.ex-rigster-from-item i{font-size: 2.2rem; color: #bbb; vertical-align: middle;}
.ex-rigster-from-item .icon{display: inline-block;width: 2.8rem;vertical-align: middle;}
.ex-rigster-from-item input{ vertical-align: middle; border: none; width:80%; padding-left: 0.5rem;}
.ex-rigster-from-item.imgCodes-item{}
.ex-rigster-from-item.imgCodes-item .icon{width: 2.2rem;padding: 0 0.3rem;}
.ex-rigster-from-item.imgCodes-item .imgurl{position: absolute;right: 0;top: 50%;margin-top: -11px;}

.verycode input{ width: 60%; }
.verycode a{position: absolute; right: 0; color: #ffa132;border: solid 1px;border-radius: 3px;height: 2.6rem;line-height: 2.6rem;top: 1.2rem;padding: 0 1rem; }
.verycode a.countdown{color: rgb(212,220,222);}
.ex-rigster-from-submit{margin: 1.5rem 0;}
.ex-rigster-from-submit button{ height: 4.5rem; width: 100%; border: none; background-color: #58c86b; color: #fff; border-radius: 0.4rem; font-size: 1.6rem;}
.ex-rigster-from-agreement{ color: #5d646e; margin: 0.2rem 0; }
.ex-rigster-from-agreement input{ width: 1.4rem; height: 1.4rem; border-radius: 0.5rem; vertical-align: middle; }
.ex-rigster-from-agreement a{color:#1b6798;vertical-align: middle;  }
#captcha {margin: 1rem 0;}

</style>