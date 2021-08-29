<template>
    <div class="bottom-bar">
        <div class="check">
           <check-goods-btn :isSelected="isSelectAllGoods" @click.native="handleSelectAllGoods"/>
            <span>全选</span>
        </div>
        <div class="all-price">合计：￥{{totalPrice}}</div>
        <div class="settle-accounts" @click="handleAccounts">去结算（{{totalNum}}）</div>
    </div>
</template>

<script>
import CheckGoodsBtn from '@/components/common/checkGoodsBtn/CheckGoodsBtn';

export default {
    name: 'CartBottomBar',
    components: {
        CheckGoodsBtn
    },
     computed: {
         isSelectAllGoods(){
            if(this.$store.state.cartList.length && this.$store.state.cartList.every(item=>item.isSelected)){
                    return true;
                }
                return false;
        },
        totalPrice(){
           return this.$store.state.cartList.filter(item=>item.isSelected)
                                .reduce((prev,curr)=>{
                                    return prev + curr.price * curr.count;
                                }, 0).toFixed(2);
        },
        totalNum(){
            return this.$store.state.cartList.filter(item=>item.isSelected)
                                .reduce((prev,curr)=>{
                                    return prev + curr.count;
                                }, 0);
        }
    },
    methods: {
        handleSelectAllGoods(){
           if(this.isSelectAllGoods){
               this.$store.state.cartList.map(item => item.isSelected = false);
           }else {
               this.$store.state.cartList.map(item => item.isSelected = true);
           }
        },
        handleAccounts(){
            if(this.totalNum==0){
              this.$toast.show('请选择商品结算', 2000);
            }else{
            this.$toast.show('结算成功！', 2000)
            // 提交数据清空对应购物车数据
            this.$store.commit("clearCartList");
            this.$emit('refresh');
        }
           
        }
    },
    created(){
    }
}
</script>

<style scoped>
.bottom-bar {
    height: 40px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    text-align: center;
    background: #f6f6f6;
}
.bottom-bar .check{
    width: 70px;
    display: flex;
}
.bottom-bar .check span {
    margin-left: 8px;
}
.bottom-bar .all-price{
    flex: 1;
}
.bottom-bar .settle-accounts {
    width: 120px;
    height: 100%;
    line-height: 40px;
    color: #fff;
    background: red;
}
</style>
