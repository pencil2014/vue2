<template>
	<div class="ex-modal">
		<div class="ex-content">
			<div class="ex-box">
				<div class="title">{{modal.title || '提示'}}</div>
				<div class="text" v-html="modal.text"></div>
				<div class="option">
					<span class="confirm" @click="confirm" >{{modal.confirm || '确定'}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
/**
* end： 结束日期 （必填）
* identity： 本地储存的标志 （必填）
* hide: true 隐藏 false 显示 （必填）
**/
export default{	
	props:['modal'],
	data () {
		return {
			notice: this.modal
		} 
	},
	created () {
		let time1 = new Date().getTime()
		let time2 = this.notice.end
		let identity = window.localStorage[this.notice.identity] ? true : false
		if((time1 >= time2) || identity){
			this.notice.hide = true
		}
	},
	methods: {
		confirm () {
			window.localStorage.setItem([this.notice.identity],true)
			this.$emit('confirm')
		}
	}
}
</script>
<style scoped>
.ex-modal{background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100%;top: 0;left: 0;right:0; bottom: 0; display: table; z-index: 7;}
.ex-modal .ex-content{display: table-cell;vertical-align: middle;padding: 0 5%;}
.ex-modal .ex-box{background: #fff;width: 100%;border-radius: 5px;}
.ex-modal .ex-box .title{text-align: center;font-size: 1.6rem;font-weight: 500;padding: 10px 0; border-bottom: 1px solid #eee; margin-bottom: 1rem;}
.ex-modal .ex-box .text{max-height: 200px;font-size: 1.4rem;padding:0 15px 15px;overflow-y: scroll;line-height: 25px;}
.ex-modal .ex-box .option{display: table;width: 100%;text-align: center;height: 48px;line-height: 48px;border-top: solid 1px #eee;font-size: 1.4rem;}
.ex-modal .ex-box .option span{display: table-cell;border-right: solid 1px #eee;}
.ex-modal .ex-box .option span:last-child{border-right: none;}
.ex-modal .ex-box .option span.cancle{color: #666;}
.ex-modal .ex-box .option span:active{background: #ebebeb;}
.ex-modal .ex-box .option .confirm{ color: #047dcb; font-size: 1.6rem;}
</style>

<style>
.ex-modal .ex-box .text p { text-indent: 2rem; padding-top: 0.5rem;}
.ex-modal .ex-box .text p a { margin: 0 0.5rem; color: #047dcb;}
.ex-modal .ex-box .text .inscribe {text-align: right; padding-top: 0.5rem;}
.ex-modal .ex-box .text .inscribe p{padding-top: 0;}
</style>