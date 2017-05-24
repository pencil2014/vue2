<template>
	<div class="ex-apply">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-form">
			<p>*商家通过“联盟商家入驻”申请，可获得参加商家推广板块资格</p>		
			<div class="ex-field">
				<div class="ex-field-wrapper">
					<label class="ex-field-title">商家名称</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入商家名称" @input="standard('shopsEnterName')" v-model="shopsEnterName">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系人</label>
					<div class="ex-field-value">
						<input type="text" placeholder="请输入联系人姓名" @input="standard('shopsLinkman')" v-model="shopsLinkman">
					</div>
				</div>
				<div class="ex-field-wrapper">
					<label class="ex-field-title">联系电话</label>
					<div class="ex-field-value">
						<input type="tel" placeholder="请输入联系人手机号" @input="standardPhone('shopsLinkphone')" v-model="shopsLinkphone" maxlength="11">
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
				<span class="gray">{{applyAdress.keyword}}</span>
				<i class="iconfont arrow">&#xe606;</i>
			</div>
		</div>
		<div class="ex-button">
			<button @click="submit" :class="{disable:disableBtn}">提交</button>
		</div>
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
			classificationId: '',
			classifyName: '',
			applyAdress: {},
			shopsId: '',
			shopsEnterName: '',
			shopsLinkman: '',
			shopsLinkphone: '',
			isSubmit: false
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disableBtn () {
			let rule1 = !this.shopsEnterName || !this.shopsLinkman || !this.shopsLinkphone || !this.checkPhone(this.shopsLinkphone) || !this.applyAdress.keyword
			return (rule1 ? true : false)
		},
	},
	watch: {
		isOpenRangeSlots (value) {
			
		} 
	},
	created () {
		this.getClassList();
		this.getShopId();
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
			this.classificationId = selectValue[0].id
		},
		submit () {
			if(this.isSubmit){
				return
			}
			if(!this.shopsEnterName){
				MessageBox('提示','商家名称不能为空！')
				return
			}
			if(!this.shopsLinkman){
				MessageBox('提示','联系人不能为空！')
				return
			}
			if(!this.shopsLinkphone){
				MessageBox('提示','联系电话不能为空！')
				return
			}
			if(!this.checkPhone(this.shopsLinkphone)){
				MessageBox('提示','请输入正确的联系电话！')
				return
			}
			if(!this.classificationId){
				MessageBox('提示','请选择经营范围！')
				return
			}
			if(!this.applyAdress.keyword){
				MessageBox('提示','商家地址不能为空！')
				return
			}
			this.isSubmit = true
			this.shopEnter();
		},
		toapply2 () {
			let obj = {
				defaultIndex: this.slots[0].values.indexOf(this.classifyName),
				shopsEnterName: this.shopsEnterName,
				shopsLinkman: this.shopsLinkman,
				shopsLinkphone: this.shopsLinkphone
			}
			localStorage.setItem('applyData',JSON.stringify(obj))
			this.$router.push('/apply2')
		},
		shopEnter () {
			let _this = this;
			Indicator.open({
			  text: '提交中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shop/enter',qs.stringify({
				shopsEnterName: _this.shopsEnterName,
				shopsLinkman: _this.shopsLinkman,
				shopsLinkphone: _this.shopsLinkphone,
				classificationId: _this.classificationId,
				province: _this.applyAdress.provinceId,
				city: _this.applyAdress.cityId,
				county: _this.applyAdress.districtId,
				shopsAddress: _this.applyAdress.shopsAddress
			})).then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					localStorage.setItem('applyData','')
					localStorage.setItem('applyAdress','')
					MessageBox('提示','提交成功！').then(action => {
						_this.$router.push('/apply3');
					})
				} else {
					_this.isSubmit = false
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.isSubmit = false
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getShopId () {
			let _this = this;
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			axios.post('shop/examine',qs.stringify({}))
			.then(function(res){
				Indicator.close()
				if (res.data.code === '10000') {
					_this.shopsId = res.data.data.id
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		getClassList () {
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
						if(!!applyData){
							_this.shopsEnterName = applyData.shopsEnterName
							_this.shopsLinkman = applyData.shopsLinkman
							_this.shopsLinkphone = applyData.shopsLinkphone
							_this.slots[0].defaultIndex = applyData.defaultIndex 
						}
						_this.applyAdress = applyAdress ? applyAdress : {}
					}
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				Indicator.close()
				Toast('连接失败，请检查网络是否正常!')
			})
		},
		standard(value) {
		 	this[value] = this[value].replace(/[^a-zA-Z0-9\u4E00-\u9FA5]|\s/g,'')
		},
		standardPhone(value) {
			this[value] = this[value].replace(/[^0-9]|\s/g,'')
		},
		checkPhone (value){
			return (/1\d{10}/.test(value) ? true : false)
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
.ex-field-wrapper .ex-field-value input{display: block;width: 75%;height: 30px;border: none;font-size: 1.4rem;box-sizing:border-box; -moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-field-wrapper .ex-field-value input[type=button]{background: #fff;border: solid 1px #047dcb;color: #047dcb;border-radius: 3px;position: absolute;top: 0;right: 10px;font-size: 1.4rem;padding: 4px 10px;top: 9px;}
.ex-field-wrapper .ex-field-value input[type=button]:active{background: #29a0ec;}
.ex-field .ex-field-wrapper{border-bottom: solid 1px #ebebeb;}
.ex-field .ex-field-wrapper:last-child{border-bottom: none;}
.ex-field .ex-field-wrapper i.arrow {float: right;padding-right: 15px;color: rgba(173,180,190,1);}
.gray{color: #586485;}

.ex-button{margin-top: 16px;padding: 0 15px;text-align: center;}
.ex-button button{display: block;height: 48px;width: 100%;line-height: 48px;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;}
.ex-button button:active{background: #0470b6;}
.ex-button button.disable{background: #999 !important;}
</style>