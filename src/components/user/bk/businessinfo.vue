<template>
	<div class="ex-shop3">
	  <HeadTitle :title="modal" @callback="back"></HeadTitle>

		<div class="ex-shop3-cnt">
			<div class="ex-shop3-cnt">
			<div class="ex-shop3-item">
				<span>商家名称</span>
				<b>{{examineData.shopsName}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>联系地址</span>
				<b>{{examineData.shopsAddress2}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>详细地址</span>
				<b>{{examineData.shopsAddress}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>姓名</span>
				<b>{{examineData.shopsLinkman}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>联系电话</span>
				<b>{{examineData.shopsLinkphone}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>营业执照号</span>
				<b>{{examineData.licenseNumber}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>营业执照照片</span>
				<div class="img">
					<img :src="examineData.businessLicense" alt="" @click='preimg(examineData.businessLicense)'>
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>法人身份证正反面</span>
				<div class="img">
					<img :src="examineData.legalPic" alt="" @click='preimg(examineData.legalPic)'>
					<img :src="examineData.legalPic1" alt="" @click='preimg(examineData.legalPic1)'>
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>负责人手持身份证照片</span>
				<div class="img">
					<img :src="examineData.holdPic" alt="" @click='preimg(examineData.holdPic)'>
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>店面门头照片</span>
				<div class="img">
					<img :src="examineData.facadePhoto" alt="" @click='preimg(examineData.facadePhoto)'>
				</div>
			</div>
			<div class="ex-shop3-item" v-show="examineData.proxyPic">
				<span>委托书照片</span>
				<div class="img">
					<img :src="examineData.proxyPic" alt="" @click='preimg(examineData.proxyPic)'>
				</div>
			</div>
		</div>
		</div>
		<img-preview :imageData='imgpre' v-show='imgpre.show' @hideImg='hidepre'></img-preview>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import imgPreview from '../common/image'
export default {
	data () {
		return {
			examineData: '',
			modal:{
				text:'商家信息',
				fixed: false,
			},
			imgpre: {
				show: false,
				url: ''
			}
		}
	},
	computed: {
		disableBtn () {
		}
	},
	created () {
		let _this = this
		axios.post('shop/examine',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.examineData = res.data.data
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('网络请求超时！')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		preimg (url) {
			this.imgpre.url = url,
			this.imgpre.show = true
		},
		hidepre () {
			this.imgpre.show = false,
			this.imgpre.url = ''
		}
	},
	components: {
		HeadTitle,
		imgPreview
	}
}	
</script>

<style scoped>
.ex-shop3{background-color: #f4f5f7;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-shop3-result {background: #fff; text-align: center; padding: 2rem 0;}
.ex-shop3-result i{ font-size: 5rem; }
.ex-shop3-result i.suc{color: #ffa100;}
.ex-shop3-result i.err{color: #f0544d; }
.ex-shop3-result h3 {font-size: 2rem; font-weight: normal;}
.ex-shop3-result p{color:#aaafb6; padding-top: 0.5rem; }
.ex-shop3-cnt {background-color: #fff; margin: 1.5rem 0; padding: 0 0.5rem;}
.ex-shop3-item {border-bottom: 1px solid #e5e5e5; padding: 1rem 0; overflow: hidden;}
.ex-shop3-item b{font-weight: normal; color:#aaafb6; }
.ex-shop3-item b,.ex-shop3-item .img {float: right;}
.ex-shop3-item .img img{ width: 6rem; height: auto;  margin-left: 1rem;}
.ex-shop3-btn { display: block; background-color: #047dcb; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%;position: fixed;bottom: 1rem;left: 4%;}
.ex-shop3-btn:active{background-color:#0470b6; }
</style> 