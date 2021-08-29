<template>
  <div class="login">
    <div class="user-pic">
      <img src="@/assets/img/profile/user.png" class="user-pic-img" />
    </div>
    <div class="user-info">
      <p v-if="this.userInfo">欢迎：{{this.userInfo.username}}</p>
      <p v-else>
        <span @click="ToLogin">登录</span>/
        <span @click="ToRegister">注册</span></p>
      <div class="phone-num">
        <img alt="" class="icon-phone" src="@/assets/img/profile/phone.png" />
        <p v-if="this.userInfo">{{this.userInfo.phone}}</p>
        <p v-else>暂未绑定手机号</p>
      </div>
    </div>
    <div class="profile-arrow-right">
      <img alt="" src="@/assets/img/profile/arrow_right.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userInfo:{},
    };
  },
  methods:{
    ToLogin(){
      this.$router.push('/toLogin')
    },
    ToRegister(){
       this.$router.push('/register')
    }
  },
  created(){
    // 每次刷新页面获取本地存用户数据
    let list = JSON.parse(localStorage.getItem("userInfo")) || [];
    if (list) {
      this.$store.commit("setUserInfo", list);
       // 获取用户信息
      this.userInfo=list[0];
    }
  },
}
</script>

<style scoped>
.login {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 20px;
  background-color: #ff8198;
}

.user-pic {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
}

.user-pic .user-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}

.user-info {
  font-size: 16px;
  margin-left: 20px;
  color: white;
}

.user-info p:last-child {
  margin-left: 3px;
}

.user-info .phone-num {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.icon-phone {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.profile-arrow-right {
  position: absolute;
  right: 10px;
  width: 20px;
  height: 20px;
}

.profile-arrow-right img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>
