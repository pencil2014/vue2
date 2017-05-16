<template>
	<div class="ex-record">
		<!-- <div class="ex-record-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>资金明细</span>
			</div>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-record-cnt" >
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table"
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
					<tr>
						<th>日期</th>
						<th>来源</th>
						<th>金额</th>
						<th>结算日期</th>
					</tr>
					<tbody v-show='recordList.length > 0'>
						<tr v-for="(item, index) in recordList">
							<td>{{item.createTime | formatTime}}</td>
							<td>{{item.sourceType | source}}</td>
							<td>{{item.transactionMoney}}</td>
							<td>{{item.createTime | formatTime}}</td>
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
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			recordList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			modal: {
				text:'资金明细',
				fixed: true
			},
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
			axios.post('transactionRecord/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.recordList = res.data.data.list || []
					_this.page = 2
				} else {
					MessageBox('提示', '对不起数据加载失败！')
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
			let _this = this
			this.loading = true
			axios.post('transactionRecord/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.recordList.push(...res.data.data.list)
					_this.page += 1
					_this.loading = false
				} else {
					MessageBox('提示', '对不起数据加载失败！')
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('连接失败，请检查网络是否正常!')
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
		},
		source (value) {
			let array = ['充值', '享积分转换', '升级余额奖励', '余额转存提现', '升级VIP']
			return array[value - 1]
		}
	},
	components: {
		HeadTitle,
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>
<style scoped>
.ex-record-box {position: fixed; top: 0; width: 100%; z-index: 2; }
/*.ex-record-cnt {padding-top: 5rem}*/
.ex-record-cnt {padding-top: 4.5rem;}
</style>