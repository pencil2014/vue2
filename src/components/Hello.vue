<template>
  <div id="map">
    
  </div>
</template>

<script>
import { mapState,  mapActions } from 'vuex'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      BMap: ''
    }
  },
  computed: {
    ...mapState([
      'totalTime'
    ])
  },
  methods: {
    ...mapActions([
      'addTotalTime',
      'decTotalTime'
    ]),
    add () {
      this.addTotalTime(10)
    },
    initialize() {  
      var mp = new BMap.Map('map');  
      mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);  
    },
    loadScript() {  
      var script = document.createElement("script");  
      script.src = "http://api.map.baidu.com/api?v=2.0&ak=d6mxIkQnNeHgNzBQjBCZ9jdV1e49t2iF&callback=initialize";
      document.body.appendChild(script)
      this.BMap = window.BMap
      this.initialize() 
    }  
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当钩子执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
      vm.msg = 'this is so happy !'
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // 这个 leave 钩子通常用来禁止用户在还未保存修改前突然离开。可以通过 next(false) 来取消导航。
  },
  mounted () {
    window.onload = this.loadScript()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
