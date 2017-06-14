<template>
	<div class="ex-upgrade">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>会员升级</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-upgrade-img">
			<img src="../../assets/images/upgrade.png" >
		</div>
		<div class="ex-upgrade-adv">
			<b>10倍推荐积分速度</b>
			<p>升级成为VIP会员，获得10倍推荐积分速度！</p>
			<b>终身VIP会员</b>
			<p>提交申请并缴纳998元，即可成为终身VIP会员！</p>
		</div>
		<div class="ex-argument">
			<input type="checkbox" name="argument" id="checkbox" v-model="checked">
			<!-- <label for="checkbox">同意会员升级协议</label> http://exgj.com.cn/exsdresc/file/e-m-xy.docx-->
			<label for="checkbox">我已阅读并同意<a href="javascript:;" @click='gorule'>《会员升级VIP协议》</a></label>
		</div>
		<div class="ex-upgrade-pay">
			<a href="javascript:;" @click='gowechat'  :class="['wechat',{disableBtn:!checked}]"><i class="iconfont">&#xe734;</i> 微信支付</a>
			<a href="javascript:;" @click='gobank' :class="['bank',{disableBtn:!checked}]"><i class="iconfont">&#xe66f;</i> 银行转账</a>
		</div>
		
		<div class="ex-upgrade-info">
			<div class="ex-upgrade-item">
				<b> 1. VIP用户权益</b>
				<p>A.升级后会员即刻得到998e积分分享。</p>
				<p>B.可获得下级消费额5%e积分。</p>
				<p>C.从普通会员升级为VIP会员，审核通过，若其上一级为VIP会员，则该上级会员（M身份）即可得到998x5%e积分，否则得到998x0.5%e积分。</p>
				<p>D.从普通会员升级为VIP会员，审核通过，则其上一级会员（M身份）账户余额可立即增加180元。</p>
			</div>
			<div class="ex-upgrade-item">
				<b>2. 免费用户权益</b>
				<p>可获得下级会员消费额0.5%e积分。</p>
				<p>从普通会员升级为VIP会员，审核通过，则其上一级会员（M身份）账户余额可立即增加180元。</p>
			</div>
		</div>
	</div>
</template>

<script>
import HeadTitle from '../common/title.vue'
import { MessageBox } from 'mint-ui'
	export default {
		data () {
			return {
				modal:{
					text:'会员升级',
					fixed: false,
				},
				checked: true
			}
		},
		methods: {
			back () {
				this.$router.go(-1)
			},
			gorule () {
				this.$router.push('/upgraderule')
			},
			gowechat () {
				if (!this.checked) {
					MessageBox('提示', '请勾选并同意《会员升级VIP协议》')
					return
				}
				this.$router.push('/wechat')
			},
			gobank () {
				if (!this.checked) {
					MessageBox('提示', '请勾选会员升级协议!')
					return
				}
				this.$router.push('/bankpay')
			}
		},
		components: {
			HeadTitle,
		},
	}
</script>

<style scoped>
.ex-upgrade-adv{ text-align: center; }
.ex-upgrade-adv b{ font-size: 1.4rem;color: #5d646e; line-height:2rem;}
.ex-upgrade-adv p{font-size: 1.2rem; color: #8f959e; padding-bottom: 0.5rem;}
.ex-upgrade-pay {padding:1rem 2rem 2rem;}
.ex-upgrade-pay a{display: block; height: 5rem; line-height: 5rem; text-align: center;font-size: 1.6rem;color: #fff;border-radius: 0.4rem;}
.ex-upgrade-pay a i{font-size: 3rem;}
.ex-upgrade-pay .wechat {background: #3dbc3c; margin-bottom: 2rem;}
.ex-upgrade-pay .wechat:active{background-color: #37a936;}
.ex-upgrade-pay .bank {background: #047dcb;}
.ex-upgrade-pay .bank:active{background-color: #047dcb;}
.ex-upgrade-info {background-color: #f4f5f7; padding: 2rem;}
.ex-upgrade-item {padding-bottom: 2rem;}
.ex-upgrade-item b{ line-height: 2; color: #212a32;}
.ex-upgrade-item p{ color:#5d646e; line-height: 1.5;  }
.ex-argument{ vertical-align: middle;  text-align: center; padding: 1.5rem;}
.ex-argument input{ width: 1.5rem; height: 1.5rem; }
.ex-argument label{ color: #8f959e; }
.ex-argument a{ color: #047dcb; }

.ex-upgrade-pay .gray{background: #999;}
</style>