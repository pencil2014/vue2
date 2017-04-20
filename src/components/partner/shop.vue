<template>
	<div class="ex-shop">
		<div class="ex-shop-head">
			<div class="ex-shop-head-banner">
				<mt-swipe :auto="5000">
				  <mt-swipe-item v-for='item in imgurl'>{{item}}</mt-swipe-item>
				</mt-swipe>
			</div>
			<div class="ex-shop-search">
				<div class="ex-shop-address">
					<img src="" alt="">
					<span>{{address}}</span>
					<i class="iconfont">&#xe60d;</i>
					<i class="iconfont">&#xe60e;</i>
				</div>
				<div class="ex-shop-search">
					<img src="" alt="">
					<input type="search" name="" id="">
				</div>
			</div>
		</div>

		<div class="sx-shop-menu">
			<li><router-link to="/">
				<img src="../../assets/images/shop1.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop2.png" alt="">
				<span>休闲娱乐</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop3.png" alt="">
				<span>酒店住宿</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop4.png" alt="">
				<span>出行游玩</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop5.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop6.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop7.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
			<li><router-link to="/">
				<img src="../../assets/images/shop8.png" alt="">
				<span>餐饮美食</span>
			</router-link></li>
		</div>
		
	</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
	data(){
		return {
			imgurl: [1,2,3]
		}
	},
	methods: {

	}
}	
</script>

<style scoped>
.ex-shop-head{ height: 16rem; position: relative; }
.ex-shop-head-banner { height: 100%;background-color: #eee;}

</style>