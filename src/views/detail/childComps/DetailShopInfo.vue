<template>
    <div class="shop-info">
        <div class="shop-top">
            <img :src="shopInfo.logo" alt="logo">
            <span class="name">{{shopInfo.name}}</span>
        </div>
        <div class="shop-middle">
            <div class="sale-goods">
                <p class="count">{{shopInfo.goodsCount}}</p>
                <p class="text">全部宝贝</p>
            </div>
            <div class="all-counts">
                <p class="count">{{shopInfo.fans}}</p>
                <p class="text">粉丝数</p>
            </div>
            <div class="shop-score">
                <table>
                    <tr v-for="(item, index) in shopInfo.score" :key="index">
                        <td class="name">{{item.name}}</td>
                        <td class="score" :style="item.isBetter&&{color:'red'}">{{item.score}}</td>
                        <td class="cost-per" :style="item.isBetter&&{background:'red'}">{{item.isBetter?"高":"低"}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shop-bottom">
            <p>进店逛逛</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props:{
        shopInfo:{
            type: Object,
            default(){
                return {};
            }
        }
    }
}
</script>

<style scoped>
.shop-info {
    padding: 10px 10px 20px;
    border-bottom: 1px solid rgba(100, 100, 100, .3);
}
.shop-top {
    padding: 6px 10px 10px 4px;
}
.shop-top img{
    width: 60px;
    height: 60px;
    border: 1px solid rgba(100, 100, 100, .1);
    border-radius: 50%;
    margin-right: 8px;
}
.shop-top .name {
    display: inline-block;
    position: relative;
    top: -20px; 
    
}
.shop-middle {
    display: flex;
    justify-content: space-around;
    text-align: center;
    align-items: center;
}
.shop-middle .all-counts {
    padding-right: 8px;
    border-right: 1px solid rgba(100, 100, 100, .5);
}
.shop-middle .shop-score table {
    text-align: center;
    font-size: 12px;
}
.shop-middle .shop-score table tr td {
    padding: 0 4px 0;
}
.shop-middle .shop-score table tr .score {
    color: green;
}
.shop-middle .shop-score table tr .cost-per {
    background: green;
    color: #fff;
}
.shop-bottom {
    padding: 20px 0 8px;
    text-align: center;
}
.shop-bottom p{
    display: inline-block;
    padding: 6px 40px;
    background: rgba(100, 100, 100, .2);
    border-radius: 20px;
}
</style>
