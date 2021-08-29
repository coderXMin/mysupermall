!<template>
  <div class='detail'>
    <detail-nav-bar class="Dnavbar" @clicknbar="clicknbar" ref="nav"/>
    <scroll class="content" 
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll">
    <detail-swiper :top-images="topImages" class="Dswiper"/>
    <detail-base-info :base-info="goods"/>
    <detail-shop-info :shop-info="shop"/>
    <detail-goods-info :goods-info="detailInfo" @goodsInfoImgLoad="goodsInfoImgLoad"/>
    <detail-goods-params ref="params" :goods-params="goodsParams"/>
    <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
    </scroll>

    <detail-bottom-bar @addCart="addCart"/>
    
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailGoodsParams from './childComps/DetailGoodsParams'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import{getDetail,Goods,Shop} from "@/network/detail"






export default {
  name: 'Detail',
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      goodsParams:{},
      commentInfo:{},
      themeTopYs:[0],
      currentIndex:0
    }
  },
  computed:{},
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    DetailBottomBar
  },
  created(){
   this.iid=this.$route.params.iid;
   //根据iid请求数据
   getDetail(this.iid).then(res=>{
     const data =res.result;
     //1.获取顶部轮播图片数据
     this.topImages=data.itemInfo.topImages;
     //获取商品信息
     this.goods=new Goods(data.itemInfo,data.columns);
     //获取店铺信息
     this.shop=new Shop(data.shopInfo);
     //获取商品详情数据
     this.detailInfo=data.detailInfo;
     // 获取商品参数信息
     this.goodsParams = data.itemParams;
     //获取评论信息
     this.commentInfo = data.rate.list[0];


   })

  },
  mounted(){

  },
  methods: {
    //监听goodsInfo图片加载完成
    goodsInfoImgLoad(){
      // 需要在商品详情图片加载完成再获取各个部分的offsetTop
      this.themeTopYs.push(this.$refs.params.$el.offsetTop,this.$refs.comment.$el.offsetTop);
      this.$refs.scroll.refresh();
    },
    clicknbar(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    //监听滚动位置改变navbar
    contentScroll(position){
      let positionY = -position.y;
        for(let i = 0; i< this.themeTopYs.length; i++){
          if(this.currentIndex!==i && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
            }
        }
       
    },
    
    addCart(){//获取商品信息加入购物车
      const obj = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        iid: this.iid
      }
      this.$store.dispatch('addCart',obj).then(res =>{
        this.$toast.show(res, 2000);
      })
    },
  }
}
</script>
<style  scoped>
.detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content{
  position:absolute; 
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  
  overflow: hidden;
}
</style>
