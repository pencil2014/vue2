<template>
<div>
	<div class="ex-topbar">
		<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
		<span>下级商家收益</span>
	</div>
	<!-- <v-touch
		  v-on:swipeleft="swipeleft"
			v-on:swiperight="swipeleft"
		> -->
	<div class="ex-cnt">
		<mt-loadmore :top-method="loadTop" ref="loadmore">
			<table class="table">
				<tr>
					<th>报单终审时间</th>
					<th>商家名称</th>
					<th>商品名称</th>
					<th>获得e积分</th>
				</tr>
				<tbody
					v-show='dataList.length > 0'
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10"
				>
					<tr v-for="item in dataList">
						<td>{{item.createDate}}</td>
						<td>{{item.shopsName || '--'}}</td>
						<td>{{item.commodityName || '--'}}</td>
						<td>{{item.integralValue}}</td>
					</tr>
				</tbody>
			</table>
		</mt-loadmore>	
		<div class="nodata" v-show='dataList.length === 0 && nodateStatus'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
		</div>
	</div>
	<!-- </v-touch> -->
</div>		
</template>

<script>
import axios from "axios"
import qs from "qs"
import {  MessageBox, Loadmore, InfiniteScroll, Indicator, Toast} from 'mint-ui'
export default {
	data () {
		return {
			userId: '',
			time: '',
			dataList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		// swipeleft () {
		// 	this.$router.push('/index')
		// },
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('vipShops/integralDetail',qs.stringify({
				userId: this.userId,
				dateStr: this.time,
				pageSize: this.pageSize, 
				page: 1
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.dataList = res.data.data.list || []
					_this.page = 2
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('网络请求超时!')
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
			axios.post('vipShops/integralDetail',qs.stringify({
				userId: this.userId,
				dateStr: this.time,
				pageSize: this.pageSize, 
				page: this.page
			}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.dataList.push(...res.data.data.list)
					_this.page += 1
					_this.loading = false
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('网络请求超时!')
			})
		}
	},
	created () {
		this.userId = this.$route.params.userId
		this.time = this.$route.params.time
	}
}	
</script>

<style scoped>
.ex-topbar { position: fixed; top: 0; left: 0; height: 5rem; width: 100%; z-index: 2; }	
.ex-cnt {padding-top: 5rem;}
</style>