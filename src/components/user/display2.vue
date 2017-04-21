<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<div class="item-wrapper"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<div
					v-infinite-scroll="loadMore"
				 	infinite-scroll-disabled="loading"
				    infinite-scroll-distance="10"
				>
				 	<no-data :hasdata="hasdata"></no-data>
					<div  class="item">
						<div class="item-content">
							<span class="m0">
								<label for="" class="checkbox"></label>
							</span>
							<span class="m1">
								<div><img src="../../assets/images/girl01.png" alt=""></div>
							</span>
							<span class="m2">
								<p class="caption">
									电饭煲</p>
								<p class="info">
									&yen;650<label for="">分组：电器1</label></p>
							</span>
							<span class="m3"><i class="iconfont" >&#xe606;</i></span>
						</div>
					</div>
				</div>
				<div class="page-infinite-loading" v-show="loading">
			       <mt-spinner type="fading-circle"></mt-spinner>
			    </div>
			</div>
		</div>
		<div class="bottom">
			<span><i class="iconfont" >&#xe608;</i>
				添加</span>
			<span><i class="iconfont" >&#xe613;</i>
				管理</span>
		</div>
		<!-- <div class="bottom">
			<span>删除</span>
			<span>分组至</span>
		</div> -->
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast , Loadmore ,InfiniteScroll} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			list:[],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			wrapperHeight: 0,
			nodateStatus:false,
			loading:false,
			modal: {
				text:'产品',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle,
		NoData
	},
	computed:{
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
		todisplay3 () {
			this.$router.push('/display3')
		},
		loadTop () {
			this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			let _this = this 
			if (_this.page > _this.totalPage) {
				return
			}
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: _this.$route.query.shopsId
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list)
					_this.totalPage = res.data.data.totalPage
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		}
	},
	mounted() {
      	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;height: 100%;}
.item-wrapper {width: 100%;border-bottom: 50px;overflow-x: auto;overflow-y: hidden;}
.item {margin: 0 0 0 0;background: #fff;display: table;width: 100%;}
.item:active{background: #ebebeb;}
.item-content{padding: 15px 10px 15px 10px;border-bottom: solid 1px #ebebeb;margin-left: 10px;}
.item-wrapper .item:last-child .item-content{border: none;}
.item span {vertical-align: middle;display: table-cell;}
.item span.m0 .checkbox{width: 20px;height: 20px;display: inline-block;background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.item span.m0 {width: 10%;}
.item span.m1 {width: 20%;text-align: center;}
.item span.m2 {width: 70%;}
.item span.m3 {width: 5%;}
.item span.m1 img{width: 120px;border: solid 1px #ebebeb;}
.item span.m2 p{padding-left: 10px;}
.item span.m2 p.caption{font-size: 1.4rem;line-height: 20px;max-height: 40px;overflow-y: hidden;}
.item span.m2 p.info{padding-top: 10px;color: #f16200;}
.item span.m2 p.info label{padding-left: 15px;color: #999;}
.item span.m3 i{color: #999;}
.ex-display .bottom{position: fixed;bottom: 0;left: 0;display: table;width: 100%;text-align: center;height: 50px;line-height: 50px;background: #fff;}
.ex-display .bottom span{display: table-cell;width: 50%;font-size: 1.4rem;}
.ex-display .bottom span i{color: #999;}
.ex-display .bottom span:active{background: #ebebeb}
</style>