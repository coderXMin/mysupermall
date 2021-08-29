!<template>
  <div class='detailnavbar'>
    <nav-bar class="navbar">
      <div slot="left" class="back" @click="backclick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
         <div class="titles-item"
           v-for="(item,index) in titles" :key="index"
           :class="{active:currentIndex==index}"
           @click="itemclick(index)">
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
  name: 'DetailNavBar',
  data(){
    return {
      titles:['商品','参数','评论'],
      currentIndex:0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemclick(index){
      this.currentIndex=index;
      this.$emit('clicknbar',index)
    },
    backclick(){
      this.$router.back();
    }
  }
}
</script>
<style  scoped>
.titles{
  display: flex;
  font-size: 13px;
}
.titles-item{
  flex: 1;
}
.active{
  color:var(--color-high-text);
}
.back{
  margin-top: 5px;
}

</style>
