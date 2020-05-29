import {debounce} from "./utils";

import BackTop from "components/content/backTop/BackTop";

export const imgLoadMixin = {
  data(){
    return{
      imgRefresh:null,
      isShowBackTop:false,
    }
  },
  mounted(){
    //图片加载完成的事件监听
    this.imgRefresh = ()=> debounce(this.$refs.scroll.refresh,100)
    this.$eventBus.$on('itemImageLoad',this.imgRefresh)
    console.log('混入内容');
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
  }
}
