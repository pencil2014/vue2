<!-- <template>
	<div class="ex-model">
		<div class="ex-model-backdrop"></div>
		<div class="ex-model-cnt">
			<div class="ex-model-header">
        <h3 class="ex-model-title">{{model.title}}</h3>
      </div>
			<div class="ex-model-body" v-html='model.text'>
      </div>
			<div class="ex-model-foot" @click="hide">确 认</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['model'],
	data () {
		return {

		}
	},
	methods: {
		hide () {
			this.$emit('hideModel')
		}
	}
}
</script>

<style scoped>
.ex-model{position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 7;}
.ex-model-backdrop{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color:rgba(0,0,0,0.2); }
.ex-model-cnt{width: 90%; height: auto; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background-color: #fff; }
.ex-model-title{ height: 2rem; line-height: 2rem; text-align: center; font-size: 1.8rem; padding:1.5rem 0 1rem ;border-bottom: 1px solid #eee; }
.ex-model-body {line-height: 1.5;font-size: 1.4rem; padding: 0 2rem; padding-top: 0.5rem; max-height: 20rem; overflow: scroll;}
.ex-model-foot { border-top: 1px solid #eee; height: 5rem; line-height: 5rem; text-align: center; font-size: 1.8rem; color: #047dcb; margin-top: 1rem;}
.ex-model-foot:active{background-color: #eee;}
</style> -->