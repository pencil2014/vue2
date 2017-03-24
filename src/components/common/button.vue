<template>
	<div class="ex-button">
		<button @click="callback" :class="{disableBtn:disableBtn}">{{text}}</button>
	</div>
</template>	
<script>
export default{	
	props:['text','disableBtn'],
	methods: {
		callback () {
			this.$emit('callback')
		}
	}
}
</script>
<style scoped>
.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
</style>