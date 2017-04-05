<template>
	<div class="ex-partner">
		<div class="ex-partner-header">
			<p class="city"  @click="showcity">
				<span v-if='countyname && cityname !=="全省"'>{{countyname}}</span>
				<span v-else-if= 'cityname  && provincename !=="全国"'>{{cityname}}</span>
				<span v-else>{{provincename}}</span>
				<i class="iconfont" v-show='!showsub'>&#xe60d;</i>
				<i class="iconfont" v-show='showsub'>&#xe60e;</i>
			</p>
			<h3 class="title">联盟商家</h3>
		</div>
		<div class="ex-city-box" v-show='showsub'>
			<div class="ex-province" v-show='province.length > 0'>
				<ul>
					<li v-for='item in province' @click='changeProvince(item.id,item.name)' :class="{active: item.id === provinceId}">{{item.name}}</li>
				</ul>
			</div>
			<div class="ex-city"  v-show='cityArray.length > 0 && provincename !=="全国"'>
				<ul>
					<li v-for='item in cityArray'  @click='changeCity(item.id,item.name)' :class="{active: item.id === cityId}">{{item.name}}</li>
				</ul>
			</div>
			<div class="ex-county" v-show='districtArray.length > 0 && provincename !=="全国"'>
				<ul >
					<li v-for='item in districtArray'  @click='changeCounty(item.id,item.name)' :class="{active: item.id === districtId}">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="ex-partner-cnt" @click='hidecity'>
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<ul
					v-show='dataList.length > 0'
					v-infinite-scroll="loadMore"
	  				infinite-scroll-disabled="loading"
	  				infinite-scroll-distance="10"
				>
					<li v-for='item in dataList' @click="toDetail(item.id)">
						<p class="img"><img :src="item.facadePhoto" alt=""></p>
						<div class="info">
							<h3>{{ item.shopsName | substr}}</h3>
							<p>{{ item.shopsAddress | substr}}</p>
						</div>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<div class="nodata" v-show='dataList.length === 0  && nodateStatus'>
			<img src="../../assets/images/nodata.png" alt="">
			<p>还没有数据哦~</p>
		</div>
		<app-nav></app-nav>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import appNav from "../common/tabbar.vue"
export default {
	data () {
		return {
			showsub: false,
			dataList: [],
			province: [],
			city: [],
			district: [],
			cityArray: [],
			districtArray: [],
			provinceId: '',
			districtId: '',
			cityId: '',
			page: 1,
			totalPage: 1,
			pageSize: 20,
			countyname: '',
			cityname: '',
			provincename: '',
			nodateStatus: false
		}
	},
	created () {
		let _this = this
		axios.post('getBaseRegionAll',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
					_this.province = res.data.data.province 
					_this.city = res.data.data.city
					_this.district = res.data.data.district 
					_this.province.unshift({id: 0, name: "全国", parentId: 0})
					_this.city.unshift({id: 0, name: "全省", parentId: 0})
					_this.district.unshift({id: 0, name: "全城", parentId: 0})
					let id = res.data.data.province[0].id
					let name = res.data.data.province[0].name
					_this.changeProvince(id,name)
			} else {
				MessageBox('提示', res.data.msg)
			}
		})
		.catch(function(){
			Toast('系统错误！')
		})
	},
	watch: {
		provinceId () {
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			if (array.length > 0) {
				this.cityId = array[0].id
				this.cityArray = array
			} else {
				this.cityId = ''
				this.cityArray = []
			}
			
		},
		cityId () {
			let array = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			if (array.length > 0) {
				this.districtArray = array
				this.districtId = array[0].id
			} else {
				this.districtArray = []
				this.districtId = ''
			}
			
		}
	},
	methods: {
		toDetail (id) {
			this.$router.push({ name: 'Partner2', params: { id: id}})
		},
		showcity () {
			this.showsub = !this.showsub
		},
		hidecity () {
			this.showsub = false
		},
		changeProvince (id,name) {
			this.provinceId = id
			this.provincename = name
			let array = this.city.filter(function(item) {
				return item.parentId === this.provinceId
			}.bind(this))
			this.cityArray = array
			this.cityId = array[0].id
			this.cityname = array[0].name

			let array2 = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			this.districtArray = array2
			this.districtId = array2[0].id
			this.countyname = array2[0].name
		},
		changeCity (id,name) {
			this.cityId = id
			this.cityname = name
			let array = this.district.filter(function(item) {
				return item.parentId === this.cityId
			}.bind(this))
			this.districtArray = array
			if (array.length > 0) {
				this.districtId = array[0].id
				this.countyname = array[0].name
			} else {
				this.districtId = ''
				this.countyname = ''
				this.showsub = false
				this.getdata()
			}
			
			
		},
		changeCounty (id,name) {
			this.districtId = id
			this.countyname = name
			this.showsub = false
			this.getdata()
		},
		getdata () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('shop/list',qs.stringify({
				pageSize: this.pageSize, 
				page: 1,
				province: this.provinceId,
				city: this.cityId,
				county: this.districtId
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.dataList = res.data.data.list || []
					_this.page = 2;
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('系统错误！')
			})
		},
		loadTop () {
			this.getdata()
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			let _this = this
			this.loading = true
			axios.post('shop/list',qs.stringify({
				pageSize: this.pageSize, 
				page: this.page,
				province: this.provinceId,
				city: this.cityId,
				county: this.districtId
			}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.dataList.push(...res.data.data.list)
					_this.page += 1
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('系统错误！')
			})
		}
	},
	components: {
		appNav
	},
	filters: {
		substr (value) {
			value = value.toString()
			if (value.length > 40) {
				return value.slice(0,40) + '...'
			} else {
				return value
			}
		}
	}
}	
</script>

<style scoped>
.ex-partner-header { height: 5rem; border-bottom: 1px solid #eee; line-height: 5rem; overflow: hidden; position: fixed; width: 100%; top: 0; z-index: 2; background-color: #fff;}	
.ex-partner-header .city {font-size: 1.6rem; padding-left: 1rem;  float: left; position: absolute; left: 0 ;top: 0; height: 5rem; width: 9rem; color: #2f91d8;}
.ex-partner-header .city i{font-size: 2rem; vertical-align: middle;}
.ex-partner-header .title {font-size: 2rem;  font-weight: normal; text-align: center;}
.ex-city-box { height: 30rem; overflow: hidden; position: absolute; top: 5rem; left:0; width: 100%; z-index: 2;}
.ex-province,.ex-city,.ex-county{ width: 33.3%; float: left; height: 100%; overflow: scroll;}
.ex-province {background-color: #e5e5e5;}
.ex-city {background-color: #f2f2f2;}
.ex-county{background-color: #fff;}
.ex-city-box li{ padding: 1rem; border-bottom: 1px solid #ddd; text-align: center;}
.ex-city-box li.active { color: #2f91d8; border-color: #2f91d8;}
.ex-partner-cnt { margin-top: 5rem; padding: 0 1rem;}
.ex-partner-cnt li { border-bottom: 1px solid #eee; padding: 1rem 0.5rem; overflow: hidden;}
.ex-partner-cnt li .img{float: left; margin-right: 1rem; width: 6rem;}
.ex-partner-cnt li .img img{ width: 6rem; height: 6rem; border-radius: 0.4rem; }
.ex-partner-cnt li .info { margin-left: 6rem; }
.ex-partner-cnt li .info h3{font-weight: normal; font-size: 1.6rem; padding: 0.5rem 0;}
.ex-partner-cnt li .info p{ color: #aaafb6; }
</style>