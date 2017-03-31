<template>
	<div class="ex-recommend">
		<div class="ex-recommend-box">
			<div class="ex-topbar">
				<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
				<span>我的推荐</span>
			</div>
		</div>
		<div class="ex-recommend-cnt" >
			<div class="ex-recommend-tips">
				<span class='id'>上级会员ID：<b>{{parentUserCode}}</b></span>
				<span>下级会员总数：<b>{{totalSize}}</b></span>
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
						<th>姓名</th>
						<th>日期</th>
					</tr>
					<tbody v-show='recommendList.length > 0'>
						<tr v-for="(item, index) in recommendList">
							<td>{{ index + 1 }}</td>
							<td>{{item.userCode}}</td>
							<td>{{item.phone}}</td>
							<td>{{item.realName}}</td>
							<td>{{item.createTime | formatTime}}</td>
						</tr>
					</tbody>
				</table>
			</mt-loadmore>
			<div class="nodata" v-show='recommendList.length === 0'>
				<img src="../../assets/images/nodata.png" alt="">
				<p>还没有数据哦~</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator } from 'mint-ui'
export default {
	data () {
		return {
			recommendList: [],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			parentUserCode: '',
			totalSize: ''
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
			axios.post('recommend/list',qs.stringify({pageSize: this.pageSize, page: 1}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.parentUserCode = res.data.data.parentUserCode
					_this.totalSize = res.data.data.total
					_this.totalPage = res.data.data.totalPage
					_this.recommendList = res.data.data.list || []
				} else {
					MessageBox('提示', '对不起数据加载失败！')
				}
			})
			.catch(function(){
				Indicator.close()
				Indicator.open({ spinnerType: 'fading-circle'})
			})
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			let _this = this
			this.loading = true
			axios.post('recommend/list',qs.stringify({pageSize: this.pageSize, page: this.page}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.parentUserCode = res.data.data.parentUserCode
					_this.totalSize = res.data.data.total
					_this.totalPage = res.data.data.totalPage
					_this.recommendList.push(...res.data.data.list)
					_this.page += 1
				} else {
					MessageBox('提示', '对不起数据加载失败！')
				}
			})
			.catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
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
	}
}	
</script>

<style scoped>
.ex-record-box {position: fixed; top: 0; width: 100%; z-index: 2; }
.ex-record-cnt {padding-top: 5rem}
.ex-recommend-tips {background-color: #eff0f7; font-size: 1.4rem; padding:1rem 0.8rem; color: #212a32; height: 3rem; line-height: 3rem;}
.ex-recommend-tips .id{padding-right: 3rem;}
.ex-recommend-tips span b{ font-weight: normal; color: #ffa132; }
</style>