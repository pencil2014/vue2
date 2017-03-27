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
.ex-header{height: 58px; background-color: rgb(255,255,255);color: rgb( 33,42,50); text-align: center;position: relative;display: block; line-height: 30px;box-shadow:1px 1px 0px #ebebeb;z-index: 10001;}
.ex-header a{ position: absolute;left: 5px;top:14px;color: rgb(4,125,203);}
.ex-header .iconfont{font-size: 3rem;}
.ex-header label{font-size: 1.8rem;display: block;float: right;}
.ex-header span{display: block;padding: 14px 10px;font-size: 2rem; }
.fixed{position: fixed;width: 100%;left: 0;top: 0;}
</style>