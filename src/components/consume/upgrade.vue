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
		<div class="ex-upgrade-pay">
			<a href="javascript:;" @click='gowechat' class='wechat'><i class="iconfont">&#xe734;</i> 微信支付</a>
			<a href="javascript:;" @click='gobank' class='bank'><i class="iconfont">&#xe66f;</i> 银行转账</a>
		</div>
		<div class="ex-upgrade-info">
			<div class="ex-upgrade-item">
				<b> 1. VIP用户权益</b>
				<p>A.升级后会员即刻得到998e积分分享。</p>
				<p>B.可获得下级消费额5%E积分。</p>
				<p>C.从普通会员升级为VIP会员，审核通过，若其上一级为VIP会员，则该上级会员（M身份）即可得到998x5%E积分，否则得到998x0.5%E积分。</p>
				<p>D.从普通会员升级为VIP会员，审核通过，则其上一级会员（M身份）账户余额可立即增加180元。</p>
			</div>
			<div class="ex-upgrade-item">
				<b>2. 免费用户权益</b>
				<p>可获得下级会员消费额0.5%E积分。</p>
				<p>从普通会员升级为VIP会员，审核通过，则其上一级会员（M身份）账户余额可立即增加180元。</p>
			</div>
		</div>
	</div>
</template>

<script>
import HeadTitle from '../common/title.vue'

	export default {
		data () {
			return {
				modal:{
					text:'会员升级',
					fixed: false,
				},
			}
		},
		methods: {
			back () {
				this.$router.go(-1)
			},
			gowechat () {
				this.$router.push('/wechat')
			},
			gobank () {
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
.ex-upgrade-pay {padding: 2rem;}
.ex-upgrade-pay a{display: block; height: 5rem; line-height: 5rem; text-align: center;font-size: 1.6rem;color: #fff;border-radius: 0.4rem;}
.ex-upgrade-pay a i{font-size: 3rem;}
.ex-upgrade-pay .wechat {background: #3dbc3c; margin-bottom: 2rem;}
.ex-upgrade-pay .wechat:active{background-color: #37a936;}
.ex-upgrade-pay .bank {background: #047dcb;}
.ex-upgrade-pay .bank:active{background-color: #047dcb;}
.ex-upgrade-info {background-color: #f4f5f7; padding: 2rem;}
.ex-upgrade-item {padding-bottom: 2rem;}
.ex-upgrade-item b{ line-height: 2; }
.ex-upgrade-item p{ color:#5d646e; line-height: 1.5;  }
</style>