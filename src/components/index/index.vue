<template>
	<div class="ex-index">
		<div class="ex-index-box">
			<div class="ex-index-toplink">
				<router-link to="/message"><i class='iconfont'>&#xe606;</i></router-link>
				<router-link to="/set"><i class='iconfont'>&#xe651;</i></router-link>
			</div>
			<div class="ex-index-userinfo">
				<div class="ex-index-head">
					<div class="ex-index-img">
						<a href="javascript:;" @click="gotouser">
							<img :src="userinfo.logoImg" alt="header" v-show="userinfo.logoImg">
						</a>
						<span>E享会员</span>
					</div>
					<p class="name">{{userinfo.userName}}</p>
					<p class="id">ID:{{userinfo.userCode}}</p>
				</div>
				<div class="ex-index-data">
					<ul>
						<li><b>账户余额:</b><span>{{userinfo.overMoney | checknum}}</span></li>
						<li><b>提现金额:</b><span>{{userinfo.freezeMoney | checknum}}</span></li>
						<li><b>E积分:</b><span>{{userinfo.integralA}}</span></li>
						<li><b>享积分:</b><span>{{userinfo.integralB}}</span></li>
						<li><b>平台商家数:</b><span>{{sysData.businessNum}}</span></li>
						<li><b>昨日交易总额:</b><span>{{sysData.yesterdayMoney}}</span></li>
						<li><b>E享比例:</b><span>{{sysData.eProportion}}</span></li>
						<li><b>昨日分享平均值:</b><span>{{sysData.yesterdayMoney}}</span></li>
					</ul>
				</div>
			</div>

		</div>
		<div class="ex-index-menu">
			<ul>
				<li><router-link to="/index"><i class="iconfont m1">&#xe631;</i><span>消费记录</span></router-link></li>
				<li><router-link to="/index"><i class="iconfont m2">&#xe604;</i><span>享积分操作</span></router-link></li>
				<li><router-link to="/index"><i class="iconfont m3">&#xe680;</i><span>积分明细</span></router-link></li>
				<li><router-link to="/index"><i class="iconfont m4">&#xe94b;</i><span>资金明细</span></router-link></li>
				<li><router-link to="/index"><i class="iconfont m5">&#xe6be;</i><span>转存银行</span></router-link></li>
				<li><router-link to="/index"><i class="iconfont m6">&#xe603;</i><span>我的推荐</span></router-link></li>
				<li v-show='userVipStatus.auditStatus !=="2"'><a href="javascript:;" @click='gotovip'><i class="iconfont m7">&#xe642;</i><span>升级会员</span></a></li>
				<li v-show='isConstomer==="false"'><router-link to="/index"><i class="iconfont m8">&#xe600;</i><span>商家申请</span></router-link></li>
			</ul>
		</div>
		<div class="ex-index-service" @click='showcustomer'><i class="iconfont">&#xe612;</i></div>
		<div class="ex-customer" v-show='customerService' @click.stop="hidecustomer">
			<div class="ex-customer-cnt" @click.stop=''>
				<div class="ex-customer-cnt-item">
					<h3>客服电话</h3>
					<p><a href="tel:075523300320">0755-23300320</a></p>
					<p><a href="tel:4006543888">4006543888</a></p>
				</div>
				<div class="ex-customer-cnt-item">
					<h3>客服QQ</h3>
					<p><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512825&version=1&src_type=web&web_src=oicqzone.com">2852512825</a></p>
					<p><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512824&version=1&src_type=web&web_src=oicqzone.com">2852512824</a></p>
				</div>
				<div class="ex-customer-cnt-item">
					<h3>服务时间</h3>
					<p>09:00 ― 18:00</p>
				</div>
				<div class="ex-customer-close" @click.stop="hidecustomer">关闭</div>
			</div>
		</div>
		<app-nav></app-nav>
	</div>	
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
import appNav from "../common/nav.vue"
export default {
	data () {
		return {
			userinfo: {
				userTypeId: '',
        shopsStatus:'',
        userCode: '',
        userName: '',
        phone: '',
        sex: '',
        brithday: '',
        realName: '',
        userLev: '',
        isRealName: '',
        integral: '',
        integralA: '',
        integralB: '',
        overMoney: '',
        freezeMoney: '',
        logoImg: '',
        twoPwd: ''
			},
		  sysData: {
		  	 businessNum: '',
		  	 yesterdayMoney: '',
		  	 totalShareMoney: '',
		  	 eProportion: '',
		  	 jeProportion: ''
		  },
		  userVipStatus: {},
		  isConstomer: false,
		  customerService: false
		}
	},
	components: {
		appNav
	},
	methods: {
		gotouser () {
			this.$router.push('/index')
		},
		gotovip () {
			let _this = this
			if (this.userVipStatus.auditStatus === '0') {
				MessageBox.alert('VIP会员审核失败！').then(action => {
					_this.$router.push('/index')
				})	
			} else if(this.userVipStatus.auditStatus == '1') {
				MessageBox('提示', 'VIP会员升级中,请稍后...')
			} else {
				this.$router.push('/index')
			}
		},
		showcustomer () {
			this.customerService = true
		},
		hidecustomer () {
			this.customerService = false
		}
	},
	filters: {
		checknum (value) {
			return value ? value : 0
		}
	},
	watch: {
		userinfo () {
			if (this.userinfo.phone) {
				let _this = this
				// 获取用户是否为商家
				axios.post('shop/isShopp',qs.stringify({phone: this.userinfo.phone})).then(function(res){
				if (res.data.code === '10000') {
							_this.isConstomer = res.data.msg
						} else {
						}
					}).catch(function(){})
			}
		}
	},
	created () {
		let _this = this
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.userinfo = res.data.data
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
		})
		// 获取平台信息
		axios.post('user/sysIndex',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.sysData = res.data.data
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
		})
		//获取会员审核详情信息
		axios.post('user/examine',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.userVipStatus = res.data.data
			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
		})
	},
	monuted () {
	}

}	
</script>

<style scoped>
.ex-index {padding-bottom: 2rem;}
.ex-index-box { background-color: #2eadff; padding:0.2rem; }
.ex-index-toplink { height: 1rem; text-align: right;}
.ex-index-toplink a{color: #fff; }
.ex-index-toplink a i{ font-size: 0.8rem; margin-left: 0.4rem;}
.ex-index-userinfo{overflow: auto; padding-bottom: 0.2rem; }
.ex-index-head { float: left; width: 30%;  text-align: center; padding-top: 1rem;}
.ex-index-data { margin-left: 35%;}
.ex-index-img {margin-bottom: 0.2rem;}
.ex-index-img a{background: #fff url('../../assets/images/head.png') center; -webkit-background-size: cover;
background-size: cover; display: block; width: 1.8rem; height: 1.8rem; border-radius: 50%; margin:auto; border:2px solid #6ac5ff;}
.ex-index-img a img{border-radius: 50%;}
.ex-index-img span {background:url('../../assets/images/header.png') center; -webkit-background-size: cover;
background-size: cover; display: block; height: 0.6rem; line-height: 0.6rem; width: 2.6rem; color: #fff; margin: -0.4rem auto 0;}
.ex-index-head .name{ color: #fff; margin: 0.1rem 0;font-size: 14px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-head .id{ color: #fff; font-size: 12px; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-data li { color: #fff; height: 0.75rem; line-height: 0.75rem; border-bottom:1px solid #fff;}
.ex-index-data li b{font-weight: 400;}
.ex-index-data li span {width: 50%; text-align: right;display: block;float: right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis; padding-right: 0.05rem;}
.ex-index-menu{overflow: auto;}
.ex-index-menu li{ float: left;  width: 33.33%;}
.ex-index-menu li a{ display: block;  text-align: center; padding:0.5rem 0; border:1px solid #eee; margin-left: -1px; margin-top: -1px; color: #222; }
.ex-index-menu li a i{font-size: 30px; margin-bottom: 0.06rem;}
.ex-index-menu li a span{display: block;}
.ex-index-menu li a:active{background-color: #eee;}
i.m1{color: #ffbc3d;}
i.m2{color: #27b581;}
i.m3{color: #45d0c9;}
i.m4{color: #53a7f3;}
i.m5{color: #ffa100;}
i.m6{color: #f0544d;}
i.m7{color: #5eb5ea;}
i.m8{color: #66c476;}
.ex-index-service{position: fixed; right: 0.2rem; bottom: 2rem; width: 1.5rem; height: 1.5rem; line-height: 1.5rem;background-color:rgba(0,0,0,0.3); border-radius: 50%; text-align: center; color: #fff;}
.ex-customer {position: fixed; left: 0;top: 0;right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 4;}
.ex-customer-cnt{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);background-color: #fff;width: 85%; overflow: hidden; text-align: center; padding-top: 0.2rem}
.ex-customer-cnt-item {padding: 0.2rem 0; font-size: 16px;}
.ex-customer-cnt-item a{color: #2eadff; padding-top: 0.2rem; }
.ex-customer-cnt-item p {padding-top: 0.2rem; padding-bottom: 0.1rem;}
.ex-customer-close { line-height: 1.2rem; border-top: 1px solid #eee;  font-size: 16px; background-color: #eee;}
.ex-customer-close:active{background-color: #ddd;}
</style>