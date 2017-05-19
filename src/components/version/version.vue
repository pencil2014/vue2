<template>
	<div class="ex-version">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-version-imgWraper">
			<dl>
				<dt>
					<img src="../../assets/images/exLogo.png" alt="">
				</dt>
				<dd><span class="big">E享时代</span></dd>
				<dd class="small">创新消费，科学分享</dd>
			</dl>
		</div>
		<div class="ex-version-list">
			<div class="ex-version-item">
				<ul>
					<li @click="weichat">
						<span>微信公众号</span>
						<i class="iconfont">&#xe606;</i>
						<label for="">
						<a v-if="!is_weixin" href="javascript:;" >e享时代</a>
						<a v-if="is_weixin" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0NjYwMjQyNw==&scene=110#wechat_redirect 
						">e享时代</a>
						</label>
					</li>
					<li>
						<span>联系电话1</span>
						<i class="iconfont">&#xe606;</i>
						<label for=""><a href="tel:0755-23300320">0755-23300320</a></label>
					</li>
					<li>
						<span>联系电话2</span>
						<i class="iconfont">&#xe606;</i>
						<label for=""><a href="tel:400-6543-888">400-6543-888</a></label>
					</li>
					<li>
						<span>客服QQ号1</span>
						<i class="iconfont">&#xe606;</i>
						<label for=""><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512825&version=1&src_type=web&web_src=oicqzone.com">2852512825</a></label>
					</li>
					<li>
						<span>客服QQ号2</span>
						<i class="iconfont">&#xe606;</i>
						<label for=""><a href="mqqwpa://im/chat?chat_type=wpa&uin=2852512824&version=1&src_type=web&web_src=oicqzone.com">2852512824</a></label>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import HeadTitle from '../common/title.vue'
import { MessageBox } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'关于我们',
				fixed: false,
			},
		}
	},
	computed: {
		is_weixin () {
			return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
		}
	},
	methods: {
		back () {
			this.$router.back();
		},
		weichat () {
			if(!this.is_weixin){
				MessageBox({
					title:'提示',
					message:'请前往微信搜索‘e享时代’，并开始关注我们吧~',
				});
			}	
		},
	},
	components: {
		HeadTitle,
	}
}
</script>
<style scoped>
.ex-version{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-imgWraper{}
.ex-version-imgWraper dl dt{width: 100%;margin:15% 0 15px 0;}
.ex-version-imgWraper dl dt img{display: block;margin: auto;width: 80px;}
.ex-version-imgWraper dl dd{text-align: center;line-height: 25px;}
.ex-version-list{padding-bottom: 56px;}
.ex-version-list .ex-version-item{margin-top: 45px; padding: 0 0 0 15px;background: #fff;}
.ex-version-list .ex-version-item ul{list-style-type: none;display: block;}
.ex-version-list .ex-version-item ul li{min-height: 30px;font-size: 1.6rem;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
.ex-version-list .ex-version-item ul li:last-child{border: none;}
.ex-version-list .ex-version-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-version-list .ex-version-item ul li label a{float: right;color: #aaafb6;padding: 0 15px 0 0;font-size: 1.4rem;}
.big{font-size: 2.5rem;}
.small{font-size: 1.4rem;}
.narmal{font-size: 1.6rem;}
</style>