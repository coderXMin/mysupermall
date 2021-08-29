!<template>
  <div class='CategoryList'>
    <scroll class="context" ref="scroll">
    <div v-for="(item,index) in categoryList" :key="index"  >
      <button class="listItem"
      :class="currentIndex==index ? 'active': ''"
      @click="clickItem(index)"
      >
        {{item.title}}
      </button>
    </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue';
export default {
  name: 'CategoryList',
  data(){
    return {
      currentIndex:0
    }
  },
  props:{
    categoryList:{
      type:Array,
      default(){
        return []
      }
    },

  },
  computed:{},
  components: {
    Scroll
  },
  created(){
  },
  mounted(){
  },
  methods: {
    clickItem(index){
      this.currentIndex=index;
      this.$emit('ClickItem',index);
      this.$refs.scroll.refresh();
    },
  }
}
</script>
<style  scoped>
.CategoryList{
  width: 100px;
}
.context{
  position: fixed;
  top: 44px;
  bottom: 49px;
  left: 0;
  overflow: hidden;
  background-color: #f6f6f6;
}
.listItem{
  width: 100%;
  font-size: 14px;
  line-height: 45px;
  width: 100px;
  height: 45px;
  user-select: none;
  text-align: center;
  color: #666666;
  border: 0;
  outline: none;
  background: none;
}
.active{
  font-weight: 700;
  color: #ff5777;
  border-left: 3px solid #ff5777;
  background-color: #ffffff;
}
</style>
