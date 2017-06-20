<template>
	<div class="ex-batch">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-batch-cnt">

			<div class="ex-batch-progress">
				<p class="percent">
					<span></span>
				</p>
				<div class="ex-batch-progress-item active">
					<b>1</b>
					<span>批量信息</span>
				</div>
				<div class="ex-batch-progress-item secend">
					<b>2</b>
					<span>审核结果</span>
				</div>
			</div>
		
		<div class="ex-batch-count">
			<span>转出账户名</span><input type="text" maxlength="18" name="" id="" v-model.trim='name' placeholder='请输入转出账户名'>
		</div>
		<div class="ex-batch-table">
			<div class="ex-batch-table-fixed">
				<table class="table">
					<tr>
						<th width="15%">序号</th>
						<th width="20%">买家ID</th>
						<th width="30%">电话</th>
						<th width="25%">消费金额</th>
						<th width="10%" v-if='order.length > 3'></th>
					</tr>
				</table>
			</div>
			<div class="ex-batch-table-cnt">
				<table class="table">
					<tr v-for='(item,index) in order'>
						<td width="15%">{{index+1}}</td>
						<td  width="20%"><input type="tel" name="" id="" v-model.trim='item.userCode' placeholder="买家ID" :class="{error: checkId(item.userCode) || repeat(item.userCode)}" @blur='getphone(item.userCode,index)' @focus='hideBtn'></td>
						<td  width="30%"><input type="tel" name="" id="" :value='item.phone | formatPhone' placeholder="获取电话号码" readonly @click='getphone2(item)'></td>
						<td  width="25%"><input type="tel" name="" id="" v-model.trim='item.consumptionMoney' placeholder="消费金额" maxlength="8" :class="{error: checkMoney(item.consumptionMoney)}" @blur='showBtn' @focus='hideBtn' @change='formatMoney(index)'></td>
						<td  width="10%" v-if='order.length > 3' @click='delOreder(index)'><i class="iconfont">&#xe6b3;</i></td>
					</tr>
				</table>
				<div class="ex-batch-addtable" @click='addOrder' v-show='order.length < 20'><i class="iconfont"> &#xe608;</i>添加</div>
			</div>
			
			<div class="ex-batch-submit">
				<span>让利总金额：<b>￥{{totalmoney}}</b></span>
				<button type="button" :class='{active: activeBtn}' @click='submit'>提交</button>
			</div>
		</div>



		</div>
		<!-- 弹框 -->
		<div class="ex-batch-model" v-show='showmodel'>
			<div class="ex-batch-model-cnt">
				<div class="ex-batch-model-body">
					<h3>商家批量报单须知</h3>
					<ul>
						<li>1、每页不少于3笔才能使用批量报单；</li>
						<li>2、每页中同一买家只可出现一次；</li>
						<li>3、每页限20笔，当日限5页；</li>
						<li>4、每笔消费金额不能超过2万；</li>
						<li>5、每页让利款总额不能超过5万；</li>
						<li>6、转款户名处必须填写为向平台转账的卡号人名或户名，否则无效；</li>
						<li>7、转款金额必须与每次让利款总额完全相符（包括小数点后面的数字），否则无法审核；</li>
						<li>8、提交后转款，请及时在自己的账户中查询转款是否成功，请耐心等待审核，不需要上传任何凭证，审核是以到款为准，T+1即过；</li>
						<li>9、转款附言处请注明:“B*****批量”字样（ B表示商家身份，*****表示商家ID号。如无法注明，请联系客服）。</li>
					</ul>
				</div>
				<div class="ex-batch-model-btn" @click='closeModel'>确认</div>
			</div>
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
			name: '',
			showmodel: true,
			modal:{
				text:'批量报单',
				fixed: false,
			},
			order: [
				{
					userCode:'',
					phone: '',
					consumptionMoney: ''
				},
				{
					userCode:'',
					phone: '',
					consumptionMoney: ''
				},
				{
					userCode:'',
					phone: '',
					consumptionMoney: ''
				}
			],
			rate: 0.15,
			repeatBtn: false
		}
	},
	components: {
		HeadTitle,
	},
	computed: {
		totalmoney () {
			let _this = this
			let total = 0
			this.order.forEach( function(element, index) {
				if (element.userCode !=='' && element.phone !== '' &&  element.consumptionMoney > 0) {

					let m = 0, s1 = element.consumptionMoney.toString(), s2 = _this.rate.toString()
					try {m += s1.split('.')[1].length} catch(e) {}
					try {m += s2.split('.')[1].length} catch(e) {}
					let single =  Number(s1.replace('.',''))*Number(s2.replace('.',''))/Math.pow(10,m) + ''
					single = single.indexOf('.') > -1 ? (single.substring(0,single.indexOf(".") + 3)*1).toFixed(2) : single


					let r1,r2,n
					try {r1= total.toString().split('.')[1].length} catch(e) {r1=0}
					try {r2= single.toString().split('.')[1].length} catch(e) {r2=0}
					n = Math.pow(10,Math.max(r1,r2))

					total = (total*n+single*n)/n 
					
				} else {
					total += 0
				}
			})
			total = total + ''
			return  total.indexOf('.') > -1 ? (total.substring(0,total.indexOf(".") + 3)*1).toFixed(2) : total + '.00'

			
		},
		valid () {
			let array =  this.order.filter(function(element,index) {
				return (element.userCode !=='' && element.phone !== '' &&  element.consumptionMoney > 0) 
			})
			return array
		},
		activeBtn () {
			return this.valid.length >= 3 && this.name && this.totalmoney <= 50000
		},
		orderId () {
			let array = []
			this.order.forEach( function(element, index) {
				if (element.userCode !=='') {
					array.push(element.userCode)
				}
			})
			return array
		}
	},
	methods: {
		hideBtn () {
			document.getElementsByClassName('ex-batch-submit')[0].style.position = 'relative'
		},
		showBtn () {
			document.getElementsByClassName('ex-batch-submit')[0].style.position = 'fixed'
		},
		back () {
			let show = false
			this.order.forEach( function(element, index) {
				if (!!element.userCode || !!element.phone || !!element.consumptionMoney ) {
					show = true
				} 
			})

			if (!!this.name || show) {
				let _this = this
				MessageBox({
					  title: '温馨提示',
					  message: '返回将不保存之前所做的修改，是否确认返回？',
					  showCancelButton: true
					}).then(action => {
						if (action === 'confirm') {
							_this.$router.push('/business')
						}
					})
				} else {
					this.$router.push('/business')
				}

			
		},
		closeModel () {
			this.showmodel = false
		},
		formatMoney (index) {
			let money = this.order[index].consumptionMoney
			if ((money > 0 && money <= 20000) && (money !== '')) {
				this.order[index].consumptionMoney = (this.order[index].consumptionMoney-0).toFixed(2)
			}	
		},
		addOrder () {
			let empty= false
			this.order.forEach(function(element, index){
				if (!element.userCode || !element.phone || !element.consumptionMoney) {
					empty = true
				}
			})
			if (empty) {
				MessageBox('提示', '请先填写完成后再添加！')
				return
			}
			this.order.push( {userCode:'',phone:'',consumptionMoney:''})
			document.getElementsByTagName('body')[0].scrollTop = document.getElementsByTagName('body')[0].scrollHeight
		},
		delOreder (index) {
			if (!!this.order[index].userCode || !!this.order[index].phone || !!this.order[index].consumptionMoney) {
				let _this = this
				MessageBox({
				  title: '提示',
				  message: '确认删除该笔报单吗？',
				  showCancelButton: true
				}).then(action => {
					if (action === 'confirm') {
						_this.order.splice(index, 1)
					}
				})
			} else {
				this.order.splice(index, 1)
			}
			
			
		},
		checkId (id) {
			return !/^[M|m|B|b]?\d{0,10}$/.test(id) && (id !== '')
		},
		checkMoney (money) {
			if (money > 20000) {
				Toast({
				  message: '单笔报单最多不超过2万！',
				  duration: 1000
				})
			}
			return !(money > 0 && money <= 20000) && (money !== '')
		},
		repeat (id) {
			let rule1 =  this.orderId.indexOf(id) !== this.orderId.lastIndexOf(id)
			let rule2 = id !== ''
			if (rule1 && rule2) {
				Toast({
				  message: '同一买家在每次批量报单中只可出现一次！',
				  duration: 1000
				})
			}
			return rule1 && rule2
		},
		getphone (userCode,index) {
			this.showBtn()
			if (!userCode) {
				this.order[index].phone = ''
				return
			}
			if (!/^(M|m|B|b)\d+$/.test(userCode)) {
				userCode = "M" + userCode
			}
			let _this = this
			axios.post('declaration/returnPhone',qs.stringify({
				userCode: userCode
			}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.order[index].phone = res.data.data
				} else {
					_this.order[index].phone = ''
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				_this.order[index].phone = ''
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getphone2(item) {
			this.showBtn()
			if (!item.userCode) {
				MessageBox('提示', '请先填写买家ID！')
				return
			}
		},
		submit () {
			if (this.repeatBtn) {
				return
			}
			let empty= false
			this.order.forEach(function(element, index){
				if (!element.userCode || !element.phone || !element.consumptionMoney) {
					empty = true
				}
			})
			if (empty) {
				MessageBox('提示', '请先填写完成后再提交！')
				return
			}
			if (document.getElementsByClassName('error').length > 0) {
				MessageBox('提示', '请修正红色标记的错误数据!')
				return
			}
			if (!this.name) {
				MessageBox('提示', '转出账户名不能为空!')
				return
			}
			if (this.valid.length < 3) {
				MessageBox('提示', '批量报单每次不少于3笔!')
				return
			}
			if (this.totalmoney > 50000) {
				MessageBox('提示', '批量报单让利款总额不超过5万!')
				return
			}
			this.repeatBtn = true
			Indicator.open({
			  text: '正在提交...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('declaration/batchDeclaration',qs.stringify({
				transferUserName: this.name,
				orderListStr: JSON.stringify(this.valid)
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.$router.push({ name: 'Batch2', params: { id: res.data.data.orderNo}})
				} else {
					_this.repeatBtn = false
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				_this.repeatBtn = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		checkBatshCount () {
			let _this = this
			axios.post('declaration/checkBatshCount',qs.stringify({}))
			.then(function(res){
				if (res.data.code === '10000') {
					if (res.data.data.status === '0') {
						MessageBox({
						  title: '提示',
						  message: '批量报单每天最多5次，您目前无法进行批量报单！'
						}).then(action => {
							_this.$router.push('/business')
						})
					}
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('连接失败，请检查网络是否正常!')
			})
		}
	},
	filters: {
		formatPhone (value) {
			if (!value) {
				return ''
			} else {
				return value.replace(/(\d{3})(\d{4})(\d{3})/,'$1****$3')
			}
		}
	},
	created () {
		// 检查批量报单是否超过5笔
		this.checkBatshCount()

		let _this = this
		axios.post('declaration/getRangliProportion',qs.stringify({}))
		.then(function(res){
			if (res.data.code === '10000') {
				_this.rate = res.data.data
			} else {
				Toast(res.data.msg)
			}
		})
		.catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})	

	}
}	
</script>



<style scoped>
.ex-batch-cnt {background-color: #f4f5f7; overflow: hidden;}

.ex-batch-progress {padding: 2rem 0; text-align: center; overflow: hidden; position: relative;}
.ex-batch-progress .percent { height: 0.4rem; background-color: #e3e3e3;position: absolute; top: 3.2rem; left: 3rem; right: 3rem;}
.ex-batch-progress-item { width: 50%; float: left; height: 5rem;  text-align: center; z-index: 2; position: relative;}
.ex-batch-progress-item.secend {margin: 0;}
.ex-batch-progress-item b{display:block; border: 0.3rem solid #e3e3e3;border-radius: 50%; height: 2rem; width: 2rem; line-height: 2rem; text-align: center; color: #aaafb6; font-weight: normal; margin: auto; margin-bottom: 0.2rem;background-color: #f4f5f7;}
.ex-batch-progress-item span {position: absolute; left: 0; bottom: 0; width: 100%;}
.active {color: #58c86b;}
.active b{height: 2.5rem; width: 2.5rem; line-height: 2.5rem; background-color: #58c86b; color: #fff;}

.ex-batch-count {background-color: #fff; padding: 1rem 0; margin-bottom: 1rem;}
.ex-batch-count span {display: inline-block; width: 30%;  text-align: center; vertical-align: middle; font-size: 1.4rem;}
.ex-batch-count input { width: 70%; border: none; height: 3rem; vertical-align: middle; color:#047dcb; }

.ex-batch-table { position: absolute; }
.ex-batch-table .table th { padding: 1rem 0; text-align: center; font-size: 1.4rem;}
.ex-batch-table .table td{padding:0.8rem 0; text-align: center;}
.ex-batch-table .table td i {font-size: 2rem; color: #ccc;}

.ex-batch-table-cnt { /*overflow: scroll; max-height: 36rem;*/ padding-bottom: 7rem; }
.ex-batch-table-cnt input { width: 98%; border: none; height: 3rem; text-align: center; color: #047dcb; border:1px solid #fff; margin-left: -1px;}

.ex-batch-addtable { height: 5rem; line-height: 5rem; text-align: center; color: #666; border-bottom: 1px solid #eee; font-size: 1.6rem; background-color: #fafafa; }
.ex-batch-addtable i { color: #999; margin-right: 0.5rem; }
.ex-batch-addtable:active{background-color: #eee;}

.ex-batch-submit { height: 7rem; position: fixed; bottom: 0; width: 100%; background-color: #fff; border-top: 1px solid #eee;}
.ex-batch-submit span { display: inline-block; line-height: 7rem; padding-left: 1rem;  vertical-align: middle;}
.ex-batch-submit span b{ font-size: 1.6rem; color: #f68500; }
.ex-batch-submit button { height: 4.4rem; width: 45%;  border-radius: 1rem; float: right; margin-top: 1.3rem; margin-right: 1rem;font-size: 1.6rem; color: #999; }
.ex-batch-submit button.active { background-color: #047dcb; color: #fff; }

input.error {border-color: #f00; color: #f00;}


.ex-batch-model {position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); z-index: 7; overflow: auto;}
.ex-batch-model-cnt {background-color: #fff; width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 1rem 1rem 0 1rem; border-radius: 0.5rem;}
.ex-batch-model-body ul{ max-height: 24rem; overflow: scroll; }
.ex-batch-model-body h3 { text-align: center;font-size: 1.6rem;  padding: 1.5rem 0;}
.ex-batch-model-body li{ line-height: 1.8; font-size: 1.2rem;}
.ex-batch-model-btn { border-top: 1px solid #eee; margin-top: 1rem; height: 5rem; line-height: 5rem; text-align: center; font-size: 1.8rem; color:#047dcb;  }
</style>