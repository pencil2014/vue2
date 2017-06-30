<template>
	<div class="ex-nav">
		<router-link to="/business"><i class="iconfont m1">&#xe64e;</i>我的收益</router-link><router-link to="/businfo"><i class="iconfont m2">&#xe62f;</i>下级代理商明细</router-link>
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
.ex-nav{background-color: #fafafa; border-top: 1px solid #e6e6e6;  position: fixed; bottom: 0; left: 0; width: 100%;}
.ex-nav a {display: inline-block; width: 50%; text-align: center; color: #aaa;padding: 0.5rem 0;}
.ex-nav a i{display: block; padding-bottom: 0.1rem;}
.ex-nav .m1{font-size: 2.5rem;}
.ex-nav .m2{font-size: 2.2rem;}
</style>