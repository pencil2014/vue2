<template>
	<div class="ex-recommend">
		<!-- <div class="ex-recommend-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>我的分享</span>
			</div>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-recommend-cnt" >
			<div class="ex-recommend-tips">
				<span class='id'>分享人ID：<b>{{parentUserCode}}</b></span>
				<span>消费者人数：<b>{{totalSize}}</b></span>
			</div>
			<mt-loadmore :top-method="loadTop" ref="loadmore">
				<table class="table"
					v-infinite-scroll="loadMore"
	  			infinite-scroll-disabled="loading"
	  			infinite-scroll-distance="10" >
					<tr>
						<th>序号</th>
						<th>会员ID</th>
						<th>手机</th>
						<!-- <th>姓名</th> -->
						<th>日期</th>
					</tr>
					<tbody v-show='recommendList.length > 0'>
						<tr v-for="(item, index) in recommendList">
							<td>{{ index + 1 }}</td>
							<td>{{item.userCode}}</td>
							<td>{{item.phone || '--'}}</td>
							<!-- <td>{{item.realName}}</td> -->
							<td>{{item.createTime | formatTime}}</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='recommendList.length === 0 && nodateStatus'>
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
			recommendList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			parentUserCode: '',
			totalSize: '',
			nodateStatus: false,
			loading: false,
			modal: {
				text:'我的分享',
				fixed: false
			},
		}
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
			axios.post('/exsd-web/recommend/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.parentUserCode = res.data.data.parentUserCode
					_this.totalSize = res.data.data.total
					_this.totalPage = res.data.data.totalPage
					_this.recommendList = res.data.data.list || []
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
			axios.post('/exsd-web/recommend/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				
				if (res.data.code === '10000') {
					_this.parentUserCode = res.data.data.parentUserCode
					_this.totalSize = res.data.data.total
					_this.totalPage = res.data.data.totalPage
					_this.recommendList.push(...res.data.data.list)
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
			return [year,month,date].join('/')
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
.ex-recommend {background-color: #f4f5f7;min-height: 100%;}
.ex-record-box {position: fixed; top: 0; width: 100%; z-index: 2; }
.ex-record-cnt {padding-top: 5rem}
.ex-recommend-tips {background-color: #f4f5f7;font-size: 1.4rem; padding:1rem 0.8rem; color: #212a32; height: 3rem; line-height: 3rem;}
.ex-recommend-tips .id{padding-right: 3rem;}
.ex-recommend-tips span b{ font-weight: normal; color: #ffa132; }
.table{background: #fff;}
.table tr:last-child{border-bottom:none;}
</style>