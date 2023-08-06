<script setup>
import { ref, watch, watchEffect, reactive } from 'vue';
import { drinkListStore } from '../stores/drink'; //🍍
const store = drinkListStore(); //🍍


// 這邊使用 reactive 的話，綁定的是陣列，賦予新的值的話要用陣列的方法。
const listContent =  ref(store.drinkMenuData[store.myChooseMap.navIndex].menu);

watch(()=>store.$state.myChooseMap.navIndex , (newVal, oldVal)=>{
  listContent.value = store.$state.drinkMenuData[newVal].menu;
})

// watchEffect (()=>{
//   console.log("監控成功",store.$state.index);
//   listNum.value = store.$state.index;
//   listContent.value = store.$state.allData[listNum.value].menu;
// })


function moveToDetail($event,index){ // 跳去 Detail 頁面
  store.myChooseMap.menuIndex = index ;
  store.$state.screenControl.showDetail = true;
  store.$state.newOrder.productName = $event.target.innerText; 
}

/* 備註區
* 1. 
*
*
*/

</script>


<template>
  <div class="product-list-wrap">
    <div class="list">
      <div class="item"
      v-for="(item,index) in listContent"
      :key="index"
      >
        <button @click="moveToDetail($event,index)"
        >{{item.name}}</button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list-wrap {
  width: 100%;
  height: 100%;

  .list {
    display: flex;
    flex-wrap: wrap;

    .item {
      flex-basis: 20%;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;

      button {
        width: 100%;
        height: 100%;
        background-color: rgb(235, 235, 235);
        box-shadow: 2px 2px 2px #CCC;
        border: none;
        border-radius: 10px;
        padding: 0 10px;
      }
    }
  }
}
</style>