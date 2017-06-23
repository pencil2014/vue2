<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-top" v-if="applydata.status === '0'">
			<i class="iconfont suc">&#xe609;</i>
			<p class="strong">审核中</p>
			平台正在处理您的申请，请稍后...
		</div>
		<div class="ex-top" v-if="applydata.status === '2'">
			<i class="iconfont err">&#xe63f;</i>
			<p class="strong">抱歉，审核未通过！</p>
			原因是：{{applydata.auditOpinon}}
		</div>
		<div class="ex-form">
			<div class="ex-field">
				<span>商家名称</span>
				<span class="float_right">{{applydata.shopsEnterName}}</span>
			</div>
			<div class="ex-field">
				<span>联系人</span>
				<span class="float_right">{{applydata.shopsLinkman}}</span>
			</div>
			<div class="ex-field">
				<span>联系电话</span>
				<span class="float_right">{{applydata.shopsLinkphone}}</span>
			</div>
			<div class="ex-field">
				<span>经营范围</span>
				<span class="float_right">{{applydata.classificationName}}</span>
			</div>
			<div class="ex-field">
				<span>商家地址</span>
				<span class="float_right">{{address}}</span>
			</div>
			<div class="ex-field">
				<span>推广照片</span>
				<span class="float_right"><img :src="applydata.facadePhoto" alt="" v-preview="applydata.facadePhoto" :preview-nav-enable="false"></span>
			</div>		
		</div>
		<div class="ex-button" v-if="applydata.status === '2'">
			<button @click="toApply">重新申请</button>
		</div>
		<lg-preview></lg-preview>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'商家推广入驻',
			},
			shopsId: '',
			applydata: ''
		}
	},
	components: {
		HeadTitle,
	},
	computed: {
		address () {
			if(!this.applydata){
				return ''
			}
			return this.applydata.provinceName + this.applydata.cityName + this.applydata.countyName + this.applydata.shopsAddress
		}
	},
	created () {
		this.getDetail()
	},
	methods: {
		back () {
			if(localStorage.getItem('$backType') === '/user'){
				localStorage.setItem('$backType','/user')
				this.$router.push('/user')
				return
			}
			this.$router.push('/index')
		},
		toApply () {
			localStorage.removeItem('applyData' )
			localStorage.removeItem('shopsAddress')
			this.$router.push('/apply')
		},
		getDetail () {
			let _this = this;
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			
			axios.post('shop/enterDetail',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.applydata = res.data.data
				} else {
					Toast('获取申请信息失败！')
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
	},
	beforeRouteLeave (to,from,next) {
		let path = window.localStorage.getItem('integralPath')
		if(to.path !== path && to.path === '/index'){
			next(path)
		}else{
			next()
		}
	}
}
</script>
<style scoped>
.ex-apply{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}

.ex-apply .ex-top{background: #fff;width: 100%;text-align: center;color: #8f959e;font-size: 1.6rem;padding: 30px 0;line-height: 30px;}
.ex-apply .ex-top .strong{font-size: 2rem;color: #212a32;}
.ex-apply .ex-top i{font-size: 4.5rem;}
.ex-apply .ex-top i.suc{color: #ffa100;}
.ex-apply .ex-top i.err{color: #f0544d;}
.ex-form{background: #fff;font-size: 1.4rem;width: 100%;margin-top: 15px;}
.ex-form .ex-field{display: table;margin-left: 15px;border-bottom: solid 1px #ebebeb;padding: 10px 0;width: 100%;}
.ex-form .ex-field:last-child{border:none;}
.ex-form .ex-field span{display: table-cell;vertical-align: top;}
.ex-form .ex-field span:nth-child(1){width: 25%;}
.ex-form .ex-field span:nth-child(2){color: rgb(170,175,182);text-align: right;width: 75%;word-break: break-all;padding-right: 30px;}
.ex-form .ex-field span:nth-child(2) img{width: 80px;}

.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
.ex-button button.disable{background: #999 !important;}

.preview{position: absolute;z-index: 999;left: 0px;top: 0;}
</style>