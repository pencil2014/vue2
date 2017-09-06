<template v-cloak>
	<div class="ex-warpper">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-content">
				<!-- <div class="ex-head">
					<p class="title" v-html="content.messageTitle"></p>
					<p class="time" v-text="time"></p>
				</div> -->
			<div class="text" v-html="formatHtml"></div>
			<div class="bottom">
				<p class="time" >{{content.pushTime | formatTime}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			content: '',
			modal: {
				text:'我的消息',
				fixed: false
			},
		}
	},
	computed:{
		id () {
			return this.$route.params.id
		},
		formatHtml () {
			if (!this.content.messageContent) {
				return ''
			}
			return this.content.messageContent.replace(/style="[^"]+"/ig,"").replace(/[&nbsp; ]{3,}/ig, "&nbsp;&nbsp;").replace(/[↵\r\n]+/mg,'<br/>')
		}
	},
	created () {
		let _this = this
		axios.post('/exsd-message/web/message/read',qs.stringify({
			id: _this.id,
			messageType: 1
		})).then(function(res){
			if (res.data.code === '10000') {
				_this.content = res.data.data
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
		})
	},
	components: {
		HeadTitle
	},
	methods: {
		back(){
			this.$router.back();
		},
	},
	filters: {
		formatTime (time) {
			if (!time) {
				return ''
			}
			let newdate = new Date(time)
			let year = newdate.getFullYear()
			let month = newdate.getMonth() +1 < 10? '0' + (newdate.getMonth() +1) : (newdate.getMonth() + 1)
			let date = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate()
			let hours = newdate.getHours() < 10 ? '0' + newdate.getHours() : newdate.getHours()
			let minutes = newdate.getMinutes() < 10 ? '0' + newdate.getMinutes() : newdate.getMinutes()
			let time1 = [year,month,date].join('-')
			let time2 = [hours,minutes].join(':')
			return time1 + '    ' +time2;
		}
	}
}
</script>
<style scoped>
[v-cloak]{display: none;}
.ex-warpper{width: 100%;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-content{width: 95%;font-size: 1.4rem;margin: 15px auto 56px auto;color: #525e69;}
.ex-head{border-bottom: solid 1px #ebebeb;line-height: 25px;}
.ex-head .title {font-size: 2rem;color: #212a32;}
.ex-head .time {font-size: 1rem;color: #aaafb6;}
.ex-content .text{margin-top: 10px;word-break: break-all;}
.ex-warpper .bottom p{text-align: right;padding-top: 20px;color: #999;}
</style>