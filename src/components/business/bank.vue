<template>
	<div class="ex-bank">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>银行转存</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-bank-balance">
			当前账户余额：<span class="orange">{{userdata.overMoney | checknum}}</span>
		</div>
		<div class="ex-bank-cnt">
			<table class="table">
				<tr class="money">
					<td>转存金额</td>
					<td><input type="number" placeholder="请输入金额" v-model.trim='exchange' id="exchange" @input="maxmoney"></td>
				</tr>
				<tr class="option">
					<td>请选择</td>
					<td>
						<span :class="{'select':selectType === 1}" @click="option(1)">
							<i class="radio"></i>
							<label for="">个人卡</label>
						</span><br>
						<span :class="{'select':selectType === 2}" @click="option(2)">
							<i class="radio"></i>
							<label for="">公司卡</label>
						</span>
					</td>
				</tr>
			</table>
			<div class="ex-bank-card" @click.stop='gobank' v-if='!showAdd'>
				<span class="m1">银行卡：</span>
				<span class="m2">
					<label for="" class="b1">{{bankdata.banks}}</label>
					<label for="" class="b2" v-if="selectType === 2">{{ businessname }}</label>
					<label for="" class="b3">{{bankdata.cardNo | card}}</label>
				</span>
				<span class="m3">
					<label for="">{{cardstatus}}</label>
					<i class='iconfont'>&#xe606;</i>
				</span>
			</div>
			<div class="ex-bank-add" @click='addcard' v-else>
				<i class="iconfont">&#xe608;</i> 添加银行卡
			</div>
		</div>	
		<button type='button' :class="[ 'ex-bank-btn', {disableBtn:disableBtn}]" @click='submit'>提 交</button>
		<div class="ex-bank-tips">
			<b>回购说明：</b>
			<p>1、提现金额每笔不少于100不超过5万</p>
			<p>2、每笔提现收取5元手续费</p>
		</div>
	</div>	
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast ,Radio } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			userdata: '',
			bankdata: {
				banks: '',
				cardNo: ''
			},
			exchange: '',
			repeatBtn: false,
			pickerValue: 0,
			showAdd: false,
			selectType: 1,
			modal:{
				text:'转存银行',
				fixed: false,
			},
			checkRealName: ''
		}
	},
	computed: {
		disableBtn () {
			let rule1 = this.exchange >= 100 ? true :false
			let rule2 = this.exchange <= this.userdata.overMoney ? true : false
			let rule3 = rule1 && rule2 
			if (rule3) {
				return false
			} else {
				return true
			}
		},
		businessname (){
			let type = this.bankdata.cardType
			if(type === '1'){
				return 
			}else{
				return this.bankdata.accountName
			}
		},
		cardstatus () {
			let status = this.bankdata.status
			let type = this.bankdata.cardType
			let allstatus = ['已删除','审核中','审核未通过','']
			if(type === '1'){
				return 
			}else{
				return allstatus[status]
			}
		}
	},
	created () {
		let _this = this
		axios.post('user/personal',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.userdata = res.data.data
			} else {
				Toast('请求数据失败！')
			}
		})
		.catch(function(){
			Toast('网络请求超时！')
		})

		axios.post('verify/checkRealName',qs.stringify({}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.checkRealName = res.data.data
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
			
		//获取默认银行卡列表
		_this.getDefaultCard(_this.selectType)



	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gobank () {
			this.$router.push('/banklist')
		},
		option (type) {
			this.selectType = type
			this.getDefaultCard(this.selectType)
		},
		maxmoney () {
			let value = this.exchange
			if(value.length>5){
				this.exchange = value.slice(0,9)
			}
		},
		addcard () {
			let _this = this

			if (this.checkRealName.status === '1') {
				MessageBox('提示', '实名认证审核中，目前不能添加银行卡！')
				return
			}
			if (this.checkRealName.status === '0') {
				MessageBox({
				  title: '提示',
				  message: '实名认证失败！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}
			if (this.checkRealName.status === '4') {
				MessageBox({
				  title: '提示',
				  message: '为保障您的账户安全，现在实名认证流程升级，为了不影响使用，请尽快进行资料补充！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}

			if (this.checkRealName.status === '2') {
				this.$router.push('/addcard1')
				return
			}

			if (this.checkRealName.status === '3') {
				MessageBox({
				  title: '提示',
				  message: '请先进行实名认证！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}
		},
		submit () {
			let _this = this

			if (!/^\d+.?\d*$/.test(this.exchange)) {
				MessageBox('提示', '提现金额不合法！')
				return
			}
			if (this.exchange < 100) {
				MessageBox('提示', '提现金额必须大于100！')
				return
			}
			if (this.exchange > 50000) {
				MessageBox('提示', '提现金额必须小于50000！')
				return
			}
			if (this.userdata.overMoney < this.exchange) {
				MessageBox('提示', '可提现金额不足！')
				return
			}
			if (this.userdata.isRealName !== '2') {
				MessageBox({
				  title: '提示',
				  message: '请先进行实名认证！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}
			if (this.repeatBtn) {
				return
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			_this.repeatBtn = true

			axios.post('integral/toBank',qs.stringify({money: this.exchange, bankId: this.bankdata.id}))
			.then(function(res){
				Indicator.close()
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					MessageBox('提示', '您成功转存'+_this.exchange+'元!')
					_this.userdata.overMoney -= _this.exchange
					_this.exchange = ''
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.repeatBtn = false
				Toast('网络请求超时！')
			})

		},
		getDefaultCard (type) {
			let _this = this;
			axios.post('bankard/getDefault',qs.stringify({cardType: type}))
			.then(function(res){
				if (res.data.code === '10000') {
					if (!!res.data.data ) {
						_this.showAdd = false
						_this.bankdata = res.data.data
					} else {
						_this.showAdd = true
					}
				} else {
					MessageBox('提示', '请求数据失败！')
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		}
	},
	beforeRouteLeave (to,from,next) {
		if(to.path === '/banklist' && this.selectType === 2){
			next('/banklist1')
		}else if(to.path === '/addcard' && this.selectType === 2){
			next('/addcard1')
		}else{
			next()
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
		card (value) { 
			value += ''
			return value.replace(/^(\d{4})(\d*)(\d{4})$/, '$1*********$3')
		}
	},
	destroyed () {
		Indicator.close()
	},
	components: {
		HeadTitle,
	},
}	
</script>

<style scoped>
.ex-bank {height: 100%; background-color: #f4f5f7;}
.ex-bank-balance{ padding: 15px 0.8rem; color: rgb(33,42,50); font-size: 1.6rem; }
.ex-bank-balance .orange{color: rgb(255,161,50)}
.ex-bank-btn { margin: 2rem 4%; display: block; width: 92%; background-color: #047dcb; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem; text-align: center; font-size: 1.8rem;}
.ex-bank-btn:active {background-color: #0470b6;}
.ex-bank-tips { background-color: rgb(255,249,227); color:rgb(93,100,110); margin: 1.5rem 4%; padding: 1rem; line-height: 1.5;  }
.ex-bank-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}

.ex-bank-card {display: table;width: 100%;line-height: 22px;background: #fff;height: 30px;margin-top: 20px;padding: 10px 0 10px 0;font-size: 1.4rem;}
.ex-bank-card span{display: table-cell;vertical-align: middle;}
.ex-bank-card .m1{width: 25%;padding-left: 0.8rem;}
.ex-bank-card .m2{width: 45%;color: rgb(170,175,182)}
.ex-bank-card .m2 label{display: block;}
.ex-bank-card .m2 .b1{color: rgb(88,100,133)}
.ex-bank-card .m3{width: 30%;text-align: right;padding-right:0.8rem;}
.ex-bank-card .m3 label{display: inline-block;width: 60%;color: red;}
.ex-bank-card .m3 i{vertical-align: middle;color: rgb(170,175,182)}
.table {background: #fff;width: 100%;color: rgb(33,42,50);font-size: 1.4rem}
.table tr{border-bottom: none;}
.table .money{border-bottom: solid 1px #ebebeb;}
.table .money td{padding: 13px 0.8rem;}
.table .money input{border: none;width: 100%;height: 30px;font-size: 1.4rem}
.table .option{vertical-align: baseline;}
.table .option td{line-height: 40px;}
.table .option .radio{display: inline-block;width: 1.5rem;height: 1.5rem;vertical-align: middle;background: url(../../assets/images/noselect.png);background-size: cover;}
.table .option .select{color: #1296db;}
.table .option .select .radio{background: url(../../assets/images/select.png);background-size: cover;}
</style>