<template>
  <div>
    <!--获取父组件传递的值-->
    <h2>我是子组件，{{title}} --- {{homemsg}}</h2>
    <!--执行父组件方法-->
    <button @click="run('123')"> 执行父组件方法</button>
    <hr>
    <button @click="getParent()">获取父组件数据和方法</button>
    <hr>
    <button @click="getParent().data">主动获取父组件数据和方法</button>
  </div>
</template>

<script>
export default {
  name: 'son',
  //定义props，存储父组件传递的值,必须和标签对应
  //    <v-son :title='title' :homemsg='msg' :run='run' :home='this'></v-son>
  props:{
    'title':String,
    'homemsg':String,
    'run':Function,
    'home':Object
  },
  data(){
    return{
      msg:'子组件msg'
    }
  }
}
</script>

<style scoped>

</style>
