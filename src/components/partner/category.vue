<template>
	<div class="ex-shop-category">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-shop-category-cnt" >
			<mt-index-list>
			  <mt-index-section index="A">
			    <mt-cell title="Aaron"></mt-cell>
			    <mt-cell title="Alden"></mt-cell>
			    <mt-cell title="Austin"></mt-cell>
			  </mt-index-section>
			  <mt-index-section index="B">
			    <mt-cell title="Baldwin"></mt-cell>
			    <mt-cell title="Braden"></mt-cell>
			  </mt-index-section>
			  ...
			  <mt-index-section index="Z">
			    <mt-cell title="Zack"></mt-cell>
			    <mt-cell title="Zane"></mt-cell>
			  </mt-index-section>
			</mt-index-list>
		</div>
	</div>
</template>

<script>
import { IndexList, IndexSection } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal: {
				text:'全部分类',
				fixed: true
			},
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
.ex-shop-category-cnt{margin-top: 4.5rem;}	
</style>