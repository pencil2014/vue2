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
						<img :src="info.facadePhoto" alt="">
						<i class="iconfont" >&#xe606;</i>
					</span>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="item">
					<span class="left">商品管理</span>
					<span class="right" @click="toproduct">
						已编辑
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
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			info:'',
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
		// 获取用户详情
		axios.post('shop/examine',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.info = res.data.data;
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
				Toast('网络请求超时！')
		})
	},
	methods: {
		back () {
			this.$router.back();
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
.item span{display: inline-block;vertical-align: top;}
.item .left{width: 29%;font-size: 1.4rem;}
.item .right{width: 70%;text-align: right;color: #aaafb6}
.item .right label{color: #212a32;}
.item .right img{width: 7rem;vertical-align: middle;}
.item .right i{}
</style>