<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-display-sub">
			<span :class='{active: status === "2"}' @click='changetab("2")'>审核中</span><span :class='{active: status === "3"}' @click='changetab("3")'>出售中</span><span :class='{active: status === "1"}' @click='changetab("1")'>已下架</span>
		</div>
		<div class="table-wrapper">
		<mt-loadmore :top-method="loadTop" ref="loadmore">
			<table class="table"
				v-infinite-scroll="loadMore"
			    infinite-scroll-disabled="loading"
			    infinite-scroll-distance="10"
			    infinite-scroll-immediate-check="false"
				>
	          <tr @click="" v-for='item in list'>
	          	<td style="text-align:center" v-show='status !== "2"'>
	          	<span class="checkboxGroup">
	          		<input type="checkbox" :value="item.id" v-model="picked">
	          		<i class="iconfont" v-show='picked.indexOf(item.id) === -1'>&#xe64a;</i>
	          		<i class="iconfont select" v-show='picked.indexOf(item.id) !== -1'>&#xe64d;</i>
	          	</span>
	          	
	          	</td>
	            <td class="m2"><img :src="item.commodityAffixEntityList[0].filePath" alt="">
	            </td>
	            <td class="m3"><div class="title">{{item.commodityName}}</div><label for="" class="orange">&yen;{{item.price}}</label>
					分组：{{item.groupName}}
	            </td>
	            <td class="m4" @click='gotoInfo(item)'><i class="iconfont" >&#xe606;</i>
	            </td>
	          </tr>
		    </table>
		    </mt-loadmore>
		    <div class="nodata" v-show='list.length === 0 && nodateStatus'>
					<img src="../../assets/images/nodata.png" alt="">
					<p>还没有数据哦~</p>
				</div>
		</div>
		
		<div class="bottom">
			<span @click="" class="one" v-show='status==="2"' @click='batchAdd'>添加</span><span @click="" v-show='status==="1"' @click='batchOnline'>上架</span><span @click="" v-show='status==="1"' @click='batchDelete'>删除</span><span @click="" v-show='status==="3"' @click='batchOffline'>下架</span><span @click="" v-show='status==="3"' @click='batchGroup'>分组至</span>
		</div>
		
		<div class="modal_BJ" v-show="showGroupModel">
			<div class="modal">
				<div class="modal_box">
					<div class="title">店铺分组</div>
					<div class="field">
						<ul>
							<li v-for='item in groupList'>
								<span class="name">{{item.groupName}}</span>
								<span class="checkboxGroup">
		          		<input type="radio" :value="item.id" v-model="selectGroupId">
		          		<i class="iconfont" v-show='selectGroupId != item.id'>&#xe64a;</i>
		          		<i class="iconfont select" v-show='selectGroupId == item.id && selectGroupId != ""'>&#xe64d;</i>
		          	</span>
							</li>
						</ul>
					</div>
					<div class="operate">
						<span href="javascript:void(0)" class="link gray" @click='cancleGroupModel'>取消</span>
						<span href="javascript:void(0)" class="link" @click='selectGroupModel'>确定</span>
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
			id:'',
			list:[],
			status: '2',
			groupId: '',
			page: 1,
			totalPage: 1,
			pageSize: 20,
			nodateStatus:false,
			loading:false,
			modal: {
				text:'商品',
				fixed: false
			},
			picked: [],
			groupList: [],
			batchGroupId: '',
			selectGroupId: '',
			showGroupModel: false
		}
	},
	components: {
		HeadTitle,
		NoData
	},
	computed:{
	},
	methods: {
		back () {
			this.$router.back();
		},
		changetab (status) {
			Indicator.close()
			this.status = status
			this.nodateStatus = false
			this.page = 1
			this.picked = []
			this.getLsit()
		},
		gotoInfo (item) {
			window.localStorage.setItem('goodsInfo', JSON.stringify(item))
			if (item.status !== '1') {
				this.$router.push('/info')
			} else {
				this.$router.push('/editinfo')
			}
		},
		getLsit () {
			let _this = this
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: this.id,
				groupId: this.groupId,
				status: this.status,
				page: this.page,
				pageSize: this.pageSize
			})).then(function(res){
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.list = res.data.data.list
					_this.totalPage = res.data.data.totalPage
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.nodateStatus = true
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
		batchAdd () {
			this.$router.push('/display3')
		},
		batchOffline () {
			if (this.picked.length === 0) {
				MessageBox('提示', '请选择需要下架的商品!')
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
							ids: _this.picked.join(',')
						})).then(function(res){
							if (res.data.code === '10000') {
								Toast('商品下架成功！')
								_this.getLsit()
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
			if (this.picked.length === 0) {
				MessageBox('提示', '请选择需要上架的商品!')
				return
			}
			let _this = this
			axios.post('commodityInfo/batchOnline',qs.stringify({
				ids: this.picked.join(',')
			})).then(function(res){
				if (res.data.code === '10000') {
					Toast('商品上架成功！')
					_this.getLsit()
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		},
		batchDelete () {
			if (this.picked.length === 0) {
				MessageBox('提示', '请选择需要删除的商品!')
				return
			}
			let _this = this
			MessageBox({
				  title: '提示',
				  message: '确认删除商品吗？',
				  showCancelButton: true,
				  confirmButtonText: '删除'
				}).then(action => {
					if (action === 'confirm') {
						axios.post('commodityInfo/batchDelete',qs.stringify({
							ids: _this.picked.join(',')
						})).then(function(res){
							if (res.data.code === '10000') {
								Toast('商品删除成功！')
								_this.getLsit()
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
		batchGroup () {
			if (this.picked.length === 0) {
				MessageBox('提示', '请选择需要分组的商品!')
				return
			}
			this.showGroupModel = true
		},
		cancleGroupModel() {
			this.showGroupModel = false
			this.selectGroupId = ''
		},
		selectGroupModel() {
			this.showGroupModel = false
			this.batchGroupFun()
		},
		batchGroupFun () {
			let _this = this
			axios.post('commodityInfo/batchGroup',qs.stringify({
				ids: this.picked.join(','),
				groupId: this.batchGroupId
			})).then(function(res){
				if (res.data.code === '10000') {
					Toast('商品分组成功！')
					_this.selectGroupId = ''
					_this.getLsit()
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		},
		loadTop () {
			Indicator.open({
			  text: '正在刷新...',
			  spinnerType: 'fading-circle'
			})
			let _this = this
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: this.id,
				groupId: this.groupId,
				status: this.status,
				page: this.page,
				pageSize: this.pageSize
			}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.list = res.data.data.list || []
					_this.page = 2
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('网络请求超时！')
			})
			this.$refs.loadmore.onTopLoaded()
		},
		loadMore () {
			if (this.page > this.totalPage) {
				return
			}
			Indicator.open({
			  text: '数据加载中...',
			  spinnerType: 'fading-circle'
			})
			this.loading = true
			let _this = this
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: this.id,
				groupId: this.groupId,
				status: this.status,
				page: this.page,
				pageSize: this.pageSize
			}))
			.then(function(res){
				Indicator.close()
				_this.loading = false
				_this.nodateStatus = true
				if (res.data.code === '10000') {
					_this.totalPage = res.data.data.totalPage
					_this.list.push(...res.data.data.list)
					_this.page += 1
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				_this.nodateStatus = true
				Toast('网络请求超时！')
			})
		}
	},
	created () {
		this.id = this.$route.params.id
		this.getLsit()
		this.getGroupList()
	},
	mounted() {},
}
</script>

<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;}
.ex-display .table-wrapper {width: 100%;font-size: 1.4rem;margin-top: 1.5rem;background: #fff; margin-bottom: 5rem;}
.ex-display .table-wrapper .table {width: 100%;max-width: 100%;border-collapse: collapse; vertical-align: middle;}
.ex-display .table-wrapper .table tr{}
/*.ex-display .table-wrapper .table tr:last-child{border-bottom: none;}*/
.ex-display .table-wrapper .table td{color: #aaafb6;}
.ex-display .table-wrapper .table td.m2 img{ width: 6rem; height: 6rem; }
.ex-display .table-wrapper .table td.m3{word-break: break-all;line-height: 20px;}
.ex-display .table-wrapper .table td.m3 {}
.ex-display .table-wrapper .table td.m3 .title{padding-bottom: 10px;color: #212a32;}
.ex-display .table-wrapper .table td.m3 .orange{color: #f16200;padding-right: 10px;}
.ex-display .table-wrapper .table td span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 22px;height: 22px;}
.ex-display .table-wrapper .table td span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.ex-display .table-wrapper .table td img{max-width: 80px;width: 80px;}


.ex-display .bottom{position: fixed;bottom: 0;left: 0;width: 100%;text-align: center; border-top: 1px solid #eee; height: 5rem; line-height: 5rem;}
.ex-display .bottom span{display: inline-block; width: 50%;font-size: 1.4rem;border-right: solid 1px #ebebeb; margin-right: -1px;}
.ex-display .bottom span.one{ width: 100%; }
.ex-display .bottom span:active{background: #ebebeb}


.ex-display-sub { height: 5rem; font-size: 1.4rem;background-color: #fff;}
.ex-display-sub span { display: inline-block; width: 33.3%;  text-align: center; line-height: 5rem; border-bottom: 2px solid #fff; color: #999;}
.ex-display-sub span.active{ color: #047dcb; border-color: #047dcb; }

.checkboxGroup { width: 3rem; height: 3rem;  position: relative; display: inline-block; }
.checkboxGroup input {opacity: 0; filter: alpha(opacity=0); position: absolute; left: 0; z-index: 2; width: 100%; height: 100%; margin: 0;}
.checkboxGroup i{ font-size: 3rem; }
.checkboxGroup i.select { color: #56c869; }



.modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 99999;}
.modal{ width: 80%; height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);}
.modal_box{background: #fff;width: 100%;border-radius: 0.5rem;padding-top: 1.5rem;}
.modal_box .title{font-size: 1.6rem; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 1rem;}
.modal_box .field{padding: 1rem 5%; max-height: 21rem; overflow: auto;}
.modal_box .field li{font-size: 1.4rem; vertical-align: middle; margin-bottom: 1rem; }
.modal_box .field li .name{ display: inline-block;width: 80%; overflow: hidden; height: 3rem;vertical-align: middle;line-height: 3rem }
.modal_box .field li .checkboxGroup{color: #999}
.modal_box .field li .checkboxGroup i{vertical-align: middle; font-size: 2.8rem;}

.modal_box .operate{height: 4.5rem;padding: 0;border-top: 1px solid #e5e5e5; text-align: center;}
.modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 4.5rem;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.modal_box .operate .gray{color: #596678;}
.modal_box .operate .link:last-child{border-right: none;}
.modal_box .operate .link:active{background: #ebebeb}


</style>