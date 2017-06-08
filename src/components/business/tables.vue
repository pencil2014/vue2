<template>
	<div class="ex-order">
		<!-- <div class="ex-order-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>报单成功明细</span>
			</div>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-order-cnt" >
			<div class="ex-order-nav">
				<span :class="{active:showTab===1}" @click='changeTab(1)'>单笔</span><span :class="{active:showTab===2}" @click='changeTab(2)'>批量</span>
			</div>

			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table"
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
					<tr>
						<th>日期</th>
						<th>商品</th>
						<th>消费者ID</th>
						<th>金额</th>
					</tr>
					<tbody v-show='tableList.length > 0'>
						<tr v-for="(item, index) in tableList" @click='godetail(item.id)'>
							<td>{{item.createTime | formatTime}}</td>
							<td>{{item.commodityName}}</td>
							<td>{{item.userCode}}</td>
							<td>{{item.consumptionMoney}}<i class='iconfont'>&#xe606;</i></td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='tableList.length === 0  && nodateStatus'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator , Toast} from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			tableList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false,
			modal:{
				text:'报单成功明细',
				fixed: true,
			},
			showTab: 1
		}
	},
	created () {
	},
	methods: {
		back () {
			this.$router.push('/business')
		},
		godetail (id) {
			this.$router.push({ name: 'Tableinfo', params: { id: id}})
		},
		changeTab(tab) {
			this.showTab = tab
			this.loadTop()
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			let batch = this.showTab === 1 ? '1' : '0'
			axios.post('declaration/list',qs.stringify({batch: batch, pageSize: this.pageSize, page: 1,status: 6}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.tableList = res.data.data.list || []
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
			let batch = this.showTab === 1 ? '1' : '0'
			this.loading = true
			axios.post('declaration/list',qs.stringify({batch: batch, pageSize: this.pageSize, page: this.page,status: 6}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true

				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.tableList.push(...res.data.data.list)
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

.ex-order-nav { height: 5rem; line-height: 5rem; }
.ex-order-nav span {display: inline-block; width: 50%; text-align: center; border-bottom: 1px solid #eee; font-size: 1.6rem; }
.ex-order-nav span.active{ color: #047dcb; border-color: #047dcb;}

</style>