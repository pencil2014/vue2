<template>
	<div class="ex-order">
		<!-- <div class="ex-order-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>报单进度</span>
			</div>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-order-cnt" >
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table"
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
					<tr>
						<th>买家ID</th>
						<th>时间</th>
						<th>商品</th>
						<th>消费金额</th>
						<th>状态</th>
					</tr>
					<tbody v-show='orderList.length > 0'>
						<tr v-for="(item, index) in orderList">
							<td>{{item.userCode}}</td>
							<td>{{item.createTime | formatTime}}</td>
							<td>{{item.commodityName}}</td>
							<td>{{item.consumptionMoney}}</td>
							<td  @click='gotodec(item.status,item.id)'>
								<span v-if='item.status==="1"' >消费凭证审核<i class='iconfont'>&#xe606;</i></span>
								<span v-if='item.status ==="5"' >转账审核 <i class='iconfont'>&#xe606;</i></span>
								<span v-if='item.status==="2"'>已撤销 <i class='iconfont'>&#xe606;</i></span>
								<span v-if='(item.status==="3" || item.status ==="7") && !item.transferVoucher' >未通过初审 <i class='iconfont'>&#xe606;</i></span>
								<span v-if='(item.status==="3" || item.status ==="7") && item.transferVoucher' >未通过终审 <i class='iconfont'>&#xe606;</i></span>
								<span v-if='item.status==="6"'>审核通过 <i class='iconfont'>&#xe606;</i></span>
								<span v-if='item.status==="4"'><a href="javascript:;" >汇款凭证</a></span>
								<span v-if='item.status==="0"' ><a href="javascript:;" class='links' >消费凭证</a><a href="javascript:;" @click.stop='gocancel(item.id)'>撤销</a></span>
							</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='orderList.length === 0 && nodateStatus'>
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
			orderList: [],
			page: 1,
			totalPage: 1,
			pageSize: 15,
			nodateStatus: false,
			loading: false,
			modal:{
				text:'报单进度',
				fixed: true,
			},
		}
	},
	created () {
	},
	methods: {
		back () {
			this.$router.push('/business')
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('declaration/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					let array = res.data.data.list.filter(function(item) {
						return item.status !== '6'
					}.bind(this))
					_this.orderList = array || []
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
			axios.post('declaration/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				_this.loading = false
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					let array = res.data.data.list.filter(function(item) {
						return item.status !== '6'
					}.bind(this))
					_this.orderList.push(...array)
					_this.page += 1
				} else {
					MessageBox('提示', '对不起数据加载失败！')
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		gotodec (status,id) {
			if (status === '0') {
				this.$router.push({ name: 'Declare2', params: { id: id}})
			} else if (status === '1') {
				this.$router.push({ name: 'Declare3', params: { id: id}})
			} else if (status === '4') {
				this.$router.push({ name: 'Declare4', params: { id: id}})
			} else if (status === '3') {
				this.$router.push({ name: 'Declare5', params: { id: id}})
			} else {
				this.$router.push({ name: 'Declare5', params: { id: id}})
			}
		},
		gocancel (id) {
			this.$router.push({ name: 'Declare6', params: { id: id}})
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
.ex-order-box {position: fixed; top: 0; width: 100%; z-index: 2; }
/*.ex-order-cnt {padding-top: 5rem}*/
.ex-order-cnt {padding-top: 4.5rem;}
.ex-order-cnt td i { font-size: 1.4rem; color: #999; float: right; padding-right: 0.5rem; }
.ex-order-cnt td a {display: inline-block;font-size: 1.2rem;color: #2eadff;border-radius: 0.2rem;border: 1px solid #2eadff;padding: 0.4rem;}
.ex-order-cnt td .links{margin-right: 1rem; margin-bottom: 0.5rem;}
</style>