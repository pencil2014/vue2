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
				<input type="tel" name="" class="input" v-model.trim='code' @focus='hidebtn' @blur='showbtn' placeholder="输入ID号"><button type='button' class='button' @click='goto'>去注册</button></div>
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
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
export default {
	data(){
		return {
			code: '',
			showlogin: true,
			notice: '系统正在针对会员注册出现的问题进行优化与维护，维护时间为6月17日12：00时--18：00时，期间会员注册会受到影响，给您带来不便，敬请谅解。'
		}
	},
	methods: {
		goto () {
			if (!this.code) {
				MessageBox('提示', 'ID号不能为空！')
				return
			}
			if (!/^(M|m|B|b)\d+$/.test(this.code)) {
				this.code = "M" + this.code
			}
			// if (!/^(M|m|B|b)\d+$/.test(this.code)) {
			// 	MessageBox('提示', 'ID号为字母M(m)或B(b)加数字！')
			// 	return
			// }

			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('user/personalbase',qs.stringify({userCode: this.code}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.$router.push({ name: 'Register2', params: { code: _this.code}})
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
			
		},
		showbtn () {
			this.showlogin = true
		},
		hidebtn () {
			this.showlogin = false
		}
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-register{ text-align: center;position: relative;font-size: 1.3em; }
.ex-register-title{color: #2eadff; font-weight: 600; font-size: 3rem; margin-top: 10%;padding: 1.5rem 0;}
.ex-register-tips{ margin: 0 1rem; padding: 1rem; line-height: 1.5; background-color: #f4f5f7; color: #ffa132;}
.ex-register-item{margin: 2rem 1rem; position: relative;}
.ex-register-item span{display: block; height: 1px; width: 100%; background-color: #eee; position: absolute; top:1rem; z-index: 0;}
.ex-register-item b{z-index: 1; background-color: #fff;line-height: 2rem; padding: 0 1rem; display: inline-block; position: relative; color: #555;}
.ex-register-item p{padding: 1.5rem 0; color: #888;}
.ex-register-item-sub{margin-top: 0.5rem; position: relative;width: 100%; background-color: #f2f2f2; border: 1px solid #ebebeb;border-radius: 3px; text-align: left;}
.ex-register-item-sub .input{ height: 50px;  width: 80%;  font-size: 1.6rem; color:#2EADFF; text-align: center; border: none;background-color: rgba(0,0,0,0);}
.ex-register-item-sub .button{ width: 75px;font-size: 1.6rem; height: 4rem; border:1px solid #29A1EF; background-color: #2EADFF; color: #fff;border-radius: 3px;position: absolute;right: 0.5rem;height: 80%;top: 10%;}
.ex-register-item-sub .button:active{background-color: #29A1EF;}
.ex-register-login{ height: 5rem; width: 100%; background-color: #f4f4f4; color: #666; line-height: 5rem; position: fixed; bottom: 0; left: 0;  font-size: 14px;}
.ex-register-login a{ color:#2eadff;  }
.ex-register-login a:active{color: #2689CA;}

.ex-modal{background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100%;top: 0;left: 0;right:0; bottom: 0; display: table; z-index: 7;}
.ex-modal .ex-content{display: table-cell;vertical-align: middle;padding: 0 5%;}
.ex-modal .ex-box{background: #fff;width: 100%;border-radius: 5px;}
.ex-modal .ex-box .title{text-align: center;font-size: 1.6rem;font-weight: 500;padding: 10px 0; border-bottom: 1px solid #eee; margin-bottom: 1rem;}
.ex-modal .ex-box .text{max-height: 200px;font-size: 1.4rem;padding:0 15px 15px;overflow-y: scroll;line-height: 25px;}
</style>