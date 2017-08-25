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
						<li><b>享积分:</b><span>{{userinfo.integral}}</span></li>
						<li><b>平台商家数:</b><span>{{sysData.businessNum}}</span></li>
						<li><b>昨日交易总额:</b><span>{{sysData.totalShareMoney}}</span></li>
						<li><b>e享比例:</b><span>{{sysData.eProportion}}</span></li>
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
					<p v-if="userinfo.shopsStatus === '2'" @click='changetoken'>切换为商家</p>
				</div>
			</div>

			<div class="ex-index-integral">
				<div class="integral">
					<i class="iconfont">&#xe65b;</i>
					<p>
						<label>e积分</label>
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
							<b>e享比例</b>
							<span>{{sysData.eProportion}}</span>
						</td>
					</tr>
					<tr>
						<td>
							<b>应分享单元值</b>
							<span>{{sysData.yesterdayMoney }}</span>
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
				<li>
				<a href="javascript:;" @click='systemUpdate("/integral")'>
				<img src="../../assets/images/5.png" alt="">
				<!-- <b class="m2"><i class="iconfont">&#xe604;</i></b> -->
				<span>享积分操作</span>
				</a>
				</li>
				<li><router-link to="/detail">
				<img src="../../assets/images/4.png" alt="">
				<!-- <b class="m3"><i class="iconfont">&#xe680;</i> -->
				</b><span>e积分明细</span></router-link>
				</li>
				<li><router-link to="/money">
				<img src="../../assets/images/3.png" alt="">
				<!-- <b class="m4"><i class="iconfont">&#xe94b;</i> </b>-->
				<span>资金明细</span></router-link>
				</li>
				<li>
				<a href="javascript:;" @click='systemUpdate("/bank")'>
				<img src="../../assets/images/2.png" alt="">
				<!-- <b class="m5"><i class="iconfont">&#xe6be;</i></b> -->
				<span>转存银行</span>
				</a>
				</li>
				<li><router-link to="/recommend">
				<img src="../../assets/images/7.png" alt="">
				<!-- <b class="m6"><i class="iconfont">&#xe603;</i></b> -->
				<span>我的分享</span></router-link>
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
				<li><a href="javascript:;" @click='download'>
					<img src="../../assets/images/17.png" alt="">
					<span>下载APP</span>
				</a></li>


			</ul>
		</div>
		<div class="ex-index-service" @click='showcustomer'><img src="../../assets/images/16.png" alt=""></div><!-- <i class="iconfont">&#xe612;</i> -->
		<div class="ex-customer" v-show='customerService' @click.stop="hidecustomer">
			<div class="ex-customer-cnt" @click.stop=''>
				<div class="ex-customer-cnt-item">
					<h3>客服电话</h3>
					<p><a href="tel:4006543888">4006543888</a></p>
					<p><a href="tel:075523300320">0755-23300320</a></p>
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
        shopsStatus:'2',
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
		  	title: '公  告',
		  	text: 
		  	'<b>全国各区域代理、联盟商家、消费者会员：</b><p>为了进一步促进消费分享经济的良性规范发展，依据国家相关部门指导性意见，特制定如下消费分享普惠政策。</p><p>1.会员（M）当月消费总额大于或等于E积分当月分享总额2倍以上的，次月，e积分享受公众比例。</p><p>2.会员（M）当月消费总额小于e积分当月分享总额2倍的，次月e积分享受：公众比例*系统月度参数值，按月以此类推。</p><p>（例如：M会员身份e积分100万，当月分享为3万左右，当月消费额大于或等于6万左右者，次月才能享受e积分公众比例。当月消费小于6万左右者，则享受公众比例*系统参数值）</p><p>3.系统识别计算从8月1日0点为起点，从9月1日0点执行。</p><p>4.本公告内容最终解释权归属于市场战略管理委员会。电话：<a href="tel:4006543888">4006543888</a></p><p>注：</p><p>（1）公众比例是指《平台规则》设置的逐天消费分享比例，即逐天1‰左右</p><p>（2）详情说明可去：我的->公告查看【关于2017年8月20日《公告》说明】</p><p class="right">浙江易享时代商业服务（集团）有限公司市场战略管理委员会<br/>2017.8.20</p></div>',
		  	confirm: '我知道了',
		  	end: new Date('2018-8-14').getTime(),
		  	identity: 'notice_1',
		  	hide: false // false为默认显示， true为隐藏
		  },
		  isDownload: false,
		  androidUrl: '',
		  isAndroid: false,
		  isiOS: false
		}
	},
	components: {
		appNav,
		exNotice
	},
	methods: {
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
				window.location.href = url
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
			axios.post('/exsd-web/user/switchUser',qs.stringify({type: 1}))
				.then(function(res){
					Indicator.close()
					_this.repeatBtn = false
					if (res.data.code === '10000') {
						window.localStorage.setItem('token', res.data.data.token)
						window.localStorage.setItem('usertype', '2')
						axios.defaults.headers.common['authorization'] = 'Bearer ' + res.data.data.token
						_this.$router.push('/business')
					} else {
						if (res.data.msg === '当前已是商家模式') {
							_this.$router.push('/business')
						} else {
							Toast( res.data.msg)
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
		gotovip () {
			let hours = new Date().getHours()
			if (hours < 2) {
				MessageBox('提示', '每日凌晨0:00-2:00系统维护，请在2:00之后进行此项操作，详情请见公告，感谢您的理解和支持！')
				return
			}
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
		getandroidUrl () {
			let _this = this
			axios.post('/exsd-web/appversion/queryUrl',qs.stringify({})).then(function(res){
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
			axios.post('/exsd-web/user/personal',qs.stringify({})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.userinfo = res.data.data
					window.localStorage.setItem('userinfo', JSON.stringify(res.data.data))
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
			axios.post('/exsd-web/user/sysIndex',qs.stringify({})).then(function(res){
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
			axios.post('/exsd-web/user/examine',qs.stringify({})).then(function(res){
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
		}
	},
	beforeRouteLeave (to,from,next) {
		window.localStorage.setItem('integralPath', '/index')
		next()
	},
	beforeRouteEnter (to,from,next) {	
		let usertype = 	window.localStorage.getItem('usertype')
		if (usertype === '2') {
			next('/business')
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
			return value.replace('B','M')
		}
	},
	watch: {
	},
	created () {
		// let phone = window.localStorage.getItem('phone')
		// let userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
		// if (!!userinfo && phone === userinfo.phone) {
		// 	// 获取用户详情
		// 	let personal = this.$getcache('user/personal')
		// 	if (personal) {
		// 		this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
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
		// 	this.getexamine()
		// 	// let examine = this.$getcache('user/examine')
		// 	// if (examine) {
		// 	// 	this.userVipStatus = JSON.parse(window.localStorage.getItem('userVipStatus'))
		// 	// } else {
		// 	// 	this.getexamine()
		// 	// }
		// } else {
		// 	this.getuserinfo()
		// 	this.getsysIndex()
		// 	this.getexamine()
		// }

		this.getuserinfo()
		this.getsysIndex()
		this.getexamine()
		this.getandroidUrl()


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
.ex-index-logo {width: 25%; text-align: center; position: relative; }
.ex-index-logo a{background: #fff url('../../assets/images/head.png')  center; -webkit-background-size: cover;
background-size: cover; display: block; width: 5rem; height: 5rem; border-radius: 50%; margin:auto;/* border:2px solid #fff;*/ margin-bottom: 0.5rem;}
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
.ex-index-integral .integral { width: 50%; float: left; position: relative;}
.ex-index-integral .integral i{font-size: 3rem;float: left; margin-right: 1rem; line-height: 4rem;}
.ex-index-integral .integral p{ float: left; font-size: 1.4rem;}
.ex-index-integral .integral p label {display: block; line-height: 2rem;}
.ex-index-integral .integral .arrow { position: absolute;right: 0; font-size: 2rem }

.ex-index-table { width: 100%; background-color: #fff; color: #000; }
.ex-index-table td {border-left: 1px solid #eee; margin-left: -0.05rem; margin-top: -0.05rem; font-size: 1.4rem; width: 50%;}
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

.ex-index-service{position: fixed; right: 1rem; bottom: 6rem; width: 4rem; height: 4rem; line-height: 4rem;/*background-color:rgba(0,0,0,0.3);*/ border-radius: 50%; text-align: center; color: #fff; }
.ex-index-service i{font-size: 3rem;}
.ex-index-service img { width: 4rem; }
.ex-customer {position: fixed; left: 0;top: 0;right: 0; bottom: 0; background-color: rgba(0,0,0,0.4); z-index: 7;}
.ex-customer-cnt{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%, -50%, 0);transform: translate3d(-50%, -50%, 0);background-color: #fff;width: 85%; overflow: hidden; text-align: center; padding-top: 1rem; border-radius: 0.4rem; padding-top: 2rem;}
.ex-customer-cnt-item {padding-top:1rem; font-size: 1.6rem;}
.ex-customer-cnt-item h3{ font-size: 1.4rem; font-weight: normal; padding-bottom: 0.5rem; }
.ex-customer-cnt-item a{color: #2eadff;}
.ex-customer-cnt-item p {padding-bottom: 0.5rem;}
.ex-customer-close { line-height: 5rem; border-top: 1px solid #eee;  font-size: 1.6rem; margin-top: 2rem;}
.ex-customer-close:active{background-color: #ddd;}


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