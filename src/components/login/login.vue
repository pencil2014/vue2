<template>
	<div class="ex-login">
		<div class="ex-login-logo">
			<img src="../../assets/images/logo.png" alt="logo">
		</div>
		<div class="ex-login-cnt">
			<form class="ex-login-from">
				<div class="ex-login-from-item">
					<i class="iconfont">&#xe6f2;</i>
					<input type="text" name="phone" @focus='hidecopy' @blur='showcopy' v-model.trim="phone" placeholder="请输入手机号码" maxlength="11">
				</div>
				<div class="ex-login-from-item">
					<i class="iconfont">&#xe61e;</i>
					<input type="password" name="password" @focus='hidecopy' @blur='showcopy'  v-model.trim="password" placeholder="请输入密码" maxlength="20">
				</div>
				<div class="ex-login-from-submit">
					<button type="button" @click="login" :class="{disableBtn:disableBtn}">登 录</button>
				</div>
				<div class="ex-login-cnt-link">
					<router-link to="/register" >注册账号</router-link>
					<router-link to="/forgot" >忘记密码？</router-link>
				</div>
			</form>
		</div>
		<div class="ex-login-copyright" v-show='showcopyright'>
			{{year}} E享时代 版权所有，并保留所有权利
		</div>
	</div>
</template>
<script>

import md5 from "blueimp-md5"
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'

export default {
	data () {
		return {
			phone: '',
			password: '',
			repeatBtn: false,
			showcopyright: true
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
		login () {
			if (this.repeatBtn) {
				return
			}
			if (this.disableBtn) {
				MessageBox('提示', '手机号或密码不能为空！')
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
			// 验证用户名是否存在
			axios.post('user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				if (res.data.code !== '10000') {
					_this.repeatBtn = false 
					MessageBox('提示', res.data.msg)
					return
				} else {
					// 保存用户手机号码
					window.localStorage.setItem('phone', _this.phone)
					// 请求登录接口
					axios.post('user/login',qs.stringify({loginName: _this.phone, password: md5(_this.password)}))
					.then(function(res){
						if (res.data.code === '10000') {
							window.localStorage.setItem('token', res.data.data.token)
							_this.$router.push('/index')
						} else {
							MessageBox('提示', '登录失败，请稍后重试！')
						}
					})
					.catch(function(){
						_this.repeatBtn = false
						MessageBox('提示', '系统出错了，正在修复中...')
					})
				}
			}).catch(function(){
				_this.repeatBtn = false 
				MessageBox('提示', '系统出错了，正在修复中...')
			})

		},
		hidecopy () {
			this.showcopyright = false
		},
		showcopy () {
			this.showcopyright = true
		}
	}
}	
</script>
<style scoped>
.ex-login{ min-height:100%; background: url('../../assets/images/background.png') no-repeat fixed center; background-size: cover; }
.ex-login-logo{ text-align: center; }
.ex-login-cnt{margin:0 0.6rem;}
.ex-login-from-item { background-color: rgba(255, 255, 255, 0.2); padding: 0.1rem; margin-bottom: 0.5rem; border-radius: 0.1rem; }
.ex-login-from-item i{ font-size: 0.7rem; vertical-align: middle; color: #B3EBF6; padding-left: 0.1rem;}
.ex-login-from-item input{ height:1.2rem;border: none; width: 85%;  vertical-align: middle; background-color: transparent;color: #fff;  font-size: 16px;}
.ex-login-from-item input::-webkit-input-placeholder{color: #eee;}
.ex-login-from-submit{margin: 0 0; }
.ex-login-from-submit button {border: none; height: 1.4rem; width: 100%; border-radius: 0.1rem; background: rgba(255,255,255,.75); box-shadow: 0px 1px 1px rgba(0,0,0,0.30); color: #2f7bac; font-size: 18px;}
.ex-login-from-submit button:active{background-color: #33c1e6; color: #fff;}
button.disableBtn,button.disableBtn:active { background-color: #eee; color: #ddd;}

.ex-login-cnt-link{ text-align: right; margin-top: 0.5rem; }
.ex-login-cnt-link a{ margin-left: 0.5rem; font-size: 12px; color: #1b6798;}
.ex-login-cnt-link a:active{color: #fff;}
.ex-login-copyright{height: 0.5rem; width: 100%; text-align: center; color: #eee; font-size: 10px; position: fixed; bottom: 0;}
</style>