<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top-wrap">
			<div class="step">
				<dl class="one finish">
					<dt>
						<i class="iconfont">&#xe616;</i>
					</dt>
					<dd>基本信息</dd>
				</dl>
				<dl class="two active">
					<dt>2</dt>
					<dd>法人信息</dd>
				</dl>
				<dl class="three">
					<dt>3</dt>
					<dd>申请材料</dd>
				</dl>
				<dl class="four">
					<dt>4</dt>
					<dd>合同打印上传</dd>
				</dl>
				<span><em style="width:33.5%;"></em></span>
			</div>
		</div>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">法人姓名</span>
				<span class="text"><input type="text" placeholder="请输入法人姓名" v-model="legalName"></span>
			</div>
			<div class="form-item">
				<span class="name">法人联系电话</span>
				<span class="text"><input type="tel" placeholder="请输入法人手机号" maxlength="11" v-model="legalPhone"></span>
			</div>
			<div class="form-item" @click="openPicker1()">
				<span class="name">法人证件生效日期</span>
				<span class="text f_right">
					{{legalSdate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openPicker2()">
				<span class="name">法人证件过期日期</span>
				<span class="text f_right">
					{{legalEdate | formatdate }}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item">
				<span class="name">法人证件号码</span>
				<span class="text"><input type="text" placeholder="请输入法人身份证号" v-model="legalId"></span>
			</div>
			<div class="form-item">
				<div>法人身份证正面</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.legalFront || imgbase64.legalFront" alt="" v-show="imgurl.legalFront || imgbase64.legalFront">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传正面
						</div>
						<input type="file" name="" class="file-prew" id="legalFront" @change="getfile('legalFront')" />
					</div>
				</div>
			</div>
			<div class="form-item">
				<div>法人身份证背面</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.legalBack || imgbase64.legalBack" alt="" v-show="imgurl.legalBack || imgbase64.legalBack">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传反面
						</div>
						<input type="file" name="" class="file-prew" id="legalBack" @change="getfile('legalBack')" />
					</div>
					
				</div>
			</div>
		</div>
		<div class="save">
			<input type="button" value="下一步" @click="save">
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
		  :startDate='start2'
      	  :endDate='end2'
      	  v-model='date2'
      	  @confirm='changeDate2'
		>
		</mt-datetime-picker>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator , DatetimePicker} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import lrz from 'lrz'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},

			start1: new Date(1900,0,1),
			end1: new Date(),
			start2: new Date(),
			end2: new Date(2099,12,31),
			legalSdate: new Date(),
			legalEdate: new Date(),
			date1: new Date(),
			date2: new Date(),
			legalName: '',
			legalPhone: '',
			legalId: '',
			imgurl: {
				legalFront: '',
				legalBack: '',
			},
			imgbase64: {
				legalFront: '',
				legalBack: '',
			},
			islrz: false
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disable () {
			
		},
	},
	created () {
		let onlinePay2  = JSON.parse(sessionStorage.getItem('onlinePay2'))
		if(onlinePay2){
			this.legalName = onlinePay2.legalName
			this.legalPhone = onlinePay2.legalPhone
			this.legalSdate = new Date(onlinePay2.legalSdate)
			this.legalEdate = new Date(onlinePay2.legalEdate)
			this.date1 = new Date(onlinePay2.legalSdate)
			this.date2 = new Date(onlinePay2.legalEdate)
			this.legalSdateVal = onlinePay2.legalSdateVal
			this.legalEdateVal = onlinePay2.legalEdateVal
			this.legalId = onlinePay2.legalId
			this.imgurl = onlinePay2.imgurl
			this.imgbase64 = onlinePay2.imgbase64
		}
	},
	methods: {
		back () {
			this.$router.back();
		},
		openPicker1 () {
			this.$refs.date1.open();
	    },
	    openPicker2 () {
			this.$refs.date2.open();
	    },
	    changeDate1 (date) {
	    	this.legalSdate = date
	    },
	    changeDate2 (date) {
	    	this.legalEdate = date
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
	        	_this.imgurl[id] = '';
	        	_this.imgbase64[id] = rst.base64;
	        	_this.islrz = false
	        })
	        .catch(function (err) {
	        	Indicator.close();
	         	_this.islrz = false
	         	Toast('图片压缩失败！')
	        })
	    },
		save () {
			if(!this.legalName){
				MessageBox('提示','法人姓名不能为空！')
				return
			}
			if(!this.legalPhone){
				MessageBox('提示','法人联系电话不能为空！')
				return
			}
			if(this.legalSdate.getTime() >= this.legalEdate.getTime()){
				MessageBox('提示','法人证件生效日期不能超过或等于过期日期！')
				return
			}
			if(!this.legalId){
				MessageBox('提示','法人证件号码不能为空！')
				return
			}
			if(!(this.imgurl.legalFront || this.imgbase64.legalFront)){
				MessageBox('提示','请上传法人身份证正面照！')
				return
			}
			if(!(this.imgurl.legalBack || this.imgbase64.legalBack)){
				MessageBox('提示','请上传法人身份证背面照！')
				return
			}
			if(this.islrz){
				MessageBox('提示','图片上传中，请稍候重试！')
				return
			}
			
			this.savedata()
			this.$router.push('/fillform/step3')
		},
		savedata () {
			let onlinePay2 = {
				legalName: this.legalName,
				legalPhone: this.legalPhone,
				legalSdate: this.legalSdate.getTime(),
				legalEdate: this.legalEdate.getTime(),
				legalId: this.legalId,
				imgurl: this.imgurl,
				imgbase64: this.imgbase64
			}
			sessionStorage.setItem('onlinePay2',JSON.stringify(onlinePay2))
		}
	},
	filters: {
		formatdate (date) {
			return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
		}
	},
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;font-size: 1.4rem;}
.step{width: 75%;position: relative;margin: 34px 12.5% 0;padding-bottom: 60px;}
.step dl {position: absolute;text-align: center;width: 70px;margin-left: -35px;color: #aaafb6;z-index: 3;}
.step dl.active{color: #58c86b;}
.step dl.one{left: 0;}
.step dl.two{left: 33.5%;}
.step dl.three{left: 66.66%;}
.step dl.four{left: 100%;}
.step dl dt{width: 40px;height: 40px;border: solid 3px #e3e3e3;margin: 0 auto;border-radius: 50%;line-height: 34px;background: #e3e3e3;margin-top: -18px;}
.step dl.active dt{line-height: 34px;background: #37a936;color: #fff;}
.ex-fillform .step dl.active,.ex-fillform .step dl.finish{color: #37a936;}
.step dl.finish dt{width: 32px;height: 32px;margin-top: -14px;margin-bottom: 4px;color: #fff;background: #37a936;line-height: 26px;}
.step span{width: 100%;height: 4px;background: #e3e3e3;display: inline-block;position: absolute;top: 0;left: 0;}
.step span em{display: inline-block;height: 4px;position: absolute;z-index: 2;background: #37a936;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.name{}
.form-wrap .form-item span.text{width: 65%;}
.form-wrap .form-item span.text input {width: 100%;border:none;padding-left: 10px;}
.form-wrap .form-item span.f_right{text-align: right;padding-right: 15px;vertical-align: middle;color: #aaafb6;}

.form-wrap .form-item .upladImg-wrap {height: 64px;width: 64px;position: relative;left: 0;overflow: hidden;margin-top: 10px;margin-left: 10px;}
.form-wrap .form-item .upladImg-wrap img{position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;border: none;}
.form-wrap .form-item .upladImg-wrap .upladImg{position: absolute;text-align: center;border:dotted 1px #d8d8d8;height: 64px;width: 64px;color: #aaafb6;padding-top: 12px;}
.form-wrap .form-item .upladImg-wrap .upladImg i.iconfont{font-size: 1.6rem;}
.form-wrap .form-item .upladImg-wrap .file-prew{height: 64px;width: 64px;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}

.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>

