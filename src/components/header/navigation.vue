<template>
  <div>
    <!--下面导航条为模板-->
    <nav class="navbar navbar-default navbar-static-top">
      <!-- container容器，左右留有余地 -->
      <div class="container">
        <div class="navbar-header">
          <!--
              在浏览器的宽度很小时，buttion出现。
              图案为方框内有三道杠。
              data-target="#TaoistsNavBar" 与 div id="TaoistsNavBar" 相对应
              -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#TaoistsNavBar" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <!--
                icon-bar有一个，那个图标就有一道杠。
                这里有三个，那么图标就有三道杠
              -->
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

        <div class="collapse navbar-collapse" id="TaoistsNavBar">
          <ul class="nav navbar-nav">
            <li class="active"><router-link to="/index">博客园</router-link></li>
            <li><router-link to="/notbook">新随笔</router-link></li>
            <li><router-link to="/link">联系</router-link></li>
            <li><router-link to="/describe">订阅</router-link></li>
            <li><router-link to="/management">管理</router-link></li>
          </ul>

          <!-- navbar-right:通过 CSS 设置特定方向的浮动样式。[节选自bootstrap官网]-->
          <form class="navbar-form navbar-right">
            <div class="input-group">
              <input type="search" name="information" class="form-control" placeholder="输入搜索的内容" />
              <span class="input-group-btn">
                            <button class="btn btn-default">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
            </div>
          </form>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'navigation'
  }
</script>

<style scoped>

</style>
