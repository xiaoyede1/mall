<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"/>
      <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
        <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"/>
        <recommand-view :recommend="recommend"/>
        <feature-view/>
        <tab-control
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";
    import TabControl from "components/content/tabControl/TabControl"
    import GoodsList from "components/content/goods/GoodsList";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommandView from "./childComps/RecommandView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {imgLoadMixin} from "common/mixin";

    export default {
      name: "Home",
      data(){
        return {
          banner:[],
          recommend:[],
          goods:{
            pop:{page:0,list:[]},
            new:{page:0,list:[]},
            sell:{page:0,list:[]}
          },
          currentType:'pop',
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0,
        }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      components:{
        FeatureView,
        NavBar,
        HomeSwiper,
        RecommandView,
        TabControl,
        GoodsList,
        Scroll,
      },
      mixins:[imgLoadMixin],
      created() {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,100)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        this.$eventBus.$off('itemImageLoad',this.imgRefresh)
      },
      methods:{
        //事件监听方法
        tabClick(index){
          switch (index) {
            case 0 :
              this.currentType = 'pop'
              break
            case 1 :
              this.currentType = 'new'
              break
            case 2 :
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
        contentScroll(position){
          //判断BackTop是否显示
          this.isShowBackTop = position.y < -1000
          //判断吸顶是否显示
          this.isTabFixed = -position.y > this.tabOffsetTop
        },
        loadMore(){
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },

        // 网络请求方法
        async getHomeMultidata(){
           const result = await getHomeMultidata()
           this.banner = result.data.banner.list
           this.recommend = result.data.recommend.list
        },
        async getHomeGoods(type){
          const page = this.goods[type].page + 1
          const result = await getHomeGoods(type,page)
          this.goods[type].list.push(...result.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        }
      }
    }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    /*vh：视口高度*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right:0;
    top:0;
    z-index: 9;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;

    overflow: hidden;
  }
</style>
