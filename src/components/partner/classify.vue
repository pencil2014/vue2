<template>
	<div class="ex-shop-classify">
	<div class="ex-shop-classify-top">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<span class='search' @click='gotosearch'><i class="iconfont">&#xe67a;</i></span>
	</div>
	<div class="ex-shop-classify-cnt" >
		<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul 
						v-show='shoplist.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10"
					>
						<li v-for="(item, index) in shoplist" class="ex-shop-classify-item" @click='gotoinfo(item.id)'>
							<div class="img" v-if='item.facadePhoto'>
								<img :src="item.facadePhoto" alt="">
							</div>
							<div class="info">
								<h3 class='name'>{{item.shopsName}}</h3>
								<a href="javascript:;" class='classify'>- {{item.classificationId}} -</a>
								<p class='phone'>{{item.shopsLinkphone}}</p>
								<p class='distance'>{{item.distance | formatdis}}</p>
							</div>
						</li>
					</ul>
				</mt-loadmore>
	</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import {Loadmore, InfiniteScroll, Indicator, Toast, Swipe, SwipeItem  } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			id: '',
			modal: {
				text:'餐饮美食',
				fixed: true
			},
			shoplist: [],
		}
	},
	components: {
		HeadTitle,
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gotosearch () {
			this.$router.push('/search')
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('shopClassification/queryShopsById',qs.stringify({pageSize: this.pageSize, page: 1,classificationId: this.id}))
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
			axios.post('shopClassification/queryShopsById',qs.stringify({classificationId:this.id, pageSize: this.pageSize, page: this.page}))
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
		this.id = this.$route.params.id
	},
	filters: {
		formatdis (value) {
			let val = parseInt((value - 0)/1000,10) + 'KM'
			return val
		}
	}
}	
</script>

<style scoped>
.ex-shop-classify-top { position: relative;  height: 4.5rem;}
.ex-shop-classify-top .search { position: absolute; right: 1.5rem; top: 1.2rem;  z-index: 99999;}
.ex-shop-classify-top .search i{font-size: 2rem;}

.ex-shop-classify-item {overflow: hidden; padding:0 1rem 1rem 1.5rem; border-bottom: 1px solid #eee; margin-top: 1rem;}
.ex-shop-classify-item .img { width: 8rem; height: 8rem; float: left; background-color: #f2f2f2; border-radius: 1rem; overflow: hidden; line-height: 8rem;vertical-align: middle;}
.ex-shop-classify-item .img img{ width: 8rem; vertical-align: middle;}
.ex-shop-classify-item .info {margin-left: 10rem;font-size: 1.4rem;}
.ex-shop-classify-item .info .name {font-weight: normal; font-size: 1.6rem; padding: 0.5rem 0;}
.ex-shop-classify-item .info .classify{ color: #09537e; }
.ex-shop-classify-item .info .phone{color: #666; padding-top: 0.5rem;}
.ex-shop-classify-item .info .distance {color: #666; text-align: right; font-weight: 600;font-size: 1.2rem;}	

</style>