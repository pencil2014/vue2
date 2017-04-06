<template>
	<div class="ex-integral">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="topmenu">
			<p>可用享积分：<span class="orange">{{total|num}}</span></p>
			<table class="date">
				<tr>
					<td class="left" @click="reduceyear">
						<i class="iconfont" >&#xe60f;</i>
					</td>
					<td>{{year|yearformat}}</td>
					<td @click="addyear">
						<i class="iconfont" :class="{disable:yearright}">&#xe60f;</i>
					</td>
					<td class="left" @click="reducemonth">
						<i class="iconfont" :class="{disable:monthleft}">&#xe60f;</i>
					</td>
					<td>{{month|monthformat}}</td>
					<td @click="addmonth">
						<i class="iconfont" :class="{disable:monthright}">&#xe60f;</i>
					</td>
				</tr>
			</table>
			<div class="tabbar">
				<div class="m1" @click="tap(1)" :class="{active:searchType==1}">每日分享</div>
				<div class="m2" @click="tap(2)" :class="{active:searchType==2}">享积分转余额</div>
			</div>
			<table class="table">
				<tr>
					<td>日期</td>
					<td>数额</td>
				</tr>
			</table>
		</div>
		
		<div class="list">
			<div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<no-data :hasdata="hasdata"></no-data>
					<table class="table"
					v-infinite-scroll="loadMore"
				    infinite-scroll-disabled="loading"
				    infinite-scroll-distance="10">
					 	<tr v-for="(item, index) in list" >
					 		<td>{{item.date}}</td>
					 		<td>{{item.integralValue | num}}</td>
					 	</tr>			
					</table>
				</mt-loadmore>	
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
				text:'享积分明细',
				fixed: true
			},
			loading:false,
	        total:'',
	        year:(value => {return new Date().getFullYear()})(),
	        month:(value => {return new Date().getMonth()+1})(),
	        config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({ spinnerType: 'fading-circle'})
	            }
	        },
	        wrapperHeight: 0,
	        nodateStatus:false
		}
	},
	mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	watch: {
		'$route': 'loadTop' 
	},
	computed: {
		hasdata () {
			if(this.nodateStatus && this.list.length === 0){
				return false
			}else{
				return true
			}
		},
		searchType () {
		    return this.$route.params.id
		},
		conditionDate () {
			let month;
			if (this.month < 10) {
				month = '0' + this.month
			}else{
				month = month
			}
			return this.year + '-' + month
		},
		yearright () {
			let year = new Date().getFullYear()
			let month = new Date().getMonth()+1
			if(this.year >= year){
				return true
			}
		},
		monthleft () {
			return this.month <= 1 ?true : false
		},
		monthright () {
			let month = new Date().getMonth()+1
			let year = new Date().getFullYear()
			if (this.year >= year && this.month >= month) {
				return true
			}
			if(this.year <year && this.month >=12){
				return true
			}

		},
	},
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		reduceyear () {
			this.year--;
			this.getData ()
		},
		addyear () {
			let year = new Date().getFullYear();
			let month = new Date().getMonth()+1;
			if(this.year < year){
				this.year++;
				if(this.month > month && this.year>=year){
					this.month = month
				}
			}else{
				return
			}
			this.getData ()
		},
		reducemonth () {
			let _this = this;
			if(_this.month > 1){
				_this.month--;
			}else{
				return
			}
			this.getData ()
		},
		addmonth () {
			let _this = this;
			let month = new Date().getMonth()+1;
			let year = new Date().getFullYear();
			if(_this.year < year){
				if(_this.month < 12){
					_this.month++;
				}else{
					return 
				}
			}else{
				if(_this.month < month){
					_this.month++;
				}else{
					return 
				}
			}
			this.getData ()
		},
		back () {
			this.$router.push('/integral');
		},
		tap (id) {
			this.$router.push({ name: 'Integral2', params: { id: id}})
		},
		loadTop () {
			this.getData();
			this.$refs.loadmore.onTopLoaded();
		},
		getData () {
			let _this = this;
			_this.nodateStatus = false
			axios.post('integralDetail/detail',qs.stringify({
				pageSize: _this.pageSize,
				page: 1,
				searchType: _this.searchType,
				conditionDate: _this.conditionDate
			}),_this.config).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list = res.data.data.data.list || [];
					_this.nodateStatus = true
					_this.totalPage = res.data.data.data.totalPage;
					_this.total = res.data.data.integralTotal;
					_this.page = 2
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
			this.loading = true;
			_this.nodateStatus = false
			axios.post('integralDetail/detail',qs.stringify({
				pageSize: _this.pageSize,
				page: _this.page,
				searchType: _this.searchType,
				conditionDate: _this.conditionDate
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.data.list);
					_this.nodateStatus = true
					_this.totalPage = res.data.data.data.totalPage
					_this.total = res.data.data.integralTotal
					_this.page += 1;
					_this.loading = false;
				} else {	
					Toast('对不起数据加载失败！')
				}
			}).catch(function(){
				Indicator.close();
				Indicator.open({ spinnerType: 'fading-circle'})
			})
		}
	},
	filters: {
		yearformat (value) {
			return value + '年'
		},
		monthformat (value) {
			return value + '月'
		},
		num (value) {
			if(/^\d*\.{1}\d{2,}$/.test(value)){
				return value.replace(/^(\d*)(\.{1}\d{2})(\d{1,})$/,'$1$2')
			}else{
				return value
			}
		} 
	}
}
</script>
<style scoped>
.ex-integral{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}

.topmenu{position: fixed;top: 58px;width: 100%;font-size: 1.6rem;height: 149px;}
.topmenu p{height: 30px;line-height: 30px;padding: 10px 0 10px 10px;background: #f4f5f7;}
.topmenu .orange{color: rgb(255,161,50);}
.topmenu .left .iconfont{transform: rotateY(180deg);}
.topmenu .iconfont:active{background: #ebebeb;}
.topmenu .date{width: 100%;text-align: center;background: #fff;border-bottom: solid 1px #ebebeb;}
.topmenu .date td{width: 16.66%;height: 48px;}
.topmenu .date td .iconfont{color: rgb(170,175,182);border:solid rgba(170,175,182,0.5) 2px;border-radius: 3px;
	padding: 6px;font-size: 1.2rem;}
.topmenu .tabbar{height: 44px;background: #fff;text-align: center;line-height: 44px;font-size: 1.6rem;padding:0 0 3px 0;color: rgb(170,175,182);}
.topmenu .tabbar .m1{margin:0 5% 0 15%;width: 30%;float: left;}
.topmenu .tabbar .m2{margin:0 15% 0 5%;width: 30%;float: left;}

.list{margin-top: 253px;width: 100%;}
.table{width: 100%;font-size: 1.4rem;color: rgb(170,175,182);background: #fff;}
.table tr{border-bottom: solid 1px #ebebeb;}
.table tr:first-child{border-top: solid 1px #ebebeb;}
.table tr:last-child{border-bottom: none;}
.table td{width: 50%;text-align: left;padding: 15px 0 15px 2.2rem;}

.active{border-bottom: solid 3px rgb(4,112,182);color: rgb(4,112,182);}
.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}

i.disable{background: #ebebeb;}
.wrapper{overflow-y: scroll;}
</style>