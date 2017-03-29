<template>
	<div class="ex-feedback">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="textarea">
			<textarea name="feedback" id="" cols="30" rows="10" wrap=wrap placeholder="请在此留下您的宝贵意见和建议，谢谢！" v-model.trim="message"></textarea>
		</div>
		
		<Btn
			text="提交"  
			:disableBtn="disable"
			@callback="submit"
		></Btn>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
export default {
	data(){
		return{
			message:'',
			modal: {
				text:'留言反馈',
				fixed: false
			}
		}
	},
	computed:{
		disable () {
			if(!this.message){
				return true
			}else{
				return false
			}
		},
	},
	methods: {
		back(){
			this.$router.back();
		},
		submit(){

		}
	},
	components: {
		HeadTitle,
		Btn
	},
}
</script>
<style scoped>
.ex-feedback{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;overflow-x: hidden;	}
.textarea{width: 100%;margin-top: 20px;overflow-x: hidden;}
textarea[name="feedback"]{border: none;outline:none;color: #212a32;width: 100%;}
</style>