<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
      name: "tabbar",
    }
</script>

<style scoped>
  .tabbar{
    display: flex;

    background-color: #f6f6f6;
    box-shadow: 0 -1px 1px #cecece;

    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
