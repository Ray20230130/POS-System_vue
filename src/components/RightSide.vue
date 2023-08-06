<script setup>
import MainNav from './MainNav.vue'
import Product from './Product.vue'
import ProductDetail from './ProductDetail.vue'

import { drinkListStore } from '../stores/drink'; //🍍
const store = drinkListStore(); //🍍


</script>


<template>

  <div class="wrap">
    <div class="main-nav">
    <MainNav />
    </div>
    <div class="product">
    <Product v-if="!store.screenControl.showDetail" />
    <ProductDetail v-else />
    </div>
    <div class="footer">
      <h5>XXXX 台中復興店</h5>
    </div>

  </div>
  
</template>

<style lang="scss" scoped>
.wrap{
  height: calc(100vh - 2em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .main-nav{
    height: 60px;
  }
  .product{
    // background-color: #fff;
    width: 100%;
    height: 82%;
  }
  .footer{
    background-color: var(--color002);
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    h5{
      color: azure;
      margin: 0;
      font-weight: 700;
    }
  }
}
</style>