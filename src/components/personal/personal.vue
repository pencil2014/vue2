<template v-cloak>
	<div class="ex-personal">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-personal-list">
			<div class="ex-personal-item">
				<ul>
					<router-link to="/index" tag="li" class="ex-personal-avatar">
						<span>头像</span>
						<span class="avatar" href="javascript:void(0);" >
							<img src="" alt="">
						</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>
					<router-link to="/index" tag="li">
						<span>用户名</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{personalData.userName}}</label>
					</router-link>
					<li @click="openPicker">
						<span >出生日期</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{brithday}}</label>
					</li>	
					<router-link to="/index" tag="li">
						<span>性别</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{sex}}</label>
					</router-link>		
				</ul>
			</div>
			<div class="ex-personal-item">
				<ul>
					<router-link to="/index" tag="li">
						<span>手机</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="" v-text="phone"></label>
					</router-link>
					<router-link to="/index" tag="li">
						<span>银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
				</ul>
			</div>
			<div class="ex-personal-item" v-show="isShop">
				<ul>
					<router-link to="/index" tag="li">
						<span>手机</span>
						<i class="iconfont" >&#xe606;</i>
						<label for="">{{phone}}</label>
					</router-link>
					<router-link to="/index" tag="li">
						<span>个人银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>	
					<router-link to="/index" tag="li">
						<span>公司银行卡</span>
						<i class="iconfont" >&#xe606;</i>
					</router-link>		
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
	</div>	
	

</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox, DatetimePicker} from 'mint-ui'
import HeadTitle from '../common/title.vue'
import moment from 'moment'
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
			isShop:'',
		}
	},
	components: {
		HeadTitle, 
		DatetimePicker,
	},
	computed:{
		phone: function() {
			if(this.personalData.phone){
				let phone = this.personalData.phone+'';
				let len = phone.length;
				let start = phone.slice(0,3);
				let end = phone.slice(-(len-8));
				return start+'*****'+end;
			}else{
				return '';
			}
		},
		brithday () {
			if(this.personalData.brithday){
				let day = (moment(this.personalData.brithday*1000).format("YYYY-MM-DD")).split('-');
				return day[0]+'年'+day[1]+'月'+day[2]+'日';
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
			let isShop = _this.personalData.userCode.indexOf('M') === -1;
			return isShop;
		}
	},
	created () {
		let _this = this;
		_this.startDate = '1996';
		_this.endDate = '2001'
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.personalData = res.data.data

			} else {
				MessageBox('提示', res.data.msg)
			}
		}).catch(function(){
			MessageBox('提示', '系统出错了，正在修复中...')
		})
	},
	methods: {
		back () {
			this.$router.back();
		},
		openPicker() {
	        this.$refs.date.open();
	    },
	    changeDate (value) {
	    	// console.log(Date.parse(value))
	    	// console.log(moment(1488384000000).format("YYYY-MM-DD"))
	    	let _this = this;
	    	var stamp = Date.parse(value)
	    	let brithday = moment(stamp).format("YYYY-MM-DD")
	    	// 改变用户资料
			axios.post('user/update',qs.stringify({
				brithday: brithday
			})).then(res =>{
				if (res.data.code === '10000') {
					_this.personalData.brithday = stamp;
				} else {
					MessageBox('提示', res.data.msg)
				}
			}).catch(function(){
					MessageBox('提示', '系统出错了，正在修复中...')
			})
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
.ex-personal-list .ex-personal-item ul li:active{background: #ebebeb}
.ex-personal-list .ex-personal-item ul li:last-child{border: none;}
.ex-personal-list .logout{text-align: center;padding-right: 0px;font-size: 1.6rem;color: #f0544d !important;}
.ex-personal-list .ex-personal-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
.ex-personal-list .ex-personal-item ul li label{float: right;color: #aaafb6;padding: 0 5px 0 0;}
.ex-personal-avatar{height: 40px;line-height: 40px !important;}
.ex-personal-avatar .avatar{width: 44px;height: 44px;background: url('../../assets/images/head.png')no-repeat center; -webkit-background-size: cover;position: absolute;right: 30px;border-radius: 50%;}
</style>