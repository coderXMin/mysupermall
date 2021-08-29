<template>
  <div class='Cart'>
    
    <nav-bar class="nar-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
    <cart-list>
      <div v-if="cartList.length">
            <cart-list-item v-for="(item, index) in cartList" :key="index" 
            :goodsItem="item" @cartItemImage="cartItemImage"/>
        </div>
        <div v-else class="empty-cart">
            <p @click="goHome"> 去逛逛~（°ο°）</p>
        </div>
    </cart-list>
    </scroll>
    <cart-bottom-bar class="ba" @refresh="refresh"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from '../../components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'
import CartListItem from './childComps/CartListItem'
export default {
  name: 'Cart',
  data(){
    return {
      cartList:[]
    }
  },
  computed:{
    cartLength(){
      return this.$store.state.cartList.length
    }
  },
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
    CartListItem
  },
  created(){
   // 每次刷新页面获取本地存储购物车数据
    let list = JSON.parse(localStorage.getItem("cartList")) || [];
    if (list) {
      this.$store.commit("setCartList", list);
    }
    this.cartList=list;
  },
  mounted(){
     
  },
  methods: {
     goHome(){
       this.$router.replace('/home');
        },
     cartItemImage(){
       this.$refs.scroll.refresh();
     },
     //提交结算之后重新刷新页面
     refresh(){
       // 每次刷新页面获取本地存储购物车数据
    let list = JSON.parse(localStorage.getItem("cartList")) || [];
    if (list) {
      this.$store.commit("setCartList", list);
    }
    this.cartList=list;
     }
    
  }
}
</script>
<style scoped>
.Cart{
  height: 100vh;
}
.content{
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
.nar-bar{
  background: var(--color-tint);
  color: #fff;
}
.empty-cart {
    padding-top: 50px;
    text-align: center;
}
.empty-cart p{
    margin: 20px auto;
    width: 100%;
}
</style>
