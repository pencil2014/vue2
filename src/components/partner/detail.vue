<template v-cloak>
	<div class="ex-warpper">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="IMGbanner">
			<img :src="content.facadePhoto" alt="">
			<p v-text="content.shopsName"></p>
		</div>
		<div class="items introduce">
			<span class="title">公司简介</span>
			<div class="content" v-html="content.summary"></div>
		</div>
		<div class="items contact">
			<span class="title">联系我们</span>
			<div class="contact-item">
				<ul>
					<li>
						<span>地址</span>
						<label for="" v-text="content.shopsAddress"></label>
					</li>
					<li>
						<span>电话</span>
						<label for="" v-text="content.shopsLinkphone"></label>
					</li>
					<li>
						<span>联系人</span>
						<label for="" v-text="content.shopsLinkman"></label>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			content: '',
			modal: {
				text:'商家详情',
				fixed: false
			},
		}
	},
	computed:{
		id () {
			return this.$route.params.id
		},
	},
	created () {
		let _this = this
		axios.post('shop/examineUnion',qs.stringify({
			id: _this.id,
		})).then(function(res){
			if (res.data.code === '10000') {
				_this.content = res.data.data
			} else {
				Toast('对不起数据加载失败！')
			}
		}).catch(function(){
				Toast('网络请求超时！')
		})
	},
	components: {
		HeadTitle
	},
	methods: {
		back(){
			this.$router.back();
		},
	}
}
</script>
<style scoped>
[v-cloak]{display: none;}
.ex-warpper{width: 100%;color: #212a32;overflow-x: hidden;min-height: 100%;background: #f4f5f7;}
.IMGbanner{width: 100%;min-height: 200px;background: url(../../assets/images/loreList.png)no-repeat fixed;background-size: 100%;position: relative;}
.IMGbanner p{background: rgba(0,0,0,0.32);width: 100%;min-height: 50px;max-height: 100px;line-height: 50px;font-size: 2.2rem;color: #fff;text-indent: 1em;position: absolute;bottom: 25px;word-wrap: break-word;}
.introduce{}
.introduce .content{background: #fff;min-height: 40px;padding: 10px 5px;}
.items{color: #5d646e;font-size: 1.4rem;}
.items .title{display: inline-block;margin: 10px auto;padding-left: 15px;color: #aaafb6;}
.contact-item{padding: 0 0 0 15px;background: #fff;}
.contact-item ul{list-style-type: none;display: block;}
.contact-item ul li{min-height: 30px;width: 100%;padding: 8px 10px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
.contact-item ul li:last-child{border: none;}
.contact-item ul li label{padding: 0 15px 0 0;float: right;}
</style>