<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top-wrap">
			<div class="step">
				<dl class="one">
					<dt>1</dt>
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
				<span><em></em></span>
			</div>
		</div>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">法人姓名</span>
				<span class="text"><input type="text" placeholder="请输入法人姓名" v-model="linkman"></span>
			</div>
			<div class="form-item">
				<span class="name">法人联系电话</span>
				<span class="text"><input type="text" placeholder="请输入联系人手机号"></span>
			</div>
			<div class="form-item" @click="openDatePicker1()">
				<span class="name">法人证件生效时间</span>
				<span class="text f_right">
					{{startVal || '请选择'}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openDatePicker2()">
				<span class="name">法人证件过期时间</span>
				<span class="text f_right">
					{{endVal || '请选择'}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item">
				<span class="name">法人证件号码</span>
				<span class="text"><input type="text" placeholder="请输入法人身份证号"></span>
			</div>
			<div class="form-item">
				<span class="name">法人身份证正面</span>
				<span class="text">
					<div class="upladImg-wrap">
						<img :src="imgurl.legalPic1" alt="" v-show="imgurl.legalPic1">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传正面
						</div>
						<input type="file" name="" class="file-prew" id="legalPic1" @change="getfile('legalPic1')" />
					</div>
					
				</span>
			</div>
			<div class="form-item">
				<span class="name">法人身份证背面</span>
				<span class="text">
					<div class="upladImg-wrap">
						<img :src="imgurl.legalPic2" alt="" v-show="imgurl.legalPic2">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传背面
						</div>
						<input type="file" name="" class="file-prew" id="legalPic2" @change="getfile('legalPic2')" />
					</div>
					
				</span>
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
		  :startDate='startDate'
      	  :endDate='endDate'
      	  v-model='date'
      	  @confirm='changeDate1'
		>
		</mt-datetime-picker>
		<mt-datetime-picker
		  ref="date2" 
		  type="date"
		  year-format="{value} 年"
		  month-format="{value} 月"
		  date-format="{value} 日"
		  :startDate='startDate'
      	  :endDate='endDate'
      	  v-model='date'
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
			date: new Date(),
			startDate: (function(){
				let year = new Date().getFullYear() - 10
				return new Date(year,0,1)
			})(),
			endDate: (function(){
				let year = new Date().getFullYear() + 10
				return new Date(year,11,31)
			})(),
			startVal: '',
			endVal: '',
			start: '',
			end: '',

			linkman: '',
			linkphone: '',
			licenseNumber: '',
			imgurl: {
				legalPic1: '',
				legalPic2: '',
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
			this.linkman = onlinePay2.linkman
			this.linkphone = onlinePay2.linkphone
			this.start = onlinePay2.start
			this.end = onlinePay2.end
			this.startVal = onlinePay2.startVal
			this.endVal = onlinePay2.endVal
			this.licenseNumber = onlinePay2.licenseNumber
			this.imgurl = onlinePay2.imgurl
		}
	},
	methods: {
		back () {
			this.$router.back();
		},
		openDatePicker1 () {
			this.$refs.date1.open();
	    },
	    openDatePicker2 () {
			this.$refs.date2.open();
	    },
	    changeDate1 (date) {
	    	this.startVal = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
	    	this.start = date
	    },
	    changeDate2 (date) {
	    	this.endVal = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
	    	this.end = date
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
	        	_this.imgurl[id] = rst.base64;
	        	_this.islrz = false
	        })
	        .catch(function (err) {
	        	Indicator.close();
	         	_this.imgurl[id] = '';
	         	_this.islrz = false
	         	Toast('图片压缩失败！')
	        })
	    },
		save () {
			// if(!this.start){
			// 	MessageBox('提示','请选择法人证件生效时间！')
			// 	return
			// }
			// if(!this.end){
			// 	MessageBox('提示','请选择法人证件过期时间！')
			// 	return
			// }
			// if(this.islrz){
			// 	MessageBox('提示','图片上传中，请稍候重试！')
			// 	return
			// }
			// let time1 = this.start.getTime()
			// let time2 = this.end.getTime()
			// if(time1 >= time2){
			// 	MessageBox('提示','法人证件过期时间不能小于或等于生效时间！')
			// 	return
			// }
			let onlinePay2 = {
				linkman: this.linkman,
				linkphone: this.linkphone,
				start: this.start,
				end: this.end,
				startVal: this.startVal,
				endVal: this.endVal,
				licenseNumber: this.licenseNumber,
				imgurl: this.imgurl
			}
			sessionStorage.setItem('onlinePay2',JSON.stringify(onlinePay2))
			this.$router.push('/fillform/step3')
		}
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;font-size: 1.4rem;}
.step{width: 75%;position: relative;margin: 34px 12.5% 0;padding-bottom: 60px;}
.step dl {position: absolute;text-align: center;width: 70px;margin-left: -35px;color: #aaafb6;margin-top: -12px;z-index: 3;}
.step dl.active{color: #58c86b;}
.step dl.one{left: 0;}
.step dl.two{left: 33.5%;}
.step dl.three{left: 66.66%;}
.step dl.four{left: 100%;}
.step dl dt{width: 30px;height: 30px;border: solid 3px #e3e3e3;margin: 0 auto;border-radius: 50%;line-height: 24px;margin-bottom: 5px;background: #f0f0f0;}
.step dl.active dt{width: 40px;height: 40px;line-height: 34px;background: #58c86b;color: #fff;margin-bottom: 0;margin-top: -5px;}
.step span{width: 100%;height: 7px;background: #e3e3e3;display: inline-block;position: absolute;top: 0;left: 0;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.name{}
.form-wrap .form-item span.text{width: 65%;}
.form-wrap .form-item span.text input {width: 100%;border:none;padding-left: 10px;}
.form-wrap .form-item span.f_right{text-align: right;padding-right: 15px;vertical-align: middle;color: #aaafb6;}

.form-wrap .form-item .upladImg-wrap {height: 64px;width: 64px;position: relative;right: 10px;float: right;overflow: hidden;}
.form-wrap .form-item .upladImg-wrap img{position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;border: none;}
.form-wrap .form-item .upladImg-wrap .upladImg{position: absolute;text-align: center;border:dotted 1px #d8d8d8;height: 64px;width: 64px;color: #aaafb6;padding-top: 12px;}
.form-wrap .form-item .upladImg-wrap .upladImg i.iconfont{font-size: 1.6rem;}
.form-wrap .form-item .upladImg-wrap .file-prew{height: 64px;width: 64px;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}

.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>

