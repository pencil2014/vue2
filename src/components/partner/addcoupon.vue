<template>
	<div class="ex-coupon">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">活动名称</span>
				<span class="text"><input type="text" value="xxx" maxlength="11" readonly></span>
			</div>
			<div class="form-item">
				<span class="name">*条件消费额度</span>
				<span class="text"><input type="tel" placeholder="请输入消费额度" maxlength="11"></span>
			</div>
			<div class="form-item">
				<span class="name">*优惠减免额度</span>
				<span class="text"><input type="tel" placeholder="请输入减免额度" maxlength="11"></span>
			</div>
		</div>
		<div class="save">
			<input type="button" value="提交">
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
				text:'发布活动',
				fixed: false
			},
		}
	},
	mounted() {
      
    },
	computed: {
		
	},
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		back () {
			this.$router.back();
		},
	},
	filters: {
		checknum (value) {
			if(!value){
				return '0.00'
			}
			value += ''
			let num = '0.00'
			num = value >= 0 ? value : '0.00' 
			num = value.indexOf('.') > -1 ? (value.substring(0,value.indexOf(".") + 3)*1).toFixed(2) : value + '.00' 
			return num 
		}
	},
	destroyed () {
		Indicator.close()
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-coupon{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;font-size: 1.4rem;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.text{width: 65%;}
.form-wrap .form-item span.text input {width: 100%;border:none;padding-left: 10px;}

.save{width: 100%;padding: 0 15px;margin-top: 20px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>