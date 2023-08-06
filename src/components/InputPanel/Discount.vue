<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import { drinkListStore } from '../../stores/drink';//🍍
const store = drinkListStore(); //🍍
const newOrder = reactive(store.$state.newOrder); //🍍

let temporaryArr = [];

onBeforeMount(() => {
  //這是因為在 JavaScript 中，當你將一個物件賦值給另一個變數時，實際上是將物件的引用傳遞給了這個變數。它們指向同一個物件，因此在任何一個變數上對物件進行修改，都會影響到其他變數。
  //為了解決這個問題，你應該使用 Object.assign() 或 JSON.parse() 方法來複製 store.newOrder.discount 到 temporaryArr，這樣它們就不再是同一個物件的引用。這裡使用 JSON.parse(JSON.stringify()) 來深度複製物件：
  temporaryArr = JSON.parse(JSON.stringify(store.newOrder.discount));
  console.log('temporaryArr', temporaryArr);
})

function itemAdd($event) { // 加入折扣給 temporaryArr
  const btn = $event.target;
  const btnText = $event.target.innerText;
  const itemIndex = temporaryArr.indexOf(btnText);
  if (itemIndex !== -1) {
    // temporaryArr 有這個內容
    temporaryArr.splice(itemIndex, 1);
  } else {
    // temporaryArr 沒有
    temporaryArr.push(btnText);
  }
  btn.classList.toggle('active')
}

function submitNewDiscount() { //送出折扣資料給 PINIA
  store.newOrder.discount = temporaryArr;
  store.cancelInputPanel() // 🍍Func 跳出輸入面板
}

</script>


<template>
  <div class="discount-wrap">

    <div class="xmark">
      <span @click="store.cancelInputPanel">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </span>
    </div>

    <h3>折 扣</h3>

    <!-- discount集合 -->
    <div class="discount-box">
      <div class="row">

        <div
          v-for="(item, index) in store.detailData.btnDiscount"
          :key="index"
          class="col-3 item"
          @click="itemAdd($event)"
        >
          <button
            class="discount-btn"
            :class="{ active: newOrder.discount.includes(item) }"
          >{{ item }}</button>
        </div>

      </div>

    </div>

    <div class="btns">
      <button
        class="cancel"
        @click="store.cancelInputPanel"
      >取消</button>
      <button
        class="submit"
        @click="submitNewDiscount()"
      >儲存</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.discount-wrap {
  border-radius: 15px;
  width: 40%;
  min-height: 30%;
  background-color: #fff;
  padding: 20px;

  .xmark {
    text-align: end;
    margin-bottom: -20px;

    span {
      background-color: #ccc;
      padding: 2px 6px;
      border-radius: 50%;
    }
  }

  h3 {
    text-align: center;
    margin-bottom: 15px;
  }

  .row {
    width: 100%;
    margin: 0 0px;

    [class^="col"] {
      padding: 0px;
    }
  }

  .discount-box {
    min-height: 30vh;
    margin-bottom: 15px;

    .item {
      width: 25%;
      height: 70px;
      padding: 5px;

      button {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        background-color: #eee;
        border-radius: 5px;
        padding: 5px;

        &.active {
          background-color: var(--color004);
          color: #fff;
        }
      }
    }
  }

  .btns {
    display: flex;
    justify-content: space-around;

    button {
      flex-basis: 48%;
      border: none;
      padding: 10px 0;
      border-radius: 5px;

      &.cancel {
        border: 1px solid #ccc;
        background-color: transparent;
      }

      &.submit {
        background-color: var(--color001);
        color: #fff;

        &:disabled {
          background-color: var(--color001-disable);
          color: #b6b6b6;

        }
      }
    }
  }
}
</style>