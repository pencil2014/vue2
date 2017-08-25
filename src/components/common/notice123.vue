<template>
	<div class="ex-modal">
		<div class="ex-content">
			<div class="imgbox"><img src="../../assets/images/bg_notice.png" alt=""></div>
			<div class="ex-box">
				<h3 class="title">{{modal.title || '公告'}}</h3>
				<div class="text" v-html="formatHtml"></div>
				<div class="footer">
					<span>{{modal.author}}</span>
					<span class="time">{{modal.publishTime}}</span>
				</div>
				<div class="option">
					<span class="confirm" @click="confirm" >{{modal.confirm || '我知道了'}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

export default{	
	props:['modal'],
	data () {
		return {
			notice: this.modal
		} 
	},
	created () {
	},
	computed: {
		formatHtml () {
			return this.modal.content.replace(/style="[^"]+"/ig,"").replace(/(&nbsp;){3,}/ig, "&nbsp;&nbsp;")
		}
	},
	methods: {
		confirm () {
			this.$emit('confirm')
		}
	}
}
</script>
<style scoped>
.ex-modal{background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100%;top: 0;left: 0;right:0; bottom: 0; display: table; z-index: 7;}
.ex-modal .ex-content{display: table-cell;vertical-align: middle;padding: 0 5%;}
.ex-modal .ex-box{background: #fff;width: 100%;border-radius:0 0 0.5rem 0.5rem; margin-top: -0.5rem;}
.ex-modal .ex-box .title{text-align: center;font-size: 1.6rem; margin-bottom: 1rem; padding: 0 1rem;}
.ex-modal .ex-box .text{max-height: 20rem;font-size: 1.4rem;padding:0 1.5rem;overflow-y: scroll;line-height: 2.2rem; color: #666; word-break: break-all;}
.ex-modal .ex-box .footer{font-size: 1.4rem; padding: 0.5rem 1.5rem 1rem; text-align: right; color: #999; }
.ex-modal .ex-box .footer .time{ margin-left: 1rem; }
.ex-modal .ex-box .option{display: table;width: 100%;text-align: center;height: 5rem;line-height: 48px;border-top: solid 1px #eee;font-size: 1.4rem;}
.ex-modal .ex-box .option span{display: table-cell;border-right: solid 1px #eee;}
.ex-modal .ex-box .option span:last-child{border-right: none;}
.ex-modal .ex-box .option span.cancle{color: #666;}
.ex-modal .ex-box .option span:active{background: #ebebeb;}
.ex-modal .ex-box .option .confirm{ color: #047dcb; font-size: 1.6rem;}
.imgbox img{ width: 100%; }

</style>

<style>
.ex-modal .ex-box .text p { text-indent: 2rem; padding-top: 0.5rem;}
.ex-modal .ex-box .text p a { margin: 0 0.5rem; color: #047dcb;}
.ex-modal .ex-box .text .inscribe {text-align: right; padding-top: 0.5rem;}
.ex-modal .ex-box .text .inscribe p{padding-top: 0;}
</style>