<template>

  <div >
    <h2>echarts练习</h2>

    <div style="width:500px;height:500px" ref="chart" class="center-block"></div>
  </div>
</template>
<script src="https://cdn.staticfile.org/vue-resource/1.5.1/vue-resource.js"></script>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      drawLine() {
        console.log("请求开始......")
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.chart);
        //无参的get请求
        console.log("this---->"+ this.$http)
        this.$http.get('http://127.0.0.1:8081/get').then((res) => {
          console.log("获取的数据为："+res.body)
          // 绘制图表
          myChart.setOption({
            title: {text: res.data.title},
            tooltip: {},
            xAxis: {
              data: ["1","2"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [1,3,5]
            }]
          });
        }).catch(function (err) {
            console.log(err);
          })
      }
    },
    mounted(){
      this.drawLine();
    }
  }
</script>

<style scoped>

</style>
