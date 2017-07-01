<template>
	<div class="ex-username">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">原密码</label>
				<div class="ex-field-value">
					<input type="password" placeholder="请输入原密码" maxlength="10" v-model.trim="oldpsw">
				</div>
			</div>
		</div>
		<div class="ex-field">
			<div class="ex-field-wrapper">
				<label class="ex-field-title">新密码</label>
				<div class="ex-field-value">
					<input type="password" placeholder="请输入新密码" maxlength="10" v-model.trim="newpsw">
				</div>
			</div>
			<div class="ex-field-wrapper">
				<label class="ex-field-title">确认密码</label>
				<div class="ex-field-value">
					<input type="password" placeholder="请再次确认新密码" maxlength="10" v-model.trim="confirmpsw">
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
import md5 from "blueimp-md5"
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
import { MessageBox,Indicator,Toast} from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'修改密码',
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
	        oldpsw:'',
	        newpsw:'',
	        confirmpsw:'',
			submitBtn: false
		}
	},
	components: {
		HeadTitle,
		Btn,
	},
	computed: {
		disable () {
			let rule1 = !this.oldpsw || !this.newpsw || !this.confirmpsw;
			if(rule1){
				return true;
			}else{
				return false;
			}
		}
	},
	methods: {
		back () {
			this.$router.back();
		},
		submit () {
			let _this = this;
			if(_this.disable){
				return;
			}
			if(_this.oldpsw === _this.newpsw){
				Toast({message: '新密码不能与原密码相同'}); 
				return; 
			}
			if(!/^.{6,20}$/.test(_this.newpsw)){
				Toast({message: '密码只能在6~20位之间'}); 
				return; 
			}
			if(_this.newpsw !== _this.confirmpsw){
				Toast({message: '两次输入的新密码不一致'}); 
				return; 
			}
			if(_this.submitBtn){
				return
			}
			_this.submitBtn = true;
			axios.post('user/updatePasswod',qs.stringify({
				oldPassword: md5(_this.oldpsw),
				password: md5(_this.confirmpsw)
			})).then(function(res){
				if (res.data.code === '10000') {
					Indicator.open({
					  text: '正在退出登录...',
					  spinnerType: 'fading-circle'
					})
					axios.post('user/loginOut',qs.stringify({}))
					.then(function(res){
						Indicator.close()
						if(res.data.code === '10000'){
							window.localStorage.removeItem('token')
							window.localStorage.removeItem('usertype')
							Toast('修改成功，请重新登陆！')
							_this.$router.push('/login')
						}else{
							Toast(res.data.msg)
						}
					}).catch(function(){
						Indicator.close()
						Toast('连接失败，请检查网络是否正常!')
					})
				} else {
					_this.submitBtn = false;
					Toast({message: res.data.msg});
				}
			}).catch(function(){
					_this.submitBtn = false;
					Toast('连接失败，请检查网络是否正常!')
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
.ex-field-wrapper .ex-field-value input{display: block;width: 65%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}

.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
</style> 