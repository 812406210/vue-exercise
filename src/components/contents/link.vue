<template>
  <div class="safetyInfo">
    <strong>用户名：</strong><input type="text" name="" id="username" placeholder="用户名" v-model="username"/>
    <strong>性别：</strong>
    <select v-model="sex">
      <option>1</option>
      <option>0</option>
    </select>
<!--    <input type="text" name="" id="sex" placeholder="性别" v-model="sex"/>-->
    <button @click="btn" class="btn btn-default">搜索</button> <!--@click="btn"这部分为vue语法-->
    <button @click="btn_cl" class="btn btn-default">清空</button> <!--@click="btn"这部分为vue语法-->
    <hr/>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>编号</th>
        <th>用户名</th>
        <th>电话</th>
        <th>年龄</th>
        <th>性别</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in searchData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.phoneNumber}}</td>
        <td>{{item.age}}</td>
        <td>{{item.sex}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'link',
  data () {
    return {
      username:'',
      sex:'',
      searchData: [],
      products:[
      ],
    }
  },
  //勾子
  methods:{
    btn_cl:function(){
      this.username = '';//用户名
      this.sex = '';//性别
    },
    btn:function(){
      var username = this.username;//用户名
      var sex = this.sex;//性别
      console.log(username)
      if( username != '' || sex != '' ) {
        console.log("带参搜索")
        this.$http.post('http://127.0.0.1:8081/getUserByParam',
          {
            userName: this.username,
            sex:this.sex
          }).then((response) => {
          this.products = [response.body.user]
          console.log(this.products)
          if(this.products[0]==null ) {alert("没有对应的数据")}
          console.log(this.products)
          if (true) {
            this.searchData = this.products.filter(function (product) {
              console.log(product)
              return Object.keys(product).some(function (key) {
                console.log(key)
                return String(product[key]).toLowerCase().indexOf(username) > -1
              })
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      }else {
        this.$http.get('http://127.0.0.1:8081/getUser').then((response) => {
          console.log("无参搜索")
          this.products = response.body.user
          if (true) {
            console.log(this.products)
            this.searchData = this.products.filter(function (product) {
              console.log(product)
              return Object.keys(product).some(function (key) {
                console.log(key)
                return String(product[key]).toLowerCase().indexOf(username) > -1
              })
            })
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  }
}
</script>
