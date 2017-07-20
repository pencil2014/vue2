<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top">
			<div class="box">
				您在签署协议后，请参照协议内容，填写以下协议信息并上传协议照片。<!-- <br>如有疑问，请联系客服(商玖支付公司)，电话： -->
			</div>
		</div>
		<p class="tip">需提交协议信息：</p>
		<div class="form-wrap">
			<div class="form-item" @click="openPicker1()">
				<span class="name">协议签署日期</span>
				<span class="text f_right">
					{{signDate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openPicker2()">
				<span class="name">协议生效日期</span>
				<span class="text f_right">
					{{contractSdate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openPicker3()">
				<span class="name">协议到期日期</span>
				<span class="text f_right">
					{{contractEdate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item upload">
				<div class="name">协议照片</div>
				<div class="explain">图片规范：将协议首页与签字页重叠放置，首页在上，露出签字页的签字信息，如下图所示：</div>
				<div class="upladImg-box">
					<div class="upladImg-wrap">
						<img :src="imgurl.contractPic || imgbase64.contractPic" alt="" v-show="imgurl.contractPic || imgbase64.contractPic">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.contractPic || imgbase64.contractPic">
						<input type="file" name="" class="file-prew" id="contractPic" @change="getfile('contractPic')" />
					</div>
					<div class="example">
						范本:
						<img :src="example"  v-preview="example" preview-nav-enable="false">
					</div>
				</div>
			</div>
		</div>
		<div class="save">
			<input type="button" value="提交" @click="submit">
		</div>

		<mt-datetime-picker
		  ref="date1" 
		  type="date"
		  year-format="{value} 年"
		  month-format="{value} 月"
		  date-format="{value} 日"
		  :startDate='start1'
      	  :endDate='end1'
      	  v-model='date1'
      	  @confirm='changeDate1'
		>
		</mt-datetime-picker>

		<mt-datetime-picker
		  ref="date2" 
		  type="date"
		  year-format="{value} 年"
		  month-format="{value} 月"
		  date-format="{value} 日"
		  :startDate='start1'
      	  :endDate='end1'
      	  v-model='date2'
      	  @confirm='changeDate2'
		>
		</mt-datetime-picker>

		<mt-datetime-picker
		  ref="date3" 
		  type="date"
		  year-format="{value} 年"
		  month-format="{value} 月"
		  date-format="{value} 日"
		  :startDate='start2'
      	  :endDate='end2'
      	  v-model='date3'
      	  @confirm='changeDate3'
		>
		</mt-datetime-picker>
		<lg-preview></lg-preview>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator , DatetimePicker } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import lrz from 'lrz'
import imgPreview from '../common/image'
import example from '../../assets/images/modal.jpg'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},
			imgurl: {
				contractPic: '',
			},
			imgbase64: {
				contractPic: '',
			},
			start1: '',
			end1: '',
			start2: '',
			end2: '',
			signDate: '',
			contractSdate: '',
			contractEdate: '',
			date1: '',
			date2: '',
			date3: '',
			submitbtn: false,
			islrz: false,
			example: example
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disabled () {
		
		},
	},
	created () {
		// let onlinePay5  = JSON.parse(sessionStorage.getItem('onlinePay5'))
		// console.log(onlinePay5)
		// if (onlinePay5) {
		// 	this.contractSdate = new Date(onlinePay5.contractSdate)
		// 	this.contractEdate = new Date(onlinePay5.contractEdate)
		// 	this.signDate = new Date(onlinePay5.signDate)
		// 	this.date1 = new Date(onlinePay5.contractSdate)
		// 	this.date2 = new Date(onlinePay5.contractEdate)
		// 	this.date3 = new Date(onlinePay5.signDate)
		// 	this.imgurl = onlinePay5.imgurl
		// 	this.imgbase64 = onlinePay5.imgbase64
		// }
		this.setdate()
	},
	methods: {
		back () {
			this.$router.back();
		},
		setdate () {
			let date = new Date()
			this.start1 = (function(){
				let year = new Date().getFullYear() - 10
				return new Date(year,0,1)
			})()
			this.end1 = this.getdate(date)
			this.start2 = this.getdate(date)
			this.end2 = (function(){
				let year = new Date().getFullYear() + 10
				return new Date(year,11,31)
			})()
			this.contractSdate = this.getdate(date)
			this.contractEdate = this.getdate(date)
			this.signDate = this.getdate(date)
			this.date1 = this.getdate(date)
			this.date2 = this.getdate(date)
			this.date3 = this.getdate(date)
			this.shopExpandDetail()
		},
		getdate (date) {
			let year = date.getFullYear()
			let month = date.getMonth()
			let day = date.getDate()
			return new Date(year,month,day)
		},
		changeDate1 (date) {
			let date1 = this.getdate(date)
			this.signDate = date1
		},
		changeDate2 (date) {
			let date1 = this.getdate(date)
			this.contractSdate = date1
		},
		changeDate3 (date) {
			let date1 = this.getdate(date)
			this.contractEdate = date1
		},
		openPicker1 () {
			this.$refs.date1.open();
		},
		openPicker2 () {
			this.$refs.date2.open();
		},
		openPicker3 () {
			this.$refs.date3.open();
		},
		getfile (id) {
	    	let _this = this;
	    	let file = document.getElementById(id).files[0];
			if(!file){
				return
			}
			Indicator.open({
			  text: '图片压缩中，请稍候...',
			  spinnerType: 'fading-circle'
			});
			this.islrz = true
			lrz(file,{width:640})
			.then(function (rst) {
				Indicator.close();
	        	_this.imgbase64[id] = rst.base64;
	        	_this.imgurl[id] = '';
	        	_this.islrz = false
	        })
	        .catch(function (err) {
	        	Indicator.close();
	         	_this.islrz = false
	         	Toast('图片压缩失败！')
	        })
	    },
		submit () {
			if(this.submitbtn){
				return
			}
			if(this.signDate.getTime() > this.contractSdate.getTime()){
				MessageBox('提示','“协议签署日期”必须小于或等于“协议生效日期”')
				return
			}
			if(this.signDate.getTime() >= this.contractEdate.getTime()){
				MessageBox('提示','“协议签署日期”必须小于 “协议到期日期”')
				return
			}
			if(this.contractSdate.getTime() >= this.contractEdate.getTime()){
				MessageBox('提示','“协议生效日期”必须小于“协议到期日期”')
				return
			}
			if(!this.imgurl.contractPic && !this.imgbase64.contractPic){
				MessageBox('提示','您还未上传协议照片！')
				return
			}
			if(this.islrz){
				MessageBox('提示','图片压缩中，请稍后重试！')
				return
			}
			this.submitbtn = true
			if(!this.imgurl.contractPic){
				this.upLoadImg()
			}else{
				this.submitFun()
			}
		},
		upLoadImg () {
			let _this = this
			let formData = new FormData()
			if(this.imgurl.contractPic){
				this.submitFun()
				return
			}
			formData.append("imgStr",this.imgbase64.contractPic)
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('upload/pic_min',formData)
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.imgurl.contractPic = res.data.urls[0]
					_this.imgbase64.contractPic = ''
					_this.submitFun()
				} else {
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				_this.submitbtn = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		submitFun () {
			let _this = this
			let formatdate = time => {
				let date = new Date(time)
				let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
				return date.getFullYear() + '-' + month + '-' + date.getDate()
			}
			axios.post('shop/addContract',qs.stringify({
				contractSdate: formatdate(this.contractSdate),
				contractEdate: formatdate(this.contractEdate),
				signDate: formatdate(this.signDate),
				contractPic: this.imgurl.contractPic
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.$router.push('/fillform/step6')
				} else {
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				_this.submitbtn = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		savedata () {
			let onlinePay5 = {
				contractSdate: this.contractSdate.getTime(),
				contractEdate: this.contractEdate.getTime(),
				signDate: this.signDate.getTime(),
				imgurl: this.imgurl,
				imgbase64: this.imgbase64
			}
			sessionStorage.setItem('onlinePay5',JSON.stringify(onlinePay5))
		},
		// shopExpandStatus () {
		// 	let _this = this
		// 	Indicator.open({
		// 	  text: '加载中...',
		// 	  spinnerType: 'fading-circle'
		// 	})
		// 	axios.post('shop/shopExpandStatus',qs.stringify({}))
		// 	.then(function(res){
		// 		Indicator.close()
		// 		if (res.data.code === '10000') {
		// 			if( res.data.data.status === '4'){
		// 				_this.shopExpandDetail()
		// 			}
		// 		} else {
		// 			Toast(res.data.msg)
		// 		}
		// 	})
		// 	.catch(function(){
		// 		Indicator.close()
		// 		Toast('连接失败，请检查网络是否正常!')
		// 	})
		// },
		shopExpandDetail () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('shop/shopExpandDetail',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					let today = _this.getdate(new Date())
					let signDate = res.data.data.signDate ? _this.getdate(new Date(res.data.data.signDate)) : today
					let Sdate = res.data.data.contractSdate ? _this.getdate(new Date(res.data.data.contractSdate)) : today
					let endDate = res.data.data.contractEdate ? _this.getdate(new Date(res.data.data.contractEdate)) : today
					_this.signDate = signDate.getTime() > today.getTime() ? today : signDate
					_this.contractSdate = Sdate.getTime() > today.getTime() ? today : Sdate
					_this.contractEdate = endDate.getTime() < today.getTime() ? today : endDate
					_this.date1 = _this.signDate
					_this.date2 = _this.contractSdate
					_this.date3 = _this.contractEdate
					_this.imgurl.contractPic = res.data.data.contractPic ? res.data.data.contractPic : ''
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
	},
	filters: {
		formatdate (date) {
			return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
		}
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;font-size: 1.4rem;}
.ex-fillform .top{text-align: center;font-size: 1.8rem;background: #fff;padding: 20px;}
.ex-fillform .top i.iconfont{color: #3dbc3c;font-size: 4rem;}
.ex-fillform .top .box{text-align: left;background: #fff9e3;color: #f05850;padding: 10px;font-size: 1.4rem;}

p.tip{color: #666;height: 36px;line-height: 36px;padding-left: 15px;font-size: 1.2rem;}
.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;position: relative;padding-right: 15px;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.name{}
.form-wrap .form-item span.text{width: 65%;}
.form-wrap .form-item span.text input {width: 100%;border:none;padding-left: 10px;}
.form-wrap .form-item span.f_right{text-align: right;vertical-align: middle;color: #aaafb6;}

.form-wrap .form-item .upladImg-wrap {height: 64px;width: 64px;position: relative;left: 0;overflow: hidden;margin-left: 10px;}
.form-wrap .form-item .upladImg-wrap img{position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;border: none;}
.form-wrap .form-item .upladImg-wrap .upladImg{position: absolute;text-align: center;border:dotted 1px #d8d8d8;height: 64px;width: 64px;color: #aaafb6;padding-top: 12px;}
.form-wrap .form-item .upladImg-wrap .upladImg i.iconfont{font-size: 1.6rem;}
.form-wrap .form-item .upladImg-wrap .file-prew{height: 64px;width: 64px;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}
.form-wrap .form-item.upload .explain{color: #999;padding: 5px 0;}
.form-wrap .form-item.upload .upladImg-box{width: 100%;position: relative;margin: 10px 0;}
.form-wrap .form-item.upload .upladImg-box .example{position: absolute;right: 0px;top: 0px;color: #999;}
.form-wrap .form-item.upload .upladImg-box .example img{width: 64px;height: 64px;border: solid 1px;vertical-align: bottom;}
.ex-field .ex-field-wrapper .upladImg-wrap .again{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;}


.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
.preview{position: absolute;z-index: 999;left: 0px;top: 0;}
</style>

