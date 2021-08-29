!<template>
  <div class='goods-item' >
    <img :src="goodsItem.show.img" alt="" @load="iamgeLoad" @click="itemclick">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{'￥'+goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
      <slot></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
    }
  },
  methods:{
    iamgeLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemclick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>
<style  scoped>
.goods-item {
    position: relative;
    padding-bottom: 48px;
    width: 48%;
}
.goods-item img{
    width: 100%;
    border-radius: 8px;
    margin-bottom: 24px;
}
.goods-info {
    text-align: center;
    padding: 3px;
    position: absolute;
    bottom: 0px;
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
    background: url('./../../../assets/img/common/collect.svg') 0 0/14px 14px;
}

</style>
