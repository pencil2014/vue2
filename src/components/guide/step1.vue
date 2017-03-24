<template>
	<div class="ex-guide">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>
		<div class="ex-guide-list">
			<div class="ex-guide-item">
				<ul>
					<li>
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;
						</i>						
					</li>
					<li>
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;
						</i>						
					</li>
					<li>
						<span>个人资料</span>
						<i class="iconfont" >&#xe606;
						</i>						
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios"
import qs from "qs"
import { MessageBox } from 'mint-ui'
import HeadTitle from '../common/title.vue'
export default {
	data(){
		return{
			modal: {
				text:'使用指南',
				fixed: false
			}
		}
	},
	components: {
		HeadTitle
	},
	computed:{
	},
	created () {
	},
	methods: {
		back(){
			this.$router.back();
		},	
	}
}
</script>
<style scoped>
.ex-guide{width: 100%;background: #f4f5f7;color: #212a32;overflow-x: hidden;min-height: 100%;}
.ex-guide-list{padding-bottom: 56px;}
.ex-guide-list .ex-guide-item{background: #fff;}
.ex-guide-list .ex-guide-item ul{list-style-type: none;display: block;}
.ex-guide-list .ex-guide-item ul li{min-height: 30px;font-size: 1.4rem;width: 100%;padding: 8px 0;line-height: 30px;text-indent: 1.5em;word-wrap: break-word;}
.ex-guide-list .ex-guide-item ul li:nth-child(even){background: #f7f7f7;}
.ex-guide-list .ex-guide-item ul li .iconfont{color: rgba(173,180,190,1);float: right;padding: 0 15px 0 0;}
</style>