<template>
    <div class="bottom-bar">
        <div class=" bar-item bottom-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon collect"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="addCart">加入购物车</div>
            <div class="buy">购买</div>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'DetailBottomBar',
    methods: {
        addCart(){
            this.$emit('addCart');
        }
    },
}
</script>

<style scoped>
.bottom-bar {
    height: 58px;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
}
.bar-item {
    flex: 1;
    display: flex;
}
.bar-item>div {
    flex: 1;
    text-align: center;
}
.bar-item .text {
    font-size: 13px;
}
.bar-item .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 3px;
    background: url(~@/assets/img/detail/detail_bottom.png) 0 0/100%;
}
.bar-item .service {
    background-position:0 -52px;
}
.bar-item .shop {
    background-position: 0 -98px;
}
.bar-right {
    margin: 7px ;
    font-size: 15px;
    color: #fff;
    line-height: 47px;
    height: 47px;
}
.bar-right .cart {
    background: #e6802dea;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
}
.bar-right .buy {
    background: rgb(226, 35, 9);
     border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
}

</style>
