<template>
	<div class="bottom-bar">
    <div class="check-content" @click="selectAllClick">
      <check-button class="check-button" :is-checked="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice|priceMark}}
    </div>
    <div class="calculate" @click="calcClick">
      <span>去结算({{cartCount}})</span>
    </div>
	</div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

	export default {
		name: "CartBottomBar",
    components:{
		  CheckButton
    },
    methods:{
		  selectAllClick(){
        this.$store.commit('selectAllClick')
      },
      calcClick(){
		    if(!this.cartCount){
		      this.$toast.show('请选择要购买的商品')
        }
      }
    },
    computed:{
		  ...mapGetters(['totalPrice','cartCount','isSelectAll'])
    },
    filters:{
		  priceMark(value){
		    return '￥'+value
      }
    }
	}
</script>

<style scoped>
  .bottom-bar{
    position: absolute;
    left:0;
    right: 0;
    bottom: 49px;

    display: flex;
    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    flex:1
  }
  .calculate{
    width: 100px;
    text-align: center;
    background-color: #FF8198;
    color: #fff;
  }
</style>
