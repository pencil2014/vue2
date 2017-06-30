<template>
	<div class="ex-login">
		<!-- <div class="ex-login-title">
			<h3>易享时代后台管理系统</h3>
		</div> -->
		<div class="ex-login-logo">
			<img src="../../assets/images/logo2.png" alt="logo">
		</div>
		<div class="ex-login-cnt">
			<form class="ex-login-from">
				<p>输入手机号码</p>
				<div class="ex-login-from-item">
					<i class="iconfont">&#xe6f2;</i>
					<input type="tel" name="phone" @focus='hidecopy' @blur='showcopy' v-model.trim="phone" placeholder="请输入手机号码" maxlength="11" > <!-- v-focus -->
					<i class="iconfont clear" v-show='phone !==""' @click='clear(1)'>&#xe6b3;</i>
				</div>
				<p>输入密码</p>
				<div class="ex-login-from-item">
					<i class="iconfont">&#xe61e;</i>
					<input type="password" name="password" @focus='hidecopy' @blur='showcopy'  v-model.trim="password" placeholder="请输入密码" maxlength="20">
					<i class="iconfont clear" v-show='password !==""' @click='clear(2)'>&#xe6b3;</i>
				</div>
				<div class="ex-login-from-submit">
					<button type="button" @click="login" :class="{disableBtn:disableBtn}">登 录</button>
				</div>
				<span @click='gorule' class="rule">权限管理员基本规则</span>
				<!-- <div class="ex-login-cnt-link">
					<router-link to="/register" >注册账号</router-link>
					<router-link to="/forgot" >忘记密码？</router-link>
				</div> -->
			</form>
		</div>
		<!-- <div class="ex-login-copyright" v-show='showcopyright'>
			{{year}} E享时代 版权所有，并保留所有权利
		</div> -->

		<div class="ex-login-box" v-show='loginBox'>
			<div class="ex-login-box-cnt">
				<h3>请选择登录系统</h3>
				<router-link to="/business" v-if='userTypes.indexOf(6) > -1'>登录代理商系统</router-link>
				<router-link to="/index" v-if='userTypes.indexOf(7) > -1'>登录权限管理员系统</router-link>
				<router-link to="/vip" v-if='userTypes.indexOf(8) > -1'>登录VIP商家系统</router-link>
			</div>
		</div>
	</div>
</template>
<script>

import md5 from "blueimp-md5"
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
export default {
	data () {
		return {
			phone: '',
			password: '',
			repeatBtn: false,
			showcopyright: true,
			loginBox: false,
			userTypes: []
		}
	},
	computed: {

		disableBtn () {
			return (this.phone && this.password) ? false : true 
		},
		year () {
			return new Date().getFullYear()
		}
	},
	created () {
		let phone = window.localStorage.getItem('phone')
		if (!!phone) {
			this.phone = phone
		}
	},
	methods:{
		clear (id) {
    	if (id === 1) {
    		this.phone = ''
    	} else {
    		this.password =''
    	}
    },
		gorule () {
			this.$router.push('/rule')
		},
		login () {
			// 屏蔽登录
			// MessageBox({
			//   title: '权限系统维护通知',
			//   message: '为确保系统安全有序、运营平稳，自即刻起进行权限端口维护，将于5月31日17:00恢复使用，给您带来不便敬请谅解！',
			//   confirmButtonText: '知道了'
			// }).then(action => {
			// 	window.location.href='http://www.exgj.com.cn'
			// })
			// return
			// 屏蔽登录结束

			if (this.repeatBtn) {
				return
			}
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确！')
				return
			}
			if (!(/.{6,20}/.test(this.password))) {
				MessageBox('提示','密码长度为6~20位！')
				return
			}
			this.repeatBtn = true //防止重复提交
			let _this = this
			// 登陆接口
			Indicator.open({
			  text: '正在登录...',
			  spinnerType: 'fading-circle'
			})
			axios.post('mobileLogin',qs.stringify({username: this.phone, password: md5(this.password)}))
				.then(function(res){
					Indicator.close()
					_this.repeatBtn = false
					if (res.data.code === '0') {
						console.log(res.data.data.userTypes)
						window.localStorage.setItem('id', res.data.data.id)
						window.localStorage.setItem('phone', res.data.data.phone)
						window.localStorage.setItem('userCode', res.data.data.userCode)
						_this.userTypes = res.data.data.userTypes || []
						// _this.$router.push('/index')
						let path = ''
						if (res.data.data.userTypes.length === 1) {
							if (res.data.data.userTypes[0] === 7) {
								path = '/index'
							} else if (res.data.data.userTypes[0] === 6) {
								path = '/business'
							} else if (res.data.data.userTypes[0] === 8) {
								path = '/vip'
							} 
							else {
								Toast('该用户类型不允许登录系统，请核对用户类型!')
								path = '/login'
							}
							_this.$router.push(path)
						}
						if (res.data.data.userTypes.length > 1) {
							_this.loginBox = true
						}
					} else {
						Toast(res.data.msg)
					}
				})
				.catch(function(){
					Indicator.close()
					_this.repeatBtn = false
					Toast('网络请求超时!')
				})
		},
		hidecopy () {
			this.showcopyright = false
		},
		showcopy () {
			this.showcopyright = true
		},
		destroyed () {
			Indicator.close()
		}
	},
	created () {
	},
	directives: {
		focus: {
			inserted: function (el) {
		    el.focus()
		  }
		}
	}
}	
</script>
<style scoped>
.ex-login{ min-height:100%; background: url('../../assets/images/logo.jpg') no-repeat fixed top center; background-size: cover; position: absolute; width: 100%;}
.ex-login-title{ text-align: center; color: #fff; padding-top: 15rem; margin-bottom: 2rem;}
.ex-login-title h3{ font-weight: normal; font-size: 1.6rem;}
.ex-login-logo{ text-align: center; }
.ex-login-cnt{margin:0 2rem; background-color: rgba(255,255,255,0.6); border-radius: 0.6rem; padding: 2rem 1rem ;}
.ex-login-from p {color: #657f84; line-height: 2;}
.ex-login-from-item { background-color: rgba(255, 255, 255, 1); padding: 0.5rem; margin-bottom: 1rem; border-radius: 0.4rem; position: relative;}
.ex-login-from-item i{ font-size: 2.2rem; vertical-align: middle; color: #657f84; padding-left: 0.5rem;}
.ex-login-from-item i.clear { position: absolute; right: 1rem; top: 1rem; color: #eee;}
.ex-login-from-item input{ height:3rem;border: none; width: 84%;  vertical-align: middle; background-color: transparent;color: #657f84;  font-size: 1.6rem;vertical-align: middle;}
.ex-login-from-item input::-webkit-input-placeholder{color: #eee;}
.ex-login-from-submit{margin-top: 1.5rem; }
.ex-login-from-submit button {border: none; height: 5rem; width: 100%; border-radius: 0.4rem; background: #6bc8ec; box-shadow: 0px 1px 1px rgba(0,0,0,0.2); color: #fff; font-size: 18px;}
.ex-login-from-submit button:active{background-color: #46bae7;}

.ex-login-cnt-link{ text-align: right; margin-top: 1.5rem; }
.ex-login-cnt-link a{ margin-left: 2rem; font-size: 1.2rem; color: #1b6798;}
.ex-login-cnt-link a:active{color: #fff;}
.ex-login-copyright{height: 1.5rem; width: 100%; text-align: center; color: #eee; font-size: 1rem; position: fixed; bottom: 0;}
.rule{ padding-top: 1.5rem; display: block; font-size: 1.4rem; color: #047dcb; }

.ex-login-box {background-color: rgba(0,0,0,0.4); position: fixed; top:0; bottom: 0; left: 0; right: 0;}
.ex-login-box-cnt { width: 60%;  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: #fff; padding:2rem ;}
.ex-login-box-cnt h3 { text-align: center;  border-bottom: 1px solid #eee; padding-bottom: 1.5rem;}
.ex-login-box-cnt a{ display: block; line-height: 3; font-size: 1.4rem; color: #fff; text-align: center; background-color: #0470b6; margin-bottom: 1.5rem;}
</style>