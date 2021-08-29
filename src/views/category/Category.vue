<template>
  <div class='Category'>
    <nav-bar class="navbar">
      <div slot="center">分类</div>
    </nav-bar>
      <category-list :categoryList="categoryList" @ClickItem="ClickItem"/>
      <scroll class="context" ref="scroll">
      <sub-category :subCategory="subCategory"/>
      <tab-control :titles="['推荐']" class="tabControl"/>
      <goods-list >
          <div class='goods-item' v-for="(item,index) in categoryDetail" :key="index" >
             <img :src="item.img" alt="" @load="goodImgLoad" @click="goodClick(item.iid)">
             <div class="goods-info">
               <p>{{item.title}}</p>
               <span class="price">{{'￥'+item.price}}</span>
               <span class="collect">{{item.cfav}}</span>
             </div>
          </div>
    </goods-list>
      </scroll>
   

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import GoodsList from "@/components/content/goods/GoodsList";
import GoodsListItem from '../../components/content/goods/GoodsListItem';
import {getCategory,getSubCategory,getCategoryDetail} from '@/network/category'
import CategoryList from './childComps/CategoryList'
import SubCategory from './childComps/SubCategory'
import Scroll from '../../components/common/scroll/Scroll.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue';
export default {
  name: 'Category',
  data(){
    return {
      categoryList:[],
      subCategory:[],
      categoryDetail:[],
      currentIndex:0
    }
  },
  computed:{},
  components: {
    NavBar,
    CategoryList,
    SubCategory,
    Scroll,
    GoodsListItem,
    GoodsList,
    TabControl
  },
  created(){
   getCategory().then(res=>{
     this.categoryList=res.data.category.list;
     this.getSubCategory(this.categoryList[this.currentIndex].maitKey);
     this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey,'pop');
   });
  },
  mounted(){},
  methods: {
    ClickItem(index){
      this.$refs.scroll.scrollTo(0,0);
      this.getSubCategory(this.categoryList[index].maitKey);
      this.getCategoryDetail(this.categoryList[index].miniWallkey,'pop');
    },
    getSubCategory(maitKey){
      getSubCategory(maitKey).then(res=>{
        this.subCategory=res.data.list;
      });
    },
    getCategoryDetail(miniWallkey,type){
      getCategoryDetail(miniWallkey,type).then(res=>{
        this.categoryDetail=res;
      })
    },
    goodClick(iid){
      this.$router.push('/detail/'+iid)
    },
    goodImgLoad(){
      this.$refs.scroll.refresh();
    }
  }
}
</script>
<style scoped>
.navbar{
  background:var(--color-tint) ;
    color:#fff
}
.context{
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
.tabControl{
  border-top:1px solid rgba(139, 136, 145, 0.281);
  box-shadow: 0 -1px 10px rgba(100,100,100,.3);
}
.goods-item {
    position: relative;
    padding-bottom: 27px;
    width: 48%;
}
.goods-item img{
    width: 100%;
    border-radius: 8px;
    margin-bottom: 24px;
}
.goods-info {
    text-align: center;
    position: absolute;
    bottom: 15px;
    left:0;
    right: 0;
    overflow: hidden;
    font-size: 14px;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 24px;
}
.goods-info .collect {
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
    width: 14px;
    height: 14px;
    background: url('./../../assets/img/common/collect.svg') 0 0/14px 14px;
}
</style>
