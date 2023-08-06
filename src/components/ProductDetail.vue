<script setup>
import { reactive, computed, watch, watchEffect } from 'vue';
import { drinkListStore } from '../stores/drink.js' //🍍
const store = drinkListStore(); //🍍
const newOrder = store.newOrder; //🍍

const submitState = computed(() => { // 條件到了才能送出
  if (newOrder.productName == "" || newOrder.cupNum == 0 || newOrder.capacity == "" || newOrder.sweet == "" || newOrder.temp == "") {
    return true;
  } else {
    return false;
  }
})

const hasRemark = computed(() => { // 判斷有沒有填過
  return newOrder.remark !== '';
})
const hasDiscount = computed(() => { // 判斷有沒有填過
  return newOrder.discount.length !== 0;
})
const totalPrice = computed(() => { // 總計金額
  return (newOrder.productPrice + newOrder.bubblePrice) * newOrder.cupNum;
})

function itemAdd($event, name) { // detail加入🍍 
  let btn = $event.target;
  let btns = btn.parentElement.querySelectorAll("button");
  if (name != 'bubble') {
    newOrder[name] = btn.innerText;
    if (name == 'capacity') {
      newOrder.productPrice = Number(btn.getAttribute('data-price'));
    }
    btns.forEach(item => {
      item.classList.remove("active")
    });
    btn.classList.add("active")
  } else if (name == 'bubble') {

    if (newOrder.bubble.includes(btn.innerText)) {
      // indexOf => 找出目標的index ( 找不到就是 -1 )
      const bubbleIndex = newOrder.bubble.indexOf(btn.innerText);
      // 如果 newOrder.bubble 已經包含了這個加料，則從陣列中刪除
      // arr1.splice(要插入或刪除的索引位置, 要刪除的元素數量, 要插入的元素內容)
      //.splice 執行本身就會回傳修改好的陣列，不要再賦值給newOrder.bubble，會把原本的 reactive 蓋掉。
      newOrder.bubble.splice(bubbleIndex, 1);
    } else {
      // 如果 newOrder.bubble 不包含這個加料，則將它添加到陣列中
      newOrder.bubble.push(btn.innerText);
    }
    btn.classList.toggle('active')
  }
}
function getPrice(item, index) { // 算價錢給 data-price
  // Replace this with your actual logic to get the price based on item and index
  return store.drinkMenuData[store.myChooseMap.navIndex].menu[store.myChooseMap.menuIndex].priceList[index].price;
}
function moveToProduckList() { // 取消按鈕-跳回飲料選單
  store.$state.screenControl.showDetail = false;
  Object.assign(store.newOrder, store.originNewOrder); //空物件reset
}
function submitNewOrder() { // 加入按鈕 - 加入左邊清單
  // console.log('加入按鈕', newOrder);

  //* 存進  localStorage  
  let temporaryOrders = JSON.parse(JSON.stringify(store.newOrder));
  if (!localStorage.getItem('singleOrder')) {
    //如果沒有 orders 就創一個。
    let ordersArr = [];
    ordersArr.push(temporaryOrders);
    localStorage.setItem('singleOrder', JSON.stringify(ordersArr));
  } else {
    // 有orders就解開在 push 新的資料。
    let mainOrders = JSON.parse(localStorage.getItem('singleOrder'));
    mainOrders.push(temporaryOrders);
    localStorage.setItem('singleOrder', JSON.stringify(mainOrders));
  }

  //~* 跳回 product.vue
  // 還要寫送出單後清空暫存 newOrder
  Object.assign(store.newOrder, store.originNewOrder); //空物件reset
  store.$state.screenControl.showDetail = false;
}

watch(newOrder.bubble, (newValue, oldValue) => {
  newOrder.bubblePrice = newValue.length * 5
});

/* 備註區
* 1. 
*
*
*/

</script>


<template>
  <div class="product-detail-wrap">
    <!-- 內容按鈕 -->
    <div class="detail">

      <div class="items capacity">
        <div class="row">
          <div class="col-2 title">。容量</div>
          <div class="col-10 btns">
            <button
              class="click-btn"
              v-for="(item, index) in store.$state.detailData.btnCapacity"
              :key="index"
              :data-price="getPrice(item, index)"
              @click="itemAdd($event, 'capacity')"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>

      <div class="items temp">
        <div class="row">
          <div class="col-2 title">。冷熱</div>
          <div class="col-10 btns">
            <button
              class="click-btn"
              v-for="(item, index) in store.$state.detailData.btnTemp"
              :key="index"
              @click="itemAdd($event, 'temp')"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>

      <div class="items sweet">
        <div class="row">
          <div class="col-2 title">。甜度</div>
          <div class="col-10 btns">
            <button
              class="click-btn"
              v-for="(item, index) in store.$state.detailData.btnSweet"
              :key="index"
              @click="itemAdd($event, 'sweet')"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>

      <div class="items bubble">
        <div class="row">
          <div class="col-2 title">。加料</div>
          <div class="col-10 btns">
            <button
              class="click-btn"
              v-for="(item, index) in store.$state.detailData.btnAddBubble"
              :key="index"
              @click="itemAdd($event, 'bubble')"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- 其他功能按鈕 -->
    <div class="other-menu">
      <div class="row">

        <!-- !杯數按鈕 -->
        <div class="col-12 cup-num">
          <div class="row">
            <div class="col-9 num">
              <button
                href="#"
                class="item"
                :class="{ active: index === 0 }"
                v-for="(item, index) in store.$state.detailData.btnCupNum"
                :key="index"
                @click="itemAdd($event, 'cupNum')"
              >{{ item }}</button>
            </div>
            <div class="col-3 text">杯數：<span>{{ store.$state.newOrder.cupNum }}</span></div>
          </div>
        </div>

        <!-- !其他按鈕 -->
        <div class="col-9 other-func">
          <div class="row">
            <div class="col-3 item">
              <button @click="store.moveToInputPanel('remark')">
                <span
                  class="check"
                  v-if="hasRemark"
                >
                  <font-awesome-icon :icon="['fas', 'check']" />
                </span>
                備註
              </button>
            </div>
            <div class="col-3 item">
              <button @click="store.moveToInputPanel('discount')">
                <span
                  class="check"
                  v-if="hasDiscount"
                >
                  <font-awesome-icon :icon="['fas', 'check']" />
                </span>
                折扣
              </button>
            </div>
            <div class="col-6 item">
              <button>加入並新增同項</button>
            </div>

            <div class="col-3 item">
              <button
                class="cancel-btn"
                @click="moveToProduckList"
              >取消</button>
            </div>

            <div class="col-9 item">
              <button
                class="miniOrderList"
                disabled
              >{{ newOrder.productName }} ${{ totalPrice }}</button>
            </div>
          </div>

        </div>

        <!-- !確認按鈕 -->
        <div class="col-3 order-btn-box">
          <button
            class="order-btn"
            :disabled="submitState"
            @click="submitNewOrder"
          >
            <font-awesome-icon :icon="['fas', 'square-plus']" />
            加入
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.product-detail-wrap {
  background-color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  //取消 BootStrap的預設
  .row {
    width: 100%;
    margin: 0 0px;

    [class^="col"] {
      padding: 0px;
    }
  }

  // 上半部按鈕群
  .detail {
    padding: 10px;

    .items {
      margin-bottom: 20px;

      .title {
        padding-top: 8px;
        font-size: 1.2em;
      }

      .btns {
        .click-btn {
          border: 2px solid #CCC;
          background-color: var(--color005);
          border-radius: 5px;
          width: 100px;
          height: 40px;
          margin-right: 10px;
          margin-bottom: 5px;

          &:disabled {
            background-color: #000;
          }

          &.active {
            background-color: var(--color004);
            color: #fff;
          }
        }

      }
    }
  }

  //下列功能表
  .other-menu {
    width: 100%;
    height: 180px;
    margin-top: 10px;
    font-size: 1.2em;
    display: flex;

    // 全部按鈕設定
    button {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 8px;
    }

    .cup-num {
      height: 40px;

      .text {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-weight: 900;
          font-size: 1.3em;
          color: var(--color004);
        }
      }

      .num {
        display: flex;
        justify-content: space-evenly;

        button {
          width: 40px;
          aspect-ratio: 1 / 1;
          color: #000;
          background-color: transparent;
          box-shadow: none;
          border-radius: 50%;

          &.active {
            background-color: var(--color004);
            color: #fff;
          }
        }
      }
    }

    .other-func {

      .item {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px;

        button {
          background-color: rgb(200, 219, 240);

          .check {
            background-color: var(--color003);
            color: #fff;
            padding: 0px 4px;
            border-radius: 50%;
            font-size: .8em;
          }

          &.cancel-btn {
            background-color: transparent;
            border: 2px solid var(--color004);
            color: var(--color004);
          }

          &.miniOrderList {
            background-color: var(--color006);
            color: var(--color004);
          }

        }
      }
    }

    .order-btn-box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;

      button {
        background-color: #0b325f;
        box-shadow: 2px 2px 2px #48526d;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.5em;

        &:disabled {
          background-color: #394e66;
          color: #bebebe;
        }
      }
    }
  }
}
</style>