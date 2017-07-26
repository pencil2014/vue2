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
					<dd>协议打印上传</dd>
				</dl>
				<span><em style="width:33.5%;"></em></span>
			</div>
		</div>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">*法人姓名</span>
				<span class="text"><input type="text" placeholder="请输入法人姓名" v-model.trim="legalName" maxlength="20"></span>
			</div>
			<div class="form-item">
				<span class="name">*法人联系电话</span>
				<span class="text"><input type="tel" placeholder="请输入法人手机号" maxlength="11" v-model.trim="legalPhone" @input="formatPhone('legalPhone')"></span>
			</div>
			<div class="form-item">
				<span class="name">*法人证件号码</span>
				<span class="text"><input type="text" placeholder="请输入法人身份证号" v-model.trim="legalId" maxlength="20"></span>
			</div>
			<div class="form-item" @click="openPicker1()">
				<span class="name">*法人证件生效日期</span>
				<span class="text f_right">
					{{legalSdate | formatdate }}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openPicker2()">
				<span class="name">*法人证件过期日期</span>
				<span class="text f_right">
					{{legalEdate | formatdate }}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item">
				<div>*法人身份证正面</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.legalFront || imgbase64.legalFront" alt="" v-show="imgurl.legalFront || imgbase64.legalFront">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传正面
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.legalFront || imgbase64.legalFront">
						<input type="file"  accept="image/*" name="" class="file-prew" id="legalFront" @change="getfile('legalFront')" />
					</div>
				</div>
			</div>
			<div class="form-item">
				<div>*法人身份证背面</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.legalBack || imgbase64.legalBack" alt="" v-show="imgurl.legalBack || imgbase64.legalBack">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传反面
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.legalBack || imgbase64.legalBack">
						<input type="file"  accept="image/*" name="" class="file-prew" id="legalBack" @change="getfile('legalBack')" />
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

			start1: '',
			end1: '',
			start2: '',
			end2: '',
			legalSdate: '',
			legalEdate: '',
			date1: '',
			date2: '',
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
			islrz: false,
			onlinePay2: '',
			status: '',
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
		this.onlinePay2  = JSON.parse(sessionStorage.getItem('onlinePay2'))
		this.setdate()
	},
	methods: {
		back () {
			this.$router.back();
		},
		inputIdCard(value){
			this[value] = this[value].replace(/[^a-zA-Z0-9]|\s/g,'')
		},
		formatPhone(value){
			this[value] = this[value].replace(/[^0-9]|\s/g,'')
		},
		setdate () {
			let date = new Date()
			this.start1 = new Date(1900,0,1)
			this.end1 = this.getdate(date)
			this.start2 = this.getdate(date)
			this.end2 = new Date(2099,11,31)
			//this.legalSdate = this.getdate(date)
			//this.legalEdate = this.getdate(date)
			this.date1 = this.getdate(date)
			this.date2 = this.getdate(date)
			this.shopExpandStatus()
		},
		getdate (date) {
			let year = date.getFullYear()
			let month = date.getMonth()
			let day = date.getDate()
			return new Date(year,month,day)
		},
		openPicker1 () {
			this.$refs.date1.open();
	    },
	    openPicker2 () {
			this.$refs.date2.open();
	    },
	    changeDate1 (date) {
	    	let date1 = this.getdate(date)
	    	this.legalSdate = date1
	    },
	    changeDate2 (date) {
	    	let date1 = this.getdate(date)
	    	this.legalEdate = date1
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
			if(!/^1[3-9]\d{9}$/.test(this.legalPhone)){
				MessageBox('提示','电话号码不正确！')
				return 
			}
			if(!this.legalId){
				MessageBox('提示','法人证件号码不能为空！')
				return
			}
			if(!/^[a-zA-Z0-9]+$/g.test(this.legalId)){
				MessageBox('提示','法人证件号码只能输入数字和英文！')
				return
			}
			if(!this.legalSdate){
				MessageBox('提示','法人证件生效日期不能为空！')
				return
			}
			if(!this.legalEdate){
				MessageBox('提示','法人证件过期日期不能为空！')
				return
			}
			if(this.legalSdate.getTime() >= this.legalEdate.getTime()){
				MessageBox('提示','“法人证件生效日期”必须小于 “法人证件过期日期”！')
				return
			}
			if(!this.imgurl.legalFront && !this.imgbase64.legalFront){
				MessageBox('提示','请上传身份证正面照片！')
				return
			}
			if(!this.imgurl.legalBack && !this.imgbase64.legalBack){
				MessageBox('提示','请上传身份证背面照片！')
				return
			}
			if(this.islrz){
				MessageBox('提示','图片上传中，请稍候重试！')
				return
			}
			Indicator.open({
			  text: '数据保存中，请稍候...',
			  spinnerType: 'fading-circle'
			})
			let onlinePay2 = {}
			onlinePay2.legalName = this.legalName
			onlinePay2.legalPhone = this.legalPhone
			onlinePay2.legalSdate = this.legalSdate.getTime()
			onlinePay2.legalEdate = this.legalEdate.getTime()
			onlinePay2.legalId = this.legalId
			onlinePay2.imgurl = this.imgurl
			onlinePay2.imgbase64 = this.imgbase64
			sessionStorage.setItem('onlinePay2',JSON.stringify(onlinePay2))
			Indicator.close()
			this.$router.push('/fillform/step3')
		},
		shopExpandStatus () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('shop/shopExpandStatus',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					if(res.data.data.status === '4'){
						_this.shopExpandDetail()
					}else{
						_this.getdata()
					}
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
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
					if(!_this.onlinePay2){
						_this.legalName = res.data.data.legalName
						_this.legalPhone = res.data.data.legalPhone
						let today = _this.getdate(new Date())
						let Sdate = _this.getdate(new Date(res.data.data.legalSdate))
						let endDate = _this.getdate(new Date(res.data.data.legalEdate))
						_this.legalSdate = Sdate.getTime() > today.getTime() ? today : Sdate
						_this.legalEdate = endDate.getTime() < today.getTime() ? today : endDate
						_this.date1 = _this.legalSdate
						_this.date2 = _this.legalEdate
						_this.legalId = res.data.data.legalId
						_this.imgurl = {
							legalFront: res.data.data.legalFront,
							legalBack: res.data.data.legalBack
						}
					}else{
						_this.getdata()
					}
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getdata () {
			if(this.onlinePay2){
				this.legalName = this.onlinePay2.legalName
				this.legalPhone = this.onlinePay2.legalPhone
				let today = this.getdate(new Date())
				let Sdate = this.getdate(new Date(this.onlinePay2.legalSdate))
				let endDate = this.getdate(new Date(this.onlinePay2.legalEdate))
				this.legalSdate = Sdate.getTime() > today.getTime() ? today : Sdate
				this.legalEdate = endDate.getTime() < today.getTime() ? today : endDate
				this.date1 = this.legalSdate
				this.date2 = this.legalEdate
				this.legalId = this.onlinePay2.legalId
				this.imgurl = this.onlinePay2.imgurl
				this.imgbase64 = this.onlinePay2.imgbase64
			}
		},
	},
	filters: {
		formatdate (date) {
			if(!date){
				return '请选择'
			}else{
				return date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日'
			}
		}
	},
	destroyed () {
		Indicator.close()
	}
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
.step dl dt{width: 34px;height: 34px;/*border: solid 3px #e3e3e3;*/margin: 0 auto;border-radius: 50%;line-height: 34px;background: #e3e3e3;margin-top: -15px;margin-bottom: 4px;}
.step dl.active dt{line-height: 34px;background: #37a936;color: #fff;}
.ex-fillform .step dl.active{color: #37a936;}
.step dl.finish dt{width: 26px;height: 26px;color: #fff;background: #37a936;line-height: 26px;margin-top: -11px;margin-bottom: 7.5px;}
.step dl.finish dt i.iconfont{font-size: 1.4rem;}
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
.ex-field .ex-field-wrapper .upladImg-wrap .again{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;}


.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>

