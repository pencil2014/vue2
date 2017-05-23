<template>
<div>
	<input type="text" name="" id="" v-model='keyword' @change='getPoint'>
	<baidu-map class="bm-view" ak="d6mxIkQnNeHgNzBQjBCZ9jdV1e49t2iF" :center="center" :zoom="18" :dragging="false">
		<bm-marker :position="center" :dragging="false">
    </bm-marker>
  </baidu-map>
  </div>
</template>

	

</template>

<script>
import {BaiduMap,BmMarker} from 'vue-baidu-map'
export default {
	data () {
    return {
      center: {
      	lng: '113.950723',
      	lat: '22.558888'
      },
      keyword: '深圳南山'
    }
  },
  components: {
    BaiduMap,
    BmMarker
  },
  methods: {
  	getPoint () {
  		let _this = this
  		let myGeo = new BMap.Geocoder()
  		myGeo.getPoint(this.keyword, function(point){
				if (point) {
					_this.center = point
				}
			})
  	}
  }
}
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 300px;
}
.map {
	 width: 100%; height: 100%;
}
</style>