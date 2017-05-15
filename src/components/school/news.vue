<template>
	<div class="ex-details">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>行业资讯</span>
		</div>
		<div class="ex-details-cnt">
			<div class='ex-details-news'>
					<p class="title">{{article.articleTitle}}</p>
					<p class='time'>{{article.createTime | formatTime}}</p>
			</div>
			<div class="ex-details-data">
				<p class="img" v-if='article.cover'><img :src="article.cover" alt=""></p>
				<div v-html='article.articleContent'></div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
export default {
	data () {
		return {
			article: ''
		}
	},
	methods: {
		back () {
			this.$router.push('/school')
		},
	},
	created () {
		let id = this.$route.params.id
		let _this = this
		axios.post('artic/get',qs.stringify({id: id}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.article = res.data.data
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
	},
	filters: {
		formatTime (value) {
			let time = new Date(value * 1000)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			return [year,month,date].join('/')
		}
	}
}	
</script>

<style scoped>
.ex-details-cnt {}
.ex-details-news { padding: 1rem; border-bottom: 1px solid #eee;}
.ex-details-news .title {font-size: 1.6rem; line-height: 1.5}
.ex-details-news .time {color: #aaafb6; padding-top: 0.5rem;}
.ex-details-data { padding: 1rem;font-size: 1.4rem; }
.ex-details-data .img {background-color: #eee; max-height: 20rem; margin-bottom: 1rem; overflow: hidden;}
</style>