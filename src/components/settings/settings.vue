<template>
	<div class="ex-settings">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-settings-list">
			<!-- <div class="ex-settings-item" v-show="!isShop">
				<ul>
					<router-link to="/personal" tag="li">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
				</ul>
			</div>
			<div class="ex-settings-item" v-show="isShop">
				<ul>
					<router-link to="/personal" tag="li">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
					<router-link to="/index" tag="li">
						<span>商家信息</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div> -->
			<!-- <div class="ex-settings-item">
				<ul>
					<router-link to="/qrcode" tag="li">
						<span>推荐二维码和链接</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<li @click="toRealName">
						<span>实名认证</span>
						<i class="iconfont" v-show="!isRealName">&#xe606;</i>
						<label for="" v-show="isRealName">已认证</label>
					</li>
				</ul>
			</div> -->
			<div class="ex-settings-item">
				<ul>
					<router-link to="/changepassword" tag="li">
						<span>修改密码</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<!-- <router-link to="/twopassword" tag="li">
						<span>设置二级密码</span>
						<i class="iconfont">&#xe606;</i>
						<label for="" v-if="userinfo.twoPwd === '2'">未设置</label>
					</router-link> -->
					<router-link to="/alterphone" tag="li">
						<span>更换注册手机</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/businessinfo" tag="li" v-if="isShop">
						<span>商家申请资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item">
				<ul>
					<router-link to="/guide" tag="li">
						<span>使用指南</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<!-- <router-link to="/feedback" tag="li">
						<span>留言反馈</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link> -->
				 	<router-link to="/version" tag="li">
						<span>关于我们</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item logout">
				<ul>
					<li v-on:click="logout">
						<span>退出登录</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			userinfo:'',
			modal: {
				text:'设置',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle
	},
	computed:{
		isRealName () {
			return (this.userinfo.isRealName === '2'? true : false)
		},
		isShop () {
			return (/^B/i.test(this.userinfo.userCode)?true:false);
		}
	},
	created () {
		let _this = this 
		// 获取用户详情
		axios.post('/exsd-web/user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.userinfo = res.data.data;
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
				Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
		logout(){
			let _this = this
			MessageBox({
				title:'提示',
				message:'是否退出登录?',
				showConfirmButton:true,
				showCancelButton:true,
				confirmButtonText:'确定',
				cancelButtonText:'取消',
			}).then(action =>{
				if(action === "confirm"){
					Indicator.open({
					  text: '正在退出登录...',
					  spinnerType: 'fading-circle'
					})
					axios.post('/exsd-web/user/loginOut',qs.stringify({}))
					.then(function(res){
						Indicator.close()
						if(res.data.code === '10000'){
							window.localStorage.removeItem('token')
							window.localStorage.removeItem('usertype')
							_this.$router.push('/login')
						}else{
							Toast(res.data.msg)
						}
					}).catch(function(){
						Indicator.close()
						Toast('连接失败，请检查网络是否正常!')
					})
				}
			});
		},
		toRealName () {
			if(this.isRealName){
				return
			}
			this.$router.push('/realname')
		}
	}
}
</script>
<style scoped>
.ex-settings{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-settings-list{padding-bottom: 56px;}
.ex-settings-list .ex-settings-item{margin-top: 15px; padding: 0 0 0 15px;background: #fff;}
.ex-settings-list .ex-settings-item ul{list-style-type: none;display: block;}
.ex-settings-list .ex-settings-item ul li{min-height: 30px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
.ex-settings-list .ex-settings-item ul li:last-child{border: none;}
.ex-settings-list .logout{text-align: center;padding: 0px;font-size: 1.6rem;color: #f0544d !important;}
.ex-settings-list .ex-settings-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-settings-list .ex-settings-item ul li label{float: right;color: #aaafb6;padding: 0 15px 0 0;}
</style>