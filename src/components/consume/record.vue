<template>
	<div class="ex-record">
		<div class="ex-record-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>消费记录</span>
			</div>
		</div>
		<div class="ex-record-cnt" >
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table"
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
					<tr>
						<th>编号</th>
						<th>日期</th>
						<th>商品</th>
						<th>金额</th>
					</tr>
					<tbody v-show='recordList.length > 0'>
						<tr v-for="(item, index) in recordList">
							<td>{{index+1}}</td>
							<td>{{item.createTime | formatTime}}</td>
							<td>{{item.commodityName}}</td>
							<td>{{item.consumptionMoney}}</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='recordList.length === 0'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator } from 'mint-ui'
export default {
	data () {
		return {
			recordList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20
		}
	},
	created () {
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		loadTop () {
			let _this = this
			axios.post('declaration/ulist',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.recordList = res.data.data.list || []
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
			})
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			let _this = this
			this.loading = true
			axios.post('declaration/ulist',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.recordList.push(...res.data.data.list)
					_this.page += 1
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		}
	},
	filters: {
		formatTime (value) {
			let time = new Date(value * 1000)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			return [month,date].join('/')
		}
	}
}	
</script>
<style scoped>
.ex-record-box {position: fixed; top: 0; width: 100%; z-index: 2; }
.ex-record-cnt {padding-top: 5rem}
</style>