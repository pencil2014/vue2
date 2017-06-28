<template>
	<div class="ex-declare">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>商家报单</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-declare-progress">
			<p class="percent">
				<span></span>
			</p>
			<div class="ex-declare-progress-item active">
				<b>1</b>
				<span>基本信息</span>
			</div>
			<div class="ex-declare-progress-item secend">
				<b>2</b>
				<span>消费凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>3</b>
				<span>汇款凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>4</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-declare-tips">
			<div class="ex-declare-tips-box">
				<div class="ex-declare-tips-item">
				<b>一、公司汇款账号</b>
				<p>1. 跨行转帐银行（平安银行）：</p>
				<p>帐户名称：深圳前海易享时代商业服务有限公司</p>
				<p>帐号：1500 0082 0106 27</p>
				<p>开户行：平安银行(深圳江苏大厦支行) </p>
				<p>2. 同行转帐银行（农行）：</p>
				<p>帐户名称：深圳前海易享时代商业服务有限公司</p>
				<p>帐号：4103 3100 0400 25297</p>
				<p>开户行：中国农业银行(深圳凤凰支行)</p>
				<p>3. 公司备用转帐银行（深圳农商行）：</p>
				<p>帐户名称：深圳前海易享时代商业服务有限公司</p>
				<p>帐号： 0002 3026 3413</p>
				<p>开户行：农村商业银行(深圳观澜支行)</p>
			</div>
			<!-- <div class="ex-declare-tips-item">
				<b>二、会员升级及商家报单审核时间：</b>
				<p>16:30-17:00</p>
			</div> -->
			<div class="ex-declare-tips-item">
				<b>二、商家报单打款必须备注：</b>
				<p class='red'>卖家ID 让 买家ID（例如B335让M1024）</p>
			</div>
			<div class="ex-declare-tips-item">
				<b>三、关注审批进度：</b>
				<p>基本信息提交后，请到报单进度点击详情关注进度</p>
			</div>
			</div>
		</div>
		<div class="ex-declare-cnt">
			<div class="ex-declare-box" >
				<div class="ex-declare-cnt-item">
				<span>*买家用户编号</span>
				<input type="tel" placeholder="请输入买家用户编号" v-model.trim='userCode'>
				<a href="javascript:;" @click='exit' class='exit'>校 验</a>
			</div>
			<!-- <div class="ex-declare-cnt-item">
				<span>*买家手机号</span>
				<input type="tel" placeholder="请输入买家手机号" v-model.trim='commodityPhone' maxlength="11">
			</div> -->
			<div class="ex-declare-cnt-item">
				<span>*商品名称</span>
				<input type="text" placeholder="请输入商品名称" v-model.trim='commodityName' maxlength="15">
			</div>
			<div class="ex-declare-cnt-item">
				<span>*消费金额</span>
				<input type="text" placeholder="请输入消费金额" v-model.trim='consumptionMoney' maxlength="11" @change='formatMoney'>
			</div>
			</div>
		</div>
		<button type='button'  :class="[ 'ex-declare-btn', {disableBtn:disableBtn}]" @click='next'>下一步</button>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Toast, Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			userCode: '',
			buyerPhone: '',
			isEixt: '',
			commodityName: '',
			consumptionMoney: '',
			commodityPhone: '',
			userId: '',
			realName: '',
			hasEixt: false,
			selfUserCode: '',
			repeatBtn: false,
			modal:{
				text:'单笔报单',
				fixed: false,
			},
			code: ''
		}
	},
	components: {
		HeadTitle,
	},
	computed: {
		disableBtn () {
			let rule1 = /^(M|m|B|b)?\d+$/.test(this.userCode)
			let rule2 = this.commodityName ? true : false
			let rule3 = /^\d+\.?\d{1,2}$/.test(this.consumptionMoney)
			// let rule4 = /^1\d{10}$/.test(this.commodityPhone)
			return (rule1 && rule2 && rule3 && this.hasEixt) ? false : true
		},
	},
	created () {
		let userinfo = JSON.parse(window.localStorage.getItem('businessinfo'))
		this.selfUserCode = userinfo.userCode.substring(1)
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		exit () {
			if (this.repeatBtn) {
				return
			}
			if (!/^(M|m|B|b)?\d+$/.test(this.userCode)) {
				MessageBox('提示', '用户编号不正确！')
				return
			}
			let userCode = /^(M|m|B|b)/.test(this.userCode) ? this.userCode.substring(1) : this.userCode
			if(userCode === this.selfUserCode){
				MessageBox('提示', '买家不能为自己!')
				return
			}
			this.repeatBtn = true
			let _this = this
			axios.post('user/personal',qs.stringify({userCode: 'M' + userCode}))
			.then(function(res){
				_this.repeatBtn = false
				if (res.data.code === '10000') {
						_this.code = userCode
						_this.hasEixt = true
						_this.buyerPhone = res.data.data.phone
						_this.realName = res.data.data.realName ? '姓名：'+res.data.data.realName : ''
						_this.querycode()
				} else {
					MessageBox('提示', '此用户不存在')
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
			})


		},
		querycode () {
			let _this = this
			axios.post('user/isEixt',qs.stringify({phone: this.buyerPhone}))
			.then(function(res){
				if (res.data.msg === 'true') {
					let str = ''
					if (_this.realName) {
						str = "<span>用户编号："+_this.userCode+"<br/>"+_this.realName+"<br/>"+"手机号："+ _this.buyerPhone.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')+"</span><p style='color:red;font-size:1.2rem; line-height:1.5;'>(注：请仔细核对买家号码，一旦报错单，损失无法追回！)</p>"
					} else {
						str = "<span>用户编号："+_this.userCode+"<br/>" + "手机号："+ _this.buyerPhone.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')+"</span><p style='color:red;font-size:1.2rem; line-height:1.5;'>(注：请仔细核对买家号码，一旦报错单，损失无法追回！)</p>"
					}
						MessageBox('提示', str)

				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		next () {
			if (this.repeatBtn) {
				return
			}
			if (!/^(M|m|B|b)?\d+$/.test(this.userCode)) {
				MessageBox('提示', '用户编号不正确！')
				return
			}
			let userCode = /^(M|m|B|b)/.test(this.userCode) ? this.userCode.substring(1) : this.userCode
			if(userCode === this.selfUserCode){
				MessageBox('提示', '买家不能为自己!')
				return
			}
			if(!this.hasEixt){
				MessageBox('提示', '请校验买家用户编号!')
				return
			}
			if (userCode !== this.code) {
				MessageBox('提示', '请重新校验买家用户编号!')
				return
			}
			// if (!(/^1\d{10}$/.test(this.commodityPhone))) {
			// 	MessageBox('提示', '买家手机号码不正确!')
			// 	return
			// }
			// if (this.buyerPhone !== this.commodityPhone) {
			// 	MessageBox('提示', '买家用户编号与买家手机不符！')
			// 	return
			// }
			if (!this.commodityName || this.$emoji(this.commodityName)) {
				MessageBox('提示', '商品名称不能为空或表情图片！')
				return
			}
			if (!/^\d+\.?\d{1,2}$/.test(this.consumptionMoney)) {
				MessageBox('提示', '消费金额必须为数字！')
				return
			}
			if (this.consumptionMoney >= 100000000) {
				MessageBox('提示', '消费金额不超过1亿！')
				return
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			this.repeatBtn = true
			axios.post('declaration/insert',qs.stringify({
				phone: this.buyerPhone,
				userCode: userCode,
				commodityName: this.commodityName,
				consumptionMoney: this.consumptionMoney
			}))
			.then(function(res){
				Indicator.close()
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					
					_this.$router.push({ name: 'Declare2', params: { id: res.data.data.id}})
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		formatMoney () {
			if (!isNaN(this.consumptionMoney)) {
				this.consumptionMoney =  (this.consumptionMoney-0).toFixed(2)
			} else {
				this.consumptionMoney = ''
			}
			
		}
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-declare{background-color: #f4f5f7; min-height: 100%;  position: absolute; width: 100%;}
.ex-declare-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-declare-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 3rem; right: 3rem;}
.ex-declare-progress-item { width: 25%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-declare-progress-item.secend {margin: 0;}
.ex-declare-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-declare-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}

.ex-declare-tips { background-color: #fff; padding: 1rem;}
.ex-declare-tips-box {background-color: #fff9e3; padding: 1rem;}
.ex-declare-box .ex-declare-cnt-item:last-child{border-bottom: none;}
.ex-declare-tips-item { line-height: 1.5; }
.ex-declare-tips-item p{ color: #5d646e; }
.ex-declare-tips-item b{color: #333; display: block; padding-top: 0.5rem;}
.ex-declare-tips-item .red{color: #f0544d;}

.ex-declare-cnt {background-color: #fff; margin: 1rem 0; padding: 0 1rem; }
.ex-declare-cnt-box {position: static;}
.ex-declare-cnt-item {border-bottom:1px solid #e5e5e5; position: relative; font-size: 1.4rem; padding: 0.5rem 0; min-height: 3rem; }
.ex-declare-cnt-item span {display: inline-block; width: 30%;  vertical-align: middle;}
.ex-declare-cnt-item input { width: 60%; border: none; vertical-align: middle; height: 3rem;}
.ex-declare-cnt-item .exit { position: absolute; right: 0; top: 0.75rem; display: block; height: 2.5rem; padding: 0 1rem; text-align: right; line-height: 2.5rem;border: 1px solid;color: rgb(4,112,182);border-radius: 3px;}

.ex-declare-btn {margin: 0 2%; display: block; background-color: #047dcb; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-declare-btn:active{background-color:#0470b6; }
</style>