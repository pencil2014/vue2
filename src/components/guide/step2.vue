<template>
	<div class="ex-warpper">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-content">
			<div class="ex-head">
				<p class="title" v-html="content.articleTitle"></p>
				<p class="time" v-text="time"></p>
			</div>
			<div class="text" v-html="content.articleContent"></div>
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
			modal: {
				text:'使用指南',
				fixed: false
			},
			content:'',
		}
	},
	computed:{
		id () {
			return this.$route.params.id
		},
		time () {
			if(!this.content.createTime){
				return;
			}else{
				let time = new Date(this.content.createTime*1000)
				let year = time.getFullYear()
				let month = time.getMonth() +1
				let date = time.getDate()
				let hours = time.getHours()
				let minutes = time.getMinutes()
				let time1 = [year,month,date].join('-')
				let time2 = [hours,minutes].join(':')
				return time1 + '    ' +time2;
			}
		}
	},
	created () {
		let _this = this;
		axios.post('artic/get',qs.stringify({
			id: _this.id
		})).then(function(res){
			if (res.data.code === '10000') {
				_this.content = res.data.data
			} else {	
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.open({ spinnerType: 'fading-circle'})
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
	},
	components: {
		HeadTitle
	},
}
</script>
<style scoped>
[v-cloak]{display: none;}
.ex-warpper{width: 100%;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-content{width: 95%;font-size: 1.4rem;margin: 15px auto 56px auto;color: #525e69;}
.ex-head{border-bottom: solid 1px #ebebeb;line-height: 25px;}
.ex-head .title {font-size: 2rem;color: #212a32;}
.ex-head .time {font-size: 1rem;color: #aaafb6;}
.ex-content .text{margin-top: 10px;}
</style>