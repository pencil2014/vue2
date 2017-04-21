<template>
	<div class="ex-integral">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>享积分操作</span>
			<router-link to="/integraldetail/1" tag="label" class="right">
				明细
			</router-link>
		</div> -->
		<div class="topbar">
			<span class="m1" @click="back">
				<a href="javascript:;">
					<i class="iconfont">&#xe605;</i>
					<label for="">返回</label>
				</a>
			</span>
			<span class="m2">享积分操作</span>
			<router-link to="/integraldetail" tag="span" class="m3">明细
			</router-link>
		</div>
		<div class="ex-integral-cnt">
			<span class='title'>兑换的享积分</span>
			<div class="exchange" >
				<input type="tel" v-model="exchange" placeholder="转换数额">
			</div>
			<p class='share'>可用享积分：<span class="orange">{{integral | checknum}}</span></p>
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
import { MessageBox, Indicator, Toast } from 'mint-ui'
export default {
	data () {
		return {
			integral: 0,
			exchange: '',
			repeatBtn: false,
			path: '/index'
		}
	},
	computed: {
		disableBtn () {
			let rule1 = (/^[1-9]\d+$/.test(this.exchange)) && (this.exchange % 100 === 0) ? true :false
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
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		let path = window.localStorage.getItem('integralPath')
		if (path) {
			this.path = path
		}
	},
	methods: {
		back () {
			this.$router.push(this.path)
		},
		submit () {
			if (!/^[1-9]\d+$/.test(this.exchange)) {
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
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			_this.repeatBtn = true
			axios.post('integral/toBalance',qs.stringify({integral: this.exchange}))
			.then(function(res){
				Indicator.close()
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					MessageBox('提示', '您成功已兑换'+_this.exchange+'个享积分!')
					_this.integral -= _this.exchange
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
.topbar {background: #fff;width: 100%;font-size: 1.6rem;height: 4.5rem;color: rgb( 33,42,50);display: table;line-height: 4.5rem;}
.topbar span{display: table-cell;}
.topbar .m1 a{display: inline-block;width: 100%; padding-left: 1rem;}
.topbar .m1 i{font-size: 2rem;vertical-align: middle;color: rgb(4,125,203);}
.topbar .m1 label{vertical-align: middle;color: rgb(4,125,203);}
.topbar .m1{width: 20%;}
.topbar .m2{font-size: 1.6rem;text-align: center;}
.topbar .m3{color: rgb(93,100,110);text-align: right;padding-right: 2rem;width: 20%;}

.ex-topbar .right{position: absolute;right: 0;top: 0;bottom: 0;width: 5rem;line-height: 5rem;color: #fff;text-align: center;font-size: 1.6rem;}
.ex-integral {height: 100%; background-color: #f4f5f7;}
.ex-integral-cnt {background-color: #fff; margin: 2rem 0; padding:2rem 1rem;}
.ex-integral-cnt .title { font-size: 1.4rem; color: #5d646e; padding: 1rem 0; }
.ex-integral-cnt .exchange { border-bottom: 1px solid #e5e5e5; padding: 1rem 0; margin-bottom: 1rem;}
.ex-integral-cnt .exchange input { height: 3rem; padding-left: 1rem; border:none;  border-left:2px solid #2eadff; width: 90%; font-size: 2rem; }
.ex-integral-cnt .share{font-size: 1.6rem; color: rgb(33,42,50);}
.ex-integral-cnt .share .orange{color: rgb(255,161,50)}
.ex-integral-btn {margin: 0 4%; display: block; width: 92%;  background-color: #047dcb; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.8rem;}
.ex-integral-btn:active {background-color: #0470b6;}
.ex-integral-tips { background-color: rgb(255,249,227); color:rgb(93,100,110); margin: 1.5rem 4%; padding: 1rem; line-height: 1.5;  }
</style>