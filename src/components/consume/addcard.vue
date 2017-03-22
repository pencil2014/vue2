<template>
	<div class="ex-addcard">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>添加银行卡</span>
		</div>
		<div class="ex-addcard-cnt">
			<p class='tips'>*只能添加实名认证人的银行卡(注：如为中国银行开户行可不输入)</p>
			<div class="ex-addcard-num">
				<label for="number">银行卡号:</label><input type="text" name="" id="number" placeholder="请输入银行卡号" v-model.trim='card'>
			</div>
			<div class="ex-addcard-name">
				<label for="name">开户行:</label>中国<input type="text" name="" id="name" placeholder="请输入" v-model.trim='banks'>银行
			</div>
			<p class='tips'>*为确保您正常收款，请写支行全称，如 “**省**市**支行”，直辖市无需再写省份</p>
			<div class="ex-addcard-subname">
					<p class="provice"><label for="number">支行名称:</label><input type="text" name=""  placeholder="请输入" v-model.trim='province'>省<span>（直辖市无需填写省份）</span></p>
					<p class="address">
						<input type="text" name=""  placeholder="请输入" v-model.trim='city'>市
						<input type="text" name=""  placeholder="请输入" v-model.trim='branch'>支行
					</p>
			</div>
			<p class='tips'>*请填写您在银行预留的手机号码，以验证银行卡是否属于您本人</p>
			<div class="ex-addcard-num">
				<label for="number">手机号码:</label><input type="text" name="" id="" placeholder="请输入手机号码" v-model='phone'>
			</div>
			<div class="ex-addcard-num verycode" v-show='phone !== userphone'>
				<label for="number">验证码:</label><input type="text" name="" id="" placeholder="请输入验证码" v-model='phonecode'>
				<a href="javascript:;" @click='getcode' v-show='!countdown'>获取验证码</a>
				<a href="javascript:;"  v-show='countdown'>{{second}}秒</a>
			</div>
			<button type='button' :class="[ 'ex-bank-btn', {disableBtn:disableBtn}]" @click='submit'>提 交</button>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
export default {
	data () {
		return {
			card:'', 
			banks:'', 
			phone:'',
			userphone: '',
			province:'',
			city:'',
			branch:'',
			phonecode: '',
			repeatBtn: false,
			countdown: false,
			second: 120
		}
	},
	computed: {
		disableBtn () {
			let rule1 = /^\d{16,}$/.test(this.card) ? true :false
			let rule2 = this.city ? true :false
			let rule3 = this.branch ? true :false
			let rule4 = /^1\d{10}$/.test(this.phone) ? true :false
			if (rule1 && rule2 && rule3 && rule4) {
				return false
			} else {
				return true
			}
		},
		bankname () {
			if (this.banks) {
				return '中国' + this.banks + '银行'
			} else {
				return '中国银行'
			}
		},
		branchname () {
			if (this.province) {
				return this.province + '省' + this.city +'市'+this. branch +'支行'
			} else {
				return this.city +'市'+this. branch +'支行'
			}
		}

	},
	created () {
		let _this = this
		axios.post('user/personal',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.phone = res.data.data.phone
				_this.userphone =  res.data.data.phone
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			MessageBox('提示', '系统出错了，正在修复中...')
		})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		getcode () {
			if (!(/^1\d{10}$/.test(this.phone))) {
				MessageBox('提示', '手机号码不正确!')
				return
			}
			let _this = this
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
				MessageBox('提示', '系统出错了，正在修复中...')
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
		submit () {
			if (/^\d{16,}$/.test(this.card)) {
				MessageBox('提示', '银行卡号不正确！')
				return
			}
			if (!this.city || !this.branch) {
				MessageBox('提示', '支行名称不能为空！')
				return
			}
			if (!/^1\d{10}$/.test(this.phone)) {
				MessageBox('提示', '手机号码不正确！')
				return
			}
			if (this.repeatBtn) {
				return
			}
			let _this = this
			axios.post('user/personal',qs.stringify({
				cardNo: this.cardNo,
				banks: this.bankname,
				branch: this.branchname,
				phone: this.phone,
				cardType: 1,
				accountName: null,
				phoneCode:_this.phonecode
			}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.phone = res.data.data.phone
				} else {
					MessageBox('提示', '请求数据失败！')
				}
			})
			.catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
			})
		}
	}
}	
</script>

<style scoped>
.ex-addcard { font-size: 1.4rem; padding-bottom: 5rem;  height: 100%;}
.ex-addcard-cnt {background-color: #f4f5f7;position: absolute; top: 5rem; left: 0;}
.ex-addcard-cnt .tips{ color: #5d646e; padding: 1.5rem 1rem; line-height: 1.5; font-size: 1.2rem;}
.ex-addcard-cnt div {background-color: #fff;  vertical-align: middle;}
.ex-addcard-cnt div label {display: inline-block; width: 25%; height: 3rem; line-height: 3rem;}
.ex-addcard-cnt input {border: none;  color: #2eadff;vertical-align: middle; }
.ex-addcard-num {border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem;}
.ex-addcard-num input {width: 70%; height: 3rem;}
.ex-addcard-name {line-height: 3rem; padding: 0.5rem 1rem;}
.ex-addcard-name input { height: 3rem; width: 40%; text-align: center;}
.ex-addcard-subname {padding: 0 1rem;}
.ex-addcard-subname p{border-bottom: 1px solid #e5e5e5; padding: 0.5rem 0;}
.ex-addcard-subname p input {  text-align: center; height: 3rem; }
.ex-addcard-subname .provice input { width: 22%; }
.ex-addcard-subname .address{padding-left: 20%;}
.ex-addcard-subname .address input { width: 35%; }
.ex-addcard-subname .provice span {color:#ffa132; font-size: 1.2rem;}
.ex-bank-btn { margin: 2rem 4%; display: block; width: 92%; background-color: #58c86b; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem; text-align: center; font-size: 1.8rem;}
.verycode {position: relative;}
.verycode a{position: absolute; right: 0.5rem; top: 1.5rem; color: #ffa132; }
</style>