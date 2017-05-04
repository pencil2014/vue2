<template>
	<div class="ex-header" :class="{fixed:title.fixed}">
		<a href="javascript:void(0);" @click="callback">
			<i class="iconfont" >&#xe605;</i>
			<label>返回</label>
		</a>
		<span>{{title.text}}</span>
	</div>
</template>
<script>
export default{	
	props:['title'],
	methods: {
		callback () {
			this.$emit('callback')
		}
	}
}
</script>
<style scoped>
.ex-header{height: 4.5rem; background-color: rgb(255,255,255);color: rgb( 33,42,50); text-align: center;position: relative;display: block; line-height: 4.5rem;box-shadow:1px 1px 0px #ebebeb;z-index: 6;}
.ex-header a{ position: absolute;left: 0.5rem;top:0;color: rgb(4,125,203);}
.ex-header i{font-size: 2rem;}
.ex-header label{font-size: 1.6rem;display: block;float: right;}
.ex-header span{display: block;font-size: 1.6rem; }
.fixed{position: fixed;width: 100%;left: 0;top: 0;}
</style>