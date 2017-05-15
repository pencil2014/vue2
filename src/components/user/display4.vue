<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content" v-if='groupList.length > 0'>
				<li class="item" v-for='(item,index) in groupList'>
					<span>
						<i class="iconfont" @click='delgroup(item.id,index)'>&#xe6b3;</i>
						{{item.groupName}}
					</span>
					<span class="right" @click='rename(index,item.id,item.groupName)'>重命名</span>
				</li>
			</ul>
		</div>
		<div class="bottom" @click="showGroup" >
			<i class="iconfont" >&#xe608;</i>
			添加分组
		</div>
		<div class="modal_BJ" v-show="isaddgroup">
			<div class="modal">
				<div class="modal_box">
					<div class="title">{{modalTitle}}</div>
					<div class="field">
						<input type="text" placeholder="请输入分组名称" maxlength="8" v-model='newGroupName'>
					</div>
					<div class="operate">
						<span href="javascript:void(0)" class="link gray" @click='cancleGroup'>取消</span>
						<span href="javascript:void(0)" class="link" @click='addGroup'>确定</span>
					</div>
				</div>
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
	data(){
		return{
			modal: {
				text:'店铺分组',
				fixed: false
			},
			isaddgroup: false,
			groupList: [],
			newGroupName: '',
			id: '',
			editstatus: false,
			modalTitle: '添加分组'
		}
	},
	components: {
		HeadTitle,
	},
	computed:{

	},
	created () {
		this.getList()
	},
	methods: {
		back () {
			this.$router.back();
		},
		getList () {
			let _this = this
			axios.post('commodityGroup/list',qs.stringify({})) 
			.then(function(res){
				if (res.data.code === '10000') {
					_this.groupList = res.data.data.list
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		},
		rename (index,id,groupName) {
			this.editstatus = true
			this.newGroupName = groupName
			this.id = id
			this.modalTitle = '编辑分组'
			this.isaddgroup = true
		},
		renameFun (id,groupName) {
			
		},
		delgroup (id,index) {
			let _this = this
			MessageBox({
				  title: '提示',
				  message: '确认删除该分组吗？',
				  showCancelButton: true,
				  confirmButtonText: '删除'
				}).then(action => {
					if (action === 'confirm') {
						_this.delgroupFun(id,index)
					}
				})
		},
		delgroupFun (id,index) {
			let _this = this	
			axios.post('commodityGroup/delete',qs.stringify({groupId: id})) 
			.then(function(res){
				if (res.data.code === '10000') {
					_this.groupList.splice(index, 1)
					Toast('删除分组成功！')
				} else {
					Toast('删除分组失败！')
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		},
		loadMore () {
			
		},
		showGroup () {
			this.editstatus = false
			this.modalTitle = '添加分组'
			this.isaddgroup = true
		},
		cancleGroup () {
			this.isaddgroup = false
			this.newGroupName = ''
		},
		addGroup () {
			this.isaddgroup = false
			if (this.editstatus) {
				this.editGroupFun(this.id,this.newGroupName)
			} else {
				this.addGroupFun()
			}
		},
		addGroupFun () {
			let _this = this
			axios.post('commodityGroup/add',qs.stringify({groupName: this.newGroupName})) 
			.then(function(res){
				if (res.data.code === '10000') {
					_this.getList()
					_this.newGroupName = ''
					Toast('添加分组成功！')
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		},
		editGroupFun (id,groupName) {
			let _this = this
			axios.post('commodityGroup/update',qs.stringify({id: id, groupName: groupName})) 
			.then(function(res){
				if (res.data.code === '10000') {
					_this.getList()
					_this.newGroupName = ''
					Toast('修改分组成功！')
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Toast('网络请求超时！')
			})
		}
	},
	destroyed () {
	}
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;font-size: 1.6rem;}
.ex-display .wrapper {background: #fff;}
.ex-display .wrapper .item-content{margin: 15px 0 0 10px;}
.ex-display .wrapper .item-content .item{height: 30px;line-height: 30px;padding: 8px 0;border-bottom: solid 1px #ebebeb;}
.ex-display .wrapper .item-content .item:last-child{border-bottom: none;}
.ex-display .wrapper .item-content .item .right{float: right;padding-right: 10px;color: #8f959e;font-size: 1.4rem;}
.ex-display .wrapper .item-content i{color: #8f959e;font-size: 2rem;}
.ex-display .bottom{text-align: center;margin-top: 15px;background: #fff;padding: 10px 0;}
.ex-display .bottom i {color: #999;}
.ex-display .modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 999;display: table;}
.ex-display .modal_BJ .modal{display: table-cell;padding: 0 12%;vertical-align: middle;}
.ex-display .modal_BJ .modal .modal_box{background: #fff;width: 100%;border-radius: 5px;overflow: hidden;text-align: center;padding-top: 15px;}
.ex-display .modal_BJ .modal .modal_box .title{font-size: 1.6rem;}
.ex-display .modal_BJ .modal .modal_box .field{padding: 15px 20%;text-align: center;}
.ex-display .modal_BJ .modal .modal_box .field input{height: 30px;text-indent: 2em;font-size: 1.4rem;border:none;}
.ex-display .modal_BJ .modal .modal_box .operate{height: 46px;padding: 0;border-top: 1px solid #e5e5e5;}
.ex-display .modal_BJ .modal .modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 46px;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .operate .gray{color: #596678;}
.ex-display .modal_BJ .modal .modal_box .operate .link:last-child{border-right: none;}
.ex-display .modal_BJ .modal .modal_box .operate .link:active{background: #ebebeb}
</style>