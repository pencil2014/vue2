<template>
	<div class="ex-display">
		<div class="ex-header">
			<span>
				<a href="javascript:void(0);" @click="back">
					<i class="iconfont" >&#xe605;</i>
					<label>返回</label>
				</a>
			</span>
			<span>产品</span>
			<span class="finish">
				<a href="javascript:void(0)" @click="finish" v-show="isedit">
					完成
				</a>
			</span>
		</div>
		<div class="menu-wrapper">
			<ul class="menu">
				<li :class="{'active':status === '2'}" @click="tap('2')">审核中</li>
				<li :class="{'active':status === '3'}" @click="tap('3')">出售中</li>
				<li :class="{'active':status === '1'}" @click="tap('1')">已下架</li>
			</ul>
		</div>
		<div class="table-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :top-method="loadTop" ref="loadmore">
			<no-data :hasdata="hasdata"></no-data>
			<table class="table"
				v-infinite-scroll="loadMore"
			    infinite-scroll-disabled="loading"
			    infinite-scroll-distance="10"
				>
	          <tr @click="toedict(item.status,item.id,item.typeName,item.groupName,item.groupId)" v-for="(item,index) in list">
	          	<td class="m1" @click="select(item.id,index)" v-show="isedit"><span class="option" :class="{'select': optionIndex.indexOf(index) !== -1}"></span>
	            <td class="m2"><img :src="item.commodityAffixEntityList[0].filePath" alt="">
	            </td>
	            <td class="m3"><div class="title">{{item.commodityName}}</div><label for="" class="orange">&yen;{{item.price||0.00}}</label>
					<span class="group">分组：{{item.groupName||'未分组'}}</span>
	            </td>
	            <td class="m4" v-show="!isedit"><i class="iconfont" >&#xe606;</i>
	            </td>
	          </tr>
		    </table>
		    </mt-loadmore>
		</div>
		<div class="bottom" v-show="status === '2'">
			<span @click="todisplay3"><i class="iconfont" >&#xe608;</i>
				添加</span>
		</div>
		<div class="bottom" v-show="status !== '2' && list.length !== 0 && !isedit">
			<span @click="edit"><i class="iconfont" >&#xe613;</i>
				管理</span>
		</div>
		<div class="bottom gray" v-show="status == '3' && isedit" :class="{'blue': optionList.length > 0 }">
			<span @click="batchOffline">下架</span>
			<span @click="commodityGroup">分组至</span>
		</div>
		<div class="bottom gray" v-show="status == '1' && isedit" :class="{'blue': optionList.length > 0 }">
			<span @click="delgoods">删除</span>
			<span @click="batchOnline">上架</span>
		</div>
		<div class="modal_BJ" v-show="selGroupName">
			<div class="modal">
				<div class="modal_box">
					<div class="title">店铺分组</div>
					<div class="field">
						<ul>
							<li v-for="(item,index) in groupList" @click="selground(item.id)">
								<span>{{item.groupName}}</span>
								<span class="option" :class="{'select': groupId === item.id}"></span>
							</li>
						</ul>
					</div>
					<div class="operate">
						<span href="javascript:void(0)" class="link gray" @click="cancle">取消</span>
						<span href="javascript:void(0)" class="link" @click="confirm">确定</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, Indicator, Toast , Loadmore ,InfiniteScroll} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			list:[],
			groupList: [],
			display1: false, 	// 显示按钮
			status: '2',		// 0删除 1下架 2待审核 3上架
			isedit: false,
			optionList: [],
			optionIndex: [],
			groupId: '',
			selGroupName: false,
			page: 1,
			totalPage: 1,
			pageSize: 10,
			wrapperHeight: 0,
			nodateStatus: false,
			loading: false,
			groupList: '',
		}
	},
	components: {
		HeadTitle,
		NoData
	},
	computed:{
		hasdata () {
			if(this.nodateStatus && this.list.length < 1){
				return false
			}else{
				return true
			}
		},
		id () {
			return this.$route.params.id
		}
	},
	methods: {
		tap (status) {
			this.status = status
			this.isedit = false
			this.optionList = []
			this.getData()
		},
		edit () {
			this.isedit = true
		},
		finish () {
			this.isedit = false
			this.optionList = []
		},
		select (id,index) {
			Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
			};
			if(this.optionIndex.indexOf(index) === -1){
				this.optionList.push(id);
				this.optionIndex.push(index)
			}else{
				this.optionList.remove(id);
				this.optionIndex.remove(index)
			}
		},
		commodityGroup () {
			if(this.optionList.length === 0){
				return	
			}
			this.selGroupName = true
		},
		selground (id) {
			this.groupId = id
		},
		cancle () {
			this.selGroupName = false
		},
		confirm () {
			let _this = this;
			axios.post('commodityInfo/batchGroup',qs.stringify({
				groupId: _this.groupId,
				ids: _this.optionList.join(',')
			})).then(function(res){
				_this.selGroupName = false
				_this.groupId = ''
				if (res.data.code === '10000') {
					Toast('修改分组成功！')
					_this.optionList = []
					_this.optionIndex = []
					_this.getData()
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.selGroupName = false
				Toast('网络请求超时！')
			})
		},
		batchOffline () {
			if (this.optionList.length === 0) {
				return
			}
			let _this = this
			MessageBox({
			  title: '提示',
			  message: '确认下架商品吗？',
			  showCancelButton: true,
			  confirmButtonText: '下架'
			}).then(action => {
				if (action === 'confirm') {
					axios.post('commodityInfo/batchOffline',qs.stringify({
						ids: _this.optionList.join(',')
					})).then(function(res){
						if (res.data.code === '10000') {
							Toast('商品下架成功！')
							_this.getData()
						} else {
							Toast(res.data.msg)
						}
					}).catch(function(){
							Toast('网络请求超时！')
					})
				} else {
					return
				}
			})
		},
		batchOnline () {
			if(this.optionList.length === 0){
				return
			}
			let _this = this
			MessageBox({
			  title: '提示',
			  message: '确认上架选中的商品吗？',
			  showCancelButton: true,
			}).then(action => {
				if (action === 'confirm') {
					axios.post('commodityInfo/batchOnline',qs.stringify({
						ids: this.optionList.join(',')
					})).then(function(res){
						if (res.data.code === '10000') {
							Toast('商品已申请上架！')
							_this.getData()
						} else {
							Toast(res.data.msg)
						}
					}).catch(function(){
							Toast('网络请求超时！')
					})
				} else {
					return
				}
			})
		},
		delgoods () {
			if(this.optionList.length === 0){
				return
			}
			let _this = this;
			MessageBox({
			  title: '提示',
			  message: '确认删除选中的商品吗？',
			  showCancelButton: true,
			  confirmButtonText: '删除'
			}).then(action => {
				if (action === 'confirm') {
					Indicator.open({
					  text: '加载中...',
					  spinnerType: 'fading-circle'
					});
					axios.post('commodityInfo/batchDelete',qs.stringify({
						ids: _this.optionList.join(',')
					})).then(function(res){
						Indicator.close()
						if (res.data.code === '10000') {
							Toast('删除成功！')
							_this.getData()
						} else {
							Toast(res.data.msg)
						}
					}).catch(function(){
							Indicator.close()
							Toast('网络请求超时！')
					})
				} else {
					return
				}
			})	
		},
		loadTop () {
			this.getData()
			this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			let _this = this 
			if (_this.page > _this.totalPage) {
				return
			}
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			_this.nodateStatus = false
			_this.loading = true;
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: _this.id,
				page: _this.page,
				pageSize: _this.pageSize,
				status: _this.status
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.nodateStatus = true
					_this.list.push(...res.data.data.list)
					_this.totalPage = res.data.data.totalPage
					_this.page += 1;
					_this.loading = false;
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close();
				Toast('网络请求超时！')
			})
		},
		getData () {
			let _this = this;
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			_this.nodateStatus = false
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: _this.id,
				page: 1,
				pageSize: _this.pageSize,
				status: _this.status
			})).then(function(res){
				Indicator.close();
				if (res.data.code === '10000') {
					_this.list = res.data.data.list
					_this.totalPage = res.data.data.totalPage
					_this.page = 2
					_this.nodateStatus = true
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close();
				Toast('网络请求超时！')
			})
		},
		getGroupList () {
			let _this = this
			axios.post('commodityGroup/list',qs.stringify({})).then(function(res){
				if (res.data.code === '10000') {
					_this.groupList = res.data.data.list
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		},
		back () {
			this.$router.back();
		},
		todisplay3 () {
			if(this.isedit){
				return
			}
			this.$router.push('/display3')
		},
		toedict (status,id,typeName,groupName,groupId) {
			if (this.isedit) {
				return 
			}
			if (status!=='1') {
				this.$router.push({query:{id:id,typeName:typeName,groupName:groupName},path:'/display6'})
				return 
			}
			this.$router.push({query:{id:id,typeName:typeName,groupId:groupId},path:'/display5'})
		}
	},
	created () {
		this.getGroupList()

	},
	mounted () {
      	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
    },
}
</script>
<style scoped>
*{ box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding: 0;margin: 0;}
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;height: 100%;}
.ex-display .menu-wrapper {width: 100%;background: #fff;padding: 3px 0;font-size: 1.6rem;text-align: center;}
.ex-display .menu-wrapper .menu {width: 65%;margin: auto;height: 46px;line-height: 46px;}
.ex-display .menu-wrapper .menu li{width: 33.3%;float: left;color: #999;}
.ex-display .menu-wrapper .menu li.active{border-bottom: solid 3px #0470b6;color: #0470b6;}
.ex-display .table-wrapper {width: 100%;overflow-y: auto;overflow-x: auto;font-size: 1.4rem;margin-top: 15px;}
.ex-display .table-wrapper .table {width: 100%;max-width: 100%;border-collapse: collapse; vertical-align: middle;}
.ex-display .table-wrapper .table tr{background: #fff;}
.ex-display .table-wrapper .table tr:last-child{border-bottom: none;}
.ex-display .table-wrapper .table td{color: #aaafb6;}
.ex-display .table-wrapper .table td.m3{word-break: break-all;line-height: 20px;}
.ex-display .table-wrapper .table td.m3 {}
.ex-display .table-wrapper .table td.m3 .title{padding-bottom: 10px;color: #212a32;}
.ex-display .table-wrapper .table td.m3 .orange{color: #f16200;padding-right: 10px;}
.ex-display .table-wrapper .table td span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 22px;height: 22px;}
.ex-display .table-wrapper .table td span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.ex-display .table-wrapper .table td img{max-width: 80px;width: 80px;height: 80px;}
.ex-display .bottom{position: fixed;bottom: 0;left: 0;display: table;width: 100%;text-align: center;height: 50px;line-height: 50px;background: #fff;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;border-top: solid 1px #ebebeb;}
.ex-display .bottom span{display: table-cell;width: 50%;font-size: 1.4rem;border-right: solid 1px #ebebeb;}
.ex-display .bottom span:last-child{border-right: none;}
.ex-display .bottom span i{color: #999;}
.ex-display .bottom span:active{background: #ebebeb}
.ex-display .bottom.gray{color: #999;}
.ex-display .bottom.blue{color: #0c87d5!important;}

.ex-display .table-wrapper .table td span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 22px;height: 22px;}
.ex-display .table-wrapper .table td span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}

.ex-display .modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 999;display: table;}
.ex-display .modal_BJ .modal{display: table-cell;padding: 0 12%;vertical-align: middle;}
.ex-display .modal_BJ .modal .modal_box{background: #fff;width: 100%;border-radius: 5px;overflow: hidden;text-align: center;padding: 10px 0 0 0;}
.ex-display .modal_BJ .modal .modal_box .title{font-size: 1.6rem;}
.ex-display .modal_BJ .modal .modal_box .field{text-align: center;padding: 15px 25px;max-height: 220px;overflow-y: auto;}
.ex-display .modal_BJ .modal .modal_box .field ul li{text-align: left;font-size: 1.4rem;height: 40px;line-height: 40px;}
.ex-display .modal_BJ .modal .modal_box .field span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 20px;height: 20px;float: right;margin-top: 10px;}
.ex-display .modal_BJ .modal .modal_box .field span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.ex-display .modal_BJ .modal .modal_box .operate{height: 46px;padding: 0;border-top: 1px solid #e5e5e5;}
.ex-display .modal_BJ .modal .modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 46px;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .operate .gray{color: #596678;}
.ex-display .modal_BJ .modal .modal_box .operate .link:last-child{border-right: none;}
.ex-display .modal_BJ .modal .modal_box .operate .link:active{background: #ebebeb}


.ex-header{width: 100%;display: table;height: 4.5rem;background-color: rgb(255,255,255);color: rgb( 33,42,50);box-shadow:1px 1px 0px #ebebeb;position: relative;z-index: 9999;}
.ex-header span{display: table-cell;width: 33.3%;vertical-align: middle;font-size: 1.6rem;}
.ex-header span:nth-child(1){text-align: left;padding-left: 0.5rem;}
.ex-header span:nth-child(1) a{height: 100%;display: inline-block;line-height: 4.5rem;color: rgb(4,125,203);}
.ex-header span:nth-child(1) a i{font-size: 2rem;}
.ex-header span:nth-child(1) a label {height: 100%;display: inline-block;}
.ex-header span:nth-child(2){text-align: center;font-size: 1.8rem;}
.ex-header span:nth-child(3){text-align: right;}
.ex-header span:nth-child(3) a{height: 100%;display: inline-block;line-height: 4.5rem;color: #333;width: 5rem;text-align: center;}
</style>