<template>
    <div id="cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <scroll class="content">
        <cart-list :cart-list="cartList" class="cart-list"/>
      </scroll>
      <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";

    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";

    import {mapGetters} from 'vuex'

    export default {
      name: "Cart",
      components:{
        NavBar,
        Scroll,
        CartList,
        CartBottomBar
      },
      computed:{
        ...mapGetters(['cartLength','cartList'])
      }
    }
</script>

<style scoped>
  #cart{
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right:0;
    top:0;
    z-index: 9;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;

    overflow: hidden;
  }
</style>
