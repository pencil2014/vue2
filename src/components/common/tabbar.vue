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
			<span class="m4" :class="{'read': read}"></span>
			<br>
			我的
		</router-link>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast} from 'mint-ui'
export default {
	data () {
		return {
			read: false
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
	created () {
		let _this = this;
		axios.post('/exsd-message/web/message/getNoReadCounts',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.read = res.data.data.noReadCounts ? true : false;
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		disabled () {
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
.ex-nav .m4{background:url(../../assets/images/user.png) no-repeat center;background-size: 100%;position: relative;}
.activeRouter .m4{background:url(../../assets/images/user_select.png) no-repeat center;background-size: 100%;}
.ex-nav .m4.read:before{content: '';background: red;display: inline-block;width: 10px;height: 10px;margin: 0 10px 5px 0;border-radius: 50%;}
/*.activeRouter .m4.read:before{display: none;}*/

/*.ex-nav .m4 .count{position: absolute;background: #f0544d;color: #fff;display: inline-block;height: 17px;min-width: 17px;padding: 0 ;line-height: 16px;padding: 0 4px;box-sizing:border-box; -moz-box-sizing:border-box; -webkit-box-sizing:border-box;text-align: center;border-radius: 8px;right: -4px;top: -5px;}
.ex-nav .activeRouter .m4 .count{display: none;}*/
</style>