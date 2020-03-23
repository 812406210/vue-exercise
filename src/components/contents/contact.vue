<template>
  <div class="safetyInfo">
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />

    <strong>用户名：</strong><input type="text" name="" id="username" placeholder="用户名" v-model="username"/>
    <strong>性别：</strong>
    <select v-model="sex" style="width: 80px;height: 25px">
      <option value="1">男</option>
      <option value="0">女</option>
    </select>
<!--    <input type="text" name="" id="sex" placeholder="性别" v-model="sex"/>-->
    <button @click="btnSearch" class="btn btn-default">搜索</button> <!--@click="btn"这部分为vue语法-->
    <hr/>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>编号</th>
        <th>用户名</th>
        <th>电话</th>
        <th>年龄</th>
        <th>性别</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in searchData" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.phoneNumber}}</td>
        <td>{{item.age}}</td>
        <td>{{item.sex}}</td>
        <td>
          <a href="" @click.prevent="del(item.id)">删除</a>
          <!-- 按钮触发模态框 -->
          <a href="" data-toggle="modal" data-target="#addModal">添加</a>
          <!-- 模态框（Modal） -->
          <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="myModalLabel">新增联系人</h4>
                </div>
                <div class="modal-body">
                  用户名:<input type="text" value="用户名" v-model="newUserName">
                  电话:<input type="text" value="电话" v-model="newphoneNumber">
                  <br/>
                  <br/>
                  年龄:<input type="text" value="年龄" v-model="newAge">
                  性别:<input type="text" value="性别" v-model="newSex">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="add">提交</button>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>

          <!-- 按钮触发模态框 -->
          <a href="" data-toggle="modal" data-target="#lookModal" @click.prevent="getName(item.userName)">详情</a>
          <!-- 模态框（Modal） -->
          <div class="modal fade" id="lookModal" tabindex="-1" role="dialog" aria-labelledby="lookModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="lookModalLabel">{{clickUserName}}个人介绍</h4>
                </div>
                <div class="modal-body">
                    <h1>
                      <p>给你来一个大的个人介绍...</p>
                      <div v-if="imgSrc">
                        <img :src="imgSrc" style="width: 80px;height: 80px">
                      </div>
                    </h1>
                  <input type="file" id="people-export" ref="inputer" @change="fileUpload($event)"  accept="image/jpg, image/jpeg, image/png"/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" >提交</button>
                </div>
              </div><!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>

        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const STORAGE_KEY = 'todos-vuejs'//定义常量保存键值

export default {
  name: 'contact',
  data () {
    return {
      clickUserName:'',
      picture:{},
      imgSrc:'',
      newUserName:'',
      newphoneNumber:'',
      newAge:'',
      newSex:'',
      newPassword:'password',
      username:'',
      sex:'',
      searchData: [{id:1,userName:'yang',age:12,sex:'男',phoneNumber:'1111'}],
      products:[
      ],
    }
  },
  created(){
    this.getAllUser()
  },
  //勾子
  methods: {
    //获取浏览器缓存数据
    fetch(){
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY)|| '[]');
    },
    //将数据保存到浏览器中
    save(items){
      window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
    },
    getName(name){
      this.clickUserName = name;
      this.imgSrc = this.fetch();
    },

    fileUpload(event){
      let files =  event.target.files[0];
      //转码base64
      let reader = new FileReader();
      let imgFile;
      reader.readAsDataURL(files);
      reader.onload =  e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
        this.imgSrc='data:image/png;base64,'+arr[1]
        this.save(this.imgSrc)
      }
      this.fileUploadExtend(event)
    },

    fileUploadExtend(event){
      console.log("上传的开始")
      this.picture = event.target.files[0]; //获取数据
      var formData = new FormData();
      console.log("上传的内容："+this.picture)
      formData.append("file", this.picture);
      this.$http.post("http://132.232.44.82:8081/upload", formData,{
          headers: { "Content-Type": "multipart/form-data" }
        }).then(result=>{
          console.log(result.body)
        if(result.body.code === 200){
          console.log("地址为："+result.body.data)
            //this.imgSrc = this.picture
        }else{
          console.log("上传失败")
        }
      })
    },

    add(){
      this.$http.post('http://132.232.44.82:8081/add',{
        userName:this.newUserName,
        phoneNumber:this.newphoneNumber,
        age:this.newAge,
        sex:this.newSex,
        password:this.newPassword
      }).then(result=>{
        this.getAllUser()
        console.log(result.body)
      })
    }
    ,
    del(id){
      this.$http.get("http://132.232.44.82:8081/delById",{params:{id:id}}).then(result=>{
        console.log(result.body)
        this.getAllUser()
      })
    },
    btnSearch(){
      console.log("前aaa"+this.username+"ss"+this.sex)
      if(this.username !='' || this.sex != '') {
        console.log("后aaa"+this.username+"ss"+this.sex)
        this.$http.post('http://132.232.44.82:8081/getUserByParam', {
          userName: this.username,
          sex: this.sex
        }).then(result => {
          if (result.body.code === 200) {
            console.log(result.body.data.user)
            this.searchData = [result.body.data.user]
            this.username =''
            this.sex = ''
          } else {
            console.log("查询失败")
          }
        })
      }else {
        console.log("无参搜索")
        this.getAllUser()
      }
    },
    getAllUser(){
      this.$http.get('http://132.232.44.82:8081/getUser').then(result=>{
        console.log(result.body)
        if(result.body.code === 200){
          this.searchData = result.body.data.user
        }else {
          alert("查询失败，400")
        }
      })
    }

  }


}
</script>
