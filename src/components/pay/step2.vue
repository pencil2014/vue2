<template>
	<div class="ex-warpper">
		<div class="head">
			<div class="money">
				<p>支付金额</p>
				&yen;{{userData.money|checknum}}
			</div>
			<div class="shopname">
				<img src="../../assets/images/shop.png" alt="">
				<span>{{userData.shopname}}</span>
			</div>
		</div>
		<div class="points" v-if="userData.isNewUser === 1">*登录密码会发送至您的手机号{{phone}}，请注意查收</div>
		<div class="user">
			<div class="avatar">
				<img src="../../assets/images/head.png" alt="" v-show="!userData.logoImg">
				<img src="../../assets/images/girl01.png" alt="" v-show="userData.logoImg === 'girl01'">
				<img src="../../assets/images/girl02.png" alt="" v-show="userData.logoImg === 'girl02'">
				<img src="../../assets/images/girl03.png" alt="" v-show="userData.logoImg === 'girl03'">
				<img src="../../assets/images/girl04.png" alt="" v-show="userData.logoImg === 'girl04'">
				<img src="../../assets/images/girl05.png" alt="" v-show="userData.logoImg === 'girl05'">
				<img src="../../assets/images/boy01.png" alt="" v-show="userData.logoImg === 'boy01'">
				<img src="../../assets/images/boy02.png" alt="" v-show="userData.logoImg === 'boy02'">
				<img src="../../assets/images/boy03.png" alt="" v-show="userData.logoImg === 'boy03'">
				<img src="../../assets/images/boy04.png" alt="" v-show="userData.logoImg === 'boy04'">
				<img src="../../assets/images/boy05.png" alt="" v-show="userData.logoImg === 'boy05'">
				<span class="identity" :class="{'vip': userData.userLev === '2'}">e享会员</span>
			</div>
			<div class="message">
				<span class="name" v-if="userData.userName">
					{{userData.userName}} (ID:{{userData.userCode}})
				</span>
				<span class="name" v-if="!userData.userName">
					ID:{{userData.userCode}}
				</span><br>
				<span>e积分{{userData.integralA |checknum}},支付后将获得e积分<label for="" class="orange">{{userData.money | checknum}}</label></span>
			</div>
		</div>
		<div class="form_bt">
			<input type="button" value="支付" @click="submit" :class="{disableBtn: disable }">
		</div>
		<!-- <div class="qrcode_modal" v-show="qrcode.show">
	        <div class="qrcode_box">
	            <div class="qrcode_content">
	                <p class="tip">长按二维码付款</p>
	                <div class="code">
	                    <div id="qrcode"></div>
	                </div>
	                <div class="tip2">
	                	<p>支付完成后可前往 <br>
	                	<a href="http://www.exgj.com.cn"></a></p>
	                </div>
	            </div>
	        </div>
	    </div> -->
		<div class="modal_Bj" v-show="type === '3'">
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
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
// import Qrcode from '../../assets/lib/qrcode'
import { Toast , Indicator , MessageBox} from 'mint-ui'
export default {
	data () {
		return{
			sel: '',
			userData: '',
			// qrcode:{
			// 	show:false,
			// 	link:''
			// },
			logoImg: '',
			submitbtn:false,
			isShop: '',
		}
	},
	computed: { 
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
		phone () {
			let phone = this.userData.phone
			if(phone){
				return phone.replace(/^(\d{3})(\d{4})(\d{4})/,'$1****$3')
			}
		},
		disable () {
			if(this.type === '3' || this.isShop === '0' ){
				return true
			}else{
				return false
			}
		}
	},
	created () {
		this.sel = this.type;
		let userData = JSON.parse(window.sessionStorage.getItem('userData'))
		if(!userData){
			this.$router.back()
			return
		}
		this.userData = userData
		this.checkUserIsShop()
	},
	methods: {
		select (type) {
			this.sel = type;
		},
		submit () {
			let _this = this;
			if(_this.submitbtn){
				return 
			}
			if(_this.type === '3'){
				MessageBox('提示','该功能不支持使用浏览器操作，请用微信或支付宝扫描二维码')
				return 
			}
			if(_this.isShop === '0'){
				MessageBox('提示','二维码已失效')
				return 
			}
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			})
			_this.submitbtn = true
			axios.create({
				headers: {'authorization': 'Bearer ' +　this.userData.paytoken}
			}).post('/exsd-web/consume/toPay',qs.stringify({
				payType: _this.type,
				shopId: _this.userData.shopId,
				userId: _this.userData.userId,
				amount: _this.userData.money
			})).then(res =>{
				Indicator.close();
				if(res.data.code === '10000'){
					// if(res.data.data.limitStatus === '1'){
					// 	MessageBox({
					// 		title:'提示',
					// 		message: '',
					// 		showConfirmButton: true,
					// 		showCancelButton: true,
					// 	}).then(action => {
					// 		if(action === "confirm"){
					// 			window.location.href = res.data.data.payUrl
					// 		}else{
					// 			_this.submitbtn = false
					// 		}
					// 	})
					// 	return 
					// }
					// if(_this.userData.money > 5){
					// 	MessageBox({
					// 		title:'提示',
					// 		message:'您的订单交易金额大于5，报单需要人工审核',
					// 		showConfirmButton:true,
					// 		showCancelButton:true,
					// 	}).then(action =>{
					// 		if(action === "confirm"){
					// 			window.location.href = res.data.data.payUrl
					// 		}else{
					// 			_this.submitbtn = false
					// 		}
					// 	});
					// 	return
					// }
					window.location.href = res.data.data.payUrl
				}else{
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.submitbtn = false
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		checkUserIsShop () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/user/checkUserIsShop',qs.stringify({userId: this.userData.shopId}))
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
	},
	filters: {
		checknum (value) {
			value = value? value+'' : '0'
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		},
	},
	components: {
		
	},
}
</script>
<style scoped>
.ex-warpper{min-height: 100%;width: 100%;overflow-x: hidden;background: #eff0f7}
.head{background: #fff;padding-left: 10px;margin-bottom: 18px;}
.head .money{color: rgb(33,42,50);font-size: 3rem;text-align: center;line-height: 30px;border-bottom: solid 1px #ebebeb;padding: 30px 0;}
.head .money p{color: rgb(88,100,133);font-size: 1.4rem;}
.head .shopname{padding: 10px 0;font-weight: bold;height: 25px;line-height: 25px;}
.head .shopname img{width: 25px;padding-right: 5px;vertical-align: middle;}

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

.pay-option{background: #fff;margin-top: 18px;font-size: 1.4rem;color: rgb(88,100,133)}
.pay-option .tip{margin-left: 10px;line-height: 30px;border-bottom: solid 1px #ebebeb;}
.pay-option .table{display: table;width: 100%;border-bottom: solid 1px #ebebeb;padding: 15px 0 15px 10px;}
.pay-option .table:last-child{border-bottom: none;}
.pay-option .table span{display: table-cell;vertical-align: middle;}
.pay-option .table .m1{width: 20%;text-align: left;text-align: center;}
.pay-option .table .m2{width: 60%;color: rgb(153,153,153);}
.pay-option .table .m2 .title{font-size: 1.4rem;color: rgb(33,42,50);padding-bottom: 5px;}
.pay-option .table .m3{width: 20%;text-align: right;padding-right: 3rem;vertical-align: middle;}
.pay-option .table .m1 img{width: 40px;}
.pay-option .table .m3 .option{width: 18px;height: 18px;background: url(../../assets/images/noselect1.png) center no-repeat;background-size: 100%;}
.pay-option .table .m3 .option.select{background: url(../../assets/images/select1.png) center no-repeat;background-size: 100%;}
.pay-option .disable{background: #d6d6d6;}

.form_bt{padding: 18px 15px 56px 15px;}
.form_bt input[type=button]{width: 100%;height: 48px;background: #3dbc3c;border: none;border-radius: 3px;color: #fff;font-size: 1.6rem;}
.form_bt input[type=button]:active{background: rgba(61,188,60,0.8);}

.modal_Bj{width: 100%;height: 100%;background:rgba(0,0,0,0.42);position: fixed;top: 0;left: 0;z-index: 999;display: table;}
.modal_Bj .modal{vertical-align: middle;display: table-cell;padding: 0 12%;}
.modal_Bj .modal .content{background: #fff;width: 100%;border-radius: 5px;text-align: center;}
.modal_Bj .modal .content .title{line-height: 30px;font-size: 2rem;padding: 10px 0;}
.modal_Bj .modal .content .text{line-height: 20px;font-size: 1.4rem;color: rgb(33,42,50);padding: 0 15px 25px 15px;}
.modal_Bj .modal .content .button{padding: 20px;}
.modal_Bj .modal .content .button input{width: 100%;height: 40px;border: none;background: #3dbc3c;color: #fff;border-radius: 3px;}
.modal_Bj .modal .content .button input:active{background: rgba(61,188,60,0.8);}

/*.qrcode_modal{width: 100%;height: 100%;background:#0470b6;position: fixed;top: 0;left: 0;z-index: 999;display: table;}
.qrcode_modal .qrcode_box{vertical-align: middle;display: table-cell;padding: 0 12%;}
.qrcode_modal .qrcode_box .qrcode_content{background: #fff;width: 100%;border-radius: 5px;text-align: center;padding: 0 0 0 0;}
.qrcode_modal .qrcode_box .qrcode_content .qrcode img{}
.qrcode_modal .qrcode_box .qrcode_content .tip{line-height: 50px;font-size: 1.6rem;padding: 20px 0;}
.qrcode_modal .qrcode_box .qrcode_content .tip2{padding: 20px 0 30px 0;}
.qrcode_modal .qrcode_box .qrcode_content .tip2 a:after{content: " (" attr(href) ")"}
.qrcode{padding-left: 15px;}
.qrcode_modal .qrcode_box .qrcode_content .code #qrcode{width: 230px;margin: auto;}*/
</style>