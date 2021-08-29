!<template>
  <div class='toLogin'>
      <nav-bar class="nav-bar">
        <div @click="backHomePage" class="back-img" slot="left">
        <img alt="" src="@/assets/img/common/back.svg" />
        </div>
        <div slot="center">登录信息</div>
        </nav-bar>
        <div>
          <table class="table">
            <!-- <caption style="text-align:left;color:#ff8198">请输入信息!</caption> -->
            <tr>
              <td>用户名：</td>
              <td><input type="text" id="username"></td>
            </tr>
           <tr>
              <td>密码：</td>
              <td><input type="password" id="password"></td>
            </tr>
            <tr>
              <td colspan="2" style="text-align:center">
                <button @click="toregister">登录</button>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align:left;padding-bottom:70px">
                <p style="font-size:24px;color:#ff8198">公告！</p>
                <p>登录说明：</p>
                <p>1.用户名为2~6位的字符</p>
                <p>2.密码为6~10位的字符</p>
                <p>3.用户名、密码不能为空</p>
              </td>
            </tr>
          </table>
          
        </div>
        
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
  name: 'ToLogin',
    components:{
     NavBar,
   },
   data(){
      return{
        userInfo:{
          username:'',
          password:'',

        }
      }
   },
  beforeCreate() {
    // 进入详情页隐藏tabBar
     this.$store.commit("setTabbarShow", false);
  },
  
 // 路由离开的时候恢复tabBar
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setTabbarShow", true);
    next();
  },
  methods:{
     backHomePage(){
     this.$router.back();
  },
  toregister(){
    const name=document.getElementById('username').value;
    const word=document.getElementById('password').value;
    if(name&&word){
      if(2<=name.length&&name.length<=6){
        this.userInfo.username=name;
        if(6<=word.length&&word.length<=10){
          this.userInfo.password=word;
          this.ToLogin();
      }else{
        this.$toast.show("请输入6~10位密码！",2000);
      }
      }else{
        this.$toast.show("请输入2~6位用户名！",2000);
      }
    }else{
      this.$toast.show("不能为空",2000);
    }
  },
  ToLogin(){
    this.$store.dispatch('ToLogin',this.userInfo).then(res =>{
        this.$toast.show(res, 2000);
  })
  }
}
}
</script>
<style  scoped>
.toLogin{
  background:#f6f6f6;
   height: 100%;
}
.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
.back-img {
  text-align: center;
}

.back-img img {
  width: 22px;
  margin-top: 11px;
}
.table{
  margin: 100px auto;;
  width: 90%;
  border:1px solid #f6f6f6;
   background:white;
}
.table td{
  text-align:right;
  padding-top: 40px;
}
.table input{
  width: 100%;
  border:0;
  border-bottom: 1px solid #f6f6f6;
}
table button{
  width: 90%;
  height: 30px;
  background:var(--color-high-text);
  border-radius: 12px;
  font-size: 17px;
  color: #fff;
  border: 0;
}
</style>
