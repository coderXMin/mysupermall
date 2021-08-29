<template>
  <div class='DetailSwiper'>
    <swiper class="swiperstyle">
       <swiper-item 
       v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
       </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem}from "@/components/common/swiper/index";
export default {
  name: 'DetailSwiper',
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {}
  },
  components: {
    Swiper,
    SwiperItem
   
  }
}
</script>
<style  scoped>
.swiperstyle{
  height: 300px;
  overflow: hidden;
}

</style>
