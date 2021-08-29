export default{
   // 设置tabBar显示和隐藏
   setTabbarShow(state, bol) {
    state.tabBarShow = bol;
  },
  addCounter(state,payload){
    payload.count++;
    localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },
  addProduct(state,payload){
    state.cartList.push(payload)
    localStorage.setItem("cartList", JSON.stringify(state.cartList));
  },
  // 清空购物车
clearCartList(state) {
    // 判断选中哪些数据,过滤没选中的数组返回一个新数组即可
    let result = state.cartList.filter(item => item.isSelected !== true);
    if (result.length === 0) {
      localStorage.removeItem("cartList");
      state.cartList = [];
    } else {
      state.cartList = result;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }
  },
  // 给购物车赋值本地存储
  setCartList(state, data) {
    state.cartList = data;
  },
  //给用户信息复制本地存储
  setUserInfo(state,data){
  state.userInfo=data;
},
  // 添加用户
  addUser(state,payload){
    state.userInfo.push(payload);
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  },
}