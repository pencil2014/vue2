<template>
	<div class="ex-login">
		<div class="ex-login-logo">
			<img src="../../assets/images/logo.png" alt="logo">
		</div>
		<div class="ex-login-cnt">
			<form class="ex-login-from">
				<label for="" class="title">输入手机号</label>
				<div class="ex-login-from-item">
					<!-- <i class="iconfont">&#xe6f2;</i> -->
					<input type="tel" name="phone" @focus='hidecopy' @blur='showcopy' v-model.trim="phone" placeholder="请输入手机号码" maxlength="11">
					<i class="iconfont clear" v-show='phone !==""' @click='clear(1)'>&#xe6b3;</i>
				</div>
				<label for="" class="title">输入密码</label>
				<div class="ex-login-from-item">
					<!-- <i class="iconfont">&#xe61e;</i> -->
					<input type="password" name="password" @focus='hidecopy' @blur='showcopy'  v-model.trim="password" placeholder="请输入密码" maxlength="20">
					<i class="iconfont clear" v-show='password !==""' @click='clear(2)'>&#xe6b3;</i>
				</div>
				<div class="ex-login-from-submit">
					<!-- <button type="button" @click="login" :class="{disableBtn:disableBtn}">登 录</button> -->
					<button type="button" @click="login">登 录</button>
				</div>
				<!-- <div class="ex-login-cnt-link">
					<router-link to="/register" >注册账号</router-link>
					<router-link to="/forgot" >忘记密码？</router-link>
				</div> -->
			</form>
		</div>
		<!-- <div class="ex-login-copyright" v-show='showcopyright'>
			{{year}} e享时代 版权所有，并保留所有权利
		</div> -->
		<div class="ex-login-register" v-show='showcopyright'>
			<router-link to="/register" >注册账号</router-link>|<router-link to="/forgot" >忘记密码？</router-link>
		</div>
	</div>
</template>
<script>

import md5 from "blueimp-md5"
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
// import { mapState,  mapActions } from 'vuex'
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
		// ...mapState([
  //     'loginStatus'
  //   ]),
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
		// ...mapActions([
  //     'changeLoginStatus'
  //   ]),
    clear (id) {
    	if (id === 1) {
    		this.phone = ''
    	} else {
    		this.password =''
    	}
    },
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
			Indicator.open({
			  text: '登录中...',
			  spinnerType: 'fading-circle'
			})
			this.repeatBtn = true //防止重复提交
			let _this = this
			// 验证用户名是否存在
			axios.post('/exsd-web/user/isEixt',qs.stringify({phone: _this.phone})).then(function(res){
				Indicator.close()
				if (res.data.msg === 'false') {
					_this.repeatBtn = false 
					MessageBox('提示', '用户不存在!')
					return
				} else {
					// 保存用户手机号码
					window.localStorage.setItem('phone', _this.phone)
					// 请求登录接口
					axios.post('/exsd-web/user/login',qs.stringify({loginName: _this.phone, password: md5(_this.password)}))
					.then(function(res){
						Indicator.close()
						_this.repeatBtn = false
						if (res.data.code === '10000') {
							window.localStorage.setItem('token', res.data.data.token)
							window.localStorage.setItem('usertype', '1')
							axios.defaults.headers.common['authorization'] = 'Bearer ' + res.data.data.token
							_this.$router.push('/index')
						} else {
							Toast(res.data.msg)
						}
					})
					.catch(function(err){
						Indicator.close()
						_this.repeatBtn = false
						Toast('连接失败，请检查网络是否正常!')
					})
				}
			}).catch(function(err){
				Indicator.close()
				_this.repeatBtn = false 
				Toast('连接失败，请检查网络是否正常!')
			})

		},
		hidecopy () {
			this.showcopyright = false
		},
		showcopy () {
			this.showcopyright = true
		}
	},
	mounted () {
		window.localStorage.removeItem('notice')
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>
<style scoped>
.ex-login{ min-height:100%; background: url('../../assets/images/logo.jpg') no-repeat fixed center; background-size: cover;  position: absolute;width: 100%;}
.ex-login-logo{ text-align: center; }
.ex-login-cnt{margin:0 2rem; background-color: rgb(226,241,251); border-radius: 0.6rem; padding:0.5rem  1.5rem 4rem;}
.ex-login-from-item { background-color: rgba(255, 255, 255, 1); padding: 0.5rem; border-radius: 0.4rem; position: relative; }
.ex-login-from-item i{ font-size: 2.2rem; vertical-align: middle; color: #657f84; padding-left: 0.5rem;}
.ex-login-from-item .clear { position: absolute; right: 1rem; top: 1rem; color: rgb(212,220,222);}

.ex-login-from-item input{ height:3rem;border: none; width: 84%;  vertical-align: middle; background-color: transparent;color: #657f84;  font-size: 1.6rem;text-indent: 1rem;}
.ex-login-from-item input::-webkit-input-placeholder{color: #eee;}
.ex-login-from-submit{margin-top: 1.5rem; }
.ex-login-from-submit button {border: none; height: 5rem; width: 100%; border-radius: 0.4rem; background: #6bc8ec; box-shadow: 0px 1px 1px rgba(0,0,0,0.2); color: #fff; font-size: 1.8rem;}
.ex-login-from-submit button:active{background-color: #46bae7;}

.ex-login-cnt-link{ text-align: right; margin-top: 1.5rem; }
.ex-login-cnt-link a{ margin-left: 2rem; font-size: 1.2rem; color: #1b6798;}
.ex-login-cnt-link a:active{color: #fff;}
.ex-login-copyright{height: 1.5rem; width: 100%; text-align: center; color: #eee; font-size: 1rem; position: fixed; bottom: 0;}

.ex-login-register {position: absolute; bottom: 3rem; width: 100%; text-align: center; color: #fff;}
.ex-login-register a {font-size: 1.4rem; padding: 0 1rem;  color: #fff; }

.ex-login-from .title{color: rgb(101,127,132);line-height: 36px;font-size: 1.4rem;}
</style>