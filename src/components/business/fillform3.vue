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
				<dl class="two finish">
					<dt>
						<i class="iconfont">&#xe616;</i>
					</dt>
					<dd>法人信息</dd>
				</dl>
				<dl class="three active">
					<dt>3</dt>
					<dd>申请材料</dd>
				</dl>
				<dl class="four">
					<dt>4</dt>
					<dd>协议打印上传</dd>
				</dl>
				<span><em style="width:66.66%;"></em></span>
			</div>
		</div>

		<div class="form-wrap">
			<div class="form-item">
				<span class="name">*营业执照编号</span>
				<span class="text"><input type="text" placeholder="请输入营业执照编号" v-model.trim="licenseNo" maxlength="20" @input="filteremoji('licenseNo')"></span>
			</div>
			<div class="form-item" @click="openPicker1()">
				<span class="name">*营业执照生效日期</span>
				<span class="text f_right">
					{{licenseSdate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="openPicker2()">
				<span class="name">*营业执照过期日期</span>
				<span class="text f_right">
					{{licenseEdate | formatdate}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item">
				<div>*营业执照照片</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.licensePic || imgbase64.licensePic" alt="" v-show="imgurl.licensePic || imgbase64.licensePic ">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.licensePic || imgbase64.licensePic">
						<input type="file"  accept="image/*" name="" class="file-prew" id="licensePic" @change="getfile('licensePic')" />
					</div>
				</div>
			</div>
		</div>
		
		<div class="box-wrap">
			<p class="title">二维码收款结算银行卡</p>
			<p class="text">*选择个人账户银行卡，银行卡户名应为营业执照上的法人姓名；<br>
			&nbsp;选择对公账户银行卡，银行卡户名应为营业执照上的公司名。</p>
			<p class="text">
				*支行名称须按格式填写：地区 (不含省) +支行名称；<br>
				&nbsp;如：杭州西湖支行。
			</p>
		</div>


		<div class="form-wrap">
			<div class="form-item" @click="OpenSlots">
				<span class="name">*账户类型</span>
				<span class="text f_right">
					{{accountVal || '请选择'}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item" @click="OpenSlots2">
				<span class="name">*开户行名称</span>
				<span class="text f_right">
					{{bank || '请选择'}}
					<i class="iconfont" >&#xe606;</i>
				</span>
			</div>
			<div class="form-item">
				<span class="name">*支行名称</span>
				<span class="text"><input type="text" placeholder="请输入支行名称" v-model.trim="branch" maxlength="40" @input="filteremoji('branch')" @focus="toView($event)"></span>
			</div>
			<div class="form-item">
				<span class="name">*银行户名</span>
				<span class="text"><input type="text" placeholder="请输入开户人名称" v-model.trim="accountName" maxlength="40" @input="filteremoji('accountName')" @focus="toView($event)"></span>
			</div>
			<div class="form-item">
				<span class="name">*银行账号</span>
				<span class="text"><input type="tel" placeholder="请输入银行账号" v-model.trim="accountNo" @input="formatcard('accountNo')" maxlength="25" @focus="toView($event)"></span>
			</div>
			<div class="form-item">
				<div>*整体门面（含招牌）照片</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.frontPic || imgbase64.frontPic" alt="" v-show="imgurl.frontPic || imgbase64.frontPic">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.frontPic || imgbase64.frontPic">
						<input type="file"  accept="image/*" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')" />
					</div>
				</div>
			</div>
			<div class="form-item">
				<div>*收银台照片</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.counterPic || imgbase64.counterPic" alt="" v-show="imgurl.counterPic || imgbase64.counterPic">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.counterPic || imgbase64.counterPic">
						<input type="file"  accept="image/*" name="" class="file-prew" id="counterPic" @change="getfile('counterPic')" />
					</div>
				</div>
			</div>
			<div class="form-item">
				<div>*店内环境照片</div>
				<div>
					<div class="upladImg-wrap">
						<img :src="imgurl.viewPic || imgbase64.viewPic" alt="" v-show="imgurl.viewPic || imgbase64.viewPic">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<img src="../../assets/images/again.png" alt="" class="again" v-show="imgurl.viewPic || imgbase64.viewPic">
						<input type="file"  accept="image/*" name="" class="file-prew" id="viewPic" @change="getfile('viewPic')" />
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
		  :startDate='start2'
      	  :endDate='end2'
      	  v-model='date2'
      	  @confirm='changeDate2'
		>
		</mt-datetime-picker>

		<mt-popup
			v-model="isOpenSlots"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots" @change="slotsChange" :showToolbar="true" valueKey="type">
				<slot>
					<div class="range-slots">
						<span class="left" @click="cancle">取消</span>
						<span class="right" @click="confirm">确定</span>
					</div>
				</slot>
			</mt-picker>
		</mt-popup>

		<mt-popup
			v-model="isOpenSlots2"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots2" @change="slotsChange2" :showToolbar="true" valueKey="name">
				<slot>
					<div class="range-slots">
						<span class="left" @click="cancle2">取消</span>
						<span class="right" @click="confirm2">确定</span>
					</div>
				</slot>
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator , DatetimePicker , Picker , Popup } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import lrz from 'lrz'
import banks from '../../api/banks'

const accountTypes = [{id: '1',type: '对公账户'},{id: '2',type: '个人账户'}]
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
			licenseSdate: '',
			licenseEdate: '',
			date1: '',
			date2: '',
			
			slots: [
				{
					values: accountTypes,
					textAlign: 'center',
					defaultIndex: 0
				}
			],
			isOpenSlots: false,
			accountType: '',
			accountVal: '',
			selaccountType: '',
			selaccountVal: '',

			slots2: [
				{
					values: banks,
					textAlign: 'center',
					defaultIndex: 0
				}
			],
			isOpenSlots2: false,
			selbank: '',
			bank: '',
			selbankId: '',
			bankId: '',

			licenseNo: '',
			imgurl: {
				licensePic: '',
				frontPic: '',
				counterPic: '',
				viewPic: '',
				legalFront: '',
				legalBack: '',
			},
			imgbase64: {
				licensePic: '',
				frontPic: '',
				counterPic: '',
				viewPic: '',
				legalFront: '',
				legalBack: '',
			},
			imgIds: [],
			imgArray: [],
			branch: '',
			accountName: '',
			accountNo: '',
			submitbtn: false,


			onlinePay1: '',
			onlinePay2: '',
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disable () {
		
		},
		account () {
			return this.accountNo.replace(/\s/g,'')
		}
	},
	created () {
		this.onlinePay1 = JSON.parse(sessionStorage.getItem('onlinePay'))
		let onlinePay2 = JSON.parse(sessionStorage.getItem('onlinePay2'))
		this.onlinePay2 = onlinePay2
		if(onlinePay2){
			for(let i in onlinePay2.imgurl){
				if(onlinePay2.imgbase64[i]){
					this.imgIds.push(i)
					this.imgbase64[i] = onlinePay2.imgbase64[i]
				}else{
					this.imgurl[i] = onlinePay2.imgurl[i]
				}
			}
		}
		this.setdate()
	},
	methods: {
		back () {
			this.$router.back();
		},
		toView (event) {
			let $target = event.currentTarget
			$target.scrollIntoView(true)
		},
		filteremoji (id) {
			let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
			this[id] = this[id].replace(regStr, '')
		},
		setdate () {
			let date = new Date()
			// this.start1 = (function(){
			// 	let year = new Date().getFullYear() - 10
			// 	let month = new Date().getMonth()
			// 	let day = new Date().getDate()
			// 	return new Date(year,month,day)
			// })()
			this.start1 = new Date(1900,0,1)
			this.end1 = this.getdate(date)
			this.start2 = this.getdate(date)
			this.end2 = new Date(2100,11,31)
			// this.end2 = (function(){
			// 	let year = new Date().getFullYear() + 10
			// 	let month = new Date().getMonth()
			// 	let day = new Date().getDate()
			// 	return new Date(year,month,day)
			// })()
			// this.licenseSdate = this.getdate(date)
			// this.licenseEdate = this.getdate(date)
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
		changeDate1 (date) {
			let date1 = this.getdate(date)
	    	this.licenseSdate = date1
		},
		changeDate2 (date) {
			let date1 = this.getdate(date)
	    	this.licenseEdate = date1
		},
		openPicker1 () {
			this.$refs.date1.open();
		},
		openPicker2 () {
			this.$refs.date2.open();
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
	        	if(_this.imgIds.indexOf(id) === -1){
	        		_this.imgIds.push(id)
	        	}
	        	_this.islrz = false
	        })
	        .catch(function (err) {
	        	Indicator.close();
	         	_this.islrz = false
	         	Toast('图片压缩失败！')
	        })
	    },
	    OpenSlots () {
			this.isOpenSlots = true
		},
		slotsChange (picker,value) {
			this.selaccountType = value[0].id
			this.selaccountVal = value[0].type
		},
		cancle () {
			this.isOpenSlots = false
		},
		confirm () {
			this.accountType = this.selaccountType
			this.accountVal = this.selaccountVal
			this.isOpenSlots = false
		},
		OpenSlots2 () {
			this.isOpenSlots2 = true
		},
		slotsChange2 (picker,value) {
			this.selbank = value[0].name
			this.selbankId = value[0].id
		},
		cancle2 () {
			this.isOpenSlots2 = false
		},
		confirm2 () {
			this.bank = this.selbank
			this.bankId = this.selbankId
			this.isOpenSlots2 = false
		},
		UpLoadIMG () {
			let _this = this
			let formData = new FormData()
			for (let i =0, j = this.imgIds.length; i<j; i++) {
				formData.append("imgStr", this.imgbase64[this.imgIds[i]])
			}
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/upload/pic_min',formData)
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.imgArray = res.data.urls
					_this.imgIds.forEach(function(item,index){
						_this.imgurl[item] = _this.imgArray[index]
						_this.imgbase64[item] = ''
					})
					_this.imgIds = []
					_this.addShopExpand()
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
		addShopExpand () {
			let _this = this;
			let formatdate = time => {
				let date = new Date(time)
				let month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1)
				return date.getFullYear() + '-' + month + '-' + date.getDate()
			}
			let mccNo = this.onlinePay1.classNo2 + '';
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/shop/addShopExpand',qs.stringify({
				shopsName: this.onlinePay1.shopsName,
				province: this.onlinePay1.provinceId,
				city: this.onlinePay1.cityId,
				district: this.onlinePay1.districtId,
				address: this.onlinePay1.shopsAddress,
				legalName: this.onlinePay2.legalName,
				legalId: this.onlinePay2.legalId,
				legalSdate: formatdate(this.onlinePay2.legalSdate),
				legalEdate: formatdate(this.onlinePay2.legalEdate),
				legalPhone: this.onlinePay2.legalPhone,
				licenseNo: this.licenseNo,
				licenseSdate: formatdate(this.licenseSdate),
				licenseEdate: formatdate(this.licenseEdate),
				mccNo: mccNo,
				accountType: this.accountType,
				bank: this.bankId,
				branch: this.branch,
				accountName: this.accountName,
				accountNo: this.account,

				legalFront: this.imgurl.legalFront,
				legalBack: this.imgurl.legalBack,
				licensePic: this.imgurl.licensePic,
				frontPic: this.imgurl.frontPic,
				counterPic: this.imgurl.counterPic,
				viewPic: this.imgurl.viewPic,
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					sessionStorage.removeItem('onlinePay')
					sessionStorage.removeItem('onlinePay2')
					_this.$router.push('/fillform/step4')
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
		submit () {
			let rule1 = /^[a-zA-Z0-9]+$/g
			let rule2 = /^[\u4E00-\u9FA5]+$/g
			if(this.submitbtn){
				return
			}
			if(!this.onlinePay1){
				MessageBox('提示','请完成基本信息填写！')
				return
			}
			if(!this.onlinePay2){
				MessageBox('提示','请完成法人信息填写！')
				return
			}
			if(!this.licenseNo){
				MessageBox('提示','营业执照编号不能为空！')
				return
			}
			if(!rule1.test(this.licenseNo)){
				MessageBox('提示','营业执照编号只能输入数字和英文！')
				return
			}
			if(!this.licenseSdate){
				MessageBox('提示','营业执照生效日期不能为空！')
				return
			}
			if(!this.licenseEdate){
				MessageBox('提示','营业执照过期日期不能为空！')
				return
			}
			if(this.licenseSdate.getTime() >= this.licenseEdate.getTime()){
				MessageBox('提示','“营业执照生效日期”必须小于 “营业执照过期日期”！')
				return
			}
			if(!this.imgurl.licensePic && !this.imgbase64.licensePic){
				MessageBox('提示','请上传营业执照照片！')
				return
			}
			if(!this.accountType){
				MessageBox('提示','账户类型不能为空！')
				return
			}
			if(!this.bankId){
				MessageBox('提示','开户行名称不能为空！')
				return
			}
			if(!this.branch){
				MessageBox('提示','支行名称不能为空！')
				return
			}
			if(!rule2.test(this.branch)){
				MessageBox('提示','支行名称只能输入中文！')
				return
			}
			if(!this.accountName){
				MessageBox('提示','银行户名不能为空！')
				return
			}
			if(this.$emoji(this.accountName)){
				MessageBox('提示','银行户名不能为表情图片！')
				return
			}
			if(!this.accountNo){
				MessageBox('提示','银行账号不能为空！')
				return
			}
			if(!this.imgurl.frontPic && !this.imgbase64.frontPic){
				MessageBox('提示','请上传整体门面照片！')
				return
			}
			if(!this.imgurl.counterPic && !this.imgbase64.counterPic){
				MessageBox('提示','请上传收银台照片！')
				return
			}
			if(!this.imgurl.viewPic && !this.imgbase64.viewPic){
				MessageBox('提示','请上传店内环境照片！')
				return
			}
			if(this.islrz){
				MessageBox('提示','图片压缩中，请稍后重试！')
				return
			}
			MessageBox({
				title:'提示',
				message:'确认提交以上资料？提交后若需修改请联系客服',
				showConfirmButton:true,
				showCancelButton:true,
				confirmButtonText:'确定',
				cancelButtonText:'取消',
			}).then(action =>{
				if(action === "confirm"){
					this.submitbtn = true
					if(this.imgIds.length === 0){
						this.addShopExpand()
					}else{
						this.UpLoadIMG()
					}
				}
			})
		},
		shopExpandStatus () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/shop/shopExpandStatus',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					if(res.data.data.status === '4'){
						_this.shopExpandDetail()
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
			axios.post('/exsd-web/shop/shopExpandDetail',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.licenseNo = res.data.data.licenseNo
					let Sdate = _this.getdate(new Date(res.data.data.licenseSdate))
					let endDate = _this.getdate(new Date(res.data.data.licenseEdate))
					let today = _this.getdate(new Date())
					_this.licenseSdate = Sdate.getTime() > today.getTime() ? today : Sdate
					_this.licenseEdate = endDate.getTime() < today.getTime() ? today : endDate
					_this.date1 = _this.licenseSdate
					_this.date2 = _this.licenseEdate
					_this.accountType = res.data.data.accountType
					_this.bankId = res.data.data.bank
					_this.branch = res.data.data.branch
					_this.accountName = res.data.data.accountName
					_this.accountNo = res.data.data.accountNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
					_this.imgurl.licensePic = res.data.data.licensePic
					_this.imgurl.frontPic = res.data.data.frontPic
					_this.imgurl.counterPic = res.data.data.counterPic
					_this.imgurl.viewPic = res.data.data.viewPic
					_this.slots[0].values.forEach(function(item,index){
						if(item.id === _this.accountType){
							_this.slots[0].defaultIndex = index
							_this.accountVal = item.type
						}
					}.bind(_this))
					_this.slots2[0].values.forEach(function(item,index){
						if(item.id === _this.bankId){
							_this.slots2[0].defaultIndex = index
							_this.bank = item.name
						}
					}.bind(_this))
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		formatcard (id) {
		 	let value = this[id]
		 	this[id] = value.replace(/[^0-9]|\s/g,'').replace(/(.{4})/g, "$1 ").replace(/(^\s*)|(\s*$)/g,'')
		},
		inputIdCard(value){
			this[value] = this[value].replace(/[^a-zA-Z0-9]|\s/g,'')
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^\u4E00-\u9FA5]|\s/g,'')
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
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;padding-bottom: 56px;position: fixed;font-size: 1.4rem;overflow-y: scroll;}
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

.form-wrap .form-item .upladImg-wrap {height: 64px;width: 64px;position: relative;overflow: hidden;margin-top: 10px;margin-left: 10px;}
.form-wrap .form-item .upladImg-wrap img{position: absolute;top: 0;left: 0;z-index: 2;width: 100%;height: 100%;border: none;}
.form-wrap .form-item .upladImg-wrap .upladImg{position: absolute;text-align: center;border:dotted 1px #d8d8d8;height: 64px;width: 64px;color: #aaafb6;padding-top: 12px;}
.form-wrap .form-item .upladImg-wrap .upladImg i.iconfont{font-size: 1.6rem;}
.form-wrap .form-item .upladImg-wrap .file-prew{height: 64px;width: 64px;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}
.ex-field .ex-field-wrapper .upladImg-wrap .again{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;}

.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}

.box-wrap{font-size: 1.2rem;color: #666;padding: 15px 0 0 15px;}
.box-wrap .title{font-size: 1.4rem;line-height: 30px;}
.box-wrap .text{padding: 3px 0;}

.picker-range{width: 100%;}
.range-slots{display: block;line-height: 40px;font-size: 1.6rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb;padding: 0 15px;}
.range-slots span{width: 25%;display: inline-block;text-align: center;}
.range-slots span.right{float: right;}
</style>

