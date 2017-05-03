<template>
	<div class="ex-school">
		<div class="ex-school-title">
			商学院
		</div>
		<div class="ex-school-list">
			<ul>
				<router-link to="/word/1" tag='li'><i class="iconfont">&#xe615;</i> e享时代创新消费平台基本规则(正式版）</router-link>
				<router-link to="/word/2" tag='li'><i class="iconfont">&#xe615;</i> e享时代会员服务协议（正式稿）</router-link>
				<router-link to="/word/3" tag='li'><i class="iconfont">&#xe615;</i> e享时代联盟商家承诺书</router-link>
				<router-link to="/word/4" tag='li'><i class="iconfont">&#xe615;</i> e享时代商家入驻加盟协议书(正式稿)</router-link>
			</ul>
		</div>
		<app-nav></app-nav>
	</div>
</template>

<script>
import appNav from "../common/tabbar.vue"
export default {
	data () {
		return {
		}
	},
	computed: {
	},
	components: {
		appNav
	},
	methods: {

	},
	created () {

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
	}
}	
</script>

<style scoped>
.ex-school{padding-bottom: 3rem;}
.ex-school-title { height: 5rem; line-height: 5rem; text-align: center; font-size: 2rem; border-bottom: 1px solid #eee;}
.ex-school-list {padding: 1rem;}
.ex-school-list li {padding: 1rem 0; font-size: 1.4rem; color: #047dcb;}
.ex-school-list li:active{background-color: #eee;}
</style>