<template>
	<div class="ex-bank">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>银行转存</span>
		</div>
		<div class="ex-bank-cnt">
			<div class="ex-bank-balance">
				当前账户余额：{{userdata.overMoney | checknum}}
			</div>
			<div class="ex-bank-exchange">
				<label for="exchange">转存金额</label>
				<input type="text" name="" id="exchange" v-model='exchange' placeholder="请输入金额">
			</div>
			<div class="ex-bank-card" @click.stop='gobank' v-if='!showAdd'>
				<label for="">银 行 卡：</label>
				<div class='bankinfo'>
					<p class="name">{{bankdata.banks}}</p>
					<p class="number">{{bankdata.cardNo | card}}</p>
				</div>
				<span class='arrow'><i class='iconfont'>&#xe606;</i></span>
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
import { MessageBox, Indicator } from 'mint-ui'
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
			showAdd: false
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
		}
	},
	created () {
		let _this = this
		axios.post('user/personal',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.userdata = res.data.data
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			Indicator.open({ spinnerType: 'fading-circle'})
		})

		axios.post('bankard/getDefault',qs.stringify({cardType: 1}))
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
			Indicator.open({ spinnerType: 'fading-circle'})
		})

	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gobank () {
			this.$router.push('/banklist1')
		},
		addcard () {
			this.$router.push('/addcard1')
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
					_this.$router.push('/')
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
				if (res.data.code === '10000') {
					MessageBox('提示', '您成功转存'+_this.exchange+'元!')
					_this.userdata.overMoney -= _this.exchange
					_this.exchange = ''
				} else {
					_this.repeatBtn = false
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.repeatBtn = false
				Indicator.open({ spinnerType: 'fading-circle'})
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
	}
}	
</script>

<style scoped>
.ex-bank {height: 100%; background-color: #f4f5f7;}
.ex-bank-balance{ padding: 1rem; color: #f00; font-size: 1.6rem; }
.ex-bank-cnt {font-size: 1.4rem;}
.ex-bank-exchange{background-color: #fff; padding: 0.5rem 1rem; }
.ex-bank-exchange label { vertical-align: middle; line-height: 3rem; }
.ex-bank-exchange input{border:none; height: 3rem; padding-left: 1rem; width: 70%;}
.ex-bank-card{background-color: #fff; margin: 1rem 0; padding: 0.5rem 1rem; min-height: 3rem; position: relative;}
.ex-bank-card label{float: left; line-height: 3.5rem;}
.ex-bank-card .bankinfo{ margin-left: 5rem; color: #586485; padding-left: 1rem; line-height: 1.5;}
.ex-bank-card .arrow{ color: #999;  position: absolute; right: 1rem; top: 1.5rem;}
.ex-bank-btn { margin: 2rem 4%; display: block; width: 92%; background-color: #58c86b; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem; text-align: center; font-size: 1.8rem;}

.ex-bank-tips { background-color: #eee; color:#aaafb6; margin: 1.5rem 4%; padding: 1rem; line-height: 1.5;  }
.ex-bank-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}
</style>