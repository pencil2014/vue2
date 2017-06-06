<template>
	<div class="ex-message">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="tabbar">
			<div class="m1" @click="tap(1)" :class="{active:messageType==1}">消息</div>
			<div class="m2" @click="tap(2)" :class="{active:messageType==2}">系统</div>
		</div>
		<div class="ex-message-list">
			<div class="ex-message-item" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul
				  v-infinite-scroll="loadMore"
				  infinite-scroll-disabled="loading"
				   infinite-scroll-distance="10"
				 >
				 	<mt-loadmore :top-method="loadTop" ref="loadmore">
				 	<no-data :hasdata="hasdata"></no-data>
					<li v-for="(item, index) in list" @click="todetail(item.id)" :class="{read:item.isRead == '1'}" >
						<span class="title" v-text="item.messageTitle"></span>
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
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			list:[],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			// messageType: 1,
			messageType: (function(){
				return (localStorage.getItem('messageType') ? localStorage.getItem('messageType') : 1)
			})(),
			modal: {
				text:'我的消息',
				fixed: false
			},
			wrapperHeight: 0,
			loading:false,
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
	        nodateStatus:false
		}
	},
	// watch: {
	// 	'$route': 'loadTop' 
	// },
	computed: {
		// messageType () {
		//     return this.$route.params.id
		// },
		hasdata () {
			if(this.nodateStatus && this.list.length === 0){
				return false
			}else{
				return true
			}
		},
	},
	components: {
		HeadTitle,
		NoData
	},
	mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	methods: {
		back () {
			localStorage.setItem('messageType','')
			this.$router.back()
		},
		tap (id) {
			// this.$router.push({ name: 'Message', params: { id: id}})
			localStorage.setItem('messageType',id)
			this.messageType = id;
			this.getData();
		},
		todetail (id) {
			this.$router.push({name: 'Message2', params: { id: id}})
		},
		loadTop () {
			this.getData();
			this.$refs.loadmore.onTopLoaded();
		},
		getData () {
			let _this = this;
			_this.nodateStatus = false
			axios.post('message/list',qs.stringify({
				messageType: _this.messageType,	
				pageSize: _this.pageSize,
				page: 1
			}),_this.config).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list = res.data.data.list || [];
					_this.totalPage = res.data.data.totalPage
					_this.page = 2
					_this.nodateStatus = true
				} else {	
					Toast('对不起数据加载失败！')
				}
			}).catch(function(){
				Indicator.close();
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		},
		loadMore () {
			let _this = this;
			if (_this.page > _this.totalPage) {
				return
			}
			this.loading = true
			_this.nodateStatus = false
			axios.post('message/list',qs.stringify({
				pageSize: _this.pageSize,
				page: _this.page,
				messageType: _this.messageType
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list);
					_this.totalPage = res.data.data.totalPage
					_this.page += 1;
					_this.loading = false;
					_this.nodateStatus = true
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
	}
}
</script>
<style scoped>
.ex-message{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}
.tabbar{height: 44px;background: #fff;border-bottom: solid 1px #ebebeb;text-align: center;line-height: 44px;font-size: 1.6rem;padding:0 0 3px 0;color: rgb(170,175,182);z-index: 1000;}
.tabbar .m1{margin:0 5% 0 15%;width: 30%;float: left;}
.tabbar .m2{margin:0 15% 0 5%;width: 30%;float: left;}
.active{border-bottom: solid 3px rgb(4,112,182);color: rgb(4,112,182);}
.ex-message-item{overflow-y: scroll;}
.ex-message-item li{display: block;font-size: 1.4rem;padding: 20px 10px;line-height: 20px;border-bottom: solid 1px #ebebeb;background: rgb(241,250,255)}
.ex-message-item li:last-child{border-bottom: none;}
.ex-message-item .title{}
.ex-message-item .time{color: rgb(196,201,209);float: right;padding-top: 5px;}
.ex-message-item li.read{background: #fff;color: #aaafb6;}
.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}
</style>