<template>
	<div class="ex-fillform">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="top-wrap">
			<div class="step">
				<dl class="one">
					<dt>1</dt>
					<dd>基本信息</dd>
				</dl>
				<dl class="two">
					<dt>2</dt>
					<dd>法人信息</dd>
				</dl>
				<dl class="three active">
					<dt>3</dt>
					<dd>申请材料</dd>
				</dl>
				<dl class="four">
					<dt>4</dt>
					<dd>合同打印上传</dd>
				</dl>
				<span><em></em></span>
			</div>
		</div>
		<div class="form-wrap">
			<div class="form-item">
				<span class="name">账户类型</span>
				<span class="text"><input type="text"></span>
			</div>
			<div class="form-item">
				<span class="name">开户行名称</span>
				<span class="text"><input type="text"></span>
			</div>
			<div class="form-item">
				<span class="name">支行名称</span>
				<span class="text"><input type="text"></span>
			</div>
			<div class="form-item">
				<span class="name">银行户名</span>
				<span class="text"><input type="text"></span>
			</div>
			<div class="form-item">
				<span class="name">银行账号</span>
				<span class="text"><input type="text"></span>
			</div>
			<div class="form-item">
				<span class="name">整体门面（含招牌）图片</span>
				<span class="text">
					<div class="upladImg-wrap">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<input type="file" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')" />
					</div>
				</span>
			</div>
			<div class="form-item">
				<span class="name">收银台图片</span>
				<span class="text">
					<div class="upladImg-wrap">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<input type="file" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')" />
					</div>
				</span>
			</div>
			<div class="form-item">
				<span class="name">店内环境照片</span>
				<span class="text">
					<div class="upladImg-wrap">
						<div class="upladImg">
							<i class="iconfont">&#xe608;</i>
							<br>
							上传照片
						</div>
						<input type="file" name="" class="file-prew" id="frontPic" @change="getfile('frontPic')" />
					</div>
				</span>
			</div>
		</div>
		<div class="save">
			<input type="button" value="下一步" @click="save">
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { Toast, MessageBox , Indicator } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'在线支付申请',
				fixed: false
			},
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		disable () {
		
		},
	},
	created () {
	},
	methods: {
		back () {
			this.$router.back();
		},
		save () {
			this.$router.push('/fillform/step3')
		}
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.ex-fillform{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;padding-bottom: 56px;position: absolute;}
.step{width: 75%;position: relative;margin: 34px 12.5% 0;padding-bottom: 60px;}
.step dl {position: absolute;text-align: center;width: 70px;margin-left: -35px;color: #aaafb6;margin-top: -12px;z-index: 3;}
.step dl.active{color: #58c86b;}
.step dl.one{left: 0;}
.step dl.two{left: 33.5%;}
.step dl.three{left: 66.66%;}
.step dl.four{left: 100%;}
.step dl dt{width: 30px;height: 30px;border: solid 3px #e3e3e3;margin: 0 auto;border-radius: 50%;line-height: 24px;margin-bottom: 5px;background: #f0f0f0;}
.step dl.active dt{width: 40px;height: 40px;line-height: 34px;background: #58c86b;color: #fff;margin-bottom: 0;margin-top: -5px;}
.step span{width: 100%;height: 7px;background: #e3e3e3;display: inline-block;position: absolute;top: 0;left: 0;}

.form-wrap{width: 100%;padding: 0 0 0 15px;background: #fff;margin-top: 16px;}
.form-wrap .form-item{border-bottom: solid 1px #ebebeb;min-height: 46px;padding: 8px 0;display: table;width: 100%;}
.form-wrap .form-item:last-child{border-bottom: none;}
.form-wrap .form-item span{display: table-cell;vertical-align: middle;}
.form-wrap .form-item span.name{width: 25%;}
.form-wrap .form-item span.text{width: 70%;}
.form-wrap .form-item span.text input {width: 100%;}
.form-wrap .form-item .upladImg-wrap {height: 64px;width: 64px;position: relative;right: 10px;float: right;overflow: hidden;}
.form-wrap .form-item .upladImg-wrap .upladImg{position: absolute;text-align: center;border:dotted 1px #d8d8d8;height: 64px;width: 64px;color: #aaafb6;padding-top: 12px;}
.form-wrap .form-item .upladImg-wrap .upladImg i.iconfont{font-size: 1.6rem;}
.form-wrap .form-item .upladImg-wrap .file-prew{height: 64px;width: 64px;position: absolute;left: 0;top: 0;height: 100%;width: 100%;z-index: 10;opacity: 0;filter: alpha(opacity=0);cursor: pointer;}

.save{width: 100%;padding: 0 15px;margin-top: 15px;}
.save input[type=button]{width: 100%;font-size: 1.6rem;color: #fff;background: #047dcb;border-radius: 4px;border:none;height: 48px;line-height: 48px;}
.save input[type=button]:active{background: #0470b6;}
</style>

