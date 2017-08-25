<template>
	<div class="ex-integral">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<table class="table">
			<tr>
				<td>月份</td>
				<td>总额</td>
			</tr>
		</table>
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
					 		<td>{{item.integralValue | checknum}}</td>
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
				text:'每月消费e积分明细',
				fixed: false
			},
			loading:false,
	        wrapperHeight: 0,
	        nodateStatus:false
		}
	},
	mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		back () {
			this.$router.back();
		},
		loadTop () {
			this.getData();
			this.$refs.loadmore.onTopLoaded();
		},
		getData () {
			let _this = this;
			_this.nodateStatus = false
			axios.post('/exsd-web/integralRecord/integralC/list',qs.stringify({
				pageSize: _this.pageSize,
				page: 1,
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list = res.data.data.list || [];
					_this.nodateStatus = true
					_this.totalPage = res.data.data.totalPage
					_this.page = 2
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(err){
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		loadMore () {
			let _this = this;
			if (_this.page > _this.totalPage) {
				return
			}
			this.loading = true;
			_this.nodateStatus = false
			axios.post('/exsd-web/integralRecord/integralC/list',qs.stringify({
				pageSize: _this.pageSize,
				page: _this.page,
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list);
					_this.nodateStatus = true
					_this.totalPage = res.data.data.totalPage
					_this.page += 1;
					_this.loading = false;
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(err){
				console.log(err)
				Indicator.close();
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	filters: {
		checknum (value) {
			if(!value){
				return '0.00'
			}
			value += ''
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		}
	},
	destroyed () {
		Indicator.close()
	}
}
</script>
<style scoped>
.ex-integral{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}


.list{width: 100%;}
.list .table{color: #212a32;}
.table{width: 100%;font-size: 1.4rem;color: #848a9b;background: #fff;}
.table tr{border-bottom: solid 1px #ebebeb;}
.table tr:first-child{border-top: solid 1px #ebebeb;}
.table tr:last-child{border-bottom: none;}
.table td{width: 50%;text-align: left;padding: 15px 0 15px 2.2rem;}

.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}

i.disable{background: #ebebeb;}
.wrapper{overflow-y: scroll;}

</style>