<template>
	<div class="ex-index">
		<div class="ex-header">
			<span class="logo">
				<img src="../../assets/images/logo.png" alt="">VIP商家系统
			</span>
			<a href="javascript:;" class="logout" @click='logout'>退出登录</a>
		</div>
		<v-touch
		  v-on:swipeleft="swipeleft"
			v-on:swiperight="swiperight"
		>

		<div class="ex-index-cnt">
			<div class="ex-index-title">
				<h3>下级商家收益</h3>
			</div>
			<div class="ex-index-nav">
				<span :class="{active: activeclass ===1}" @click='switchTab(1)'>可结算</span><span :class="{active: activeclass ===2}" @click='switchTab(2)'>未结算</span><span :class="{active: activeclass ===3}" @click='switchTab(3)'>结算成功</span>
			</div>
			<div class="ex-index-box">
				<div class="ex-index-item" v-if='showTab === 1'>
					<div class="data">
						<div class='num'>
							<span>当前VIP商家ID：<b>{{userCode}}</b></span>
							<span>下级商家数：<b>{{children || 0}}</b></span>
							<span>下级商家可结算e积分总额：<b>{{integral1 || 0}}</b></span>
						</div>
					<!-- 	<button type="button" :class="['btn', {disabled:disabled }]" @click='settlement'>结 算</button> -->
					</div>
					<div class="ex-index-item-cnt">
						<mt-loadmore :top-method="loadTop" ref="loadmore">
						<table class="table">
							<tr>
								<th>时间</th>
								<th>获得e积分</th>
								<!-- <th>操作</th> -->
							</tr>
							<tbody
								v-show='IntegralDetail1.length > 0'
								v-infinite-scroll="loadMore"
				  			infinite-scroll-disabled="loading"
				  			infinite-scroll-distance="10"
							>
								<tr v-for="item in IntegralDetail1">
									<td>{{item.createDate  }}</td>
									<td>{{item.integralValue}}</td>
									<!-- <td><a href="javascript:;" @click='goDetail(item.userId, item.createDate)'>明细</a></td> -->
								</tr>
							</tbody>
						</table>
						</mt-loadmore>
						<div class="nodata" v-show='IntegralDetail1.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
					</div>
						
					
				</div>
				<div class="ex-index-item" v-if='showTab === 2'>
				<div class="data">
					<div class="num">
						<span>当前VIP商家ID：<b>{{userCode}}</b></span>
						<span>下级商家数：<b>{{children || 0}}</b></span>
						<span>下级商家未结算e积分总额：<b>{{integral2 || 0}}</b></span>
					</div>
				</div>
					<div class="ex-index-item-cnt">
					<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
						<tr>
							<th>时间</th>
							<th>获得e积分</th>
							<!-- <th>操作</th> -->
						</tr>
						<tbody 
							v-show='IntegralDetail2.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10"
						>
							<tr v-for="item in IntegralDetail2">
									<td>{{item.createDate  }}</td>
									<td>{{item.integralValue}}</td>
									<!-- <td><a href="javascript:;" @click='goDetail(item.userId, item.createDate)'>明细</a></td> -->
								</tr>
						</tbody>
					</table>
					</mt-loadmore>
					<div class="nodata" v-show='IntegralDetail2.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
					</div>
					
				</div>

				<div class="ex-index-item" v-if='showTab === 3'>
					<div class="data">
						<div class="num">
							<span>当前VIP商家ID：<b>{{userCode}}</b></span>
							<span>下级商家数：<b>{{children || 0}}</b></span>
							<span>下级商家结算成功e积分总额：<b>{{integral3 || 0}}</b></span>
						</div>
						
					</div>
					<div class="ex-index-item-cnt">
					<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
						<tr>
							<th>时间</th>
							<th>获得e积分</th>
							<!-- <th>操作</th> -->
						</tr>
						<tbody 
							v-show='IntegralDetail3.length > 0'
							v-infinite-scroll="loadMore"
			  			infinite-scroll-disabled="loading"
			  			infinite-scroll-distance="10"
						>
							<tr v-for="item in IntegralDetail3">
									<td>{{item.createDate }}</td>
									<td>{{item.integralValue}}</td>
									<!-- <td><a href="javascript:;" @click='goDetail(item.userId, item.createDate)'>明细</a></td> -->
								</tr>
						</tbody>
					</table>
					</mt-loadmore>
					<div class="nodata" v-show='IntegralDetail3.length === 0 && nodateStatus'>
						<img src="../../assets/images/nodata.png" alt="">
						<p>还没有数据哦~</p>
					</div>
					</div>
					
				</div>

			</div>
		</div>
		</v-touch>
		<!-- <navbar></navbar> -->
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator, Toast } from 'mint-ui'
import navbar from '../common/nav'
export default {
	data () {
		return {
			id: '',
			userCode: '',
			showTab: 1,
			activeclass: 1,
			children: 0,
			integral1: 0,
			integral2: 0,
			integral3: 0,
			IntegralDetail1: [],
			IntegralDetail2: [],
			IntegralDetail3: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false
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
			// window.localStorage.removeItem('id')
			this.$router.push('/login')
		},
		switchTab (value) {
			this.page = 1
			this.showTab = value
			this.activeclass = value
			this.getdata(this.page,this.showTab)
			this.getIntegralSum(this.showTab)
			this.nodateStatus = false
			window.localStorage.setItem('tab1',value)
		},
		swipeleft () {
			if (this.showTab > 1) {
				this.switchTab(this.showTab - 1)
			} else {
				this.switchTab(3)
			}
		},
		swiperight () {
			if (this.showTab < 3) {
				this.switchTab(this.showTab + 1)
			} else {
				this.switchTab(1)
			}
		},
		settlement () {
			if (this.disabled) {
				MessageBox('提示', '没有可结算的e积分！')
				return
			}
			let _this = this
			MessageBox({
			  title: '提示',
			  message: '确认提交结算？',
			  showCancelButton: true,
			  confirmButtonText: '确认'
			}).then(action => {
				if (action === 'confirm') {
					_this.tosettlement()
				}
			})		
		},

		tosettlement () {
			let _this = this
			Indicator.open({
			  text: '正在结算...',
			  spinnerType: 'fading-circle'
			})
			axios.post('gmanager/settlement',qs.stringify({userId: this.id, settlementStatus: 1}))
			.then(function(res){ 
				Indicator.close()
				if (res.data.code === '0') {
					MessageBox('提示', '结算请求已提交！')
					_this.page = 1
					_this.getdata(1,1) 
				} else {
					MessageBox('提示', res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('系统错误!')
			})
		},

		goDetail (userId,time) {
			this.$router.push({ name: 'Info', params: { userId: userId, time: time}})
		},
		getIntegralSum (tab) {
			let _this = this
			let data = {
				userId: this.id, 
				status: '0'
			}
			if (tab === 1) {
				data.status = '0'
			} else if (tab === 2) {
				data.status = '1'
			} else {
				data.status = '2'
			}
			axios.post('vipShops/queryChildren',qs.stringify(data))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.children = res.data.data.childrenCounts
					if (_this.showTab === 1) {
						_this.integral1 = res.data.data.integralValue
					} else if (_this.showTab === 2) {
						_this.integral2 = res.data.data.integralValue
					} else {
						_this.integral3 = res.data.data.integralValue
					}
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时!')
			})
		},
		getdata (value,tab) {
			let _this = this
			this.page = value ? 1 : this.page
			let data = {
				userId: this.id,
				status: '0',
				pageSize: this.pageSize, 
				page: this.page
			}
			if (tab === 1) {
				data.status = '1'
			} else if (tab === 2) {
				data.status = '0'
			} else {
				data.status = '2'
			}
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			this.loading = true
			axios.post('vipShops/queryIntegralByDay', qs.stringify(data))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				_this.loading = false
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					if (_this.page === 1) {
						_this.page = 2
						if (tab === 1) {
							_this.IntegralDetail1 = res.data.data.list 
						} else if (tab === 2) {
							_this.IntegralDetail2 = res.data.data.list
						} else {
							_this.IntegralDetail3 = res.data.data.list 
						}
					} else {
						_this.page += 1
						if (tab === 1) {
							_this.IntegralDetail1.push(...res.data.data.list)
						} else if (tab === 2) {
							_this.IntegralDetail2.push(...res.data.data.list) 
						} else {
							_this.IntegralDetail3.push(...res.data.data.list) 
						}
					}
							
				} else {
					MessageBox('提示', res.data.errorMsg)
				}
			})
			.catch(function(){
				_this.nodateStatus = true
				Indicator.close()
				Toast('系统错误!')
			})
		},

		loadTop () {
			this.getdata(1,this.showTab)
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			this.getdata(null,this.showTab)
		},
		
	},
	created () {
		this.id = window.localStorage.getItem('id')
		this.userCode = window.localStorage.getItem('userCode')
		let tab = window.localStorage.getItem('tab1')
		if (!!tab) {
			this.switchTab(tab*1)
		} else {
			this.getIntegralSum(1)
		}	
	},
	monuted () {
	},
	destroyed () {
		Indicator.close()
	}

}	
</script>

<style scoped>
.ex-index{background-color: #fff;/* min-height: 100%;*/}
.ex-header {height: 5rem; background-color: #0470b6; color: #fff; position: fixed; top:0; left: 0; width: 100%;z-index: 2;  }
.ex-header .logo { display: block;height: 5rem; line-height: 5rem;  padding-left: 1rem; font-size: 2rem; float: left;}
.ex-header .logo img{ height: 3rem; vertical-align: middle; margin-right: 1rem; }
.ex-header .logout { float: right; height: 3rem; margin: 1rem; vertical-align: middle;background-color: #0d7ec7; color: #fff; border-radius: 0.4rem; padding: 0 1rem; line-height: 3rem; }
.ex-header .logout:active{background-color: #0c84d2;}
.ex-index-cnt {position: fixed; top: 5rem; bottom: 5rem; width: 100%; overflow: scroll;}
.ex-index-nav {height:4.5rem ; line-height: 4.5rem;}
.ex-index-nav span{ color: #000; display: inline-block; width: 33.3%; text-align: center; font-size: 1.6rem; border-bottom: 0.2rem solid #eee;}
.ex-index-nav span.active {color: #26a2ff; border-color: #26a2ff;}
.ex-index-box {margin: 1rem 0;}
.ex-index-item {background-color: #fff; padding:0 1rem;}
.ex-index-item-cnt{}
.ex-index-item .data {border:1px solid #eee; background-color: #eee; padding:0.5rem 1rem; font-size: 1.4rem; overflow: auto; }
.ex-index-item .data .num{ float: left;}
.ex-index-item .data .num span {display: block; line-height: 1.5}
.ex-index-item .data .num b{ color: #ffa132; }
.ex-index-item .data .btn { height: 3.5rem; border-radius: 0.4rem; background-color: #58c86b; color: #fff;  float: right; margin-top: 0.3rem; padding: 0 1.5rem;}
.ex-index-item .data .disabled{background-color: #ddd;}
.ex-index-item .table td a{color: #0470b6; border:1px solid #0470b6; padding: 0.5rem 2rem; border-radius: 0.4rem;display: inline-block; }
.ex-index-title{text-align: center; font-size: 1.4rem; padding: 1rem; border:1px solid #eee;}
</style>