<template>
    <div class="Home">
        <nav-bar class="home-nav">
          <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banner="banner"/>
        <recommand-view :recommend="recommend"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommandView from "./childComps/RecommandView";

    import {getHomeMultidata} from "network/home";

    export default {
      name: "Home",
      data(){
        return {
          banner:[],
          recommend:[]
        }
      },
      components:{
        NavBar,HomeSwiper,RecommandView
      },
      async created() {
        const result = await getHomeMultidata()
        console.log(result);
        this.banner = result.data.banner.list
        this.recommend = result.data.recommend.list
      }
    }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
