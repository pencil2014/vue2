<template>
	<div class="ex-newaddress">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">收货人</span>
				<span class="text"><input type="text" placeholder="请输入收货人" maxlength="20"></span>
			</div>
			<div class="form-item">
				<span class="name">联系电话</span>
				<span class="text"><input type="tel" placeholder="请填写联系电话" maxlength="11"></span>
			</div>
			<div class="form-item">
				<span class="name">所在地区</span>
				<span class="text">
					<select v-model="provinceId">
						<option v-for="(item,index) in province" :value="item.id">{{item.name}}</option>
					</select>
					<select v-model="cityId" v-show="selcityList.length>0">
						<option v-for="(item,index) in selcityList" :value="item.id" v-if="item.name">{{item.name}}</option>
					</select>
					<select v-model="districtId" v-show="seldistrictList.length>0">
						<option v-for="(item,index) in seldistrictList" :value="item.id" v-if="item.name">{{item.name}}</option>
					</select>
				</span>
			</div>
			<div class="form-item">
				<span class="name">详细地址</span>
				<span class="text">
					<input type="text" placeholder="请填写详细地址" maxlength="40">
				</span>
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
				text:'添加新地址',
				fixed: false
			},
			province: [],
			city: [],
			district: [],
			selcityList: [],
			seldistrictList: [],
			provinceId: '',
			cityId: '',
			selcityId: '',
			districtId: '',
			seldistrictId: '',
		}
	},
	created() {
      	this.getBaseRegionAll()
    },
	computed: {
		
	},
	watch: {
		provinceId () {
			if(!this.provinceId){
				return
			}
			let arr = this.city.filter(function(item){
				return item.parentId === this.provinceId
			}.bind(this))
			this.selcityList = arr
			this.cityId = arr[0].id
		},
		cityId () {
			let arr = this.district.filter(function(item){
				return item.parentId === this.cityId
			}.bind(this))
			if(arr.length > 0) {
				this.seldistrictList = arr
				this.districtId = arr[0].id
			}else{
				this.seldistrictList = []
				this.districtId = ''
			}
		},
	},
	components: {
		HeadTitle,
		NoData
	},
	methods: {
		back () {
			this.$router.back();
		},
		getBaseRegionAll () {
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			})
			axios.post('/exsd-web/getBaseRegionAll',qs.stringify({}))
			.then( res => {
				Indicator.close()
				if (res.data.code === '10000') {
					this.province.push(...res.data.data.province)
					this.city.push(...res.data.data.city)
					this.district.push(...res.data.data.district)
					this.provinceId = this.province[0].id
				} else {
					Toast(res.data.msg)
				}
			})
			.catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
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
.ex-newaddress{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;position: relative;font-size: 1.4rem;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.text{width: 65%;}
.form-wrap .form-item span.text input {width: 100%;border:none;padding-left: 10px;}
.form-wrap .form-item span.text select{display: inline-block;width: 29%;}
.form-wrap .form-item span.text select:first-child{margin-left: 10px;}
/*.form-wrap .form-item.textarea span{word-break:break-all}
.form-wrap .form-item.textarea span.text textarea{border: none;outline: none;resize:none;font-size: 1.6rem;padding-left: 10px;}*/

.save{width: 100%;padding: 0 15px;margin-top: 20px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>