//请求详情页数据
import {request} from "./request";
export function getDetail(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}
export class Goods{
  constructor(itemInfo, columns){
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.lowNowPrice=itemInfo.lowNowPrice;
  }
}

export class Shop{
  constructor(shopInfo){
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods;
  }
}