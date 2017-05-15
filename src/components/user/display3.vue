<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content">
				<li class="item">
					<span>商品名称</span>
					<input type="text" placeholder="最多8个字符" maxlength="8" v-model.trim="commodityName">
				</li>
				<li class="item">
					<span>商品价格</span>
					<input type="text" placeholder="请输入价格" maxlength="8" v-model.trim="price">
				</li>
				<li class="item picture">
					<p>商品图片</p>
					<!-- 请上传比例为4:3，小于500K的图片 -->
					<div class="UpLoadIMG">
						<div class="report-pic" v-for='(item,index) in imgurl'>
							<img :src="item">
							<label class="delect" @click='delpicture(index)'>x</label>
						</div>
						<div class="report-file" v-show='imgurl.length < 4'>
							<span>
								<i class="iconfont">&#xe608;</i>
								<br>
								上传照片
							</span>
							<input type="file" name="" class="file-prew" id="frontPic" @change="getfile" />
						</div>
					</div>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item" @click="openTypeList">
					<span>商品分类</span>
					<label class="right">
						{{typeName}}
						<i class="iconfont" >&#xe606;</i>
					</label>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item" @click="todisplay4">
					<span>店铺分组</span>
					<label class="right">
						编辑
						<i class="iconfont">&#xe606;</i>
					</label>
				</li>
				<li class="item-option" v-for="(item,index) in groupList" @click="selground(item.id)" v-if='item.id !==0'>
					<div :class="{'select': groupId === item.id}">
						<span class="option"></span>
						{{item.groupName}}
					</div>
				</li>
			</ul>
		</div>
		<div class="ex-button">
			<button @click="submit" :class="{disable:disableBtn}">提交</button>
		</div>

		<div class="modal_BJ" v-show="isTypeList">
			<div class="modal">
				<div class="modal_box">
					<div class="title">商品分类</div>
					<div class="field">
						<ul>
							<li v-for="(item,index) in TypeList" @click="seltype(item.id,item.typeName)" >
								<span>{{item.typeName}}</span>
								<span class="option" :class="{'select': selcommodityTypeId === item.id}"></span>
							</li>
						</ul>
					</div>
					<div class="operate">
						<span href="javascript:void(0)" class="link gray" @click="cancle">取消</span>
						<span href="javascript:void(0)" class="link" @click="confirm">确定</span>
					</div>
				</div>
			</div>
		</div>
		<!-- <Popup
			 v-model="isTypeList"
			 position="bottom"
			 class="ex-picker"
      		>
      		<Picker 
      		:slots="TypeList" 
      		:defaultIndex="defaultIndex"
      		:showToolbar="true"
      		@change="changeType"
      		>
      			<slot>
				    <b class="ex-sexslot" @click="selType">确认</b>
				</slot>	
      		</Picker>
      	</Popup> -->
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import lrz from 'lrz'
import { MessageBox, Indicator, Toast , Popup ,Picker } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			groupList: [],
			TypeList:[],
			isTypeList: false,
			typeindex:'',
			typeName:'',
			seltypeName: '',
			commodityTypeId: '',
			selcommodityTypeId:'',
			imgurl:[],
			imgbase64:[],
			groupId: '',
			commodityName:'',
			price:'',
			modal: {
				text:'添加产品',
				fixed: false
			},
			submitbtn: false,
			islrz: false
		}
	},
	components: {
		HeadTitle,
		Popup,
		Picker
	},
	computed:{
		disableBtn () {
			if(!this.commodityName && !this.price){
				return true
			}else{
				return false
			}
		},
	},
	created () {
		let addgoods = this.getdata('addgoods')
		if(!!addgoods){
			this.commodityName = addgoods.commodityName;
			this.selcommodityTypeId = addgoods.selcommodityTypeId;
			this.commodityTypeId = addgoods.commodityTypeId;
			this.price = addgoods.price;
			this.imgurl = addgoods.imgurl;
			this.imgbase64 = addgoods.imgbase64;
			this.groupId = addgoods.groupId;
			this.typeName = addgoods.typeName;
		}
		this.getGroupList()
		this.getList()
	},
	methods: {
		back () {
			let _this = this
			if(!!this.getdata('addgoods')){
				MessageBox({
					title:'提示',
					message:'确定退出添加产品?',
					showConfirmButton:true,
					showCancelButton:true,
					confirmButtonText:'确认退出并保存',
					cancelButtonText:'取消',
				}).then(action =>{
					if(action === "confirm"){
						let obj = {
							commodityName: this.commodityName,
							selcommodityTypeId: this.selcommodityTypeId,
							commodityTypeId: this.commodityTypeId,
							price: this.price,
							imgurl: this.imgurl,
							imgbase64: this.imgbase64,
							groupId: this.groupId,
							typeName: this.typeName
						};
						localStorage.setItem('addgoods',JSON.stringify(obj))
						_this.$router.back();
					}
				});
				return
			}
			_this.$router.back();
		},
		getdata (k) {
			let v = localStorage.getItem(k);
            try {
                v = JSON.parse(v);
            } catch(e) {

            }
            return v;
		},
		todisplay4 () {
			let obj = {
				commodityName: this.commodityName,
				selcommodityTypeId: this.selcommodityTypeId,
				commodityTypeId: this.commodityTypeId,
				price: this.price,
				imgurl: this.imgurl,
				imgbase64: this.imgbase64,
				groupId: this.groupId,
				typeName: this.typeName
			};
			localStorage.setItem('addgoods',JSON.stringify(obj))
			this.$router.push('/display4')
		},
		openTypeList () {
			this.isTypeList = true
		},
		cancle () {
			this.isTypeList = false
			if(!this.commodityTypeId){
				this.selcommodityTypeId = ''
				this.seltypeName = ''
				return
			}
			this.selcommodityTypeId = this.commodityTypeId
		},
		confirm () {
			this.isTypeList = false
			// console.log(this.selcommodityTypeId,this.commodityTypeId)
			if(this.selcommodityTypeId !== this.commodityTypeId){
				this.typeName = this.seltypeName
				this.commodityTypeId = this.selcommodityTypeId
			}
		},
		seltype (id,typeName) {
			this.selcommodityTypeId = id
			this.seltypeName = typeName
		},
		selground (id) {
			this.groupId = id
		},
		getfile () {
			let _this = this
			let img = document.getElementById('frontPic').files[0]
			if (img) {
				// if (img.size/1024 > 500) {
				// 	MessageBox('提示', '图片大于500K无法使用!')
				// 	return
				// }
				Indicator.open({
				  text: '图片压缩中...',
				  spinnerType: 'fading-circle'
				})
				this.islrz = true
				this.imgurl.push(window.URL.createObjectURL(img))
				lrz(img,{width:640})
				.then(function (rst) {
					Indicator.close()
			        _this.imgbase64.push(rst.base64)
			        _this.islrz = false
			    })
	       		.catch(function (err) {
	       			Indicator.close()
	       			_this.islrz = false
	      			_this.imgbase64.push('') 
	      			Toast('图片压缩失败')
	       		})  
			}
		},
		delpicture (index) {
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
		submit () {
			if (this.disableBtn) {
				return
			}
			if (this.submitbtn) {
				return
			}
			if (! /^\d+(\.?\d{1,2})?$/.test(this.price)) {
				MessageBox('提示', '商品价格不合法!')
				return
			}
			if (this.imgurl.length === 0) {
				MessageBox('提示', '商品图片不能为空!')
				return
			}
			if (this.commodityTypeId === '') {
				MessageBox('提示', '请选择商品分类!')
				return
			}
			if (this.islrz) {
				MessageBox('提示', '图片压缩中请稍后...')
				return
			}
			this.submitbtn = true
			this.UpLoadIMG()
		},
		UpLoadIMG () {
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
					 _this.imgArray = res.data.urls
					 _this.addgoods()
				} else {
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				_this.submitbtn = false
				Indicator.close()
				Toast('网络请求超时！')
			})	
		},
		addgoods () {
			let _this = this
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('commodityInfo/add',qs.stringify({
				commodityName: _this.commodityName,
				commodityTypeId: _this.commodityTypeId,
				groupId: _this.groupId,
				price: _this.price,
				commodityPictures: _this.imgArray.join(',')
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					localStorage.setItem('addgoods','')
					MessageBox({
					  title: '提示',
					  message: '添加成功！',
					}).then(action => {
						_this.$router.go(-1)
					})
				} else {
					_this.submitbtn = false
					Toast(res.data.msg)
				}
			})
			.catch(function(res){
				_this.submitbtn = false
				Indicator.close()
				Toast('网络请求超时！')
			})
		},
		getGroupList () {
				let _this = this
				axios.post('commodityGroup/list',qs.stringify({})).then(function(res){
					if (res.data.code === '10000') {
						_this.groupList = res.data.data.list
						//console.log(_this.groupList)
					} else {
						Toast(res.data.msg)
					}
				}).catch(function(){
						Toast('网络请求超时！')
				})
		},
		getList() {
			let _this = this
			axios.post('commodityType/list',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.TypeList = res.data.data
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.nodateStatus = true
				Toast('网络请求超时！')
			})
		},
		currency (id) {
			let value = this[id];
			this[id] = value.replace(/\s/g,'').replace(/^([0-9]{1,})(\.+)$/,'$1.').replace(/^([0-9]{1,})(\.[0-9]{1,2})(.*)$/,'$1$2')
		},
		todisplay3 () {
			if(this.isedit){
				return
			}
			this.$router.push('/display3')
		},
	},
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;padding-bottom: 56px;}
.ex-display .wrapper {}
.ex-display .wrapper .item-content{background: #fff;margin-top: 15px;}
.ex-display .wrapper .item {min-height: 30px;line-height: 30px;font-size: 1.4rem;padding: 9px 0;border-bottom: solid 1px #ebebeb;margin-left: 10px;}
.ex-display .wrapper li.picture{color: #aaafb6;line-height: 25px;}
.ex-display .wrapper li.picture p{color: #212a32;}
.ex-display .wrapper .item:last-child{border-bottom: none;}
.ex-display .wrapper .item span{width: 25%;display: inline-block;}
.ex-display .wrapper .item input{border: none;width: 70%;}
.ex-display .wrapper .item label.right{float: right;padding-right: 10px;color: #aaafb6;}

.ex-display .wrapper .item-content .item-option{font-size: 1.4rem;padding: 9px 0 9px 25px;line-height: 30px;}
.ex-display .wrapper .item-content .item-option div{}
.ex-display .wrapper .item-content .item-option div .option{display: inline-block;width: 20px;height: 20px;background: url(../../assets/images/noselect.png) no-repeat;background-size: 100%;vertical-align: middle;}
.ex-display .wrapper .item-content .item-option div.select{color: #0c87d5;	}
.ex-display .wrapper .item-content .item-option div.select .option{background: url(../../assets/images/select.png) no-repeat;background-size: 100%;}

.ex-display .wrapper .item .report-file {overflow: hidden;position: relative;border: dotted 1px #d8d8d8;text-align: center;}
.ex-display .wrapper .item .report-file span{cursor: pointer;display: block;width: 100%;line-height: 20px;padding-top: 12px;}
.ex-display .wrapper .item .report-file .file-prew{opacity: 0;filter: alpha(opacity=0);cursor: pointer;position: absolute;left: 0;top: 0;z-index: 10;width: 100%;height: 100%;}
.UpLoadIMG{margin: 15px 0 0 0;}
.ex-display .wrapper .item .UpLoadIMG div{/*display: inline-flex;*/display: inline-block;width: 64px;height: 64px;margin: 0 9px;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic {border: solid 1px #ebebeb;position: relative;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic img{;width: 100%;height: 100%;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic .delect{position:absolute;top: -12px;right: -10px;background: #666;color: #fff;display: inline-block;width: 24px;height: 24px;text-align: center;border-radius: 50%;font-size: 24px;line-height: 20px;}

.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
.ex-button button.disable {background-color: #999}
.ex-button button.disable:active{background-color: #999}

.ex-picker{text-align: center;display: block;line-height: 40px;font-size: 2rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb }
.ex-picker{width: 100%;}
.picker-slot-wrapper,.picker-item {backface-visibility: hidden; }
.ex-picker{text-align: center;display: block;line-height: 40px;font-size: 2rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb }

.ex-display .modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 999;display: table;}
.ex-display .modal_BJ .modal{display: table-cell;padding: 0 12%;vertical-align: middle;}
.ex-display .modal_BJ .modal .modal_box{background: #fff;width: 100%;border-radius: 5px;overflow: hidden;text-align: center;padding: 10px 0 0 0;}
.ex-display .modal_BJ .modal .modal_box .title{font-size: 1.6rem;}
.ex-display .modal_BJ .modal .modal_box .field{text-align: center;padding: 15px 25px;max-height: 200px;overflow-y: scroll;}
.ex-display .modal_BJ .modal .modal_box .field ul li{text-align: left;font-size: 1.4rem;height: 40px;line-height: 40px;}
.ex-display .modal_BJ .modal .modal_box .field span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 20px;height: 20px;float: right;margin-top: 10px;}
.ex-display .modal_BJ .modal .modal_box .field span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.ex-display .modal_BJ .modal .modal_box .operate{height: 46px;padding: 0;border-top: 1px solid #e5e5e5;}
.ex-display .modal_BJ .modal .modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 46px;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .operate .gray{color: #596678;}
.ex-display .modal_BJ .modal .modal_box .operate .link:last-child{border-right: none;}
.ex-display .modal_BJ .modal .modal_box .operate .link:active{background: #ebebeb}
</style>