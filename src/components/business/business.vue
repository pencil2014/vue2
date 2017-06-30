<template>
	<div class="ex-business">
		<div class="ex-header">
			<span class="logo">
				<img src="../../assets/images/logo.png" alt="">代理商系统
			</span>
			<a href="javascript:;" class="logout" @click='logout'>退出登录</a>
		</div>
		<v-touch
		  v-on:swipeleft="swipeleft"
			v-on:swiperight="swiperight"
		>

		<div class="ex-business-cnt">
			<div class="ex-business-title">
				<h3>我的收益</h3>
				<p>区域商家数：{{agentInfo.shopsNum}}</p>
			</div>
			
			<div class="ex-business-nav">
				<span :class="{active: activeclass ===1}" @click='switchTab(1)'>每日收益</span><span :class="{active: activeclass ===2}" @click='switchTab(2)'>已结算区间</span>
			</div>
			<div class="ex-business-box">
				<div class="ex-business-item" v-if='showTab === 1'>
					<div class="ex-business-item-cnt">
						<mt-loadmore :top-method="loadTop" ref="loadmore">
						<table class="table">
							<tr>
								<th>时间</th>
								<th>收益e积分</th>
								<th>状态</th>
							</tr>
							<tbody
								v-show='myIncome.length > 0'
								v-infinite-scroll="loadMore"
				  			infinite-scroll-disabled="loading"
				  			infinite-scroll-distance="10"
				  			infinite-scroll-immediate-check="false"
							>
								<tr v-for="item in myIncome">
									<td>{{item.showTime | formatTime}}</td>
									<td>{{item.integralValue}}</td>
									<td>{{item.status | status}}</td>
								</tr>
							</tbody>
						</table>
						</mt-loadmore>

						<div class="nodata" v-show='myIncome.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
					</div>
						
					
				</div>
				<div class="ex-business-item" v-if='showTab === 2'>
					<div class="ex-business-item-cnt">
					<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
						<tr>
							<th>操作时间</th>
							<th>结算区间</th>
							<th>结算e积分</th>
						</tr>
						<tbody 
							v-show='tlementInterval.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10"
			  			infinite-scroll-immediate-check="false"
						>
							<tr v-for="item in tlementInterval">
									<td>{{item.settlementTime | formatTime}}</td>
									<td>{{item.settlementInterval}}</td>
									<td>{{item.integralValue}}</td>
								</tr>
						</tbody>
					</table>
					</mt-loadmore>
					<div class="nodata" v-show='tlementInterval.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
					</div>
					
				</div>

			</div>
		</div>
		</v-touch>
		<navbar></navbar>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator, Toast } from 'mint-ui'
import navbar from '../common/business'
export default {
	data () {
		return {
			id: '',
			showTab: 1,
			activeclass: 1,
			myIncome: [],
			tlementInterval: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			agentInfo: {
				shopsNum: 0
			}
		}
	},
	components:{
		navbar
	},
	methods: {
		logout () {
			// window.localStorage.removeItem('id')
			this.$router.push('/login')
		},
		switchTab (value) {
			this.page = 1
			this.showTab = value
			this.activeclass = value
			window.localStorage.setItem('tab',value)
		},
		swipeleft () {
			if (this.showTab > 1) {
				this.switchTab(this.showTab - 1)
			} else {
				this.switchTab(2)
			}
		},
		swiperight () {
			if (this.showTab < 2) {
				this.switchTab(this.showTab + 1)
			} else {
				this.switchTab(1)
			}
		},
		queryAgentInfo () {
			let _this = this
			axios.post('gmanager/queryAgentInfo',qs.stringify({userId: this.id}))
			.then(function(res){ 
				if (res.data.code === '10000') {
					 _this.agentInfo = res.data.data
					 window.localStorage.setItem('agentInfo', JSON.stringify(res.data.data))
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('系统错误!')
			})
		},
		getMyIncome () {
			let _this = this
			Indicator.open({
			  text: '数据请求中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('gmanager/myIncome',qs.stringify({
				userId: this.id,
				page: this.page,
				pageSize: this.pageSize
			}))
			.then(function(res){ 
				_this.nodateStatus = true
				Indicator.close()
				if (res.data.code === '10000') {
					 _this.page = res.data.data.page
					 _this.totalPage = res.data.data.totalPage
					 _this.myIncome = res.data.data.list
					 _this.page += 1
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('系统错误!')
			})
		},
		getTlementInterval () {
			let _this = this
			Indicator.open({
			  text: '数据请求中...',
			  spinnerType: 'fading-circle'
			})
			this.loading = true
			axios.post('gmanager/settlementInterval',qs.stringify({
				userId: this.id,
				page: this.page,
				pageSize: this.pageSize
			}))
			.then(function(res){
				_this.loading = false
				_this.nodateStatus = true
				Indicator.close()
				if (res.data.code === '10000') {
					 _this.page = res.data.data.page
					 _this.totalPage = res.data.data.totalPage
					 _this.tlementInterval = res.data.data.list
					 _this.page += 1
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('系统错误!')
			})
		},

		loadTop () {
			this.page = 1
			if (this.showTab === 1) {
				this.getMyIncome()
			} else {
				this.getTlementInterval()
			}
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			if (this.showTab === 1) {
				this.getMyIncome()
			} else {
				this.getTlementInterval()
			}
		},
		
	},
	created () {
		this.id = window.localStorage.getItem('id')
		let tab = window.localStorage.getItem('tab')
		if (!!tab) {
			this.switchTab(tab*1)
		}
		this.getMyIncome()
		this.getTlementInterval()
		this.queryAgentInfo()
	},
	filters: {
		formatTime (value) {
			if (value) {
				return value.split(' ')[0]
			} else {
				return value
			}	
		},
		status (value) {
			return value=== '0' ? '未结算' : '已结算'
		}
	},
	destroyed () {
		Indicator.close()
	}

}	
</script>

<style scoped>
.ex-business{background-color: #fff;/* min-height: 100%;*/}
.ex-header {height: 5rem; background-color: #0470b6; color: #fff; position: fixed; top:0; left: 0; width: 100%;z-index: 2;  }
.ex-header .logo { display: block;height: 5rem; line-height: 5rem;  padding-left: 1rem; font-size: 2rem; float: left;}
.ex-header .logo img{ height: 3rem; vertical-align: middle; margin-right: 1rem; }
.ex-header .logout { float: right; height: 3rem; margin: 1rem; vertical-align: middle;background-color: #0d7ec7; color: #fff; border-radius: 0.4rem; padding: 0 1rem; line-height: 3rem; }
.ex-header .logout:active{background-color: #0c84d2;}
.ex-business-cnt {position: fixed; top: 5rem; bottom: 5rem; width: 100%; overflow: scroll;}
.ex-business-nav {height:4.5rem ; line-height: 4.5rem;}
.ex-business-nav span{ color: #000; display: inline-block; width: 50%; text-align: center; font-size: 1.6rem; border-bottom: 0.2rem solid #eee;}
.ex-business-nav span.active {color: #26a2ff; border-color: #26a2ff;}
.ex-business-box {margin: 1rem 0;}
.ex-business-item {background-color: #fff; padding:0 1rem;}
.ex-business-item-cnt{}
.ex-business-item .data {border:1px solid #eee; background-color: #eee; padding:0.5rem 1rem; font-size: 1.4rem; overflow: auto; }
.ex-business-item .data .num{ float: left;}
.ex-business-item .data .num span {display: block; line-height: 1.5}
.ex-business-item .data .num b{ color: #ffa132; }
.ex-business-item .data .btn { height: 3.5rem; border-radius: 0.4rem; background-color: #58c86b; color: #fff;  float: right; margin-top: 0.3rem; padding: 0 1.5rem;}
.ex-business-item .data .disabled{background-color: #ddd;}
.ex-business-item .table td a{color: #0470b6; border:1px solid #0470b6; padding: 0.5rem 2rem; border-radius: 0.4rem;display: inline-block; }
.ex-business-title{text-align: center; font-size: 1.4rem; padding: 1.5rem; border:1px solid #eee;}
.ex-business-title p{ padding-top: 1rem; color: #999; }
</style>