<template>
	<div class="ex-shop-info">
		<div class="ex-shop-info-banner">
			<span class='back' @click='goback'><i class="iconfont">&#xe605;</i></span>
			<img :src="shopinfo.facadePhoto" alt="">
			<h3>{{shopinfo.shopsName}}</h3>
		</div>
		<div class="ex-shop-info-addr">
			<p><i class="iconfont">&#xe634;</i><span>{{shopinfo.shopsAddress}}</span></p>
			<p><i class="iconfont">&#xe6ed;</i> <a :href="'tel:'+shopinfo.shopsLinkphone">{{shopinfo.shopsLinkphone}}</a></p>
		</div>
		<div class="ex-shop-info-goods">
			<div class="ex-shop-info-title">
					<span></span>
					<h3>商品信息</h3>
			</div>
			<div class="ex-shop-info-cnt">
				<div class="ex-shop-info-classify">
					<ul>
						<li v-for='(item,index) in shopinfo.commodityGroupEntitylist' :class='{active: item.id === groupId}' @click='changegroup(item.id)'> {{item.groupName}}</li>
					</ul>
				</div>
				<div class="ex-shop-info-list">
					<mt-loadmore  ref="loadmore"> <!-- :top-method="loadTop" -->
						<ul
							v-show='list.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10" 
			  			infinite-scroll-immediate-check="false"
						>
							<li class="ex-shop-item"  v-for='item in list' @click='showpic(item)'>
								<div class="img">
									<img :src="item.commodityAffixEntityList[0].filePath" alt="">
								</div>
								<div class="info">
									<h3 class='name'>{{item.shopsName}}</h3>
									<p class='price'>- ￥{{item.price}} -</p>
								</div>
							</li>
						</ul>
					</mt-loadmore>
					<!-- <ul>
						<li class="ex-shop-item"  v-for='item in list'>
							<div class="img" v-if='item.photo'>
								<img :src="item.photo" alt="">
							</div>
							<div class="info">
								<h3 class='name'>{{item.name}}</h3>
								<p class='price'>- {{item.price}} -</p>
							</div>
						</li>
					</ul> -->

					<div class="nodata" v-show='list.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
				</div>
			</div>

		</div>
		<div class="showpicbox" v-show='showpicitem.show' @click='hideshowpicbox'>
			<div class="showpicbox-cnt">
				<mt-swipe :auto="0" >
				  <mt-swipe-item v-for='item in showpicitem.data.commodityAffixEntityList' :key='item.id'>
				  	<img :src="item.filePath" alt=""  @click.stop=''>
				  </mt-swipe-item>
				</mt-swipe>
				<p class="info"><span class="title">{{showpicitem.data.shopsName}}</span><span class="price">￥{{showpicitem.data.price}}</span></p>
			</div>
			
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import {Loadmore, InfiniteScroll, Indicator, Toast, Swipe, SwipeItem  } from 'mint-ui'
export default {
	data () {
		return {
			shopinfo: {
				id: 28,
				shopsName: '',
				facadePhoto: '',
				shopsAddress: '',
				summary: '',
				shopsLinkphone: '',
				shopsLinkman: '',
				commodityGroupEntitylist:[]
			},
			list: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			groupId:'',
			showpicitem: {
				show: false,
				data: ''
			}
		}
	},
	methods: {
		goback () {
			this.$router.go(-1)
		},
		changegroup(id) {
			this.groupId = id
			this.loadTop()
		},
		showpic (item) {
			this.showpicitem.data = item
			this.showpicitem.show = true
		},
		hideshowpicbox () {
			this.showpicitem.show = false
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('commodityInfo/list',qs.stringify({pageSize: this.pageSize, page: 1,
				status: '3', 
				shopsId: this.id,
				groupId: this.groupId}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.list = res.data.data.list || []
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
			axios.post('commodityInfo/list',qs.stringify({pageSize: this.pageSize, page: this.page,
				status: '3',
				shopsId: this.id,
				groupId: this.groupId}))
			.then(function(res){
				Indicator.close()
				
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.list.push(...res.data.data.list)
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
		}
	},
	created () {
		let _this = this
		this.id = this.$route.params.id
		axios.post('shop/detail',qs.stringify({id: this.id}))
		.then(function(res){
			if (res.data.code === '10000') {
				if (!!res.data.data) {
					_this.shopinfo = res.data.data
					if (res.data.data.commodityGroupEntitylist) {
						// if (res.data.data.commodityGroupEntitylist[0].id === 0) {
						// 	res.data.data.commodityGroupEntitylist.splice(0, 1)
						// }
						_this.groupId = res.data.data.commodityGroupEntitylist[0].id
					} else {
						_this.shopinfo.commodityGroupEntitylist = [
								{
				          "id": '',
				          "shopId": null,
				          "groupName": "未分组",
				          "status": "0",
				          "createUser": null,
				          "createTime": null,
				          "updateUser": null,
				          "updateTime": null,
				          "sort": 1
				        }
								]
					}
					_this.loadMore()
				}		
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-shop-info{background-color: #efefef;}
.ex-shop-info-banner { height: 20rem; position: relative; overflow: hidden; background-color: #fff;}
.ex-shop-info-banner img{ height: 20rem; width: 100%; }
.ex-shop-info-banner h3{ position: absolute; bottom: 0; left: 0 ;width: 100%;background-color: rgba(0,0,0,0.4); height: 5rem;  line-height: 5rem; padding-left: 2rem; color: #fff; font-size: 2rem; font-weight: normal;}
.ex-shop-info-banner .back {position: absolute; top: 1rem; left: 1rem; display: inline-block; background-color: rgba(0,0,0,0.3); color: #fff; width: 5rem; height: 5rem; line-height: 5rem; text-align: center; border-radius: 0.4rem;}
.ex-shop-info-banner .back i{font-size: 3rem;}
.ex-shop-info-addr{background-color: #fff;}
.ex-shop-info-addr p{ padding: 1.5rem 1rem; border-bottom: 1px solid #eee; font-size: 1.4rem; }
.ex-shop-info-addr p i{font-size: 2rem; margin-right: 0.5rem;}
.ex-shop-info-addr a{color: #000;}

.ex-shop-info-title {text-align: center; border-bottom: 1px solid #eee;background-color: #fff; margin-top: 1rem; position: relative;}
.ex-shop-info-title h3 {font-size: 1.6rem; line-height: 5rem; position: relative; background-color: #fff; display: inline-block; padding: 0 1rem;}
.ex-shop-info-title span{display: block; width: 40%;  left: 30%; height: 1px; background-color: #ddd; position: absolute; top: 2.5rem; }

.ex-shop-info-cnt { background-color: #fff; border-top:1px solid #fff; overflow: hidden; min-height: 20rem; margin-top: -1px;}
.ex-shop-info-classify { width: 20%; float: left; background-color: #f5f5f5; height: 100%;  border-right: 1px solid #e4e1e1; padding-bottom: 1000rem; margin-bottom: -1000rem;}
.ex-shop-info-classify li { padding: 1.5rem 0; text-align: center; border-bottom: 1px solid #e4e1e1; overflow: hidden;}
.ex-shop-info-classify li.active{background-color: #fff; border-right:none; margin-right: -1px;}
.ex-shop-info-list { margin-left: 25%; }
.ex-shop-item {overflow: hidden; padding:0 1rem 1rem 0; border-bottom: 1px solid #eee; margin-top: 1rem; background-color: #fff;}
.ex-shop-item .img { width: 7rem; height: 7rem; float: left; background-color: #f2f2f2; border-radius: 1rem; overflow: hidden; line-height: 7rem;vertical-align: middle;}
.ex-shop-item .img img{ width: 7rem; vertical-align: middle;}
.ex-shop-item .info {margin-left: 8rem;font-size: 1.4rem;}
.ex-shop-item .info .name {font-weight: normal; font-size: 1.4rem; padding: 0.5rem 0;}
.ex-shop-item .info .price{ color: #ec5909; }
.ex-shop-item .info .phone{color: #666; padding-top: 0.5rem;}

.ex-shop-nodata {background-color: #fff;}



.showpicbox {position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); width: 100%; height: 100%; z-index: 3;}
.showpicbox-cnt { width: 85%; height: 80%;  margin: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.showpicbox-cnt .mint-swipe-items-wrap { position: relative; }
.showpicbox-cnt img { height: 80%; width: 100%; }
.showpicbox-cnt .info {position: absolute; top:80%; background-color: #fff; width: 100%; padding: 1.5rem 0; font-size: 1.4rem; line-height: 1; margin-top: -0.3rem; border-top: 1px solid #eee;}
.showpicbox-cnt .info .title { display: block; width: 64%; padding: 0 2%; overflow: hidden; float: left;}
.showpicbox-cnt .info .price { display: block; width: 30%; overflow: hidden; color:#ec5909; text-align: center; float: right;}
</style>