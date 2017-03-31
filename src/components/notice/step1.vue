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
					<li v-for="(item, index) in list" @click="todetail(item.id)">
					    <span class="title" v-text="item.messageTitle" :class="{read:item.isRead === '1'}" ></span> <br/>
						<span class="summary">{{item.messageContent | formatHtml}}</span>
						<span class="time">{{item.pushTime | localTime}}</span>
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
		}
	},
	components: {
		HeadTitle
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
			axios.post('message/list',qs.stringify({
				pageSize: _this.pageSize,
				page: 1,
				messageType: 3
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list = res.data.data.list || [];
					_this.totalPage = res.data.data.totalPage
					_this.page = 2
				} else {	
					Toast('对不起数据加载失败！')
				}
			}).catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
			})
			this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			let _this = this;
			if (_this.page > _this.totalPage) {
				return
			}
			_this.loading = true;
			axios.post('message/list',qs.stringify({
				pageSize: _this.pageSize,
				page: _this.page,
				messageType: 3
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list);
					_this.totalPage = res.data.data.totalPage
					_this.page += 1;
					_this.loading = false;
				} else {	
					Toast('对不起数据加载失败！')
				}
			}).catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		}
	},
	filters: {
		localTime (time) {
			let newdate = new Date(time*1000)
			let year = newdate.getFullYear()
			let month = newdate.getMonth() +1
			let date = newdate.getDate()
			let hours = newdate.getHours()
			let minutes = newdate.getMinutes()
			let time1 = [year,month,date].join('-')
			let time2 = [hours,minutes].join(':')
			return time1 + '    ' +time2;
		},
		formatHtml (value) {
			// let result = value.replace(/\<[^img]*?\>/gi,"");
			return value.replace(/<.*?>/gmi,"")
		}	
	}
}
</script>
<style>
.ex-notice{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}
.ex-notice-item{padding-top: 58px;}
.ex-notice-item li{display: block;font-size: 1.6rem;background: #fff;padding: 20px 10px 30px 10px;line-height: 20px;border-bottom: solid 1px #ebebeb;}
.ex-notice-item li:last-child{border-bottom: none;}
.ex-notice-item span.title:before{content:"●"; font-family:Arial;color:#f0544d;font-size:1.2rem;float:left;line-height:18px; display:inline-block;width:10px;}
.ex-notice-item span.read:before{display: none;}
.ex-notice-item .summary{display: block;color: #aaafb6;font-size: 1.2rem;text-indent: 1em;line-height: 15px;min-height: 15px;max-height: 30px;overflow:hidden;padding-top: 10px;}
.ex-notice-item .time{color: #aaafb6;float: right;padding-top: 5px;font-size: 1rem;}
.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}
</style>