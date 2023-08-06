<script setup>
import { ref, reactive } from 'vue';
import { drinkListStore } from '../stores/drink'; //🍍
const store = drinkListStore(); //🍍
const drinkMenuData = store.$state.drinkMenuData;

// Vue 的當前事件要用 $event 綁定
function changeList($event, index) {
  store.myChooseMap.navIndex = index;
}


/* 備註區
* 1. CSS .active 寫在 template 上面。
*
*
*/

</script>


<template>
  <div class="product-nav-wrap">
    <a
      v-for="(item, index) in drinkMenuData"
      :key="index"
      :class="{active : index === store.myChooseMap.navIndex}"
      href="#"
      @click.prevent="changeList($event, index)"
    >
      {{ item.category }}
    </a>
  </div>
</template>

<style lang="scss" scoped>
.product-nav-wrap {
  display: flex;
  justify-content: space-around;

  .active{
    color: var(--color003);
  }

  a {
    // background-color: chocolate;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
    color: var(--color001);
    font-weight: 700;
  }
}
</style>