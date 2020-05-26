<template>
    <div class="recommand">
      <div v-for="item in recommend" class="recommand-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RecommandView",
        props:{
          recommend:{
            type:Array,
            default() {
              return [];
            }
          }
        }
    }
</script>

<style scoped>
  .recommand{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommand-item{
    flex:1
  }
  img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
