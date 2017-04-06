<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">用户名</label>
				<div class="ex-field-value">
					<input type="text" placeholder="请输入您的昵称" maxlength="10" v-model.trim="username">
				</div>
			</div>
		</div>
		<Btn 
			text="保存"  
			:disableBtn="disable"
			@callback="save"
		>
		</Btn>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import {Indicator,Toast } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'用户名',
				fixed: false,
			},
			username:'',
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
		    return (this.username) ? false : true
		}
	},
	created () {
		let _this = this;
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.username = res.data.data.userName;

			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('系统错误！')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		save () {
			let _this = this;
			if(_this.username === ""){
				return;
			}
			if(_this.submitBtn === true){
				return
			}
			_this.submitBtn = true
			// 改变用户资料
			axios.post('user/update',qs.stringify({
				userName: _this.username,
			}),_this.config).then(res =>{
				Indicator.close();
				_this.submitBtn = false
				if (res.data.code === '10000') {
					_this.$router.push('/personal');
					Toast('修改成功')
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Indicator.close();
					_this.submitBtn = false
					Toast('系统错误！')
			})
		}
	}
}
</script>
<style scoped>
.ex-username{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-top: 16px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 30%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input{display: block;width: 65%;height: 30px;border: none;}
</style> 