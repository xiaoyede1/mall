<template>
    <div class="tabbarItem" @click="handleClick">
      <div v-if="!isActived">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
        <slot name="item-text"></slot>
      </div>
    </div>
</template>

<script>
    export default {
      name: "TabbarItem",
      props:{
        path:String,
        activeColor:{
          type:String,
          default:'red'
        }
      },
      methods:{
        handleClick(){
          this.$router.push(this.path)
        }
      },
      computed:{
        isActived(){
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
          return this.isActived?{color:this.activeColor}:{}
        }
      }

    }
</script>

<style scoped>
  .tabbarItem{
    flex:1;
    height: 49px;
    text-align: center;
  }

  img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
