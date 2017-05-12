<template v-cloak>
	<div class="ex-user">
		<div class="ex-header">
			<div class="wrapper">
				<router-link to="/personal" tag="span" class="m1">
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
				</router-link>
				<span class="m2" v-if="userinfo.userName">
					{{userinfo.userName}} <br>
					<label for="" class="usercode"> ID: {{userinfo.userCode}}</label>
				</span>
				<span class="m2" v-if="!userinfo.userName">
					{{userinfo.userCode}} <br>
				</span>
				<span class="m3" :class="{'vip': isLev}">
					<label for="">
						{{identity}}
					</label>
				</span>
			</div>
		</div>
		<div class="ex-user-wrapper">
			<div class="ex-user-item">
				<ul>
					<router-link to="/personal" tag="li">
						<img src="../../assets/images/profile.png" alt="">
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<!-- <router-link to="/businessinfo" tag="li" v-if="isShop">
						<img src="../../assets/images/business.png" alt="">
						<span>商家申请资料</span>
						<i class="iconfont">&#xe606;</i>
					</router-link> -->
					<!-- <router-link to="/display1" tag="li" v-if="isShop">
						<img src="../../assets/images/business.png" alt="">
						<span>店铺管理</span>
						<i class="iconfont">&#xe606;</i>
					</router-link> -->
					<router-link to="/message/1" tag="li">
						<img src="../../assets/images/news.png" alt="">
						<span>我的消息</span>
						<i class="iconfont">&#xe606;</i>
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
						<i class="iconfont" v-if="checkRealName.status !== '2'">&#xe606;</i>
						<label for="">{{realnamestatus}}</label>
					</li>
					<router-link to="/qrcode" tag="li">
						<img src="../../assets/images/QR_code.png" alt="">
						<span>我的二维码</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<!-- <router-link to="/qrcode2" tag="li" v-if="isShop">
						<img src="../../assets/images/pay.png" alt="">
						<span>商家收款二维码</span>
						<i class="iconfont">&#xe606;</i>
					</router-link> -->
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
import {Indicator, Toast ,MessageBox} from 'mint-ui'
import appNav from "../common/tabbar.vue"
export default {
	data(){
		return{
			userinfo:'',
			count:'',
			checkRealName:'',
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
		realnamestatus () {
			let _index = this.checkRealName.status
			let arr = ['认证失败','认证中','已认证','未认证','需认证升级']
			return arr[_index]
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
		},
		isShop () {
			return (/^B/i.test(this.userinfo.userCode)? true : false);
		}
	},
	created () {
		let _this = this
		 axios.all([
		 	axios.post('user/personal'),
        	axios.post('message/getCount'),
        	axios.post('verify/checkRealName'),
		 ]).then(axios.spread(function (personal,count,realname){
		 	if(personal.data.code === '10000' && count.data.code === '10000' && realname.data.code === '10000'){
		 		_this.userinfo = personal.data.data;
		 		_this.count = count.data.data.count;
		 		_this.checkRealName = realname.data.data
		 	}else{
		 		Toast('系统错误')
		 	}
		 })).catch(function(){
			Toast('网络请求超时！')
		})
	},	
	methods: {
		back(){
			this.$router.back();
		},
		toRealName () {
			let status = this.checkRealName.status
			if(status === '0'){
				this.$router.push('/realname/detail')
			}else if(status === '1'){
				this.$router.push('/realname/detail')
			}else if(status === '2'){
				return
			}
			else{
				this.$router.push('/realname')
			}
			
		}
	},
	beforeRouteLeave (to,from,next) {
		let path = window.localStorage.getItem('integralPath')
		if(to.path !== path && to.path === '/index'){
			next(path)
		}else{
			next()
		}
	},
	components: {
		appNav
	},
}
</script>
<style scoped>
[v-cloak]{display: none;}
.ex-user{width: 100%;background: #f4f5f7;color: #212a32;padding-bottom: 106px;}

.ex-header{	width: 100%;height: 200px;background: url(../../assets/images/pc_bg.jpg) no-repeat;background-size: cover;position: relative;}
.ex-header .wrapper{width: 100%;height: 72px;position: absolute; top: 64px;}
.ex-header .wrapper span{display: inline-block;vertical-align: middle;}
.ex-header .wrapper .m1{padding:0 10px 0 15px;}
.ex-header .wrapper .m1 img{width: 62px;height: 62px;border:solid 2px #fff;border-radius: 50%;background: #fff;}
.ex-header .wrapper .m2{line-height: 25px;color: #fff;font-size: 1.8rem;text-align: left;}
.ex-header .wrapper .m2 .usercode{font-size: 1.4rem;color: rgba(226, 241, 251 ,.8);}
.ex-header .wrapper .m3{float: right;background-color: #add6f1;border-radius: 20px 0 0 20px;width: 104px;height: 36px;text-align: right;font-size: 1.6rem;color: #4e92e6;margin-top: 18px;line-height: 36px;}
.ex-header .wrapper .m3 label{;padding-right: 10px;}
.ex-header .wrapper .vip{background-color: #ffa132;color: #fff;}
.ex-header .wrapper .vip label:before{content: '';display: inline-block;width: 28px;height: 28px;background: url(../../assets/images/identity_VIP.png)no-repeat;background-size: 100%;vertical-align: top;margin-top: 4px;}

.ex-user-item:nth-child(1){margin-top: 0px;}
.ex-user-item{margin-top: 18px;padding: 0 0 0 15px;background: #fff;}
.ex-user-item ul{list-style-type: none;display: block;}
.ex-user-item ul li{min-height: 31px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 31px;border-bottom: solid 1px #e5e5e5;position: relative;}
.ex-user-item ul li:last-child{border: none;}
.ex-user-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-user-item ul li img{width: 30px;vertical-align: middle;}
.ex-user-item ul li span{}
.ex-user-item ul li label{float: right;color: #aaafb6;padding: 0 15px 0 0;}
label.count{border-radius: 50%;background: rgb(255,84,0);min-width: 16px;height: 16px; line-height: 16px; padding: 0 !important;margin-top: 5px;text-align: center;line-height: 18px;color: #fff!important;font-size: 1rem !important;border: solid 2px rgb(255,84,0);}
</style>