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
import axios from "axios"
import qs from "qs"
import { IndexList, IndexSection } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal: {
				text:'全部分类',
				fixed: true
			},
			shopClassification: []
		}
	},
	components: {
		HeadTitle,
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	},
	created () {
		let _this = this
		axios.post('shopClassification/list',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.shopClassification = res.data.data
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('网络请求超时！')
		})
	}
}	
</script>

<style scoped>
.ex-shop-category-cnt{margin-top: 4.5rem;}	
</style>