<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<div class="item-wrapper">
				<div class="item">
					<span class="left">商家名称</span>
					<span class="right">
						{{info.shopsName}}
					</span>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="item">
					<span class="left">联系电话</span>
					<span class="right">
						<label for="">{{info.shopsLinkphone}}</label>
					</span>
				</div>
				<div class="item">
					<span class="left">地址</span>
					<span class="right">
						<label for="">{{address}}</label>
					</span>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="item">
					<span class="left">门头照片</span>
					<span class="right">
						<div class="uploadimg">
							<img :src="info.facadePhoto" alt="">
							<input type="file" class="file-prew" id="frontPic" @change="getfile" accept="image/*">
						</div>	
						<i class="iconfont" >&#xe606;</i>
					</span>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="item" @click="toproduct">
					<span class="left">商品管理</span>
					<span class="right" >
						<!-- 已编辑 -->
						<i class="iconfont" >&#xe606;</i>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import lrz from 'lrz'
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			info: '',
			imgurl:'',
			imgbase64: '',
			modal: {
				text:'店铺管理',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle
	},
	computed:{
		address () {
			return this.info.shopsAddress2 + this.info.shopsAddress
		}
	},
	created () {
		let _this = this
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		axios.post('shop/examine',qs.stringify({})).then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.info = res.data.data;
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.close()
			Toast('网络请求超时！')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		getfile () {
			let _this = this
			let img = document.getElementById('frontPic').files[0]
			if (img) {
				lrz(img,{width:640})
				.then(function (rst) {
					_this.info.facadePhoto = window.URL.createObjectURL(img)
			        _this.imgbase64 = rst.base64
			        _this.upload()
			    })
	       		.catch(function (err) {
	      			 _this.imgbase64.push('') 
	       		})  
			}
		},
		upload () {
			let _this = this;
			let formData = new FormData()
			formData.append('imgStr',_this.imgbase64)
			Indicator.open({
			  text: '图片上传中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('upload/pic_min',formData)
			.then(function(res){
				if (res.data.code === '10000') {
					_this.imgurl = res.data.urls[0]
					_this.changephoto()
				} else {
					Indicator.close()
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				Indicator.close()
				Toast('网络请求超时！')
			})
		},
		changephoto () {
			let _this = this;
			axios.post('shop/updateShopInfo',qs.stringify({
				id: _this.info.id,
				facadePhoto: _this.imgurl
			})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					Toast('修改门头照片成功')
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				Indicator.close()
				Toast('网络请求超时！')
			})
		},
		toproduct () {
			this.$router.push({
				name: 'Display2',
				params:{
					id: this.info.id
				}
			})
		}
	},
	
}
</script>
<style scoped>
.ex-display{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.wrapper{margin-top: 1.5rem;}
.item-wrapper{margin-bottom: 1.5rem;background: #fff;}
.item-wrapper .item{padding:15px 10px 15px 0;border-bottom: solid 1px #ebebeb;margin: 0 0 0 10px;}
.item-wrapper .item:last-child{border-bottom: none;}
.item-wrapper .item .right{}
.item-wrapper .item .right .uploadimg {display: inline-block;position: relative;}
.item-wrapper .item .right .uploadimg .file-prew{position: absolute;right: 0px;top: 0px;width: 84px;height: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}
.item span{display: inline-block;vertical-align: top;}
.item .left{width: 28%;font-size: 1.4rem;}
.item .right{width: 70%;text-align: right;color: #aaafb6}
.item .right label{color: #212a32;}
.item .right img{width: 7rem;vertical-align: middle;}
.item .right i{}
</style>