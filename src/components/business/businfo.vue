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
				<h3>下级代理商明细</h3>
				<p>当前代理区域：{{agentName}}</p>
			</div>
			<div class="ex-business-nav">
				<span :class="{active: activeclass ===1}" @click='switchTab(1)'>下级市代理</span><span :class="{active: activeclass ===2}" @click='switchTab(2)'>下级区代理</span>
			</div>
			<div class="ex-cnt">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
						<tr>
							<th>名称</th>
							<th>辖区商家数</th>
							<th>历史结算e积分</th>
						</tr>
						<tbody
							v-show='dataList.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10"
						>
							<tr v-for="item in dataList">
								<td>{{item.regionName}}</td>
								<td>{{item.shopsNum}}</td>
								<td>{{item.totalSettlement}}</td>
							</tr>
						</tbody>
					</table>
				</mt-loadmore>	
				<div class="nodata" v-show='dataList.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>没有下级代理商信息！</p>
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
import { Loadmore, InfiniteScroll,Indicator, Toast } from 'mint-ui'
import navbar from '../common/business'
export default {
	data () {
		return {
			id: '',
			dataList: [],
			activeclass: 1,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			agentInfo: {
				province: ''
			},
			regionId: '',
			regionType: '2'
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
		},
		agentName () {
			if (this.agentInfo.agencyLevel ==='1') {
				this.regionId = this.agentInfo.province
				return this.agentInfo.provinceName
			} else if (this.agentInfo.agencyLevel ==='2') {
				this.regionId = this.agentInfo.city
				return this.agentInfo.cityName
			} else {
				this.regionId = this.agentInfo.county
				return this.agentInfo.countyName
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
		goDetail (id) {
			this.$router.push({name: 'Busdetail', params:{id: id}})
		},
		switchTab (value) {
			this.activeclass = value
			this.regionType = value === 1 ? '2' : '3'
			this.loadTop()
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
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('gmanager/querySubordinateAgents',qs.stringify({
				regionType: this.regionType,
				regionId: this.regionId,
				agencyLevel: this.agentInfo.agencyLevel,
				pageSize: this.pageSize, 
				page: 1,
				userId: this.id
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
			axios.post('gmanager/querySubordinateAgents',qs.stringify({
				regionType: this.regionType,
				regionId: this.regionId,
				agencyLevel: this.agentInfo.agencyLevel,
				pageSize: this.pageSize, 
				page: this.page,
				userId: this.id
			}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				_this.loading = false
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.dataList.push(...res.data.data.list)
					_this.page += 1
				} else {
					_this.loading = true
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
			if (value) {
				return value.split(' ')[0]
			} else {
				return value
			}	
		},
		checknum (value) {
			value += ''
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		}
	},
	watch: {
	},
	created () {
		this.id = window.localStorage.getItem('id')
		let agentInfo = window.localStorage.getItem('agentInfo')
		if (agentInfo) {
			this.agentInfo =JSON.parse(window.localStorage.getItem('agentInfo')) 
		} else {
			this.queryAgentInfo()
		}
		
	},
	monuted () {
	}

}	
</script>

<style scoped>
.ex-business{background-color: #fff; }
.ex-header {height: 5rem; background-color: #0470b6; color: #fff; position: fixed; top:0; left: 0; width: 100%;z-index:2;}
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
.ex-business-title{text-align: center; font-size: 1.4rem; padding: 1.5rem; border:1px solid #eee;}
.ex-business-title p{ padding-top: 1rem;  color: #999;}

.table td.arrow { color: #999; }

</style>