<template>
  <div>
    <!--使用子组件标签，并定义变量-->
    <v-son :title='title' :homemsg='msg' :run='run' :home='this'></v-son>
  </div>
</template>

<script>
import son from './son'
export default {
  name: 'father',
  //子组件注册到父组件
  components:{
    'v-son':son
  },
  data () {
    return { //父组件值传给子组件值
      title:'111',
      msg:'我是home组件'
    }
  },
  methods: {
    run(data){
      alert('我是home组件的run方法'+data)
    }
  }
}
</script>

<style scoped>

</style>
