<template>
	<div :class="['ex-batch-box', {activeClass:showActiveClass}]">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-batch-result">
			<div class="ex-batch-result-item" v-if="status === '5'">
		  	<i class="iconfont suc">&#xe609;</i>
		  	<h3>审核中...</h3>
		  	<p>平台正在处理您的申请，请稍后...</p>
		  </div>
		  <div class="ex-batch-result-item" v-else-if="status === '6'">
		  	<i class="iconfont right">&#xe64d;</i>
		  	<h3>恭喜，审核成功！</h3>
		  	<p>批量报单通过平台审核！</p>
		  </div>
		  <div class="ex-batch-result-item" v-else>
		  	<i class="iconfont err">&#xe63f;</i>
		  	<h3>抱歉，审核未通过！</h3>
		  	<p>{{orderinfo.auditReason}}</p>
		  </div>


		</div>
		
		<div class="ex-batch-check">
			<div class="ex-batch-item">
				<span>单号</span>
				<b>{{orderinfo.orderNo}}</b>
			</div>
			<div class="ex-batch-item">
				<span>登记时间</span>
				<b>{{orderinfo.createDate | formatTime}}</b>
			</div>

			<div class="ex-batch-item">
				<span>转出账户名</span>
				<b>{{orderinfo.transferUserName}}</b>
			</div>
			<div class="ex-batch-item">
				<span>让利款总额</span>
				<b>￥{{orderinfo.totalRangliMoney | formatMoney}}</b>
			</div>
		</div>

		<div class="ex-batch-table">
			<table class="table">
				<tr>
					<th>序号</th>
					<th>买家ID</th>
					<th>电话</th>
					<th>消费金额</th>
				</tr>
				<tr v-for='(item,index) in orderinfo.orderList'>
					<td>{{index+1}}</td>
					<td>{{item.userCode}}</td>
					<td>{{item.phone | formatPhone}}</td>
					<td>{{item.consumptionMoney | formatMoney}}</td>
				</tr>
			</table>
		</div>
		<div class="actionBtn">
			<button type='button'  v-if="status ==='3'" class="ex-declare-revoke" @click='revoke'>删除报单</button> 
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Toast, Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal:{
				text:'批量报单详情',
				fixed: false,
			},
			id:'',
			status: '5',
			orderinfo: {
				totalRangliMoney: '',
				orderNo: '',
				transferUserName: '',
				orderList: []
			}
			
		}
	},
	components: {
		HeadTitle,
	},
	computed: {
		showActiveClass () {
			return this.status === '3'
		}
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		getInfo () {
			let _this = this
			axios.post('declaration/batchDetails',qs.stringify({
				orderNo: this.id
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.orderinfo = res.data.data
					_this.status = res.data.data.orderList[0].status
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		revoke () {
			let _this = this;
			MessageBox({
			  title: '提示',
			  message: '确定删除批量报单?',
			  showCancelButton: true
			}).then(action => {
				if (action === "confirm") {
					_this.removeRevoke()
				}
			})
		},
		removeRevoke () {
			let _this = this
			axios.post('declaration/deleteOrders',qs.stringify({orderNo: this.id}))
				.then(function(res){
					if (res.data.code === '10000') {
						MessageBox({
						  title: '提示',
						  message: '删除成功！'
						}).then(action => {
							_this.$router.push('/batchlist')
						})
					} else {
						Toast(res.data.msg)
					}
				})
				.catch(function(){
					Toast('连接失败，请检查网络是否正常!')
				})
		}
	},
	created () {
		this.id = this.$route.params.id
		this.getInfo()
	},
	filters: {
		formatTime (value) {
			let time = new Date(value)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			let hours = time.getHours() < 10 ? '0'+time.getHours() : time.getHours()
			let minutes = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes()
			let seconds = time.getSeconds() < 10 ? '0'+time.getSeconds(): time.getSeconds()
			return [year,month,date].join('/') + ' ' + [hours,minutes,seconds].join(':')
		},
		formatMoney (value) {
			return (value*1).toFixed(2)
		},
		formatPhone (value) {
			if (!value) {
				return ''
			} else {
				return value.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')
			}
		}
	},
	beforeRouteLeave (to,from,next) {
		if (to.path==='/batch') {
			this.$router.push('/business')
		} else {
			next()
		}
	},
}	
</script>

<style scoped>
.ex-batch-box {background-color: #f4f5f7;}
.activeClass{ padding-bottom: 7rem;}
.ex-batch-result-item {background: #fff; text-align: center; padding: 2rem 0;}
.ex-batch-result-item i{ font-size: 5rem; }
.ex-batch-result-item i.suc{color: #ffa100;}
.ex-batch-result-item i.err{color: #f0544d; }
.ex-batch-result-item i.del{color: #aaafb6;}
.ex-batch-result-item i.right{color: #4caf50;}
.ex-batch-result-item h3 {font-size: 2rem; font-weight: normal;}
.ex-batch-result-item p{color:#aaafb6; padding-top: 0.5rem; }	

.ex-batch-check{background-color: #fff; padding: 1rem; margin: 1.5rem 0;}
.ex-batch-item {border-bottom: 1px solid #e5e5e5; padding: 1rem 0; overflow: hidden;}
.ex-batch-item b{font-weight: normal; color:#aaafb6; float: right;}

.ex-batch-table {background-color: #fff;}

.actionBtn {position: fixed; width: 100%; bottom: 1rem;}
.actionBtn button {display: block; height: 5rem; border-radius: 0.4rem;  text-align: center; font-size: 1.6rem; width: 90%; margin: 1rem auto 0 auto; color: #fff;}
.ex-declare-revoke{background-color:#f0544d;}
.ex-declare-revoke:active{background-color:#f9433b;}
</style>