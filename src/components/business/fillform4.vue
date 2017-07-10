<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disable () {
		
		},
	},
	created () {
	},
	methods: {
		back () {
			this.$router.back();
		},
		save () {
			this.$router.push('/fillform/step3')
		}
	}
}
</script>
<style scoped>
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;}
</style>

