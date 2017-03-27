<template>
	<div class="ex-declare">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>消费登记</span>
		</div>
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
			<div class="ex-declare-progress-item">
				<b>3</b>
				<span>汇款凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>4</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-declare-cnt">
			<div class="img">
				<span>*上传消费凭证</span>
				<label class="tips">合同、收据、发票、提货单、银行流水单、任选其中一项。</label>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl" alt="" v-show='imgurl !==""'> 
					<input type="file" class="uploadimg" id="uploadimg" @change='getfile'>
				</div>
			</div>
		</div>
		<button type='button'  :class="[ 'ex-declare-btn', {disableBtn:disableBtn}]" @click='next'>下一步</button>
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
			imgurl: '',
			file: '',
			fileList: [],
			repeatBtn: false,
			resurl: '',
			id: '',
			type: ''
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
	created () {
		this.id = this.$route.params.id
		let _this = this
		axios.post('declaration/get',qs.stringify({id: this.id}))
			.then(function(res){
				if (res.data.code === '10000') {
					let status = res.data.status
					switch (status) {
						case '0':  //首次提交
							_this.type = 1
							break
						case '3':   //重新提交
							_this.type = 2
							break
						default:
							_this.type = 1
							break
					}

				} else {
					_this.repeatBtn = false
					MessageBox('提示', '数据请求失败！')
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				MessageBox('提示', '系统出错了，正在修复中...')
			})

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
		next () {
			if (this.repeatBtn) {
				return
			}
			if ( !this.file) {
				MessageBox('提示', '消费凭证不能为空！')
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
			axios.post('declaration/supplement',qs.stringify({
				consumptionCertificate: this.resurl[0],
				physicalPic: this.resurl[0],
				type: this.type,
				id: this.id
			}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.repeatBtn = false
					_this.$router.push('/declare3')
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
	}
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

.ex-declare-cnt .img {background-color: #fff; border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem 1rem; position: relative;}
.ex-declare-cnt .img .tips {font-size: 1.2rem; color:#aaafb6; display: block;}
.ex-declare-cnt .img span {display: block; padding: 0.5rem 0; font-size: 1.4rem;}
.ex-declare-cnt .instructions { position: absolute; right: 1rem; bottom: 1rem;  color: #007aff; font-size: 1.2rem;}
.ex-declare-cnt .upload {width: 8rem; height: 5rem; text-align: center; border: 1px dotted #d8d8d8; color: #aaafb6; font-size: 1.2rem; position: relative; margin-left: 2rem; display: inline-block; margin-top: 0.5rem;} 
.ex-declare-cnt .upload i{ padding-top: 1rem; }
.ex-declare-cnt .upload b{display: block; font-weight: normal;color: #aaafb6;}
.ex-declare-cnt .showpic {position: absolute; top: 0; left: 0; height: 5.2rem; width: 8.2rem; z-index: 2;}
.ex-declare-cnt .uploadimg { position: absolute; height: 5rem; width: 8rem; opacity: 0; z-index: 3; left: 0; top: 0;}

.ex-declare-btn {margin: 0 2%; display: block; background-color: #62c1ff; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-declare-btn:active{background-color:#58ace2; }
</style>