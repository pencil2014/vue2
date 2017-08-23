<template>
	<div class="ex-details">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>e享文化</span>
		</div>
		<div class="ex-details-cnt">
			<div class='ex-details-head'>
				<p class="img"><img :src="article.cover" alt=""></p>
				<div class='top'>
					<p class="title">{{article.articleTitle}}</p>
					<p class='time'>{{article.createTime | formatTime}}</p>
				</div>
			</div>
			<div class="ex-details-data">
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
		axios.post('/exsd-web/artic/get',qs.stringify({id: id}))
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
.ex-details-head {height: 20rem; position: relative; }
.ex-details-head .img { height: 100%; text-align: center;background-color: #eee;}
.ex-details-head .img img{max-height: 20rem; max-width: 100%; position: relative; top: 50%;  transform: translateY(-50%); }
.ex-details-head .top { position: absolute; bottom: 2rem; left: 1rem; color: #fff;}
.ex-details-head .title {font-size: 1.8rem; line-height: 2;}
.ex-details-data { padding: 1rem;font-size: 1.4rem; }
</style>