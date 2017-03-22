<template>
	<div class="ex-integral">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>享积分操作</span>
		</div>
		<div class="ex-integral-cnt">
			<span class='title'>兑换的享积分</span>
			<div class="exchange" >
				<input type="tel" v-model="exchange" placeholder="转换数额">
			</div>
			<p class='share'>可用享积分：<span>{{integral | checknum}}</span></p>
		</div>	
		<button type='button'  :class="[ 'ex-integral-btn', {disableBtn:disableBtn}]" @click='submit'>提 交</button>
		<div class="ex-integral-tips">
			<b>操作说明：</b>
			<p>1、只以100的倍数进行兑换</p>
			<p>2、享积分操作每笔扣除5%享积分作为税金</p>
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
			integral: 0,
			exchange: '',
			repeatBtn: false
		}
	},
	computed: {
		disableBtn () {
			let rule1 = this.exchange % 100 === 0 ? true :false
			let rule2 = this.exchange <= this.integral ? true : false
			let rule3 = this.exchange > 0
			let rule4 = rule1 && rule2 && rule3
			if (rule4) {
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
					let integral = res.data.data.integral >= 0 ? res.data.data.integral : 0
					_this.integral = integral
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
			if (!/^\d+$/.test(this.exchange)) {
				MessageBox('提示', '兑换的享积分不合法！')
				return
			}
			if (this.exchange <= 0 || this.exchange % 100 !== 0) {
				MessageBox('提示', '兑换的享积分必须为100的倍数！')
				return
			}
			if (this.integral < this.exchange) {
				MessageBox('提示', '可兑换的享积分不足！')
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
		}
	}
}	
</script>

<style scoped>
.ex-integral {height: 100%; background-color: #f4f5f7;}
.ex-integral-cnt {background-color: #fff; margin: 2rem 0; padding:2rem 1rem;}
.ex-integral-cnt .title { font-size: 1.4rem; color: #5d646e; padding: 1rem 0; }
.ex-integral-cnt .exchange { border-bottom: 1px solid #e5e5e5; padding: 1rem 0; margin-bottom: 1rem;}
.ex-integral-cnt .exchange input { height: 3rem; padding-left: 1rem; border:none;  border-left:2px solid #2eadff; width: 90%; font-size: 2rem; }
.ex-integral-cnt .share{font-size: 1.6rem; color: #f00;}
.ex-integral-btn {margin: 0 4%; display: block; width: 92%;  background-color: #58c86b; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.8rem;}
.ex-integral-tips { background-color: #eee; color:#aaafb6; margin: 1.5rem 4%; padding: 1rem; line-height: 1.5;  }
</style>