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
			<div class="ex-bank-card">
				<label for="">银 行 卡：</label>
				<div class='bankinfo'>
					<p class="name">{{bankdata.banks}}</p>
					<p class="number">{{bankdata.cardNo | card}}</p>
				</div>
			</div>
		</div>	
		<a  href="javascript:;"  :class="[ 'ex-bank-btn', {disableBtn:disableBtn}]" @click='submit'>提 交</a>
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
import { MessageBox } from 'mint-ui'
export default {
	data () {
		return {
			userdata: '',
			bankdata: '',
			exchange: '',
			repeatBtn: false
		}
	},
	computed: {
		disableBtn () {
			let rule1 = this.exchange > 100 ? true :false
			let rule2 = this.exchange <= this.integral ? true : false
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
				} else {integral
					MessageBox('提示', '请求数据失败！')
				}
			})
			.catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
			})

			axios.post('bankard/getDefault',qs.stringify({cardType: 1}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.bankdata = res.data.data
				} else {integral
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
		submit () {
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
			if (this.repeatBtn) {
				return
			}
			let _this = this
			_this.repeatBtn = true
			axios.post('integral/toBalance',qs.stringify({integral: this.exchange}))
			.then(function(res){
				if (res.data.code === '10000') {
					MessageBox('提示', '您成功已兑换'+_this.exchange+'个享积分!')
					_this.exchange = ''
				} else {
					_this.repeatBtn = false
					MessageBox('提示', '提交失败，请稍后重试！')
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				MessageBox('提示', '系统出错了，正在修复中...')
			})

		}
	},
	filters: {
		checknum (value) {
			value += ''
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
.ex-bank-card{background-color: #fff; margin: 1rem 0; padding: 0.5rem 1rem; min-height: 3rem;}
.ex-bank-card label{float: left; line-height: 3.5rem;}
.ex-bank-card .bankinfo { margin-left: 5rem; color: #586485; padding-left: 1rem; line-height: 1.5;}

.ex-bank-btn { margin: 0 1.5rem; background-color: #58c86b; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem; display: block;  text-align: center; font-size: 1.8rem;}
.ex-bank-tips { background-color: #eee; color:#aaafb6; margin: 1.5rem; padding: 1rem; line-height: 1.5;  }

</style>