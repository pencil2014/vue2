<template>
	<div class="ex-modal" v-show="!modal.hide">
		<div class="ex-content">
			<div class="ex-box">
				<div class="title">{{modal.title || '提示'}}</div>
				<div class="text" v-html="modal.text"></div>
				<div class="option">
					<span class="confirm" @click="confirm">{{modal.confirm || '确定'}}</span>
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
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-modal{background: rgba(0,0,0,0.5);position: fixed;width: 100%;height: 100%;top: 0;left: 0;display: table;}
.ex-modal .ex-content{display: table-cell;vertical-align: middle;padding: 0 12%;}
.ex-modal .ex-content .ex-box{background: #fff;width: 100%;border-radius: 5px;}
.ex-modal .ex-content .ex-box .title{text-align: center;font-size: 1.6rem;font-weight: 600;padding: 10px 0;}
.ex-modal .ex-content .ex-box .text{max-height: 200px;font-size: 1.4rem;padding: 0 15px 30px 15px;overflow-y: scroll;line-height: 25px;}
.ex-modal .ex-content .ex-box .option{display: table;width: 100%;text-align: center;height: 48px;line-height: 48px;border-top: solid 1px #d6d6d6;font-size: 1.4rem;}
.ex-modal .ex-content .ex-box .option span{display: table-cell;border-right: solid 1px #d6d6d6;}
.ex-modal .ex-content .ex-box .option span:last-child{border-right: none;}
.ex-modal .ex-content .ex-box .option span.cancle{color: #666;}
.ex-modal .ex-content .ex-box .option span:active{background: #ebebeb;}
</style>