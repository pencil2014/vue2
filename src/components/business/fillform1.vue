<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top-wrap">
			<div class="step">
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
				<input type="text" v-model="shopsName">
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
				<input type="text" v-model="shopsAddress">
			</div>
			<div class="form-item" @click="OpenRangeSlots">
				<span class="name">行业分类</span>
				<label for="" class="classify">
					{{classificationName}}
					<i class="iconfont" >&#xe606;</i>
				</label>
			</div>
		</div>
		<div class="save">
			<input type="button" value="下一步" @click="save">
		</div>
		<mt-popup
			v-model="isOpenRangeSlots"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots" @change="onRangeChange" :showToolbar="true">
				<slot>
					<div class="range-slots">
						<span class="left" @click="closeRangeSlots">取消</span>
						<span class="right" @click="selectRange">确认</span>
					</div>
				</slot>
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator, Picker } from 'mint-ui'
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
			
			shopsName: '',
			shopsAddress: '',

			isOpenRangeSlots: false,
			isConfirm: false,
			slots: [
				{
					values: [],
					textAlign: 'center',
					defaultIndex: 0
				}
			],
			classifyList: [],
			classificationName: '',
			selclassificationName: '',
			classificationId: ''
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
		isOpenRangeSlots (value) {
			if(!value && this.isConfirm){
				this.isConfirm = false
			}
		}
	},
	created () {
		let _this = this
		let onlinePay = JSON.parse(sessionStorage.getItem('onlinePay'))
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		})
		 axios.all([
		 	axios.post('getBaseRegionAll'),
        	axios.post('shop/examine'),
        	axios.post('shopClassification/list')
		 ]).then(axios.spread(function (area,shop,classify){
		 	Indicator.close()
		 	if(area.data.code === '10000' && shop.data.code === '10000' && classify.data.code === '10000'){
		 		_this.province.push(...area.data.data.province)
				_this.city.push(...area.data.data.city)
				_this.district.push(...area.data.data.district)

				_this.classifyList = classify.data.data || []
				if (_this.classifyList.length > 0) {
					_this.classifyList.forEach(function(item){
						_this.slots[0].values.push(item.name)
					})
				}
				if(!onlinePay){
					_this.provinceId = shop.data.data.province ? shop.data.data.province : _this.provinceId = _this.province[0].id
					_this.selcityId = shop.data.data.city
					_this.seldistrictId = shop.data.data.county
					_this.shopsAddress = shop.data.data.shopsAddress
					_this.shopsName = shop.data.data.shopsName
				}else{
					_this.provinceId = onlinePay.provinceId
					_this.selcityId = onlinePay.cityId
					_this.seldistrictId = onlinePay.districtId
					_this.shopsAddress = onlinePay.shopsAddress
					_this.shopsName = onlinePay.shopsName
					_this.classificationName = onlinePay.classificationName
					_this.slots[0].defaultIndex = _this.slots[0].values.indexOf(onlinePay.classificationName)
					_this.classificationId = onlinePay.classificationId
				}

		 	}else{
		 		Toast('请求数据失败！')
		 	}
		 })).catch(function(){
		 	Indicator.close()
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		OpenRangeSlots () {
			this.isOpenRangeSlots = true
		},
		onRangeChange (picker,value) {
			this.selclassificationName = value[0]
		},
		closeRangeSlots () {
			this.isOpenRangeSlots = false
		},
		selectRange () {
			this.isOpenRangeSlots = false
			this.isConfirm = true
			this.classificationName = this.selclassificationName
			let selectValue = this.classifyList.filter(function(item){
				return this.classificationName === item.name
			}.bind(this))
			this.classificationId = selectValue[0].id
		},
		save () {
			let obj = {
				shopsName: this.shopsName,
				provinceId: this.provinceId,
				cityId: this.cityId,
				districtId: this.districtId,
				shopsAddress: this.shopsAddress,
				classificationName: this.classificationName,
				classificationId: this.classificationId
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
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;height: 46px;line-height: 30px;padding: 8px 0;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item .name{width: 25%;float: left;}
.form-wrap .form-item input{width: 70%;border: none;}
.form-wrap .form-item label.classify{color: #aaafb6;float: right;margin-right: 15px;}
.select-content{display: table;width: 70%;}
.select-content select{display: table-cell;margin-right: 1%;height: 2rem;width: 25%;}
.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}

.picker-range{width: 100%;}
.range-slots{display: block;line-height: 40px;font-size: 1.6rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb;padding: 0 15px;}
.range-slots span{width: 25%;display: inline-block;text-align: center;}
.range-slots span.right{float: right;}
</style>

