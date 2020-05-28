<template>
	<div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
	</div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";


  import {getDetail} from "network/detail";

	export default {
		name: "Detail",
    data(){
		  return {
		    iid : null,
        topImages:[]
      }
    },
    components:{
		  DetailNavBar,DetailSwiper
    },
    created() {
		  this.iid = this.$route.params.iid

      this.getDetailData(this.iid)
    },
    methods:{
		  async getDetailData(iid){
		    const result = await getDetail(iid)
        console.log(result);
        //获取顶部图片轮播数据
        this.topImages = result.result.itemInfo.topImages

      }
    }
  }
</script>

<style scoped>

</style>
