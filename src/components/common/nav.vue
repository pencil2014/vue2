<template>
	<div class="ex-nav">
		<router-link to="/index"><i class="iconfont m1">&#xe607;</i>我的</router-link>
		<router-link to="/login"><i class="iconfont m2">&#xe619;</i>联盟商家</router-link>
		<router-link to="/register"><i class="iconfont m3">&#xe60a;</i>商学院</router-link>
		<router-link to="/message"><i class="iconfont m4">&#xe670;</i>公告</router-link>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	}
}	
</script>

<style scoped>
.ex-nav{background-color: #fafafa; border-top: 1px solid #e6e6e6; padding-bottom: 0.1rem; position: fixed; bottom: 0; left: 0; width: 100%;}
.ex-nav a {display: inline-block; width: 24%; text-align: center; color: #aaa;}
.ex-nav a i{display: block;}
.ex-nav .m1{font-size: 0.8rem;}
.ex-nav .m2{font-size: 0.65rem;}
.ex-nav .m3{font-size: 0.65rem;}
.ex-nav .m4{font-size: 0.7rem;}
</style>