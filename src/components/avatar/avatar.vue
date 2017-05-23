<template>
	<div class="ex-avatar">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-avatar-list" v-show="isCreact">
			<p v-if="!avatar">女</p>
			<div class="ex-avatar-item" v-if="isGirl || !avatar">
				<ul>
					<li @click="selAvatar('girl01')">
						<img src="../../assets/images/girl01.png" alt="">
						<i class="iconfont" v-show="avatar==='girl01'">&#xe636;</i>
					</li>
					<li @click="selAvatar('girl02')">
						<img src="../../assets/images/girl02.png" alt="">
						<i class="iconfont" v-show="avatar==='girl02'">&#xe636;</i>
					</li>
					<li @click="selAvatar('girl03')">
						<img src="../../assets/images/girl03.png" alt="">
						<i class="iconfont" v-show="avatar==='girl03'">&#xe636;</i>
					</li>
					<li @click="selAvatar('girl04')">
						<img src="../../assets/images/girl04.png" alt="">
						<i class="iconfont" v-show="avatar==='girl04'">&#xe636;</i>
					</li>
					<li @click="selAvatar('girl05')">
						<img src="../../assets/images/girl05.png" alt="">
						<i class="iconfont" v-show="avatar==='girl05'">&#xe636;</i>
					</li>
				</ul>
			</div>
			<p v-if="!avatar">男</p>
			<div class="ex-avatar-item" v-if="!isGirl || !avatar">
				<ul>
					<li @click="selAvatar('boy01')">
						<img src="../../assets/images/boy01.png" alt="">
						<i class="iconfont" v-show="avatar==='boy01'">&#xe636;</i>
					</li>
					<li @click="selAvatar('boy02')">
						<img src="../../assets/images/boy02.png" alt="">
						<i class="iconfont" v-show="avatar==='boy02'">&#xe636;</i>
					</li>
					<li @click="selAvatar('boy03')">
						<img src="../../assets/images/boy03.png" alt="">
						<i class="iconfont" v-show="avatar==='boy03'">&#xe636;</i>
					</li>
					<li @click="selAvatar('boy04')">
						<img src="../../assets/images/boy04.png" alt="">
						<i class="iconfont" v-show="avatar==='boy04'">&#xe636;</i>
					</li>
					<li @click="selAvatar('boy05')">
						<img src="../../assets/images/boy05.png" alt="">
						<i class="iconfont" v-show="avatar==='boy05'">&#xe636;</i>
					</li>
				</ul>
			</div>
		</div>

	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import HeadTitle from '../common/title.vue'
import { Toast } from 'mint-ui'
export default {
	data(){
		return{
			modal:{
				text:'选择头像',
				fixed: false,
			},
			personalData:'',
			isCreact:false
		}
	},
	computed:{
		avatar () {
			if(!this.personalData.logoImg){
				return false
			}else{
				return this.personalData.logoImg
			}
		},
		isGirl () {
			return /girl/gi.test(this.personalData.logoImg)
		}
	},
	components: {
		HeadTitle,
	},
	created () {
		let _this = this;
		// 获取用户详情
		axios.post('user/personal',qs.stringify({})).then(function(res){
			if (res.data.code === '10000') {
				_this.isCreact = true
				_this.personalData = res.data.data
			} else {
				Toast(res.data.msg)
			}
		}).catch(function(){
			Toast('连接失败，请检查网络是否正常!')
		})
	},
	methods: {
		back () {
			this.$router.go(-1);
		},
		selAvatar (value){
			let _this = this;
			let picPath = value
			
			let sex = /girl/gi.test(value) ? '0' : '1';
	    	// 改变用户资料
			axios.post('user/update',qs.stringify({
				sex: sex,
				picPath: picPath
			})).then(res =>{
				if (res.data.code === '10000') {

					_this.personalData.logoImg = picPath;
					_this.$router.back();
					//_this.$router.push('/personal');
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
					Toast('连接失败，请检查网络是否正常!')
			})
		}
	}
}
</script>
<style scoped>
.ex-avatar{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-avatar-list{padding-bottom: 56px;}
.ex-avatar-list p {height: 30px;padding: 0 0 0 10px;line-height: 30px;}
.ex-avatar-list .ex-avatar-item{margin-top: 0px; padding: 0 0 0 15px;background: #fff;}
.ex-avatar-list .ex-avatar-item ul{list-style-type: none;display: block;}
.ex-avatar-list .ex-avatar-item ul li{min-height: 56px;font-size: 1.4rem;width: 100%;padding: 8px 4px 8px 0;line-height: 30px;border-bottom: solid 1px #e5e5e5;}
.ex-avatar-list .ex-avatar-item ul li:last-child{border: none;}
.ex-avatar-list .ex-avatar-item ul li .iconfont{color: rgba(4,112,182,1);float: right;padding: 0 20px 0 0;display: block;line-height: 58px;font-size: 2rem;}
.ex-avatar-list .ex-avatar-item ul li img{width: 44px;display: inline-block;margin-top: 6.5px;}
</style>