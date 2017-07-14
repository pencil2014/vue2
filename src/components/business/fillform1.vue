<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top-wrap">
			<div class="step ">
				<dl class="one active">
					<dt>1</dt>
					<dd>基本信息</dd>
				</dl>
				<dl class="two">
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
				<span class="name">商家名称</span>
				<input type="text" v-model="shopsName" placeholder="请输入商家名称">
			</div>
			<div class="form-item">
				<span class="name">所在地区</span>
				<div class="select-content">
					<select v-model="provinceId">
						<option v-for="(item,index) in province" :value="item.id">{{item.name}}</option>
					</select>
					<select v-model="cityId" v-show="selcityList.length>0">
						<option v-for="(item,index) in selcityList" :value="item.id" v-if="item.name">{{item.name}}</option>
					</select>
					<select v-model="districtId" v-show="seldistrictList.length>0">
						<option v-for="(item,index) in seldistrictList" :value="item.id" v-if="item.name">{{item.name}}</option>
					</select>
				</div>
			</div>
			<div class="form-item">
				<span class="name">详细地址</span>
				<input type="text" v-model="shopsAddress" placeholder="请输入详细地址">
			</div>
			<div class="form-item">
				<span class="name">行业分类</span>
				<div class="select-content">
					<select v-model="classNo1">
						<option v-for="(item,index) in mccList1" :value="item.classNo">{{item.className}}</option>
					</select>
					<select v-model="classNo2" v-show="selmccList2.length>0">
						<option v-for="(item,index) in selmccList2" :value="item.classNo">{{item.className}}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="save">
			<input type="button" value="下一步" @click="save">
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator, Picker , Popup } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},
			province: [],
			city: [],
			district: [],
			selcityList: [],
			seldistrictList: [],

			provinceId: '',
			cityId: '',
			selcityId: '',
			districtId: '',
			seldistrictId: '',

			provinceName: '',
			cityName: '',
			districtName: '',
			
			shopsName: '',
			shopsAddress: '',

			mccList1: [],
			mccList2: [],
			selmccList2:[],
			classNo1: '',
			classNo2: '',
			selclassNo2: '',
			mccNo: '',
			onlinePay: '',
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
	watch: {
		provinceId () {
			//重置名称
			let province = this.province.filter(function(item){
				return item.id === this.provinceId
			}.bind(this))
			this.provinceName = province[0].name
			//重置城市列表
			let arr = this.city.filter(function(item){
				return item.parentId === this.provinceId
			}.bind(this))
			this.selcityList = arr
			if(this.selcityId){
				this.cityId = this.selcityId
				this.selcityId = ''
			}else{
				this.cityId = arr[0].id
			}
		},
		cityId () {
			//重置名称
			let city = this.city.filter(function(item){
				return item.id === this.cityId
			}.bind(this))
			this.cityName = city[0].name
			//重置地区列表
			let arr = this.district.filter(function(item){
				return item.parentId === this.cityId
			}.bind(this))
			if(arr.length > 0) {
				this.seldistrictList = arr
				if(this.seldistrictId){
					this.districtId = this.seldistrictId
					this.seldistrictId = ''
				}else{
					this.districtId = arr[0].id
				}
			}else{
				this.seldistrictList = []
				this.districtId = ''
			}
		},
		districtId () {
			//获取名称
			let district = this.district.filter(function(item){
				return item.id === this.districtId
			}.bind(this))
			this.districtName = district[0].name
		},
		classNo1 () {
			let arr = this.mccList2.filter(function(item){
				return item.parentNo === this.classNo1
			}.bind(this))
			if(arr.length > 0){
				this.selmccList2 = arr
				this.classNo2 = arr[0].classNo
			}else{
				this.selmccList2 = []
				this.classNo2 = ''
			}
		},
		classNo2 () {
			
		}
	},
	created () {
		this.onlinePay = JSON.parse(sessionStorage.getItem('onlinePay'))
		this.shopExpandStatus()
	},
	methods: {
		back () {
			MessageBox({
				title:'提示',
				message:'是否放弃本次操作?',
				showConfirmButton:true,
				showCancelButton:true,
				confirmButtonText:'确认',
				cancelButtonText:'取消',
			}).then(action =>{
				if(action === "confirm"){
					this.$router.back();
				}
			})
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
					_this.status = res.data.data.status
					_this.getBaseRegionAll()
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
					if(!_this.onlinePay){
						_this.shopsName = res.data.data.shopsName
						_this.provinceName = res.data.data.province
						_this.cityName = res.data.data.city
					
						let province = _this.province.filter(function(item){
							return item.name === _this.provinceName
						}.bind(_this))
						let city = _this.city.filter(function(item){
							return item.name === _this.cityName
						}.bind(_this))
						_this.provinceId = province[0].id
						_this.selcityId = city[0].id
						if(res.data.data.district){
							_this.districtName = res.data.data.district
							let district = _this.district.filter(function(item){
								return item.name === _this.districtName
							}.bind(_this))
							_this.seldistrictId = district[0].id
						}

						_this.shopsAddress = res.data.data.address
					}else{
						_this.getData()
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
		getData () {
			if(!this.onlinePay){
				this.provinceId = this.province[0].id
				this.classNo1 = this.mccList1[0].classNo
			}else{
				this.provinceId = this.onlinePay.provinceId
				this.selcityId = this.onlinePay.cityId
				this.seldistrictId = this.onlinePay.districtId
				this.shopsAddress = this.onlinePay.shopsAddress
				this.shopsName = this.onlinePay.shopsName
				this.classNo1 = this.onlinePay.classNo1
				this.selclassNo2 = this.onlinePay.classNo2
			}
		},
		getBaseRegionAll () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('getBaseRegionAll',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.province.push(...res.data.data.province)
					_this.city.push(...res.data.data.city)
					_this.district.push(...res.data.data.district)
					_this.initMcc()
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		initMcc () {
			let _this = this
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('shop/getAllMcc',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.mccList1.push(...res.data.data.parents)
					_this.mccList2.push(...res.data.data.childs)
					_this.classNo1 = _this.mccList1[0].classNo
					if(_this.status === '4'){
						_this.shopExpandDetail()
					}else{
						_this.getData()
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
		save () {
			if(!this.shopsName){
				MessageBox('提示','商家名称不能为空！')
				return
			}
			if(!this.shopsAddress){
				MessageBox('提示','详细地址不能为空！')
				return
			}
			if(!this.classNo2 && !this.classNo1){
				MessageBox('提示','行业分类不能为空！')
				return
			}
			let obj = {
				shopsName: this.shopsName,
				provinceId: this.provinceId,
				cityId: this.cityId,
				districtId: this.districtId,
				provinceName: this.provinceName,
				cityName: this.cityName,
				districtName: this.districtName,
				shopsAddress: this.shopsAddress,
				classNo1: this.classNo1,
				classNo2: this.classNo2,
			}
			sessionStorage.setItem('onlinePay',JSON.stringify(obj))
			this.$router.push('/fillform/step2')
		},
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
.step dl dt{width: 40px;height: 40px;border: solid 3px #e3e3e3;margin: 0 auto;border-radius: 50%;line-height: 34px;background: #e3e3e3;margin-top: -18px;}
.step dl.active dt{line-height: 34px;background: #37a936;color: #fff;}
.ex-fillform .step dl.active,.ex-fillform .step dl.finish{color: #37a936;}
.step dl.finish dt{width: 32px;height: 32px;margin-top: -14px;margin-bottom: 4px;color: #fff;background: #37a936;line-height: 26px;}
.step span{width: 100%;height: 4px;background: #e3e3e3;display: inline-block;position: absolute;top: 0;left: 0;}
.step span em{display: inline-block;height: 4px;position: absolute;z-index: 2;background: #37a936;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;height: 46px;line-height: 30px;padding: 8px 0;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item .name{width: 25%;float: left;}
.form-wrap .form-item input{width: 70%;border: none;}
.form-wrap .form-item label.classify{color: #aaafb6;float: right;margin-right: 15px;}
.select-content{display: table;width: 70%;}
.select-content select{display: table-cell;margin-right: 1%;height: 2rem;width: 25%;background: #fff;}
.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}

.picker-range{width: 100%;}
.range-slots{display: block;line-height: 40px;font-size: 1.6rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb;padding: 0 15px;}
.range-slots span{width: 25%;display: inline-block;text-align: center;}
.range-slots span.right{float: right;}
</style>

