<script setup>
import {provide} from 'vue';
import ProductNav from './ProductNav.vue'
import ProductList from './ProductList.vue'
import ProductMenu from './ProductMenu.vue'
</script>


<template>

  <div class="product-wrap">
    <div class="product-nav">
      <ProductNav />
    </div>
    <div class="product-list">
      <ProductList />
    </div>
    <div class="product-menu">
      <ProductMenu />
    </div>
  </div>
  
</template>

<style lang="scss" scoped>

.product-wrap{
  background-color: #fff;
  border-radius: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .product-nav{
    height: 30px;
  }
  .product-list{
    height: 70%;
  }
  .product-menu{
    height: 150px;
  }
}

</style>