<template>
	<div class="ex-bank">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>银行转存</span>
		</div> -->
		<!-- <HeadTitle :title="modal" @callback="back"></HeadTitle> -->
		<div class="ex-header">
			<span>
				<a href="javascript:void(0);" @click="back">
					<i class="iconfont" >&#xe605;</i>
					返回
				</a>
			</span>
			<span>转存银行</span>
			<span class="finish">
				<router-link to="/money" >
					资金明细
				</router-link>
			</span>
		</div>
		<div class="ex-bank-cnt">
			<div class="ex-bank-balance">
				当前账户余额：<span class="orange">{{userdata.overMoney | checknum}}</span>
			</div>
			<div class="ex-bank-exchange">
				<label for="exchange">转存金额</label>
				<input type="text" name="" id="exchange" v-model='exchange' placeholder="请输入金额">
			</div>
			<!-- <div class="ex-bank-card" @click.stop='gobank' v-if='!showAdd'>
				<label for="">银 行 卡：</label>
				<div class='bankinfo'>
					<p class="name">{{bankdata.banks}}</p>
					<p class="accountName" v-if="bankdata.accountName">{{ bankdata.accountName }}</p>
					<p class="number">{{bankdata.cardNo | card}}</p>
				</div>
				<span class='arrow'>
					<label>{{cardstatus}}</label>
					<i class='iconfont'>&#xe606;</i>
				</span>
			</div> -->
			<div class="ex-bank-card" @click.stop='gobank' v-if='!showAdd'>
				<span>银 行 卡：</span>
				<span class='bankinfo'>
					<p class="name">{{bankdata.banks}}</p>
					<p class="number">{{bankdata.cardNo | card}}</p>
				</span>
				<span class='arrow'>
					<label>{{cardstatus}}</label>
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
import { MessageBox, Indicator, Toast } from 'mint-ui'
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
			modal: {
				text:'转存银行',
				fixed: false
			},
			checkRealName: ''
		}
	},
	computed: {
		disableBtn () {
			let rule1 = (/^[1-9]\d+.?\d*$/.test(this.exchange)) && (this.exchange >= 100) ? true :false
			let rule2 = this.exchange <= this.userdata.overMoney ? true : false
			let rule3 = rule1 && rule2 
			if (rule3) {
				return false
			} else {
				return true
			}
		},
		cardstatus () {
			let status = this.bankdata.status
			let allstatus = ['已删除','审核中','审核未通过','']
			return allstatus[status]
		}
	},
	created () {
		let exchange = window.localStorage.getItem('exchange')
		if (!!exchange) {
			this.exchange = exchange
			window.localStorage.removeItem('exchange')
		}
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
			Toast('连接失败，请检查网络是否正常!')
		})

		let defaultCard = window.localStorage.getItem('defaultCard')
		if (!defaultCard) {
			axios.post('bankard/list',qs.stringify({}))
			.then(function(res){
				if (res.data.code === '10000') {
					if (!!res.data.data[0] ) {
						_this.showAdd = false
						_this.bankdata = res.data.data[0]
					} else {
						_this.showAdd = true
					}
				} else {
					Toast('请求数据失败！')
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		} else {
			_this.showAdd = false
			_this.bankdata = JSON.parse(defaultCard)
			window.localStorage.removeItem('defaultCard')
		}
		

		axios.post('verify/checkRealName',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.checkRealName = res.data.data
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})

	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gobank () {
			if (!!this.exchange) {
				window.localStorage.setItem('exchange', this.exchange)
			}
			this.$router.push('/banklist')
		},
		addcard () {
			// let _this = this
			// if (this.userdata.isRealName !== '2') {
			// 	MessageBox({
			// 	  title: '提示',
			// 	  message: '请先进行实名认证！',
			// 	  showCancelButton: true,
			// 	  confirmButtonText: '去认证'
			// 	}).then(action => {
			// 		if (action === 'confirm') {
			// 			_this.$router.push('/realname')
			// 		}
			// 	})
			// } else {
			// 	this.$router.push('/addcard')
			// }
			let _this = this
			let usertype = window.localStorage.getItem('usertype')
			let route = usertype === '2' ? '/realname/shop' : '/realname'

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
						_this.$router.push('/realname/detail')
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
				this.$router.push('/addcard')
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
						_this.$router.push(route)
					}
				})
				return
			}
			
		},
		submit () {
			let _this = this
			let usertype = window.localStorage.getItem('usertype')
			let route = usertype === '2' ? '/realname/shop' : '/realname'

			if (!/^[1-9]\d+.?\d*$/.test(this.exchange)) {
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

			if (this.checkRealName.status === '0') {
				MessageBox({
				  title: '提示',
				  message: '实名认证失败，目前不能转存！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname/detail')
					}
				})
				return
			}

			if (this.checkRealName.status === '1') {
				MessageBox('提示', '实名认证审核中，目前不能转存！')
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
						_this.$router.push(route)
					}
				})
				return
			}

			if (this.checkRealName.status === '4') {
				MessageBox({
				  title: '提示',
				  message: '实名认证需要升级，目前不能转存！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}



			if (this.bankdata.status === '1') {
				MessageBox('提示', '银行卡审核中，目前不能转存！')
				return
			}
			if (this.bankdata.status === '2') {
				MessageBox('提示', '银行卡审核不通过，目前不能转存！')
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
					MessageBox('提示', '转存成功！')
					_this.userdata.overMoney -= _this.exchange
					_this.exchange = ''
				} else {
					Toast( res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
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
		card (value) { 
			value += ''
			return value.replace(/^(\d{4})(\d*)(\d{4})$/, '$1*********$3')
		}
	},
	components: {
		HeadTitle,
	},
}	
</script>

<style scoped>
.ex-bank {height: 100%; background-color: #f4f5f7;}
.ex-bank-balance{ padding: 1rem; color: rgb(33,42,50); font-size: 1.6rem; }
.ex-bank-balance .orange{color: rgb(255,161,50)}
.ex-bank-cnt {font-size: 1.4rem;}
.ex-bank-exchange{background-color: #fff; padding: 0.5rem 1rem; }
.ex-bank-exchange label { vertical-align: middle; line-height: 3rem; }
.ex-bank-exchange input{border:none; height: 3rem; padding-left: 1rem; width: 70%;}
/*.ex-bank-card{background-color: #fff; margin: 1rem 0; padding: 0.5rem 1rem; min-height: 3rem; position: relative;}
.ex-bank-card label{float: left; line-height: 3.5rem;}
.ex-bank-card .bankinfo{ margin-left: 5rem; color: #586485; padding-left: 1rem; line-height: 1.5;}
.ex-bank-card .arrow{ color: #999;  position: absolute; right: 1rem; top: 2rem;}
.ex-bank-card .arrow label{color: red; line-height: 1.4rem;}*/
.ex-bank-card{display: table;width: 100%;background: #fff;margin-top: 1rem;padding: 1.5rem 1rem;box-sizing: border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;line-height: 25px;}
.ex-bank-card span{display: table-cell;vertical-align: middle;}
.ex-bank-card span:nth-child(1){width: 20%;}
.ex-bank-card span:nth-child(2){color: #586485;width: 45%;}
.ex-bank-card span:nth-child(3){text-align: right; color: #999;}
.ex-bank-card span:nth-child(3) label{color: #f0544d;}
.ex-bank-btn { margin: 2rem 4%; display: block; width: 92%; background-color: #047dcb; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem; text-align: center; font-size: 1.8rem;}
.ex-bank-btn:active {background-color: #0470b6;}
.ex-bank-tips {background-color: rgb(255,249,227); color:rgb(93,100,110); margin: 1.5rem 4%; padding: 1rem; line-height: 1.5;  }
.ex-bank-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}

.ex-header{width: 100%;display: table;height: 4.5rem;background-color: rgb(255,255,255);color: rgb( 33,42,50);box-shadow:1px 1px 0px #ebebeb;position: relative;z-index: 6;}
.ex-header span{display: table-cell;width: 33.3%;vertical-align: middle;font-size: 1.6rem;}
.ex-header span:nth-child(1){text-align: left;padding-left: 0.5rem;}
.ex-header span:nth-child(1) a{height: 100%;display: inline-block;line-height: 4.5rem;color: rgb(4,125,203);}
.ex-header span:nth-child(1) a i{font-size: 2rem;}
.ex-header span:nth-child(1) a label {height: 100%;display: inline-block;}
.ex-header span:nth-child(2){text-align: center;font-size: 1.8rem;}
.ex-header span:nth-child(3){text-align: right;}
.ex-header span:nth-child(3) a{height: 100%;display: inline-block;line-height: 4.5rem;color: #5d646e;text-align: center;margin-right: 10px;}
</style>