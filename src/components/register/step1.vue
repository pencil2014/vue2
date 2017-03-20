<template>
	<div class="ex-register">
		<h1 class='ex-register-title'>注册</h1>
		<div class="ex-register-tips">
			目前只支持邀请注册，<br>请联系平台或好友索取二维码或链接。
		</div>
		<div class="ex-register-item">
			<span></span>
			<b>方法一</b>
			<p>输入好友提供的ID号</p>
			<div class="ex-register-item-sub">
				<input type="text" name="" class="input" v-model.trim='code' @focus='hidebtn' @blur='showbtn' placeholder="输入ID号"><button type='button' class='button' @click='goto'>去注册</button></div>
		</div>
		<div class="ex-register-item">
			<span></span>
			<b>方法二</b>
			<p>扫描朋友提供的二维码</p>
		</div>
		
		<div class="ex-register-login" v-show='showlogin'>
			已有账号，<router-link to="/login">去登录</router-link>
		</div>
		

	</div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
	data(){
		return {
			code: '',
			showlogin: true
		}
	},
	methods: {
		goto () {
			if (!this.code) {
				MessageBox('提示', 'ID号不能为空！')
				return
			}
			if (!/^(M|m|B|b)\d+$/.test(this.code)) {
				MessageBox('提示', 'ID号为字母M(m)或B(b)加数字！')
				return
			}
			this.$router.push({ name: 'Register2', params: { code: this.code}})
		},
		showbtn () {
			this.showlogin = true
		},
		hidebtn () {
			this.showlogin = false
		}
	}
}	
</script>

<style scoped>
.ex-register{ text-align: center;position: relative;font-size: 1.2rem; }
.ex-register-title{color: #2eadff; font-weight: 600; font-size: 3rem; padding: 1.5rem 0;}
.ex-register-tips{ margin: 0 1rem; padding: 1rem; line-height: 1.5; background-color: #f4f5f7; color: #ffa132; }
.ex-register-item{margin: 2rem 1rem; position: relative;}
.ex-register-item span{display: block; height: 1px; width: 100%; background-color: #eee; position: absolute; top:1rem; z-index: 0;}
.ex-register-item b{z-index: 1; background-color: #fff;line-height: 2rem; padding: 0 1rem; display: inline-block; position: relative; color: #555;}
.ex-register-item p{padding: 0.5rem; color: #888;}
.ex-register-item-sub{margin-top: 0.5rem; }
.ex-register-item-sub .input{ height: 4rem;  width: 66%; padding: 0 2%; background-color: #f2f2f2; border: 1px solid #fff; font-size: 1.6rem; color:#2EADFF; text-align: center;}
.ex-register-item-sub .button{ width: 29%;font-size: 1.6rem; height: 4rem; border:1px solid #29A1EF; background-color: #2EADFF; color: #fff; margin-left: -1px;}
.ex-register-item-sub .button:active{background-color: #29A1EF;}
.ex-register-login{ height: 5rem; width: 100%; background-color: #f4f4f4; color: #666; line-height: 5rem; position: fixed; bottom: 0; left: 0;  font-size: 14px;}
.ex-register-login a{ color:#2eadff;  }
.ex-register-login a:active{color: #2689CA;}
</style>