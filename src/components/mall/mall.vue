<template>
	<div class="ex-mall">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="list">
			<div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul v-infinite-scroll="loadMore"
					    infinite-scroll-disabled="loading"
					    infinite-scroll-distance="10">
						<li @click="todetail(1)">
							<div class="imgbox">
								<img src="http://f11.baidu.com/it/u=1773370537,2404250031&fm=72" alt="">
							</div>
							<div class="explain">
								<p class="name">花花公子皮带钱包花花公子皮带钱包</p>
								<p class="detail">赠送火机+卡包</p>
								<p class="integral">140基金 + 140e积分</p>
							</div>
						</li>
						<li>
							<div class="imgbox">
								<img src="http://img.sccnn.com/bimg/339/01888.jpg" alt="">
							</div>
							<div class="explain">
								<p class="name">花花公子皮带钱包花花公子皮带钱包</p>
								<p class="detail">赠送火机+卡包</p>
								<p class="integral">140基金 + 140e积分</p>
							</div>
						</li>
						<li>
							<div class="imgbox">
								<img src="http://f11.baidu.com/it/u=1773370537,2404250031&fm=72" alt="">
							</div>
							<div class="explain">
								<p class="name">花花公子皮带钱包花花公子皮带钱包</p>
								<p class="detail">赠送火机+卡包</p>
								<p class="integral">140基金 + 140e积分</p>
							</div>
						</li>
						<li>
							<div class="imgbox">
								<img src="http://f11.baidu.com/it/u=1773370537,2404250031&fm=72" alt="">
							</div>
							<div class="explain">
								<p class="name">花花公子皮带钱包花花公子皮带钱包</p>
								<p class="detail">赠送火机+卡包</p>
								<p class="integral">140基金 + 140e积分</p>
							</div>
						</li>
						<li>
							<div class="imgbox">
								<img src="http://f11.baidu.com/it/u=1773370537,2404250031&fm=72" alt="">
							</div>
							<div class="explain">
								<p class="name">花花公子皮带钱包花花公子皮带钱包</p>
								<p class="detail">赠送火机+卡包</p>
								<p class="integral">140基金 + 140e积分</p>
							</div>
						</li>
					</ul>
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
				text:'积分商城',
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
			this.$router.push({name: 'Commodity', params: { id: id}})
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
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-mall{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;}

.list{width: 100%;}
.list .wrapper{overflow-y: scroll;font-size: 0;}
.ex-mall .list .wrapper ul{margin:15px;}
.ex-mall .list .wrapper ul li{display: inline-block;width: 47.5%;margin-bottom: 15px;background-color: #fff;padding: 10px;vertical-align: top;}
.ex-mall .list .wrapper ul li:nth-of-type(even){margin-left: 5%;}
.ex-mall .list .wrapper ul li .imgbox{width: 100%;height: 10rem;position: relative;}
.ex-mall .list .wrapper ul li .imgbox img{width: 100%;height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.ex-mall .list .wrapper ul li .explain{font-size: 1.4rem;}
.ex-mall .list .wrapper ul li .explain .name{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;display: inline-block;width: 100%;}
.ex-mall .list .wrapper ul li .explain .detail{color: #666;font-size: 1.3rem;}
.ex-mall .list .wrapper ul li .explain .integral{color: #DC342D;background-color: #FFFAE8;margin-top: 10px;}

.page-infinite-loading{text-align: center;width: 28px;margin: 10px auto;}

</style>