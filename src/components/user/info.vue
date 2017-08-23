<template>
	<div class="ex-addgoods">
		<div class="ex-addgoods-box">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-addgoods-cnt">
			<div class="ex-addgoods-item">
				<span>商品名称</span>
				<input type="text" placeholder="最多8个字符" maxlength="8" v-model.trim='name' readonly="true">
			</div>
			<div class="ex-addgoods-item">
				<span>商品价格</span>
				<input type="number" placeholder="请输入价格" maxlength="11" v-model.trim='price' readonly="true">
			</div>
			<div class="ex-addgoods-pic">
				
				<div class="img">
					<span class="title">商品图片</span>
					<label class="tips">请上传比例为4:3，不超过500K的图片，最多4张</label>
					<div class="ex-addgoods-photo" >
						<span v-for='item in imgurl'><img :src="item.filePath" alt=""></span>
					</div>
				</div>
			</div>
		</div>
		<div class="ex-addgoods-classify" @click='tips'>
				<span>商品分类</span>
				<span class='right' >{{classify}}<i class="iconfont" >&#xe606;</i></span>
			</div>
			<div class="ex-addgoods-group" @click='tips'>
				<span>商品分组</span>
				<span class='right'>编辑<i class="iconfont">&#xe606;</i></span>
			</div>
			<div class="ex-addgoods-group-list">
				<ul>
					<li>
					  <span class="checkboxGroup" >
							<i class="iconfont select">&#xe630;</i>
					  </span>
						<label class='name'>{{groupName}}</label> 
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Toast} from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'查看商品',
				fixed: false
			},
			name: '',
			price: '',
			imgurl: [],
			classify: '',
			classifyId: '',
			groupName: '',
			groupId: ''
		}
	},
	components: {
		HeadTitle,
	},
	computed:{

	},
	created () {
		let info =JSON.parse(window.localStorage.getItem('goodsInfo'))
		if (!!info) {
			this.name = info.commodityName
			this.price = info.price
			this.imgurl = info.commodityAffixEntityList
			this.classify = info.typeName
			this.classifyId = info.commodityTypeId
			this.groupName = info.groupName
			this.groupId = info.groupId
			window.localStorage.removeItem('goodsInfo')
		} else {
			let _this = this 
			// 获取用户详情
			axios.post('/exsd-web/shop/examine',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					let id = res.data.data.id
					_this.$router.push({name: 'Display2',params:{id: id}})
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
				
			}
		
	},
	components: {
		HeadTitle
	},
	methods: {
		back () {
			this.$router.back();
		},
		tips () {
			MessageBox('提示', '审核中和已出售的商品不允许编辑！')
		}
	}
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




</style>