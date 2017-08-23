<template>
	<div class="ex-city">
		<div class="ex-city-top">
			<div class="ex-city-back" @click='back'>
				<i class="iconfont">&#xe605;</i>
			</div>
			<div class="ex-city-input">
				<i class="iconfont">&#xe67a;</i>
				<input type="search" name="" id="" placeholder="输入城市名称"  v-model.trim='keyword'>
				<span @click='search'>搜索</span>
			</div>
		</div>
		<div class="ex-city-cnt">
			<div class="ex-city-history">
				<h3 class="title">当前：{{city}}</h3>
				<div class="ex-city-history-cnt">
					<div class="item">
						<div class="sub" v-if='historycity.length > 0'>
							<p>历史访问城市</p>
							<span></span>
						</div>
						<ul>
							<li v-for='item in historycity' @click='setAddress(item)'>{{item.regionName}}</li>
						</ul>
					</div>
					<!-- <div class="item hot">
						<div class="sub">
							<p>热门城市</p>
							<span></span>
						</div>
						<ul>
							<li v-for='item in hotcity' @click='setAddress(item)'>{{item.regionName}}</li>
						</ul>
					</div> -->
				</div>
			</div>
			<div class="ex-city-box">
					<mt-index-list v-show='showcity'>
					  <mt-index-section :index="key" v-for='(value, key) in citylist' :key='key' v-if='value.length > 0'>
					    <mt-cell :title="i.regionName"  v-for='i in value' :key='i.regionId' @click.native='setAddress(i)'></mt-cell>
					  </mt-index-section>
					</mt-index-list>
					<ul v-show='!showcity' class="searchitem">
						<li v-for='item in searchcity'  @click='setAddress(item)'>{{item.regionName}}</li>
					</ul>
			</div>
			
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { IndexList, IndexSection, Toast, Indicator} from 'mint-ui'
export default {
	data () {
		return {
			keyword: '',
			city: '深圳市',
			historycity: [],
			// hotcity: [],
			citylist: [],
			showcity: true
		}
	},
	computed: {
		searchcity () {
			let _this = this
			let city = []
			for (var i in this.citylist) {
				if (this.citylist.hasOwnProperty(i)) {
					city.push(...this.citylist[i])
				}
			}
			if (city.length <= 0) {
				return
			}
			let array = city.filter(function(el,index) {
				return el.regionName.indexOf(_this.keyword) > -1
			})
			return array
		}
	},
	watch: {
		keyword () {
			if (!this.keyword) {
				this.showcity = true
			}
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		search () {
			if (!this.keyword) {
				this.showcity = true
			} else {
				this.showcity = false
			}
			
		},
		setAddress (item) {
			let historycity = JSON.parse(window.localStorage.getItem('historycity')) 
			if (!!historycity) {
				let num = ''
				let x = historycity.filter(function(el,index) {
					if (el.regionId === item.regionId) {
						num = index
						return item
					}
				})
				if (x.length) {
					historycity.splice(num, 1)
				}
				historycity.unshift(item)
			}
			if (!historycity) {
				historycity = [item]
			}
			if (historycity.length > 3) {
				historycity.pop()
			}
			window.localStorage.setItem('historycity', JSON.stringify(historycity))
			this.$router.push('/partner')
		}

	},
	created () {
		let historycity = JSON.parse(window.localStorage.getItem('historycity')) 
		let address = window.localStorage.getItem('address')
		let citylist =  window.localStorage.getItem('citylist')
		if (address) {
			this.city = address
		} else if (!address && historycity) {
			this.city =historycity[0].regionName
		} else {
			this.city = '无法获取定位'
		}
		if (!!historycity) {
			this.historycity = historycity
		}
		if (citylist) {
			this.citylist = JSON.parse(citylist)
		} else {
			let _this = this
			Indicator.open({
				  text: '数据加载中...',
				  spinnerType: 'fading-circle'
				})
			axios.post('/exsd-web/cityList',qs.stringify({}))
			.then(function(res){
				Indicator.close()			
				if (res.data.code === '10000') {
					// _this.hotcity = res.data.data.hot
					delete res.data.data.hot
					_this.citylist = res.data.data
					window.localStorage.setItem('citylist', JSON.stringify(res.data.data))
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		}
		
	
	},
	destroyed () {
		Indicator.close()
	}
}	
</script>

<style scoped>
.ex-city-top { height: 5.5rem; position: fixed; top: 0; left: 0; width: 100%;line-height: 5.5rem; border-bottom: 1px solid #eee; background-color: #fff; z-index: 3;}
.ex-city-back { width: 18%; float: left; height: 100%;  text-align: center; color: #047dcb;}
.ex-city-back i {font-size: 3rem;}
.ex-city-input { width: 82%; float: right; height: 4.5rem; position: relative;}
.ex-city-input i{ float: left;  position: absolute; left: 3%; top: 0.1rem; color: #999;}
.ex-city-input input { border:none; background-color: #eee; border-radius: 2rem; height: 3.5rem; width: 80%; padding-left: 12%; }
.ex-city-input span { color: #047dcb; font-size: 1.4rem; padding-left: 1rem;}
.ex-city-cnt {margin-top: 5.5rem;}
.ex-city-history {background-color: #eee;}
.ex-city-history .title { font-weight: normal; height: 5rem; line-height: 5rem; padding-left: 2rem; background-color: #fff; }

.ex-city-history .sub { padding:1.5rem 2rem 1rem 2rem; position: relative; font-size: 1.4rem; color: #666; font-size: 1.2rem;}
.ex-city-history .sub p{background-color: #eee; position: relative; z-index: 2; display: inline-block; padding-right: 1rem;}
.ex-city-history .sub span {height: 1px; background-color: #ddd; position: absolute; top: 2.0rem; left: 4rem; width: 100%;}
.ex-city-history .hot{margin-top: -1rem;} 
.ex-city-history .item ul{ padding:0  2rem; overflow: hidden; }
.ex-city-history .item ul li { width: 22%; margin-right: 2%; float: left;background-color: #fff; border:1px solid #ddd;  text-align: center; padding: 1rem 0; margin-bottom: 1rem;}
.searchitem li{ padding: 1rem; border-bottom: 1px solid #eee; font-size: 16px; line-height: 1;}
</style>