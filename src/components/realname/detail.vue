<template>
	<div class="ex-realname">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-wrapper">
			<div class="ex-content">
				<div v-if="status === '1'">
					<i class="iconfont examine">&#xe609;</i>
					<p class="title">正在审核中</p>
					<p class="gray">您的实名认证请求正在审核中，请稍候...</p>
				</div>
				<div v-if="status === '0'">
					<i class="iconfont unsuc">&#xe63f;</i>
					<p class="title">您的实名认证请求审核失败</p>
					<p class="gray">原因是：{{opinion}}</p>
					<div class="btn">
						<input type="button" value="重新认证" @click="torealname">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'实名认证',
				fixed: false
			},
			examine: '',
			realType: ''
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		status () {
			return this.examine.status
		},
		opinion () {
			return this.examine.opinion
		}
	},
	created () {
		let _this = this;
		// 获取用户详情
		axios.post('verify/checkRealName',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.examine = res.data.data
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
		torealname () {
			let realType = this.examine.hasOwnProperty('type') ? this.examine.type : false
			console.log(typeof(realType))
			if(realType === '2'){
				this.$router.push('/realname/shop')
				return
			}
			this.$router.push('/realname')
		}
	}
}
</script>
<style scoped>
.ex-realname{width: 100%;background: #fff;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-content{width: 100%;text-align: center;margin-top: 20%;}
.ex-content .title{font-size: 2rem;padding-top: 5px;}
.ex-content .gray{color: rgb(153,153,153);font-size: 1.8rem;padding-top: 8px;max-width: 80%;word-break: break-all;margin: auto;}
.ex-content .iconfont{font-size: 5rem;}
.ex-content i.examine{color: #ffa100;}
.ex-content i.unsuc{color: #f0544d;}
.ex-content .btn{margin-top: 50px;}
.ex-content .btn input{border: none;padding: 8px 28px;font-size: 1.4rem;border-radius: 5px;color: rgb( 78,146,230);border: solid 1px rgb( 78,146,230); background: #fff;}
.ex-content .btn input:active{background:#ebebeb;}
</style>