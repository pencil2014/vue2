<template>
	<div class="ex-detail">
	 <div class="ex-detail-box">
		 	<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont"> &#xe605; </i></a>
				<span>积分明细</span>
			</div>
			<div class="ex-detail-integral">
				<span>E积分总额</span>
				<p>{{integral || 0}}</p>
			</div>
	 </div>

		<div class="ex-detail-cnt">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table">
					<tr>
						<th width="15%">结算日期</th>
						<th width="15%">卖家ID</th>
						<th width="15%">卖家ID</th>
						<th width="20%">商品名称</th>
						<th width="20%">E积分</th>
						<th width="15%">来源</th>
					</tr>
					<tbody 
					v-show='recordList.length > 0'
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
						<tr v-for="(item, index) in recordList">
							<td>{{ item.createTime | formatTime}}</td>
							<td>{{ item.sellerCode }}</td>
							<td>{{ item.buyersCode }}</td>
							<td>{{ item.shoppName }}</td>
							<td>{{ item.integralValue }}</td>
							<td>{{ item.integralSource }}</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='recordList.length === 0 && nodateStatus'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator, Toast } from 'mint-ui'

export default {
	data () {
		return {
			recordList: [],
			integral: 0,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false
		}
	},
	created () {

	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('integralRecord/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.integral = res.data.data.integralA
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList = res.data.data.data.list || []
					_this.page = 2
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('系统错误！')
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
			axios.post('integralRecord/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.integral = res.data.data.integralA
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList.push(...res.data.data.data.list)
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
.ex-detail-box{ position: fixed; top: 0; width: 100%; z-index: 2;}
.ex-detail-integral {background-color: #2eadff; padding: 0.5rem 1.5rem;}
.ex-detail-integral span {color: #cde5ff;font-size: 1.4rem;}
.ex-detail-integral p{color: #fff;font-size: 2.8rem; padding-top: 0.5rem;}
.ex-detail-cnt { padding-top: 12rem; }
</style>