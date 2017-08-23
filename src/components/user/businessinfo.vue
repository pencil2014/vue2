<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<div class="ex-field">
				<span>商家名称</span>
				<span class="float_right">{{examineData.shopsName}}</span>
			</div>
			<!-- <div class="ex-field">
				<span>所属行业</span>
				<span class="float_right">{{examineData.classificationName}}</span>
			</div> -->
			<div class="ex-field">
				<span>联系地址</span>
				<span class="float_right">{{examineData.shopsAddress2}}</span>
			</div>
			<div class="ex-field">
				<span>详细地址</span>
				<span class="float_right">{{examineData.shopsAddress}}</span>
			</div>
			<div class="ex-field">
				<span>姓名</span>
				<span class="float_right">{{examineData.shopsLinkman}}</span>
			</div>
			<div class="ex-field">
				<span>联系电话</span>
				<span class="float_right">{{examineData.shopsLinkphone}}</span>
			</div>
			<div class="ex-field">
				<span>营业执照号</span>
				<span class="float_right">{{examineData.licenseNumber}}</span>
			</div>
			<div class="ex-field">
				<span>营业执照照片</span>
				<span class="float_right"><img :src="examineData.businessLicense" alt="" v-preview="examineData.businessLicense" :preview-nav-enable="false"></span>
			</div>
			<div class="ex-field">
				<span>法人身份证正反面</span>
				<span class="float_right"><img :src="examineData.legalPic" alt="" v-preview="examineData.legalPic" :preview-nav-enable="false">
				<img :src="examineData.legalPic1" alt="" v-preview="examineData.legalPic1" :preview-nav-enable="false"></span>
			</div>	
			<div class="ex-field">
				<span>负责人手持身份证照片</span>
				<span class="float_right"><img :src="examineData.holdPic" alt="" v-preview="examineData.holdPic" :preview-nav-enable="false"></span>
			</div>	
			<div class="ex-field">
				<span>店面门头照片</span>
				<span class="float_right"><img :src="examineData.facadePhoto" alt="" v-preview="examineData.facadePhoto" :preview-nav-enable="false"></span>
			</div>	
			<div class="ex-field">
				<span>委托书照片</span>
				<span class="float_right"><img :src="examineData.proxyPic" alt="" v-preview="examineData.proxyPic" :preview-nav-enable="false"></span>
			</div>		
		</div>
		<lg-preview></lg-preview>
	</div>
	<!-- <div class="ex-shop3">
	  <HeadTitle :title="modal" @callback="back"></HeadTitle>

		<div class="ex-shop3-cnt">
			<div class="ex-shop3-cnt">
			<div class="ex-shop3-item">
				<span>商家名称</span>
				<b>{{examineData.shopsName}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>所属行业</span>
				<b>{{examineData.classificationName}}</b>
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
	</div> -->
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
				text:'商家申请资料',
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
		axios.post('/exsd-web/shop/examine',qs.stringify({}))
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
			this.imgpre.url = url;
			this.imgpre.show = true
		},
		hidepre () {
			this.imgpre.show = false;
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
.ex-apply{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}

.ex-apply .ex-top{background: #fff;width: 100%;text-align: center;color: #8f959e;font-size: 1.6rem;padding: 30px 0;line-height: 30px;}
.ex-apply .ex-top .strong{font-size: 2rem;color: #212a32;}
.ex-apply .ex-top i{font-size: 4.5rem;}
.ex-apply .ex-top i.suc{color: #ffa100;}
.ex-apply .ex-top i.err{color: #f0544d;}
.ex-form{background: #fff;font-size: 1.4rem;width: 100%;margin-top: 15px;}
.ex-form .ex-field{display: table;margin-left: 15px;border-bottom: solid 1px #ebebeb;padding: 10px 0;width: 100%;}
.ex-form .ex-field:last-child{border:none;}
.ex-form .ex-field span{display: table-cell;vertical-align: top;}
.ex-form .ex-field span:nth-child(1){width: 25%;}
.ex-form .ex-field span:nth-child(2){color: rgb(170,175,182);text-align: right;width: 75%;word-break: break-all;padding-right: 30px;}
.ex-form .ex-field span:nth-child(2) img{width: 80px;vertical-align: top;}

.preview{position: absolute;z-index: 999;left: 0px;top: 0;}
</style> 