<template>
	<div class="ex-guide">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
			<mt-loadmore 
			:top-method="loadTop" 
			ref="loadmore"
			>
				<no-data :hasdata="hasdata"></no-data>
				<div class="ex-guide-list">
					<div class="ex-guide-item" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
						<ul
							v-infinite-scroll="loadMore" 	infinite-scroll-disabled="loading"
							infinite-scroll-distance="10"
						>

							<li v-for="(item, index) in list" :id="item.id" @click="toDetail(item.id)">
								<span v-text="item.articleTitle"></span>
								<i class="iconfont" >&#xe606;
								</i>
							</li>
						</ul>
					</div>
				</div>
			</mt-loadmore>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , Loadmore ,InfiniteScroll,Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			modal: {
				text:'使用指南',
				fixed: false
			},
			list:[],
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus:false,
			loading: false,
			wrapperHeight: 0,
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
	mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
	methods: {
		back () {
			this.$router.back();
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this;
			_this.nodateStatus = false
			axios.post('/exsd-web/artic/list',qs.stringify({
				article_type_name: '使用指南',
				pageSize: _this.pageSize,
				page: 1
			})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.list = res.data.data.list || [];
					_this.totalPage = res.data.data.totalPage
					_this.nodateStatus = true
				} else {	
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
			_this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			let _this = this
			this.loading = true
			_this.nodateStatus = false
			axios.post('/exsd-web/artic/list',qs.stringify({
				article_type_name: '使用指南',
				pageSize: _this.pageSize,
				page: 1
			}))
			.then(function(res){
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.list.push(...res.data.data.list)
					_this.page += 1
					_this.loading = false
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		toDetail (id) {
			let listId = id;
			this.$router.push({ name: 'Guide2', params: { id: listId}})
		},
	},
	components: {
		HeadTitle,
		NoData
	},
}
</script>
<style scoped>
.ex-guide{width: 100%;background: #fff;color: #212a32;height: 100%;overflow:hidden;}
.ex-guide-list{padding-bottom: 56px;min-height: 100%;}
.ex-guide-list .ex-guide-item{background: #fff;overflow: scroll;}
.ex-guide-list .ex-guide-item ul{list-style-type: none;display: block;}
.ex-guide-list .ex-guide-item ul li{height: 30px;font-size: 1.4rem;width: 100%;padding: 15px 0;line-height: 30px;}
.ex-guide-list .ex-guide-item ul li span{white-space:nowrap;display: inline-block;padding-left: 2rem;max-width: 82%;overflow: hidden;text-overflow: ellipsis;}
.ex-guide-list .ex-guide-item ul li:nth-child(odd){background: #f7f7f7;}
.ex-guide-list .ex-guide-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
</style>