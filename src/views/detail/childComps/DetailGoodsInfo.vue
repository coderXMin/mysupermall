<template>
    <div class="goods-info"  v-if="Object.keys(goodsInfo).length !== 0">
        <div class="info-desc">
            <div class="desc">{{goodsInfo.desc}}</div>
        </div>
        <div class="info-list">
            <img 
               v-for="(item, index) in goodsInfo.detailImage[0].list" 
               :key="index" 
               :src="item" 
               alt="goods-img" 
               @load="goodsInfoImgLoad">
        </div>
        <div></div>
    </div>
</template>

<script>
export default {
    name: 'DetailGoodsInfo',
    data() {
        return {
            imgLength: 0,
        }
    },
    props: {
        goodsInfo:{
            type: Object,
            default(){
                return {};
            }
        }
    },
    methods: {
        goodsInfoImgLoad(){
            this.imgLength ++ ;
            if(this.imgLength === this.goodsInfo.detailImage[0].list.length ){
                this.$emit("goodsInfoImgLoad");
            }
        }
    },
}
</script>
<style scoped>
.goods-info {
    padding: 30px 8px 0;
    border-bottom: solid 1px rgba(100, 100, 100, .1);
}
.info-desc {
    padding: 0 8px 0 ;
    font-size: 14px;
    color: rgb(172, 45, 45);
}
.info-desc .desc {
    text-indent: 2em;
    padding-bottom: 12px;
}
.info-list img{
    width: 100%;
}

</style>
