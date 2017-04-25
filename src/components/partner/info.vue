<template>
	<div class="ex-shop-info">
		<div class="ex-shop-info-banner">
			<span class='back' @click='goback'><i class="iconfont">&#xe605;</i></span>
			<img src="../../assets/images/food1.jpg" alt="">
			<h3>{{shopinfo.shopsName}}</h3>
		</div>
		<div class="ex-shop-info-addr">
			<p><i class="iconfont">&#xe634;</i><span>{{shopinfo.shopsAddress}}</span></p>
			<p><i class="iconfont">&#xe6ed;</i> <a :href="'tel:'+shopinfo.shopsLinkphone">{{shopinfo.shopsLinkphone}}</a></p>
		</div>
		<div class="ex-shop-info-goods">
			<div class="ex-shop-info-title">
					<h3>商品信息</h3>
					<span></span>
			</div>
			<div class="ex-shop-info-cnt">
				<div class="ex-shop-info-classify">
					<ul>
						<li v-for='(item,index) in shopinfo.foods' :class='{active: index === num}' @click='num = index'> {{item.classify}}</li>
					</ul>
				</div>
				<div class="ex-shop-info-list">
					<ul>
						<li class="ex-shop-item"  v-for='item in list'>
							<div class="img" v-if='item.photo'>
								<img :src="item.photo" alt="">
							</div>
							<div class="info">
								<h3 class='name'>{{item.name}}</h3>
								<p class='rice'>- {{item.rice}} -</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import {Toast } from 'mint-ui'
export default {
	data () {
		return {
			shopinfo: {
				id: 28,
				shopsName: '测试商家',
				facadePhoto: '',
				shopsAddress: '广东深圳南山区南山讯美科技广场',
				summary: '',
				shopsLinkphone: '13418673136',
				shopsLinkman: '陈文',
				foods: [
					{
						classify: '我的分组1',
						list: [
							{
								photo: '...',
								name: '商品名称1',
								rice: '520.00'
							},
							{
								photo: '...',
								name: '商品名称1',
								rice: '520.00'
							},
							{
								photo: '...',
								name: '商品名称1',
								rice: '520.00'
							}
						]
					},
					{
						classify: '我的分组2',
						list: [
							{
								photo: '...',
								name: '商品名称2',
								rice: '520.00'
							},
							{
								photo: '...',
								name: '商品名称2',
								rice: '520.00'
							}
						]
					}
				]
			},
			num: 0
		}
	},
	methods: {
		goback () {
			this.$router.go(-1)
		}
	},
	computed: {
		list () {
			return this.shopinfo.foods[this.num].list
		}
	},
	created () {
		let _this = this
		this.id = this.$route.params.id
		axios.post('shop/examineUnion',qs.stringify({id: this.id}))
		.then(function(res){
			if (res.data.code === '10000') {
				// _this.shopinfo = res.data.data
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('网络请求超时！')
		})
	}
}	
</script>

<style scoped>
.ex-shop-info{background-color: #efefef;}
.ex-shop-info-banner { height: 20rem; position: relative; overflow: hidden; background-color: #fff;}
.ex-shop-info-banner img{ height: 20rem; width: 100%; }
.ex-shop-info-banner h3{ position: absolute; bottom: 0; left: 0 ;width: 100%;background-color: rgba(0,0,0,0.4); height: 5rem;  line-height: 5rem; padding-left: 2rem; color: #fff; font-size: 2rem; font-weight: normal;}
.ex-shop-info-banner .back {position: absolute; top: 1rem; left: 1rem; display: inline-block; background-color: rgba(0,0,0,0.3); color: #fff; width: 5rem; height: 5rem; line-height: 5rem; text-align: center; border-radius: 0.4rem;}
.ex-shop-info-banner .back i{font-size: 3rem;}
.ex-shop-info-addr{background-color: #fff;}
.ex-shop-info-addr p{ padding: 1.5rem 1rem; border-bottom: 1px solid #eee; font-size: 1.4rem; }
.ex-shop-info-addr p i{font-size: 2rem; margin-right: 0.5rem;}
.ex-shop-info-addr a{color: #000;}

.ex-shop-info-title {text-align: center; border-bottom: 1px solid #eee;background-color: #fff; margin-top: 1rem; position: relative;}
.ex-shop-info-title h3 {font-size: 1.6rem; line-height: 5rem; position: relative; z-index: 2; background-color: #fff; display: inline-block; padding: 0 1rem;}
.ex-shop-info-title span{display: block; width: 40%;  left: 30%; height: 1px; background-color: #ddd; position: absolute; top: 2.5rem; }

.ex-shop-info-cnt { background-color: #fff; border-top:1px solid #fff; overflow: hidden; min-height: 20rem; margin-top: -1px;}
.ex-shop-info-classify { width: 20%; float: left; background-color: #f5f5f5; height: 100%;  border-right: 1px solid #e4e1e1; padding-bottom: 1000rem; margin-bottom: -1000rem;}
.ex-shop-info-classify li { padding: 1.5rem 0; text-align: center; border-bottom: 1px solid #e4e1e1; overflow: hidden;}
.ex-shop-info-classify li.active{background-color: #fff; border-right:none; margin-right: -1px;}
.ex-shop-info-list { margin-left: 25%; }
.ex-shop-item {overflow: hidden; padding:0 1rem 1rem 0; border-bottom: 1px solid #eee; margin-top: 1rem; background-color: #fff;}
.ex-shop-item .img { width: 7rem; height: 7rem; float: left; background-color: #f2f2f2; border-radius: 1rem; overflow: hidden; line-height: 7rem;vertical-align: middle;}
.ex-shop-item .img img{ width: 7rem; vertical-align: middle;}
.ex-shop-item .info {margin-left: 8rem;font-size: 1.4rem;}
.ex-shop-item .info .name {font-weight: normal; font-size: 1.4rem; padding: 0.5rem 0;}
.ex-shop-item .info .rice{ color: #ec5909; }
.ex-shop-item .info .phone{color: #666; padding-top: 0.5rem;}


</style>