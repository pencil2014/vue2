<template>
	<div class="ex-declare">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>消费登记</span>
		</div>
		<div class="ex-declare-progress">
			<p class="percent">
				<span></span>
			</p>
			<div class="ex-declare-progress-item active">
				<b>1</b>
				<span>基本信息</span>
			</div>
			<div class="ex-declare-progress-item active">
				<b>2</b>
				<span>消费凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>3</b>
				<span>汇款凭证</span>
			</div>
			<div class="ex-declare-progress-item">
				<b>4</b>
				<span>审核结果</span>
			</div>
		</div>
		<div class="ex-declare-cnt">
			<div class="ex-declare-result" v-if="check === 1">
		  	<i class="iconfont suc">&#xe609;</i>
		  	<h3>审核中...</h3>
		  	<p>您提交的资料正在审核中...</p>
		  </div>

		  <div class="ex-declare-result" v-if="check === 2">
		  	<i class="iconfont err">&#xe63f;</i>
		  	<h3>抱歉，审核不通过！</h3>
		  	<p>{{auditOpinion}}</p>
		  </div>
		  <div class="ex-declare-result" v-if="check === 3">
		  	<i class="iconfont del">&#xe63f;</i>
		  	<h3>已撤销！</h3>
		  	<p>{{auditOpinion}}</p>
		  </div>
		</div>
		<div class="ex-declare-check">
			<div class="ex-declare-item">
				<span>单号</span>
				<b>{{checkdata.orderNo}}</b>
			</div>
			<div class="ex-declare-item">
				<span>登记时间</span>
				<b>{{checkdata.createTime | formatTime }}</b>
			</div>
			<div class="ex-declare-item">
				<span>买家用户编号</span>
				<b>{{checkdata.userCode}}</b>
			</div>
			<div class="ex-declare-item">
				<span>商品名称</span>
				<b>{{checkdata.commodityName}}</b>
			</div>
			<div class="ex-declare-item">
				<span>消费金额</span>
				<b>￥{{checkdata.consumptionMoney}}</b>
			</div>
			<div class="ex-declare-item" v-if='checkdata.rangliMoney'>
				<span>让利款</span>
				<b>￥{{checkdata.rangliMoney}}</b>
			</div>
			<div class="ex-declare-item" v-if="checkdata.consumptionCertificate">
				<span>消费凭证</span>
				<div class="img">
					<img :src="checkdata.consumptionCertificate">
				</div>
			</div>
			<!-- <div class="ex-declare-item" v-if='checkdata.physicalPic'>
				<span>实物照片</span>
				<div class="img">
					<img :src="checkdata.physicalPic">
				</div>
			</div> -->
			<div class="ex-declare-item"  v-if="checkdata.transferVoucher">
				<span>让利款转款凭据</span>
				<div class="img">
					<img :src="checkdata.transferVoucher" >
				</div>
			</div>
		</div>
		<button type='button' v-if="checkdata.status ==='3'" class="ex-declare-btn" @click='repeat'>重新提交</button>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator } from 'mint-ui'
export default {
	data () {
		return {
			id: '',
			checkdata: '',
			auditOpinion: ''
		}
	},
	computed: {
		check () {
			if (this.checkdata.status === '1' || this.checkdata.status === '5') {
				return 1
			}
			if (this.checkdata.status === '3' || this.checkdata.status === '7' || this.checkdata.status === '4') {
				return 2
			}
			if (this.checkdata.status === '2') {
				return 3
			}
		}
	},
	created () {
		this.id = this.$route.params.id
		let _this = this
		axios.post('declaration/get',qs.stringify({id: this.id}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.auditOpinion = res.data.data.orderAudit.auditOpinion ? res.data.data.orderAudit.auditOpinion : ''
					_this.checkdata = res.data.data
				} else {
					MessageBox('提示', '数据请求失败！')
				}
			})
			.catch(function(){
				Indicator.open({ spinnerType: 'fading-circle'})
			})

	},
	methods: {
		back () {
			MessageBox({
				  title: '提示',
				  message: '确认要退出本次操作吗?',
				  showCancelButton: true,
				  confirmButtonText: '退出'
				}).then(action => {
					if (action === "confirm") {
						this.$router.push('/business')
					}
				})
		},
		repeat () {
			let status = this.checkdata.transferVoucher
			if (status) {
				_this.$router.push({ name: 'Declare4', params: { id: _this.id}})
			} else {
				_this.$router.push({ name: 'Declare2', params: { id: _this.id}})
			}
		}
	},
	filters: {
		formatTime (value) {
			let time = new Date(value * 1000)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			return [year,month,date].join('/')
		}
	}
}	
</script>

<style scoped>
.ex-declare{background-color: #f4f5f7; min-height: 100%;  position: absolute; width: 100%;}
.ex-declare-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-declare-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 3rem; right: 3rem;}
.ex-declare-progress-item { width: 25%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-declare-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-declare-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}

.ex-declare-check{background-color: #fff; padding: 1rem;}
.ex-declare-result {background: #fff; text-align: center; padding: 2rem 0;}
.ex-declare-result i{ font-size: 5rem; }
.ex-declare-result i.suc{color: #ffa100;}
.ex-declare-result i.err{color: #f0544d; }
.ex-declare-result i.del{color: #aaafb6;}
.ex-declare-result h3 {font-size: 2rem; font-weight: normal;}
.ex-declare-result p{color:#aaafb6; padding-top: 0.5rem; }
.ex-declare-cnt {background-color: #fff; margin: 1.5rem 0; padding: 0 0.5rem;}
.ex-declare-item {border-bottom: 1px solid #e5e5e5; padding: 1rem 0; overflow: hidden;}
.ex-declare-item b{font-weight: normal; color:#aaafb6; }
.ex-declare-item b,.ex-declare-item .img {float: right;}
.ex-declare-item .img img{ width: 6rem; height: auto;  margin-left: 1rem;}

.ex-declare-btn {margin: 0 2%; display: block; background-color: #62c1ff; color: #fff; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 92%; margin: 2rem auto;}
.ex-declare-btn:active{background-color:#58ace2; }
</style>