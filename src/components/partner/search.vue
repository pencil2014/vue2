<template>
	<div class="ex-search">
		<div class="ex-search-top">
			<div class="ex-search-back" @click='back'>
				<i class="iconfont">&#xe605;</i>
			</div>
			<div class="ex-search-input">
				<i class="iconfont">&#xe67a;</i>
				<input type="search" name="" id="" placeholder="搜索关键字"  v-model.trim='keyword' @keypress.prevent='search'>
			</div>
		</div>
		
		<div class="ex-search-cnt">
			<div class="ex-search-history">
				<h3>历史搜索</h3>
				<ul>
					<li v-for='item in historyKey'>{{item}}</li>
				</ul>
			</div>
			<div class="ex-search-box" >
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul v-show='shoplist.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10"
		  			>
						<li v-for="(item, index) in shoplist" class="ex-search-item" @click='gotoinfo(item.id)'>
							<div class="img" v-if='item.facadePhoto'>
								<img :src="item.facadePhoto" alt="">
							</div>
							<div class="info">
								<h3 class='name'>{{item.shopsName}}</h3>
								<a href="javascript:;" class='classify' @click.stop='gotoclassify(item.classificationId)'>- {{item.classificationName}} -</a>
								<p class='phone'>{{item.shopsLinkphone}}</p>
								<p class='distance'>{{item.distance | formatdis}}</p>
							</div>
						</li>
					</ul>
			</mt-loadmore>
			<div class="nodata" v-show='shoplist.length === 0 && nodateStatus'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
			</div>
							
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import {Indicator, Toast} from 'mint-ui'
export default {
	data () {
		return {
			keyword: '',
			historyKey: ['旅游','美食','汽车','美女','电影','雅居园','城市','花园','银行','环保'],
			shoplist: [],
			loading: false,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		search () {
			if (!this.keyword) {
				return
			}
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('shopClassification/queryShopsById',qs.stringify({
				keywords: this.keyword,
				page: 1,
				pageSize: this.pageSize
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.shoplist = res.data.data.list || []
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('网络请求超时！')
			})


			let historyKey = JSON.parse(window.localStorage.getItem('historyKey'))
			let value = this.keyword 
			if (!!historyKey && historyKey.indexOf(value) === -1 ) {
				historyKey.unshift(value)
			} 
			if (!historyKey) {
				historyKey = [value]
			}
			if (historyKey.length > 10) {
				historyKey.pop()
			}
			window.localStorage.setItem('historyKey', JSON.stringify(historyKey))
		},
		gotoinfo(id) {
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
			axios.post('shopClassification/queryShopsById',qs.stringify({keywords: this.keyword, pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.shoplist = res.data.data.list || []
					_this.page = 2
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('网络请求超时！')
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
			axios.post('shopClassification/queryShopsById',qs.stringify({keywords: this.keyword, pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.loading = false
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.shoplist.push(...res.data.data.list)
					_this.page += 1
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('网络请求超时！')
			})
		}
	},
	created () {
		let historyKey = JSON.parse(window.localStorage.getItem('historyKey')) 
		if (!!historyKey) {
			this.historyKey = historyKey
		}
	},
	filters: {
		formatdis (value) {
			let val = value ? parseInt((value - 0)/1000,10) + 'KM' : ''
			return val
		}
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-search-top { height: 5.5rem; position: fixed; top: 0; left: 0; width: 100%;line-height: 5.5rem; border-bottom: 1px solid #eee; background-color: #fff;z-index: 3;}
.ex-search-back { width: 18%; float: left; height: 100%;  text-align: center; color: #047dcb;}
.ex-search-back i {font-size: 3rem;}
.ex-search-input { width: 82%; float: right; height: 4.5rem; position: relative;}
.ex-search-input i{ float: left;  position: absolute; left: 3%; top: 0.1rem; color: #999;}
.ex-search-input input { border:none; background-color: #eee; border-radius: 2rem; height: 3.5rem; width: 95%; padding-left: 12%; }
.ex-search-cnt {margin-top: 5.5rem;}
.ex-search-history { overflow: hidden; }
.ex-search-history h3{ background-color: #f2f2f2; height: 4rem; line-height: 4rem;  padding-left: 2rem;  font-weight: normal; color: #666;}
.ex-search-history ul { padding: 1rem 2rem; }
.ex-search-history ul li{ float: left; border: 1px solid #eee; padding: 1rem; margin: 0 1rem 1rem 0; font-size: 1.4rem;}

.ex-search-box {border-top: 1px solid #eee;}
.ex-search-item {overflow: hidden; padding:0 1rem 1rem 1.5rem; border-bottom: 1px solid #eee; margin-top: 1rem;}
.ex-search-item .img { width: 8rem; height: 8rem; float: left; background-color: #f2f2f2; border-radius: 1rem; overflow: hidden; line-height: 8rem;vertical-align: middle;}
.ex-search-item .img img{ width: 8rem; vertical-align: middle;}
.ex-search-item .info {margin-left: 10rem;font-size: 1.4rem;}
.ex-search-item .info .name {font-weight: normal; font-size: 1.6rem; padding: 0.5rem 0;}
.ex-search-item .info .classify{ color: #09537e; }
.ex-search-item .info .phone{color: #666; padding-top: 0.5rem;}
.ex-search-item .info .distance {color: #666; text-align: right; font-weight: 600; font-size: 1.2rem;}
</style>