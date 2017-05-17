<template>
	<div class="ex-batch">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
	</div>
</template>

<script>
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal:{
				text:'批量报单',
				fixed: false,
			}
		}
	},
	components: {
		HeadTitle,
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	}
}	
</script>

<style scoped>
	
</style>