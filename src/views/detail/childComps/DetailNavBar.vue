<template>
	<div>
		<nav-bar class="detail-nav">
      <div slot="left" class="back">
        <img src="~assets/images/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:index === currentIndex}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
	</div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

	export default {
		name: "DetailNavBar",
    props:{
		  currentIndex:{
		    type:Number,
        default:0
      },
      titles:{
		    type: Array,
        default(){
		      return ['商品','参数','评论','推荐']
        }
      }
    },
    // data(){
		//   return{
    //     titleIndex: this.currentIndex
    //   }
    // },
    components:{
		  NavBar
    },
    methods:{
		  titleClick(index){
        this.$emit('titleClick',index)
      },
      backClick(){
		    this.$router.back()
      }
    }
	}
</script>

<style scoped>
  .detail-nav {
    background-color: #fff;
    font-weight: normal;

    position: fixed;
    left: 0;
    right:0;
    top:0;
    z-index: 9;
  }
  .title{
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .back{
    margin-top: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
