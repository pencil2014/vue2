<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*商家通过“联盟商家入驻”申请，可获得参加商家推广板块资格</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">商家名称</label>
					<input type="text" placeholder="请输入商家名称" @input="standard('shopsEnterName')" v-model.trim="shopsEnterName" maxlength="15">
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系人姓名</label>
					<input type="text" placeholder="请输入联系人姓名" @input="standard('shopsLinkman')" v-model.trim="shopsLinkman" maxlength="15">
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系电话</label>
					<input type="tel" placeholder="请输入联系人手机号" @input="standardPhone('shopsLinkphone')" v-model.trim="shopsLinkphone" maxlength="11">
				</div>
				<div class="ex-field-wrapper" @click="openRangeSlots">
					<label class="ex-field-title">经营范围</label>
					<i class="iconfont arrow">&#xe606;</i>
					<span class="float_right">{{classifyName || '请选择'}}</span>
				</div>
			</div>
		</div>
		<div class="ex-field">
			<div class="ex-field-wrapper table" @click="toapply2">
				<span>商家地址</span>
				<span>{{applyAddress.provinceName}}{{applyAddress.cityName}}{{applyAddress.countyName}}<br>
				{{applyAddress.shopsAddress | ellipsis}}</span>
				<span><i class="iconfont arrow">&#xe606;</i></span>
			</div>
		</div>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<p>推广照片</p>
				<div class="uploadIMG">
					<div class="report-file" :class="{'noImg': !facadePhoto}">
						<span v-if="!facadePhoto" class="noIMG-wrap">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</span>
						<img src="../../assets/images/again.png" alt="" class="again" v-if="facadePhoto">
						<img :src="facadePhoto" alt="" v-if="facadePhoto">
						<input type="file" class="file-prew" id="facadePhoto" @change="getfile">
					</div>
				</div>
			</div>
		</div>
		<div class="ex-button">
			<button @click="submit" :class="{disable:disableBtn}">提交</button>
		</div>
		<!-- <mt-popup
			v-model="isOpenRangeSlots"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots" @change="onRangeChange">
				<slot>
					<div class="ex-range-slots">
						<span class="left" @click="closeRangeSlots">取消</span>
						<span class="right" @click="selectRange">确认</span>
					</div>
				</slot>
			</mt-picker>
		</mt-popup> -->
		<mt-popup
			v-model="isOpenRangeSlots"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots" @change="onRangeChange" :showToolbar="true" valueKey="name">
				<slot>
					<div class="range-slots">
						<span class="left" @click="cancle">取消</span>
						<span class="right" @click="confirm">确认</span>
					</div>
				</slot>
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , MessageBox , Indicator , Picker , Popup} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import lrz from 'lrz'
export default {
	data(){
		return{
			modal: {
				text:'商家推广入驻',
			},
			slots: [
				{
					values: [],
					textAlign: 'center',
					defaultIndex: 0
				}
			],
			isOpenRangeSlots: false,
			selclassificationId: '',
			selclassifyName: '',
			classificationId: '',
			classifyName: '',

			applyAddress: '',
			shopsEnterName: '',
			shopsLinkman: '',
			shopsLinkphone: '',
			facadePhoto: '',
			imgbase64: '',
			isSubmit: false
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disableBtn () {
			let rule1 = !this.shopsEnterName || !this.shopsLinkman || !this.shopsLinkphone || !this.checkPhone(this.shopsLinkphone) || !this.applyAddress || !this.facadePhoto
			return (rule1 ? true : false)
		},
	},
	watch: {
		isOpenRangeSlots (value) {
			
		} 
	},
	created () {
		this.getClassList();
	},
	methods: {
		back () {
			this.$router.back();
		},
		toapply2 () {
			let obj = {
				shopsEnterName: this.shopsEnterName,
				shopsLinkman: this.shopsLinkman,
				shopsLinkphone: this.shopsLinkphone,
				facadePhoto: this.facadePhoto,
				imgbase64: this.imgbase64,
				classificationId: this.classificationId
			}
			sessionStorage.setItem('applyData',JSON.stringify(obj))
			this.$router.push('/apply2')
		},
		cancle () {
			this.isOpenRangeSlots = false
		},
		confirm () {
			this.classificationId = this.selclassificationId
			this.classifyName = this.selclassifyName
			this.isOpenRangeSlots = false
		},
		openRangeSlots () {
			this.isOpenRangeSlots = true
		},
		onRangeChange (picker,value) {
			if(value[0] === undefined || !value[0]){
				return
			}
			this.selclassificationId = value[0].id
			this.selclassifyName = value[0].name
		},
		getfile () {
			let _this = this
			Indicator.open({
			  text: '图片压缩中...',
			  spinnerType: 'fading-circle'
			})
			this.islrz = true
			let img = document.getElementById('facadePhoto').files[0]
			if (img) {
				lrz(img,{width:640})
				.then(function (rst) {
					Indicator.close()
					_this.facadePhoto = rst.base64
			        _this.imgbase64 = rst.base64
			        _this.islrz = false
			    })
	       		.catch(function (err) {
	       			Indicator.close()
	       			_this.islrz = false
	      			Toast('图片压缩失败')
	       		})  
			}
		},
		submit () {
			if(this.isSubmit){
				return
			}
			if(!this.shopsEnterName){
				MessageBox('提示','商家名称不能为空！')
				return
			}
			if(!this.shopsLinkman){
				MessageBox('提示','联系人不能为空！')
				return
			}
			if(!this.shopsLinkphone){
				MessageBox('提示','联系电话不能为空！')
				return
			}
			if(!this.checkPhone(this.shopsLinkphone)){
				MessageBox('提示','请输入正确的联系电话！')
				return
			}
			if(!this.classificationId){
				MessageBox('提示','请选择经营范围！')
				return
			}
			if(!this.applyAddress){
				MessageBox('提示','请填写商家地址！')
				return
			}
			if(!this.facadePhoto){
				MessageBox('提示','请上传店铺门头照片！')
				return
			}
			this.isSubmit = true
			if(!this.imgbase64){
				this.shopEnter();
			}else{
				this.upload();
			}
		},
		upload () {
			let _this = this;
			let formData = new FormData()
			formData.append('imgStr',_this.imgbase64)
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('upload/pic_min',formData)
			.then(function(res){
				if (res.data.code === '10000') {
					_this.facadePhoto = res.data.urls[0]
					_this.imgbase64 = ''
					_this.shopEnter()
				} else {
					_this.isSubmit = false
					Indicator.close()
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				_this.isSubmit = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		shopEnter () {
			let _this = this;
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shop/enter',qs.stringify({
				shopsEnterName: _this.shopsEnterName,
				shopsLinkman: _this.shopsLinkman,
				shopsLinkphone: _this.shopsLinkphone,
				classificationId: _this.classificationId,
				province: _this.applyAddress.provinceId,
				city: _this.applyAddress.cityId,
				county: _this.applyAddress.districtId,
				shopsAddress: _this.applyAddress.shopsAddress,
				facadePhoto: _this.facadePhoto
			})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					localStorage.removeItem('applyData' )
					localStorage.removeItem('shopsAddress')
					MessageBox('提示','提交成功！').then(action => {
						_this.$router.push('/apply3');
					})
				} else {
					_this.isSubmit = false
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.isSubmit = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getEnterShop () {
			let _this = this;
			let applyData = JSON.parse(sessionStorage.getItem('applyData'))
			let applyAddress = JSON.parse(sessionStorage.getItem('applyAddress'))
			if(!!applyData){
				this.facadePhoto = applyData.facadePhoto 
				this.imgbase64 = applyData.imgbase64
				this.shopsEnterName = applyData.shopsEnterName
				this.shopsLinkman = applyData.shopsLinkman
				this.shopsLinkphone = applyData.shopsLinkphone
				this.classificationId = applyData.classificationId
			}
			this.applyAddress = applyAddress ? applyAddress : ''
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});	
			axios.post('shop/enterDetail',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					if(res.data.data.status === '2' && !_this.applyAddress){
						_this.applyAddress = {
							provinceName: res.data.data.provinceName,
							cityName: res.data.data.cityName,
							countyName: res.data.data.countyName,
							provinceId: res.data.data.province,
							cityId: res.data.data.city,
							districtId: res.data.data.county,
							shopsAddress: res.data.data.shopsAddress
						}
					}
					if(res.data.data.status === '2' && !applyData){
						_this.shopsEnterName = res.data.data.shopsEnterName
						_this.shopsLinkman = res.data.data.shopsLinkman
						_this.shopsLinkphone = res.data.data.shopsLinkphone
						_this.facadePhoto = res.data.data.facadePhoto
						_this.classificationId = res.data.data.classificationId
					}
					_this.slots[0].values.forEach(function(item,index){
						if(item.id === _this.classificationId){
							_this.slots[0].defaultIndex = index
							_this.classifyName = item.name
						}
					}.bind(_this))
				} else {
					Toast('获取申请信息失败！')
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getClassList () {
			let _this = this;
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shopClassification/list',qs.stringify({})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.slots[0].values.push(...res.data.data)
					_this.getEnterShop();
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},	
		standardPhone(value) {
			this[value] = this[value].replace(/[^0-9]|\s/g,'')
		},
		checkPhone (value){
			return (/1\d{10}/.test(value) ? true : false)
		},
		cut (str,repeatStr) {
			let index = str.indexOf(repeatStr)
			return str.slice(0,index)
		}
	},
	filters: {
		ellipsis (value) {
			if(!value){
				return
			}
			if(value.length >= 15){
				return value.slice(0,14) + '...'
			}
			return value
		} 
	}
}
</script>
<style scoped>
.ex-apply{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-apply .picker-range{position: fixed;bottom: 0;width: 100%;}
.ex-apply .ex-range-slots{height: 100%;width: 100%;border-bottom: solid 1px #d6d6d6;line-height: 40px;padding: 0 15px;box-sizing: border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;font-size: 1.6rem;color: #047dcb;}
.ex-apply .ex-range-slots .left{float: left;}
.ex-apply .ex-range-slots .right{float: right;}
.ex-apply .ex-range-slots span{display: inline-block;width: 80px;text-align: center;}
.ex-apply .ex-range-slots span:active{background: #ebebeb;}

.ex-form{}
.ex-form p{line-height: 20px;word-wrap: break-word;padding: 10px 0 10px 10px;color: rgb(93,100,110);}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-bottom: 15px;}
.ex-field-wrapper{width: 100%;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;min-height: 30px;line-height: 30px;}
.ex-field-wrapper .ex-field-title{display: inline-block;width: 20%;font-size: 1.4rem;}
.ex-field-wrapper input{width: 70%;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;height: 30px;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px;}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.ex-field .ex-field-wrapper i.arrow {float: right;padding-right: 15px;color: rgba(173,180,190,1);}
.float_right{float: right;color: #aaafb6;}

.ex-field .ex-field-wrapper.table{display: table;width: 100%;}
.ex-field .ex-field-wrapper.table span{display: table-cell;vertical-align: top;}
.ex-field .ex-field-wrapper.table span:nth-child(1){width: 20%;}
.ex-field .ex-field-wrapper.table span:nth-child(2){text-align: right;color: #aaafb6;line-height: 25px;}
.ex-field .ex-field-wrapper.table span:nth-child(3){vertical-align: middle;width: 31px;}

.ex-field .ex-field-wrapper .uploadIMG {display: block;width: 64px;height: 64px;position: relative;}
.ex-field .ex-field-wrapper .uploadIMG img{width: 100%;height: 100%;}
.ex-field .ex-field-wrapper .uploadIMG .again{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;}
.ex-field .ex-field-wrapper .uploadIMG input{position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;z-index: 3;opacity: 0;filter:Alpha(opacity=0)}


.ex-field .ex-field-wrapper .uploadIMG .noImg.report-file{border: dotted 1px #d8d8d8; }
.ex-field .ex-field-wrapper .uploadIMG .report-file{position: relative;width: 64px;height: 64px;}
.ex-field .ex-field-wrapper .uploadIMG .report-file .noIMG-wrap{position: absolute;top: 0px;color: #aaafb6;font-size: 1.2rem;line-height: 20px;margin-top: 12px;text-align: center;width: 100%;height: 100%;}
.ex-field .ex-field-wrapper .uploadIMG .report-file .noIMG-wrap i.iconfont {font-size: 1.6rem;}

.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
.ex-button button.disable{background: #999 !important;}

.picker-range{width: 100%;}
.range-slots{display: block;line-height: 40px;font-size: 1.6rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb;padding: 0 15px;}
.range-slots span{width: 25%;display: inline-block;text-align: center;}
.range-slots span.right{float: right;}
</style>