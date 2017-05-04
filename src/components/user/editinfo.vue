<template>
	<div class="ex-addgoods">
		<div class="ex-addgoods-box">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-addgoods-cnt">
			<div class="ex-addgoods-item">
				<span>商品名称</span>
				<input type="text" placeholder="最多8个字符" maxlength="8" v-model.trim='name'>
			</div>
			<div class="ex-addgoods-item">
				<span>商品价格</span>
				<input type="tel" placeholder="请输入价格" maxlength="15" v-model.trim='price'>
			</div>
			<div class="ex-addgoods-pic">
				
				<div class="img">
					<span class="title">商品图片</span>
					<label class="tips">请上传比例为4:3，不超过500K的图片，最多4张</label>
					<div class="ex-addgoods-photo" >
						<span v-for='(item,index) in imgArray' @click='delphoto2(index)'><i class="iconfont">&#xe614;</i><img :src="item" alt=""></span>
						<span v-for='(item,index) in imgurl' @click='delphoto(index)'><i class="iconfont">&#xe614;</i><img :src="item" alt=""></span>
					</div>
					<div class="upload" v-show='imgurl.length < 4'>
						<i class='iconfont'>&#xe608;</i>
						<b>上传照片</b>
						<input type="file" class="uploadimg" id="photo" @change='getfile' accept="image/*">
					</div>
				</div>
			</div>
		</div>
		<div class="ex-addgoods-classify" @click='showmodel'>
				<span>商品分类</span>
				<span class='right' >{{classify}}<i class="iconfont" >&#xe606;</i></span>
			</div>
			<div class="ex-addgoods-group" @click='gotoGroup'>
				<span>商品分组</span>
				<span class='right'>编辑<i class="iconfont">&#xe606;</i></span>
			</div>
			<div class="ex-addgoods-group-list">
				<ul>
					<li v-for='item in groupList' >
					  <span class="checkboxGroup" >
					  	<input type="radio" :value="item.id" v-model="selectGroupId" :id='item.id'>
							<i class="iconfont" v-show='selectGroupId !== item.id'>&#xe646;</i>
							<i class="iconfont select" v-show='selectGroupId === item.id && selectGroupId !== ""'>&#xe630;</i>
					  </span>
						<label :for="item.id" class='name'>{{item.groupName}}</label> 
					</li>
				</ul>
			</div>
		</div>
		<div class="ex-addgoods-save">
			<button type="button" :class="{disableBtn:disableBtn}" @click='save'>保存</button>
		</div>
	
		<div class="modal_BJ" v-show="showClassifyModel" @click='cancleModel'>
			<div class="modal" @click.stop=''>
				<div class="modal_box">
					<div class="title">商品分类</div>
					<div class="field">
						<ul>
							<li v-for='item in classifyList'>
								<label :for="item.id"  class="name">{{item.typeName}}</label>
								<span class="checkboxGroup">
		          		<input type="radio" :value="item.id" :id='item.id' v-model="classifyId" @change='' @click='chageClassify(item)'>
		          		<i class="iconfont" v-show='classifyId != item.id'>&#xe64a;</i>
		          		<i class="iconfont select" v-show='classifyId == item.id && classifyId != ""'>&#xe64d;</i>
		          	</span>
							</li>
						</ul>
					</div>
					<!-- <div class="operate">
						<span href="javascript:void(0)" class="link gray" @click='cancleModel'>取消</span>
						<span href="javascript:void(0)" class="link" @click='cancleModel'>确定</span>
					</div> -->
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
			modal: {
				text:'编辑商品',
				fixed: false
			},
			id:'',
			name: '',
			price: '',
			imgurl: [],
			imgbase64: [],
			classifyList: [],
			classify: '',
			classifyId: '',
			groupList: [],
			groupName: '',
			selectGroupId: '',
			imgArray: [],
			showClassifyModel: false
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disableBtn () {
			let rule = !!this.name && !!this.price && (this.imgurl.length > 0 ||this.imgArray.length > 0 )
			if (!rule) {
				return true
			} else {
				return false
			}
		}
	},
	created () {
		this.getList()
		let info =JSON.parse(window.localStorage.getItem('goodsInfo'))
		this.id = info.id
		this.name = info.commodityName
		this.price = info.price
		this.classify = info.typeName
		this.classifyId = info.commodityTypeId
		this.groupName = info.groupName
		this.selectGroupId = info.groupId
		let array = info.commodityAffixEntityList.map(function(elem) {
			return elem.filePath
		})
		this.imgArray = array
		// window.localStorage.removeItem('goodsInfo')
	},
	components: {
		HeadTitle
	},
	methods: {
		showmodel () {
			this.showClassifyModel = true
		},
		chageClassify (item) {
			this.classify = item.typeName
			this.classifyId = item.id
			this.showClassifyModel = false
		},
		cancleModel () {
			this.showClassifyModel = false
		},
		back () {
			this.$router.back();
		},
		getfile () {
			let _this = this
			let img = document.getElementById('photo').files[0]
			if (img) {
				if (img.size/1024 > 500) {
					MessageBox('提示', '图片大于500K无法使用!')
					return
				}
				this.imgurl.push(window.URL.createObjectURL(img))
				lrz(img,{width:640})
				.then(function (rst) {
	        _this.imgbase64.push(rst.base64) 
	       })
	       .catch(function (err) {
	       _this.imgbase64.push('') 
	       })  
			}
		},
		delphoto (index) {
			let _this = this
			MessageBox({
				  title: '提示',
				  message: '确认删除改图片吗？',
				  showCancelButton: true,
				  confirmButtonText: '删除'
				}).then(action => {
					if (action === 'confirm') {
						_this.imgurl.splice(index, 1)
						_this.imgbase64.splice(index, 1)
					} else {
						return
					}
				})
		},
		delphoto2 (index) {
			let _this = this
			MessageBox({
				  title: '提示',
				  message: '确认删除改图片吗？',
				  showCancelButton: true,
				  confirmButtonText: '删除'
				}).then(action => {
					if (action === 'confirm') {
						_this.imgArray.splice(index, 1)
					} else {
						return
					}
				})
		},
		save () {
			if (!this.name) {
				MessageBox('提示', '商品名称不能为空!')
				return
			}
			if (! /^\d+(\.?\d{1,2})?$/.test(this.price)) {
				MessageBox('提示', '商品价格不合法!')
				return
			}
			if (this.imgurl.length === 0 && this.imgArray.length === 0) {
				MessageBox('提示', '商品图片不能为空!')
				return
			}
			if (this.imgurl.length !== this.imgbase64.length) {
				MessageBox('提示', '图片压缩中请稍后...')
				return
			}

			this.uploadimg()

		},
		uploadimg () {
			if (this.imgbase64.length  === 0) {
				this.addGoods()
				return
			}
			let _this = this
			let formData = new FormData()
			for (let i =0, j = this.imgbase64.length; i<j; i++) {
				formData.append("imgStr", this.imgbase64[i])
			}
			Indicator.open({
			  text: '图片处理中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('upload/pic_min',formData)
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					 _this.imgArray.push(res.data.urls)
					 _this.imgurl = []
					 _this.addGoods()
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				Indicator.close()
				Toast('网络请求超时！')
			})	
		},

		addGoods () {
			let _this = this
			Indicator.open({
			  text: '商品保存中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('commodityInfo/update',qs.stringify({
				id: this.id,
				commodityName: this.name,
				commodityTypeId: this.classifyId,
				groupId: this.selectGroupId,
				price: this.price,
				commodityPictures: this.imgArray.join(',')
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					 MessageBox({
				  title: '提示',
				  message: '修改商品成功！',
				}).then(action => {
					_this.$router.go(-1)
				})


				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				Indicator.close()
				Toast('网络请求超时！')
			})
		},

		getList() {
			let _this = this
			axios.post('commodityInfo/listSet',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.classifyList = res.data.data.typeList || []
					// if (_this.classifyList.length > 0) {
					// 	_this.classify = _this.classifyList[0].typeName
					// 	_this.classifyId = _this.classifyList[0].id
					// }
					_this.groupList = res.data.data.groupList || []
					// if (_this.groupList.length > 0) {
					// 	_this.groupName = _this.groupList[0].groupName
					// 	_this.selectGroupId = _this.groupList[0].id
					// }

				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.nodateStatus = true
					Toast('网络请求超时！')
			})
		},
		gotoGroup () {
			this.$router.push('/display4')
		}
	},
}
</script>
<style scoped>
.ex-addgoods{background-color: #f4f5f7; font-size: 1.4rem; height: 100%; position: relative;}
/*.ex-addgoods-box { margin-bottom: 7rem;position: absolute; width: 100%;}*/
.ex-addgoods-cnt {background-color: #fff; margin: 1rem 0;}
.ex-addgoods-item { border-bottom: 1px solid #eee; padding: 0 1rem; vertical-align: middle; }
.ex-addgoods-item span {  width: 20%; display: inline-block; vertical-align: middle; }
.ex-addgoods-item input { width: 75%;  height: 4rem; vertical-align: middle; border: none; color: #047dcb;}

.ex-addgoods-photo { display: inline-block; vertical-align: middle; }
.ex-addgoods-photo span { width: 6rem; height: 6rem; display: inline-block; margin: 0 1rem 1rem 0; background-color: #f2f2f2; border: 1px solid #eee; position: relative;}
.ex-addgoods-photo span i { font-size: 3rem; color: #fff; width: 3rem;  height: 3rem; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.ex-addgoods-photo span img { width: 100%; height: 100%; }

.ex-addgoods .img {background-color: #fff; border-bottom: 1px solid #e5e5e5; padding: 0.5rem 1rem 1rem; position: relative; vertical-align: middle;}
.ex-addgoods .img .tips {font-size: 1.2rem; color:#aaafb6; display: block; margin-bottom: 1rem;}
.ex-addgoods .img .title {display: block; padding: 0.5rem 0;}
.ex-addgoods .instructions { position: absolute; right: 1rem; bottom: 1rem;  color: #007aff; font-size: 1.2rem;}
.ex-addgoods .upload {width: 6rem; height: 6rem; text-align: center; border: 1px dotted #d8d8d8; color: #aaafb6; font-size: 1.2rem; position: relative;display: inline-block;} 
.ex-addgoods .upload i{ padding-top: 1.3rem; }
.ex-addgoods .upload b{display: block; font-weight: normal;color: #aaafb6;}
.ex-addgoods .showpic {position: absolute; top: 0; left: 0; height: 6.2rem; width: 6.2rem; z-index: 2;}
.ex-addgoods .uploadimg { position: absolute; height: 6rem; width: 6rem; opacity: 0; z-index: 3; left: 0; top: 0;}

.ex-addgoods-classify,.ex-addgoods-group {margin: 1rem 0; background-color: #fff; padding: 1rem;}
.ex-addgoods-classify .right,.ex-addgoods-group .right{float: right; color: #999;}
.ex-addgoods-group{margin-bottom: 0; border-bottom: 1px solid #eee;}

.ex-addgoods-group-list{background-color: #fff; padding: 1rem 2rem;}
.ex-addgoods-group-list li{font-size: 1.4rem; vertical-align: middle; margin-bottom: 0.5rem; }
.ex-addgoods-group-list li .name{ display: inline-block;width: 80%; overflow: hidden; height: 3rem;vertical-align: middle;line-height: 3rem }
.ex-addgoods-group-list li .checkboxGroup{color: #999}
.ex-addgoods-group-list li .checkboxGroup i{vertical-align: middle; font-size: 2.4rem;}
.checkboxGroup { width: 3rem; height: 3rem;  position: relative; display: inline-block; }
.checkboxGroup input {opacity: 0; filter: alpha(opacity=0); position: absolute; left: 0; z-index: 2; width: 100%; height: 100%; margin: 0;}
.checkboxGroup i{ font-size: 3rem; }
.checkboxGroup i.select { color: #56c869; }

.ex-addgoods-save{background-color: #fff;padding: 1rem 0; height: 5rem; width: 100%; /*position: fixed; bottom: 0;*/ border-top:1px solid #eee; margin-top: 1rem;}
.ex-addgoods-save button {height: 5rem; width: 90%; margin-left: 5%; background-color: #077fcc;border-radius: 0.8rem; color: #fff; font-size: 1.8rem;}


.modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 99999;}
.modal{ width: 80%; height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.modal_box{background: #fff;width: 100%;border-radius: 0.5rem;padding-top: 1.5rem;}
.modal_box .title{font-size: 1.6rem; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 1rem;}
.modal_box .field{padding: 1rem 5%; max-height: 21rem; overflow: auto;}
.modal_box .field li{font-size: 1.4rem; vertical-align: middle; margin-bottom: 1rem; }
.modal_box .field li .name{ display: inline-block;width: 80%; overflow: hidden; height: 3rem;vertical-align: middle;line-height: 3rem }
.modal_box .field li .checkboxGroup{color: #999}
.modal_box .field li .checkboxGroup i{vertical-align: middle; font-size: 2.8rem;}

.modal_box .operate{height: 4.5rem;padding: 0;border-top: 1px solid #e5e5e5; text-align: center;}
.modal_box .operate .link{width: 100%;display: inline-block;float: left;line-height: 4.5rem;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.modal_box .operate .gray{color: #596678;}
.modal_box .operate .link:last-child{border-right: none;}
.modal_box .operate .link:active{background: #ebebeb}


</style>