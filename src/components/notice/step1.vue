<template>
	<div class="ex-notice">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-notice-list">
			<div class="ex-notice-item" ref="wrapper">	
				<ul
				   v-infinite-scroll="loadMore"
				   infinite-scroll-disabled="loading"
				   infinite-scroll-distance="10"
				 >
				 	<mt-loadmore :top-method="loadTop" ref="loadmore">
				 	<no-data :hasdata="hasdata"></no-data>
					<li v-for="(item, index) in list" @click="todetail(item.id)"  :class="{read:item.isRead == '1'}">
					    <div class="list-item">
					    <span class="title" v-text="item.messageTitle" ></span>	

							<span class="summary">{{item.messageContent | formatHtml}}</span>
							<span class="time" v-show="item.author">{{item.author}}</span>
							<span class="time" v-if='item.strategy==="1"'>{{item.publishTime | localTime}}</span>
							<span class="time" v-else>{{item.effectTime | localTime}}</span>
					    </div>
					</li>
					</mt-loadmore>
				</ul>
				<div class="page-infinite-loading" v-show="loading">
			       <mt-spinner type="fading-circle"></mt-spinner>
			    </div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Indicator, Loadmore ,InfiniteScroll,Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			list:[],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			modal: {
				text:'公告',
				fixed: 'fixed'
			},
			loading:false,
			nodateStatus:false
		}
	},
	computed: {
		hasdata () {
			if(this.nodateStatus && this.list.length === 0){
				return false
			}else{
				return true
			}
		},
	},
	methods: {
		back () {
			this.$router.back();
		},
		todetail (id) {
			this.$router.push({name: 'Notice2', params: { id: id}})
		},
		loadTop () {
			let _this = this;
			_this.nodateStatus = false
			axios.post('/exsd-web/message/list',qs.stringify({
				platform: '2',
				pageSize: _this.pageSize,
				page: 1,
				messageType: 3
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list = res.data.data.list || [];
					_this.totalPage = res.data.data.totalPage
					_this.page = 2
					_this.nodateStatus = true
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
			this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			let _this = this;
			if (_this.page > _this.totalPage) {
				return
			}
			this.loading = true
			_this.nodateStatus = false
			axios.post('/exsd-web/message/list',qs.stringify({
				platform: '2',
				pageSize: _this.pageSize,
				page: _this.page,
				messageType: 3
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list);
					_this.totalPage = res.data.data.totalPage
					_this.page += 1;
					_this.loading = false;
					_this.nodateStatus = true
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	filters: {
		localTime (time) {
			if (!time) {
				return ''
			}
			let newdate = new Date(time)
			let year = newdate.getFullYear()
			let month = newdate.getMonth() +1 < 10? '0' + (newdate.getMonth() +1) : (newdate.getMonth() + 1)
			let date = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate()
			let hours = newdate.getHours() < 10 ? '0' + newdate.getHours() : newdate.getHours()
			let minutes = newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes()
			let time1 = [year,month,date].join('-')
			let time2 = [hours,minutes].join(':')
			return time1 + '    ' +time2;
		},
		formatHtml (value) {
			let result1 = value.replace(/<[img].*?>/gim,"[图片]")
			return result1.replace(/<.*?>|&[^;]*;/gim,"") 
		}	
	},
	components: {
		HeadTitle,
		NoData
	},
}
</script>
<style>
.ex-notice{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}
.ex-notice-item{padding-top: 4.5rem;}
.ex-notice-item li{display: block;font-size: 1.6rem;background: #fff;padding: 15px 10px 30px 10px;line-height: 20px;border-bottom: solid 1px #ebebeb;}
.ex-notice-item li:last-child{border-bottom: none;}
.ex-notice-item li:before{content:"●"; font-family:Arial;color:#f0544d;font-size:0.8rem;float:left;line-height:18px; display:inline-block;width:10px;}
.ex-notice-item li.read:before{display: none;}
.ex-notice-item li .list-item{padding-left: 1rem;}
.ex-notice-item span.title{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;width: 100%;}
.ex-notice-item .summary{display: block;color: #aaafb6;font-size: 1.2rem;line-height: 15px;min-height: 15px;max-height: 30px;overflow:hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.ex-notice-item .time{color: #aaafb6;float: left;padding-top: 5px;font-size: 1rem;padding-right: 10px;}
.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}
</style>