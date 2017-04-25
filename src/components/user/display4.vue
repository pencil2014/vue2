<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content">
				<li class="item">
					<span>
						<i class="iconfont">&#xe6b3;</i>
						分组1
					</span>
					<span class="right">重命名</span>
				</li>
				<li class="item">
					<span>
						<i class="iconfont">&#xe6b3;</i>
						分组1
					</span>
					<span class="right">重命名</span>
				</li>
			</ul>
		</div>
		<div class="bottom" @click="test">
			<i class="iconfont" >&#xe608;</i>
			添加分组
		</div>
		<div class="modal_BJ">
			<div class="modal">
				<div class="modal_box">
					<div class="title">添加店铺分组</div>
					<div class="field">
						<input type="text" placeholder="请输入分组名称" maxlength="8">
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
import { MessageBox, Indicator, Toast } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'店铺分组',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle,
	},
	computed:{

	},
	created () {

	},
	methods: {
		back () {
			this.$router.back();
		},
		loadMore () {
			
		},
		test () {
			console.log(1)
		}
	},
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
.ex-display .modal_BJ .modal .modal_box{background: #fff;width: 100%;border-radius: 5px;overflow: hidden;text-align: center;padding-top: 10px;}
.ex-display .modal_BJ .modal .modal_box .title{font-size: 1.6rem;}
.ex-display .modal_BJ .modal .modal_box .field{padding: 15px 20%;text-align: center;}
.ex-display .modal_BJ .modal .modal_box .field input{height: 30px;text-indent: 2em;font-size: 1.4rem;border:none;}
.ex-display .modal_BJ .modal .modal_box .operate{height: 46px;padding: 0;border-top: 1px solid #e5e5e5;}
.ex-display .modal_BJ .modal .modal_box .operate .link{width: 50%;display: inline-block;float: left;line-height: 46px;border-right: solid 1px #e5e5e5;box-sizing: border-box;color: #212a32;font-size: 1.4rem;}
.ex-display .modal_BJ .modal .modal_box .operate .gray{color: #596678;}
.ex-display .modal_BJ .modal .modal_box .operate .link:last-child{border-right: none;}
.ex-display .modal_BJ .modal .modal_box .operate .link:active{background: #ebebeb}
</style>