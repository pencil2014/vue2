<template>
	<div class="ex-batch">
		<HeadTitle :title="modal" @callback="back"></HeadTitle>

		<!-- 弹框 -->
		<div class="ex-batch-model" v-show='showmodel'>
			<div class="ex-batch-model-cnt">
				<div class="ex-batch-model-body">
					<h3>商家批量报单须知</h3>
					<ul>
						<li>1、每次不少于3笔才能批量报单</li>
						<li>2、同一买家在每次批量报单中只可出现一次</li>
						<li>3、每次批量报单最多20笔</li>
						<li>4、每笔消费金额不超过2万</li>
						<li>5、每次让利款总额不超过5万</li>
						<li>6、转款户名一定是实际向公司转账的卡号人名或户名，否则无效</li>
						<li>7、提交后转款，请及时查询自己账户是否转款成功，请耐心等待审核，不需要上传任何凭证，公司以到款为准，T+1即过</li>
						<li>8、转款附言注明:“B*****批量”（如无法注明，请联系客服），转款金额一定与每次让利款总额完全相符（包括小数点后面的），否则无法审核</li>
						<li>9、点击“确认”后，才可进行批量报单</li>
					</ul>
				</div>
				<div class="ex-batch-model-btn">
					确认
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeadTitle from '../common/title.vue'
export default {
	data () {
		return {
			showmodel: true,
			modal:{
				text:'批量报单',
				fixed: false,
			}
		}
	},
	components: {
		HeadTitle,
	},
	methods: {
		back () {
			this.$router.go(-1)
		}
	}
}	
</script>

<style scoped>

.ex-batch-model {position: fixed; left: 0; top: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.2); z-index: 7; overflow: auto;}
.ex-batch-model-cnt {background-color: #fff; width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); padding: 1rem 1rem 0 1rem; border-radius: 0.5rem;}
.ex-batch-model-body { max-height: 35rem; overflow: scroll; }
.ex-batch-model-body h3 { text-align: center;font-size: 1.8rem;  padding: 1.5rem 0;}
.ex-batch-model-body li{ line-height: 1.8; font-size: 1.2rem;}
.ex-batch-model-btn { border-top: 1px solid #eee; margin-top: 1rem; height: 5rem; line-height: 5rem; text-align: center; font-size: 1.8rem; color:#047dcb;  }
</style>