<template>
	<div class="ex-detail">
	 <div class="ex-detail-box">
		 	<!-- <div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont"> &#xe605; </i></a>
				<span>积分明细</span>
			</div> -->
			<HeadTitle :title="modal" @callback="back"></HeadTitle>
			<div class="ex-detail-integral">
				<div class="ex-detail-integral-item">
					<span>e积分总额</span>
					<p>{{integral | checknum}}</p>
				</div>
				<div class="ex-detail-integral-item" @click="toMonthDetail">
					<div class="month-detail">
						<span>本月消费e积分总额</span>
						<p>{{integralC | checknum}}</p>
					</div>
					<i class="iconfont">&#xe606;</i>
				</div>
			</div>
	 </div>

		<div class="ex-detail-cnt">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table">
					<tr>
						<th width="15%">结算日期</th>
						<th width="15%">卖家ID</th>
						<th width="15%">买家ID</th>
						<th width="20%">商品名称</th>
						<th width="20%">e积分</th>
						<th width="15%">来源</th>
					</tr>
					<tbody 
					v-show='recordList.length > 0'
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
						<tr v-for="(item, index) in recordList">
							<td>{{ item.createTime | formatTime}}</td>
							<td>{{ item.sellerCode  || '--'}}</td>
							<td>{{ item.buyersCode  || '--'}}</td>
							<td>{{ item.shoppName  || '--'}}</td>
							<td>{{ item.integralValue  | checknum}}</td>
							<td>{{ item.integralSource  || '--'}}</td>
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
			integral: 0,
			integralC: 0,
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
		toMonthDetail () {
			this.$router.push('/monthdetail')
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
					_this.integral = res.data.data.integralA
					_this.integralC = res.data.data.integralC
					_this.totalPage = res.data.data.data.totalPage
					_this.recordList = res.data.data.data.list || []
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
			axios.post('/exsd-web/integralRecord/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.integral = res.data.data.integralA
					_this.integralC = res.data.data.integralC
					_this.totalPage = res.data.data.data.totalPage
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
.ex-detail-box{ width: 100%; z-index: 2;}
/*.ex-detail-integral {margin-top: 4.5rem; padding: 0.5rem 1.5rem; background-color: #fff;border-bottom: solid 1px #ebebeb; position: fixed; width: 100%;}
.ex-detail-integral span {color: #cde5ff;font-size: 1.6rem;color: rgb(142,184,225);}
.ex-detail-integral p{color: #fff;font-size: 2.8rem; padding-top: 0.5rem;color: rgb(4,125,203)}*/

.ex-detail-integral {margin-top: 4.5rem; padding: 0.5rem 0;overflow: hidden; background-color: #fff;border-bottom: solid 1px #ebebeb;position: fixed; width: 100%;display: table;}
.ex-detail-integral span {color: #cde5ff;font-size: 1.6rem;color: rgb(142,184,225);}
.ex-detail-integral p{color: #fff;font-size: 2.8rem; padding-top: 0.5rem;color: rgb(4,125,203);}
.ex-detail-integral .ex-detail-integral-item { width: 50%; text-align: center;color: rgb(4,125,203);display: table-cell;}
.ex-detail-integral .ex-detail-integral-item .month-detail{}
.ex-detail-integral .ex-detail-integral-item i.iconfont{position: absolute;top: 50%;display: block;font-size: 2rem;right: 0.5rem;margin-top: -0.5rem}
/*.ex-detail-cnt { padding-top: 12rem; }*/
.ex-detail-cnt{position: fixed; top: 11rem; bottom: 0; overflow: auto;background-color: #f4f5f7;}
.ex-detail-cnt .table{background: #fff;}
.table tr:last-child {border-bottom: none;}
</style>