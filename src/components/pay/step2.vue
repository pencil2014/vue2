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
		<div class="points">*登录密码会发送至您的手机号{{phone}}，请注意查收</div>
		<div class="user">
			<div class="avatar">
				<img src="../../assets/images/head.png" alt="">
				<span class="identity" :class="{'vip': userData.userLev === '2'}">E享会员</span>
			</div>
			<div class="message">
				<span class="name" v-if="userData.userName">
					{{userData.userName}} (ID:{{userData.userCode}})
				</span>
				<span class="name" v-else>
					ID:{{userData.userCode}}
				</span><br>
				<span>E积分{{userData.integralA |checknum}},支付后将获得E积分<label for="" class="orange">{{userData.money | checknum}}</label></span>
			</div>
		</div>
		<div class="pay-option">
			<div class="tip" v-if="type!=='3'">请选择付款方式</div>
			<div class="table" v-if="type === '1'" @click="select('1')">
				<span class="m1">
					<img src="../../assets/images/wechat.png" alt="">
				</span>
				<span class="m2">
					<p class="title">微信支付</p>
					<p>自然日6:00-7:00到账，单笔限额3000 <br>
					参与微信支付奖励活动</p>
				</span>
				<span class="m3">
					<i class="option" :class="{select: sel == '1'}"></i>
				</span>
			</div>
			<div class="table" v-if="type === '2'" @click="select('2')">
				<span class="m1">
					<img src="../../assets/images/zhifubao.png" alt="">
				</span>
				<span class="m2">
					<p class="title">支付宝支付</p>
					<p>交易时间段 9:00-22:00 <br>
					不在此时间段内的交易自动转换为T+1到账</p>
				</span>
				<span class="m3">
					<i class="option" :class="{select: sel == '2'}"></i>
				</span>
			</div>
			<div class="table" @click="select('3')">
				<span class="m1">
					<img src="../../assets/images/bank.png" alt="">
				</span>
				<span class="m2">
					<p class="title">银行卡收款</p>
					<p>工作日15:00-18:00到账，单笔限额最高20000元<br>
					不参与微信支付奖励活动
					</p>
				</span>
				<span class="m3" >
					<i class="option" :class="{select: sel == '3'}" v-if="type!=='3'"></i>
				</span>
			</div>
		</div>
		<div class="form_bt">
			<input type="button" value="支付" @click="submit" :class="{disableBtn: type === '3' }">
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
import { Toast , Indicator , MessageBox} from 'mint-ui'
export default {
	data () {
		return{
			sel: '',
			userData: '',
			submitbtn:false
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
	},
	watch:{
		
	},
	created () {
		this.sel = this.type;
		let token = window.localStorage.paytoken
		if(!token){
			this.$router.back()
		}
		this.userData = JSON.parse(window.localStorage.getItem('userData'))
	},
	methods: {
		select (type) {
			this.sel = type;
		},
		submit () {
			let _this = this;
			if(_this.submitbtn || _this.type === '3'){
				return 
			}
			_this.submitbtn = true
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			})
			axios.create({
				headers: {'authorization': 'Bearer ' +　window.localStorage.paytoken}
			}).post('consume/toPay',qs.stringify({
				payType: _this.type,
				shopId: _this.userData.shopId,
				userId: _this.userData.userId,
				amount: _this.userData.money
			})).then(res =>{
				Indicator.close();
				if(res.data.code === '10000'){	
					MessageBox({
						title: '提示',
						message:'支付成功',
						confirmButtonText: '确定'
					}).then(action =>{
						if(action === "confirm"){
							
						}
					});
				}else{
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			}).catch(function(){
					_this.submitbtn = false
					Indicator.close();
					Toast('网络异常')
			})
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
	}
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
.pay-option .table{display: table;width: 100%;margin-left: 10px;border-bottom: solid 1px #ebebeb;padding: 15px 0;}
.pay-option .table:last-child{border-bottom: none;}
.pay-option .table span{display: table-cell;}
.pay-option .table .m1{width: 20%;text-align: left;vertical-align: top;text-align: center;}
.pay-option .table .m2{width: 60%;color: rgb(153,153,153)}
.pay-option .table .m2 .title{font-size: 1.4rem;color: rgb(33,42,50);padding-bottom: 5px;}
.pay-option .table .m3{width: 20%;text-align: right;padding-right: 3rem;vertical-align: middle;}
.pay-option .table .m1 img{width: 40px;}
.pay-option .table .m3 .option{width: 18px;height: 18px;background: url(../../assets/images/noselect.png) center no-repeat;background-size: 100%;}
.pay-option .table .m3 .option.select{background: url(../../assets/images/select.png) center no-repeat;background-size: 100%;}

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
</style>