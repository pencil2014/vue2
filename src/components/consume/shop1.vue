<template>
	<div class="ex-shop1">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>商家申请</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
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
				<span>*商家名称</span><input type="text" name="" id="" placeholder="请输入商家名称" maxlength="30" v-model.trim='shopName'>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*联系地址</span>
				<select v-model="provinceId" @change='changeProvince("")'>
					<option v-for='item in province' :value='item.id' v-if='item.name'>{{item.name}}</option>
				</select>
				<select v-model="cityId" @change='changeCity("")'>
					<option v-for='item in cityArray' :value='item.id' v-if='item.name'>{{item.name}}</option>
				</select>
				<select v-model="districtId" v-if='districtArray.length > 0'>
					<option v-for='item in districtArray' :value='item.id' v-if='item.name'>{{item.name}}</option>
				</select>
			</div>
			<!-- <div class="ex-shop1-cnt-item">
				<span>*所属行业</span>
				<select v-model="classifyId" style="width:8rem" >
					<option v-for='item in classifyList' :value='item.id' >{{item.name}}</option>
				</select>
			</div> -->
			<div class="ex-shop1-cnt-item">
				<span>*详细地址</span><input type="text" name="" id="" placeholder="详细地址" maxlength="60" v-model.trim='addressDetail'>
			</div>
			<div class="ex-shop1-cnt-item">
				<span>*姓名</span><input type="text" name="" id="" placeholder="负责人姓名" maxlength="20" v-model.trim='shopsLinkman'>
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
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			province:'',
			city:'',
			district:'',
			provinceId: '',
			districtId: '',
			cityId: '',
			provinceId_err: '',
			districtId_err: '',
			cityId_err: '',
			cityArray: [],
			districtArray: [],
			shopName: '',
			addressDetail: '',
			shopsLinkman: '',
			shopsLinkphone: '',
			repeatBtn: false,
			modal:{
				text:'商家申请',
				fixed: false,
			},
			classifyList:[],
			classifyId: 1
		}
	},
	computed: {
		disableBtn () {
			let rule = (this.shopName && this.addressDetail && this.shopsLinkman && this.shopsLinkphone && this.provinceId) ? false : true
			let rule2 = /^1\d{10}$/.test(this.shopsLinkphone)
			return (rule || !rule2)
		},
		area () {
			if (this.districtArray.length > 0) {
				let area = this.district.filter(function(item){
					return item.id === this.districtId
				}.bind(this))
				if (area[0].name.indexOf('县')) {
					return ''
				} else {
					return area.id
				}
			} else {
				return ''
			}
			
		}
	},
	watch: {
		provinceId () {
			if (!this.city) {
				return
			}
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			this.cityId = this.cityId ? this.cityId : array[0].id
			this.cityArray = array
		},
		cityId () {
			if (!this.district) {
				return
			}
			let array = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			if (array.length > 0) {
				this.districtArray = array
				this.districtId = this.districtId ? this.districtId : array[0].id
			} else {
				this.districtArray = []
				this.districtId = ''
			}
			
		}
	},
	created () {
		let shopdata = window.localStorage.getItem('shopdata')
		let _this = this

		// 获取用户申请数据
		axios.post('/exsd-web/shop/examine',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.shopsLinkman = res.data.data.shopsLinkman
				_this.shopsLinkphone = res.data.data.shopsLinkphone
				_this.shopName = res.data.data.shopsName
				_this.addressDetail = res.data.data.shopsAddress
				_this.provinceId_err = res.data.data.province
			  _this.districtId_err = res.data.data.county
			  _this.cityId_err = res.data.data.city
			}
		})
		.catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})

		// 获取省市区数据
		axios.post('/exsd-web/getBaseRegionAll',qs.stringify({}))
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
				
				// 如果商家已申请，重新赋值省市区
				if (_this.provinceId_err) {
					_this.provinceId = _this.provinceId_err
					_this.cityId = _this.cityId_err
					_this.districtId = _this.districtId_err
				}
				

			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})

		// axios.post('/exsd-web/shopClassification/list',qs.stringify({})).then(function(res){
		// 		if (res.data.code === '10000') {
		// 			_this.classifyList = res.data.data|| []
		// 			if (_this.classifyList.length > 0) {
		// 				_this.classifyId = _this.classifyList[0].id
		// 			}

		// 		} else {
		// 			Toast(res.data.msg)
		// 		}
		// 	}).catch(function(){
		// 		_this.nodateStatus = true
		// 			Toast('连接失败，请检查网络是否正常!')
		// 	})





	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		changeProvince (Id) {
			if (!this.city) {
				return
			}
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			this.cityArray = array
			this.cityId = Id ? Id : array[0].id
			if (this.district.length > 0) {
				let array2 = this.district.filter(function(item) {
				return item.parentId === this.cityId
				}.bind(this))
				if (array2.length > 0) {
					this.districtArray = array2
					this.districtId = Id ? Id : array2[0].id
				} else {
					this.districtArray = []
					this.districtId = ''
				}
			} else {
					this.districtArray = []
					this.districtId = ''
			}
			
			
		},
		changeCity (Id) {
			if (this.district.length > 0) {
				let array2 = this.district.filter(function(item) {
				return item.parentId === this.cityId
				}.bind(this))
				if (array2.length > 0) {
					this.districtArray = array2
					this.districtId = Id ? Id : array2[0].id
				} else {
					this.districtArray = []
					this.districtId = ''
				}
			} else {
					this.districtArray = []
					this.districtId = ''
			}
		},

		next () {
			if (this.repeatBtn) {
				return
			}
			if (!this.shopName) {
				MessageBox('提示', '商家名称不能为空！')
				return
			}
			if (!this.provinceId) {
				MessageBox('提示', '联系地址未加载完成，请稍后！')
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
				area: this.area,
				classifyId: this.classifyId
			}
			window.localStorage.setItem('shopdata', JSON.stringify(shopdata))
			this.$router.push('/shop2')
		}
	},
	components: {
		HeadTitle,
	}
}	
</script>

<style scoped>
.ex-shop1{ position:absolute; width: 100%; min-height: 100%;}
.ex-shop-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;background-color: #f4f5f7;}
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
.ex-shop1-btn {margin: 0 2%; display: block; background-color: #047dcb; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-shop1-btn:active{background-color:#0470b6; }
</style> 