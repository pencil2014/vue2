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
			<div class="ex-declare-progress-item active">
				<b>2</b>
				<span>消费凭证</span>
			</div>
			<div class="ex-declare-progress-item active">
				<b>3</b>
				<span>汇款凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>4</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-declare-money">
			<p>您应转款：<b>{{rangliMoney}}</b></p>
			<span>（转款后，请上传让利款转款凭据）</span>
		</div>
		<div class="ex-declare-cnt">
			<div class="ex-declare-from">
				<div class="ex-declare-cnt-item">
					<span>*转款户名</span>
					<input type="text" placeholder="请填写转款银行卡开户（人）名" v-model.trim='transferUserName' maxlength="15">
				</div>
				<div class="ex-declare-cnt-item">
					<span>*转款金额</span>
					<input type="number" placeholder="请输入实际转款金额（含批量款）" v-model.trim='transferMoney' maxlength="11">
				</div>
			</div>
			<div class="img">
				<span>*上传让利款转款凭据</span>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl" alt="" v-show='imgurl !==""'> 
					<input type="file" class="uploadimg" id="uploadimg" @change='getfile' accept="image/*">
				</div>
			</div>
			<div class="ex-declare-msg">
				<div class="ex-declare-cnt-item">
					<span>*附言</span>
					<input type="text" placeholder="卖家ID让买家ID (如B335让M1024)" v-model.trim='transferMsg' maxlength="30">
				</div>
			</div>	
		</div>
		<button type='button'  :class="[ 'ex-declare-btn', {disableBtn:disableBtn}]" @click='next'>提交</button>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import lrz from 'lrz'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			imgurl: '',
			file: '',
			fileList: [],
			repeatBtn: false,
			resurl: '',
			id: '',
			type: '',
			transferUserName: '',
			transferMoney: '',
			rangliMoney: '',
			transferMsg: '',
			modal:{
				text:'单笔报单',
				fixed: false,
			},
		}
	},
	computed: {
		disableBtn () {
			let rule1 = this.transferUserName ? true : false
			let rule2 = Number(this.transferMoney)  >= Number(this.rangliMoney) ? true : false
			let rule3 = this.file ? true : false
			let rule4 = this.transferMsg ? true : false
			if (rule1 && rule2 && rule3 && rule4) {
				return false
			} else {
				return true
			}
		}
	},
	created () {
		this.id = this.$route.params.id
		let _this = this
		axios.post('/exsd-web/declaration/get',qs.stringify({id: this.id}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.rangliMoney = res.data.data.rangliMoney
					_this.transferUserName = res.data.data.transferUserName || ''
					_this.transferMoney = res.data.data.transferMoney || ''
					let status = res.data.data.status
					switch (status) {
						case '0':  //首次提交
							_this.type = '1'
							break
						case '3':   //重新提交
							_this.type = '2'
							break
						default:
							_this.type = '1'
							break
					}

				} else {
					Toast('连接失败，请检查网络是否正常!')
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})

	},
	methods: {
		back () {
			let _this = this;
			MessageBox({
			  title: '提示',
			  message: '确认要退出本次操作吗?',
			  showCancelButton: true,
			  confirmButtonText: '退出'
			}).then(action => {
				if (action === "confirm") {
					_this.$router.push('/order')
				}
			})
		},
		getfile () {
			let _this = this
			let img = document.getElementById('uploadimg').files[0]
			if (img) {
				this.imgurl = window.URL.createObjectURL(img)
				this.file = img
				lrz(img,{width:640})
				.then(function (rst) {
	        _this.fileList = [rst.base64]
	       })
	       .catch(function (err) {
	        _this.fileList = []
	       })  
			}
		},
		next () {
			if (this.repeatBtn) {
				return
			}
			if (!this.transferUserName) {
				MessageBox('提示', '转款户名不能为空！')
				return
			}
			if (!(Number(this.transferMoney)  >= Number(this.rangliMoney))) {
				MessageBox('提示', '转款金额不足！')
				return
			}
			if (this.transferMoney >= 100000000) {
				MessageBox('提示', '转款金额不超过1亿！')
				return
			}
			if ( !this.file) {
				MessageBox('提示', '让利款转款凭据不能为空！')
				return
			}
			if ( !this.transferMsg) {
				MessageBox('提示', '附言不能为空！')
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

			axios.post('/exsd-web/upload/pic_min',formData)
			.then(function(res){
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					_this.resurl = res.data.urls
					_this.check()
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		check () {
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			this.repeatBtn = true
			axios.post('/exsd-web/declaration/update',qs.stringify({
				transferVoucher: this.resurl[0],
				type: this.type,
				id: this.id,
				transferUserName: this.transferUserName,
				transferMoney: this.transferMoney,
				remark: this.transferMsg
			}))
			.then(function(res){
				Indicator.close()
				_this.repeatBtn = false
				if (res.data.code === '10000') {
					_this.$router.push({ name: 'Declare5', params: { id: _this.id}})
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
	// beforeRouteLeave (to,from,next) {
	// 	if (to.path.indexOf('/declare')>-1) {
	// 		next('/business')
	// 	} else {
	// 		next()
	// 	}
	// },
	destroyed () {
		Indicator.close()
	},
	components: {
		HeadTitle,
	},
}	
</script>

<style scoped>
.ex-declare{background-color: #f4f5f7; min-height: 100%;  position: absolute; width: 100%;}
.ex-declare-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-declare-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 3rem; right: 3rem;}
.ex-declare-progress-item { width: 25%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-declare-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-declare-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}

.ex-declare-money {background-color: #fff; padding: 1.5rem 0; text-align: center;}
.ex-declare-money p {font-size: 1.6rem; padding-bottom: 0.5rem;}
.ex-declare-money p b {font-size: 2.4rem;}
.ex-declare-money span {font-size: 1.4rem; color: #aaafb6;}

.ex-declare-from {background-color: #fff; margin: 1rem 0; padding: 0 1rem;}
.ex-declare-cnt-item { border-bottom:1px solid #e5e5e5; position: relative; font-size: 1.4rem; padding: 0.5rem 0; }
.ex-declare-cnt-item span {display: inline-block; width: 30%; line-height: 3rem; vertical-align: middle;}
.ex-declare-cnt-item input { height: 3rem; width: 65%; border: none; vertical-align: middle;}



.ex-declare-cnt .img {background-color: #fff; border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem 1rem; position: relative;}
.ex-declare-cnt .img .tips {font-size: 1.2rem; color:#aaafb6; display: block;}
.ex-declare-cnt .img span {display: block; padding: 0.5rem 0; font-size: 1.4rem;}
.ex-declare-cnt .instructions { position: absolute; right: 1rem; bottom: 1rem;  color: #007aff; font-size: 1.2rem;}
.ex-declare-cnt .upload {width: 6rem; height: 6rem; text-align: center; border: 1px dotted #d8d8d8; color: #aaafb6; font-size: 1.2rem; position: relative; margin-left: 2rem; display: inline-block; margin-top: 0.5rem;} 
.ex-declare-cnt .upload i{ padding-top: 1.3rem; }
.ex-declare-cnt .upload b{display: block; font-weight: normal;color: #aaafb6;}
.ex-declare-cnt .showpic {position: absolute; top: 0; left: 0; height: 6.2rem; width: 6.2rem; z-index: 2;}
.ex-declare-cnt .uploadimg { position: absolute; height: 6rem; width: 6rem; opacity: 0; z-index: 3; left: 0; top: 0;}

.ex-declare-btn {margin: 0 2%; display: block; background-color: #047dcb; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-declare-btn:active{background-color:#0470b6; }


.ex-declare-msg {background-color: #fff;}
.ex-declare-msg .ex-declare-cnt-item {padding: 0.5rem 1rem; border-bottom: none;}
</style>