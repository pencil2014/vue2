<template>
	<div class="warpper">
		<div class="top">
			<div class="money">
				<p>支付金额</p>
				&yen;{{msg.money|checknum}}
			</div>
			<div class="shopname">
				<img src="../../assets/images/shop.png" alt="">
				<span>{{msg.shopname}}</span>
			</div>
		</div>
		<div class="points" v-show="msg.isNewUser === 1">*登录密码会发送至您的手机号{{msg.phone | formatPhone}}，请注意查收</div>
		<div class="user">
			<div class="avatar">
				<img src="../../assets/images/head.png" alt="" v-if="!msg.logoImg">
				<img src="../../assets/images/girl01.png" alt="" v-if="msg.logoImg === 'girl01'"> 
				<img src="../../assets/images/girl02.png" alt="" v-if="msg.logoImg === 'girl02'">
				<img src="../../assets/images/girl03.png" alt="" v-if="msg.logoImg === 'girl03'">
				<img src="../../assets/images/girl04.png" alt="" v-if="msg.logoImg === 'girl04'">
				<img src="../../assets/images/girl05.png" alt="" v-if="msg.logoImg === 'girl05'">
				<img src="../../assets/images/boy01.png" alt="" v-if="msg.logoImg === 'boy01'">
				<img src="../../assets/images/boy02.png" alt="" v-if="msg.logoImg === 'boy02'">
				<img src="../../assets/images/boy03.png" alt="" v-if="msg.logoImg === 'boy03'">
				<img src="../../assets/images/boy04.png" alt="" v-if="msg.logoImg === 'boy04'">
				<img src="../../assets/images/boy05.png" alt="" v-if="msg.logoImg === 'boy05'">
				<span class="identity" :class="{'vip': msg.userLev === '2'}">e享会员</span>
			</div>
			<div class="message">
				<span class="name" v-if="msg.userName">
					{{msg.userName}} (ID:{{msg.userCode}})
				</span>
				<span class="name" v-if="!msg.userName">
					ID:{{msg.userCode}}
				</span><br>
				<span>e积分{{msg.integralA |checknum}},支付后将获得e积分<label for="" class="orange">{{msg.money | checknum}}</label></span>
			</div>
		</div>
		<div class="form_bt">
			<input type="button" value="支付" @click="submit" :class="{disableBtn: msg.BrowserType === '3' }">
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , Indicator , MessageBox} from 'mint-ui'

export default {
	props: ['msg'] ,
	data () {
		return{
			
		}
	},
	methods: {
		submit () {
			if(this.msg.BrowserType === '3'){
				MessageBox('提示','该功能不支持使用浏览器操作，请用微信或支付宝扫描二维码！')
				return
			}
			this.$emit('submit',this.msg)
		}
	},
	filters: {
		checknum (value) {
			value = value? value+'' : '0'
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		},
		formatPhone (value) {
			return value.replace(/^(\d{3})(\d{4})(\d{4})/,'$1****$3')
		}
	},

}
</script>
<style scoped>
.warpper{height: 100%;width: 100%;overflow-x: hidden;background: #eff0f7;overflow-y: auto;}
.top{background: #fff;padding-left: 10px;margin-bottom: 18px;}
.top .money{color: rgb(33,42,50);font-size: 3rem;text-align: center;line-height: 30px;border-bottom: solid 1px #ebebeb;padding: 30px 0;}
.top .money p{color: rgb(88,100,133);font-size: 1.4rem;}
.top .shopname{padding: 10px 0;font-weight: bold;height: 25px;line-height: 25px;}
.top .shopname img{width: 25px;padding-right: 5px;vertical-align: middle;}
.points{line-height: 30px;padding-left: 10px;color: rgb(88,100,133);}
.user{background: #fff;height: 70px;padding: 15px 0;padding-left: 10px;}
.user .avatar{width:94px;height:70px;position: relative;text-align: center;float: left;}
.user .avatar img{width:60px;height:60px;border-radius: 50%;position: absolute;left: 17px;}
.user .avatar .identity{display: inline-block;width: 100%;height: 23px;position: absolute;bottom: 0;right: 0;line-height: 20px;color: #fff;background: url(../../assets/images/identity.png) no-repeat center;background-size: 100%;}
.user .avatar .identity.vip{background: url(../../assets/images/header2.png) no-repeat center;background-size: 100%;text-indent: 1.8rem;}
.user .avatar .identity.vip:before{content:'';width:30px;height:30px;background: url(../../assets/images/vip.png);background-size: 100%;position: absolute;left: 7px;bottom: 4px;}
.user .message{width: 100%;height: 100%;color: rgb(88,100,133);line-height: 20px;}
.user .message span{display: inline-block;word-break: break-all;max-width: 65%;}
.user .message label.orange{color: rgb(245,174,38)}
.user .message .name{font-size: 1.6rem;color: rgb(33,42,50);padding-top: 15px;}
.form_bt{padding: 18px 15px 56px 15px;}
.form_bt input[type=button]{width: 100%;height: 48px;background: #3dbc3c;border: none;border-radius: 3px;color: #fff;font-size: 1.6rem;}
.form_bt input[type=button]:active{background: rgba(61,188,60,0.8);}
</style>