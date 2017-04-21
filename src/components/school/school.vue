<template>
	<div class="ex-school">
		<div class="ex-school-title">
			商学院
		</div>
		<div class="ex-school-nav" >
			<span :class="{active: tabnum === 1}" @click='changetab(1)'><b>讲师风采</b></span><span :class="{active: tabnum === 2}"  @click='changetab(2)'><b>E享文化</b></span><span :class="{active: tabnum === 3}"  @click='changetab(3)'><b>行业资讯</b></span>
		</div>
		<div class="ex-school-cnt">
			<div v-show='tabnum === 1'>
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul class='ex-school-item'
						v-show='dataList.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10" 
					>
						<li v-for='item in dataList' @click='godetails(item.id)'>
							<p class="img"><img :src="item.cover" alt=""></p>
							<p class="title">{{item.articleTitle}}</p>
							<p class="time">{{item.createTime | formatTime}}</p>
						</li>
					</ul>
				</mt-loadmore>
			</div>

			<div v-show='tabnum === 2'>
				<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul class='ex-school-item'
						v-show='dataList.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10" 
					>
						<li v-for='item in dataList' @click='godetails2(item.id)'>
							<p class="img"><img :src="item.cover" alt=""></p>
							<p class="title">{{item.articleTitle}}</p>
							<p class="time">{{item.createTime | formatTime}}</p>
						</li>
					</ul>
				</mt-loadmore>
			</div>

		 	<div v-show='tabnum === 3'>
		 		<mt-loadmore :top-method="loadTop" ref="loadmore">
					<ul class='ex-school-item2'
						v-show='dataList.length > 0'
						v-infinite-scroll="loadMore"
		  			infinite-scroll-disabled="loading"
		  			infinite-scroll-distance="10" 
					>
						<li v-for='item in dataList' @click='gonews(item.id)'>
							<p class="img"><img :src="item.cover" alt=""></p>
							<p class="title">{{item.articleTitle}}</p>
							<!-- <p class="time">{{item.createTime | formatTime}}</p> -->
						</li>
					</ul>
				</mt-loadmore>
		 	</div>
			

		</div>
		<div class="nodata" v-show='dataList.length === 0  && nodateStatus'>
			<img src="../../assets/images/nodata.png" alt="">
			<p>还没有数据哦~</p>
		</div>
		<app-nav></app-nav>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Loadmore, InfiniteScroll, Indicator, Toast } from 'mint-ui'
import appNav from "../common/tabbar.vue"
export default {
	data () {
		return {
			teacherList: [],
			cultureList: [],
			newsList: [],
			tabnum: 1,
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus: false,
			loading: false
		}
	},
	computed: {
		dataList () {
			switch (this.tabnum) {
				case 1:
					return this.teacherList
					break
				case 2:
					return this.cultureList
					break
				case 3:
					return this.newsList
					break	
				default:
					return this.teacherList
					break
			}
		}
	},
	components: {
		appNav
	},
	methods: {
		changetab (num) {
			this.tabnum = num
			this.page = 1
		},
		godetails (id) {
			this.$router.push({ name: 'Details', params: { id: id}})
		},
		godetails2 (id) {
			this.$router.push({ name: 'Details2', params: { id: id}})
		},
		gonews (id) {
			this.$router.push({ name: 'News', params: { id: id}})
		},
		getdata (value,refresh) {
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			let page = refresh ? 1 : this.page
			axios.post('artic/list',qs.stringify({
				article_type_name: value,
				pageSize: this.pageSize, 
				page: page
			}))
			.then(function(res){
				Indicator.close()
				_this.nodateStatus = true
				_this.loading = false
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.page += 1
					if (page === 1) {
							if (value === '讲师风采') {
								_this.teacherList = res.data.data.list || []
								_this.page = 2
							} else if (value === 'E享文化') {
								_this.cultureList = res.data.data.list || []
								_this.page = 2
							} else {
								_this.newsList = res.data.data.list || []
								_this.page = 2
							}
						} else {
							if (value === '讲师风采') {
								_this.teacherList.push(...res.data.data.list)
							} else if (value === 'E享文化') {
								_this.cultureList.push(...res.data.data.list)
							} else {
								_this.newsList.push(...res.data.data.list)
							}
						}
					
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('网络请求超时！')
			})
		},

		loadTop () {
			if (this.tabnum === 1) {
				this.getdata ('讲师风采', 1)
			} else if (this.tabnum === 2) {
				this.getdata ('E享文化', 1)
			} else {
				this.getdata ('行业资讯', 1)
			}
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			this.loading = true
			if (this.tabnum === 1) {
				this.getdata ('讲师风采')
			} else if (this.tabnum === 2) {
				this.getdata ('E享文化')
			} else {
				this.getdata ('行业资讯')
			}
		}
	},
	created () {
		this.getdata ('E享文化')
		this.getdata ('行业资讯')
	},
	filters: {
		formatTime (value) {
			let time = new Date(value * 1000)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			return [year,month,date].join('/')
		}
	},
	beforeRouteLeave (to,from,next) {
		let path = window.localStorage.getItem('integralPath')
		if(to.path !== path && to.path === '/index'){
			next(path)
		}else{
			next()
		}
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-school{padding-bottom: 3rem;}
.ex-school-title { height: 5rem; line-height: 5rem; text-align: center; font-size: 2rem; }
.ex-school-nav { height: 3rem; line-height: 3rem; margin-bottom: 0.5rem;}
.ex-school-nav span {display: inline-block; width: 33.3%; text-align: center;  font-size: 1.5rem;}
.ex-school-nav span b{border-bottom: 2px solid #fff; padding-bottom: 0.5rem; font-weight: normal;}
.ex-school-nav span.active b{border-color: #047dcb; color: #047dcb; }
.ex-school-cnt { padding: 1rem 0; }
.ex-school-item .img{ text-align: center; background-color: #eee;}
.ex-school-item .img img{ max-height: 20rem;}
.ex-school-item .title { padding: 1rem 1rem 0.5rem 1rem; font-size: 1.4rem;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.ex-school-item .time { padding: 0 1rem 1rem 1rem;border-bottom: 1px solid #eee; color: #aaafb6;margin-bottom: 1rem;}

.ex-school-item2 { border-top: 1px solid #eee; }
.ex-school-item2  li{ height: 7rem; padding: 1rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; overflow: hidden;}
.ex-school-item2 .img{ width: 12rem; height: 7rem; overflow: hidden; float: left; margin-right: 1rem; background-color: #eee;}
.ex-school-item2 .title { font-size: 1.4rem; padding-top: 0.5rem; }
</style>