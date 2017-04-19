<template>
	<div class="ex-realname">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*认证名将与后续绑定的银行卡挂钩，请谨慎填写有大陆银行卡的姓名或公司名</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">认证名</label>
					<div class="ex-field-value">
						<input type="text" placeholder="大陆银行卡户名(个人或公司名)" maxlength="10" v-model="realName" @input="standard('realName')">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">证件号码</label>
					<div class="ex-field-value">
						<input type="text" placeholder="与认证名相符的身份证号或营业执照号码"  v-model="idCard" maxlength="25" @input="standard('idCard')">
					</div>
				</div>
			</div>
		</div>
		<div class="UploadIMGfrom">
			<div class="UpLoadIMG">
				<label for="">证件正、反面照片（反面照片若没有可不传）</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.frontPic" alt="" v-show="imgurl.frontPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传正面
						</span>
						<input type="file" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')" accept="image/*" />
					</div>
					<div class="report-file">
						<img :src="imgurl.backPic" alt="" v-show="imgurl.backPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传反面
						</span>
						<input type="file" name="" class="file-prew" id="backPic" @change="getfile('backPic')" accept="image/*"/>
					</div>
				</div>
			</div>
			<div class="UpLoadIMG">
				<label for="">手持身份证照片</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.fullPic" alt="" v-show="imgurl.fullPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</span>
						<input type="file" name="" class="file-prew" id="fullPic" @change="getfile('fullPic')" accept="image/*"/>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="ex-form">
			<p>*验证你的注册手机号：{{phone}}</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">短信验证码</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入验证码" maxlength="6" v-model.trim="phoneCode">
						<input type="button" name="" v-model.trim="secondText" @click="sendCode" :disabled='countdown'>
					</div>
				</div>
			</div>
		</div> -->
		<Btn 
			text="提交"  
			:disableBtn="disable"
			@callback="submit"
		>
		</Btn>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import lrz from 'lrz'
export default {
	data(){
		return{
			modal: {
				text:'实名认证',
				fixed: false
			},
			imgurl:{
				frontPic:'',
				backPic:'',
				fullPic:''
			},
			files: {
				frontPic:'',
				backPic:'',
				fullPic:''
			},
			imgArray:[],
			phone:'',
			realName:'',
			idCard:'',
			phoneCode:'',
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '审核中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
	        _Promise:'',
			countdown: false,
			second: '短信验证码',
			submitBtn: false
		}
	},
	components: {
		HeadTitle,
		Btn
	},
	computed:{
		disable () {
			let rule = !this.realName || !this.idCard || !this.imgurl.frontPic || !this.imgurl.fullPic
			if(rule){
				return true
			}
			return false
		},
		secondText () {
			if (/^\d*$/.test(this.second)) {
				return this.second + '秒'
			}else{
				return this.second
			}
		}
	},
	created () {
		let _this = this;
	},
	methods: {
		back(){
			this.$router.back();
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},
		getfile (id) {
			let _this = this;
			let _id = id;
			let file = document.getElementById(_id).files[0];
			if(!file){
				return
			}
			_this.imgurl[_id] = window.URL.createObjectURL(file);
			lrz(file,{width:640})
				.then(function (rst) {
		        	_this.files[_id] = rst.base64;
		        })
		        .catch(function (err) {
		         	_this.files[_id] = '';
		        })
		},
		uploadimg () {
			let _this = this;
			let formData = new FormData();
			formData.append("imgStr", _this.files.frontPic)
			if(_this.files.backPic){
				formData.append("imgStr", _this.files.backPic)
			}
			formData.append("imgStr", _this.files.fullPic)
			return new Promise(function(resolve, reject) {
				axios.post('upload/pic_min',formData)
				.then(function (res) {
					if (res.data.code === '10000') {
						resolve(res.data.urls)
					} else {
						reject('上传图片失败，请稍后重试！')
					}
				}).catch(function(){
					reject('网络请求超时！')
				})
 			})
		},
		submit(){
			let _this = this;
			// let rule1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
			if(_this.disable){
				return;
			}
			if(_this.submitBtn){
				return 
			}
			let _Promise = this.checkIdCard
			let _Promise2 = this.uploadimg
			_this.submitBtn = true;
			Indicator.open({
			  text: '图片处理中...',
			  spinnerType: 'fading-circle'
			})
			_Promise2().then(function(value){
				_this.imgArray = value
				Indicator.close();
				Indicator.open({
				  text: '正在提交...',
				  spinnerType: 'fading-circle'
				})
				let backPic,fullPic;
				if(_this.files.backPic){
					backPic = _this.imgArray[1];
					fullPic = _this.imgArray[2];
				}else{
					backPic = null;
					fullPic = _this.imgArray[1];
				}
				axios.post('verify/realName',qs.stringify({
					realName: _this.realName,
					idCard: _this.idCard,
					frontPic: _this.imgArray[0],
					backPic: backPic,
					fullPic: fullPic,
				}),_this.config).then(res =>{
					Indicator.close();
					if (res.data.code === '10000') {
						MessageBox('提示','提交成功').then(action => {
							_this.$router.push('/user');
						})
					} else {
						MessageBox('提示',res.data.msg).then(action => {
							_this.submitBtn = false;
						})
					}
				}).catch(function(err){
					_this.submitBtn = false;
					Indicator.close();
					Toast('网络请求超时！')	
				})
			}).catch(function(err){
				_this.submitBtn = false;
				Toast(err)
			})
			
		},
		sendCode () {
			let _this = this;
			let rule1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
			if(!_this.realName){
				Toast('请输入真实姓名')
				return;
			}
			if(!_this.idCard){
				Toast('请输入身份证号码')
				return;
			}
			if(!rule1.test(_this.idCard)){
				Toast('请输入正确的身份证号码')
				return;
			}
			_this.countdown = true

			//获取短信验证码
			Indicator.open({
			  text: '正在获取...',
			  spinnerType: 'fading-circle'
			})
			axios.post('verify/sendPhoneCode',qs.stringify({
				phone: _this.phone,
				codeType: 6,
				smsType: 1
			})).then(res =>{
				Indicator.close()
				if (res.data.code === '10000') {
					Toast('请查收您的短信')
					_this.countdownFn();
				} else {
					Toast(res.data.msg)
					_this.countdown = false
				}
			}).catch(function(){
					Indicator.close()
					_this.countdown = false
					Toast('网络请求超时！')
			})
			
		},
		countdownFn () {
			let _this = this
			_this.second = 120;
			let timer = setInterval(function(){
				_this.second -= 1
				if (_this.second < 0) {
					_this.countdown = false
					_this.second = '短信验证码'
					clearInterval(timer)
				}
			},1000)
		},
		checkIdCard () {
			let _this = this;
			 return new Promise(function(resolve, reject) {
				axios.post('verify/isIdCard',qs.stringify({
					idCard: _this.idCard
				})).then(function (res) {
					if (res.data.code === '10000') {
						resolve(res.data)
					} else {
						reject('该身份证号码已被其它用户使用，请更换身份证号码后进行实名认证')
					}
				}).catch(function(err){
					reject('网络请求超时！')
				})
 			})
		}
	}
}
</script>
<style scoped>
.ex-realname{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-form{}
.ex-form p{min-height: 30px;line-height: 20px;word-wrap: break-word;padding: 10px 0 10px 10px;color: rgb(93,100,110);}
.ex-field{background: #fff;padding: 0 0 0 15px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 20%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 75%;height: 30px;border: none;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.readonly input{color: #586485}


.UploadIMGfrom{background: #fff;padding: 0 0 0 15px;margin-top: 15px;}
.UploadIMGfrom .UpLoadIMG{border-bottom: 1px solid #ebebeb;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;font-size: 1.4rem;}
.UploadIMGfrom .UpLoadIMG:last-child{border-bottom: none;}
.report-file{width: 64px;height: 64px;overflow:hidden;border: dotted 1px #d8d8d8; display: inline-flex;margin-left: 5%;margin-top: 6px;text-align: center;position: relative;} 
.report-file img{position: absolute;height: 100%;width: 100%;top: 0;left: 0;border:none;}
.file-prew{opacity: 0;filter: alpha(opacity=0);cursor: pointer;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;}
.UpLoadIMG span{cursor: pointer;display: block;width: 100%;color: #aaafb6;font-size: 1.2rem;line-height: 20px;margin-top: 12px;}
.UpLoadIMG span i.iconfont{font-size: 1.6rem;}
</style>