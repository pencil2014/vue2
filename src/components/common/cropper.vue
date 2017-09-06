<template>
	<div class="wrapper">
		<div class="ex-modal-header">
			<span class="a"><i class="iconfont">&#xe605;</i>返回</span>
			<span class="b" @click="confirm">使用</span>
		</div>
		<div class="imageBox" ref="imageBox" :style="imageBoxStyle" @touchstart="start" @touchmove="move" @touchend="end">
	        <div class="thumbBox" ref="thumbBox"></div>
	    </div>
	</div>
</template>
<script>
export default{	
	props: ['src'],
	data () {
		return {
			imgSrc: this.src,
			ratio: 1,
			imageBoxStyle: '',
			state: {
				dragable: false,
				mouseX: 0,
				mouseY: 0
			},
			image: new Image()
		}
	},
	watch: {
		src (to,from){
			if(this.src){
				this.setBackground()
			}	
		}
	},
	created () {

	},
	methods: {
		confirm () {
			let imageBox = this.$refs.imageBox
			let thumbBox = this.$refs.thumbBox
			let width = thumbBox.clientWidth,
				height = thumbBox.clientHeight,
				canvas = document.createElement("canvas"),
				dim = imageBox.style.backgroundPosition.split(' '),
				size = imageBox.style.backgroundSize.split(' '),
				dx = parseInt(dim[0], 10) - imageBox.clientWidth/2 + width/2,
				dy = parseInt(dim[1], 10) - imageBox.clientHeight/2 + height/2,
				dw = parseInt(size[0], 10),
				dh = parseInt(size[1], 10),
				sh = parseInt(this.image.height, 10),
				sw = parseInt(this.image.width, 10);
			canvas.width = width
			canvas.height = height
			let context = canvas.getContext("2d")
			context.drawImage(this.image ,0 ,0 ,sw ,sh ,dx ,dy ,dw ,dh);
			let imageData = canvas.toDataURL('image/png');
			this.$emit('confirm',imageData)
		},
		setBackground () {
			let _this = this
			let imageBox = this.$refs.imageBox
			this.image.src = this.src
			this.image.onload = function () {
				let w = parseInt(this.width, 10)*_this.ratio
				let h = parseInt(this.height, 10)*_this.ratio
				let pw = (imageBox.clientWidth - w)/2
				let ph = (imageBox.clientHeight - h)/2
				_this.imageBoxStyle = {
					'background-image': 'url('+ _this.image.src +')',
					'background-size': w + 'px' +' ' + h +'px',
					'background-position': pw + 'px' + ' ' + ph + 'px',
					'background-repeat': 'no-repeat'
				}
			}
		},
		start (e) {
			let ele = e.changedTouches[0]
			this.state.mouseX = ele.clientX
			this.state.mouseY = ele.clientY
			this.state.dragable = true
		},
		move (e) {
			let ele = e.changedTouches[0]
			let imageBox = this.$refs.imageBox
			if(this.state.dragable){
				let x = ele.clientX - this.state.mouseX
				let y = ele.clientY - this.state.mouseY
				let bg = imageBox.style.backgroundPosition.split(' ')
				let bgX = x + parseInt(bg[0], 10)
				let bgY = y + parseInt(bg[1], 10)
				this.imageBoxStyle['background-position'] = bgX + 'px' + ' ' + bgY + 'px'
				this.state.mouseX = ele.clientX
				this.state.mouseY = ele.clientY
			}
		},
		end (e){
			this.state.dragable = false
		}
	}
}
</script>
<style scoped>
*{box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
.wrapper{width: 100%;height: 100%;position: fixed;z-index: 999;top: 0px;left: 0px;}
.ex-modal-header{background: #fff;position: fixed;top: 0px;left: 0;z-index: 999;width: 100%;height: 4.5rem;line-height: 4.5rem;font-size: 1.6rem;}
.ex-modal-header span{display: inline-block;}
.ex-modal-header .a i{font-size: 2rem;}
.ex-modal-header .b{float: right;background: #047dcb;color: #fff;padding: 0 1rem;height: 2.5rem;line-height: 2.5rem;margin: 1rem 0.5rem 0 0;border-radius: 3px;font-size: 1.2rem;}
.ex-modal-header .b:active{background: #0470b6;}

.imageBox{position: relative; height: 100%; width: 100%; border:1px solid #aaa; background-color: #000; overflow: hidden; background-repeat: no-repeat; cursor:move;}
.imageBox .thumbBox{box-sizing: border-box; border: 1px solid rgb(102, 102, 102); box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5); background: none repeat scroll 0% 0% transparent;position: absolute;left: 50%;top: 50%;width: 200px;height: 200px;margin-top: -100px;margin-left: -100px;}
.imageBox .spinner{position: absolute; top: 0; left: 0; bottom: 0; right: 0; text-align: center; line-height: 400px; background: rgba(0,0,0,0.7);}
</style>
