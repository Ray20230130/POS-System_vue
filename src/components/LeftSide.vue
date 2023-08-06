<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { drinkListStore } from '../stores/drink.js' //🍍
const store = drinkListStore(); //🍍

// 初始化資料
const localStorageOrders = ref([]);
localStorageOrders.value = JSON.parse(localStorage.getItem('singleOrder'));

const totalCupNum = computed(() => {
  // localStorageOrders.value = JSON.parse(localStorage.getItem('singleOrder'));
  let totalCup = 0;
  localStorageOrders.value.forEach((item, index) => {
    totalCup = totalCup + Number(item.cupNum);
  })
  return totalCup;
})

const totalPrice = computed(() => {
  // localStorageOrders.value = JSON.parse(localStorage.getItem('singleOrder'));
  let totalP = 0;
  localStorageOrders.value.forEach((item, index) => {
    totalP = totalP + (item.productPrice * Number(item.cupNum) );
  })
  return totalP;
})


function clearLocalStorage() {
  let check = confirm('確定刪除嗎?')
  if (check) {
    // 清空名為 item 的 LocalStorage
    if (localStorage.getItem('singleOrder')) {
      let temporaryArr = JSON.parse(localStorage.getItem('singleOrder'));
      temporaryArr.length = 0;
      localStorage.setItem('singleOrder', JSON.stringify(temporaryArr));
      // 清空後重置模板
      localStorageOrders.value = JSON.parse(localStorage.getItem('singleOrder'))
    }
  }
}

watch(store.newOrder, (newVal) => {
  localStorageOrders.value = JSON.parse(localStorage.getItem('singleOrder'));
})



/* 備註區
* 1. 清除按鈕：用🍍的函式
*
*
*/


</script>

<template>
  <div class="wrap">

    <!-- 單子標頭 -->
    <div class="title">
      <div class="items">
        <span class="item name">品項</span>
        <span class="item single-price">單價</span>
        <span class="item num">數量</span>
        <span class="item total-price">總計</span>
      </div>
    </div>

    <!-- 單子內容 -->
    <div class="content">
      <div
        class="show-items"
        v-for="(item, index) in  localStorageOrders "
        :key="index"
      >
        <div class="items">
          <span class="item name">{{ index + 1 }} - {{ item.productName }}</span>
          <span class="item single-price">{{ item.productPrice + item.bubblePrice }}</span>
          <span class="item num">{{ item.cupNum }}</span>
          <span class="item total-price">{{ (item.productPrice + item.bubblePrice) * item.cupNum }}</span>
        </div>
        <div class="detail">
          {{ item.capacity }} /
          {{ item.sweet }} /
          {{ item.temp }}
          <span v-if="item.bubble.length !== 0">/
            <span
              v-for="(item2, index2) in item.bubble "
              :key='index2'
            >
              {{ item2 }}.
            </span>
          </span>
        </div>
        <span
          class="remark"
          v-if="item.remark !== ''"
        >
          註： {{ item.remark }}
        </span>

        <span
          class="discount"
          v-if="item.discount.length !== 0"
        >
          折扣：
          <span
            v-for="(item3, index3) in item.discount "
            :key='index3'
          >
            {{ item3 }}.
          </span>

        </span>
      </div>


    </div>

    <!-- 複製 / 刪除 按鈕 -->
    <div class="btns">
      <button
        class="copy"
        disabled
      >複製</button>
      <button
        class="delete"
        @click="clearLocalStorage()"
      >刪除</button>
    </div>

    <!-- 總計欄位 -->
    <div class="total-data">
      <div class="row">
        <div class="col-6 total-item">
          <div class="name">序號：</div>
          <div class="total-content">123456789</div>
        </div>
        <div class="col-6 total-item">
          <div class="name">小計：</div>
          <div class="total-content">{{ totalPrice }}</div>
        </div>
        <div class="col-6 total-item">
          <div class="name">字軌：</div>
          <div class="total-content">9876540321</div>
        </div>
        <div class="col-6 total-item">
          <div class="name">總折扣：</div>
          <div class="total-content">0</div>
        </div>
        <div class="col-6 total-item">
          <div class="name">數量：</div>
          <div class="total-content">{{ totalCupNum }}</div>
        </div>
        <div class="col-6 total-item">
          <div class="name">總計：</div>
          <div class="total-content">{{ totalPrice }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.wrap {
  // background-color: rgb(196, 124, 36);
  height: calc(100vh - 2em);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

//  點單框框
.items {
  display: flex;
  width: 100%;

  .item {
    // border: 1px solid #000;
    display: inline-block;

    &.name {
      flex-grow: 1;
    }

    &.single-price,
    &.num {
      text-align: center;
      flex-basis: 3em;
    }

    &.total-price {
      text-align: end;
      flex-basis: 4em;
    }
  }
}

.title {
  background-color: #576379;
  height: 52px;
  margin-bottom: .5em;
  border-radius: 5px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 .5em;
}

.content {
  height: 66vh;
  background-color: #fff;
  border-radius: 5px;
  overflow-y: scroll;

  .show-items {
    border-top: 1px solid #ccc;
    padding: .5em;

    .items {
      // background-color: #ff5100;
      padding: 0.2em 0;
    }

    .detail {
      white-space: nowrap;
      overflow: hidden;
    }

    .remark {
      background-color: #e7e7e7;
      padding: 5px 10px;
      border-radius: 10px;
      color: #261777;
      font-weight: 900;
      margin-right: 5px;
    }

    .discount {
      background-color: #e7e7e7;
      padding: 5px 10px;
      border-radius: 10px;
      color: #e4530f;
      font-weight: 900;
    }
  }
}

.btns {
  display: flex;
  justify-content: space-between;

  button {
    width: 48%;
    border: none;
    height: 3em;
    border-radius: 10px;
    color: #fff;
    text-shadow: 3px 3px 1px #777;
    font-weight: 900;
    font-size: 1.3em;

    &.copy {
      background-color: #ffd000;

      &:disabled {
        background-color: #cfb027;
        color: #d6d6d6;
      }
    }

    &.delete {
      background-color: #ff5100;
    }
  }
}

.total-data {
  .total-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;

    .name,
    .content {
      padding: 0 5px;
    }
  }
}
</style>