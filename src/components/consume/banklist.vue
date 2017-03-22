<template>
	<div class="ex-banklist">
		<div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>银行卡</span>
		</div>
		<div class="ex-banklist-cnt">
			<div class="ex-banklist-item" v-for='(item,index) in banks'>
				<div class="bankinfo">
					<p>{{item.banks}}</p>
					<p>{{item.cardNo | card}}</p>
				</div>
				<div class="bankaction">
					<span class='deleted' v-if='item.isDefault !== "1"' @click='delcard(item, index)'>删 除</span>
					<span class="default" @click='setdefault(item,index)'>
						<i class="iconfont active" v-if='item.isDefault === "1"' >&#xe636;</i>
						<i class="iconfont" v-else>&#xe668;</i>设为默认
					</span>
				</div>
			</div>
			<div class="ex-banklist-add" @click='addcard'>
				<i class="iconfont">&#xe608;</i> 添加银行卡
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
export default {
	data () {
		return {
			banks: []
		}
	},
	created () {
		let _this = this
		axios.post('bankard/list',qs.stringify({cardType: 1}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.banks = res.data.data
				} else {
					MessageBox('提示', '请求数据失败！')
				}
			})
			.catch(function(){
				MessageBox('提示', '系统出错了，正在修复中...')
			})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		delcard (item,index) {
			let _this = this
			MessageBox({
				  title: '提示',
				  message: '确认要删除此银行卡?',
				  showCancelButton: true,
				  confirmButtonText: '删除'
				}).then(action => {
					if (action === "confirm") {
						axios.post('bankard/delete',qs.stringify({id: item.id}))
						.then(function(res){
							if (res.data.code === '10000') {
								_this.banks.splice(index, 1)
								MessageBox('提示', '删除银行卡成功！')
							} else {
								MessageBox('提示', '删除银行卡失败！')
							}
						})
						.catch(function(){
							MessageBox('提示', '系统出错了，正在修复中...')
						})
					}
				})
		},
		setdefault (item,index) {
			this.banks.forEach( (element) => {
				element.isDefault = '0'
			})
			this.banks[index].isDefault = '1'
		},
		addcard () {
			this.$router.push('/addcard')
		}
	},
	filters: {
		card (value) { 
			value += ''
			return value.replace(/^(\d{4})(\d*)(\d{4})$/, '$1*********$3')
		}
	}

}	
</script>

<style scoped>
.ex-banklist {height: 100%; background-color: #f4f5f7;color: #586485; font-size: 1.4rem;}
.ex-banklist-item	{background-color: #fff; margin: 1.5rem 0; padding: 1rem;}
.ex-banklist-item	.bankinfo { border-bottom: 1px solid #e5e5e5; padding: 0.5rem 0;line-height: 1.5; }
.bankaction { padding-top: 1rem; overflow: auto;}
.bankaction span i{vertical-align: middle; margin-right: 0.4rem; font-size: 2rem; }
.bankaction .deleted {padding: 0 2rem 0 0;}
.bankaction .default {float: right; padding: 0 0 0 2rem;}
.bankaction .active {color: #2eadff;}
.ex-banklist-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}
</style>