export default {
  addCounter(state,payload){
    payload.count ++
  },
  addToCart(state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  checkedChange(state,index){
    state.cartList[index].checked = !state.cartList[index].checked
  },
  selectAllClick(state) {
    if(state.cartList.every(item => item.checked)){
      state.cartList.forEach(item => item.checked = false)
    }else{
      state.cartList.forEach(item => item.checked = true)
    }
  }
}
