<template>
	<div class="ex-index">
		<!-- <div class="ex-index-box">
			<div class="ex-index-toplink">
				<div class="switch" v-if="userinfo.shopsStatus === '2'" @click='changetoken'>切换为商家</div>  
				<div class="links">
					<router-link to="/message"><i class='iconfont'>&#xe611;</i></router-link>
					<router-link to="/settings"><i class='iconfont'>&#xe651;</i></router-link>
				</div>
			</div>
			<div class="ex-index-userinfo">
				<div class="ex-index-head">
					<div class="ex-index-img" >
						<a href="javascript:;" @click="gouser">
							<img :src="'/static/'+userinfo.logoImg+'.png'"  v-show="userinfo.logoImg">
						</a>
						<p :class="{vip:userVipStatus.auditStatus ==='2'}">
							<img src="../../assets/images/vip.png" alt="" v-if="userVipStatus.auditStatus ==='2'"> E享会员
						</p>
					</div>
					<p class="name">{{userinfo.userName}}</p>
					<p class="id">ID:{{userinfo.userCode}}</p>
				</div>
				<div class="ex-index-data">
					<ul>
						<li><b>账户余额:</b><span>{{userinfo.overMoney | checknum}}</span></li>
						<li><b>提现金额:</b><span>{{userinfo.freezeMoney | checknum}}</span></li>
						<li><b>E积分:</b><span>{{userinfo.integralA}}</span></li>
						<li><b>享积分:</b><span>{{userinfo.integral}}</span></li>
						<li><b>平台商家数:</b><span>{{sysData.businessNum}}</span></li>
						<li><b>昨日交易总额:</b><span>{{sysData.totalShareMoney}}</span></li>
						<li><b>E享比例:</b><span>{{sysData.eProportion}}</span></li>
						<li><b>昨日分享平均值:</b><span>{{sysData.yesterdayMoney}}</span></li>
					</ul>
				</div>
			</div>
		</div> -->
		
		<div class="ex-index-header">
			<div class="ex-index-user">
				<div class="ex-index-logo">
					<a href="javascript:;" @click="gouser">
						<img :src="'/static/'+userinfo.logoImg+'.png'"  v-if="userinfo.logoImg">
					</a>
					<!-- <p class="name">{{userinfo.userName}}</p> -->
					<p class="code">ID:{{userinfo.userCode | formatcode}}</p>
				</div>
				<div class="ex-index-money">
					<p>账户余额(元)</p>
					<b class='money'>{{userinfo.overMoney | checknum}}</b>
					<p>提现审核中(元)：<b class="money2">{{userinfo.freezeMoney | checknum}}</b></p>
				</div>
				<div class="ex-index-switch">
					<p v-if="userinfo.shopsStatus === '2'" @click='changetoken'>切换为商家</p>
				</div>
			</div>

			<div class="ex-index-integral">
				<div class="integral">
					<i class="iconfont">&#xe65b;</i>
					<p>
						<label>E积分</label>
						<span>{{userinfo.integralA | checknum}}</span>
					</p>
				</div>
				<div class="integral" @click='gotodetail'>
					<i class="iconfont">&#xe680;</i>
					<p>
						<label>享积分</label>
						<span>{{userinfo.integral | checknum}}</span>
					</p>
					<i class="iconfont arrow">&#xe606;</i>
				</div>
			</div>

			<div class="ex-index-table">
				<table class="table">
					<tr>
						<td>
							<b>平台商家数</b>
							<span>{{sysData.businessNum}}（家）</span>
						</td>
						<td>
							<b>E享比例</b>
							<span>{{sysData.eProportion}}</span>
						</td>
					</tr>
					<tr>
						<td>
							<b>昨日交易总额</b>
							<span>{{sysData.yesterdayMoney | checknum}}（元）</span>
						</td>
						<td>
							<b>昨日分享平均值</b>
							<span>{{sysData.totalShareMoney | checknum}}</span>
						</td>
					</tr>
				</table>
			</div>

		</div>



		<div class="ex-index-menu">
			<ul>
				<li><router-link to="/record">
				<!-- <b class="m1"><i class="iconfont">&#xe631;</i></b> -->
				<img src="../../assets/images/8.png" alt="">
				<span>消费记录</span></router-link>
				</li>
				<li><router-link to="/integral">
				<img src="../../assets/images/5.png" alt="">
				<!-- <b class="m2"><i class="iconfont">&#xe604;</i></b> -->
				<span>享积分操作</span></router-link>
				</li>
				<li><router-link to="/detail">
				<img src="../../assets/images/4.png" alt="">
				<!-- <b class="m3"><i class="iconfont">&#xe680;</i> -->
				</b><span>E积分明细</span></router-link>
				</li>
				<li><router-link to="/money">
				<img src="../../assets/images/3.png" alt="">
				<!-- <b class="m4"><i class="iconfont">&#xe94b;</i> </b>-->
				<span>资金明细</span></router-link>
				</li>
				<li><router-link to="/bank">
				<img src="../../assets/images/2.png" alt="">
				<!-- <b class="m5"><i class="iconfont">&#xe6be;</i></b> -->
				<span>转存银行</span></router-link>
				</li>
				<li><router-link to="/recommend">
				<img src="../../assets/images/7.png" alt="">
				<!-- <b class="m6"><i class="iconfont">&#xe603;</i></b> -->
				<span>我的推荐</span></router-link>
				</li>
				<li v-show='userinfo.userLev !=="2"'>
					<a href="javascript:;" @click='gotovip'>
					<img src="../../assets/images/10.png" alt="">
					<!-- <b class="m7"><i class="iconfont">&#xe642;</i></b> -->
					<span>升级会员</span></a>
				</li>
				<li v-show="userinfo.shopsStatus !== '2'">
					<a href="javascript:;" @click='gotoshop'>
					<img src="../../assets/images/1.png" alt="">
					<!-- <b class="m8"><i class="iconfont">&#xe600;</i></b> -->
					<span v-if='userinfo.shopsStatus ==="-1" || userinfo.shopsStatus ==="0"'>商家申请</span>
					<span v-if='userinfo.shopsStatus ==="1" || userinfo.shopsStatus ==="3"'>商家审核</span>
					</a>
				</li>
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
		<model :model='model' v-show='model.show' @hideModel='hidemodel'></model>
	</div>	
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import appNav from "../common/tabbar.vue"
import model from "../common/model.vue"
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
		  customerService: false,
		  repeatBtn: false,
		  model: {
		  	show: false,
		  	title: '提示',
		  	text: '<p>这是测试文本！</p>'
		  }
		}
	},
	components: {
		appNav,
		model
	},
	methods: {
		hidemodel () {
			this.model.show = false
		},
		changetoken () {
			if (this.repeatBtn) {
				return
			}
			Indicator.open({
			  text: '正在切换...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			this.repeatBtn = true
			axios.post('user/switchUser',qs.stringify({type: 1}))
				.then(function(res){
					Indicator.close()
					_this.repeatBtn = false
					if (res.data.code === '10000') {
						window.localStorage.setItem('token', res.data.data.token)
						axios.defaults.headers.common['authorization'] = 'Bearer ' + res.data.data.token
						_this.$router.push('/business')
					} else {
						if (res.data.msg === '当前已是商家模式') {
							_this.$router.push('/business')
						} else {
							MessageBox('提示', res.data.msg)
						}
					}
				})
				.catch(function(){
					Indicator.close()
					_this.repeatBtn = false
					Toast('网络请求超时！')
				})
		},
		gouser () {
			this.$router.push('/personal')
		},
		gotodetail () {
			this.$router.push('/integraldetail')
		},
		gotovip () {
			let _this = this
			if (this.userVipStatus.auditStatus === '0') {
				MessageBox.alert('VIP会员审核失败！').then(action => {
					_this.$router.push('/upgrade')
				})	
			} else if(this.userVipStatus.auditStatus == '1') {
				MessageBox('提示', 'VIP会员升级中,请稍后...')
			} else {
				this.$router.push('/upgrade')
			}
		},
		gotoshop () {
			if (this.userinfo.shopsStatus === '-1' || this.userinfo.shopsStatus === '0') {
				this.$router.push('/shop1')
			} else {
				this.$router.push('/shop3')
			}
		},
		showcustomer () {
			this.customerService = true
		},
		hidecustomer () {
			this.customerService = false
		},
		getuserinfo () {
			let _this = this
			axios.post('user/personal',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.userinfo = res.data.data
					window.localStorage.setItem('userinfo', JSON.stringify(res.data.data))
					window.localStorage.setItem('user/personal', new Date().getTime())
				} else {
					MessageBox('提示', res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		},
		getsysIndex () {
			let _this = this
			axios.post('user/sysIndex',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.sysData = res.data.data
					window.localStorage.setItem('sysData', JSON.stringify(res.data.data))
					window.localStorage.setItem('user/sysIndex', new Date().getTime())
				} else {
					MessageBox('提示', res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		},
		getexamine () {
			let _this = this
			axios.post('user/examine',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.userVipStatus = res.data.data
					// window.localStorage.setItem('userVipStatus', JSON.stringify(res.data.data))
					// window.localStorage.setItem('user/examine', new Date().getTime())
				} else {
					MessageBox('提示', res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		}
	},
	beforeRouteLeave (to,from,next) {
		 window.localStorage.setItem('integralPath', '/index')
		 next()
	},
	filters: {
		checknum (value) {
			value = value? value+'' : '0'
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		},
		formatcode (value) {
			return value.replace('B','M')
		}
	},
	watch: {
	},
	computed: {
	},
	created () {
		let phone = window.localStorage.getItem('phone')
		let userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
		if (!!userinfo && phone === userinfo.phone) {
			// 获取用户详情
			let personal = this.$getcache('user/personal')
			if (personal) {
				this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
			} else {
				this.getuserinfo()
			}
			// 获取平台信息
			let sysIndex = this.$getcache('user/sysIndex')
			if (sysIndex) {
				this.sysData = JSON.parse(window.localStorage.getItem('sysData'))
			} else {
				this.getsysIndex()
			}
			//获取会员审核详情信息
			this.getexamine()
			// let examine = this.$getcache('user/examine')
			// if (examine) {
			// 	this.userVipStatus = JSON.parse(window.localStorage.getItem('userVipStatus'))
			// } else {
			// 	this.getexamine()
			// }
		} else {
			this.getuserinfo()
			this.getsysIndex()
			this.getexamine()
		}
		
	},
	monuted () {
	},
	destroyed () {
		Indicator.close()
	}

}	
</script>

<style scoped>
/*改版css*/
.ex-index-header {background-color: #047dcb; color: #fff; padding-top: 1rem; margin-bottom: 1rem;}
.ex-index-user {overflow: auto; padding-bottom: 2rem;}
.ex-index-logo,.ex-index-money,.ex-index-switch { float: left; }
.ex-index-logo {width: 25%; text-align: center; }
.ex-index-logo a{background: #fff url('../../assets/images/head.png')  center; -webkit-background-size: cover;
background-size: cover; display: block; width: 5rem; height: 5rem; border-radius: 50%; margin:auto; border:2px solid #fff; margin-bottom: 0.5rem;}
.ex-index-logo img {width: 5rem; height: 5rem;}
.ex-index-logo p{line-height: 2; background-color: #0470b6; border-radius: 2rem; width: 80%; margin: 0.5rem auto;}
.ex-index-money { width: 50%; text-align: center; font-size: 1.4rem; padding-top:2rem; }
.ex-index-money p{ color: #9bcbea; font-weight: 300;}
.ex-index-money .money {font-size: 3rem; padding: 0.5rem 0;}
.ex-index-money .money2{font-weight: 400; color: #fff;}
.ex-index-switch { width: 25%;  text-align: right; margin-top: 0.5rem;}
.ex-index-switch p{background-color: #0369aa; color: #b3d8f6;  border-radius: 3rem; height: 2.5rem; line-height: 2.5rem; text-align: center; margin-right: 0.5rem;}

.ex-index-integral{background-color: #0473bb; color: #fff; overflow: hidden;padding: 0.5rem 1rem; margin-top: 1rem;}
.ex-index-integral .integral { width: 50%; float: left; position: relative;}
.ex-index-integral .integral i{font-size: 3rem;float: left; margin-right: 1rem; line-height: 4rem;}
.ex-index-integral .integral p{ float: left; font-size: 1.4rem;}
.ex-index-integral .integral p label {display: block; line-height: 2rem;}
.ex-index-integral .integral .arrow { position: absolute;right: 0; font-size: 2rem }

.ex-index-table { width: 100%; background-color: #fff; color: #000; }
.ex-index-table td {border-left: 1px solid #eee; margin-left: -0.05rem; margin-top: -0.05rem; font-size: 1.4rem;}
.ex-index-table td b{display: block; line-height: 2; font-weight: normal;}
.ex-index-table td span { color: #999; }
/*改版css*/

.ex-index {padding-bottom: 5rem;background-color: #e5e5e5;}
.ex-index-box { background-color: #2eadff; padding:0.5rem 1rem; }
.ex-index-toplink { height: 2rem;  vertical-align: middle; margin-bottom: 1rem;}
.ex-index-toplink .switch { float: left; line-height: 2rem; background-color: #258acc;    color: #b3d8f6;  border-radius: 1rem; height: 2rem; padding: 0 1rem; margin-left: 1rem; margin-top: 0.5rem;}
.ex-index-toplink .links {text-align: right;}
.ex-index-toplink .links a{color: #fff; }
.ex-index-toplink .links a i{ font-size: 2.2rem; margin-left:1.5rem;}
.ex-index-userinfo{overflow: auto; padding-bottom: 1rem; }
.ex-index-head { float: left; width: 30%;  text-align: center; padding-top: 2rem; overflow: auto;}
.ex-index-data { margin-left: 35%;}
.ex-index-img {margin-bottom: 1rem;}
.ex-index-img a{background: #fff url('../../assets/images/head.png')  center; -webkit-background-size: cover;
background-size: cover; display: block; width: 6rem; height: 6rem; border-radius: 50%; margin:auto; border:2px solid #6ac5ff;}
.ex-index-img a img{border-radius: 50%;}
.ex-index-img p {background:url('../../assets/images/header.png') no-repeat center; -webkit-background-size: cover;
background-size: cover; height: 2rem; line-height: 2rem; width: 8rem; font-size: 1rem; color: #fff; margin: -1.5rem auto 0; position: relative;}
.ex-index-img p.vip {background-image: url('../../assets/images/header2.png'); position: relative;}
.ex-index-img p.vip img{ width: 2rem; height: 2rem; position: absolute; left: 0.7rem; top: -0.4rem;}
.ex-index-head .name{ color: #fff; margin: 0.5rem 0;font-size: 1.4rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-head .id{ color: #fff; font-size: 1.2rem; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-data li { color: #fff; height: 2rem; line-height: 2rem; border-bottom:1px solid #fff;}
.ex-index-data li b{font-weight: 400;}
.ex-index-data li span {width: 50%; text-align: right;display: block;float: right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-menu{overflow: auto; background-color: #fff;}
.ex-index-menu li{ float: left;  width: 33.33%;}
.ex-index-menu li a{ display: block;  text-align: center; padding:1.5rem 0; border:1px solid #eee; margin-left: -1px; margin-top: -1px; color: #222;}
.ex-index-menu li a i{font-size: 3rem;  color: #fff; }
.ex-index-menu li a span{display: block; color: #222;}
.ex-index-menu li a:active{background-color: #eee;}


.ex-index-menu li img{ width: 4rem; margin-bottom: 0.5rem; }
/*.ex-index-menu li a b{display:block;border-radius: 50%; width: 4rem; height: 4rem; margin: auto; line-height: 4rem; font-weight: normal; margin-bottom: 0.5rem;}
b.m1{background-color: #ffbc3d;}
b.m2{background-color: #27b581;}
b.m3{background-color: #45d0c9;}
b.m4{background-color: #53a7f3;}
b.m5{background-color: #ffa100;}
b.m6{background-color: #f0544d;}
b.m7{background-color: #5eb5ea;}
b.m8{background-color: #66c476;}*/

.ex-index-service{position: fixed; right: 1rem; bottom: 6rem; width: 4rem; height: 4rem; line-height: 4rem;background-color:rgba(0,0,0,0.3); border-radius: 50%; text-align: center; color: #fff; }
.ex-index-service i{font-size: 3rem;}
.ex-customer {position: fixed; left: 0;top: 0;right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 4;}
.ex-customer-cnt{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);background-color: #fff;width: 85%; overflow: hidden; text-align: center; padding-top: 1rem; border-radius: 0.4rem; padding-top: 2rem;}
.ex-customer-cnt-item {padding-top:1rem; font-size: 1.6rem;}
.ex-customer-cnt-item h3{ font-size: 1.4rem; font-weight: normal; padding-bottom: 0.5rem; }
.ex-customer-cnt-item a{color: #2eadff;}
.ex-customer-cnt-item p {padding-bottom: 0.5rem;}
.ex-customer-close { line-height: 5rem; border-top: 1px solid #eee;  font-size: 1.6rem; background-color: #eee; margin-top: 2rem;}
.ex-customer-close:active{background-color: #ddd;}
</style>