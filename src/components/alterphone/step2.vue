<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">新手机</label>
				<div class="ex-field-value">
					<input type="text" maxlength="10"  placeholder="请输入新手机号">
				</div>
			</div>
			<div class="ex-field-wrapper">
				<label class="ex-field-title">短信验证码</label>
				<div class="ex-field-value">
					<input type="text" placeholder="请输入验证码" maxlength="10">
					<input type="button" name="" value="短信验证码">
				</div>
			</div>
		</div>
		<Btn 
			text="提交"  
			:disableBtn="disable"
			@callback="submit"
		>
		</Btn>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import { MessageBox,Indicator } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'更换注册手机',
				fixed: false,
			},
			config:{
	            onUploadProgress (progressEvent) {
	              	Indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
	            }
	        },
			submitBtn: false
		}
	},
	components: {
		HeadTitle,
		Btn,
	},
	computed: {
		disable () {
		    return 
		}
	},
	created () {
		let _this = this;
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {

			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
			MessageBox('提示', '系统出错了，正在修复中...')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		submit () {
			
		}
	}
}
</script>
<style scoped>
.ex-username{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-top: 16px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 30%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 65%;height: 30px;border: none;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
</style> 