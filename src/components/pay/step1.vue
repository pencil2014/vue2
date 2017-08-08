<template>
	<div class="ex-warpper">
		<div class="ex-header">
			<img src="../../assets/images/paytop.png" alt="">
		</div>
		<div class="ex-contain">
			<div class="shopName">{{shopname}}</div>
			<div class="form">
				<input type="number" placeholder="请输入金额" v-model.trim="money" @input="currency('money')">
			</div>
			<div class="form">
				<div class="tip">输入手机号参与商家分享</div>
				<input type="tel" placeholder="请输入手机号" v-model.trim="phone" @input="maxlen('phone')">
			</div>
			<div class="form_bt">
				<input type="button" value="支付" @click="submit" :class="{disableBtn:disableBtn}">
			</div>
		</div>
		<div class="modal_Bj" v-if="type === '3'">
			<div class="modal">
				<div class="content">
					<div class="title">提示</div>
					<div class="text">该功能不支持使用浏览器操作，请用微信或支付宝扫描二维码</div>
				</div>
			</div>
		</div>
		<div class="modal_Bj" v-if="isShop === '0'">
			<div class="modal">
				<div class="content">
					<div class="title">提示</div>
					<div class="text">二维码已失效</div>
				</div>
			</div>
		</div>
		<!-- <div class="modal_Bj">
			<div class="modal">
				<div class="content">
					<div class="box">
						<div class="title">
							提示
						</div>
						<div class="text">
							qqqqqqqqq
						</div>
					</div>
					<div class="option">
						<span @click="cancle">取消</span>
						<span class="blue" @click="confirm">确定</span>
					</div>
				</div>
			</div>
		</div> -->
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
			submitbtn:false,
			isShop: '',
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
			if(!this.money|| (this.money == 0) ||!this.phone|| !rule1.test(this.phone) || !rule2.test(this.money) || this.isShop === '0'){
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
		let userData = JSON.parse(window.sessionStorage.getItem('userData'))
		if(userData){
			this.money = userData.money
			this.phone = userData.phone
		}
		this.checkUserIsShop()
		
	},
	methods: {
		checkUserIsShop () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('user/checkUserIsShop',qs.stringify({userId: this.userID}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.isShop = res.data.data.isShop
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		maxlen (id) {
		    this[id] = this[id].slice(0,11)
		},
		currency (id) {
			let value = this[id];
			value = value.replace(/^([0-9]{1,})(\.+)$/,'$1.').replace(/^([0-9]{1,})(\.[0-9]{1,2})(.*)$/,'$1$2')
			this[id] = value.slice(0,8)
		},
		submit () {
			let _this = this;
			let rule1 = /^1\d{10}$/;
			let rule2 = /^\d+(\.?\d{1,2})?$/
			if(_this.submitbtn){
				return
			}
			if(this.isShop === '0'){
				MessageBox('提示','二维码已失效！')
				return 
			}
			if(!rule2.test(this.money) || this.money*1 === 0){
				MessageBox('提示','请输入正确的金额！')
				return
			}
			if(this.money > 50000){
				MessageBox('提示','单笔金额不能超过50000！')
				return
			}
			if(!this.phone){
				MessageBox('提示','手机号不能为空！')
				return
			}
			if(!rule1.test(this.phone)){
				MessageBox('提示','手机号不正确！')
				return 
			}
			
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
						str = "<span style='color:red;font-size:bold;'>"+_this.phone+" </span>还不是易享会员，点击确定视为您了解并同意易享平台《服务协议》，并自动注册成为平台会员！"
					}
					MessageBox({
					  title: '提示',
					  message: str,
					  showCancelButton: true
					}).then(action => {
						if (action === 'confirm') {
							_this.submitFun()
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
			this.submitbtn = true
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
					userData.logoImg = res.data.data.data.logoImg
					userData.paytoken = res.data.data.token
					window.sessionStorage.setItem('userData',JSON.stringify(userData))
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
.ex-warpper{min-height: 100%;width: 100%;overflow-x: hidden;position: absolute;}
.ex-header{width: 100%;}
.ex-header img{width: 100%;}
.ex-contain{color: rgb(33,42,50);}
.ex-contain .shopName{text-align: center;padding: 15px 0;font-size: 1.6rem;font-weight: bold;}
.ex-contain .form{padding: 0 15px 15px 15px;}
.ex-contain .form input{border-radius: 3px;border: solid 1px #e5e5e5;height: 40px;width: 100%;background: #eee;font-size: 1.6rem;text-indent: 1rem;}
.ex-contain .form input:focus{border: solid 1px rgb(245,174,38);}
.ex-contain .form_bt{padding: 0 15px 0 15px;}
.ex-contain .form_bt input[type=button]{width: 100%;height: 48px;background: #3dbc3c;border: none;border-radius: 3px;color: #fff;font-size: 1.6rem;}
.ex-contain .form_bt input[type=button]:active{background: rgba(61,188,60,0.8);}
.ex-contain .form .tip{line-height: 30px;font-size: 1.4rem;color: rgb(245,174,38);}

.modal_Bj{width: 100%;height: 100%;background:rgba(0,0,0,0.42);position: fixed;top: 0;left: 0;z-index: 999;display: table;}
.modal_Bj .modal{vertical-align: middle;display: table-cell;padding: 0 12%;}
.modal_Bj .modal .content{background: #fff;width: 100%;border-radius: 5px;text-align: center;overflow: hidden;}
.modal_Bj .modal .content .title{line-height: 30px;font-size: 2rem;padding: 10px 0;}
.modal_Bj .modal .content .text{line-height: 20px;font-size: 1.4rem;color: rgb(33,42,50);padding: 0 15px 25px 15px;}
/*.modal_Bj .modal .content .button{padding: 20px;}
.modal_Bj .modal .content .button input{width: 100%;height: 40px;border: none;background: #3dbc3c;color: #fff;border-radius: 3px;}
.modal_Bj .modal .content .button input:active{background: rgba(61,188,60,0.8);}*/
/*.modal_Bj .modal .content .box{border-bottom: solid 1px #ebebeb;}
.modal_Bj .modal .content .option{display: table;width: 100%;}
.modal_Bj .modal .content .option span{display: table-cell;width: 50%;border-right: solid 1px #ebebeb;font-size: 1.6rem;color: #212a32;padding: 8px 0;}
.modal_Bj .modal .content .option span.blue{color: #29a0ec;}
.modal_Bj .modal .content .option span:last-child{border-right: none;}
.modal_Bj .modal .content .option span:active{background: #ebebeb;}*/
</style>