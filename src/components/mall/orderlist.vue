<template>
	<div class="ex-orderlist">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="list">
			<div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<table class="table">
				    	<thead>
				    		<tr>
						 		<td>日期</td>
						 		<td>商品</td>
						 		<td>扣除基金</td>
						 		<td>扣除e积分</td>
						 		<td>订单状态</td>
						 		<td></td>
						 	</tr>
				    	</thead>
				    	<tbody v-infinite-scroll="loadMore"
					    infinite-scroll-disabled="loading"
					    infinite-scroll-distance="10">
				    		<tr v-for="(item, index) in list" @click="todetail(item.id)">
						 		<td>{{item.createTime || '- -'}}</td>
						 		<td>{{item.commodityName || '- -'}}</td>
						 		<td>{{item.depositMoneyCost | checknum}}</td>
						 		<td>{{item.integralCost | checknum}}</td>
						 		<td v-if="item.status === '0'">待发货</td>
						 		<td v-if="item.status === '1'">已发货</td>
						 		<td v-if="item.status === '2'">确认收货</td>
						 		<td class="arrow"><i class="iconfont" >&#xe606;</i></td>
						 	</tr>	
				    	</tbody>			
					</table>
					<no-data :hasdata="hasdata"></no-data>
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
				text:'我的订单',
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
		todetail (id) {
			this.$router.push({name: 'OrderDetail', params: { id: id}})
		},
		loadTop () {
			this.getData();
			this.$refs.loadmore.onTopLoaded();
		},
		getData () {
			let _this = this;
			_this.nodateStatus = false
			axios.post('/exsd-web/declaration/orderList',qs.stringify({
				pageSize: _this.pageSize,
				page: 1,
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list = res.data.data.data.list || [];
					_this.nodateStatus = true
					_this.totalPage = res.data.data.data.totalPage
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
			axios.post('/exsd-web/declaration/orderList',qs.stringify({
				pageSize: _this.pageSize,
				page: _this.page,
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					let arr = res.data.data.data.list || []
					_this.list.push(...arr);
					_this.nodateStatus = true
					_this.totalPage = res.data.data.data.totalPage
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
.ex-orderlist{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}

.list{width: 100%;}
.list .wrapper{overflow-y: scroll;}
.list .wrapper .table{color: #212a32;}
.table{width: 100%;font-size: 1.3rem;color: #848a9b;background: #fff;}
.table tr{border-bottom: solid 1px #ebebeb;}
.table tr:first-child{border-top: solid 1px #ebebeb;}
.table tr:last-child{border-bottom: none;}
.table i.iconfont{color: #ADB4BE;}
.table thead{color: #848A9B;}
.table tbody{font-size: 1.2rem;}
.table td.arrow {padding: 0 10px 0 0;}

.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}

</style>