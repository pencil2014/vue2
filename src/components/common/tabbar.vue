<template>
	<div class="ex-nav">
		<router-link to="/index" :class="{activeRouter: isBuesiness}">
			<span class="m1"></span><br>
			首页
		</router-link>
		<!-- <router-link to="/partner">
			<span class="m2"></span>
			<br>
			联盟商家
		</router-link> -->
		<router-link to="/school">
			<span class="m3"></span>
			<br>
			商学院
		</router-link>
		<router-link to="/user">
			<span class="m4"></span>
			<br>
			我的
		</router-link>
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
.ex-nav{background-color: #fafafa; border-top: 1px solid #e6e6e6;  position: fixed; bottom: 0; left: 0; width: 100%;display: table;}
.ex-nav a {display: table-cell;color: #aaa;text-align: center;vertical-align: middle;width: 33.3%;}
.ex-nav span{display: inline-block;width: 30px;height: 30px;}
.ex-nav .m1{background:url(../../assets/images/home.png) no-repeat center;background-size: 100%;}
.activeRouter .m1{background:url(../../assets/images/home_select.png) no-repeat center;background-size: 100%;}
.ex-nav .m2{background:url(../../assets/images/partner.png) no-repeat center;background-size: 100%;}
.activeRouter .m2{background:url(../../assets/images/partner_select.png) no-repeat center;background-size: 100%;}
.ex-nav .m3{background:url(../../assets/images/school.png) no-repeat center;background-size: 100%;}
.activeRouter .m3{background:url(../../assets/images/school_select.png) no-repeat center;background-size: 100%;}
.ex-nav .m4{background:url(../../assets/images/user.png) no-repeat center;background-size: 100%;}
.activeRouter .m4{background:url(../../assets/images/user_select.png) no-repeat center;background-size: 100%;}
</style>