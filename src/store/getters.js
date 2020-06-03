export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  totalPrice(state){
    return state.cartList.filter(item => item.checked)
      .reduce((pre,next) => pre+next.price*next.count,0)
      .toFixed(2)
  },
  cartCount(state){
    return state.cartList.filter(item => item.checked)
      .reduce((pre,next) => pre+next.count,0)
  },
  isSelectAll(state){
    if(state.cartList.length === 0)return
    return state.cartList.every(item => item.checked)
  }
}
