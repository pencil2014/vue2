<template>
	<div class="ex-nav">
		<router-link to="/index" :class="{activeRouter: isBuesiness}">
			<span class="m1"></span><br>
			首页
		</router-link>
		<!-- <a href="javascript:;" @click='disabled'>
			<span class="m2"></span>
			<br>
			商家推广
		</a> -->
		<router-link to="/partner">
			<span class="m2"></span>
			<br>
			商家推广
		</router-link>
		<router-link to="/school">
			<span class="m3"></span>
			<br>
			平台规则
		</router-link>
		<!-- <a href="javascript:;" @click='disabled'>
			<span class="m3"></span>
			<br>
			平台规则
		</a> -->
		<router-link to="/user">
			<span class="m4"></span>
			<br>
			我的
		</router-link>
	</div>
</template>

<script>
import { MessageBox, Indicator, Toast} from 'mint-ui'
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
	},
	methods: {
		disabled () {
			// Toast('功能暂未开放，敬请期待！')
			Toast({
			  message: '功能暂未开放，敬请期待！',
			  duration: 1000
			})
		}
	}
}	
</script>

<style scoped>
.ex-nav{background-color: #fafafa; border-top: 1px solid #e6e6e6;  position: fixed; bottom: 0; left: 0; width: 100%;display: table; z-index: 5;}
.ex-nav a {display: table-cell;color: #aaa;text-align: center;vertical-align: middle;width: 25%;}
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