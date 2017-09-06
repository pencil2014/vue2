<template>
	<div class="ex-address">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="list">
			<div class="wrapper" ref="wrapper"  :style="{ height: wrapperHeight + 'px' }">
				<div class="item">
					<div class="m1">
						<div>
							<p class="name">刘小花</p>
							<p class="f_right">17512082955</p>
						</div>
						<p class="area">广东省深圳市南山区科苑路科技园广东省深圳市南山区科苑路科技园广东省深圳市南山区科苑路科技园广东省深圳市南山区科苑路科技园</p>
					</div>
					<div class="m2">
						<span class="option" :class="{'select': isdefault}" @click="toselect">
							<span></span>设为默认
						</span>
						<div class="f_right">
							<span class="edit" @click="toEdit">编辑</span> &nbsp;&nbsp;
							<span @click="todelect">删除</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-item" @click="toAdd">
				<i class="iconfont">&#xe608;</i>添加地址
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Indicator, Toast , MessageBox } from 'mint-ui'
import HeadTitle from '../common/title.vue'
import NoData from '../common/nodata.vue'
export default {
	data(){
		return{
			modal: {
				text:'我的收货地址',
				fixed: false
			},
			isdefault: false,
			wrapperHeight: 0
		}
	},
	created() {

    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
    },
	computed: {
		
	},
	watch: {

	},
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		back () {
			this.$router.back();
		},
		toEdit () {
			this.$router.push('/newaddress')
		},
		toAdd () {
			this.$router.push('/newaddress')
		},
		toselect () {

		},
		todelect () {
			MessageBox({
				title:'提示',
				message:'确定删除收货地址?',
				showCancelButton:true,
				confirmButtonText:'确定',
				cancelButtonText:'取消',
			}).then(action =>{
				if(action === "confirm"){
					console.log(action)
				}
			})
		}
	},
	filters: {

	},
	destroyed () {
		Indicator.close()
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-address{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;font-size: 1.4rem;}
.wrapper{overflow-y: scroll;padding-top: 15px;}

.wrapper .item{background-color: #fff;}
.wrapper .item .m1{padding: 12px 0;border-bottom: solid 1px #ebebeb;}
.wrapper .item .m1 .name{font-size: 1.6rem;padding-bottom: 10px;float: left;}
.wrapper .item .m1 .area{clear: both;}
.wrapper .item .m1 p{padding:  0 1.5rem;}
.wrapper .item .m2{color: #5D646E;padding: 12px 0;}
.wrapper .item .m2 .option{display: inline-block;padding-left: 1.5rem;}
.wrapper .item .m2 .option span{background-image: url(../../assets/images/noselect.png);display: inline-block;background-size: contain;width: 20px;height: 20px;vertical-align: middle;margin-right: 5px;}
.wrapper .item .m2 .option.select{color: #1296db;}
.wrapper .item .m2 .option.select span{background-image: url(../../assets/images/select.png);}
.wrapper .item .f_right{float: right;padding-right: 1.5rem;font-size: 1.6rem;height: 100%;}
.wrapper .item .edit{color: #0470B6;}

.bottom{position: fixed;bottom: 0;left: 0;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;height: 50px;text-align: center; width: 100%;background: #fff;border-top: solid 1px #ebebeb;display: table;}
.bottom .bottom-item{display: table-cell;vertical-align: middle;}
.bottom .bottom-item i.iconfont{color: #999999}
.bottom .bottom-item:active {background:#ebebeb;}
</style>