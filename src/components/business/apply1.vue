<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*商家通过“联盟商家入住”申请，可获得参加商家推广板块资格</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">商家名称</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入商家名称" @input="standard">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系人</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入联系人姓名" @input="standard">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系电话</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入联系人手机号" @input="standard">
					</div>
				</div>
				<div class="ex-field-wrapper" @click="openRangeSlots">
					<label class="ex-field-title">经营范围</label>
					<span class="gray">{{classifyName}}</span>
					<i class="iconfont arrow">&#xe606;</i>
				</div>
			</div>
		</div>
		<div class="ex-field">
			<div class="ex-field-wrapper" @click="toapply2">
				<label class="ex-field-title">商家地址</label>
				<span class="gray">{{address}}</span>
				<i class="iconfont arrow">&#xe606;</i>
			</div>
		</div>
		<Btn 
			text="提交"  
			:disableBtn="disable"
			@callback="submit"
		>
		</Btn>
		<mt-popup
			v-model="isOpenRangeSlots"
			position="bottom"
			class="picker-range"
		>
			<mt-picker :slots="slots" @change="onRangeChange">
				<!-- <slot>
					<div class="ex-range-slots">
						<span class="left" @click="closeRangeSlots">取消</span>
						<span class="right" @click="selectRange">确认</span>
					</div>
				</slot> -->
			</mt-picker>
		</mt-popup>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast , MessageBox , Indicator , Picker , Popup} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import Btn from '../common/button.vue'
export default {
	data(){
		return{
			modal: {
				text:'商家推广入驻',
			},
			slots: [
				{
					values: [],
					textAlign: 'center',
					defaultIndex: 0
				}
			],
			classifyList: [],
			isOpenRangeSlots: false,
			classifyId: '',
			classifyName: '',
			address: ''
		}
	},
	components: {
		HeadTitle,
		Btn
	},
	computed:{
		disable () {
			
		},
	},
	watch: {
		isOpenRangeSlots (value) {
			
		} 
	},
	created () {
		let _this = this;
		let applyData = _this.getdata('applyData')
		let applyAdress = _this.getdata('applyAdress')
		Indicator.open({
		  text: '加载中...',
		  spinnerType: 'fading-circle'
		});
		axios.post('shopClassification/list',qs.stringify({})).then(function(res){
			Indicator.close()
			if (res.data.code === '10000') {
				_this.classifyList = res.data.data || []
				if (_this.classifyList.length > 0) {
					_this.classifyList.forEach(function(item){
						_this.slots[0].values.push(item.name)
					})
					_this.slots[0].defaultIndex = !!applyData ? applyData.defaultIndex : 0;
					_this.address = applyAdress.keyword
				}
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Indicator.close()
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		openRangeSlots () {
			this.isOpenRangeSlots = true
		},
		onRangeChange (picker) {
			if(this.classifyList.length <= 0){
				return
			}
			this.classifyName = picker.values[0]
			let selectValue = this.classifyList.filter(function(item){
				return this.classifyName === item.name
			}.bind(this))
			this.classifyId = selectValue[0].id
			// console.log(this.classifyName,this.classifyId)
		},
		submit () {

		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},
		toapply2 () {
			let obj = {
				defaultIndex: this.slots[0].values.indexOf(this.classifyName)
			}
			localStorage.setItem('applyData',JSON.stringify(obj))
			this.$router.push('/apply2')
		},
		getdata (k) {
			let v = localStorage.getItem(k);
            try {
                v = JSON.parse(v);
            } catch(e) {

            }
            return v;
		},
	}
}
</script>
<style scoped>
.ex-apply{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-apply .picker-range{position: fixed;bottom: 0;width: 100%;}
.ex-apply .ex-range-slots{height: 100%;width: 100%;border-bottom: solid 1px #d6d6d6;line-height: 40px;padding: 0 15px;box-sizing: border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;font-size: 1.6rem;color: #047dcb;}
.ex-apply .ex-range-slots .left{float: left;}
.ex-apply .ex-range-slots .right{float: right;}
.ex-apply .ex-range-slots span{display: inline-block;width: 80px;text-align: center;}
.ex-apply .ex-range-slots span:active{background: #ebebeb;}

.ex-form{}
.ex-form p{line-height: 20px;word-wrap: break-word;padding: 10px 0 10px 10px;color: rgb(93,100,110);}
.ex-field{background: #fff;padding: 0 0 0 15px;margin-bottom: 15px;}
.ex-field-wrapper{height: 30px;width: 100%;line-height: 30px;padding: 8px  4px 8px 0;font-size: 1.4rem;position: relative;}
.ex-field-wrapper .ex-field-title{display: block;float: left;width: 20%;height: 30px;}
.ex-field-wrapper .ex-field-value{}
.ex-field-wrapper .ex-field-value input[type=text]{display: block;width: 75%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px;}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.ex-field .ex-field-wrapper i.arrow {float: right;padding-right: 15px;color: rgba(173,180,190,1);}
.gray{color: #586485;}
</style>