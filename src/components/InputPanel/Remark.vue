<script setup>
import { computed, watch, ref } from 'vue';
import { drinkListStore } from '../../stores/drink';//🍍
const store = drinkListStore(); //🍍



const remarkText = ref(store.newOrder.remark); //輸入框內容

function submitNewOrder($event, item) { //送出資料給 PINIA
  store.newOrder[item] = remarkText.value;
  console.log(store.newOrder);
  store.cancelInputPanel()
}

</script>


<template>
  <div class="remark-wrap">

    <div class="xmark">
      <span @click="store.cancelInputPanel">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </span>
    </div>
    <h3>備 註</h3>
    <textarea
      name="remark"
      id="remark"
      class="remark"
      cols="30"
      rows="10"
      v-model="remarkText"
    ></textarea>
    <div class="btns">
      <button
        class="cancel"
        @click="store.cancelInputPanel"
      >取消</button>
      <button
        class="submit"
        @click="submitNewOrder($event, 'remark');"
      >儲存</button>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.remark-wrap {
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

  textarea {
    width: 100%;
    padding: 10px;
    font-size: 1.2em;
    border: 2px solid #000;
    margin-bottom: 15px;

    &:focus {
      outline: none;
      border: 2px solid #ff9100;
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