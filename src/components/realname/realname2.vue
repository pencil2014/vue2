<template>
	<div class="ex-realname">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*认证名将与后续绑定的银行卡挂钩，请谨慎填写有大陆银行卡的法人姓名</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">法人姓名</label>
					<input type="text" placeholder="银行提现人姓名" v-model="legalName" @input="standard('legalName')">
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">证件号码</label>
					<input type="text" placeholder="与认证名相符的身份证号"  v-model="legalIdcard" maxlength="25" @input="inputIdCard('legalIdcard')">
				</div>
			</div>
		</div>
		<div class="UploadIMGfrom">
			<div class="UpLoadIMG">
				<label for="">身份证正面照片</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.legalPic" alt="" v-show="imgurl.legalPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</span>
						<input type="file" name="" class="file-prew" id="legalPic" @change="getfile('legalPic')"  accept="image/*" />
					</div>
				</div>
			</div>
			<div class="UpLoadIMG">
				<label for="">法人手持身份证照片</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.holdPic" alt="" v-show="imgurl.holdPic">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</span>
						<input type="file" name="" class="file-prew" id="holdPic" @change="getfile('holdPic')"  accept="image/*" />
					</div>
				</div>
			</div>
		</div>
		<div class="ex-form">	
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">企业名称</label>
					<div class="ex-field-value">
						<input class="gray" type="text" placeholder="" maxlength="10" v-model="shopsName" @input="standard('shopsName')" readonly="readonly">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">营业执照号</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入营业执照号"  v-model="licenseNumber" maxlength="30" @input="inputIdCard('licenseNumber')">
					</div>
				</div>
			</div>
		</div>
		<div class="UploadIMGfrom">
			<div class="UpLoadIMG">
				<label for="">营业执照照片</label>
				<div>
					<div class="report-file">
						<img :src="imgurl.businessLicense" alt="" v-show="imgurl.businessLicense">
						<span>
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</span>
						<input type="file" name="" class="file-prew" id="businessLicense" @change="getfile('businessLicense')" accept="image/*" />
					</div>
				</div>
			</div>
		</div>
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
				text:'商家法人实名认证',
				fixed: false
			},
			imgurl: {
				legalPic: '',
				holdPic: '',
				businessLicense: ''
			},
			files: {
				legalPic: '',
				holdPic: '',
				businessLicense: ''
			},
			imgArray: [],
			legalName: '',
			legalIdcard: '',
			licenseNumber: '',
			shopsName: '',
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
			let rule = !this.legalName || !this.legalIdcard || !this.licenseNumber || !this.imgurl.holdPic || !this.imgurl.businessLicense || !this.imgurl.legalPic
			if(rule){
				return true
			}
			return false
		},
	},
	created () {
		let _this = this;
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		})
		axios.post('shop/examine',qs.stringify({})).then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.shopsName = res.data.data.shopsName
				_this.licenseNumber = res.data.data.licenseNumber
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.close()
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
			_this.islrz = true
			_this.imgurl[_id] = window.URL.createObjectURL(file);
			lrz(file,{width:640})
			.then(function (rst) {
				Indicator.close();
				_this.islrz = false
	        	_this.files[_id] = rst.base64;
	        })
	        .catch(function (err) {
	        	_this.islrz = false
	         	_this.files[_id] = '';
	         	Toast('图片压缩失败！')
	        })
		},
		uploadimg () {
			let _this = this;
			let formData = new FormData();
			let ids = ['legalPic','holdPic','businessLicense']
			ids.forEach(function(value){
				formData.append("imgStr", _this.files[value])
			})
			axios.post('upload/pic_min',formData)
			.then(function (res) {
				Indicator.close();
				if (res.data.code === '10000') {
					_this.imgArray = res.data.urls
					_this.toRealName()
				} else {
					_this.submitBtn = false;
					MessageBox('提示',res.data.msg)
				}
			}).catch(function(){
				Indicator.close();
				_this.submitBtn = false;
				MessageBox('提示','网络请求超时！')
			})
		},
		toRealName () {
			let _this = this;
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shop/realName',qs.stringify({
				legalName: _this.legalName,
				legalIdcard: _this.legalIdcard,
				licenseNumber: _this.licenseNumber,
				legalPic: _this.imgArray[0],
				holdPic: _this.imgArray[1],
				businessLicense: _this.imgArray[2],
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
				MessageBox('提示','网络请求超时！')
			})
		},
		submit(){
			// if(this.disable){
			// 	return;
			// }
			if(!this.legalName){
				MessageBox('提示','法人姓名不能为空！')
				return
			}
			if(!this.legalIdcard){
				MessageBox('提示','证件号码不能为空！')
				return
			}
			if(!this.imgurl.legalPic){
				MessageBox('提示','身份证正面照片不能为空！')
				return
			}
			if(!this.imgurl.holdPic){
				MessageBox('提示','法人手持身份证照片不能为空！')
				return
			}
			if(!this.licenseNumber){
				MessageBox('提示','营业执照号不能为空！')
				return
			}
			if(!this.imgurl.businessLicense){
				MessageBox('提示','营业执照照片不能为空！')
				return
			}
			if(this.islrz){
				MessageBox('提示','图片上传中，请稍候重试！')
				return
			}
			if(this.submitBtn){
				return 
			}
			this.submitBtn = true;
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			this.submitBtn = true;
			this.uploadimg();
		},
	}
}
</script>
<style scoped>
.ex-realname{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-form{margin-top: 15px;}
.ex-form p{min-height: 30px;line-height: 20px;word-wrap: break-word;padding: 0 0 10px 10px;color: rgb(93,100,110);}
.ex-field{background: #fff;padding: 0 0 0 15px;}
.ex-field-wrapper{height: 30px;width: 100%;font-size: 1.4rem;position: relative;padding: 9px 0;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 25%;height: 30px;line-height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper input[type=text]{display: block;width: 70%;font-size: 1.4rem;box-sizing: border-box;height: 100%;height: 30px;border:none;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px;}
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
.gray{color: #586485;}
</style>