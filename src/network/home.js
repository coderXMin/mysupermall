import {request} from "./request";
// 首页请求数据接口
export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
  })
}
export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }

  })
}