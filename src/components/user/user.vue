<template v-cloak>
	<div class="ex-user">
		<div class="ex-header">
			<div class="userdata">
				<img src="../../assets/images/head.png" alt="" v-if="avatar === 'default'">
				<img src="../../assets/images/girl01.png" alt="" v-if="avatar === 'girl01'">
				<img src="../../assets/images/girl02.png" alt="" v-if="avatar === 'girl02'">
				<img src="../../assets/images/girl03.png" alt="" v-if="avatar === 'girl03'">
				<img src="../../assets/images/girl04.png" alt="" v-if="avatar === 'girl04'">
				<img src="../../assets/images/girl05.png" alt="" v-if="avatar === 'girl05'">
				<img src="../../assets/images/boy01.png" alt="" v-if="avatar === 'boy01'">
				<img src="../../assets/images/boy02.png" alt="" v-if="avatar === 'boy02'">
				<img src="../../assets/images/boy03.png" alt="" v-if="avatar === 'boy03'">
				<img src="../../assets/images/boy04.png" alt="" v-if="avatar === 'boy04'">
				<img src="../../assets/images/boy05.png" alt="" v-if="avatar === 'boy05'">
				<div class="text">
					<p class="name" v-text="userinfo.userName"></p>
					<p class="userid">ID：{{userinfo.userCode}}</p>
				</div>
			</div>
			<span class="identity" v-show="isLev">{{identity}}</span>
			<span class="identity vip">
				<img src="../../assets/images/identity_VIP.png" alt="">
				{{identity}}
			</span>
		</div>
		<div class="ex-user-wrapper">
			<div class="ex-user-item">
				<ul>
					<router-link to="/personal" tag="li">
						<img src="../../assets/images/profile.png" alt="">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/message/1" tag="li">
						<img src="../../assets/images/news.png" alt="">
						<span>我的消息</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="" class="count" v-text="count" v-show="count!=0"></label>
					</router-link>
					<router-link to="/notice" tag="li">
						<img src="../../assets/images/notice.png" alt="">
						<span>公告</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-user-item">
				<ul>
					<li @click="toRealName">
						<img src="../../assets/images/renzhen.png" alt="">
						<span>实名认证</span>
						<i class="iconfont" v-show="!isRealName">&#xe606;</i>
						<label for="" v-show="isRealName">已认证</label>
					</li>
					<router-link to="/qrcode" tag="li">
						<img src="../../assets/images/QR_code.png" alt="">
						<span>我的二维码</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
				</ul>
			</div>
			<div class="ex-user-item">
				<ul>
					<router-link to="/settings" tag="li">
						<img src="../../assets/images/set.png" alt="">
						<span>设置</span>
						<i class="iconfont">&#xe606;</i>
					</router-link>
				</ul>
			</div>
		</div>
		<app-nav></app-nav>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import {Indicator, Toast } from 'mint-ui'
import appNav from "../common/tabbar.vue"
export default {
	data(){
		return{
			userinfo:'',
			count:'',
			modal: {
				text:'设置',
				fixed: false
			}
		}
	},
	computed:{
		isRealName () {
			return (this.userinfo.isRealName === '2'? true : false)
		},
		identity () {
			return (/^B/i.test(this.userinfo.userCode)?'E享商家':'E享会员');
		},
		isLev () {
			return (this.userinfo.userLev === '2'? true : false)
		},
		avatar () {
			if(!this.userinfo.logoImg){
				return 'default'
			}else{
				return this.userinfo.logoImg
			}
		}
	},
	created () {
		let _this = this

		 axios.all([
		 	axios.post('user/personal'),
        	axios.post('message/getCount')
		 ]).then(axios.spread(function (personal,count){
		 	_this.count = count.data.data.count;
		 	_this.userinfo = personal.data.data;
		 })).catch(function(){
			Toast('系统错误！')
		})
	},
	methods: {
		back(){
			this.$router.back();
		},
		toRealName () {
			if(this.isRealName){
				return
			}
			this.$router.push('/realname')
		}
	},
	components: {
		appNav
	},
}
</script>
<style scoped>
[v-cloak]{display: none;}
.ex-user{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;padding-bottom: 56px;}
.ex-header{	width: 100%;height: 25%;background: url(../../assets/images/pc_bg.jpg) no-repeat;background-position: 50%;background-size: cover;zoom: 1 !important;position: relative;}
.ex-header .userdata{position: absolute;top: 50%;margin: -3rem 0 0 1rem;}
.ex-header .userdata img{border-radius: 50%;border: solid #fff 4px;width: 6rem;float: left;background: #fff}
.ex-header .text{float: left;padding: 1rem 0 0 1rem;font-size: 1.6rem;color: rgba(255,255,255,0.5);}
.ex-header .text .name{font-size: 2.2rem;color: #fff !important;}
.ex-header .identity{display: inline-block;width: 10rem;background: #fff;text-align: center;text-indent: 2em;border-radius: 20px 0 0 20px;height: 32px;line-height: 32px;position: absolute;top: 50%;margin-top: -18px;right: 0px;background: rgb(170,231,255);color: rgb(12,135,213);font-size: 1.6rem;}
.ex-header .vip{background: rgb(245,174,38);color: #fff;}
.ex-header .vip img{width: 26px;position: absolute;top: 50%;margin-top: -13px;left: 3px;}

.ex-user-item:nth-child(1){margin-top: 0px;}
.ex-user-item{margin-top: 18px;padding: 0 0 0 15px;background: #fff;}
.ex-user-item ul{list-style-type: none;display: block;}
.ex-user-item ul li{min-height: 31px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 31px;border-bottom: solid 1px #e5e5e5;position: relative;}
.ex-user-item ul li:last-child{border: none;}
.ex-user-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-user-item ul li img{width: 30px;position: absolute;}
.ex-user-item ul li span{padding-left: 35px;}
.ex-user-item ul li label{float: right;color: #aaafb6;padding: 0 15px 0 0;}
label.count{border-radius: 50%;background: rgb(255,84,0);min-width: 16px;height: 16px;padding: 0 !important;margin-top: 5px;text-align: center;line-height: 18px;color: #fff!important;font-size: 1rem !important;border: solid 2px rgb(255,84,0);}
</style>