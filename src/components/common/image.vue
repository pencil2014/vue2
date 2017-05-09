<template>
	<div class="ex-image" @click='hide'>
		<div class="ex-img-cnt">
			<img :src="imageData.url" alt="">
		</div>
	</div>
</template>

<script>
export default {
	props: ['imageData'],
	data () {
		return {

		}
	},
	methods: {
		hide () {
			this.$emit('hideImg')
		}
	}
}
</script>

<style scoped>
.ex-image {position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); width: 100%; height: 100%; z-index: 7;}
.ex-img-cnt { width: 80%; height: 100%;  margin: auto; position: relative; }
.ex-img-cnt img { max-width: 100%; height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
</style>