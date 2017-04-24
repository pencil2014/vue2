<template>
	<div class="ex-display">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="wrapper">
			<ul class="item-content">
				<li class="item">
					<span>
						<i class="iconfont">&#xe6b3;</i>
						分组1
					</span>
					<span class="right">重命名</span>
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
				text:'店铺分组',
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
		loadMore () {
			
		}
	},
}
</script>
<style scoped>
.ex-display {width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;height: 100%;font-size: 1.6rem;}
.ex-display .wrapper {background: #fff;}
.ex-display .wrapper .item-content{margin: 15px 0 0 10px;}
.ex-display .wrapper .item-content .item{height: 30px;line-height: 30px;padding: 8px 0;border-bottom: solid 1px #ebebeb;}
.ex-display .wrapper .item-content .item:last-child{border-bottom: none;}
.ex-display .wrapper .item-content .item .right{float: right;padding-right: 10px;color: #8f959e;font-size: 1.4rem;}
.ex-display .wrapper .item-content i{color: #8f959e;font-size: 2rem;}
</style>