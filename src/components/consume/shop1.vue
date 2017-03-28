<template>
	<div class="ex-shop1">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>商家申请</span>
		</div>
		<div class="ex-shop-progress">
			<p class="percent">
				<span></span>
			</p>
			<div class="ex-shop-progress-item active">
				<b>1</b>
				<span>商家信息</span>
			</div>
			<div class="ex-shop-progress-item secend">
				<b>2</b>
				<span>上传证照</span>
			</div>
			<div class="ex-shop-progress-item">
				<b>3</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-shop1-cnt">
			<div class="ex-shop1-cnt-item">
				<span>*商家名称</span><input type="text" name="" id="" placeholder="请输入商家名称" maxlength="15" v-model.trim='shopName'>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*联系地址</span>
				<select v-model="provinceId" @change='changeProvince'>
					<option v-for='item in province' :value='item.id'>{{item.name}}</option>
				</select>
				<select v-model="cityId" @change='changeCity'>
					<option v-for='item in cityArray' :value='item.id'>{{item.name}}</option>
				</select>
				<select v-model="districtId">
					<option v-for='item in districtArray' :value='item.id'>{{item.name}}</option>
				</select>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*详细地址</span><input type="text" name="" id="" placeholder="详细地址" maxlength="40" v-model.trim='addressDetail'>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*姓名</span><input type="text" name="" id="" placeholder="负责人姓名" maxlength="10" v-model.trim='shopsLinkman'>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*联系电话</span><input type="tel" name="" id="" placeholder="联系人手机" maxlength="11" v-model.trim='shopsLinkphone'>
			</div>
			<button type='button'  :class="[ 'ex-shop1-btn', {disableBtn:disableBtn}]" @click='next'>下一步</button>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator } from 'mint-ui'
export default {
	data () {
		return {
			province:'',
			city:'',
			district:'',
			provinceId: '',
			districtId: '',
			cityId: '',
			cityArray: [],
			districtArray: [],
			shopName: '',
			addressDetail: '',
			shopsLinkman: '',
			shopsLinkphone: '',
			repeatBtn: false
		}
	},
	computed: {
		disableBtn () {
			let rule = (this.shopName && this.addressDetail && this.shopsLinkman && this.shopsLinkphone) ? false : true
			let rule2 = /^1\d{10}$/.test(this.shopsLinkphone)
			return (rule || !rule2)
		},
		area () {
			let area = this.district.filter(function(item){
				return item.id === this.districtId
			}.bind(this))
			if (area[0].name.indexOf('县')) {
				return ''
			} else {
				return area.id
			}
		}
	},
	watch: {
		provinceId () {
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			this.cityId = this.cityId ? this.cityId : array[0].id
			this.cityArray = array
		},
		cityId () {
			let array = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			this.districtId = this.districtId ? this.districtId : array[0].id
			this.districtArray = array
		}
	},
	created () {
		let shopdata = window.localStorage.getItem('shopdata')
		let _this = this
		axios.post('getBaseRegionAll',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
					_this.province = res.data.data.province 
					_this.city = res.data.data.city
					_this.district = res.data.data.district
				if (!!shopdata) {
					shopdata = JSON.parse(shopdata)
					_this.provinceId = shopdata.provinceId
					_this.changeProvince(shopdata.cityId)
					_this.changeCity(shopdata.districtId)
					_this.shopName = shopdata.shopName,
					_this.addressDetail = shopdata.addressDetail,
					_this.shopsLinkman = shopdata.shopsLinkman,
					_this.shopsLinkphone = shopdata.shopsLinkphone
				} else {
					_this.provinceId = res.data.data.province[0].id
					_this.changeProvince()
					_this.changeCity()
				}
					
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			Indicator.open({ spinnerType: 'fading-circle'})
		})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		changeProvince (cityId) {
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			this.cityId = cityId ? cityId : array[0].id
			this.cityArray = array
		},
		changeCity (districtId) {
			let array = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			this.districtId = districtId ? districtId : array[0].id
			this.districtArray = array
		},
		next () {
			if (this.repeatBtn) {
				return
			}
			if (!this.shopName) {
				MessageBox('提示', '商家名称不能为空！')
				return
			}
			if (!this.addressDetail) {
				MessageBox('提示', '详细地址不能为空！')
				return
			}
			if (!this.shopsLinkman) {
				MessageBox('提示', '姓名不能为空！')
				return
			}
			if (!(/^1\d{10}$/.test(this.shopsLinkphone))) {
				MessageBox('提示', '联系电话不正确！')
				return
			}
			this.repeatBtn = true
			let shopdata = {
				provinceId: this.provinceId,
				districtId: this.districtId,
				cityId: this.cityId,
				shopName: this.shopName,
				addressDetail: this.addressDetail,
				shopsLinkman: this.shopsLinkman,
				shopsLinkphone: this.shopsLinkphone,
				area: this.area
			}
			window.localStorage.setItem('shopdata', JSON.stringify(shopdata))
			this.$router.push('/shop2')
		}
	}
}	
</script>

<style scoped>
.ex-shop1{background-color: #f4f5f7;}
.ex-shop-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-shop-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 5rem; right: 5.5rem;}
.ex-shop-progress-item { width: 33%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-shop-progress-item.secend {margin: 0;}
.ex-shop-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-shop-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}
.ex-shop1-cnt {background-color: #fff; font-size: 1.4rem;}
.ex-shop1-cnt-item { border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem; }
.ex-shop1-cnt-item span {display: inline-block; width: 25%; height: 3rem; line-height: 3rem;}
.ex-shop1-cnt-item input { height: 3rem;  width: 70%; border:none;}
.ex-shop1-cnt-item select { width: 20%; height: 2rem; margin-right: 1%;}
.ex-shop1-btn {margin: 0 2%; display: block; background-color: #62c1ff; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-shop1-btn:active{background-color:#58ace2; }
</style> 