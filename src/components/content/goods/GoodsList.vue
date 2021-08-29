!<template>
  <div class='goods-list'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props:{
  },
  data(){
    return {}
  },
  components: {
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style  scoped>
.goods-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}

</style>
