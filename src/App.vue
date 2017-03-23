<template>
  <div id="app">
  	<keep-alive :include="/index|business/">
    	<router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
	data () {
		return {}
	}
}
</script>

<style>
@import url('./assets/css/common.css');
</style>
