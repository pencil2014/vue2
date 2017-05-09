<template>
	<div class="ex-shop-category">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-shop-category-cnt" >
			<ul>
				<li v-for='item in shopClassification' :key='item.id' @click='settitle(item.id)'>{{item.name}}</li>
			</ul>
			<!-- <mt-index-list>
			  <mt-index-section :index="key" v-for='(value, key) in indexShopClassification' :key='key' v-if='value.length > 0'>
			    <mt-cell :title="i.name"  v-for='i in value' :key='i.id' @click.native='settitle(i.id)'></mt-cell>
			  </mt-index-section>
			</mt-index-list> -->
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import {  Toast, Indicator } from 'mint-ui' // IndexList, IndexSection,
import HeadTitle from '../common/title.vue'
// import pinyin from 'js-pinyin'
export default {
	data () {
		return {
			modal: {
				text:'全部分类',
				fixed: true
			},
			shopClassification: []
			// indexShopClassification: {
			// 	A:[],
			// 	B:[],
			// 	C:[],
			// 	D:[],
			// 	E:[],
			// 	F:[],
			// 	G:[],
			// 	H:[],
			// 	I:[],
			// 	J:[],
			// 	K:[],
			// 	L:[],
			// 	M:[],
			// 	N:[],
			// 	O:[],
			// 	P:[],
			// 	Q:[],
			// 	R:[],
			// 	S:[],
			// 	T:[],
			// 	U:[],
			// 	V:[],
			// 	W:[],
			// 	X:[],
			// 	Y:[],
			// 	Z:[]
			// }
		}
	},
	components: {
		HeadTitle,
	},
	// watch: {
		// shopClassification () {
		// 	let _this = this
		// 	if (!!this.shopClassification && this.shopClassification.length > 0) {
		// 		this.shopClassification.forEach(function(item,index){
		// 			let x = pinyin.getCamelChars(item.name).charAt(0)
		// 			_this.indexShopClassification[x].push(item)
		// 		})
		// 	}
		// }
	// },
	methods: {
		back () {
			this.$router.go(-1)
		},
		settitle (id) {
			this.$router.push({name:'Classify', params: { id: id}})
		},
	},
	created () {
		Indicator.open({
		  text: '数据加载中...',
		  spinnerType: 'fading-circle'
		})
		let _this = this
		axios.post('shopClassification/list',qs.stringify({}))
		.then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.shopClassification = res.data.data
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Indicator.close()
			Toast('网络请求超时！')
		})
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-shop-category-cnt{margin-top: 4.5rem;}
.ex-shop-category-cnt li{ padding: 1rem 0; border-bottom: 1px solid #eee; font-size: 1.4rem; margin-left: 1rem; }
</style>