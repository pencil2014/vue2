<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content">
				<li class="item">
					<span>商品名称</span>
					<input type="text" placeholder="" maxlength="8" v-model.trim="commodityName" readonly>
				</li>
				<li class="item">
					<span>商品价格</span>
					<input type="text" placeholder="" maxlength="8" v-model.trim="price" readonly>
				</li>
				<li class="item picture">
					<p>商品图片</p>
					<div class="UpLoadIMG">
						<div class="report-pic" v-for='(item,index) in imgurl'>
							<img :src="item" v-preview="item">
						</div>
					</div>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item">
					<span>商品分类</span>
					<label class="right">
						{{typeName}}
					</label>
				</li>
			</ul>
			<ul class="item-content">
				<li class="item">
					<span>店铺分组</span>
					<label class="right">
						{{groupName}}
					</label>
				</li>
			</ul>
		</div>
		<lg-preview></lg-preview>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import lrz from 'lrz'
import { MessageBox, Indicator, Toast} from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			groupList: [],
			TypeList: [],
			detailList: [],
			commodityTypeId: '',
			imgurl: [],
			commodityName:'',
			price:'',
			modal: {
				text:'商品详情',
				fixed: false
			},
			submitbtn: false
		}
	},
	components: {
		HeadTitle,
	},
	computed:{
		id () {
			return this.$route.query.id
		},
		typeName () {
			return this.$route.query.typeName
		},
		groupName () {
			return this.$route.query.groupName
		},
	},
	methods: {
		back () {
			this.$router.back();
		},
		getDetail () {
			let _this = this
			axios.post('commodityInfo/get',qs.stringify({
				id: _this.id
			})).then(function(res){
				if (res.data.code === '10000') {
					_this.detailList = res.data.data
					_this.commodityName = res.data.data.commodityName
					_this.price = res.data.data.price
					_this.groupId = res.data.data.groupId
					_this.groupName = res.data.data.groupName
					_this.selcommodityTypeId = res.data.data.commodityTypeId
					_this.commodityTypeId = res.data.data.commodityTypeId
					_this.typeName = res.data.data.typeName
					_this.groupId = res.data.data.groupId
					let imgArray = res.data.data.commodityAffixEntityList
					imgArray.forEach(function(v,k){
						_this.imgurl.push(v.filePath)
					})
				} else {
					Toast(res.data.msg)
				}
			}).catch(function(){
				_this.nodateStatus = true
					Toast('连接失败，请检查网络是否正常!')
			})
		},
		back () {
			this.$router.back();
		},
		preimg (url) {
			this.imgpre.url = url;
			this.imgpre.show = true
		},
		hidepre () {
			this.imgpre.show = false;
			this.imgpre.url = ''
		}
	},
	created () {
		this.getDetail()
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

.ex-display .wrapper .item .report-file {overflow: hidden;position: relative;border: dotted 1px #d8d8d8;text-align: center;}
.ex-display .wrapper .item .report-file span{cursor: pointer;display: block;width: 100%;line-height: 20px;padding-top: 12px;}
.ex-display .wrapper .item .report-file .file-prew{opacity: 0;filter: alpha(opacity=0);cursor: pointer;position: absolute;left: 0;top: 0;z-index: 10;width: 100%;height: 100%;}
.UpLoadIMG{margin: 15px 0 0 15px;}
.ex-display .wrapper .item .UpLoadIMG div{/*display: inline-flex;*/display: inline-block;width: 64px;height: 64px;margin: 0 9px;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic {border: solid 1px #ebebeb;position: relative;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic img{;width: 100%;height: 100%;}
.ex-display .wrapper .item .UpLoadIMG div.report-pic .delect{position:absolute;top: -12px;right: -10px;background: #666;color: #fff;display: inline-block;width: 24px;height: 24px;text-align: center;border-radius: 50%;font-size: 24px;line-height: 20px;}

.preview{position: absolute;z-index: 999;left: 0px;top: 0;}
</style>