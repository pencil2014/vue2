<template>
	<div class="ex-shop2">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>商家申请</span>
		</div>
		<div class="ex-shop-progress">
			<p class="percent">
				<span></span>
			</p>
			<div class="ex-shop-progress-item active">
				<b>1</b>
				<span>商家信息</span>
			</div>
			<div class="ex-shop-progress-item secend active">
				<b>2</b>
				<span>上传证照</span>
			</div>
			<div class="ex-shop-progress-item">
				<b>3</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-shop2-cnt">
			<div class="ex-shop2-cnt-item">
				<span>*营业执照号</span><input type="text" name="" id="licenseNumber" placeholder="请输入营业执照号" v-model.trim = "licenseNumber" maxlength="20">
			</div>
			<div class="img">
				<span>*营业执照照片</span>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl.businessLicense" alt="" v-show='imgurl.businessLicense !==""'>
					<input type="file" class="uploadimg" id="businessLicense" @change='getfile("businessLicense")'>
				</div>
			</div>
			<div class="img">
				<span>*法人身份证正反面</span>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传正面</b>
					<img class='showpic' :src="imgurl.legalPic1" alt="" v-show='imgurl.legalPic1 !==""'>
					<input type="file" class="uploadimg" id="legalPic1" @change='getfile("legalPic1")'>
				</div>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传反面</b>
					<img class='showpic' :src="imgurl.legalPic2" alt="" v-show='imgurl.legalPic2 !==""'>
					<input type="file" class="uploadimg" id="legalPic2" @change='getfile("legalPic2")'>
				</div>
			</div>
			<div class="img">
				<span>*负责人手持身份证照片</span>
				<label class="tips">上传法人或者负责人手持身份证照片</label>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl.holdPic" alt="" v-show='imgurl.holdPic !==""'>
					<input type="file" class="uploadimg" id="holdPic" @change='getfile("holdPic")'>
				</div>
			</div>
			<div class="img">
				<span>*店面门头照片</span>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl.facadePhoto" alt=""  v-show='imgurl.facadePhoto !==""'>
					<input type="file" class="uploadimg" id="facadePhoto" @change='getfile("facadePhoto")'>
				</div>
			</div>
			<div class="img">
				<span>委托书照片</span>
				<label class="tips">如不是法人本人申请，须提供法人委托书，并加盖公章</label>
				<div class="upload">
					<i class='iconfont'>&#xe608;</i>
					<b>上传照片</b>
					<img class='showpic' :src="imgurl.proxyPic" alt=""  v-show='imgurl.proxyPic !==""'>
					<input type="file" class="uploadimg" id="proxyPic" @change='getfile("proxyPic")'>
				</div>
				<a href="http://www.exgj.com.cn/exsdresc/commission.docx" class="instructions">(委托书范本)</a>
			</div>
			<button type='button'  :class="[ 'ex-shop2-btn', {disableBtn:disableBtn}]" @click='next'>下一步</button>
			<p class='agreement'><input type="checkbox"  v-model='agreement'>我已阅读并同意<a href="http://www.exgj.com.cn/exsdresc/file/b-xy.pdf">《E享时代商家入驻加盟协议书》</a></p>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast} from 'mint-ui'
import lrz from 'lrz'
export default {
	data () {
		return {
			licenseNumber: '',
			imgurl: {
				businessLicense: '',
				legalPic1: '',
				legalPic2: '',
				holdPic: '',
				facadePhoto: '',
				proxyPic: ''
			},
			imgbase64: {
				businessLicense: '',
				legalPic1: '',
				legalPic2: '',
				holdPic: '',
				facadePhoto: '',
				proxyPic: ''
			},
			imgArray: [],
			agreement: true,
			repeatBtn: false
		}
	},
	computed: {
		disableBtn () {
			let rule = (this.imgbase64.businessLicense && this.imgbase64.legalPic1 && this.imgbase64.legalPic2 && this.imgbase64.holdPic  && this.imgbase64.facadePhoto)
			let rule2 = /^\d{15,}$/.test(this.licenseNumber)
			if (!rule || !rule2) {
				return true
			} else {
				return false
			}
		}
	},
	created () {

	},
	watch: {
		imgArray () {
			if (this.imgArray.length < 5) {
				return
			}
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			let applyshops = JSON.parse(window.localStorage.getItem('shopdata'))
			axios.post('shop/apply',qs.stringify({
				shopsName: applyshops.shopName,
				shopsAddress: applyshops.addressDetail,
				shopsLinkman: applyshops.shopsLinkman,
				shopsLinkphone: applyshops.shopsLinkphone,
				licenseNumber: this.licenseNumber,
				businessLicense: this.imgArray[0],
				legalPic1: this.imgArray[1],
				legalPic2: this.imgArray[2],
				holdPic: this.imgArray[3],
				facadePhoto: this.imgArray[4],
				proxyPic: this.imgArray[5],
				province: applyshops.provinceId,
				city: applyshops.cityId,
				county: applyshops.districtId,
				area: applyshops.areaId
			}))
				.then(function(res){
					_this.repeatBtn = false
					Indicator.close()
					if (res.data.code === '10000') {
						_this.$router.push('/shop3')
					} else {
						MessageBox('提示', '提交失败，请稍后重试！')
					}
				})
				.catch(function(){
					Indicator.close()
					_this.repeatBtn = false
					Toast('系统错误！')
				})
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		next () {
			if (!(/^\d{15,}$/.test(this.licenseNumber))) {
				MessageBox('提示', '企业营业执照号不正确!')
				return
			}

			if (!this.imgbase64.businessLicense) {
				MessageBox('提示', '请上传营业执照照片！')
				return
			}
			if (!this.imgbase64.legalPic1) {
				MessageBox('提示', '请上传法人身份证正面照片！')
				return
			}

			if (!this.imgbase64.legalPic2) {
				MessageBox('提示', '请上传法人身份证反面照片！')
				return
			}
			if (!this.imgbase64.holdPic) {
				MessageBox('提示', '请上传负责人手持身份证照片！')
				return
			}
			if (!this.imgbase64.facadePhoto) {
				MessageBox('提示', '请上传店面门头照片！')
				return
			}
			this.repeatBtn = true
			this.uploadimg()
		},
		uploadimg () {
			let _this = this
			let formData = new FormData()
			formData.append("imgStr", this.imgbase64.businessLicense)
			formData.append("imgStr", this.imgbase64.legalPic1)
			formData.append("imgStr", this.imgbase64.legalPic2)
			formData.append("imgStr", this.imgbase64.holdPic)
			formData.append("imgStr", this.imgbase64.facadePhoto)
			if (this.imgbase64.proxyPic) {
				formData.append("imgStr", this.imgbase64.proxyPic)
			}
			Indicator.open({
			  text: '图片处理中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('upload/pic_min',formData)
			.then(function(res){
				_this.repeatBtn = false
				Indicator.close()
				if (res.data.code === '10000') {
					_this.imgArray = res.data.urls
				} else {
					MessageBox('提示', '上传图片失败，请稍后重试！')
				}
			})
			.catch(function(res){
				Indicator.close()
				_this.repeatBtn = false
				Toast('系统错误！')
			})	
		},
		getfile (id) {
			let _this = this
			let img = document.getElementById(id).files[0]
			if (img) {
				this.imgurl[id] = window.URL.createObjectURL(img)
				this.file = img
				lrz(img,{width:640})
				.then(function (rst) {
	        _this.imgbase64[id] = rst.base64
	       })
	       .catch(function (err) {
	       _this.imgbase64[id] = ''
	       })  
			}
		}
	}
}	
</script>

<style scoped>
.ex-shop2{background-color: #f4f5f7;}
.ex-shop-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-shop-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 5rem; right: 5.5rem;}
.ex-shop-progress .percent span { background-color: #58c86b;  width: 50%; display: inline-block; height: 0.2rem; position: absolute; left: 0; top: 0.1rem;}
.ex-shop-progress-item { width: 33%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-shop-progress-item.secend {margin: 0;}
.ex-shop-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-shop-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}


.ex-shop2-cnt {font-size: 1.4rem; padding-bottom: 1rem;}
.ex-shop2-cnt-item {background-color: #fff; padding: 0.5rem 1rem; margin-bottom: 1rem;}
.ex-shop2-cnt-item span {display: inline-block; width: 30%; line-height: 3rem; vertical-align: middle;}
.ex-shop2-cnt-item input { height: 3rem; width: 70%; border: none; vertical-align: middle; }



.ex-shop2-cnt .img {background-color: #fff; border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem 1rem; position: relative;}
.ex-shop2-cnt .img .tips {font-size: 1.2rem; color:#aaafb6; display: block;}
.ex-shop2-cnt .img span {display: block; padding: 0.5rem 0;}
.ex-shop2-cnt .instructions { position: absolute; right: 1rem; bottom: 1rem;  color: #007aff; font-size: 1.2rem;}
.ex-shop2-cnt .upload {width: 8rem; height: 5rem; text-align: center; border: 1px dotted #d8d8d8; color: #aaafb6; font-size: 1.2rem; position: relative; margin-left: 2rem; display: inline-block; margin-top: 0.5rem;} 
.ex-shop2-cnt .upload i{ padding-top: 1rem; }
.ex-shop2-cnt .upload b{display: block; font-weight: normal;color: #aaafb6;}
.ex-shop2-cnt .showpic {position: absolute; top: 0; left: 0; height: 5.2rem; width: 8.2rem; z-index: 2;}
.ex-shop2-cnt .uploadimg { position: absolute; height: 5rem; width: 8rem; opacity: 0; z-index: 3; left: 0; top: 0;}

.ex-shop2-btn {margin: 0 2%; display: block; background-color: #62c1ff; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto 1rem;}
.ex-shop2-btn:active{background-color:#58ace2; }
.agreement {padding-left: 2%; font-size: 1.2rem; margin-bottom: 1rem;}
.agreement input{ width: 1.4rem; height: 1.4rem; border-radius: 0.5rem; vertical-align: middle; }
.agreement a{color:#1b6798; vertical-align: middle; }
</style> 