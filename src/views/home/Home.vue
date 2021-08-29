!<template>
  <div id='Home'>
    <nav-bar class="home-nav">
      <div slot="center" class="centertext">
        <span class="search">搜索一下</span>
        <span class="searchbox"><input type="text" class="Input"></span>
      </div>
    </nav-bar>
    <tab-control ref="tabcontrol1" class="tabControl" v-show="isTabFixed"
    :titles="['流行','新款','精品']" @tabClick="tabClick"/>

    <scroll class="content" 
    :probe-type="3"
    @scroll="contentScroll" 
    ref="scroll">
    <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
    <!-- <feature-view/> -->
    <recommend-view :recommends="recommends"/>
    <tab-control ref="tabcontrol2"
    :titles="['流行','新款','精品']" @tabClick="tabClick"/>
    <goods-list >
          <goods-list-item v-for="(item,index) in goods[currentType].list" :key="index" :goods-item="item">
            <p class="text" @click="clicktext(item.iid)">加入购物车</p>
          </goods-list-item>
    </goods-list>
    </scroll>

  </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll"
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from '../../components/content/goods/GoodsListItem';

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import{getDetail,Goods} from "@/network/detail"

export default {
  name: 'Home',
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:1,list:[]},
        'new':{page:1,list:[]},
        'sell':{page:1,list:[]},
      },
      currentType:'pop',
      taboffsetTop:0,
      isTabFixed:false,
      iid:null,
      topImages:[],
      goodsInfo:{},
    }
  },
  computed:{},
  components: 
  {
    NavBar,
    TabControl,
    GoodsList,

    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    GoodsListItem
    },
  created(){
    //请求多个数据 
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
    //监听goodsitem图片加载完成
    const refresh=this.debounce(this.$refs.scroll.refresh,500)
    this.$bus.$on('itemImageLoad',()=>{
      refresh();
    })

    

  },
  updated(){
    
  },
  methods: {
    // 监听事件
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabcontrol1.currentIndex=index;
      this.$refs.tabcontrol2.currentIndex=index;
    },
    //异步监听goodsitem图片加载完成
    debounce(func,delay){
      let time=null
      return function(arg){
        if(time) clearTimeout(time)
        time=setTimeout(() => {
          func.apply(this,arg)
        }, delay);
      }
    },
    //获取tabcontrol的offsetTop
    swiperImgLoad(){
      this.taboffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
    },
    //决定tabcontrol是否吸顶
    contentScroll(position){
      this.isTabFixed= -(position.y) >this.taboffsetTop;
    },


    // 网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list; // 轮播图
      this.recommends=res.data.recommend.list;//推荐图
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{//商品数据 
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page +=1
    })
    },
    clicktext(id){
      if(this.iid!==id){
        this.iid=id;
        getDetail(this.iid).then(res=>{
        const data =res.result;
        //1.获取顶部轮播图片数据
        this.topImages=data.itemInfo.topImages;
        //获取商品信息
        this.goodsInfo=new Goods(data.itemInfo,data.columns); 
        this.addCart()
        })
      }else{
        this.addCart()
      }
    },
    addCart(){
       //获取商品信息加入购物车
        const obj = {
        image: this.topImages[0],
        title: this.goodsInfo.title,
        desc: this.goodsInfo.desc,
        price: this.goodsInfo.lowNowPrice,
        iid: this.iid
        }
        this.$store.dispatch('addCart',obj).then(res =>{
          this.$toast.show(res, 2000);
        })
    }
        
  }
}
</script>
<style scoped>
#home {
     padding-top: 44px;
     position: relative;
     height: 100vh; 
}
.home-nav {
    background:var(--color-tint) ;
    color: rgb(133, 125, 125)
}
.centertext{
  margin-top: 2px;
}
.search{
   width: 30%;
   background:#f6f6f6;
   font-size: 16px;
   padding-left: 4px;
   border: solid 1.5px #f6f6f6;
   border-top-left-radius: 10px;
   border-bottom-left-radius: 10px;
}
.searchbox{
  display: inline-block;
  width: 70%;
}
.searchbox .Input{
   width: 100%;
   height:22.5px ;
   border-top: 0px ;
   border-bottom: 0px ;
   border-right: 0px ;
   border-left:solid 1px rgb(133, 125, 125) ;
   border-top-right-radius: 10px;
   border-bottom-right-radius: 10px;
}
.content{
  position:absolute; 
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  
  overflow: hidden;
}
.tabControl{
  position: relative;
  z-index: 9;
}
.goods-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}
.text{
  background:var(--color-high-text);
  width: 80%;
  margin-left: 10%;
  border-radius: 12px;
  font-size: 17px;
  color: #fff;
}
</style>
