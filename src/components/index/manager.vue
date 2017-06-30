<template>
	<div class="ex-index">
		<div class="ex-header">
			<span class="logo">
				<img src="../../assets/images/logo.png" alt="">权限管理系统
			</span>
			<a href="javascript:;" class="logout" @click='logout'>退出登录</a>
		</div>
		<!-- <v-touch
		  v-on:swipeleft="swipeleft"
		> -->
		<div class="ex-index-cnt">
			<div class="ex-index-title">
				<h3>下级管理员收益</h3>
			</div>
			<div class="ex-data">
			<div class="ex-data-cnt">
				<p>当前管理员ID：<b>{{userCode}}</b></p>
				<p>下级管理员数：<b>{{childrenCount}}</b></p>
				<p v-show='showTab===1'>下级管理员未结算e积分总额：<b>{{sumIntegral}}</b></p>
				<p v-show='showTab===2'>下级管理员结算成功e积分总额：<b>{{sumIntegral}}</b></p>
			</div>
				
			</div>
			<div class="ex-manager-tips" v-show='showTab===1'>
				*列表数据为每日每个下级权限管理员可贡献的e积分，实际到账以下级管理员实际结算情况为准。
			</div>

			<div class="ex-index-nav">
				<span :class="{active: showTab ===1}" @click='switchTab(1)'>未结算</span><span :class="{active: showTab ===2}" @click='switchTab(2)'>结算成功</span>
			</div>

			<div class="ex-cnt">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
						<tr>
							<th>收益时间</th>
							<th>下级管理员ID</th>
							<th>可收益e积分</th>
							<th v-show='showTab ===2'>结算时间</th>
						</tr>
						<tbody
							v-show='dataList.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10"
						>
							<tr v-for="item in dataList">
								<td>{{item.daily | formatTime}}</td>
								<td>{{item.userCode}}</td>
								<td>{{(item.integral/transRate*rate).toFixed(2) }}</td>
								<td v-show='showTab ===2'>{{item.settleDate | formatTime}}</td>
							</tr>
						</tbody>
					</table>
				</mt-loadmore>	
				<div class="nodata" v-show='dataList.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
				</div>
			</div>

		</div>
		<!-- </v-touch> -->
		<navbar></navbar>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll,Indicator, Toast } from 'mint-ui'
import navbar from '../common/nav'
export default {
	data () {
		return {
			id: '',
			userCode: '',
			dataList: [],
			rate: 0,
			transRate: 0,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			childrenCount: 0,
			sumIntegral: 0,
			showTab: 1
		}
	},
	computed:{
		disabled () {
			let date = new Date().getDate()
			if ( this.integral1 > 0) {
				return false
			} else {
				return true
			}
		}
	},
	components:{
		navbar
	},
	methods: {
		logout () {
			window.localStorage.removeItem('id')
			this.$router.push('/login')
		},
		switchTab (value) {
			this.page = 1
			this.showTab = value
			this.activeclass = value
			this.dataList = []
			this.nodateStatus = false
			this.getChildGmanagerCount()
			this.loadTop()
		},
		// swipeleft () {
		// 	this.$router.push('/index')
		// },
		getChildGmanagerCount () {
			let _this = this
			let settlementStatus = this.showTab === 1 ? 2 : 3
			axios.post('gmanager/childGmanagerCount',qs.stringify({
				userId: this.id,
				settlementStatus: settlementStatus
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '0') {
					_this.childrenCount = res.data.data.childrenCount
					_this.sumIntegral = res.data.data.sumIntegral
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('网络请求超时!')
			})
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			let settlementStatus = this.showTab === 1 ? 2 : 3
			axios.post('gmanager/childGmanagerIntegral',qs.stringify({
				pageSize: this.pageSize, 
				page: 1,
				userId: this.id,
				settlementStatus: settlementStatus
			}))
			.then(function(res){
				_this.nodateStatus = true
				Indicator.close()
				if (res.data.code === '0') {
					_this.totalPage = Math.ceil(res.data.data.total/_this.pageSize)
					_this.rate =  res.data.data.rate
					_this.transRate = res.data.data.transRate
					_this.dataList = res.data.data.rows || []
					_this.page = 2
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
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
			let settlementStatus = this.showTab === 1 ? 2 : 3
			axios.post('gmanager/childGmanagerIntegral',qs.stringify({
				pageSize: this.pageSize, 
				page: this.page,
				userId: this.id,
				settlementStatus: settlementStatus
			}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				if (res.data.code === '0') {
					_this.totalPage = Math.ceil(res.data.data.total/_this.pageSize)
					_this.rate =  res.data.data.rate
					_this.transRate = res.data.data.transRate
					_this.dataList.push(...res.data.data.rows)
					_this.page += 1
					_this.loading = false
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('网络请求超时!')
			})
		}
	},
	filters: {
		formatTime (value) {
			if (!value) {
				return ''
			} else {
				return value.split(' ')[0]
			}
			// let time = new Date(value)
			// let year = time.getFullYear()
			// let month = time.getMonth() + 1
			// let date = time.getDate()
			// return [year,month,date].join('/')
			
		},
		checknum (value) {
			value += ''
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		}
		// checkSatus (value) {
		// 	let date = new Date().getDate()
		// 	if (date === 1 || date === 16) {
		// 		return '结算中'
		// 	} else {
		// 		return value
		// 	}

		// }
	},
	watch: {
	},
	created () {
		this.id = window.localStorage.getItem('id')
		this.userCode = window.localStorage.getItem('userCode')
		this.getChildGmanagerCount()
	},
	monuted () {
	}

}	
</script>

<style scoped>
.ex-index{background-color: #fff; }
.ex-header {height: 5rem; background-color: #0470b6; color: #fff; position: fixed; top:0; left: 0; width: 100%;z-index:2;}
.ex-header .logo { display: block;height: 5rem; line-height: 5rem;  padding-left: 1rem; font-size: 2rem; float: left;}
.ex-header .logo img{ height: 3rem; vertical-align: middle; margin-right: 1rem; }
.ex-header .logout { float: right; height: 3rem; margin: 1rem; vertical-align: middle;background-color: #0d7ec7; color: #fff; border-radius: 0.4rem; padding: 0 1rem; line-height: 3rem; }
.ex-header .logout:active{background-color: #0c84d2;}
.ex-index-cnt {position: fixed; top: 5rem; bottom: 5rem; width: 100%; overflow: scroll;}
.ex-index-nav {height:4.5rem ; line-height: 4.5rem;}
.ex-index-nav span{ color: #000; display: inline-block; width: 50%; text-align: center; font-size: 1.6rem; border-bottom: 0.2rem solid #eee;}
.ex-index-nav span.active {color: #26a2ff; border-color: #26a2ff;}
.ex-index-box {margin: 1rem 0;}
.ex-index-item {background-color: #fff; padding:0 1rem;}
.ex-index-title{text-align: center; font-size: 1.4rem; padding: 1rem; border:1px solid #eee;}
.ex-manager-tips {color: #999; line-height: 1.5; padding: 0.5rem 1rem; background-color: #eee;}
.ex-data-cnt{background-color: #eee; padding: 0.5rem;  }
.ex-data {background-color: #fff; color: #000; padding:1rem;}
.ex-data p{ line-height: 1.5; }
.ex-data p b{color: #ffa132;}


</style>