<template>
	<div class="ex-warpper">
		<div class="top">
			<img src="../../assets/images/packs.png" alt=""><br>
			<p>
				<span class="active">111111111元</span>&nbsp;现金返利已存入您的e享账户
			</p>
		</div>
		<div class="btn">
			<input @click="toCheck" type="button" value="立即查看 >" />
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
		outNo () {
			return this.$route.query.outNo
		}
	},
	created () {
		console.log(this.outNo)
	},
	methods: {
		toCheck () {
			this.$router.push('/login')
		}
	},
	filters: {
		checknum (value) {
			value = value? value+'' : '0'
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		},
	},
	components: {

	},
}
</script>
<style scoped>
.ex-warpper{min-height: 100%;width: 100%;overflow-x: hidden;font-size: 1.6rem;}
.ex-warpper .top{width: 100%;text-align: center;margin-top: 15%;}
.ex-warpper .top img{width: 160px;height: 160px;}
.ex-warpper .top .active{width: 100%;color: #ea3925;font-size: 2rem;}
.ex-warpper .top p{padding: 10px 15px 20px 15px;}
.ex-warpper .btn{padding: 0 15px 0 15px;}
.ex-warpper .btn input[type=button]{width: 100%;background: #58c86b;border: none;color: #fff;height: 46px;border-radius: 5px;font-size: 1.6rem;}
.ex-warpper .btn input[type=button]:active{background: rgba(88,200,107,0.8);}
</style>