<template>
  <div id="app">
    <!--引入其他组件-->
    <v-header></v-header>
    <v-navigation></v-navigation>
    <v-content></v-content>
    <v-footer></v-footer>
<!--    <router-view/>-->
  </div>
</template>

<script>
  // 引入其他组件，并先在自己组件注册
  import header from './components/header/header';
  import navigation from './components/header/navigation';
  import content from './components/header/content';
  import footer from './components/header/footer';

  export default {
  name: 'App',
  // 注册
  components:{
    'v-header':header,
    'v-navigation':navigation,
    'v-content':content,
    'v-footer':footer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
