<template>
	<div class="no-data" :class="{hide:hasdata}">
		<img src="../../assets/images/nodata.png" alt="">
		您还没有数据哦~
	</div>
</template>
<script>
export default{	
	props:['hasdata'],
}
</script>
<style scoped>
.no-data{width: 100%;text-align: center;color: #999;line-height: 30px;}
.no-data img{display: block;width: 150px;margin:10% auto auto auto;}
.hide{display: none;}
</style>