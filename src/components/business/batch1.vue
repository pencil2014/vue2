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
			<span>转出账户名</span><input type="text" name="" id="" v-model.trim='name' placeholder='请输入转出账户名'>
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
						<td  width="20%"><input type="tel" name="" id="" v-model.trim='item.id' placeholder="买家ID" :class="{error: checkId(item.id) || repeat(item.id)}"></td>
						<td  width="30%"><input type="tel" name="" id="" v-model.trim='item.phone' placeholder="电话号码" maxlength="11" :class="{error: checkPhone(item.phone)}"></td>
						<td  width="25%"><input type="tel" name="" id="" v-model.trim='item.money' placeholder="消费金额" maxlength="8" :class="{error: checkMoney(item.money)}"></td>
						<td  width="10%" v-if='order.length > 3' @click='delOreder(index)'><i class="iconfont">&#xe6b3;</i></td>
					</tr>
				</table>
			</div>
			<div class="ex-batch-addtable" @click='addOrder' v-show='order.length < 20'><i class="iconfont"> &#xe608;</i>添加</div>
			<div class="ex-batch-submit">
				<span>让利总金额：<b>￥{{totalmoney}}</b></span>
				<button type="button" :class='{active: activeBtn}'>提交</button>
			</div>
		</div>



		</div>
		<!-- 弹框 -->
		<div class="ex-batch-model" v-show='showmodel'>
			<div class="ex-batch-model-cnt">
				<div class="ex-batch-model-body">
					<h3>商家批量报单须知</h3>
					<ul>
						<li>1、每次不少于3笔才能批量报单</li>
						<li>2、同一买家在每次批量报单中只可出现一次</li>
						<li>3、每次批量报单最多20笔</li>
						<li>4、每笔消费金额不超过2万</li>
						<li>5、每次让利款总额不超过5万</li>
						<li>6、转款户名一定是实际向公司转账的卡号人名或户名，否则无效</li>
						<li>7、提交后转款，请及时查询自己账户是否转款成功，请耐心等待审核，不需要上传任何凭证，公司以到款为准，T+1即过</li>
						<li>8、转款附言注明:“B*****批量”（如无法注明，请联系客服），转款金额一定与每次让利款总额完全相符（包括小数点后面的），否则无法审核</li>
						<li>9、点击“确认”后，才可进行批量报单</li>
					</ul>
				</div>
				<div class="ex-batch-model-btn" @click='closeModel'>确认</div>
			</div>
		</div>
	</div>
</template>

<script>
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
					id:'',
					phone: '',
					money: ''
				},
				{
					id:'',
					phone: '',
					money: ''
				},
				{
					id:'',
					phone: '',
					money: ''
				}
			]
		}
	},
	components: {
		HeadTitle,
	},
	computed: {
		totalmoney () {
			let total = 0
			this.order.forEach( function(element, index) {
				if (element.id !=='' && element.phone !== '' &&  element.money > 0) {
					total += element.money - 0
				} else {
					total += 0
				}
				
			})
			return total
		},
		valid () {
			let array =  this.order.filter(function(element,index) {
				return (element.id !=='' && element.phone !== '' &&  element.money > 0) 
			})
			return array
		},
		activeBtn () {
			return this.valid.length >= 3 && this.name
		},
		orderId () {
			let array = []
			this.order.forEach( function(element, index) {
				if (element.id !=='') {
					array.push(element.id)
				}
			})
			return array
		}
	},
	methods: {
		back () {
			this.$router.push('/business')
		},
		closeModel () {
			this.showmodel = false
		},
		addOrder () {
			this.order.unshift( {id:'',phone:'',money:''})
		},
		delOreder (index) {
			this.order.splice(index, 1)
		},
		checkId (id) {
			return !/^[M|m|B|b]?\d{0,10}$/.test(id) && (id !== '')
		},
		checkPhone (phone) {
			return !/^1\d{10}$/.test(phone) && (phone !== '')
		},
		checkMoney (money) {
			return !(money > 0 && money < 20000) && (money !== '')
		},
		repeat (id) {
			let rule1 =  this.orderId.indexOf(id) !== this.orderId.lastIndexOf(id)
			let rule2 = id !== ''
			return rule1 && rule2
		}
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
.ex-batch-count input { width: 70%; border: none; height: 3rem; vertical-align: middle;}

.ex-batch-table { position: absolute; }
.ex-batch-table .table th { padding: 1rem 0; text-align: center; font-size: 1.4rem;}
.ex-batch-table .table td{padding:0.8rem 0; text-align: center;}
.ex-batch-table .table td i {font-size: 2rem; color: #ccc;}

.ex-batch-table-cnt { overflow: scroll; max-height: 30rem; padding-bottom: 12rem; }
.ex-batch-table-cnt input { width: 98%; border: none; height: 3rem; text-align: center; color: #047dcb; border:1px solid #fff;}

.ex-batch-addtable { height: 5rem; line-height: 5rem; text-align: center; color: #666; border-bottom: 1px solid #eee; font-size: 1.6rem; background-color: #fafafa; position: fixed; bottom: 7rem; width: 100%;}
.ex-batch-addtable i { color: #999; margin-right: 0.5rem; }
.ex-batch-addtable:active{background-color: #eee;}

.ex-batch-submit { height: 7rem; position: fixed; bottom: 0; width: 100%; background-color: #fff;}
.ex-batch-submit span { display: inline-block; line-height: 7rem; padding-left: 1rem;  vertical-align: middle;}
.ex-batch-submit span b{ font-size: 1.6rem; color: #f68500; }
.ex-batch-submit button { height: 4.4rem; width: 45%;  border-radius: 1rem; float: right; margin-top: 1.3rem; margin-right: 1rem;font-size: 1.6rem; color: #999; }
.ex-batch-submit button.active { background-color: #047dcb; color: #fff; }

input.error {border-color: #f00; color: #f00;}


.ex-batch-model {position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); z-index: 7; overflow: auto;}
.ex-batch-model-cnt {background-color: #fff; width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 1rem 1rem 0 1rem; border-radius: 0.5rem;}
.ex-batch-model-body { max-height: 35rem; overflow: scroll; }
.ex-batch-model-body h3 { text-align: center;font-size: 1.8rem;  padding: 1.5rem 0;}
.ex-batch-model-body li{ line-height: 1.8; font-size: 1.2rem;}
.ex-batch-model-btn { border-top: 1px solid #eee; margin-top: 1rem; height: 5rem; line-height: 5rem; text-align: center; font-size: 1.8rem; color:#047dcb;  }
</style>