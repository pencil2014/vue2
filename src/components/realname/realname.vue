<template>
	<div class="ex-realname">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*认证名将与后续绑定的银行卡挂钩，请谨慎填写有大陆银行卡的姓名或公司名</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">认证名</label>
					<div class="ex-field-value">
						<input type="text" placeholder="大陆银行卡户名(个人或公司名)" v-model="realName" @input="standard('realName')">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">证件号码</label>
					<div class="ex-field-value">
						<input type="text" placeholder="与认证名相符的身份证号或营业执照号码"  v-model="idCard" maxlength="20" @input="inputIdCard('idCard')">
					</div>
				</div>
			</div>
		</div>
		<div class="UploadIMGfrom">
			<div class="UpLoadIMG">
				<label for="">证件正、反面照片</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.frontPic" alt="" v-show="imgurl.frontPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传正面
						</span>
						<input type="file" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')"  accept="image/*" />
					</div>
					<div class="report-file">
						<img :src="imgurl.backPic" alt="" v-show="imgurl.backPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传反面
						</span>
						<input type="file" name="" class="file-prew" id="backPic" @change="getfile('backPic')" accept="image/*" />
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
						<input type="file" name="" class="file-prew" id="fullPic" @change="getfile('fullPic')" accept="image/*" />
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
			info:'',
			countdown: false,
			second: '短信验证码',
			submitBtn: false,
			islrz:false
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
		axios.post('/exsd-web/verify/checkRealName',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.info = res.data.data
				if(_this.info.status === '4'){
					_this.realName = _this.info.realName;
					_this.idCard = _this.info.idCard;
				}
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},
		inputIdCard(value){
			this[value] = this[value].replace(/[^a-zA-Z0-9]|\s/g,'')
		},
		getfile (id) {
			let _this = this;
			let _id = id;
			let file = document.getElementById(_id).files[0];
			if(!file){
				return
			}
			Indicator.open({
			  text: '图片压缩中，请稍候...',
			  spinnerType: 'fading-circle'
			});
			_this.imgurl[_id] = window.URL.createObjectURL(file);
			_this.islrz = true
			lrz(file,{width:640})
				.then(function (rst) {
					Indicator.close();
					_this.islrz = false
		        	_this.files[_id] = rst.base64;
		        })
		        .catch(function (err) {
		        	Indicator.close();
		        	_this.islrz = false
		         	_this.files[_id] = '';
		         	Toast('图片压缩失败！')
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
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/upload/pic_min',formData)
			.then(function (res) {
				Indicator.close();
				if (res.data.code === '10000') {
					_this.imgArray = res.data.urls
					_this.toRealname()
				} else {
					_this.submitBtn = false;
					Toast('上传图片失败，请稍后重试！')
				}
			}).catch(function(){
				Indicator.close()
				_this.submitBtn = false;
				Toast('连接失败，请检查网络是否正常!')	
			})
		},
		toRealname () {
			let _this = this;
			let backPic,fullPic;
			if(_this.files.backPic){
				backPic = _this.imgArray[1];
				fullPic = _this.imgArray[2];
			}else{
				backPic = null;
				fullPic = _this.imgArray[1];
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/verify/realName',qs.stringify({
				realName: _this.realName,
				idCard: _this.idCard,
				frontPic: _this.imgArray[0],
				backPic: backPic,
				fullPic: fullPic,
			})).then(res =>{
				Indicator.close();
				if (res.data.code === '10000') {
					MessageBox('提示','提交成功').then(action => {
						_this.$router.push('/user');
					})
				} else {
					_this.submitBtn = false;
					MessageBox('提示',res.data.msg)
				}
			}).catch(function(err){
				_this.submitBtn = false;
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')	
			})
		},
		submit(){
			// let rule1 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
			// if(this.disable){
			// 	return;
			// }
			if(!this.realName){
				MessageBox('提示','认证名不能为空！')
				return
			}
			if(!this.idCard){
				MessageBox('提示','证件号码不能为空！')
				return
			}
			if(!this.imgurl.frontPic){
				MessageBox('提示','证件正面照片不能为空！')
				return
			}
			if(!this.imgurl.backPic){
				MessageBox('提示','证件反面照片不能为空！')
				return
			}
			if(!this.imgurl.fullPic){
				MessageBox('提示','手持身份证照片不能为空！')
				return
			}
			if(this.submitBtn){
				return 
			}
			if(this.islrz){
				MessageBox('提示','图片上传中，请稍候重试！')
				return
			}
			this.submitBtn = true;
			this.uploadimg()
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
			axios.post('/exsd-web/verify/sendPhoneCode',qs.stringify({
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
					Toast('连接失败，请检查网络是否正常!')
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
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 75%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
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