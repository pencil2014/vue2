<template>
	<div class="ex-index">
		<!-- <div class="ex-index-box">
			<div class="ex-index-toplink">
				<div class="switch" v-if="userinfo.shopsStatus === '2'" @click='changetoken'>切换为会员</div>  
				<div class="links">
					<router-link to="/message"><i class='iconfont'>&#xe611;</i></router-link>
					<router-link to="/settings"><i class='iconfont'>&#xe651;</i></router-link>
				</div>
			</div>
			<div class="ex-index-userinfo">
				<div class="ex-index-head">
					<div class="ex-index-img" >
						<a href="javascript:;" @click="gouser">
							<img :src="userinfo.logoImg"  v-show="userinfo.logoImg">
						</a>
						<p :class="{vip:userVipStatus.auditStatus ==='2'}">
							<img src="../../assets/images/vip.png" alt="" v-if="userVipStatus.auditStatus ==='2'"> e享会员
						</p>
					</div>
					<p class="name">{{userinfo.userName}}</p>
					<p class="id">ID:{{userinfo.userCode}}</p>
				</div>
				<div class="ex-index-data">
					<ul>
						<li><b>账户余额:</b><span>{{userinfo.overMoney | checknum}}</span></li>
						<li><b>提现金额:</b><span>{{userinfo.freezeMoney | checknum}}</span></li>
						<li><b>e积分:</b><span>{{userinfo.integralA}}</span></li>
						<li><b>激励e积分:</b><span>{{userinfo.integralB}}</span></li>
						<li><b>享积分:</b><span>{{userinfo.integral}}</span></li>
						<li><b>平台商家数:</b><span>{{sysData.businessNum}}</span></li>
						<li><b>昨日交易总额:</b><span>{{sysData.totalShareMoney}}</span></li>
						<li><b>e享比例:</b><span>{{sysData.eProportion}}</span></li>
						<li><b>激励比例:</b><span>{{sysData.jeProportion}}</span></li>
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
					<div class="vip" v-if='userinfo.userLev ==="2"'><img src="../../assets/images/vip_mark.png" alt=""></div>
					<!-- <p class="name">{{userinfo.userName}}</p> -->
					<p class="code">ID:{{userinfo.userCode | formatcode}}</p>
				</div>
				<div class="ex-index-money">
					<p>账户余额(元)</p>
					<b class='money'>{{userinfo.overMoney | checknum}}</b>
					<p>提现审核中(元)：<b class="money2">{{userinfo.freezeMoney | checknum}}</b></p>
				</div>
				<div class="ex-index-switch">
					<p v-if="userinfo.shopsStatus === '2'" @click='changetoken'>切换为会员</p>
				</div>
			</div>

			<div class="ex-index-integral">
				<div class="integral border" >
					<p>e积分：{{userinfo.integralA | checknum}}</p>
					<p @click='gotodetail'>享积分：{{userinfo.integral | checknum}}<i class="iconfont arrow">&#xe606;</i></p>
				</div>
				<div class="integral">
					<p>激励e积分：{{userinfo.integralB | checknum}}</p>
					<p>激励比例：{{sysData.jeProportion}}</p>
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
							<b>e享比例</b>
							<span>{{sysData.eProportion}}</span>
						</td>
					</tr>
					<tr>
						<td>
							<b>应分享单元值</b>
							<span>{{sysData.yesterdayMoney | checknum}}</span>
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
				<li>
				<a href="javascript:;" @click='systemUpdate("/declare")'>
				<img src="../../assets/images/9.png" alt="">
				<!-- <b class=" m9"><i class="iconfont">&#xe602;</i></b> -->
				<span>单笔报单</span></a>
				</li>		

				<li><router-link to="/order">
				<img src="../../assets/images/8.png" alt="">
				<!-- <b class=" m1"><i class="iconfont">&#xe6d8;</i></b> -->
				<span>单笔报单查询</span></router-link>
				</li>
				<li><router-link to="/tables">
				<img src="../../assets/images/6.png" alt="">
				<!-- <b class=" m10"><i class="iconfont">&#xe601;</i></b> -->
				<span>报单成功明细</span></router-link>
				</li>
				
				<li>
				<a href="javascript:;" @click='systemUpdate("/batch")'>
				<img src="../../assets/images/13.png" alt="">
				<span>批量报单</span></a>
				</li>

				<li><router-link to="/batchlist">
				<img src="../../assets/images/12.png" alt="">
				<span>批量报单查询</span></router-link>
				</li>

				<li>
				<a href="javascript:;" @click='systemUpdate("/integral")'>
				<img src="../../assets/images/5.png" alt="">
				<!-- <b class=" m2"><i class="iconfont">&#xe604;</i></b> -->
				<span>享积分操作</span></a>
				</li>
				<li><router-link to="/detail2">
				<img src="../../assets/images/4.png" alt="">
				<!-- <b class=" m3"><i class="iconfont">&#xe680;</i></b> -->
				<span>e积分明细</span>
				</router-link></li>
				<li><router-link to="/money">
				<img src="../../assets/images/3.png" alt="">
				<!-- <b class=" m4"><i class="iconfont">&#xe94b;</i></b> -->
				<span>资金明细</span></router-link>
				</li>
				<li>
				<a href="javascript:;" @click='systemUpdate("/bank")'>
				<img src="../../assets/images/2.png" alt="">
				<!-- <b class=" m5"><i class="iconfont">&#xe6be;</i></b> -->
				<span>转存银行</span></a>
				</li>
				<li><router-link to="/recommend">
				<img src="../../assets/images/7.png" alt="">
				<!-- <b class=" m6"><i class="iconfont">&#xe603;</i></b> -->
				<span>我的分享</span></router-link>
				</li>
				<!-- <li v-if='false'>
					<a href="javascript:;" @click='gotovip'>
					<img src="../../assets/images/10.png" alt="">
					<b class=" m7"><i class="iconfont">&#xe642;</i></b>
					<span>升级会员</span></a>
				</li> -->
				<li v-if="enterstatus !== '1'">
					<a href="javascript:;" @click="goapply">
						<img src="../../assets/images/14.png" alt="">
						<!-- <b class=" m6"><i class="iconfont">&#xe603;</i></b> -->
						<span>商家推广入驻</span>
					</a>
				</li>
				<li><a href="javascript:;" @click='download'>
					<img src="../../assets/images/17.png" alt="">
					<span>下载APP</span>
				</a></li>
				<!-- <li v-if="ExpandStatus !== '3'">
					<a href="javascript:;" @click='toFillForm'>
						<img src="../../assets/images/18.png" alt="">
						<span>二维码收款申请</span>
					</a>
				</li>
				<li v-if="ExpandStatus === '3'">
					<router-link to="/qrcode2">
						<img src="../../assets/images/18.png" alt="">
						<span>商家收款二维码</span>
					</router-link>
				</li> -->
			</ul>
		</div>
		<div class="ex-index-service" @click='showcustomer'><img src="../../assets/images/16.png" alt=""></div>
		<div class="ex-customer" v-show='customerService' @click.stop="hidecustomer">
			<div class="ex-customer-cnt" @click.stop=''>
				<div class="ex-customer-cnt-item">
					<h3>客服电话</h3>
					<p><a href="tel:075523300320">0755-23300320</a></p>
					<p><a href="tel:4006543888">4006543888</a></p>
				</div>
				<div class="ex-customer-cnt-item">
					<h3>客服QQ</h3>
					<p><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512826&version=1&src_type=web&web_src=oicqzone.com">2852512826</a></p>
					<p><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512824&version=1&src_type=web&web_src=oicqzone.com">2852512824</a></p>
					<p><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512825&version=1&src_type=web&web_src=oicqzone.com">2852512825</a></p>
				</div>
				<div class="ex-customer-cnt-item">
					<h3>服务时间</h3>
					<p>09:00 ― 18:00</p>
				</div>
				<div class="ex-customer-close" @click.stop="hidecustomer">关闭</div>
			</div>
		</div>

		<app-nav></app-nav>
		<ex-notice :modal='model'  @confirm='confirm' v-show='!model.hide'></ex-notice>
		<!-- 系统维护提示 -->
		 <!-- <div class="ex-weihu" v-if=''>
		 		<div class="ex-weihu-cnt">
		 			<div class="title">温馨提示</div>
		 			<p> 为了保障系统稳定、精确运行，平台自6月2日起每日凌晨0:00-2:00对系统进行维护，维护期间不可操作，特此通告！</p>
		 		</div>
		 </div> -->

		<!-- 下载app -->
		<div class="ex-noticeBJ" v-show="isDownload">
        <div class="ex-notice">
            <div class="content">
                <div class="contentBOX">
                    <p class="title">下载操作</p>
                    <div class="info-text">
                        <p v-if='isAndroid'>下载地址：<a :href="androidUrl">{{androidUrl}}</a></p>
                        <span style="color: red" >(请长按复制该链接到浏览器下载APP）</span>
                    </div>
                </div>
                <div class="operate" @click="closeDownload">
                    关闭
                </div>
            </div>
        </div>
    </div>
	</div>	
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import appNav from "../common/tabbar.vue"
import exNotice from '../common/notice.vue'
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
			enterstatus: '',
			model: {
		  	title: '温馨提示',
		  	text: 
		  	'<b>尊敬的e享时代用户：</b><p>为了保障系统稳定、精确运行，平台决定6月2日起每日凌晨0:00-2:00在会员积分自动转换时对系统进行维护；为了数据传输安全快捷，部分明细只显示近期（7天左右）数据。请各会员及时查看明细记录，特此通告！</p><p>感谢您对e享时代的支持与信任！如有任何疑问，敬请致电客服:<a href="tel:4006543888">4006543888</a>,<a href="tel:075523300320">0755-23300320</a></p><div class="inscribe"><p>深圳易享时代运营服务有限公司</p><p>二〇一七年七月二十六日</p></div>',
		  	confirm: '知道了',
		  	end: new Date('2017-7-14').getTime(),
		  	identity: 'notice',
		  	hide: true // false为默认显示， true为隐藏
		  },
		  isDownload: false,
		  androidUrl: '',
		  isAndroid: false,
		  isiOS: false,
		  // ExpandStatus: ''
		}
	},
	components: {
		appNav,
		exNotice
	},
	methods: {
		// toFillForm () {
		// 	let path = '/fillform/step1'
		// 	if(this.ExpandStatus === '5'){
		// 		path = '/fillform/step4'
		// 	}
		// 	if(this.ExpandStatus === '0' || this.ExpandStatus === '4' || this.ExpandStatus === '1' || this.ExpandStatus === '2'){
		// 		path =  '/fillform/step6' 
		// 	}
		// 	this.$router.push(path)
		// },
		download () {
			let ua = navigator.userAgent.toLowerCase()
			this.isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1
			this.isiOS = !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
			let isweixin = ua.indexOf('micromessenger') !== -1 ? true : false
			let url = window.location.href
			if (this.isiOS) {
				url = 'https://itunes.apple.com/us/app/e%E4%BA%AB%E6%97%B6%E4%BB%A3/id1218733985?l=zh&ls=1&mt=8'
			}
			if (this.isAndroid) {
				url = this.androidUrl
			}
			if (isweixin && this.isAndroid) {
				this.isDownload = true
				// window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.exgj.exsd'
			} else {
				window.location.href= url
			}
		},
		closeDownload () {
			this.isDownload = false
		},
		systemUpdate (route) {
			let hours = new Date().getHours()
			if (hours < 2) {
				MessageBox('提示', '每日凌晨0:00-2:00系统维护，请在2:00之后进行此项操作，详情请见公告，感谢您的理解和支持！')
				return
			} else {
				this.$router.push(route)
			}
		},
		confirm () {
			this.model.hide = true
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
			axios.post('user/switchUser',qs.stringify({type: 2}))
				.then(function(res){
					Indicator.close()
					_this.repeatBtn = false
					if (res.data.code === '10000') {
						window.localStorage.setItem('token', res.data.data.token)
						window.localStorage.setItem('usertype', '1')
						axios.defaults.headers.common['authorization'] = 'Bearer ' + res.data.data.token
						_this.$router.push('/index')
					} else {
						if (res.data.msg === '当前已是会员模式') {
							_this.$router.push('/index')
						} else {
							Toast(res.data.msg)
						}
					}
				})
				.catch(function(){
					Indicator.close()
					_this.repeatBtn = false
					Toast('连接失败，请检查网络是否正常!')
				})
		},
		gouser () {
			this.$router.push('/personal')
		},
		gotodetail () {
			this.$router.push('/integraldetail')
		},
		// gotovip () {
		// 	let hours = new Date().getHours()
		// 	if (hours < 2) {
		// 		MessageBox('提示', '每日0:00~2:00点，数据系统维护中，不可操作!')
		// 		return
		// 	}
		// 	let _this = this
		// 	if (this.userVipStatus.auditStatus === '0') {
		// 		MessageBox.alert('VIP会员审核失败！').then(action => {
		// 			_this.$router.push('/upgrade')
		// 		})	
		// 	} else if(this.userVipStatus.auditStatus == '1') {
		// 		MessageBox('提示', 'VIP会员升级中,请稍后...')
		// 	} else {
		// 		this.$router.push('/upgrade')
		// 	}
		// },
		goapply () {
			let path = '/apply'
			if(this.enterstatus !== '3'){
				path = '/apply3'
			}
			this.$router.push(path)
		},
		showcustomer () {
			this.customerService = true
		},
		hidecustomer () {
			this.customerService = false
		},
		getandroidUrl () {
			let _this = this
			axios.post('appversion/queryUrl',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.androidUrl = res.data.data
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})
		},
		getuserinfo () {
			let _this = this
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('user/personal',qs.stringify({})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.userinfo = res.data.data
					window.localStorage.setItem('businessinfo', JSON.stringify(res.data.data))
					// window.localStorage.setItem('user/personal', new Date().getTime())
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getsysIndex () {
			let _this = this
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('user/sysIndex',qs.stringify({})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.sysData = res.data.data
					// window.localStorage.setItem('sysData', JSON.stringify(res.data.data))
					// window.localStorage.setItem('user/sysIndex', new Date().getTime())
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
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
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})
		},
		getenterdetail () {
			let _this = this;
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('shop/enterDetail',qs.stringify({}))
			.then(function(res){
				if (res.data.code === '10000') {
				 	_this.enterstatus = res.data.data.status
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		// shopExpandStatus () {
		// 	let _this = this;
		// 	Indicator.open({
		// 	  text: '数据加载中...',
		// 	  spinnerType: 'fading-circle'
		// 	})
		// 	axios.post('shop/shopExpandStatus',qs.stringify({}))
		// 	.then(function(res){
		// 		Indicator.close()
		// 		if (res.data.code === '10000') {
		// 		 	_this.ExpandStatus = res.data.data.status
		// 		} else {
		// 			Toast(res.data.msg)
		// 		}
		// 	}).catch(function(){
		// 		Indicator.close()
		// 		Toast('连接失败，请检查网络是否正常!')
		// 	})
		// }
	},
	beforeRouteLeave (to,from,next) {
		 window.localStorage.setItem('integralPath', '/business')
		 localStorage.setItem('$backType','/business')
		 next()
	},
	beforeRouteEnter (to,from,next) {	
		let usertype = 	window.localStorage.getItem('usertype')
		if (usertype !== '2') {
			next('/index')
		} else {
			next()
		}
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
			return value.replace('M','B')
		}
	},
	watch: {
	},
	created () {
		// let phone = window.localStorage.getItem('phone')
		// let userinfo = JSON.parse(window.localStorage.getItem('businessinfo'))
		// if (!!userinfo && phone === userinfo.phone) {
		// 	// 获取用户详情
		// 	let personal = this.$getcache('user/personal')
		// 	if (personal) {
		// 		this.userinfo = JSON.parse(window.localStorage.getItem('businessinfo'))
		// 	} else {
		// 		this.getuserinfo()
		// 	}
		// 	// 获取平台信息
		// 	let sysIndex = this.$getcache('user/sysIndex')
		// 	if (sysIndex) {
		// 		this.sysData = JSON.parse(window.localStorage.getItem('sysData'))
		// 	} else {
		// 		this.getsysIndex()
		// 	}
		// 	//获取会员审核详情信息
		// 	let examine = this.$getcache('user/examine')
		// 	if (examine) {
		// 		this.userVipStatus = JSON.parse(window.localStorage.getItem('userVipStatus'))
		// 	} else {
		// 		this.getexamine()
		// 	}
		// } else {
		// 	this.getuserinfo()
		// 	this.getsysIndex()
		// 	this.getexamine()
		// 	this.getenterdetail()
		// }
		this.getuserinfo()
		this.getsysIndex()
		this.getexamine()
		this.getenterdetail()
		this.getandroidUrl()
		//this.shopExpandStatus()
		// if (!window.localStorage.getItem('batchNotice')) {
		// 	MessageBox('提示','为了增加商家和会员体验，特增加批量报单功能！')
		// 	window.localStorage.setItem('batchNotice', 'true')
		// }
		
	},
	mounted () {
		let hours = new Date().getHours()
		this.showSystemModal =  hours < 2 ? true : false
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
.ex-index-logo {width: 25%; text-align: center; position: relative;}
.ex-index-logo a{background: #fff url('../../assets/images/head.png')  center; -webkit-background-size: cover;
background-size: cover; display: block; width: 5rem; height: 5rem; border-radius: 50%; margin:auto; /*border:2px solid #fff;*/ margin-bottom: 0.5rem;}
.ex-index-logo a img {width: 5rem; height: 5rem;}
.ex-index-logo p{line-height: 2; background-color: #0470b6; border-radius: 2rem; width: 80%; margin: 0.5rem auto;}
.ex-index-logo .vip {position: absolute; top: 4rem; right: 1.2rem;}
.ex-index-logo .vip img{ height: 1.5rem; }
.ex-index-money { width: 50%; text-align: center; font-size: 1.4rem; padding-top:2rem; }
.ex-index-money p{ color: #9bcbea; font-weight: 300;}
.ex-index-money .money {font-size: 3rem; padding: 0.5rem 0;}
.ex-index-money .money2{font-weight: 400; color: #fff;}
.ex-index-switch { width: 25%;  text-align: right; margin-top: 0.5rem;}
.ex-index-switch p{background-color: #0369aa; color: #b3d8f6;  border-radius: 3rem; height: 2.5rem; line-height: 2.5rem; text-align: center; margin-right: 0.5rem;}

.ex-index-integral{background-color: #0473bb; color: #fff; overflow: hidden;padding: 0.5rem 1rem; margin-top: 1rem;}
.ex-index-integral .integral {overflow: hidden; padding: 1rem 0;}
.ex-index-integral .border{border-bottom: 1px solid #68abd6;}
/*.ex-index-integral .integral i{font-size: 3rem;float: left; margin-right: 1rem; line-height: 4rem;}*/
.ex-index-integral .integral p{ float: left; width: 50%; font-size: 1.4rem; position: relative;}
.ex-index-integral .integral p label {display: block; line-height: 2rem;}
.ex-index-integral .integral .arrow { position: absolute;right: 0.5rem; font-size: 1.6rem }

.ex-index-table { width: 100%; background-color: #fff; color: #000; }
.ex-index-table td {border-left: 1px solid #eee; margin-left: -0.05rem; margin-top: -0.05rem; font-size: 1.4rem;width: 50%;}
.ex-index-table td b{display: block; line-height: 2; font-weight: normal;}
.ex-index-table td span { color: #848a9b; }
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
background-size: cover; height: 2rem; line-height: 2rem; font-size: 1rem; width: 8rem; color: #fff; margin: -1.5rem auto 0; }
.ex-index-img p.vip {background-image: url('../../assets/images/header2.png'); position: relative;}
.ex-index-img p.vip img{ width: 2rem; height: 2rem; position: absolute; left: 0.7rem; top: -0.4rem;}
.ex-index-head .name{ color: #fff; margin: 0.5rem 0;font-size: 1.4rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-head .id{ color: #fff; font-size: 1.2rem; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-data li { color: #fff; height: 2rem; line-height: 2rem; border-bottom:1px solid #fff;}
.ex-index-data li b{font-weight: 400;}
.ex-index-data li span {width: 50%; text-align: right;display: block;float: right;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.ex-index-menu{overflow: auto; background: #fff;}
.ex-index-menu li{ float: left;  width: 33.33%;}
.ex-index-menu li a{ display: block;  text-align: center; padding:1.5rem 0; border:1px solid #eee; margin-left: -1px; margin-top: -1px; color: #222; }

.ex-index-menu li a i{font-size: 3rem; color: #fff; }
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
b.m8{background-color: #66c476;}
b.m9{background-color: #ff8338;}
b.m10{background-color: #66c476;}*/

.ex-index-service{position: fixed; right: 1rem; bottom: 6rem; width: 4rem; height: 4rem; line-height: 4rem;/*background-color:rgba(0,0,0,0.3);*/ border-radius: 50%; text-align: center; color: #fff;}
.ex-index-service i{font-size: 3rem;}
.ex-index-service img { width: 4rem; }
.ex-customer {position: fixed; left: 0;top: 0;right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 7;}
.ex-customer-cnt{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);background-color: #fff;width: 85%; overflow: hidden; text-align: center; border-radius: 0.4rem; padding-top: 2rem;}
.ex-customer-cnt-item {padding-top:1rem; font-size: 1.6rem;}
.ex-customer-cnt-item h3{ font-size: 1.4rem; font-weight: normal; padding-bottom: 0.5rem; }
.ex-customer-cnt-item a{color: #2eadff;}
.ex-customer-cnt-item p {padding-bottom: 0.5rem;}
.ex-customer-close { line-height: 5rem; border-top: 1px solid #eee;  font-size: 1.6rem; margin-top: 2rem;}
.ex-customer-close:active{background-color: #ddd;}


.ex-batch-modal {position: fixed; left: 0; bottom: 0; top: 0; right: 0; background-color: rgba(0,0,0,0.4); z-index: 7;}
.ex-batch-modal-cnt{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);background-color: #fff;width: 60%; overflow: hidden; text-align: center; border-radius: 0.4rem; padding: 1rem 0;}
.ex-batch-modal-cnt a{display: block; color: #000; font-size: 1.6rem;  line-height: 3;}
.ex-batch-modal-cnt li:first-child{border-bottom: 1px solid #eee;}

.ex-weihu{ position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); z-index: 7;}
.ex-weihu-cnt {width: 80%; height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: #fff;padding: 1rem; }
.ex-weihu-cnt .title { font-size: 1.6rem;  text-align: center; padding-bottom: 1rem;}
.ex-weihu-cnt p{  font-size: 1.4rem; line-height: 1.5; padding-bottom: 1rem;}


.ex-noticeBJ{width: 100%;height: 100%;background: rgba(0,0,0,0.42);position: fixed;z-index: 99999;top: 0;left: 0;display: table;}
.ex-notice{display: table-cell;vertical-align: middle;padding: 0 5%;}
.ex-notice .title{font-size: 1.6rem;text-align: center;padding: 15px 0; margin: 0;}
.ex-notice .content{background: #fff;border-radius: 5px;}
.ex-notice .content .text{line-height: 25px;text-indent: 2em;max-height: 250px;overflow: auto;}
.ex-notice .content .info-text{max-height: 220px;overflow: auto;padding-bottom: 15px; line-height: 1.5}
.ex-notice .content .info-text a{ color: #047dcb; }
.ex-notice .contentBOX{font-size: 1.4rem;padding:0 15px;word-break:break-all;}
.ex-notice .operate{text-align: center;border-top: 1px solid #e5e5e5;height: 46px;padding: 0;line-height: 46px;font-size: 1.6rem;}
.ex-notice .operate:active{background: #ebebeb}
</style>