<template>
	<div class="ex-nav">
		<router-link to="/index" :class="{activeRouter: isBuesiness}"><i class="iconfont m1">&#xe607;</i>我的</router-link><!-- <router-link to="/login"><i class="iconfont m2">&#xe619;</i>联盟商家</router-link> --><router-link to="/register"><i class="iconfont m3">&#xe60a;</i>商学院</router-link><router-link to="/message"><i class="iconfont m4">&#xe670;</i>公告</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		isBuesiness () {
			if (this.$route.path === '/business') {
				return true
			} else {
				return false
			}
		}
	}
}	
</script>

<style scoped>
.ex-nav{background-color: #fafafa; border-top: 1px solid #e6e6e6;  position: fixed; bottom: 0; left: 0; width: 100%; }
.ex-nav a {display: inline-block; width: 33.3%; text-align: center; color: #aaa;padding-bottom: 0.5rem;}
.ex-nav a i{display: block; padding-bottom: 0.1rem;}
.ex-nav .m1{font-size: 2.5rem;}
.ex-nav .m2{font-size: 2.1rem;}
.ex-nav .m3{font-size: 2.2rem;}
.ex-nav .m4{font-size: 2.3rem;}
</style>