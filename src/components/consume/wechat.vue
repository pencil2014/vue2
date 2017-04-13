<template>
	<div class="ex-wechat">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>会员升级</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-wechat-payment">
			<p><span>支付金额</span> <b class='money'>￥{{money}}</b></p>
			<p><span>交易单号</span> <b>{{ordernum}}</b></p>
		</div>
		<div class="ex-wechat-code">
			<p class='code'>
				<qrcode cls="qrcls"  :value="qrurl" level = 'H'  type='image' :size="200"></qrcode>
			</p>
			<p class='tips'>请长按保存此二维码图片或截屏到手机相册，然后打开微信，点击“扫一扫”，在页面右上角点击“相册”，选择相册中保存的二维码图片，点击“完成”。即可识别二维码，完成微信支付。</p>
		</div>
	</div>
</template>

<script>
import Qrcode from 'v-qrcode'
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			ordernum: '',
			money: '',
			qrurl: '',
			timer: '',
			orderstatus: '',
			timer: '',
			modal:{
				text:'会员升级',
				fixed: false,
			},
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		getstatus () {
			let _this = this
			axios.post('user/vipWeixinStatus',qs.stringify({ordNo: this.ordernum}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.orderstatus = res.data.data.status
					switch (res.data.data.status) {
						case '-1':  //交易记录数据非法
							MessageBox('提示', '交易记录数据非法！')
							break;
						case '1':   //交易成功
							// MessageBox('提示', '交易成功！')
							MessageBox({
							  title: '提示',
							  message: '交易成功！'
							}).then(action => {
								_this.$router.push('/index')
							})
							break;
						case '2':   //待支付
							break;
						case '4':   //交易已取消
							MessageBox('提示', '交易已取消！')
							break;
						case '9':   //审核未通过
							MessageBox('提示', '审核未通过！')
							break;
					}	
				} else {
					// MessageBox('提示', '请求数据失败！')
				}
				// 如果状态不是已支付就继续监听
				if (res.data.data.status !== '1') {
					_this.timer = setTimeout(function(){_this.getstatus()},60000)
				}
			})
			.catch(function(){
				Toast('系统错误！')
			})
	}
	},
	created () {
		let _this = this
		axios.post('user/vipWeixin',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.qrurl = res.data.data.url
				_this.ordernum = res.data.data.ordNo
				_this.money = res.data.data.money
				_this.getstatus()
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			Toast('系统错误！')
		})

	},
	components: {
      Qrcode,
      HeadTitle,
	},
	destroyed () {
	  	clearTimeout(this.timer)
	}
}
</script>

<style scoped>
.ex-wechat {height: 100%;background-color: #f4f5f7; font-size: 1.4rem;}
.ex-wechat-payment {margin: 2rem 0; background-color: #fff;}
.ex-wechat-payment p{border-bottom: 1px solid #e5e5e5; height: 3rem; line-height: 3rem; padding: 0.5rem 1rem; }
.ex-wechat-payment p b{float: right; font-weight: normal;}
.ex-wechat-payment p .money { color: #58c86b; font-weight: bolder; font-size: 1.6rem;}
.ex-wechat-code {background-color: #fff;padding: 2rem 0;}
.ex-wechat-code .code{ text-align: center; }
.ex-wechat-code .tips{ padding: 0 2rem; color: #5d646e;}
</style>