export default {
  addToCart({state,commit},payload){
    return new Promise(res =>{
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct){
        commit('addCounter',oldProduct)
        res('当前商品数量+1')
      }else{
        payload.count = 1
        commit('addToCart',payload)
        res('添加新商品成功')
      }
    })
  }
}
