<template>
    <div class="HomeSwiper">
        <swiper>
          <swiper-item v-for="item in banner">
            <a :href="item.link">
              <img :src="item.image" alt="" @load="imageLoad">
            </a>
          </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
      name: "HomeSwiper",
      props:{
        banner:{
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          isLoad:false
        }
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperImageLoad')
            this.isLoad = true
          }
        }
      },
        components:{
          Swiper,SwiperItem
        }
    }
</script>

<style scoped>

</style>
