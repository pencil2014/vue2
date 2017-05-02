<template>
	<div class="ex-banklist">
		<!-- <div class="ex-topbar">
			<a href="javascript:;" @click="back"><i class="iconfont">&#xe605;</i></a>
			<span>银行卡</span>
		</div> -->
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-banklist-cnt">
			<div class="ex-banklist-item" v-for='(item,index) in banks'>
				<div class="bankinfo" @click='gotoedit(item.id,item.status)'>
					<p>{{item.banks}}</p>
					<p>{{item.accountName}}</p>
					<p>{{item.cardNo | card}}</p>
					<p class="right" >{{item.status | status}}</p>
					<span class="goto" v-if='item.status !== "1"'><i class="iconfont">&#xe606;</i></span>
				</div>
				<div class="bankaction"  v-if='item.status !== "1"'>
					<span class='deleted'  @click='delcard(item,index)'>删 除</span>
					<span class="default" @click='setdefault(item,index)' v-show='showSelectBtn'>
						<!-- <i class="iconfont active" v-if='item.isDefault === "1"' >&#xe636;</i> -->
						<i class="iconfont" >&#xe668;</i>选择此卡
					</span>
				</div>
			</div>
			<div class="ex-banklist-add" @click='addcard' v-if='banks.length <= 0 && showaddBtn'>
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
			checkRealName: '',
			modal:{
				text:'银行卡',
				fixed: false,
			},
			showaddBtn: false,
			showSelectBtn: false
		}
	},
	created () {
		let _this = this
		axios.post('bankard/list',qs.stringify({})) 
			.then(function(res){
				if (res.data.code === '10000') {
					_this.banks = !res.data.data[0] ? [] : res.data.data
					_this.showaddBtn = true
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
			axios.post('verify/checkRealName',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.checkRealName = res.data.data
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
	},
	methods: {
		back () {
			this.$router.go(-1)
		},
		gotoedit (id,status) {
			let _this = this
			if (status === '1') {
				return
			}
			if (this.checkRealName.status === '4') {
				MessageBox({
				  title: '提示',
				  message: '升级实名认证后才能编辑银行卡！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}
			this.$router.push({ name: 'Editcard', params: { id: id}})
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
			window.localStorage.setItem('defaultCard', JSON.stringify(item))
			this.$router.go(-1)
			// if (item.isDefault === '1') {
			// 	this.$router.go(-1)
			// 	return
			// }
			// let _this = this
			// axios.post('bankard/setDefault',qs.stringify({id: item.id}))
			// .then(function(res){
			// 	if (res.data.code === '10000') {
			// 		_this.banks.forEach( (element) => {
			// 			element.isDefault = '0'
			// 		})
			// 		_this.banks[index].isDefault = '1'
			// 		MessageBox({
			// 		  title: '提示',
			// 		  message: '设置默认银行卡成功！'
			// 		}).then(action => {
			// 			_this.$router.go(-1)
			// 		})
					
			// 	} else {
			// 		MessageBox('提示', '设置默认银行卡失败！')
			// 	}
			// })
			// .catch(function(){
			// 	Toast('网络请求超时！')
			// })
			
		},
		addcard () {
			let _this = this

			if (this.checkRealName.status === '1') {
				MessageBox('提示', '实名认证审核中，目前不能添加银行卡！')
				return
			}
			if (this.checkRealName.status === '0') {
				MessageBox({
				  title: '提示',
				  message: '实名认证失败！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}

			if (this.checkRealName.status === '4') {
				MessageBox({
				  title: '提示',
				  message: '为保障您的账户安全，现在实名认证流程升级，为了不影响使用，请尽快进行资料补充！',
				  showCancelButton: true,
				  confirmButtonText: '去认证'
				}).then(action => {
					if (action === 'confirm') {
						_this.$router.push('/realname')
					}
				})
				return
			}
			if (this.checkRealName.status === '2') {
				this.$router.push('/addcard')
				return
			}

			if (this.checkRealName.status === '3') {
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
				return
			}
		}
	},
	beforeRouteEnter (to, from, next) {
		next(vm => {
    if (from.path.indexOf('bank') > -1) {
				vm.showSelectBtn = true
			}
	  })
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
.ex-banklist {overflow-x: hidden;min-height: 100%;padding-bottom: 56px;background-color: #f4f5f7;color: #586485; font-size: 1.4rem;}
.ex-banklist-item	{background-color: #fff; margin: 1.5rem 0; padding: 1rem;}
.ex-banklist-item	.bankinfo { border-bottom: 1px solid #e5e5e5; padding: 0.5rem 0;line-height: 1.5; position: relative; overflow: hidden; }
.ex-banklist-item	.bankinfo  .right {position: absolute;right: 4rem;line-height: 2rem;top: 50%;margin-top: -1rem;color: red;}
.ex-banklist-item	.bankinfo .goto{ position: absolute; right: 1rem; top: 1rem; font-size: 2rem; }
.bankaction { padding-top: 1rem; overflow: auto;}
.bankaction span i{vertical-align: middle; margin-right: 0.4rem; font-size: 2rem; }
.bankaction .deleted {padding: 0 2rem 0 0;}
.bankaction .default {float: right; padding: 0 0 0 2rem;}
.bankaction .active {color: #2eadff;}
.ex-banklist-add { text-align: center; height: 5rem; line-height: 5rem; font-size: 1.6rem; margin-top: 2rem; background-color: #fff;}
</style>