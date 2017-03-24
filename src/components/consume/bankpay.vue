<template>
	<div class="ex-bankpay">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>会员升级</span>
		</div>
		<div class="ex-bankpay-tips">
			<div class="ex-bankpay-tips-cnt">
				<div class="item">
					<b>一、公司汇款账号(两个，请选择一个)：</b>
					<p>户名：深圳前海易享时代商业服务有限公司</p>
					<p>账号1：41033100040025297</p>
					<p> 开户行：中国农业银行（深圳凤凰支行）</p>
					<p>账号2：000230263413</p>
					<p> 开户行：农村商业银行（深圳观澜支行）</p>
				</div>
				<div class="item">
					<b>二、会员升级及商家报单审核截止时间：</b>
					<p>每天下午16:00，16:00后为次日。</p>
				</div>
				<div class="item">
					<b>三、打款必须备注：</b>
					<p class="notice">会员ID号 (例如 M575, B575) , 手机号码 </p>
				</div>
			</div>	
		</div>
		<div class="ex-bankpay-sub">
			<p class="code"><span>用户ID</span><b>{{usercode}}</b></p>
			<div class="img">
				<span>转款凭证</span>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl" alt="" v-show='imgurl !==""'> <!--  v-show='imgurl !== ""'-->
					<input type="file" class="uploadimg" id="uploadimg" @change='getfile'>
				</div>
			</div>
		</div>
		<button type='button'  :class="[ 'ex-bankpay-btn', {disableBtn:disableBtn}]" @click='submit'>已确认转账，提交升级申请</button>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
import lrz from 'lrz'
export default {
	data () {
		return {
			usercode: '',
			imgurl: '',
			file: '',
			fileList: [],
			repeatBtn: false,
			resurl: ''
		}
	},
	computed: {
		disableBtn () {
			if (!this.file || this.fileList.length === 0) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		getfile () {
			let _this = this
			let img = document.getElementById('uploadimg').files[0]
			if (img) {
				this.imgurl = window.URL.createObjectURL(img)
				this.file = img
				lrz(img,{width:640})
				.then(function (rst) {
	        _this.fileList.push (rst.base64)
	       })
	       .catch(function (err) {
	        _this.fileList = []
	       })  
			}
		},
		submit () {
			if (this.repeatBtn) {
				return
			}
			if ( !this.file) {
				MessageBox('提示', '转款凭证不能为空！')
				return
			}
			if (this.fileList.length === 0) {
				MessageBox('提示', '图片处理中，请稍后...')
				return
			}
			let _this = this
			_this.repeatBtn = true
			let formData = new FormData()
			formData.append("imgStr",this.fileList[0])

			axios.post('upload/pic_min',formData)
			.then(function(res){
				if (res.data.code === '10000') {
					_this.resurl = res.data.urls
					_this.check()
				} else {
					_this.repeatBtn = false
					MessageBox('提示', '提交失败，请稍后重试！')
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				MessageBox('提示', '系统出错了，正在修复中...')
			})
		},
		check () {
			let _this = this
			axios.post('user/vip',qs.stringify({consumptionPath: this.resurl[0]}))
			.then(function(res){
				if (res.data.code === '10000') {
					MessageBox.alert('提交成功，后台正在审核您的会员升级申请,请稍后').then(action => {
						_this.$router.go(-1)
					})
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
	created () {
		let _this = this
		axios.post('user/personal',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.usercode = res.data.data.userCode
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			MessageBox('提示', '系统出错了，正在修复中...')
		})
	}
}	
</script>

<style scoped>
.ex-bankpay {background-color: #f4f5f7; font-size: 1.4rem; padding-bottom: 2rem;}
.ex-bankpay-tips {background-color: #fff; padding: 1rem;}
.ex-bankpay-tips-cnt {background-color: #eee; color: #777; padding: 1.5rem 1.5rem 0.5rem;}
.ex-bankpay-tips-cnt .item {padding-bottom: 1rem;}
.ex-bankpay-tips-cnt b { font-weight: normal; color: #333; padding-bottom: 0.5rem; display: inline-block;}
.ex-bankpay-tips-cnt p{line-height: 1.5;}
.ex-bankpay-tips-cnt .notice {color: #f00;}
.ex-bankpay-sub {background-color: #fff; margin: 1.5rem 0; padding: 0.5rem 1rem;}
.ex-bankpay-sub .code {border-bottom: 1px solid #e5e5e5; height: 4rem; line-height: 4rem;}
.ex-bankpay-sub .code span {display: block; width: 30%; float: left;}
.ex-bankpay-sub b{color:#586485; font-weight: normal;}

.ex-bankpay-sub .img { height: 6rem; position: relative;}
.ex-bankpay-sub .img span {display: block; width: 30%; line-height: 5rem; float: left;}
.ex-bankpay-sub .upload {margin-left: 30%; margin-top: 1rem; width: 8rem; height: 5rem; text-align: center; border: 1px dotted #d8d8d8; color: #aaafb6; font-size: 1.2rem;}
.ex-bankpay-sub .upload i{ padding-top: 1rem; }
.ex-bankpay-sub .upload b{display: block; font-weight: normal;color: #aaafb6;}
.ex-bankpay-sub .showpic {position: absolute;left: 30%;top: 0; height: 5.2rem; width: 8.2rem; z-index: 2;}
.ex-bankpay-sub .uploadimg { position: absolute;left: 30%;top: 0; height: 5rem; width: 8rem; opacity: 0; z-index: 3; }

.ex-bankpay-btn {margin: 0 4%; display: block; width: 92%;  background-color: #58c86b; color: #fff; height: 5rem;line-height:5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.8rem;}
</style>