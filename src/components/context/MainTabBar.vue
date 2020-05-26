<template>
    <div class="MainTabBar">
      <tabbar>
        <tabbar-item path="/home">
          <img slot="item-icon" src="~assets/images/tabbar/home.svg" alt="">
          <img slot="item-icon-active" src="~assets/images/tabbar/home_active.svg" alt="">
          <p slot="item-text">首页</p>
        </tabbar-item>
        <tabbar-item path="/category">
          <img slot="item-icon" src="~assets/images/tabbar/category.svg" alt="">
          <img slot="item-icon-active" src="~assets/images/tabbar/category_active.svg" alt="">
          <p slot="item-text">分类</p>
        </tabbar-item>
        <tabbar-item path="/cart">
          <img slot="item-icon" src="~assets/images/tabbar/shopcart.svg" alt="">
          <img slot="item-icon-active" src="~assets/images/tabbar/shopcart_active.svg" alt="">
          <p slot="item-text">购物车</p>
        </tabbar-item>
        <tabbar-item path="/profile">
          <img slot="item-icon" src="~assets/images/tabbar/profile.svg" alt="">
          <img slot="item-icon-active" src="~assets/images/tabbar/profile_active.svg" alt="">
          <p slot="item-text">我的</p>
        </tabbar-item>
      </tabbar>
    </div>
</template>

<script>

  import Tabbar from "../common/tabbar/Tabbar";
  import TabbarItem from "../common/tabbar/TabbarItem";

  export default {
      name: "MainTabBar",
      components:{
          Tabbar,TabbarItem
      }
  }
</script>

<style scoped>

</style>
