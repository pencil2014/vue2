<template>
	<div class="ex-guide" :key="list.id">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-guide-content" v-html="list.articleContent">
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			userinfo:'',
			modal: {
				text:'',
				fixed: false
			},
			list:'',
			id: ''
		}
	},
	watch: {
	    '$route': 'getData' 
	},
	created () {
		this.id = this.$route.params.id
		this.getData()
	},
	methods: {
		back(){
			this.$router.back();
		},
		getData () {
			let _this = this;
			axios.post('artic/get',qs.stringify({
				id: _this.id
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list = res.data.data
					_this.modal.text = res.data.data.articleTitle
				} else {	
					Toast('对不起数据加载失败！')
				}
			}).catch(function(){
				Toast('系统出错了，正在修复中...')
			})
		}
	},
	components: {
		HeadTitle
	},
}
</script>
<style scoped>
.ex-guide{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-guide-content{padding: 20px 20px 56px 20px;}
</style>