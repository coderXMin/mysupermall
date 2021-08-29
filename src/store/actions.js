import router from "@/router/index"
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //查找数组中是否存在该商品
    let oldProduct =context.state.cartList.find(
      item=>item.iid===payload.iid
    );
    if(oldProduct){
      context.commit('addCounter',oldProduct)
      resolve('购物车该商品+1')
    }else{
      payload.count=1;
      payload.isSelected = false;
      context.commit('addProduct',payload)
      resolve('成功加入购物车')
    }
    })
  },
   // 添加用户
   addUser(context,payload){
    return new Promise((resolve,reject)=>{
    //查找数组中是否存在该用户
  let oldUser =context.state.userInfo.find(
    item=>item.username===payload.username
  );
  if(oldUser){
    resolve('用户已经注册！')
  }else{
    context.commit('addUser',payload)
    resolve("用户注册成功！")
  }
})
},
// 登录验证
ToLogin(context,payload){
  return new Promise((resolve,reject)=>{
  //查找数组中是否存在该用户
  let oldUser =context.state.userInfo.find(
    item=>item.username===payload.username&&item.password===payload.password
  );
  if(oldUser){
    resolve('登录成功！')
    router.push('/Profile');
  }else{
    resolve('用户名或密码错误')
  }
  })
},
}