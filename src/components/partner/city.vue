<template>
	<div class="ex-city">
		<div class="ex-city-top">
			<div class="ex-city-back" @click='back'>
				<i class="iconfont">&#xe605;</i>
			</div>
			<div class="ex-city-input">
				<i class="iconfont">&#xe67a;</i>
				<input type="search" name="" id="" placeholder="输入城市名称/首字母查询"  v-model='keyword' @keypress.prevent='search'>
			</div>
		</div>
		<div class="ex-city-cnt">
			<div class="ex-city-history">
				<h3 class="title">当前：{{city}}</h3>
				<div class="ex-city-history-cnt">
					<div class="item">
						<div class="sub">
							<p>历史访问城市</p>
							<span></span>
						</div>
						<ul>
							<li v-for='item in historycity'>{{item}}</li>
						</ul>
					</div>
					<div class="item hot">
						<div class="sub">
							<p>热门城市</p>
							<span></span>
						</div>
						<ul>
							<li v-for='item in hotcity'>{{item}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="ex-city-box">
				<mt-index-list>
				  <mt-index-section index="A">
				    <mt-cell title="Aaron" @click.native='setAddress("Aaron")'></mt-cell>
				    <mt-cell title="Alden"></mt-cell>
				    <mt-cell title="Austin"></mt-cell>
				  </mt-index-section>
				  <mt-index-section index="B">
				    <mt-cell title="Baldwin"></mt-cell>
				    <mt-cell title="Braden"></mt-cell>
				  </mt-index-section>
				  ...
				  <mt-index-section index="Z">
				    <mt-cell title="Zack"></mt-cell>
				    <mt-cell title="Zane"></mt-cell>
				  </mt-index-section>
				</mt-index-list>
			</div>
			
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { IndexList, IndexSection } from 'mint-ui'
export default {
	data () {
		return {
			keyword: '',
			city: '深圳市',
			historycity: ['深圳','广州','惠州'],
			hotcity: ['长沙','武汉','成都','厦门','重庆','杭州']

		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		search () {
			alert(this.keyword)
		},
		setAddress (value) {
			let historycity = JSON.parse(window.localStorage.getItem('historycity')) 
			if (!!historycity && historycity.indexOf(value) === -1 ) {
				historycity.unshift(value)
			}
			if (!historycity) {
				historycity = [value]
			}
			if (historycity.length > 10) {
				historycity.shift()
			}
			window.localStorage.setItem('historycity', JSON.stringify(historycity))
		}
	},
	created () {
		let historycity = JSON.parse(window.localStorage.getItem('historycity')) 
		if (!!historycity) {
			this.historycity = historycity
		}
	}
}	
</script>

<style scoped>
.ex-city-top { height: 5.5rem; position: fixed; top: 0; left: 0; width: 100%;line-height: 5.5rem; border-bottom: 1px solid #eee; background-color: #fff; z-index: 3;}
.ex-city-back { width: 18%; float: left; height: 100%;  text-align: center; color: #047dcb;}
.ex-city-back i {font-size: 3rem;}
.ex-city-input { width: 82%; float: right; height: 4.5rem; position: relative;}
.ex-city-input i{ float: left;  position: absolute; left: 3%; top: 0.1rem; color: #999;}
.ex-city-input input { border:none; background-color: #eee; border-radius: 2rem; height: 3.5rem; width: 95%; padding-left: 12%; }
.ex-city-cnt {margin-top: 5.5rem;}
.ex-city-history {background-color: #eee;}
.ex-city-history .title { font-weight: normal; height: 5rem; line-height: 5rem; padding-left: 2rem; background-color: #fff; }

.ex-city-history .sub { padding:1.5rem 2rem 1rem 2rem; position: relative; font-size: 1.4rem; color: #666; font-size: 1.2rem;}
.ex-city-history .sub p{background-color: #eee; position: relative; z-index: 2; display: inline-block; padding-right: 1rem;}
.ex-city-history .sub span {height: 1px; background-color: #ddd; position: absolute; top: 2.0rem; left: 4rem; width: 100%;}
.ex-city-history .hot{margin-top: -1rem;} 
.ex-city-history .item ul{ padding:0  2rem; overflow: hidden; }
.ex-city-history .item ul li { width: 22%; margin-right: 2%; float: left;background-color: #fff; border:1px solid #ddd;  text-align: center; padding: 1rem 0; margin-bottom: 1rem;}
</style>