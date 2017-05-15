<template v-cloak>
	<div class="ex-personal">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-personal-list">
			<div class="ex-personal-item">
				<ul>
					<router-link to="/avatar" tag="li" class="ex-personal-avatar">
						<span>头像</span>
						<span class="avatar" href="javascript:void(0);" >
							<img src="../../assets/images/girl01.png" alt="" v-show="logoImg === 'girl01'">
							<img src="../../assets/images/girl02.png" alt="" v-show="logoImg === 'girl02'">
							<img src="../../assets/images/girl03.png" alt="" v-show="logoImg === 'girl03'">
							<img src="../../assets/images/girl04.png" alt="" v-show="logoImg === 'girl04'">
							<img src="../../assets/images/girl05.png" alt="" v-show="logoImg === 'girl05'">
							<img src="../../assets/images/boy01.png" alt="" v-show="logoImg === 'boy01'">
							<img src="../../assets/images/boy02.png" alt="" v-show="logoImg === 'boy02'">
							<img src="../../assets/images/boy03.png" alt="" v-show="logoImg === 'boy03'">
							<img src="../../assets/images/boy04.png" alt="" v-show="logoImg === 'boy04'">
							<img src="../../assets/images/boy05.png" alt="" v-show="logoImg === 'boy05'">
						</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/username" tag="li">
						<span>用户名</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{personalData.userName}}</label>
					</router-link>
					<li @click="openDatePicker">
						<span >出生日期</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{brithday}}</label>
					</li>	
					<li @click="openSexSlots=true">
						<span>性别</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{sex}}</label>
					</li>		
				</ul>
			</div>
			<div class="ex-personal-item" v-show="!isShop">
				<ul>
					<router-link to="/alterphone" tag="li">
						<span>手机</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="" v-text="phone"></label>
					</router-link>
					<router-link to="/banklist" tag="li">
						<span>银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
				</ul>
			</div>
			<div class="ex-personal-item" v-show="isShop">
				<ul>
					<router-link to="/alterphone" tag="li">
						<span>手机</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="" v-text="phone"></label>
					</router-link>
					<router-link to="/banklist" tag="li">
						<span>银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>	
					<!-- <router-link to="/banklist" tag="li">
						<span>公司银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>	 -->	
				</ul>
			</div>
		</div>
		<DatetimePicker 
			ref="date" 
			type="date"
		 	year-format="{value} 年"
       		month-format="{value} 月"
      		date-format="{value} 日"
      		:startDate='new Date(1950,0,1)'
      		:endDate='new Date()'
      		v-model="defaultBrithday"
      		@confirm='changeDate'   		
      		>
      	</DatetimePicker>
      	<Popup
			 v-model="openSexSlots"
			 position="bottom"
			 class="ex-sexpicker"
      		>
      		<Picker 
      		:slots="sexSlots" 
      		@change="changeSex"
      		defaultIndex="1"
      		:showToolbar="true"
      		>
      			<slot>
				    <b class="ex-sexslot" @click="selSex">确认</b>
				</slot>	
      		</Picker>
      	</Popup>
	</div>	
	

</template>
<script>
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import { MessageBox, DatetimePicker,Popup,Picker,Indicator, Toast } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'个人资料',
				fixed: false,
			},
			personalData:{
				phone: ''
			},
			sexSlots:[{
				values: ['男','女'],
				defaultIndex: 0
			}],
			openSexSlots:false,
			sexIndex:'',
		}
	},
	components: {
		HeadTitle, 
		DatetimePicker,
		Popup,
		Picker
	},
	computed:{
		phone () {
			if(this.personalData.phone){
				let value = this.personalData.phone;
				return value.replace(/^(\d{3})(\d{5})(\d{3})$/, '$1*****$3')
			}else{
				return '';
			}
		},
		brithday () {
			if(this.personalData.brithday){
				let time = new Date(this.personalData.brithday*1000)
				let year = time.getFullYear()
				let month = time.getMonth() +1
				let date = time.getDate()
				return year+'年'+month+'月'+date+'日';
			}	
		},
		defaultBrithday () {
			if(this.personalData.brithday){
				return new Date(this.personalData.brithday*1000)
			}
		},
		sex () {
			 if(this.personalData.sex){
			 	let sex = this.personalData.sex === '0'? '女':'男'
				return sex;
			 }else{
			 	return '';
			 }
		},
		isShop () {
			let isShop = /^B/i.test(this.personalData.userCode)?true:false;
			return isShop;
		},
		logoImg () {
			if(!this.personalData.logoImg){
				return 'default'
			}else{
				return this.personalData.logoImg
			}
		}
	},
	created () {
		let _this = this;

		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.personalData = res.data.data
				_this.sexSlots[0].defaultIndex = _this.personalData.sex == '0'? 1 : 0;
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		openDatePicker() {
	        this.$refs.date.open();
	    },
	    changeDate (value) {
	    	let _this = this;
	    	var stamp = Date.parse(value)
			let year = value.getFullYear()
			let month = value.getMonth() +1
			let date = value.getDate()
			let brithday = [year,month,date].join('-')
	    	// 改变用户资料
			axios.post('user/update',qs.stringify({
				brithday: brithday
			})).then(res =>{
				if (res.data.code === '10000') {
					_this.personalData.brithday = stamp/1000;
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})
	    },
	    changeSex (value) {
	    	let _value = value.values[0];
	    	this.sexIndex = _value === '女' ? '0' : '1';
	    },
	    selSex () {
	    	let _this = this;
	    	if(_this.sexIndex == _this.personalData.sex){
	    		_this.openSexSlots = false;
	    		return 
	    	}
	    	let sex = _this.sexIndex === '0' ? 'girl0' : 'boy0';
	    	_this.personalData.logoImg = sex + _this.Random(1,5)
	    	// 改变用户资料
			axios.post('user/update',qs.stringify({
				sex: _this.sexIndex,
				picPath: _this.personalData.logoImg
			})).then(res =>{
				if (res.data.code === '10000') {
					_this.personalData.sex = _this.sexIndex;
					_this.openSexSlots = false;
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})
	    },
	    Random (Min,Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			var num = Min + Math.round(Rand * Range); 
			return num;
		}
	    
	} 
}
</script>
<style scoped>
.ex-personal{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-personal-list{padding-bottom: 56px;}
.ex-personal-list .ex-personal-item{margin-top: 15px; padding: 0 0 0 15px;background: #fff;}
.ex-personal-list .ex-personal-item ul{list-style-type: none;display: block;}
.ex-personal-list .ex-personal-item ul li{min-height: 30px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
/*.ex-personal-list .ex-personal-item ul li:active{background: #ebebeb}*/
.ex-personal-list .ex-personal-item ul li:last-child{border: none;}
.ex-personal-list .logout{text-align: center;padding-right: 0px;font-size: 1.6rem;color: #f0544d !important;}
.ex-personal-list .ex-personal-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-personal-list .ex-personal-item ul li label{float: right;color: #aaafb6;padding: 0 5px 0 0;}
.ex-personal-avatar{height: 40px;line-height: 40px !important;}
.ex-personal-avatar .avatar{width: 44px;height: 44px;background: url('../../assets/images/head.png')no-repeat center; -webkit-background-size: cover;position: absolute;right: 30px;border-radius: 50%;}
.ex-sexpicker{width: 100%;}
.picker-slot-wrapper,.picker-item {backface-visibility: hidden; }
.ex-sexslot{text-align: center;display: block;line-height: 40px;font-size: 2rem;color: #26a2ff;border-bottom: solid 1px #ebebeb;box-shadow:1px 1px 1px #ebebeb }
</style>