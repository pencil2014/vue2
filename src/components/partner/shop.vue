<template>
	<div class="ex-shop" ref="wrapper">
		<div class="ex-topsearch" @click='gotosearch' v-show='showsearch'>
			<i class="iconfont">&#xe67a;</i>
			<input type="search" name="" id="" placeholder="搜索关键字"  v-model='keyword'>
		</div>
		<div class="ex-shop-head">
			<div class="ex-shop-head-banner" @click='goshop'>
				<mt-swipe :auto="5000">
				  <!-- <mt-swipe-item v-for='item in imgurl'>{{item}}</mt-swipe-item> -->
				  <mt-swipe-item><img src="../../assets/images/banner2.png" alt=""></mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="ex-shop-top">
				<div class="ex-shop-address" @click="gocity">
					<i class="iconfont icon1">&#xe634;</i>
					<span>{{address}}</span>
					<i class="iconfont icon2">&#xe60d;</i>
					<!-- <i class="iconfont icon2">&#xe60e;</i> -->
				</div>
				<div class="ex-shop-search" @click='gotosearch'>
					<i class="iconfont">&#xe67a;</i>
					<input type="search" name="" id="" placeholder="搜索关键字"  v-model='keyword'>
					<!-- @keypress.prevent='search' -->
				</div>
			</div>
		</div>
		<div class="ex-shop-menu">
			
			<li><router-link to="/classify/1">
				<img src="../../assets/images/shop1.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
			<li><router-link to="/classify/2">
				<img src="../../assets/images/shop2.png" alt="">
				<span>娱乐休闲</span>
			</router-link></li>
			<li ><router-link to="/classify/3">
				<img src="../../assets/images/shop3.png" alt="">
				<span>酒店住宿</span>
			</router-link></li>
			<li><router-link to="/classify/8">
				<img src="../../assets/images/shop4.png" alt="">
				<span>房产物业</span>
			</router-link></li>
			<li><router-link to="/classify/9">
				<img src="../../assets/images/shop5.png" alt="">
				<span>汽车服务</span>
			</router-link></li>
			<li><router-link to="/classify/11">
				<img src="../../assets/images/shop6.png" alt="">
				<span>零售批发</span>
			</router-link></li>
			<li><router-link to="/classify/4">
				<img src="../../assets/images/shop7.png" alt="">
				<span>办公家具</span>
			</router-link></li>
			<li><router-link to="/category">
				<img src="../../assets/images/shop8.png" alt="">
				<span>全部</span>
			</router-link></li>
		</div>
		<div class="ex-shop-localshop">
			<div class="ex-shop-localshop-title">
					<span></span>
					<h3>附近的商家</h3>		
			</div>
			<div class="ex-shop-localshop-cnt">
				<!-- <li class="ex-shop-localshop-item" @click='gotoinfo(25)'>
					<div class="img" >
								<img src="../../assets/images/loreList.png" alt="">
							</div>
						<div class="info">
								<h3 class='name'>商家名称</h3>
								<a href="javascript:;"  class='classify'>- 餐饮 -</a>
								<p class='phone'>15019435241</p>
								<p class='distance'>100KM</p>
							</div>	
				</li> -->
				<mt-loadmore  ref="loadmore" > <!-- :top-method="loadTop" -->
					<ul 
						v-show='localshop.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10"
		  			infinite-scroll-immediate-check="false"
					>
						<li v-for="(item, index) in localshop" class="ex-shop-localshop-item" @click='gotoinfo(item.id)'>
							<div class="img" v-if='item.facadePhoto'>
								<img :src="item.facadePhoto" alt="">
							</div>
							<div class="info">
								<h3 class='name'>{{item.shopsName}}</h3>
								<a href="javascript:;" class='classify' @click='gotoclassify(item.classificationId)'>- {{item.classificationName}} -</a>
								<p class='phone'>{{item.shopsLinkphone}}</p>
								<p class='distance' v-show='item.distance/1000 <= 15 && item.distance !=="0"'>{{item.distance | formatdis}}</p>
							</div>
						</li>
					</ul>
				</mt-loadmore>
				<div class="nodata" v-show='localshop.length === 0 && nodateStatus'>
					<img src="../../assets/images/nodata.png" alt="">
					<p>附近还没有商家哦~</p>
				</div>
			</div>
		</div>
		<app-nav></app-nav>

	</div>
</template>

<script>

import axios from "axios"
import qs from "qs"
import {MessageBox, Loadmore, InfiniteScroll, Indicator, Toast, Swipe, SwipeItem  } from 'mint-ui'
import appNav from "../common/tabbar.vue"
export default {
	data(){
		return {
			imgurl: [,,],
			address : '定位中', // 
			localshop: [],
			loading: false,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			keyword: '',
			currentPosition: {
				latitude: '', // 39.915
				longitude: '' // 116.404
			},
			id: 2,
			showsearch: false
		}
	},
	components: {
		appNav
	},
	methods: {
		goshop () {
			this.$router.push('/orderlist')
		},
		gotosearch () {
			this.$router.push('/search')
		},
		getposition () {
			let _this = this 
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
						function (pos) {
							_this.currentPosition.latitude = pos.coords.latitude
							_this.currentPosition.longitude = pos.coords.longitude
							let currentPosition = {
								latitude: pos.coords.latitude,
								longitude: pos.coords.longitude
							}
							window.localStorage.setItem('currentPosition',JSON.stringify(currentPosition))
							_this.getcityid()
						}
					)
			} else {
				this.getcityid()
			}
		},
		getcityid () {
			let _this = this
			if (!this.currentPosition.latitude) {
				this.address = '定位失败'
				this.currentPosition.latitude = '39.915'
				this.currentPosition.longitude = '116.404'
			}
			axios.post('/exsd-web/getAddressByLngAndLat',qs.stringify({
				lat: this.currentPosition.latitude ,
				lng: this.currentPosition.longitude 
			}))
			.then(function(res){
				if (res.data.code === '10000') {
					if (res.data.data) {
						_this.id = res.data.data.regionId
						_this.address =res.data.data.regionName
						window.localStorage.setItem('address', res.data.data.regionName)
						window.localStorage.setItem('regionId', res.data.data.regionId)
					}
					_this.loadMore()
					
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		gocity () {
			this.$router.push('/city')
		},
		gotoinfo (id) {
			this.$router.push({name:'Shopinfo',params:{id: id}})
		},
		gotoclassify(id) {
			this.$router.push({name:'Classify',params:{id: id}})
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('/exsd-web/shop/queryNearShop',qs.stringify({
				city:this.id, 
				lat: this.currentPosition.latitude,
				lng: this.currentPosition.longitude, 
				pageSize: this.pageSize, 
				page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage || 1
					_this.localshop = res.data.data.list || []
					_this.page = 2
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			this.loading = true
			let _this = this
			axios.post('/exsd-web/shop/queryNearShop',qs.stringify({city:this.id, lat: this.currentPosition.latitude,
				lng: this.currentPosition.longitude, pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage || 1
					if (!!res.data.data.list) {
						_this.localshop.push(...res.data.data.list)
					}
					_this.page += 1
					_this.loading = false
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getTop () {
			this.showsearch = this.$refs.wrapper.scrollTop > 50
		}
	},
	created () {
		// this.id = JSON.parse(window.localStorage.getItem('userinfo')).userId
		let address = JSON.parse(window.localStorage.getItem('historycity'))
		let currentPosition = window.localStorage.getItem('currentPosition')
		let address2 = window.localStorage.getItem('address')
		if(!!address) {
			this.address = address[0].regionName
			this.id = address[0].regionId
			window.localStorage.setItem('regionId',address[0].regionId)
			if (currentPosition) {
				this.currentPosition = JSON.parse(currentPosition)
			} 
			this.loadMore()
		} else if (!!address2) {
			this.address = window.localStorage.getItem('address')
			this.id = window.localStorage.getItem('regionId')
			this.loadMore()
		}
		 else {
			this.getposition()
		}
		
	},
	mounted () {
		this.$refs.wrapper.addEventListener('scroll', this.getTop)
	},
	filters: {
		formatdis (value) {
			let val = value ? (value/1000).toFixed(2) + 'KM' : ''
			return val
		}
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-shop{background-color: #efefef;padding-bottom: 5rem;height: 100%;overflow: auto;}
.ex-shop-head{ height:16rem; position: relative; }
.ex-shop-head-banner { height: 100%;background-color: #fff; text-align: center;}
.ex-shop-head-banner img{ height: 100%; width: 100%;}
.ex-shop-top { position: absolute; top: 1rem; width: 100%; overflow: hidden;}
.ex-shop-address {background-color: rgba(0,0,0,0.6); color: #fff; float: left; height: 3rem; line-height: 3rem; border-radius: 2rem; width: 28%; margin: 0 2%; position: relative; overflow: hidden; text-align: center;}
.ex-shop-address i {position: absolute;}
.ex-shop-address .icon1 { left: 0.5rem; font-size: 2rem}
.ex-shop-address .icon2 { right: 0.5rem; top: 0.3rem; font-size: 2.5rem;}
.ex-shop-address span {font-size: 1.4rem; width: 50%; white-space:  nowrap; text-overflow: ellipsis; overflow: hidden; display: inline-block;}
.ex-shop-search { float: right; width: 64%;  margin-right: 2%; position: relative; color: #999;}
.ex-shop-search input{ width: 100%; height: 3rem;  border: none; border-radius: 1.5rem; padding-left: 12%; }
.ex-shop-search i{ position: absolute; left: 0.6rem; top: 0.8rem; }

.ex-shop-menu { overflow: hidden; padding: 1rem 0; background-color: #fff;}
.ex-shop-menu li { width: 25%; float: left; list-style: none; text-align: center;}
.ex-shop-menu li img{ width: 4rem; margin-bottom: 0.5rem; }
.ex-shop-menu li a{ display: block; padding: 1.5rem;}
.ex-shop-menu li a:active{background-color: #eee;}
.ex-shop-menu li a span {color: #000; display: block;}

.ex-shop-localshop{ margin-top: 1rem;background-color: #fff; position: relative;}
.ex-shop-localshop-title {text-align: center; border-bottom: 1px solid #eee; }
.ex-shop-localshop-title h3 {font-size: 1.6rem; line-height: 5rem; position: relative; z-index: 2; background-color: #fff; display: inline-block; padding: 0 1rem;}
.ex-shop-localshop-title span{display: inline-block; width: 40%;  left: 30%; height: 1px; background-color: #ddd; position: absolute; top: 2.5rem;}


.ex-shop-localshop-cnt { position:relative; }
.ex-shop-localshop-item {overflow: hidden; padding:0 1rem 1rem 1.5rem; border-bottom: 1px solid #eee; margin-top: 1rem;}
.ex-shop-localshop-item .img { width: 8rem; height: 8rem; float: left; background-color: #f2f2f2; border-radius: 1rem; overflow: hidden; line-height: 8rem;vertical-align: middle;}
.ex-shop-localshop-item .img img{ width: 8rem; vertical-align: middle;}
.ex-shop-localshop-item .info {margin-left: 10rem;font-size: 1.4rem;}
.ex-shop-localshop-item .info .name {font-weight: normal; font-size: 1.6rem; padding: 0.5rem 0;}
.ex-shop-localshop-item .info .classify{ color: #09537e; }
.ex-shop-localshop-item .info .phone{color: #666; padding-top: 0.5rem;}
.ex-shop-localshop-item .info .distance {color: #666; text-align: right; font-weight: 600; font-size: 1.2rem;}
.ex-topsearch { position: fixed; top: 0; width: 100%; background-color: #fff;  z-index: 3;}
.ex-topsearch input { width: 90%; height: 3rem; margin: 0.8rem 5%; background-color: #eee; border: none; border-radius: 2rem; padding-left: 10%;}
.ex-topsearch i{ position: absolute; left: 8%; top: 1.7rem;  color: #999;}
</style>