<template>
	<div class="ex-school">
		<!-- <div class="ex-topbar" @click='gotop'>
			<a href="javascript:;" @click.stop="back"><i class="iconfont">&#xe605;</i></a>
			<span>会员注册协议</span>
		</div> -->
		<div class="ex-header fixed" @click='gotop'>
			<a href="javascript:void(0);" @click.stop="back">
				<i class="iconfont">&#xe605;</i>
				<label>返回</label>
			</a>
			<span>会员升级VIP协议</span>
		</div>
		<div class="ex-word-cnt">
		<h3>会员升级VIP协议</h3>
	
		<p>免费会员以自愿为原则一次性交付固定会费即升级为VIP会员。</p>
		<p><b>1、入会原则。</b>实行“入会自愿，退会自由；交费升级，会费不退”的原则。</p>
		<p><b>2、免费申请会员。</b>不论是商家还是消费者，只要认可并网签《会员服务协议》，均可经会员推荐或通过公司注册登录页面申请成为e享时代普通会员。</p>
		<p><b>3、升级VIP会员。</b>普通会员一次性交付998元会费即升级为VIP会员，同时获得会费等额e积分。VIP会员如果退会，其所交会费不予退回。</p>
		<p><b>4、会员的权利与相关福利：</b></p>
		<p>（1）推荐会员。</p>
		<p>（2）获得联盟商家赠送的消费金额等额e积分，或联盟商家自愿赠送的相应e积分。</p>
		<p>（3）通过e积分分享规则获得对应比例的享积分。</p>
		<p>（4）随时将享积分兑现为平台资金。</p>
		<p>（5）随时将平台资金转存银行。</p>
		<p>（6）获得推荐会员消费的福利收益和推荐会员升级VIP会员的福利收益。</p>
		<p>VIP会员的消费推荐福利收益是普通会员的十倍，即5%的e积分福利收益，可享受一代的消费推荐福利收益。</p>
		<p>不论是普通会员还是VIP会员，每推荐一名会员升级为VIP会员，均可获得180元现金的推荐福利收益。普通会员还能获得其推荐会员升级VIP时所得e积分0.5%的推荐福利收益，VIP会员获得的推荐福利收益是普通会员十倍即5%的e积分。</p>
		<p>（7）VIP会员有权推荐代理商，并获得运营商给予的代理保证金10%的e积分和5%的现金推荐福利收益。</p>
		<p>（8）VIP会员有权申请成为代理公司的权限管理员（即高级业务经理）</p>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
		}
	},

	methods: {
		go(id) {
			let top = document.getElementById(id).offsetTop -60
			console.log(top)
			document.getElementById('app').scrollTop = top
		},
		back () {
			this.$router.go(-1)
		},
		gotop () {
			document.getElementById('app').scrollTop = 0
		}
	},
	created () {
		
	}
}	
</script>

<style scoped>
.ex-topbar{ position: fixed; width: 100%; }
.ex-word-cnt {margin: 0 4%; padding: 5rem 0;}
.ex-word-cnt h3{text-align: center; font-size: 2rem; padding: 2rem 0;}
.ex-word-cnt h5{ font-size: 1.4rem; padding-bottom: 1rem; }
.ex-word-cnt b.subtitle{font-size: 1.6rem;display: inline-block; margin: 1rem 0;}
.ex-word-cnt p{line-height: 1.8; margin-bottom: 0.5rem; text-indent: 2rem; font-size: 1.4rem;}
.ex-word-cnt p.right {padding-left: 4rem;}
.ex-word-cnt .img {text-indent: 0; padding-top: 0.5rem;}
.ex-word-cnt .ex-school-index p{text-indent: 0; color:#047dcb; }
.ex-school-index b{font-size: 1.6rem;display: inline-block; margin: 1rem 0;}
.ex-word-cnt .sub {display: block; text-align: center; padding-top: 1rem; font-size: 1.2rem;}

.ex-header{height: 4.5rem; background-color: rgb(255,255,255);color: rgb( 33,42,50); text-align: center;position: relative;display: block; line-height: 4.5rem;box-shadow:1px 1px 0px #ebebeb;z-index: 6;}
.ex-header a{ position: absolute;left: 0.5rem;top:0;color: rgb(4,125,203);}
.ex-header i{font-size: 2rem;}
.ex-header label{font-size: 1.6rem;display: block;float: right;}
.ex-header span{display: block;font-size: 1.6rem; }
.fixed{position: fixed;width: 100%;left: 0;top: 0;}
</style>