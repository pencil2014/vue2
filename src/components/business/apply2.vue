<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<div class="prompt">
				<p><strong>请按格式填写地址，以免影响门店搜索。</strong></p>
				<p>例1：道路+门牌号，“人民东路18号”</p>
				<p>例2：道路+门牌号+所在建筑+楼层，“南海大道207号欢</p>
			</div>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">行政区域</label>
					<div class="ex-select-content">
						<select v-model="provinceId" id="province">
							<option v-for="(item,index) in province" :value="item.id">{{item.name}}</option>
						</select>
						<select v-model="cityId" id="city" v-show="selcityList.length>0">
							<option v-for="(item,index) in selcityList" :value="item.id" v-if="item.name">{{item.name}}</option>
						</select>
						<select v-model="districtId" id="district" v-show="seldistrictList.length>0">
							<option v-for="(item,index) in seldistrictList" :value="item.id" v-if="item.name">{{item.name}}</option>
						</select>
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">详细地址</label>
					<div class="ex-field-value">
						<input type="text" v-model="shopsAddress" placeholder="请输入详细街道地址" @input="standard('shopsAddress')" maxlength="60">
					</div>
				</div>
			</div>
		</div>
		<baidu-map class="bm-view" ak="d6mxIkQnNeHgNzBQjBCZ9jdV1e49t2iF" :center="center" :zoom="15" :dragging="false" :pinch-to-zoom="false" :double-click-zoom="false" @ready="handler">
		    <!-- <bm-local-search v-show="false" :keyword="keyword" :auto-viewport="true"></bm-local-search> -->
		    <bm-marker :position="center" :dragging="false" :icon="icon"></bm-marker>
  		</baidu-map>
		<div class="ex-button">
			<button @click="submit" :class="{disable:disableBtn}">保存</button>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import {BaiduMap,BmMarker,BmLabel,BmLocalSearch} from 'vue-baidu-map'
import icon from '../../assets/images/maplogo.png'

export default {
	data(){
		return{
			modal: {
				text:'地址选择',
			},
			center: {lng: 116.404, lat: 39.915},
			province: [],
			city: [],
			district: [],
			provinceId: '',
			cityId: '',
			districtId: '',
			selcityList: [],
			seldistrictList: [],
			shopsAddress: '',
			applyAddress: '',
			icon: {
				url: icon,
				size: {width: 25, height: 25}
			},
			isReady: false,
		}
	},
	components: {
		HeadTitle,
		Btn,
		BaiduMap,
		BmMarker,
		BmLabel,
		BmLocalSearch
	},
	computed:{
		disableBtn () {
			if(!this.shopsAddress){
				return true
			}
			return false
		},
		provinceName () {
			let provinceName
			this.province.forEach(function(item){
				if(item.id === this.provinceId) {
					provinceName = item.name
				}
			}.bind(this))
			return provinceName
		},
		cityName () {
			let cityName
			this.selcityList.forEach(function(item){
				if(item.id === this.cityId) {
					cityName = item.name
				}
			}.bind(this))
			return cityName
		},
		countyName () {
			let countyName
			this.seldistrictList.forEach(function(item){
				if(item.id === this.districtId) {
					countyName = item.name
				}
			}.bind(this))
			return countyName
		},
		keyword () {
			if(this.provinceName === this.cityName){
				return this.provinceName + this.countyName + this.shopsAddress
			}
			return this.provinceName + this.cityName + this.countyName + this.shopsAddress
		}
	},
	watch: {
		keyword (value) {
			if(!this.isReady){
				return
			}
			this.getPoint()
		},
		provinceId () {
			let arr = this.city.filter(function(item){
				return item.parentId === this.provinceId
			}.bind(this))
			this.selcityList = arr
			if(!!this.applyAddress && !!this.applyAddress.cityId){
				this.cityId = this.applyAddress.cityId
				this.applyAddress.cityId = ''
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
				if(!!this.applyAddress && !!this.applyAddress.districtId){
					this.districtId = this.applyAddress.districtId
					this.applyAddress.districtId = ''
				}else{
					this.districtId = arr[0].id
				}
			}else{
				this.seldistrictList = []
				this.districtId === ''
				if(!!this.applyAddress &&　!!this.applyAddress.districtId){
					this.applyAddress.districtId = ''
				}
			}
		},
		isReady () {
			if(this.isReady === false){
				Indicator.open({
				  text: '地图加载中...',
				  spinnerType: 'fading-circle'
				});
			}else{
				Indicator.close()
			}
		} 
	},
	created () {
		this.getEnterShop()
	},
	methods: {
		handler () {
			this.isReady = true
		},
		getPoint () {
	  		let _this = this
	  		let myGeo = new BMap.Geocoder()
	  		myGeo.getPoint(this.keyword, function(point){
				if (point) {
					_this.center = point
				}
			})
	  	},
		back () {
			this.$router.back();
		},
		submit () {
			if(!this.shopsAddress){
				MessageBox('提示','请输入详细地址')
				return 
			}
			let obj = {};
			obj.provinceId = this.provinceId
			obj.cityId = this.cityId
			obj.districtId = this.districtId
			obj.provinceName = this.provinceName
			obj.cityName = this.cityName
			obj.countyName = this.countyName
			obj.shopsAddress = this.shopsAddress
			localStorage.setItem('applyAddress',JSON.stringify(obj))
			this.$router.push('/apply')
		},
		getArea (record) {
			let _this = this
			let applyAddress = _this.getdata('applyAddress')
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('getBaseRegionAll',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.province.push(...res.data.data.province)
					_this.city.push(...res.data.data.city)
					_this.district.push(...res.data.data.district)
					//有缓存取缓存
					if(!!applyAddress){
						_this.applyAddress = applyAddress
						_this.provinceId = _this.applyAddress.provinceId
						_this.shopsAddress = _this.applyAddress.shopsAddress
						return 
					}
					//审核失败取接口数据
					if(record.status === '2'){
						_this.applyAddress = {
							provinceId: record.province,
							cityId: record.city,
							districtId: record.county,
							provinceName: record.provinceName,
							cityName: record.cityName,
							countyName: record.countyName,
							shopsAddress: record.shopsAddress,
						}
						_this.provinceId = record.province
						_this.shopsAddress = record.shopsAddress
						return
					}
					//默认值
					_this.provinceId = _this.province[0].id
				} else {
					Toast('请求数据失败！')
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getEnterShop () {
			let _this = this;
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shop/enterDetail',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					let record = res.data.data
					_this.getArea(record)
				} else {
					Toast('获取申请信息失败！')
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},
		toapply2 () {
			this.$router.push('/apply2')
		},
		getdata (k) {
			let v = localStorage.getItem(k);
            try {
                v = JSON.parse(v);
            } catch(e) {

            }
            return v;
		},
	},
}
</script>
<style scoped>
.ex-apply{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-form{}
.ex-form p{line-height: 20px;word-wrap: break-word;padding: 10px 0 10px 10px;color: rgb(93,100,110);}
.ex-form .prompt{background: rgba(255, 255, 204, 1);margin: 15px;padding: 10px;}
.ex-form .prompt p {padding: 0;}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-bottom: 15px;}
.ex-field-wrapper{width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 20%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 75%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px;}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field-wrapper .ex-select-content{display: table;width: 75%;}
.ex-field-wrapper .ex-select-content select{display: table-cell;margin-right: 1%;height: 2rem;width: 25%;}

.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.ex-field .ex-field-wrapper i.arrow {float: right;padding-right: 15px;color: rgba(173,180,190,1);}
.bm-view {width: 100%;height: 300px;}

.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
.ex-button button.disable{background: #999 !important;}

.labelStyle{position: relative;}
</style>