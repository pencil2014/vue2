<template>
	<div class="ex-shop3">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>商家申请</span>
		</div> -->
	  <HeadTitle :title="modal" @callback="back"></HeadTitle>
	  <div class="ex-shop3-result" v-if="examineData.auditStatus === '1'">
	  	<i class="iconfont suc">&#xe609;</i>
	  	<h3>审核中...</h3>
	  	<p>平台正在处理您的申请，请稍等...</p>
	  </div>

	  <div class="ex-shop3-result" v-if="examineData.auditStatus == '0'">
	  	<i class="iconfont err">&#xe63f;</i>
	  	<h3>抱歉，审核未通过！</h3>
	  	<p v-html='examineData.auditOpinion'></p>
	  </div>

		<div class="ex-shop3-cnt">
			<div class="ex-shop3-cnt">
			<div class="ex-shop3-item">
				<span>商家名称</span>
				<b>{{examineData.shopsName}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>联系地址</span>
				<b>{{examineData.shopsAddress2}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>详细地址</span>
				<b>{{examineData.shopsAddress}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>姓名</span>
				<b>{{examineData.shopsLinkman}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>联系电话</span>
				<b>{{examineData.shopsLinkphone}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>营业执照号</span>
				<b>{{examineData.licenseNumber}}</b>
			</div>
			<div class="ex-shop3-item">
				<span>营业执照照片</span>
				<div class="img">
					<img :src="examineData.businessLicense" alt="">
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>法人身份证正反面</span>
				<div class="img">
					<img :src="examineData.legalPic" alt="">
					<img :src="examineData.legalPic1" alt="">
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>负责人手持身份证照片</span>
				<div class="img">
					<img :src="examineData.holdPic" alt="">
				</div>
			</div>
			<div class="ex-shop3-item">
				<span>店面门头照片</span>
				<div class="img">
					<img :src="examineData.facadePhoto" alt="">
				</div>
			</div>
			<div class="ex-shop3-item" v-show="examineData.proxyPic">
				<span>委托书照片</span>
				<div class="img">
					<img :src="examineData.proxyPic" alt="">
				</div>
			</div>
		</div>
		</div>
		<button type='button'  class="ex-shop3-btn" @click='next' v-if="examineData.auditStatus === '0'">重新申请</button>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			examineData: '',
			modal:{
				text:'商家申请',
				fixed: false,
			},
		}
	},
	computed: {
		disableBtn () {
		}
	},
	created () {
		let _this = this
		axios.post('shop/examine',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.examineData = res.data.data
			} else {
				MessageBox('提示', '请求数据失败！')
			}
		})
		.catch(function(){
			Toast('系统错误！')
		})
	},
	methods: {
		back () {
			this.$router.push('/index')
		},
		next () {
			this.$router.push('/shop1')
		}
	},
	components: {
		HeadTitle,
	},
}	
</script>

<style scoped>
.ex-shop3{background-color: #f4f5f7;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;}
.ex-shop3-result {background: #fff; text-align: center; padding: 2rem 0;}
.ex-shop3-result i{ font-size: 5rem; }
.ex-shop3-result i.suc{color: #ffa100;}
.ex-shop3-result i.err{color: #f0544d; }
.ex-shop3-result h3 {font-size: 2rem; font-weight: normal;}
.ex-shop3-result p{color:#aaafb6; padding-top: 0.5rem; }
.ex-shop3-cnt {background-color: #fff; margin: 1.5rem 0; padding: 0 0.5rem;}
.ex-shop3-item {border-bottom: 1px solid #e5e5e5; padding: 1rem 0; overflow: hidden;}
.ex-shop3-item b{font-weight: normal; color:#aaafb6; }
.ex-shop3-item b,.ex-shop3-item .img {float: right;}
.ex-shop3-item .img img{ width: 6rem; height: auto;  margin-left: 1rem;}
.ex-shop3-btn { display: block; background-color: #047dcb; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%;position: fixed;bottom: 1rem;left: 4%;}
.ex-shop3-btn:active{background-color:#0470b6; }
</style> 