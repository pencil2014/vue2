<template>
	<div class="no-data" :class="{hide:hasdata}">
		<img src="../../assets/images/nodata.png" alt="">
	</div>
</template>
<script>
export default{	
	props:['hasdata'],
}
</script>
<style scoped>
.no-data{width: 100%;}
.no-data img{display: block;width: 150px;margin:10% auto auto auto;}
.hide{display: none;}
</style>