<template>
	<div class="ex-message">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="tabbar">
			<div class="m1">消息</div>
			<div class="m2">系统</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			userinfo:'',
			modal: {
				text:'我的消息',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle
	},
	methods: {
		back(){
			this.$router.back();
		},
	}
}
</script>
<style scoped>
.ex-message{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
</style>