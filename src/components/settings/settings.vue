<template>
	<div class="ex-settings">

		<HeadTittle :title="modal"></HeadTittle>
		<div class="ex-settings-list">
			<div class="ex-settings-item" v-show="userType == 'M'">
				<ul>
					<router-link to="/index" tag="li">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
				</ul>
			</div>
			<div class="ex-settings-item" v-show="userType == 'B'">
				<ul>
					<router-link to="/index" tag="li">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
					<router-link to="/index" tag="li">
						<span>商家信息</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item">
				<ul>
					<router-link to="/index" tag="li">
						<span>推荐二维码和链接</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/index" tag="li">
						<span>实名认证</span>
						<i class="iconfont" v-show="!isRealName">&#xe606;</i>
						<label for="" v-show="isRealName">已认证</label>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item">
				<ul>
					<router-link to="/index" tag="li">
						<span>修改密码</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/index" tag="li">
						<span>更换注册手机</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item">
				<ul>
					<router-link to="/index" tag="li">
						<span>使用指南</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				 	<router-link to="/index" tag="li">
						<span>版本信息</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-settings-item logout">
				<ul>
					<router-link to="/index" tag="li">
						<span>退出登录</span>
					</router-link>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
import HeadTittle from '../common/title.vue'
export default {
	data(){
		return{
			isRealName:'',
			userType:'',
			modal: {
				text:'设置',
				path:'index',
				fixed: false
			}
		}
	},
	created () {
		let _this = this 
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				let userinfo = res.data.data;
				let userCode = userinfo.userCode;
				let isRealName = userinfo.isRealName;
				_this.userType = userCode.indexOf('M') === -1 ? 'B' : 'M';
				_this.isRealName = isRealName === '2' ?  true : false;
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
		})
	},
	components: {
		HeadTittle
	}
}
</script>
<style scoped>
.ex-settings{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-settings-list{padding-bottom: 56px;}
.ex-settings-list .ex-settings-item{margin-top: 15px; padding: 0 0 0 15px;background: #fff;}
.ex-settings-list .ex-settings-item ul{list-style-type: none;display: block;}
.ex-settings-list .ex-settings-item ul li{min-height: 30px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
.ex-settings-list .ex-settings-item ul li:active{background: #ebebeb}
.ex-settings-list .ex-settings-item ul li:last-child{border: none;}
.ex-settings-list .logout{text-align: center;padding-right: 0px;font-size: 1.6rem;color: #f0544d !important;}
.ex-settings-list .ex-settings-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-settings-list .ex-settings-item ul li label{float: right;color: #aaafb6;padding: 0 15px 0 0;}
</style>