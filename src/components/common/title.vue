<template>
	<div class="ex-header" :class="{fixed:title.fixed}">
		<router-link :to="'/'+title.path">
			<i class="iconfont" >&#xe605;</i>
		</router-link>
		<span>{{title.text}}</span>
	</div>
</template>
<script>
export default{	
	props:['title'],
}
</script>
<style scoped>
.ex-header{height: 48px; background-color: #2eadff;color: #fff; text-align: center;font-size: 2rem; position: relative;display: block; line-height: 30px;}
.ex-header a{ position: absolute; left: 10px; top: 9px; bottom: 0; color: #fff;}
.ex-header .iconfont{font-size: 3rem;}
.ex-header span{ display: block;padding: 9px 10px;}
.fixed{position: fixed;width: 100%;left: 0;top: 0;}
</style>