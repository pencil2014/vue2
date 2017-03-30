<template>
	<div class="ex-detail">
	 <div class="ex-detail-box">
		 	<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>E积分明细</span>
			</div>
			<div class="ex-detail-integral">
				<div class="ex-detail-integral-item">
					<span>E积分总额</span>
					<p>{{integralA || 0}}</p>
				</div>
				<div class="ex-detail-integral-item">
					<span>激励E积分总额</span>
					<p>{{integralB || 0}}</p>
				</div>
			</div>
	 </div>
	 <div class="ex-detail-hack"></div>
		<div class="ex-detail-cnt">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table">
					<tr>
						<th>结算日期</th>
						<th>卖家ID</th>
						<th>卖家ID</th>
						<th>商品名称</th>
						<th>E积分</th>
						<th>激励E积分</th>
						<th>来源</th>
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
							 <td>{{ item.integralValueE}}</td>
							<td>{{ item.integralSource }}</td>
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
import { MessageBox, Loadmore, InfiniteScroll ,Indicator} from 'mint-ui'

export default {
	data () {
		return {
			recordList: [],
			integralB:0,
			integralA:0,
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
			axios.post('integralRecord/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList = res.data.data.data.list || []
				} else {
					MessageBox('提示', '对不起数据加载失败！')
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
			axios.post('integralRecord/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList.push(...res.data.data.data.list)
					_this.page += 1
				} else {
					MessageBox('提示', '对不起数据加载失败！')
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
.ex-detail-box{ position: fixed; top: 0; width: 100%; z-index: 2;}
.ex-detail-integral {background-color: #2eadff; padding: 0.5rem 1.5rem;overflow: hidden; }
.ex-detail-integral span {color: #cde5ff;font-size: 1.4rem;}
.ex-detail-integral p{color: #fff;font-size: 2.8rem; padding-top: 0.5rem;}
.ex-detail-integral-item { width: 50%; text-align: center; float: left; }
.ex-detail-cnt { padding-top: 12rem; width: 120%;}
.ex-detail-cnt .nodata { margin-left: -20%; }
</style>