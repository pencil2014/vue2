<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="table-wrapper">
			<table class="table">
	          <tr @click="todisplay3">
	            <td class="m1"><span class="option select"></span>
	            </td>
	            <td class="m2"><img src="../../assets/images/girl01.png" alt="">
	            </td>
	            <td class="m3"><div class="title">大金（DAIKIN）FTXP326RCDW FTX
					P326RCDW 大金变频挂式空调大1匹</div><label for="" class="orange">&yen;650</label>
					分组：电器1
	            </td>
	            <td class="m4"><i class="iconfont" >&#xe606;</i>
	            </td>
	          </tr>
	          <tr>
	            <td class="m1"><span class="option"></span>
	            </td>
	            <td class="m2"><img src="../../assets/images/girl01.png" alt="">
	            </td>
	            <td class="m3"><div class="title">大金</div><label for="" class="orange">&yen;650</label>
					分组：电器1
	            </td>
	            <td class="m4"><i class="iconfont" >&#xe606;</i>
	            </td>
	          </tr>
		    </table>
		</div>
		<div class="bottom">
			<span><i class="iconfont" >&#xe608;</i>
				添加</span>
			<span><i class="iconfont" >&#xe613;</i>
				管理</span>
		</div>
		<!-- <div class="bottom">
			<span>删除</span>
			<span>分组至</span>
		</div> -->
		<div class="modal_BJ">
			<div class="modal">
				<div class="modal_box">
					<div class="title">店铺分组</div>
					<div class="field">
						<ul>
							<li>
								<span>分组1</span>
								<i class="iconfont">&#xe636;</i>
							</li>
							<li>
								<span>分组2</span>
							</li>
						</ul>
					</div>
					<div class="operate">
						<span href="javascript:void(0)" class="link gray">取消</span>
						<span href="javascript:void(0)" class="link">确定</span>
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
			page: 1,
			totalPage: 1,
			pageSize: 20,
			wrapperHeight: 0,
			nodateStatus:false,
			loading:false,
			modal: {
				text:'产品',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle,
		NoData
	},
	computed:{
		hasdata () {
			if(this.nodateStatus && this.list.length === 0){
				return false
			}else{
				return true
			}
		},
	},
	methods: {
		back () {
			this.$router.back();
		},
		todisplay3 () {
			this.$router.push('/display3')
		},
		loadTop () {
			this.$refs.loadmore.onTopLoaded();
		},
		loadMore () {
			let _this = this 
			if (_this.page > _this.totalPage) {
				return
			}
			axios.post('commodityInfo/list',qs.stringify({
				shopsId: _this.$route.query.shopsId
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.list.push(...res.data.data.list)
					_this.totalPage = res.data.data.totalPage
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('网络请求超时！')
			})
		}
	},
	// mounted() {
 //      	this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
 //    },
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;height: 100%;}
.ex-display .table-wrapper {width: 100%;overflow-y: hidden;overflow-x: auto;font-size: 1.4rem;margin-top: 15px;background: #fff;}
.ex-display .table-wrapper .table {width: 100%;max-width: 100%;border-collapse: collapse; vertical-align: middle;}
.ex-display .table-wrapper .table tr{}
.ex-display .table-wrapper .table tr:last-child{border-bottom: none;}
.ex-display .table-wrapper .table td{color: #aaafb6;}
.ex-display .table-wrapper .table td.m3{word-break: break-all;line-height: 20px;}
.ex-display .table-wrapper .table td.m3 {}
.ex-display .table-wrapper .table td.m3 .title{padding-bottom: 10px;color: #212a32;}
.ex-display .table-wrapper .table td.m3 .orange{color: #f16200;padding-right: 10px;}
.ex-display .table-wrapper .table td span.option{display: inline-block;background: url(../../assets/images/noselect1.png) no-repeat;background-size: 100%;width: 22px;height: 22px;}
.ex-display .table-wrapper .table td span.select{background: url(../../assets/images/select1.png) no-repeat;background-size: 100%;}
.ex-display .table-wrapper .table td img{max-width: 80px;width: 80px;}
.ex-display .bottom{position: fixed;bottom: 0;left: 0;display: table;width: 100%;text-align: center;height: 50px;line-height: 50px;background: #fff;}
.ex-display .bottom span{display: table-cell;width: 50%;font-size: 1.4rem;}
.ex-display .bottom span i{color: #999;}
.ex-display .bottom span:active{background: #ebebeb}


.ex-display .modal_BJ {background: rgba(0,0,0,0.42);width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;z-index: 999;display: table;}
.ex-display .modal_BJ .modal{display: table-cell;padding: 0 12%;vertical-align: middle;}
.ex-display .modal_BJ .modal .modal_box{background: #fff;width: 100%;border-radius: 5px;overflow: hidden;text-align: center;padding: 10px 0 0 0;}
.ex-display .modal_BJ .modal .modal_box .title{font-size: 1.6rem;}
.ex-display .modal_BJ .modal .modal_box .field{text-align: center;padding: 15px 25px;line-height: 30px;}
.ex-display .modal_BJ .modal .modal_box .field ul li{text-align: left;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .field ul li i{color: #58c86b;font-size: 2.2rem;display: inline-block;float: right;}
.ex-display .modal_BJ .modal .modal_box .operate{height: 46px;padding: 0;border-top: 1px solid #e5e5e5;}
.ex-display .modal_BJ .modal .modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 46px;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .operate .gray{color: #596678;}
.ex-display .modal_BJ .modal .modal_box .operate .link:last-child{border-right: none;}
.ex-display .modal_BJ .modal .modal_box .operate .link:active{background: #ebebeb}
</style>