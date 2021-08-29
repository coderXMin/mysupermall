!<template>
  <div class='wrapper' ref="wrapper">
    <div class="content">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
export default {
  name: 'Scroll',
  data(){
    return {
      scroll:null
    }
  },
  props: {
        probeType: {
            type: Number,
            default: 0
        }
  },
  mounted(){
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType
    });
    // .监听滚动的位置
        this.scroll.on('scroll', position => {
            this.$emit('scroll', position);
        });
  },
  methods: {
    scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
    refresh(){
      this.scroll&&this.scroll.refresh();
    }
  }
}
</script>
<style  scoped>


</style>
