<template>
	<div class="ex-detail">
	 <div class="ex-detail-box">
		 	<!-- <div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>e积分明细</span>
			</div> -->
			<HeadTitle :title="modal" @callback="back"></HeadTitle>
			<div class="ex-detail-integral">
				<div class="ex-detail-integral-item">
					<span>e积分总额</span>
					<p>{{integralA | checknum}}</p>
				</div>
				<div class="ex-detail-integral-item">
					<span>激励e积分总额</span>
					<p>{{integralB | checknum}}</p>
				</div>
			</div>
	 </div>
	 <div class="ex-detail-hack"></div>
		<div class="ex-detail-cnt">
			<div class="ex-detail-cnt-table">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table">
					<tr>
						<th>结算日期</th>
						<th>卖家ID</th>
						<th>买家ID</th>
						<th>商品名称</th>
						<th>e积分</th>
						<th>激励e积分</th>
						<th>来源</th>
					</tr>
					<tbody 
					v-show='recordList.length > 0'
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
						<tr v-for="(item, index) in recordList">
							<td>{{ item.createTime | formatTime}}</td>
							<td>{{ item.sellerCode || '--'}}</td>
							<td>{{ item.buyersCode || '--' }}</td>
							<td>{{ item.shoppName || '--' }}</td>
							<td>{{ item.integralValue  | checknum}}</td>
							 <td>{{ item.integralValueE | checknum}}</td>
							<td>{{ item.integralSource  || '--'}}</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			</div>
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
import { MessageBox, Loadmore, InfiniteScroll ,Indicator, Toast} from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			recordList: [],
			integralB:0,
			integralA:0,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			modal: {
				text:'e积分明细',
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
			axios.post('/exsd-web/integralRecord/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList = res.data.data.data.list || []
					_this.integralA = res.data.data.integralA
					_this.integralB = res.data.data.integralB
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
			let _this = this
			this.loading = true
			axios.post('/exsd-web/integralRecord/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.data.totalPage
					_this.integralA = res.data.data.integralA
					_this.integralB = res.data.data.integralB
					_this.recordList.push(...res.data.data.data.list)
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
	filters: {
		formatTime (value) {
			let time = new Date(value * 1000)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			return [month,date].join('/')
		},
		checknum (value) {
			if(!value){
				return '0.00'
			}else{
				value += ''
				let num = '0.00'
				num = value >= 0 ? value : '0.00' 
				num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
				return num 
			}
		},
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
.ex-detail-box{width: 100%; z-index: 2;}
.ex-detail-integral {margin-top: 4.5rem; padding: 0.5rem 0;overflow: hidden; background-color: #fff;/*border-bottom: solid 1px #ebebeb;*/position: fixed; width: 100%;}
.ex-detail-integral span {color: #cde5ff;font-size: 1.6rem;color: rgb(142,184,225);}
.ex-detail-integral p{color: #fff;font-size: 2.4rem;  padding-top: 0.5rem;color: rgb(4,125,203)}
.ex-detail-integral-item { width: 50%; text-align: center; float: left; color: rgb(4,125,203)}
.ex-detail-cnt{position: fixed; top: 11rem; bottom: 0; overflow: auto;background-color: #f4f5f7;border-top: solid 1px #ebebeb;}
.ex-detail-cnt-table {width: 120%;background: #fff;}
.ex-detail-cnt .nodata { margin-left: -20%; }
.table tr:last-child {border-bottom: none;}
</style>