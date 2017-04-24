<template>
	<div class="wx-warpper">
		<div class="logo">
			<i class="iconfont">&#xe636;</i>
			<p class="">支付成功</p>
		</div>
		<div class="bottom">
			<p>关注e享时代</p>
			<div class="button">
				<a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjYwMjQyNw==&scene=110#wechat_redirect">关注</a>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , Indicator , MessageBox} from 'mint-ui'
export default {
	data () {
		return{

		}
	},
	computed: { 
		
	},
	created () {
		
	},
	methods: {
		
	},
}
</script>
<style scoped>
.wx-warpper{width: 100%;height: 100%;overflow-x: hidden;background: #fff;}
.wx-warpper .logo{text-align: center;color: #58c86b;font-size: 1.8rem;margin-top: 30%;}
.wx-warpper .logo i{font-size: 6rem;}
.wx-warpper .bottom{width: 100%;text-align: center;margin-top: 10%;color: #999;line-height: 30px;}
.wx-warpper .button a{display: inline-block;width: 120px;height: 30px;border: solid 1px #d6d6d6;background: #fff;border-radius: 3px;color: #212a32;}
</style>