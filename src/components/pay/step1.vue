<template>
	<div class="ex-warpper">
		<div class="ex-header"></div>
		<div class="ex-contain">
			<div class="shopName">{{shopname}}</div>
			<div class="form">
				<input type="tel" placeholder="请输入金额" v-model.trim="money" @input="currency('money')">
			</div>
			<div class="form">
				<div class="tip">输入手机号参与商家分享</div>
				<input type="tel" placeholder="请输入手机号" v-model.trim="phone" @input="maxlen('phone')">
			</div>
			<div class="form_bt">
				<input type="button" value="支付" @click="submit" :class="{disableBtn:disableBtn}">
			</div>
		</div>
		<div class="modal_Bj" v-show="type === '3'">
			<div class="modal">
				<div class="content">
					<div class="title">提示</div>
					<div class="text">该功能不支持使用浏览器操作，请用微信或支付宝扫描二维码</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , Indicator, MessageBox } from 'mint-ui'
export default {
	data(){
		return{
			money:'',
			phone:'',
			submitbtn:false
		}
	},
	computed: {
		shopname () {
			let shopname = this.$route.query.shopname
			if(shopname == undefined){
				return ''
			}
			return decodeURIComponent(shopname)
		},
		userID () {
			return this.$route.query.userId
		},
		disableBtn () {
			let rule1 = /^1\d{10}$/;
			let rule2 = /^\d+(\.\d{1,2})?$/
			if(!this.money|| (this.money == 0) ||!this.phone|| !rule1.test(this.phone) || !rule2.test(this.money)){
				return true
			}else{
				return false
			}
		},
		type () {
			let ua = navigator.userAgent.toLowerCase()
			if(ua.indexOf('micromessenger') !== -1){
				return '1'
			}else if(ua.indexOf('alipayclient') !== -1){
				return '2'
			}else{
				return '3'
			}
		},
	},
	created () {
		
	},
	methods: {
		maxlen (id) {
		    this[id] = this[id].slice(0,11)
		},
		currency (id) {
			let value = this[id];
			value = value.replace(/^([0-9]{1,})(\.+)$/,'$1.').replace(/^([0-9]{1,})(\.[0-9]{1,2})(.*)$/,'$1$2')
			this[id] = value.slice(0,9)
		},
		submit () {
			let _this = this;
			if(_this.disableBtn || _this.submitbtn){
				return
			}
			// if(_this.money > 50000){
			// 	Toast('每笔不能大于50000')
			// 	return
			// }
			_this.submitbtn = true

			Indicator.open({
			  text: '用户检测中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('user/isEixt',qs.stringify({phone: this.phone}))
			.then(function(res){
				Indicator.close()
				let str = ''	
				if (res.data.code === '10000') {
					if (res.data.msg === 'true') {
						if(!res.data.data.realName){
							str = "<span>用户编号："+res.data.data.userCode+"<br/>手机号："+ _this.phone.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')+"</span><p style='color:red;font-size:1.2rem; line-height:1.5;'>(注：请仔细核对信息，报错单损失无法追回！)</p>"
						}else{
							str = "<span>用户编号："+res.data.data.userCode+"<br/>姓名："+res.data.data.realName+"<br />手机号："+ _this.phone.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')+"</span><p style='color:red;font-size:1.2rem; line-height:1.5;'>(注：请仔细核对信息，报错单损失无法追回！)</p>"
						}
					} else {
						str = "您还不是易享时代会员，系统会自动帮您注册成为会员！"
					}
					MessageBox({
					  title: '提示',
					  message: str,
					  showCancelButton: true
					}).then(action => {
						if (action === 'confirm') {
							_this.submitFun()
						} else {
							_this.submitbtn = false
						}
					})
				}
				else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
			
		},
		submitFun () {
			let _this = this;
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			})
			axios.create({
				headers: {'authorization': ''}
			}).post('consume/toChoosePayment',qs.stringify({
				shopId: _this.userID,
				amount: _this.money,
				phone: _this.phone
			})).then(res =>{
				Indicator.close();
				if (res.data.code === '10000') {
					window.localStorage.setItem('paytoken', res.data.data.token)

					let userData = {};
					userData.shopId = res.data.data.shopId
					userData.shopCode = _this.$route.query.userCode
					userData.userId = res.data.data.userId
					userData.money = _this.money
					userData.shopname = _this.shopname
					userData.userCode = res.data.data.data.userCode
					userData.integralA = res.data.data.data.integralA
					userData.phone = res.data.data.data.phone
					userData.userLev =  res.data.data.data.userLev
					userData.userName =  res.data.data.data.userName
					userData.isNewUser = res.data.data.isNewUser
					
					window.localStorage.setItem('userData',JSON.stringify(userData))
					_this.$router.push('/pay/step2')
				} else {
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			}).catch(function(){
					_this.submitbtn = false
					Indicator.close();	
					Toast('连接失败，请检查网络是否正常!')
			})
		} 
	},
}
</script>
<style scoped>
.ex-warpper{min-height: 100%;width: 100%;overflow-x: hidden;}
.ex-header{width: 100%;height: 12rem;background: url(../../assets/images/pay_bg.png) no-repeat center;background-size: cover;}
.ex-contain{color: rgb(33,42,50);}
.ex-contain .shopName{text-align: center;padding: 15px 0;font-size: 1.6rem;font-weight: bold;}
.ex-contain .form{padding: 0 15px 15px 15px;}
.ex-contain .form input[type=tel]{border-radius: 3px;border: solid 1px #e5e5e5;height: 40px;width: 100%;background: #eee;font-size: 1.6rem;text-indent: 1rem;}
.ex-contain .form input[type=tel]:focus{border: solid 1px rgb(245,174,38);}
.ex-contain .form_bt{padding: 0 15px 0 15px;}
.ex-contain .form_bt input[type=button]{width: 100%;height: 48px;background: #3dbc3c;border: none;border-radius: 3px;color: #fff;font-size: 1.6rem;}
.ex-contain .form_bt input[type=button]:active{background: rgba(61,188,60,0.8);}
.ex-contain .form .tip{line-height: 30px;font-size: 1.4rem;color: rgb(245,174,38);}

.modal_Bj{width: 100%;height: 100%;background:rgba(0,0,0,0.42);position: fixed;top: 0;left: 0;z-index: 999;display: table;}
.modal_Bj .modal{vertical-align: middle;display: table-cell;padding: 0 12%;}
.modal_Bj .modal .content{background: #fff;width: 100%;border-radius: 5px;text-align: center;}
.modal_Bj .modal .content .title{line-height: 30px;font-size: 2rem;padding: 10px 0;}
.modal_Bj .modal .content .text{line-height: 20px;font-size: 1.4rem;color: rgb(33,42,50);padding: 0 15px 25px 15px;}
.modal_Bj .modal .content .button{padding: 20px;}
.modal_Bj .modal .content .button input{width: 100%;height: 40px;border: none;background: #3dbc3c;color: #fff;border-radius: 3px;}
.modal_Bj .modal .content .button input:active{background: rgba(61,188,60,0.8);}
</style>