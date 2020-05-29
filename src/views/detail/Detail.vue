<template>
	<div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :params-info="paramsInfo"/>
      <detail-comment-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </scroll>
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
  import GoodsList from "components/content/goods/GoodsList";

  import Scroll from "components/common/scroll/Scroll";

  import {imgLoadMixin} from "common/mixin";

  import {getDetail,Goods,Shop,GoodsParams,getRecommend} from "network/detail";

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
      GoodsList,
      Scroll
    },
    mixins:[imgLoadMixin],
    created() {
		  this.iid = this.$route.params.iid

      this.getDetailData(this.iid)
      this.getRecommendData()
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
        //获取推荐信息
      },
      async getRecommendData(){
		    const result = await getRecommend()
        // console.log(result);
		    this.recommends = result.data.list
      },
      imageLoad(){
		    this.$refs.scroll.refresh()
      },
      contentScroll(position){
        //判断BackTop是否显示
        this.isShowBackTop = position.y < -1000
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
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
