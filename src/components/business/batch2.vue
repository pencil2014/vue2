<template>
	<div class="ex-batch-box">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-batch-result">
			<div class="ex-batch-result-item" v-if="orderinfo.status === 1">
		  	<i class="iconfont suc">&#xe609;</i>
		  	<h3>审核中...</h3>
		  	<p>平台正在处理您的申请，请稍后...</p>
		  </div>

		  <div class="ex-batch-result-item" v-if="orderinfo.status === 2">
		  	<i class="iconfont err">&#xe63f;</i>
		  	<h3>抱歉，审核不通过！</h3>
		  	<p>{{orderinfo.auditOpinion}}</p>
		  </div>
		  <div class="ex-batch-result-item" v-if="orderinfo.status === 3">
		  	<i class="iconfont del">&#xe63f;</i>
		  	<h3>已撤销！</h3>
		  	<p>{{orderinfo.auditOpinion}}</p>
		  </div>
		</div>
		
		<div class="ex-batch-check">
			<div class="ex-batch-item">
				<span>单号</span>
				<b>4567884465465</b>
			</div>
			<div class="ex-batch-item">
				<span>登记时间</span>
				<b>2017-5-18 18:06:07</b>
			</div>

			<div class="ex-batch-item">
				<span>转出账户名</span>
				<b>张三</b>
			</div>
			<div class="ex-batch-item">
				<span>让利款总额</span>
				<b>￥25480</b>
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
				<tr v-for='(item,index) in orderinfo.list'>
					<td>{{index+1}}</td>
					<td>{{item.id}}</td>
					<td>{{item.phone}}</td>
					<td>{{item.money}}</td>
				</tr>
			</table>
		</div>
		

	</div>
</template>

<script>
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			modal:{
				text:'批量报单',
				fixed: false,
			},
			orderinfo: {
				status: 1,
				auditOpinion: '审核不通过',
				list: [{
					id: '213',
					phone: '15016435214',
					money: '1000'
				}]
			}
			
		}
	},
	components: {
		HeadTitle,
	},
	methods: {
		back () {
			this.$router.push('/business')
		}
	}
}	
</script>

<style scoped>
.ex-batch-box {background-color: #f4f5f7;}
.ex-batch-result-item {background: #fff; text-align: center; padding: 2rem 0;}
.ex-batch-result-item i{ font-size: 5rem; }
.ex-batch-result-item i.suc{color: #ffa100;}
.ex-batch-result-item i.err{color: #f0544d; }
.ex-batch-result-item i.del{color: #aaafb6;}
.ex-batch-result-item h3 {font-size: 2rem; font-weight: normal;}
.ex-batch-result-item p{color:#aaafb6; padding-top: 0.5rem; }	


.ex-batch-check{background-color: #fff; padding: 1rem; margin: 1.5rem 0;}
.ex-batch-item {border-bottom: 1px solid #e5e5e5; padding: 1rem 0; overflow: hidden;}
.ex-batch-item b{font-weight: normal; color:#aaafb6; float: right;}

.ex-batch-table {background-color: #fff;}
</style>