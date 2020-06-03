<template>
	<div id="detail">
    <detail-nav-bar @titleClick="titleClick" :current-index="currentIndex"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :params-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import GoodsList from "components/content/goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  import {imgLoadMixin} from "common/mixin";

  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from "network/detail";
  import {debounce} from "common/utils";

	export default {
		name: "Detail",
    data(){
		  return {
		    iid : null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramsInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0
      }
    },
    components:{
		  DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
    },
    mixins:[imgLoadMixin],
    created() {
		  this.iid = this.$route.params.iid

      this.getDetailData(this.iid)
      this.getRecommendData()

      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      })
    },
    destroyed() {
      this.$eventBus.$off('itemImageLoad',this.imgRefresh)
    },
    methods:{
		  async getDetailData(iid){
		    const result = (await getDetail(iid)).result
        // console.log(result);
        //获取顶部图片轮播数据
        this.topImages = result.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(result.itemInfo,result.columns,result.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(result.shopInfo)
        //获取详细信息
        this.detailInfo = result.detailInfo
        //获取参数信息
        this.paramsInfo = new GoodsParams(result.itemParams.info,result.itemParams.rule)
        //获取评论信息
        this.commentInfo = result.rate.cRate >0 ? result.rate.list[0] : {}

      },
      async getRecommendData(){
		    const result = await getRecommend()
        //获取推荐信息
		    this.recommends = result.data.list
      },
      imageLoad(){
		    this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      contentScroll(position){
		    const positionY = -position.y
        //判断BackTop是否显示
        this.isShowBackTop =  positionY > 1000
        //滚动标题切换
        this.themeTopYs.forEach((item,index)=>{
          if(this.currentIndex === index)return
          if(positionY >= item){
            this.currentIndex = index
          }
        })

      },
      titleClick(index){
		    this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      async addToCart(){
		    const product = {}
		    product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

		    const result = await this.$store.dispatch('addToCart',product)
        this.$toast.show(result)
      },
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
</style>
