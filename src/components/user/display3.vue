<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content">
				<li class="item">
					<span>产品名称</span>
					<input type="text" placeholder="最多8个字符" maxlength="8">
				</li>
				<li class="item">
					<span>产品价格</span>
					<input type="text" placeholder="请输入价格" maxlength="8">
				</li>
				<li class="item picture">
					<p>产品图片</p>
					请上传比例为4:3，小于500K的图片
					<div class="UpLoadIMG">
						<div class="report-file">
							<span>
								<i class="iconfont">&#xe608;</i>
								<br>
								上传照片
							</span>
							<input type="file" name="" class="file-prew" id="frontPic" />
						</div>
					</div>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item">
					<span>产品分类</span>
					<label class="right">
						房产
						<i class="iconfont" >&#xe606;</i>
					</label>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item" @click="todisplay4">
					<span>店铺分组</span>
					<label class="right">
						编辑
						<i class="iconfont">&#xe606;</i>
					</label>
				</li>
				<li class="item-option">
					<div class="select">
						<span class="option"></span>
						分组1
					</div>
					<div>
						<span class="option"></span>
						分组2
					</div>
				</li>
			</ul>
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
				text:'添加产品',
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
		todisplay4 () {

		}
	},
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;}
.ex-display .wrapper {}
.ex-display .wrapper .item-content{background: #fff;margin-top: 15px;}
.ex-display .wrapper .item {min-height: 30px;line-height: 30px;font-size: 1.4rem;padding: 9px 0;border-bottom: solid 1px #ebebeb;margin-left: 10px;}
.ex-display .wrapper li.picture{color: #aaafb6;line-height: 25px;}
.ex-display .wrapper li.picture p{color: #212a32;}
.ex-display .wrapper .item:last-child{border-bottom: none;}
.ex-display .wrapper .item span{width: 25%;display: inline-block;}
.ex-display .wrapper .item input{border: none;width: 70%;}
.ex-display .wrapper .item label.right{float: right;padding-right: 10px;color: #aaafb6;}

.ex-display .wrapper .item-content .item-option{font-size: 1.4rem;padding: 9px 0 9px 25px;line-height: 30px;}
.ex-display .wrapper .item-content .item-option div{}
.ex-display .wrapper .item-content .item-option div .option{display: inline-block;width: 20px;height: 20px;background: url(../../assets/images/noselect.png) no-repeat;background-size: 100%;vertical-align: middle;}
.ex-display .wrapper .item-content .item-option div.select{color: #0c87d5;	}
.ex-display .wrapper .item-content .item-option div.select .option{background: url(../../assets/images/select.png) no-repeat;background-size: 100%;}

.ex-display .wrapper .item .report-file {width: 64px;height: 64px;overflow: hidden;display: inline-flex;position: relative;border: dotted 1px #d8d8d8;text-align: center;}
.ex-display .wrapper .item .report-file span{cursor: pointer;display: block;width: 100%;line-height: 20px;padding-top: 12px;}
.ex-display .wrapper .item .report-file .file-prew{opacity: 0;filter: alpha(opacity=0);cursor: pointer;position: absolute;left: 0;top: 0;z-index: 10;}
.UpLoadIMG{margin: 15px 0 0 15px;}


</style>