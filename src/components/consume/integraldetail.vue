<template>
	<div class="ex-integral">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="topmenu">
			<div class="date-content">
				<table class="date">
					<tr>
						<td class="left" @click="reduceyear">
							<i class="iconfont" >&#xe60f;</i>
						</td>
						<td>{{year|yearformat}}</td>
						<td @click="addyear" class="b_right">
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
			</div>
			<div class="tabbar">
				<div class="m1" @click="tap('1')" :class="{active:searchType==1}">每日分享</div>
				<div class="m2" @click="tap('2')" :class="{active:searchType==2}">享积分转换</div>
			</div>
			<table class="table">
				<tr>
					<td>日期</td>
					<td>数额</td>
					<td v-if="searchType === '2'">去向</td>
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
					 	<tr v-for="(item, index) in list">
					 		<td>{{item.date}}</td>
					 		<td>{{item.integralValue | checknum}}</td>
					 		<td v-if="searchType === '2'">{{item.remark || '--'}}</td>
					 	</tr>			
					</table>
				</mt-loadmore>	
				<!-- <div class="page-infinite-loading" v-show="loading">
			       <mt-spinner type="fading-circle"></mt-spinner>
			    </div> -->
			</div>
		</div>
		<div class="bottom" v-if="userType === '2'">
			<div class="bottom-item">
				可用享积分：<span class="orange">{{total | checknum}}</span>
			</div>
		</div>

		<div class="bottom" v-if="userType === '1' && searchType === '1'">
			<div class="bottom-item">
				本月分享总额：<span class="orange">{{monthIntegral | checknum}}</span>
			</div>
			<div class="bottom-item" v-if="level !== null">
				月参数值：<span class="orange">{{level}}</span>
			</div>
		</div>

		<div class="bottom" v-if="searchType === '2'">
			<div class="bottom-item">
				基金余额：<span class="orange">{{depositMoney | checknum}}</span>
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
				fixed: false
			},
			searchType:'1',
			loading:false,
	        total: 0,
	        monthIntegral: 0,
	        level: 0,
	        depositMoney: 0,
	        year:(value => {return new Date().getFullYear()})(),
	        month:(value => {return new Date().getMonth()+1})(),
	        config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({ spinnerType: 'fading-circle'})
	            }
	        },
	        wrapperHeight: 0,
	        nodateStatus:false,
	        userType: (value => localStorage.getItem('usertype'))()
		}
	},
	mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
    },
	computed: {
		hasdata () {
			if(this.nodateStatus && this.list.length === 0){
				return false
			}else{
				return true
			}
		},
		conditionDate () {
			let month;
			if (this.month < 10) {
				month = '0' + this.month
			}else{
				month = this.month
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
			if(this.year >= year){
				return
			}
			this.year++;
			this.month = this.month > month ? month : this.month
			this.getData ()
		},
		reducemonth () {
			if(this.month <= 1){
				return 
			}
			this.month--;
			this.getData ()
		},
		addmonth () {
			let month = new Date().getMonth()+1;
			let year = new Date().getFullYear();

			if(this.month >= month && this.year >= year){
				return 
			}else if(this.month >= 12){
				return 
			}else {
				this.month++;
			}
			this.getData ()
		},
		back () {
			this.$router.back();
		},
		tap (id) {
			if(this.searchType === id){
				return
			}
			this.searchType = id;
			this.loadTop()
		},
		loadTop () {
			this.getData();
			this.$refs.loadmore.onTopLoaded();
		},
		getData () {
			let _this = this;
			_this.nodateStatus = false
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/integralDetail/detail',qs.stringify({
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
					_this.level = res.data.data.level
					_this.monthIntegral = res.data.data.monthIntegral
					_this.depositMoney = res.data.data.depositMoney
					_this.page = 2
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		loadMore () {
			let _this = this;
			if (_this.page > _this.totalPage) {
				return
			}
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			this.loading = true;
			_this.nodateStatus = false
			axios.post('/exsd-web/integralDetail/detail',qs.stringify({
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
					_this.level = res.data.data.level
					_this.monthIntegral = res.data.data.monthIntegral
					_this.depositMoney = res.data.data.depositMoney
					_this.page += 1;
					_this.loading = false;
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
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
		checknum (value) {
			if(!value){
				return '0.00'
			}else{
				value += ''
				let num = '0.00'
				num = value >= 0 ? value : '0.00' 
				num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
				return num 
			}
		},
		checklevel (value) {
			if(!value){
				return '0.0'
			}else{
				value += ''
				let num = '0.0'
				num = value >= 0 ? value : '0.0' 
				num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 2)*1).toFixed(1) : value + '.0' 
				return num
			}
		}
	},
	destroyed () {
		Indicator.close()
	}
}
</script>
<style scoped>
.ex-integral{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}

.topmenu{width: 100%;font-size: 1.6rem;}
.topmenu p{height: 30px;line-height: 30px;padding: 10px 0 10px 10px;background: #f4f5f7;}
.topmenu .orange{color: rgb(255,161,50);}
.topmenu .left .iconfont{transform: rotateY(180deg);}
.topmenu .iconfont:active{background: #ebebeb;}
.date-content{padding: 10px 0;background: #fff;}
.topmenu .date{width: 100%;text-align: center;}
.topmenu .date td{width: 16.66%;}
.topmenu .date td .iconfont{color: rgb(170,175,182);border:solid rgba(170,175,182,0.5) 1px;border-radius: 3px;
	padding: 6px;font-size: 1.2rem;}
.topmenu .date td.b_right{border-right: solid 1px #ebebeb;}
.topmenu .tabbar{height: 44px;background: #fff;text-align: center;line-height: 44px;font-size: 1.6rem;padding:0 0 3px 0;color: rgb(170,175,182);border-top: solid 1px #ebebeb;}
.topmenu .tabbar .m1{margin:0 5% 0 15%;width: 30%;float: left;}
.topmenu .tabbar .m2{margin:0 15% 0 5%;width: 30%;float: left;}

.list{width: 100%;}
.table{width: 100%;font-size: 1.4rem;color: rgb(170,175,182);background: #fff;}
.table tr{border-bottom: solid 1px #ebebeb;}
.table tr:first-child{border-top: solid 1px #ebebeb;}
.table tr:last-child{border-bottom: none;}
.table td{width: 33.3%;text-align: left;padding: 15px 0 15px 2.2rem;}

.active{border-bottom: solid 3px rgb(4,112,182);color: rgb(4,112,182);}
.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}

i.disable{background: #ebebeb;}
.wrapper{overflow-y: scroll;}
.bottom{position: fixed;bottom: 0;left: 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height: 50px;text-align: center; width: 100%;background: #fff;border-top: solid 1px #ebebeb;display: table;}
.bottom .bottom-item{display: table-cell;vertical-align: middle;}
.bottom .bottom-item:nth-child(2){width: 50%;}
.bottom .orange{color: rgb(255,161,50);font-size: 1.6rem;}
</style>