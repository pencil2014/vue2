<template>
	<div class="ex-banklist">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>公司银行卡</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-banklist-cnt">
			<div class="ex-banklist-item" v-for='(item,index) in banks'>
				<div class="bankinfo" @click='gotoedit(item.cardNo,item.status)'>
					<p>{{item.banks}}</p>
					<p>{{item.accountName}}</p>
					<p>{{item.cardNo | card}}</p>
					<p class="right" >{{item.status | status}}</p>
					<span class="goto" v-if='item.status !== "1"'><i class="iconfont">&#xe606;</i></span>
				</div>
				<div class="bankaction">
					<span class='deleted' v-if='item.isDefault !== "1"' @click='delcard(item, index)'>删 除</span>
					<span class="default" @click='setdefault(item,index)'>
						<i class="iconfont active" v-if='item.isDefault === "1"' >&#xe636;</i>
						<i class="iconfont" v-else>&#xe668;</i>设为默认
					</span>
				</div>
			</div>
			<div class="ex-banklist-add" @click='addcard' v-if='banks.length <= 0'>
				<i class="iconfont">&#xe608;</i> 添加银行卡
			</div>
		</div>
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
			banks: [],
			userinfo: '',
			modal:{
				text:'公司银行卡',
				fixed: false,
			},
		}
	},
	computed: {
		
	},
	created () {
		this.userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
		let _this = this
		axios.post('bankard/list',qs.stringify({cardType: 2}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.banks = res.data.data
				} else {
					MessageBox('提示', '请求数据失败！')
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gotoedit (id,status) {
			if (status === '1') {
				return
			}
			this.$router.push({ name: 'Editcard1', params: { id: id}})
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
							Toast('网络请求超时！')
						})
					}
				})
		},
		setdefault (item,index) {
			if (item.isDefault === '1') {
				return
			}
			let _this = this
			axios.post('bankard/setDefault',qs.stringify({id: item.id}))
			.then(function(res){
				if (res.data.code === '10000') {
					_this.banks.forEach( (element) => {
						element.isDefault = '0'
					})
					_this.banks[index].isDefault = '1'
					_this.$router.back()
				} else {
					MessageBox('提示', '设置默认银行卡失败！')
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
			
		},
		addcard () {
			if (this.userinfo.isRealName !== '2') {
				MessageBox({
				  title: '提示',
				  message: '请先进行实名认证！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
			} else {
				this.$router.push('/addcard1')
			}
		}
	},
	filters: {
		card (value) { 
			value += ''
			return value.replace(/^(\d{4})(\d*)(\d{4})$/, '$1*********$3')
		},
		status (value) {
			let status = ['已删除','审核中','审核未通过','']
			return status[value]
		}
	},
	components: {
		HeadTitle,
	},	
}	
</script>

<style scoped>
.ex-banklist {background-color: #f4f5f7;color: #586485; font-size: 1.4rem; overflow-x: hidden;min-height: 100%;padding-bottom: 5rem;}
.ex-banklist-item	{background-color: #fff; margin: 1.5rem 0; padding: 1rem;}
.ex-banklist-item	.bankinfo { border-bottom: 1px solid #e5e5e5; padding: 0.5rem 0;line-height: 1.5; position: relative;}
.ex-banklist-item	.bankinfo  .right {position: absolute;right: 4rem;line-height: 2rem;top: 50%;margin-top: -1rem;color: red;}
.ex-banklist-item	.bankinfo .goto{ position: absolute; right: 1rem; top: 1.8rem; font-size: 2rem; }
.bankaction { padding-top: 1rem; overflow: auto;}
.bankaction span i{vertical-align: middle; margin-right: 0.4rem; font-size: 2rem; }
.bankaction .deleted {padding: 0 2rem 0 0;}
.bankaction .default {float: right; padding: 0 0 0 2rem;}
.bankaction .active {color: #2eadff;}
.ex-banklist-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}
</style>